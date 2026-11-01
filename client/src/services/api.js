const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error(`Error al obtener productos: ${res.statusText}`);
  }
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error(`Error al obtener el producto: ${res.statusText}`);
  }
  return res.json();
};