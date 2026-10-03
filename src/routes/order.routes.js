import { Router } from 'express';
import { authRequired, authorizeRoles } from '../middlewares/auth.middleware.js';
import {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders
} from '../controllers/order.controller.js';

const router = Router();

router.post('/', authRequired, createOrder);
router.get('/mine', authRequired, getMyOrders);
router.get('/:id', authRequired, getOrder);
router.get('/', authRequired, authorizeRoles('admin'), getAllOrders);

export default router;