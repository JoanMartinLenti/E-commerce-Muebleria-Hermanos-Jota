import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: 'red' }}>{error || 'Producto no encontrado'}</p>
        <Link to="/catalog" style={{ textDecoration: 'underline', color: '#2563eb' }}>
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
      <Link to="/catalog" style={{ display: 'inline-block', marginBottom: '1.5rem', color: '#4b5563', textDecoration: 'none' }}>
        ← Volver al catálogo
      </Link>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        <img
          src={product.image || 'https://via.placeholder.com/450x350?text=Mueble'}
          alt={product.name}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '6px' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '2rem', margin: '0.5rem 0 1rem' }}>{product.name}</h1>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {product.description}
          </p>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '1.5rem' }}>
            ${product.price}
          </span>
          <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
            Stock disponible: <strong>{product.stock ?? 'Consultar'}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
