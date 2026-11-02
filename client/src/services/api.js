/**
 * Servicio de conexión con la API RESTful de Mueblería Jota
 * Utiliza fetch nativo y gestiona la URL base mediante variables de entorno (VITE_API_URL)
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Obtener listado de productos (con filtros opcionales de búsqueda o categoría)
 */
export const getProducts = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.categoria && filters.categoria !== 'Todas') {
    queryParams.append('categoria', filters.categoria);
  }
  if (filters.buscar) {
    queryParams.append('buscar', filters.buscar);
  }
  if (filters.destacado) {
    queryParams.append('destacado', filters.destacado);
  }

  const queryString = queryParams.toString();
  const url = `${BASE_URL}/productos${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener productos');
  }

  return data.data; // Devuelve array de productos
};

/**
 * Obtener un solo producto por su ID
 */
export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/productos/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `No se pudo obtener el producto con ID: ${id}`);
  }

  return data.data;
};

/**
 * Crear un nuevo producto (POST)
 */
export const createProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorDetails = data.errors ? data.errors.join(', ') : data.message;
    throw new Error(errorDetails || 'Error al crear el producto');
  }

  return data.data;
};

/**
 * Actualizar un producto existente (PUT)
 */
export const updateProduct = async (id, productData) => {
  const response = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorDetails = data.errors ? data.errors.join(', ') : data.message;
    throw new Error(errorDetails || 'Error al actualizar el producto');
  }

  return data.data;
};

/**
 * Eliminar un producto (DELETE)
 */
export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al eliminar el producto');
  }

  return data.data;
};
