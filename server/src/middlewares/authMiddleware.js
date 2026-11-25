import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware de autorización JWT.
 * Verifica el header Authorization: Bearer <token> y adjunta el usuario en req.user.
 */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado. Token de acceso requerido',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado. Formato de token inválido',
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('Error de configuración: JWT_SECRET no está definido en el entorno');
      return res.status(500).json({
        success: false,
        message: 'Error de configuración de autenticación en el servidor',
      });
    }

    const decoded = jwt.verify(token, jwtSecret);
    const usuario = await User.findById(decoded.id).select('-password');

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado. El usuario del token ya no existe',
      });
    }

    req.user = usuario;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'No autorizado. Token inválido o expirado',
      });
    }

    console.error('Error en authMiddleware:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error interno al verificar la autenticación',
    });
  }
};

export default protect;
