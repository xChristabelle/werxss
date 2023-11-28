import dotenv from "dotenv";
import fs from "fs";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// uploads a file to S3
export const uploadFile = async (file) => {

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Key: file.filename,
    Body: fileStream,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(uploadParams);

  return await s3.send(command);

  // return s3.upload(uploadParams).promise();
};

//////// Not Yet done
export const uploadFiles = async (files) => {
  console.log("🚀 ~ file: s3new.js:42 ~ uploadFiles ~ files:", files);
  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer();
  try {
    const uploadPromises = files.map(async (file) => {
      // const fileStream = fs.createReadStream(file.path);

      const uploadParams = {
        Bucket: bucketName,
        Key: file.filename,
        Body: fileBuffer,
        ContentType: file.mimetype,
      };

      const result = new PutObjectCommand(uploadParams);
      // const result = await s3.upload(uploadParams).promise();
      return result.Location;
    });

    const fileURLs = await Promise.all(uploadPromises);
    return fileURLs;
  } catch (error) {
    throw error;
  }
};

// downloads a file from S3
export const getFileStream = async (fileKey) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  const command = new GetObjectCommand(getObjectParams);

  const url = await getSignedUrl(
    s3,
    command,
    // { expiresIn: 60 } // 60 seconds
  ).then((data) => {
    return data;
  });

  return url
};

