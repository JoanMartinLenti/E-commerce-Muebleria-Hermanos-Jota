import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

const initialProducts = [
  {
    nombre: 'Sofá Nórdico Oslo 3 Cuerpos',
    descripcion: 'Sofá tapizado en lino antimanchas de alta resistencia, estructura de madera maciza de paraíso y patas cónicas estilo escandinavo. Asientos de espuma soft de alta densidad para máximo confort.',
    precio: 285000,
    categoria: 'Living',
    imagen: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    stock: 8,
    destacado: true,
  },
  {
    nombre: 'Mesa de Comedor Roble Austral',
    descripcion: 'Mesa rectangular de 1.80m x 0.90m construida íntegramente en madera maciza de roble con acabado poliuretánico mate. Capacidad cómoda para 6 a 8 comensales.',
    precio: 198000,
    categoria: 'Comedor',
    imagen: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80',
    stock: 5,
    destacado: true,
  },
  {
    nombre: 'Silla Eames Wood Tapizada (Pack x4)',
    descripcion: 'Juego de 4 sillas de comedor ergonómicas con casco acolchado en ecocuero gris y patas de madera de haya con refuerzo metálico negro.',
    precio: 112000,
    categoria: 'Comedor',
    imagen: 'https://images.unsplash.com/photo-1580481077111-965d83610488?auto=format&fit=crop&w=1000&q=80',
    stock: 12,
    destacado: false,
  },
  {
    nombre: 'Cama Queen Size con Respaldo Acolchado',
    descripcion: 'Base sommier para colchón de 1.60m x 2.00m con 4 cajones inferiores integrados y respaldo capitoné en pana gris grafito. Gran capacidad de guardado.',
    precio: 340000,
    categoria: 'Dormitorio',
    imagen: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    stock: 4,
    destacado: true,
  },
  {
    nombre: 'Mesa de Noche Minimalista Tokyo',
    descripcion: 'Mesa de luz flotante o con patas metálicas, con un cajón con corredera telescópica suave y nicho abierto para libros y accesorios.',
    precio: 45000,
    categoria: 'Dormitorio',
    imagen: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80',
    stock: 15,
    destacado: false,
  },
  {
    nombre: 'Escritorio Home Office Industrial Iron & Wood',
    descripcion: 'Escritorio de 1.40m x 0.60m con tapa de madera maciza de pino seleccionado de 2 pulgadas y estructura de caño estructural con pintura epoxi al horno.',
    precio: 135000,
    categoria: 'Oficina',
    imagen: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
    stock: 9,
    destacado: true,
  },
  {
    nombre: 'Sillón Ejecutivo Ergonómico Berlín',
    descripcion: 'Sillón de oficina con soporte lumbar ajustable, respaldo en malla transpirable, apoyabrazos 3D y mecanismo sincrónico basculante.',
    precio: 165000,
    categoria: 'Oficina',
    imagen: 'https://images.unsplash.com/photo-1580481077196-1894d015c32c?auto=format&fit=crop&w=1000&q=80',
    stock: 7,
    destacado: false,
  },
  {
    nombre: 'Juego de Living Exterior Tulum',
    descripcion: 'Set de jardín compuesto por sillón de 2 cuerpos, 2 sillones individuales y mesa baja, fabricados en ratán sintético resistente al sol y lluvia con almohadones náuticos lavables.',
    precio: 395000,
    categoria: 'Exterior',
    imagen: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    stock: 3,
    destacado: true,
  },
  {
    nombre: 'Rack de TV y Vajillero Vintage',
    descripcion: 'Mueble para TV de hasta 65 pulgadas con puertas corredizas en madera alistonada y estantes regulables para consolas y decodificadores.',
    precio: 178000,
    categoria: 'Living',
    imagen: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
    stock: 6,
    destacado: false,
  },
  {
    nombre: 'Lámpara de Pie Trípode Escandinava',
    descripcion: 'Lámpara de pie de diseño trípode en madera torneada de guatambú con pantalla cilíndrica de tela de lino blanco y cable entelado textil.',
    precio: 52000,
    categoria: 'Accesorios',
    imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    stock: 14,
    destacado: false,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Limpiando productos existentes...');
    await Product.deleteMany();

    console.log('🌱 Insertando productos de Mueblería Jota...');
    const inserted = await Product.insertMany(initialProducts);

    console.log(`✨ ¡Base de datos poblada exitosamente con ${inserted.length} productos!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al sembrar la base de datos:', error.message);
    process.exit(1);
  }
};

seedDatabase();
