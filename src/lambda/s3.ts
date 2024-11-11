import { GetObjectCommand, HeadObjectCommand, ListObjectsV2Command, ListObjectsV2CommandInput, ListObjectsV2CommandOutput, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/
const isDateString = (dateString: string): boolean => isoDateRegex.test(dateString);
export const listDateDirectories = async (Bucket:string): Promise<string[]> => {
    const dateDirectories: string[] = [];
    let continuationToken: string | undefined;
  
    do {
      const params: ListObjectsV2CommandInput = {
        Bucket,
        Prefix: '', // Adjust prefix based on bucket structure if needed
        Delimiter: '/',
        ContinuationToken: continuationToken,
      };
  
      const command = new ListObjectsV2Command(params);
      const response = await s3Client.send(command) as ListObjectsV2CommandOutput;
  
      if (response.CommonPrefixes) {
        dateDirectories.push(...response.CommonPrefixes.filter(cp => isDateString(cp.Prefix ?? '')).map(cp => cp.Prefix as string));
      }
  
      continuationToken = response.NextContinuationToken;
    } while (continuationToken);
  
    return dateDirectories.sort();
}

export const s3get = async (Bucket:string, Key:string) => {
    console.log('s3get', Key)
    const data = await s3Client.send(new GetObjectCommand({ Bucket, Key }))
    const str = await data.Body?.transformToString() ?? ''
    return JSON.parse(str)
}

export const s3put = async (Bucket:string, Key:string, jsonData:any) => await s3Client.send(
    new PutObjectCommand({ Bucket, Key, Body: JSON.stringify(jsonData)}))  

export const s3has = async (Bucket:string, Key:string): Promise<boolean> => {
  try {
    await s3Client.send(new HeadObjectCommand({ Bucket, Key }));
    return true;
  } catch (error) {
    return false;
  }
}