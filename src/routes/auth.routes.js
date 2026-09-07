import { Router } from 'express';
import { register, login, profile } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerValidator, loginValidator } from '../validators/auth.validator.js';

const router = Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.get('/profile', authRequired, profile);

export default router;