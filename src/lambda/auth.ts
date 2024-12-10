import { ALBEvent, ALBResult } from 'aws-lambda';
import { getSignedCookies } from '@aws-sdk/cloudfront-signer';
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ssm = new SSMClient({ region: process.env.AWS_REGION });

const domain = process.env.DOMAIN!;
const distributionDomain = process.env.DISTRIBUTION_DOMAIN!;
const keyPairId = process.env.KEY_PAIR_ID!;

const getPrivateKey = async (): Promise<string> => {
    const ssmParam = async (key: string): Promise<string> => {
        return (await ssm.send(new GetParameterCommand({ Name: key, WithDecryption: true }))).Parameter?.Value!
    }
    return await ssmParam('/digiroadtestreport/cloudfront/key/priv')
};

export const handler = async (event: ALBEvent): Promise<ALBResult> => {
    console.log(event)
    try {
        // server time!
        const expires = Math.floor(Date.now() / 1000) + (5/*h*/ * 60/*min*/ * 60 /*sec*/)
        const policy = JSON.stringify({
            Statement: [
                {
                    Resource: `https://${domain}/*`,
                    Condition: {
                        DateLessThan: {
                            'AWS:EpochTime': expires
                        }
                    }
                }
            ]
        });
        const privateKey = await getPrivateKey();
        const signedCookies = getSignedCookies({
            keyPairId,
            policy,
            privateKey,
        });
        console.log(JSON.stringify(signedCookies, null, 2));
        return {
            statusCode: 302,
            multiValueHeaders: {
                'Set-Cookie': [
                    `CloudFront-Policy=${signedCookies['CloudFront-Policy']}; Domain=${domain}; Path=/; Secure; HttpOnly`,
                    `CloudFront-Signature=${signedCookies['CloudFront-Signature']}; Domain=${domain}; Path=/; Secure; HttpOnly`,
                    `CloudFront-Key-Pair-Id=${signedCookies['CloudFront-Key-Pair-Id']}; Domain=${domain}; Path=/; Secure; HttpOnly`,
                ],
                Location: [
                    `https://${domain}/`
                ]
            },
        };
    } catch (error:any) {
        console.error('Error generating signed cookies:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to generate signed cookies',
                error: error.message
            })
        };
    }
};
