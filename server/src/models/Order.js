import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'El ID del producto es obligatorio'],
    },
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, 'El precio del producto es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    cantidad: {
      type: Number,
      required: [true, 'La cantidad es obligatoria'],
      min: [1, 'La cantidad mínima por producto es 1'],
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El pedido debe estar asociado a un usuario'],
      index: true,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: 'El pedido debe incluir al menos un producto',
      },
    },
    total: {
      type: Number,
      required: [true, 'El total del pedido es obligatorio'],
      min: [0, 'El total no puede ser negativo'],
    },
    estado: {
      type: String,
      enum: {
        values: ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'],
        message: 'El estado {VALUE} no es válido',
      },
      default: 'pendiente',
    },
    direccionEnvio: {
      type: String,
      trim: true,
      maxlength: [300, 'La dirección de envío no puede exceder los 300 caracteres'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
