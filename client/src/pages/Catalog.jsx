import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, PlusCircle, RefreshCw } from 'lucide-react';
import { getProducts } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const CATEGORIES = ['Todas', 'Living', 'Comedor', 'Dormitorio', 'Oficina', 'Exterior', 'Accesorios'];

export const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('categoria') || 'Todas';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');

  // Efecto para sincronizar parámetro de URL si cambia
  useEffect(() => {
    const urlCat = searchParams.get('categoria');
    if (urlCat && urlCat !== selectedCategory) {
      setSelectedCategory(urlCat);
    }
  }, [searchParams]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = {};
      if (selectedCategory !== 'Todas') {
        filters.categoria = selectedCategory;
      }
      if (searchTerm.trim()) {
        filters.buscar = searchTerm.trim();
      }

      const data = await getProducts(filters);
      setProducts(data);
    } catch (err) {
      console.error('Error al cargar catálogo:', err);
      setError(err.message || 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadProducts();
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'Todas') {
      searchParams.delete('categoria');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ categoria: cat });
    }
  };

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Cabecera del catálogo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', marginBottom: '0.35rem' }}>Catálogo de Muebles</h1>
            <p style={{ color: 'var(--text-muted)' }}>
              Piezas artesanales diseñadas para perdurar en el tiempo.
            </p>
          </div>

          <Link to="/admin/crear-producto" className="btn btn-primary">
            <PlusCircle size={18} />
            <span>Agregar Mueble</span>
          </Link>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: '16px',
            padding: '1.25rem',
            marginBottom: '2.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Búsqueda */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}
              />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '40px' }}
                placeholder="Buscar por nombre o descripción (ej: 'Sofá nórdico', 'Mesa de roble')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Buscar
            </button>
            {(searchTerm || selectedCategory !== 'Todas') && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todas');
                  setSearchParams({});
                }}
                title="Limpiar filtros"
              >
                <RefreshCw size={16} />
              </button>
            )}
          </form>

          {/* Pastillas de Categorías */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginRight: '0.5rem' }}>
              <Filter size={14} /> Categoría:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    background: isSelected ? 'var(--primary)' : 'var(--bg-main)',
                    color: isSelected ? 'white' : 'var(--text-main)',
                    border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                    padding: '0.4rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conteo de resultados */}
        {!loading && !error && (
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Mostrando <strong>{products.length}</strong> producto{products.length !== 1 ? 's' : ''}
              {selectedCategory !== 'Todas' && ` en la categoría "${selectedCategory}"`}
            </span>
          </div>
        )}

        {/* Estado de Carga */}
        {loading && <LoadingSpinner mensaje="Cargando productos de la base de datos..." />}

        {/* Mensaje de Error */}
        {error && (
          <div className="alert alert-error">
            <div>
              <strong>Error al obtener los datos:</strong> {error}
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={loadProducts} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grilla de Productos */}
        {!loading && !error && products.length > 0 && (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Estado Vacío */}
        {!loading && !error && products.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              background: 'var(--bg-surface)',
              borderRadius: '16px',
              border: '1px dashed var(--border-strong)',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No se encontraron productos</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
              No hay muebles que coincidan con los criterios de búsqueda o la categoría seleccionada.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todas');
                  setSearchParams({});
                }}
                className="btn btn-secondary"
              >
                Limpiar Filtros
              </button>
              <Link to="/admin/crear-producto" className="btn btn-primary">
                <PlusCircle size={16} /> Crear Producto
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
