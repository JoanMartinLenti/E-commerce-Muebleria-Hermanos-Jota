import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Devuelve únicamente los campos públicos del usuario.
 */
const formatUser = (user) => ({
  id: user._id,
  nombre: user.nombre,
  email: user.email,
});

/**
 * @desc    Registrar un nuevo usuario
 * @route   POST /api/usuarios/registro
 * @access  Público
 */
export const register = async (req, res) => {
  try {
    const nombre = req.body.nombre ?? req.body.name;
    const { email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios (nombre, email, password)',
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un usuario registrado con ese email',
      });
    }

    const nuevoUsuario = new User({
      nombre: String(nombre).trim(),
      email: normalizedEmail,
      password: String(password),
    });

    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: formatUser(usuarioGuardado),
    });
  } catch (error) {
    console.error('Error en register:', error.message);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación en los datos enviados',
        errors: messages,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un usuario registrado con ese email',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno al registrar el usuario',
      error: error.message,
    });
  }
};

/**
 * @desc    Iniciar sesión de usuario y emitir JWT
 * @route   POST /api/usuarios/login
 * @access  Público
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Debe proporcionar email y password',
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const usuario = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!usuario || !(await usuario.comparePassword(String(password)))) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
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

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      user: formatUser(usuario),
    });
  } catch (error) {
    console.error('Error en login:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error interno al iniciar sesión',
      error: error.message,
    });
  }
};
