export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({ message });
};

export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
};