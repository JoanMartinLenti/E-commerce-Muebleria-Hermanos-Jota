import express from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rutas base: /api/pedidos (todas protegidas con JWT)
router.post('/', protect, createOrder);           // POST /api/pedidos - Crear pedido del usuario autenticado
router.get('/mis-pedidos', protect, getMyOrders); // GET /api/pedidos/mis-pedidos - Consultar pedidos del usuario

export default router;
