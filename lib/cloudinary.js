import { v2 as cloudinary } from 'cloudinary';

/** Cloudinary — photos yahan store hoti hain */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const CLOUD_FOLDER = 'vishwakarma-furniture';

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Browser se seedha Cloudinary par upload karne ke liye signature.
 * Isse badi photos Vercel ki request limit me nahi atakti.
 */
export function signUpload({ folder = CLOUD_FOLDER } = {}) {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET
  );

  return {
    signature,
    timestamp,
    folder,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME
  };
}

export async function deleteImage(publicId) {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
