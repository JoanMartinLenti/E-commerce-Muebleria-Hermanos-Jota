import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit3, ArrowLeft, Save } from 'lucide-react';
import { getProductById, updateProduct } from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const CATEGORIES = ['Living', 'Comedor', 'Dormitorio', 'Oficina', 'Exterior', 'Accesorios'];

export const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: 'Living',
    imagen: '',
    stock: '',
    destacado: false,
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos previos del producto a editar
  useEffect(() => {
    const fetchExistingProduct = async () => {
      try {
        setInitialLoading(true);
        setError(null);
        const data = await getProductById(id);
        setFormData({
          nombre: data.nombre || '',
          descripcion: data.descripcion || '',
          precio: data.precio !== undefined ? data.precio : '',
          categoria: data.categoria || 'Living',
          imagen: data.imagen || '',
          stock: data.stock !== undefined ? data.stock : '',
          destacado: Boolean(data.destacado),
        });
      } catch (err) {
        console.error('Error al cargar datos del producto:', err);
        setError(err.message || 'No se pudo cargar el producto para edición');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchExistingProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.nombre.trim() || !formData.descripcion.trim() || !formData.precio || !formData.imagen.trim()) {
      setError('Por favor completa todos los campos requeridos (*).');
      return;
    }

    try {
      setSubmitting(true);
      await updateProduct(id, {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock || 0),
      });

      // Redirige programáticamente a la vista de detalle actualizada
      navigate(`/productos/${id}`, { replace: true });
    } catch (err) {
      console.error('Error al actualizar:', err);
      setError(err.message || 'Error al actualizar el producto');
    } finally {
      setSubmitting(false);
    }
  };

  if (initialLoading) {
    return <LoadingSpinner mensaje="Cargando información del producto a editar..." />;
  }

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        <div style={{ marginBottom: '1.5rem', maxWidth: '720px', margin: '0 auto 1.5rem' }}>
          <Link
            to={`/productos/${id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            <ArrowLeft size={16} /> Volver al detalle
          </Link>
        </div>

        <div className="form-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '10px' }}>
              <Edit3 size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem' }}>Editar Mueble</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Modifica los datos del producto y guarda los cambios en MongoDB.
              </p>
            </div>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="nombre">
                Nombre de la pieza *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-input"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="categoria">
                  Categoría *
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  className="form-select"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="precio">
                  Precio (ARS $) *
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  className="form-input"
                  min="0"
                  step="any"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="stock">
                  Stock disponible *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  className="form-input"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', paddingTop: '1.8rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    name="destacado"
                    checked={formData.destacado}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                  />
                  <span>Destacar producto en la portada</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="imagen">
                URL de la Imagen *
              </label>
              <input
                type="url"
                id="imagen"
                name="imagen"
                className="form-input"
                value={formData.imagen}
                onChange={handleChange}
                required
              />
            </div>

            {formData.imagen && (
              <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                <img
                  src={formData.imagen}
                  alt="Vista previa"
                  style={{ maxHeight: '180px', borderRadius: '10px', margin: '0 auto', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="descripcion">
                Descripción detallada *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="form-textarea"
                rows={4}
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(`/productos/${id}`)}
                disabled={submitting}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                <Save size={18} />
                <span>{submitting ? 'Guardando Cambios...' : 'Guardar Modificaciones'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
