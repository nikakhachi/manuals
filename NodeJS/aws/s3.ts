import { config, S3, AWSError } from "aws-sdk";

config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new S3();

const saveFileInS3 = () => {
  s3.putObject(
    {
      Bucket: bucketName,
      Key: fileName,
      Body: file,
    },
    (err: AWSError, data) => {}
  );
};
