import mongoose from 'mongoose';

/**
 * Conexión a la base de datos MongoDB usando Mongoose.
 * Lee la URI desde las variables de entorno (MONGO_URI).
 */
export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.warn('⚠️  ADVERTENCIA: La variable MONGO_URI no está definida en el archivo .env');
    }

    const conn = await mongoose.connect(mongoUri || 'mongodb://127.0.0.1:27017/muebleria_jota');

    console.log(`✅ MongoDB Conectado con éxito: ${conn.connection.host} / BD: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error al conectar a MongoDB: ${error.message}`);
    // En producción o desarrollo podemos alertar el fallo sin terminar inmediatamente el proceso si se quiere reintentar
    process.exit(1);
  }
};

export default connectDB;
