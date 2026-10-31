import mongoose from 'mongoose';
import Product from '../models/Product.js';

/**
 * @desc    Obtener todos los productos con filtros opcionales
 * @route   GET /api/productos
 * @access  Público
 */
export const getProducts = async (req, res) => {
  try {
    const { categoria, buscar, destacado } = req.query;
    const filter = {};

    // Filtrar por categoría si se provee
    if (categoria && categoria !== 'Todas') {
      filter.categoria = categoria;
    }

    // Filtrar por destacados
    if (destacado === 'true') {
      filter.destacado = true;
    }

    // Búsqueda por término en el nombre o descripción
    if (buscar && buscar.trim() !== '') {
      filter.$or = [
        { nombre: { $regex: buscar.trim(), $options: 'i' } },
        { descripcion: { $regex: buscar.trim(), $options: 'i' } },
      ];
    }

    const productos = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: productos.length,
      data: productos,
    });
  } catch (error) {
    console.error('Error en getProducts:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor al obtener los productos',
      error: error.message,
    });
  }
};

/**
 * @desc    Obtener un solo producto por su ID
 * @route   GET /api/productos/:id
 * @access  Público
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validación de formato ObjectId de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID proporcionado no tiene un formato válido de MongoDB',
      });
    }

    const producto = await Product.findById(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún producto con el ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: producto,
    });
  } catch (error) {
    console.error('Error en getProductById:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor al buscar el producto',
      error: error.message,
    });
  }
};

/**
 * @desc    Crear un nuevo producto
 * @route   POST /api/productos
 * @access  Público / Admin
 */
export const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, imagen, stock, destacado } = req.body;

    // Crear instancia y guardar (aplica validaciones del esquema Mongoose)
    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio: Number(precio),
      categoria,
      imagen,
      stock: Number(stock),
      destacado: Boolean(destacado),
    });

    const productoGuardado = await nuevoProducto.save();

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: productoGuardado,
    });
  } catch (error) {
    console.error('Error en createProduct:', error.message);
    // Errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación en los datos enviados',
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno al crear el producto',
      error: error.message,
    });
  }
};

/**
 * @desc    Actualizar un producto existente
 * @route   PUT /api/productos/:id
 * @access  Público / Admin
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID proporcionado no tiene un formato válido de MongoDB',
      });
    }

    const { nombre, descripcion, precio, categoria, imagen, stock, destacado } = req.body;

    const datosActualizados = {};
    if (nombre !== undefined) datosActualizados.nombre = nombre;
    if (descripcion !== undefined) datosActualizados.descripcion = descripcion;
    if (precio !== undefined) datosActualizados.precio = Number(precio);
    if (categoria !== undefined) datosActualizados.categoria = categoria;
    if (imagen !== undefined) datosActualizados.imagen = imagen;
    if (stock !== undefined) datosActualizados.stock = Number(stock);
    if (destacado !== undefined) datosActualizados.destacado = Boolean(destacado);

    const productoActualizado = await Product.findByIdAndUpdate(
      id,
      datosActualizados,
      {
        new: true, // Devuelve el documento modificado
        runValidators: true, // Ejecuta las validaciones del esquema al actualizar
      }
    );

    if (!productoActualizado) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún producto con el ID: ${id} para actualizar`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: productoActualizado,
    });
  } catch (error) {
    console.error('Error en updateProduct:', error.message);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación en la actualización',
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno al actualizar el producto',
      error: error.message,
    });
  }
};

/**
 * @desc    Eliminar un producto por su ID
 * @route   DELETE /api/productos/:id
 * @access  Público / Admin
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID proporcionado no tiene un formato válido de MongoDB',
      });
    }

    const productoEliminado = await Product.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún producto con el ID: ${id} para eliminar`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto eliminado correctamente',
      data: productoEliminado,
    });
  } catch (error) {
    console.error('Error en deleteProduct:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error interno al eliminar el producto',
      error: error.message,
    });
  }
};
