import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"; // Import S3 client from AWS SDK
import { CodePipelineClient, PutJobSuccessResultCommand, PutJobFailureResultCommand } from "@aws-sdk/client-codepipeline"; // Import AWS SDK v3 clients
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda"; // Import types for Lambda functions
import { s3has, s3put } from './s3'; // Import S3 helper functions
import { putJobFailure, putJobSuccess } from "./pipeline";
import { XMLParser } from 'fast-xml-parser';
import JSZip = require("jszip")

// Helper function to convert stream to string
const streamToString = (stream: any): Promise<string> => {
  const chunks: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
};

const getS3Key = (): string => {
  // päivämäärä
  const date = new Date();
  
  // formatoidaan päivämäärä vastaamaan S3:a
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // getDay() returns day of the week: 0 (Sunday) to 6 (Saturday)
  // Convert to ISO week date: 1 (Monday) to 7 (Sunday)
  const isoWeekDay = date.getDay() === 0 ? 7 : date.getDay();

  // Determine the browser name
  let browser: string;
  if (isoWeekDay >= 1 && isoWeekDay <= 5) {
    browser = 'headlesschrome';
  } else {
    browser = 'headlesschrome';
  }

  // Format the S3 key
  const s3Key = `${year}-${month}-${day}-${browser}`;
  
  return s3Key;
}

// Function to get data from S3 and extract XML content from a zip file
const readRobotFrameworkData = async (bucketName: string, zipKey: string) => {
  try {
    const s3Client = new S3Client({ region: process.env.AWS_REGION });
    const command = new GetObjectCommand({ Bucket: bucketName, Key: zipKey });
    const response = await s3Client.send(command);

    const zipData = await streamToString(response.Body);
    const zip = await JSZip.loadAsync(zipData);

    // Find and read the XML file(s) inside the ZIP
    const xmlFiles = Object.keys(zip.files).filter(fileName => fileName.match(/^output-.*\.xml$/));
    if (xmlFiles.length === 0) {
      throw new Error("No XML files found in the ZIP");
    }
    
    const xmlDataList = await Promise.all(xmlFiles.map(async xmlFileName => {
      const xmlFile = zip.files[xmlFileName];
      const xmlData = await xmlFile.async("string");
      return parseRobotOutputXML(xmlData);
    }));
    
    // Return parsed data
    return xmlDataList;
  } catch (err) {
    console.error(`Error reading Robot Framework XML data from ZIP: ${err}`);
    throw err;
  }
}

const parseRobotOutputXML = (xmlData: string) => {
  const parser = new XMLParser();
  const jsonObj = parser.parse(xmlData);

  //Tutkitaan parsettu xml-olio <total> -datan löytämiseksi
  const totalStats = jsonObj?.robot?.statistics?.total?.stat;
  if (!totalStats) {
    throw new Error("Unable to find <total> data in the XML");
  }

  //palautetaan tarpeelliset <stat> -elementit
  return totalStats.map((stat: any) => ({
    pass: stat["@_pass"],
    fail: stat["@_fail"],
    skip: stat["@_skip"],
    name: stat["#text"]
  }));
}

const readData = async () => {
  const zipKey = getS3Key()
  const bucketName = process.env.BUCKET!;
  const robotDataList = await readRobotFrameworkData(bucketName, zipKey);

  const data: any = {};
  
  for (const robotData of robotDataList) {
    // Assuming robotData contains an array of parsed XML data for each file
    for (const dataEntry of robotData) {
      const date = new Date().toISOString().slice(0, 10); // Current date as an example
      const key = `data/${date}.json`;
      if (!(await s3has(bucketName, key))) {
        const dailyData = (entry: any) => ({
          date,
          passed: Number(entry.pass),
          failed: Number(entry.fail),
          skipped: Number(entry.skip),
          name: entry.name
        });
      
        try {
          const data = {
            qa: dailyData(dataEntry),
          };
          await s3put(bucketName, key, data);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}

interface CodePipelineJobEvent extends APIGatewayProxyEvent {
  'CodePipeline.job': {
    id: string;
  };
}

export const handler = async (event: CodePipelineJobEvent, context: Context): Promise<string> => {
  const codePipelineClient = new CodePipelineClient({});
  const jobId = event['CodePipeline.job'].id;

  try {
    // Log the event for debugging purposes
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Process the data from the zip file
    await readData();

    return await putJobSuccess(jobId, "All done.");

  } catch (error) {
    console.error('Job Failed:', error);
    return await putJobFailure(jobId, "All done error." + error);
  }
};
