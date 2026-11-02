import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
      maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
      maxlength: [1000, 'La descripción no puede exceder los 1000 caracteres'],
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio debe ser un número positivo'],
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      enum: {
        values: ['Living', 'Comedor', 'Dormitorio', 'Oficina', 'Exterior', 'Accesorios'],
        message: 'La categoría {VALUE} no es válida. Opciones: Living, Comedor, Dormitorio, Oficina, Exterior, Accesorios',
      },
    },
    imagen: {
      type: String,
      required: [true, 'La URL de la imagen es obligatoria'],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    destacado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false,
  }
);

// Índice de texto para búsquedas eficientes en nombre y descripción
productSchema.index({ nombre: 'text', descripcion: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
