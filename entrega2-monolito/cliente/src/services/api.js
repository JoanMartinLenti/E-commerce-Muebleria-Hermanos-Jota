const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/productos';

async function solicitar(endpoint = '', signal) {
  const respuesta = await fetch(`${API_URL}${endpoint}`, { signal });

  if (!respuesta.ok) {
    throw new Error(`El servidor respondió con el estado ${respuesta.status}.`);
  }

  return respuesta.json();
}

export function obtenerProductos(signal) {
  return solicitar('', signal);
}

export function obtenerProducto(id, signal) {
  return solicitar(`/${encodeURIComponent(id)}`, signal);
}
