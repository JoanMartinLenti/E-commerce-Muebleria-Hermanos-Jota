import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

// Carga variables de entorno desde .env
dotenv.config();

// Inicialización de la aplicación Express
const app = express();

// Conectar a la base de datos MongoDB
connectDB();

// Configuración de CORS
// Permite peticiones desde el frontend local y el dominio desplegado en Vercel
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin origin (como aplicaciones móviles, Postman o curl)
      if (!origin) return callback(null, true);

      // Permite orígenes en la lista o cualquier subdominio de vercel.app
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production';

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Acceso no permitido por CORS'));
      }
    },
    credentials: true,
  })
);

// Middlewares para parseo de JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint de prueba y Health Check (esencial para servicios en la nube como Render)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Servidor de Mueblería Jota funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Endpoint raíz de bienvenida
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 40px;">
      <h1 style="color: #63391d;">🪵 API RESTful - Mueblería Jota</h1>
      <p style="font-size: 1.1rem; color: #444;">Servidor backend en Node.js, Express y MongoDB.</p>
      <p>Endpoints principales disponibles:</p>
      <ul style="list-style: none; padding: 0;">
        <li><a href="/api/health" style="color: #b45309; text-decoration: none; font-weight: bold;">/api/health</a> - Health Check</li>
        <li><a href="/api/productos" style="color: #b45309; text-decoration: none; font-weight: bold;">/api/productos</a> - Catálogo de productos (GET, POST)</li>
      </ul>
    </div>
  `);
});

// Rutas de la API
app.use('/api/productos', productRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.originalUrl}`,
  });
});

// Middleware centralizado de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Puerto dinámico asignado por Render o 5000 en entorno local
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`📍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📦 Health Check disponible en: http://localhost:${PORT}/api/health`);
});
