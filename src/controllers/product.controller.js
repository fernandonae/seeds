import mongoose from 'mongoose';
import Product from '../schema/product.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

// Obtener todos los productos
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Crear un nuevo producto
export const createProduct = asyncHandler(async (req, res) => {
  const { nombre, descripcion, precio, stock, categoria, imagenes, destacado } = req.body;

  const newProduct = new Product({ nombre, descripcion, precio, stock, categoria, imagenes, destacado });
  const savedProduct = await newProduct.save();

  res.status(201).json(savedProduct);
});

// Obtener un solo producto por ID
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'ID de producto no válido');
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Producto no encontrado');
  }

  res.json(product);
});

// Actualizar un producto
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'ID de producto no válido');
  }

  const productUpdated = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!productUpdated) {
    throw new ApiError(404, 'Producto no encontrado');
  }

  res.json(productUpdated);
});

// Eliminar un producto
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'ID de producto no válido');
  }

  const productDeleted = await Product.findByIdAndDelete(id);
  if (!productDeleted) {
    throw new ApiError(404, 'Producto no encontrado');
  }

  res.sendStatus(204);
});