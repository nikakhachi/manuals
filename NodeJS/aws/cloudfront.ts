import { CloudFront } from "aws-sdk";
import { CreateInvalidationResult } from "aws-sdk/clients/cloudfront";

const cloudFront = new CloudFront({
  accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
  secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
});

export const createCloudfrontInvalidations = (
  paths: string[]
): Promise<CreateInvalidationResult> =>
  new Promise((res, rej) => {
    cloudFront.createInvalidation(
      {
        DistributionId: process.env["CLOUDFRONT_DISTRIBUTION_ID"],
        InvalidationBatch: {
          CallerReference: `${new Date().getTime()}`,
          Paths: {
            Quantity: paths.length,
            Items: paths,
          },
        },
      },
      (err, data) => {
        if (err) {
          console.log(err);
          rej("Internal Server Error");
        }
        res(data);
      }
    );
  });

const urlSigner = new CloudFront.Signer(
  process.env["CLOUDFRONT_PUBLIC_KEY_ID"],
  process.env["CLOUDFRONT_PRIVATE_KEY"]
);

export const signCloudfrontUrl = (url) =>
  urlSigner.getSignedUrl({
    expires: new Date().getTime() + 60 * 60 * 1000,
    url,
  });
