import { body } from 'express-validator';

export const createProductValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre del producto es obligatorio'),
  body('precio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),
  body('stock')
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
  body('categoria')
    .trim()
    .notEmpty().withMessage('La categoría es obligatoria')
];

// Para actualizar, todos los campos son opcionales (puedes mandar solo lo que quieras cambiar)
export const updateProductValidator = [
  body('nombre').optional().trim().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('precio').optional().isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),
  body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
  body('categoria').optional().trim().notEmpty().withMessage('La categoría no puede estar vacía')
];