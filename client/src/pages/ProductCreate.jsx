import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, ArrowLeft, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { createProduct } from '../services/api.js';

const CATEGORIES = ['Living', 'Comedor', 'Dormitorio', 'Oficina', 'Exterior', 'Accesorios'];

export const ProductCreate = () => {
  // Hook de navegación programática exigido en la consigna
  const navigate = useNavigate();

  // Estado del formulario controlado
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: 'Living',
    imagen: '',
    stock: '',
    destacado: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Manejador genérico para inputs controlados
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Manejador del envío del formulario a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validación básica de campos requeridos
    if (!formData.nombre.trim() || !formData.descripcion.trim() || !formData.precio || !formData.imagen.trim()) {
      setError('Por favor completa todos los campos requeridos (*).');
      return;
    }

    if (Number(formData.precio) < 0 || Number(formData.stock) < 0) {
      setError('El precio y el stock deben ser números positivos.');
      return;
    }

    try {
      setLoading(true);

      // Petición POST al backend
      const nuevoProducto = await createProduct({
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock || 0),
      });

      // Navegación programática con useNavigate tras la creación exitosa
      navigate(`/productos/${nuevoProducto._id}`, { replace: true });
    } catch (err) {
      console.error('Error al dar de alta el producto:', err);
      setError(err.message || 'Error al comunicarse con la API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Enlace para volver */}
        <div style={{ marginBottom: '1.5rem', maxWidth: '720px', margin: '0 auto 1.5rem' }}>
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
            <ArrowLeft size={16} /> Volver al catálogo
          </Link>
        </div>

        <div className="form-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '10px' }}>
              <PlusCircle size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem' }}>Alta de Nuevo Mueble</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Completa los datos para registrar la pieza en el catálogo de Mueblería Jota.
              </p>
            </div>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Nombre del Mueble */}
            <div className="form-group">
              <label className="form-label" htmlFor="nombre">
                Nombre de la pieza *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-input"
                placeholder="Ej: Sofá Nórdico Oslo 3 Cuerpos"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            {/* Categoría y Precio */}
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
                  placeholder="Ej: 285000"
                  min="0"
                  step="any"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Stock y Destacado */}
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
                  placeholder="Ej: 10"
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

            {/* URL de Imagen */}
            <div className="form-group">
              <label className="form-label" htmlFor="imagen">
                URL de la Imagen *
              </label>
              <input
                type="url"
                id="imagen"
                name="imagen"
                className="form-input"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.imagen}
                onChange={handleChange}
                required
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.25rem', display: 'block' }}>
                Podés pegar un enlace directo de Unsplash u otro servicio de imágenes.
              </span>
            </div>

            {/* Vista previa de imagen si hay URL */}
            {formData.imagen && (
              <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Vista previa de la imagen:
                </span>
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

            {/* Descripción */}
            <div className="form-group">
              <label className="form-label" htmlFor="descripcion">
                Descripción detallada de la pieza *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="form-textarea"
                rows={4}
                placeholder="Describí las medidas, madera, tapizado, tratamiento y estilo del mueble..."
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>

            {/* Botones de Acción */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/productos')}
                disabled={loading}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <PlusCircle size={18} />
                <span>{loading ? 'Guardando en Base de Datos...' : 'Publicar Mueble'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
