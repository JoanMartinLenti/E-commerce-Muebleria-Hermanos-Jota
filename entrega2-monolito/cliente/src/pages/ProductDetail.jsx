import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductDetailView from '../components/ProductDetail';
import { obtenerProducto } from '../services/api';

function ProductDetail({ onAgregar }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [estado, setEstado] = useState('cargando');
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setEstado('cargando');
    setError('');
    obtenerProducto(id, controller.signal)
      .then((dato) => { setProducto(dato); setEstado('exito'); })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') return;
        setError(fetchError.message || 'No se pudo cargar el producto.');
        setEstado('error');
      });
    return () => controller.abort();
  }, [id]);

  if (estado === 'cargando') return <main className="catalog-page"><LoadingSpinner label="Cargando producto..." /></main>;
  if (estado === 'error') return <main className="catalog-page"><div className="catalog-message catalog-error" role="alert"><h3>No pudimos cargar el producto</h3><p>{error}</p><Link className="retry-button" to="/">Volver al catálogo</Link></div></main>;
  return <main className="catalog-page"><ProductDetailView producto={producto} onVolver={() => window.history.back()} onAgregar={onAgregar} /></main>;
}

export default ProductDetail;
