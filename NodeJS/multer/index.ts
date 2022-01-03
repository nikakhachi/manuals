import { Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";

const saveToS3 = () =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      metadata: function (req: Request, file: any, cb: any) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req: Request, file: any, cb: any) {
        cb(null, nameInS3);
      },
    }),
  }).single(fieldName_in_request_data);

const saveLocally = () =>
  multer({
    storage: multer.diskStorage({
      destination: function (req: Request, file: any, cb: any) {
        cb(null, destinationPath);
      },
      filename: function (req: Request, file: any, cb: any) {
        cb(null, fileName);
      },
    }),
  }).single(fieldName_in_request_data);

export default { saveToS3, saveLocally };
