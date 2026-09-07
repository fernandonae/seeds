import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import productRoutes from './src/routes/product.routes.js';
import { errorHandler, notFound } from './src/middlewares/error.middleware.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API de Semillas funcionando correctamente');
});

// Middlewares de error (SIEMPRE al final, después de las rutas)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`>>> Servidor ejecutándose en el puerto ${PORT}`);
});