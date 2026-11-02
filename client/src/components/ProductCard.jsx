import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export const ProductCard = ({ product }) => {
  // Formatear precio en moneda local
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.precio);

  // Determinar badge de stock
  const renderStockBadge = () => {
    if (product.stock > 5) {
      return (
        <span className="badge badge-in-stock">
          <CheckCircle2 size={12} /> En Stock ({product.stock})
        </span>
      );
    } else if (product.stock > 0) {
      return (
        <span className="badge badge-low-stock">
          <AlertTriangle size={12} /> Últimas {product.stock} un.
        </span>
      );
    } else {
      return (
        <span className="badge badge-out-of-stock">
          <XCircle size={12} /> Sin Stock
        </span>
      );
    }
  };

  return (
    <article className="product-card">
      <div className="card-image-wrap">
        <img
          src={product.imagen || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'}
          alt={product.nombre}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="card-floating-badge">
          {product.destacado && (
            <span className="badge badge-wood" style={{ marginRight: '0.4rem' }}>
              Destacado
            </span>
          )}
          {renderStockBadge()}
        </div>
      </div>

      <div className="card-content">
        <span className="card-category">{product.categoria}</span>
        <h3 className="card-title" title={product.nombre}>
          {product.nombre}
        </h3>
        <p className="card-desc">
          {product.descripcion}
        </p>

        <div className="card-footer">
          <span className="card-price">{formattedPrice}</span>
          <Link to={`/productos/${product._id}`} className="btn btn-primary card-btn">
            <span>Ver Detalle</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
