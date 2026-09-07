import { body } from 'express-validator';

export const registerValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('email')
    .trim()
    .isEmail().withMessage('El email no es válido'),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('rol')
    .optional()
    .isIn(['cliente', 'admin', 'proveedor']).withMessage('Rol no válido')
];

export const loginValidator = [
  body('email')
    .trim()
    .isEmail().withMessage('El email no es válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
];