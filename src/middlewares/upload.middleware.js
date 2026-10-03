import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'semillas', // carpeta dentro de tu cuenta de Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

export const upload = multer({ storage });