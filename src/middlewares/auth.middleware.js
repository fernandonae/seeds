import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
  // Obtener el token del encabezado Authorization (Bearer <token>)
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No hay token, acceso denegado' });
  }

  jwt.verify(token, process.env.TOKEN_SECRET || 'secret123', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    req.user = user;
    next();
  });
};

// Nuevo: valida que el usuario tenga uno de los roles permitidos
export const authorizeRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
    }
    next();
  };
};