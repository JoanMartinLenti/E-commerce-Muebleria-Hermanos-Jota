import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      backgroundColor: '#fff'
    }}>
      <img
        src={product.image || 'https://via.placeholder.com/300x200?text=Mueble'}
        alt={product.name}
        style={{ width: '100%', height: '220px', objectFit: 'cover' }}
      />
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase' }}>
          {product.category}
        </span>
        <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem', color: '#111827' }}>
          {product.name}
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#4b5563', flexGrow: 1, margin: '0 0 1rem' }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a' }}>
            ${product.price}
          </span>
          <Link
            to={`/catalog/${product._id || product.id}`}
            style={{
              backgroundColor: '#1f2937',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            Ver Detalle
          </Link>
        </div>
      </div>
    </div>
  );
}
