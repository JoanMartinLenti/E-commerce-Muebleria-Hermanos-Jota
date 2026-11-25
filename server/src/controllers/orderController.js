import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

/**
 * @desc    Crear un nuevo pedido asociado al usuario autenticado
 * @route   POST /api/pedidos
 * @access  Privado (JWT)
 */
export const createOrder = async (req, res) => {
  try {
    const { items, direccionEnvio } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El pedido debe incluir al menos un producto en items',
      });
    }

    // Validar estructura de cada ítem antes de consultar la base de datos
    const normalizedItems = [];
    for (const item of items) {
      const productId = item?.producto ?? item?.productId;
      const cantidad = Number(item?.cantidad);

      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          success: false,
          message: `ID de producto inválido: ${productId || 'vacío'}`,
        });
      }

      if (!Number.isInteger(cantidad) || cantidad < 1) {
        return res.status(400).json({
          success: false,
          message: 'La cantidad de cada producto debe ser un número entero mayor o igual a 1',
        });
      }

      normalizedItems.push({ productId: String(productId), cantidad });
    }

    // Obtener los productos reales desde MongoDB para recalcular precios y total
    const uniqueIds = [...new Set(normalizedItems.map((i) => i.productId))];
    const productosDB = await Product.find({ _id: { $in: uniqueIds } });
    const productMap = new Map(productosDB.map((p) => [p._id.toString(), p]));

    const orderItems = [];
    let total = 0;

    for (const item of normalizedItems) {
      const producto = productMap.get(item.productId);
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: `No se encontró ningún producto con el ID: ${item.productId}`,
        });
      }

      orderItems.push({
        producto: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: item.cantidad,
      });

      total += producto.precio * item.cantidad;
    }

    const nuevoPedido = new Order({
      usuario: req.user._id,
      items: orderItems,
      total,
      ...(direccionEnvio !== undefined && { direccionEnvio }),
    });

    const pedidoGuardado = await nuevoPedido.save();

    res.status(201).json({
      success: true,
      message: 'Pedido creado exitosamente',
      data: pedidoGuardado,
    });
  } catch (error) {
    console.error('Error en createOrder:', error.message);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación en los datos del pedido',
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno al crear el pedido',
      error: error.message,
    });
  }
};

/**
 * @desc    Obtener los pedidos del usuario autenticado
 * @route   GET /api/pedidos/mis-pedidos
 * @access  Privado (JWT)
 */
export const getMyOrders = async (req, res) => {
  try {
    const pedidos = await Order.find({ usuario: req.user._id })
      .populate('items.producto', 'nombre imagen categoria')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: pedidos.length,
      data: pedidos,
    });
  } catch (error) {
    console.error('Error en getMyOrders:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error interno al obtener tus pedidos',
      error: error.message,
    });
  }
};
