import User from '../schema/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

// Registro de usuario
export const register = asyncHandler(async (req, res) => {
  const { nombre, email, password, telefono, rol } = req.body;

  const userFound = await User.findOne({ email });
  if (userFound) {
    throw new ApiError(400, 'El correo ya está en uso');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({ nombre, email, password: passwordHash, telefono, rol });
  const userSaved = await newUser.save();

  res.status(201).json({
    id: userSaved._id,
    nombre: userSaved.nombre,
    email: userSaved.email,
    rol: userSaved.rol,
    createdAt: userSaved.createdAt
  });
});

// Login de usuario
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });
  if (!userFound) {
    throw new ApiError(400, 'Usuario no encontrado');
  }

  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) {
    throw new ApiError(400, 'Contraseña incorrecta');
  }

  const token = jwt.sign(
    { id: userFound._id, rol: userFound.rol },
    process.env.TOKEN_SECRET || 'secret123',
    { expiresIn: '1d' }
  );

  res.json({
    id: userFound._id,
    nombre: userFound.nombre,
    email: userFound.email,
    rol: userFound.rol,
    token
  });
});

// Obtener perfil de usuario autenticado
export const profile = asyncHandler(async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) {
    throw new ApiError(404, 'Usuario no encontrado');
  }

  res.json({
    id: userFound._id,
    nombre: userFound.nombre,
    email: userFound.email,
    rol: userFound.rol,
    createdAt: userFound.createdAt
  });
});