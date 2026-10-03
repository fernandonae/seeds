import { body } from 'express-validator';

export const createProductValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre del producto es obligatorio'),
  body('descripcion')
    .optional()
    .trim(),
  body('precio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),
  body('stock')
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
  body('categoria')
    .trim()
    .notEmpty().withMessage('La categoría es obligatoria'),
  body('imagenes')
    .optional()
    .isArray().withMessage('Las imágenes deben ser una lista de cadenas'),
  body('destacado')
    .optional()
    .isBoolean().withMessage('El campo destacado debe ser un valor booleano'),
  body('enCarrusel')
    .optional()
    .isBoolean().withMessage('El campo enCarrusel debe ser un valor booleano')
];

// Para actualizar, todos los campos son opcionales (puedes mandar solo lo que quieras cambiar)
export const updateProductValidator = [
  body('nombre').optional().trim().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('descripcion').optional().trim(),
  body('precio').optional().isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),
  body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
  body('categoria').optional().trim().notEmpty().withMessage('La categoría no puede estar vacía'),
  body('imagenes').optional().isArray().withMessage('Las imágenes deben ser una lista de cadenas'),
  body('destacado').optional().isBoolean().withMessage('El campo destacado debe ser un valor booleano'),
  body('enCarrusel').optional().isBoolean().withMessage('El campo enCarrusel debe ser un valor booleano')
];