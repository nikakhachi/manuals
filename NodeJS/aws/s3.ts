import { S3 } from "aws-sdk";
import {
  Body,
  DeleteObjectOutput,
  DeleteObjectRequest,
  GetObjectRequest,
  HeadObjectOutput,
  ManagedUpload,
  PutObjectOutput,
} from "aws-sdk/clients/s3";

const s3 = new S3({
  accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
  secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
});

const bucketName = process.env["AWS_BUCKET_NAME"];

const uploadFileToS3 = (path: string, file: Buffer): Promise<PutObjectOutput> =>
  new Promise((res, rej) => {
    s3.putObject(
      {
        Bucket: bucketName,
        Key: path,
        Body: file,
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

const uploadFileToS3V2 = (
  path: string,
  file: Buffer
): Promise<ManagedUpload.SendData> =>
  new Promise((res, rej) => {
    s3.upload(
      {
        Bucket: bucketName,
        Body: file,
        Key: path,
      },
      function (err, data) {
        if (err) {
          console.log(err);
          return rej(err);
        }
        res(data);
      }
    );
  });

const uploadFilesToS3 = (
  paths: string[],
  files: Buffer[]
): Promise<PutObjectOutput[]> =>
  Promise.all(
    files.map(
      (file, index) =>
        // @ts-ignore
        new Promise((res, rej) => {
          s3.putObject(
            {
              Bucket: bucketName,
              Key: paths[index],
              Body: file,
            },
            (err) => {
              if (err) {
                console.log(err);
                rej("Internal Server Error");
              }
              res("");
            }
          );
        })
    )
  );

const getFileFromS3 = (path: string): Promise<Body> =>
  new Promise((res, rej) => {
    const params: GetObjectRequest = {
      Key: path,
      Bucket: bucketName,
    };
    s3.getObject(params, function (err, data) {
      if (err) {
        console.log(err);
        rej("Internal Server Error");
      }
      res(data.Body);
    });
  });

const getFileMetadataFromS3 = (path: string): Promise<HeadObjectOutput> =>
  new Promise((res, rej) => {
    s3.headObject(
      {
        Bucket: bucketName,
        Key: path,
      },
      (err, data) => {
        if (err) {
          if (err.statusCode === 404) {
            res(null);
          } else {
            console.log(err);
            rej("Internal Server Error");
          }
        } else {
          res(data);
        }
      }
    );
  });

const deleteFileFromS3 = (path: string): Promise<DeleteObjectOutput> =>
  new Promise((res, rej) => {
    const params: DeleteObjectRequest = {
      Bucket: bucketName,
      Key: path,
    };
    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log(err);
        rej("Internal Server Error");
      }
      res(data);
    });
  });

export {
  uploadFileToS3,
  uploadFileToS3V2,
  getFileFromS3,
  uploadFilesToS3,
  deleteFileFromS3,
  getFileMetadataFromS3,
};
