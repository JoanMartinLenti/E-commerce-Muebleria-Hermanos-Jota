import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Truck,
  ShieldCheck,
  MessageCircle,
  Calendar,
} from 'lucide-react';
import { getProductById, deleteProduct } from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

export const ProductDetail = () => {
  // 1. Extraemos el parámetro :id de la URL utilizando useParams (Requisito de la consigna)
  const { id } = useParams();

  // 2. Hook useNavigate para navegación programática tras eliminar o volver
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error al cargar detalle:', err);
        setError(err.message || 'No se pudo cargar el producto solicitado');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // Manejador para eliminar el producto
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteProduct(id);
      // Redirección programática al catálogo tras borrar exitosamente
      navigate('/productos', { replace: true });
    } catch (err) {
      alert(`Error al eliminar: ${err.message}`);
      setIsDeleting(false);
      setShowConfirmModal(false);
    }
  };

  if (loading) {
    return <LoadingSpinner mensaje="Cargando detalles de la pieza de mueblería..." />;
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="alert alert-error" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          <span>{error || 'El producto solicitado no existe en nuestro catálogo.'}</span>
        </div>
        <Link to="/productos" className="btn btn-primary">
          <ArrowLeft size={16} /> Volver al Catálogo
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.precio);

  return (
    <div style={{ padding: '2rem 0 5rem' }}>
      <div className="container">
        {/* Navegación de migas de pan / Volver */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            to="/productos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            <ArrowLeft size={16} /> Volver al catálogo de muebles
          </Link>
        </div>

        {/* Grilla principal de detalle */}
        <div className="detail-grid">
          {/* Imagen de la pieza */}
          <div className="detail-gallery">
            <img
              src={product.imagen || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'}
              alt={product.nombre}
              className="detail-main-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80';
              }}
            />
          </div>

          {/* Información y especificaciones */}
          <div className="detail-info">
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="badge badge-wood">{product.categoria}</span>
              {product.destacado && (
                <span className="badge" style={{ background: '#fef08a', color: '#854d0e' }}>
                  Pieza Destacada
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{product.nombre}</h1>

            <div className="detail-price">{formattedPrice}</div>

            {/* Estado de Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {product.stock > 5 ? (
                <span className="badge badge-in-stock">
                  <CheckCircle2 size={14} /> En Stock ({product.stock} unidades disponibles)
                </span>
              ) : product.stock > 0 ? (
                <span className="badge badge-low-stock">
                  <AlertTriangle size={14} /> ¡Últimas {product.stock} unidades disponibles!
                </span>
              ) : (
                <span className="badge badge-out-of-stock">
                  <XCircle size={14} /> Producto sin stock por el momento
                </span>
              )}
            </div>

            {/* Descripción */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Descripción y Características
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem', whiteSpace: 'pre-line' }}>
                {product.descripcion}
              </p>
            </div>

            {/* Beneficios adicionales */}
            <div
              style={{
                background: 'var(--bg-subtle)',
                padding: '1.25rem',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginBottom: '2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <Truck size={18} color="var(--primary)" />
                <span>Envío bonificado en CABA y GBA para compras superiores a $150.000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <ShieldCheck size={18} color="var(--primary)" />
                <span>Garantía estructural de 5 años por defectos de fabricación</span>
              </div>
            </div>

            {/* Botón de Consulta / Compra */}
            <a
              href={`https://wa.me/5491145899820?text=${encodeURIComponent(`Hola Mueblería Jota, estoy interesado/a en la pieza: "${product.nombre}" (ID: ${product._id}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '0.9rem 1.5rem', fontSize: '1.05rem', justifyContent: 'center' }}
            >
              <MessageCircle size={20} />
              <span>Consultar Disponibilidad por WhatsApp</span>
            </a>

            {/* Barra de Acciones Administrativas (CRUD: Editar / Eliminar) */}
            <div className="detail-admin-bar">
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', width: '100%', marginBottom: '0.5rem' }}>
                Acciones de Gestión (CRUD):
              </span>
              <Link to={`/admin/editar-producto/${product._id}`} className="btn btn-secondary" style={{ flex: 1 }}>
                <Edit size={16} /> Editar Mueble
              </Link>
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="btn btn-danger"
                style={{ flex: 1 }}
              >
                <Trash2 size={16} /> Eliminar Mueble
              </button>
            </div>
          </div>
        </div>

        {/* Modal de confirmación para eliminar */}
        {showConfirmModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: '1.5rem',
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '450px',
                width: '100%',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--danger)' }}>
                ¿Confirmar eliminación?
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Estás a punto de borrar permanentemente la pieza <strong>"{product.nombre}"</strong> de la base de datos de MongoDB. Esta acción no se puede deshacer.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                  disabled={isDeleting}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Eliminando...' : 'Sí, Eliminar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
