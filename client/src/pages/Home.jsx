import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Clock, Palette } from 'lucide-react';
import { getProducts } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        // Traemos productos destacados o los primeros del catálogo
        const products = await getProducts({ destacado: true });
        setFeaturedProducts(products.length > 0 ? products.slice(0, 4) : []);
      } catch (err) {
        console.warn('No se pudieron cargar los destacados de la API:', err.message);
        setError('El servidor backend se está inicializando o no está disponible.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const categories = [
    { name: 'Living', icon: '🛋️', desc: 'Sofás, racks y sillones' },
    { name: 'Comedor', icon: '🪑', desc: 'Mesas y juegos de sillas' },
    { name: 'Dormitorio', icon: '🛏️', desc: 'Camas, respaldos y mesas de luz' },
    { name: 'Oficina', icon: '💼', desc: 'Escritorios y sillas ejecutivas' },
    { name: 'Exterior', icon: '🌿', desc: 'Juegos de jardín y galerías' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="hero-tag">
                <Sparkles size={16} /> Muebles de autor & diseño sustentable
              </span>
              <h1 className="hero-title">
                Espacios que inspiran, muebles que <span>perduran</span>.
              </h1>
              <p className="hero-subtitle">
                En <strong>Mueblería Jota</strong> combinamos maderas macizas seleccionadas con la precisión de la carpintería moderna para crear ambientes cálidos y funcionales.
              </p>
              <div className="hero-actions">
                <Link to="/productos" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1.05rem' }}>
                  <span>Explorar Catálogo</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/contacto" className="btn btn-secondary" style={{ padding: '0.85rem 1.5rem', fontSize: '1.05rem' }}>
                  <span>Asesoramiento a Medida</span>
                </Link>
              </div>
            </div>

            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="Ambiente diseñado por Mueblería Jota"
                className="hero-image"
              />
              <div className="hero-floating-stat">
                <div style={{ background: '#fef08a', color: '#854d0e', padding: '0.5rem', borderRadius: '8px' }}>
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Garantía 5 Años</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Calidad artesanal certificada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de Valor */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '12px' }}>
                <Truck size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>Envíos a Todo el País</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Embalaje reforzado y logística especializada para que tu mueble llegue impecable.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '12px' }}>
                <Palette size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>Personalización Total</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Elegí lustres, maderas y telas según el estilo y dimensiones de tu hogar.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '12px' }}>
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>Entrega Programada</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Coordinamos día y rango horario exacto de entrega con personal propio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías Principales */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Ambientes que Creamos</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto' }}>
              Descubrí nuestras líneas de diseño pensadas para cada rincón de tu casa.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/productos?categoria=${cat.name}`}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section style={{ padding: '3.5rem 0 5rem', background: 'var(--bg-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
              <span className="badge badge-wood" style={{ marginBottom: '0.5rem' }}>Catálogo Selección</span>
              <h2 style={{ fontSize: '2.2rem' }}>Muebles Destacados</h2>
            </div>
            <Link to="/productos" className="btn btn-outline">
              <span>Ver todos los muebles</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner mensaje="Cargando muebles destacados..." />
          ) : error ? (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '16px' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                No hay productos destacados aún cargados en la base de datos.
              </p>
              <Link to="/admin/crear-producto" className="btn btn-primary">
                Cargar Primer Producto
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
