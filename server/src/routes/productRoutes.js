import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Rutas base: /api/productos
router
  .route('/')
  .get(getProducts)     // GET /api/productos - Listar productos (con filtros opcionales)
  .post(createProduct); // POST /api/productos - Crear un producto nuevo

// Rutas por ID: /api/productos/:id
router
  .route('/:id')
  .get(getProductById)  // GET /api/productos/:id - Obtener detalle por ID
  .put(updateProduct)   // PUT /api/productos/:id - Actualizar producto
  .delete(deleteProduct); // DELETE /api/productos/:id - Borrar producto

export default router;
