import { Router } from 'express';
import { authRequired, authorizeRoles } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';
import { uploadImage } from '../controllers/upload.controller.js';

const router = Router();

router.post('/', authRequired, authorizeRoles('admin'), upload.single('imagen'), uploadImage);

export default router;