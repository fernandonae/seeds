import mongoose from 'mongoose';
import Order from '../schema/order.js';
import Product from '../schema/product.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

// Crear una nueva orden a partir del carrito
export const createOrder = asyncHandler(async (req, res) => {
  const { items } = req.body; // [{ product: id, cantidad: 2 }, ...]

  if (!items || items.length === 0) {
    throw new ApiError(400, 'La orden no puede estar vacía');
  }

  const orderItems = [];
  let total = 0;

  for (const item of items) {
    if (!mongoose.Types.ObjectId.isValid(item.product)) {
      throw new ApiError(400, `ID de producto no válido: ${item.product}`);
    }

    const product = await Product.findById(item.product);

    if (!product) {
      throw new ApiError(404, `Producto no encontrado: ${item.product}`);
    }

    if (product.stock < item.cantidad) {
      throw new ApiError(400, `Stock insuficiente para "${product.nombre}"`);
    }

    orderItems.push({
      product: product._id,
      nombre: product.nombre,
      precio: product.precio,
      cantidad: item.cantidad
    });

    total += product.precio * item.cantidad;

    // Descuenta el stock real
    product.stock -= item.cantidad;
    await product.save();
  }

  const newOrder = new Order({
    usuario: req.user.id,
    items: orderItems,
    total
  });

  const savedOrder = await newOrder.save();
  res.status(201).json(savedOrder);
});

// Obtener las órdenes del usuario logueado
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ usuario: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

// Obtener una orden por ID (solo el dueño)
export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'ID de orden no válido');
  }

  const order = await Order.findById(id);

  if (!order) {
    throw new ApiError(404, 'Orden no encontrada');
  }

  if (order.usuario.toString() !== req.user.id) {
    throw new ApiError(403, 'No tienes permiso para ver esta orden');
  }

  res.json(order);
});

// Obtener todas las órdenes (admin)
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});