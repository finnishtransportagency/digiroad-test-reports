import { CodePipelineClient, PutJobSuccessResultCommand, PutJobFailureResultCommand } from "@aws-sdk/client-codepipeline"; // Import AWS SDK v3 clients
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda"; // Import types for Lambda functions
import { PromisePool } from '@supercharge/promise-pool';
import { listDateDirectories, s3get, s3has, s3put } from './s3';
import { putJobFailure, putJobSuccess } from "./pipeline";

const readData = async () => {
    const dirs = await listDateDirectories(process.env.BUCKET!)
    const data:any = {}
    const responseTimes:any = []
    for (const dir of dirs) {
      console.log(`Processing directory: ${dir}`);

      const date = dir.replace(/\//g,'')
      const key = `data/${dir}daily.json`
      if (await s3has(process.env.BUCKET!, key)) {
        const daily = await s3get(process.env.BUCKET!, key)
        data[date] = {
            dev: daily.dev.passed,
            qa: daily.qa.passed,
            prod: daily.prod.passed
        }
        for (const env of Object.keys(daily)) {
          for (const test of daily[env].tests) {
            responseTimes.push({ timestamp: date, responseTime: test.responseTime, test: test.test, env })
          }
        }
      }
    }
    console.log('all done')
    await s3put(process.env.BUCKET!, 'data/summary.json', data)
    await s3put(process.env.BUCKET!, 'data/responseTimes.json', responseTimes)
}

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<string> => {
  const codePipelineClient = new CodePipelineClient({});
  const jobId = event['CodePipeline.job'].id;

  try {
    // Log the event for debugging purposes
    console.log('Received event:', JSON.stringify(event, null, 2));

    await readData()

    return await putJobSuccess(jobId, "All done.");

  } catch (error) {
    console.error('Job Failed:', error);
    return await putJobFailure(jobId, "All done error."+error);
  }
};

