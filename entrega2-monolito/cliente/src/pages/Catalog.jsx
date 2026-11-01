import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import { obtenerProductos } from '../services/api';

function Catalog({ onAgregar }) {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [estado, setEstado] = useState('cargando');
  const [error, setError] = useState('');
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setEstado('cargando');
    setError('');

    obtenerProductos(controller.signal)
      .then((datos) => {
        if (!Array.isArray(datos)) throw new Error('La respuesta de la API no tiene el formato esperado.');
        setProductos(datos);
        setEstado('exito');
      })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') return;
        setError(fetchError.message || 'No se pudo conectar con el servidor.');
        setEstado('error');
      });

    return () => controller.abort();
  }, [intento]);

  const categorias = useMemo(
    () => ['Todos', ...new Set(productos.map((producto) => producto.categoria).filter(Boolean))],
    [productos]
  );

  const productosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLocaleLowerCase('es');
    return productos.filter((producto) => {
      const coincideCategoria = categoria === 'Todos' || producto.categoria === categoria;
      const texto = `${producto.nombre || ''} ${producto.descripcion || ''} ${producto.categoria || ''}`;
      return coincideCategoria && texto.toLocaleLowerCase('es').includes(termino);
    });
  }, [busqueda, categoria, productos]);

  return (
    <main className="catalog-page" id="catalogo">
      <section className="catalog-intro" aria-labelledby="catalog-title">
        <p className="catalog-eyebrow">Muebles de autor · Hechos para durar</p>
        <h1 id="catalog-title">Una casa con historia</h1>
        <p className="catalog-description">Diseños honestos, materiales nobles y piezas creadas para acompañarte todos los días.</p>
      </section>
      <section className="catalog-content" aria-label="Catálogo de productos">
        <div className="catalog-toolbar">
          <div className="catalog-heading"><p className="catalog-eyebrow">Nuestra colección</p><h2>Elegí tu próxima pieza</h2></div>
          <label className="catalog-search">
            <span className="sr-only">Buscar productos</span>
            <input type="search" value={busqueda} onChange={(evento) => setBusqueda(evento.target.value)} placeholder="Buscar muebles..." />
          </label>
        </div>
        {estado === 'cargando' && <LoadingSpinner label="Cargando catálogo..." />}
        {estado === 'error' && <div className="catalog-message catalog-error" role="alert"><h3>No pudimos cargar el catálogo</h3><p>{error}</p><button className="retry-button" onClick={() => setIntento((valor) => valor + 1)} type="button">Reintentar</button></div>}
        {estado === 'exito' && (
          <>
            <div className="category-filters" aria-label="Filtrar por categoría">
              {categorias.map((opcion) => <button className={`category-filter${categoria === opcion ? ' is-active' : ''}`} key={opcion} onClick={() => setCategoria(opcion)} type="button" aria-pressed={categoria === opcion}>{opcion}</button>)}
            </div>
            <p className="catalog-count" aria-live="polite">{productosFiltrados.length} {productosFiltrados.length === 1 ? 'pieza' : 'piezas'}</p>
            {productosFiltrados.length === 0 ? <div className="catalog-message"><h3>No encontramos piezas con esa búsqueda</h3><p>Probá con otro nombre o elegí una categoría diferente.</p></div> : <div className="product-grid">{productosFiltrados.map((producto) => <ProductCard key={producto.id} producto={producto} onAgregar={onAgregar} onVerDetalle={() => navigate(`/producto/${producto.id}`)} />)}</div>}
          </>
        )}
      </section>
    </main>
  );
}

export default Catalog;
