import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';
import { authRequired, authorizeRoles } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createProductValidator, updateProductValidator } from '../validators/product.validator.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', authRequired, authorizeRoles('admin', 'proveedor'), createProductValidator, validate, createProduct);
router.put('/:id', authRequired, authorizeRoles('admin', 'proveedor'), updateProductValidator, validate, updateProduct);
router.delete('/:id', authRequired, authorizeRoles('admin', 'proveedor'), deleteProduct);

export default router;