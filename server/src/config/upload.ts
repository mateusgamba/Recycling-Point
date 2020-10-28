import multerS3 from 'multer-s3';
import multer from 'multer';
import aws from 'aws-sdk';
import path from 'path';

const s3 = new aws.S3({
    endpoint: process.env.AWS_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const storage = process.env.STORAGE_TYPE==='S3'
  ? multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME as string,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (request, file, cb) => {
        const fileName = `happy/${Date.now()}-${file.originalname.trim()}`;
        cb(null, fileName);
      },
    })
  : multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'uploads', 'happy'),
      filename: (request, file, callback) => {
        const fileName = `${Date.now()}-${file.originalname.trim()}`;
        callback(null, fileName);
      }
    });

export default { storage }
