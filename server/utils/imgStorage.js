import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

// store to DigitalOcean Spaces S3
const s3 = new aws.S3({
  accessKeyId: process.env.DIGITAL_OCEAN_SPACES__KEY_ID,
  secretAccessKey: process.env.DIGITAL_OCEAN_SPACES_SECRET_KEY,
  endpoint: new aws.Endpoint(process.env.DIGITAL_OCEAN_SPACES_ENDPOINT),
});

export const uploadS3Multer = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.DIGITAL_OCEAN_SPACES_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, `${uuidv4()}.${file.originalname.split('.').pop()}`);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
});

export const uploadS3 = async (image) => {
  try {
    // only jpg, jpeg, png, webp and max 2MB
    if (!image.name.match(/\.(jpg|jpeg|png|webp)$/i))
      return { error: 'Only image files are allowed!' };

    if (image.size > 2 * 1024 * 1024) return { error: 'Image size must be less than 2MB!' };

    const params = {
      Bucket: process.env.DIGITAL_OCEAN_SPACES_BUCKET_NAME,
      Key: `${uuidv4()}.${image.name.split('.').pop()}`,
      Body: image.data,
      ContentType: image.mimetype,
      ACL: 'public-read',
    };

    const result = await s3.upload(params).promise();
    return result;
  } catch (error) {
    return { error };
  }
};

export const removeS3 = async (key) => {
  try {
    const params = {
      Bucket: process.env.DIGITAL_OCEAN_SPACES_BUCKET_NAME,
      Key: key,
    };
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error(error);
  }
};
