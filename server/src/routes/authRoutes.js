import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Rutas base: /api/usuarios
router.post('/registro', register); // POST /api/usuarios/registro - Registro de usuario
router.post('/login', login);       // POST /api/usuarios/login - Login y obtención de JWT

export default router;
