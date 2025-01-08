import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"; // Import S3 client from AWS SDK
import { CodePipelineClient, PutJobSuccessResultCommand, PutJobFailureResultCommand } from "@aws-sdk/client-codepipeline"; // Import AWS SDK v3 clients
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda"; // Import types for Lambda functions
import { s3has, s3put } from './s3'; // Import S3 helper functions
import { putJobFailure, putJobSuccess } from "./pipeline";
import { XMLParser } from 'fast-xml-parser';
import JSZip = require("jszip")

// Helper function to convert stream to string
const streamToString = (stream: any): Promise<any> => {
  const chunks: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
};

const getS3Key = (): string => {
  // päivämäärä
  const date = new Date();
  
  // formatoidaan päivämäärä vastaamaan S3:a (HUOM: kuluvaa edeltävä päivä)
  date.setDate(date.getDate() - 1); // Aseta päivämäärä eiliseen
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
    console.log("1")
    const s3Client = new S3Client({ region: process.env.AWS_REGION });
    console.log("2")
    const command = new GetObjectCommand({ Bucket: bucketName, Key: zipKey });
    console.log("3")
    const response = await s3Client.send(command);
    console.log("4")
    const zipData = await streamToString(response.Body);
    console.log("5", zipKey)
    const zip = await JSZip.loadAsync(zipData);
    console.log("6")

    // Find and read the XML file(s) inside the ZIP
    const xmlFiles = Object.keys(zip.files).filter(fileName => fileName.match(/.*output-.*\.xml$/));
    console.log("7")
    if (xmlFiles.length === 0) {
      throw new Error("No XML files found in the ZIP");
    }
    console.log("8")
    const xmlDataList = await Promise.all(xmlFiles.map(async xmlFileName => {
      console.log("9")
      const xmlFile = zip.files[xmlFileName];
      console.log("10")
      const xmlData = await xmlFile.async("string");
      console.log("11")
      return parseRobotOutputXML(xmlData);
      console.log("12")
    }));
    
    // Return parsed data
    return xmlDataList;
  } catch (err) {
    console.error(`Error reading Robot Framework XML data from ZIP: ${err}`);
    throw err;
  }
}

const parseRobotOutputXML = (xmlData: string) => {
  const parser = new XMLParser({ignoreAttributes : false});
  const jsonObj = parser.parse(xmlData);

  //Tutkitaan parsettu xml-olio <total> -datan löytämiseksi
  const totalStats = jsonObj?.robot?.statistics?.total?.stat;
  console.log(jsonObj?.robot?.statistics)
  console.log(jsonObj?.robot?.statistics?.total)
  console.log(totalStats)
  if (!totalStats) {
    throw new Error("Unable to find <total> data in the XML");
  }

  //palautetaan tarpeelliset <stat> -elementit
  //<stat pass="109" fail="47" skip="0">All Tests</stat>
  return {
    pass: totalStats["@_pass"],
    fail: totalStats["@_fail"],
    skip: totalStats["@_skip"],
    name: totalStats["#text"]
  };
}

const readData = async () => {
  console.log("Read data")
  const zipKey = getS3Key()
  const bucketName = process.env.BUCKET!;
  const robotDataList = await readRobotFrameworkData(bucketName, zipKey);
  console.log(robotDataList, "1")
  const data: any = {};
  

      console.log(robotDataList, "2")
      const date = new Date().toISOString().slice(0, 10); // Current date as an example
      const key = `data/${date}.json`;
      console.log(robotDataList, "3")
      if (!(await s3has(bucketName, key))) {
        const dailyData = (entry: any) => ({
          date,
          passed: Number(entry.pass),
          failed: Number(entry.fail),
          skipped: Number(entry.skip),
          name: entry.name
        });
        console.log(robotDataList, "4")
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
