import { CodePipelineClient, PutJobSuccessResultCommand, PutJobFailureResultCommand } from '@aws-sdk/client-codepipeline';

const codepipeline = new CodePipelineClient({});

export const putJobSuccess = async (jobId: string, message: string) => {
  await codepipeline.send(new PutJobSuccessResultCommand({ jobId }));
  return message;
};

export const putJobFailure = async (jobId: string, message: string) => {
  await codepipeline.send(new PutJobFailureResultCommand({
    jobId,
    failureDetails: { message: JSON.stringify(message), type: 'JobFailed' }
  }));
  return message;
};
