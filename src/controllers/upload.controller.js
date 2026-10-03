import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No se subió ningún archivo');
  }

  // req.file.path contiene la URL final de Cloudinary
  res.status(201).json({ url: req.file.path });
});