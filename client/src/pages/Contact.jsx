import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export const Contact = () => {
  // Formulario controlado con useState
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: 'Consulta por mueble a medida',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validaciones básicas de campos
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
      setErrorMsg('Por favor completa los campos obligatorios (Nombre, Email y Mensaje).');
      return;
    }

    setIsSending(true);

    // Simulación de envío de formulario de contacto
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: 'Consulta por mueble a medida',
        mensaje: '',
      });
    }, 600);
  };

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Cabecera */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-wood" style={{ marginBottom: '0.5rem' }}>Atención Personalizada</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Ponete en Contacto</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto' }}>
            ¿Querés un mueble con medidas especiales o asesoramiento en interiorismo? Escribinos y un especialista te responderá a la brevedad.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'start' }}>
          {/* Formulario Controlado */}
          <div className="form-card" style={{ margin: 0, maxWidth: '100%' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={20} color="var(--primary)" /> Envíanos tu consulta
            </h2>

            {submitted && (
              <div className="alert alert-success">
                <CheckCircle2 size={20} />
                <div>
                  <strong>¡Mensaje recibido con éxito!</strong>
                  <p style={{ fontSize: '0.88rem', margin: 0 }}>
                    Nos pondremos en contacto contigo en las próximas 24 horas hábiles.
                  </p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="alert alert-error">
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="nombre">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-input"
                    placeholder="Ej: Camila Rodríguez"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="telefono">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="form-input"
                    placeholder="Ej: 11 5566-7788"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="asunto">
                    Motivo de contacto
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    className="form-select"
                    value={formData.asunto}
                    onChange={handleChange}
                  >
                    <option value="Consulta por mueble a medida">Mueble a medida</option>
                    <option value="Consulta de stock y envíos">Consulta de stock y envíos</option>
                    <option value="Ventas corporativas o proyectos">Ventas corporativas o proyectos</option>
                    <option value="Servicio postventa / Garantía">Servicio postventa o garantía</option>
                    <option value="Otro asunto">Otro asunto</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="mensaje">
                  Mensaje o detalles del proyecto *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  className="form-textarea"
                  rows={5}
                  placeholder="Contanos qué tipo de mueble necesitás, medidas aproximadas, tipo de madera o ambiente a equipar..."
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
                disabled={isSending}
              >
                <Send size={18} />
                <span>{isSending ? 'Enviando mensaje...' : 'Enviar Consulta'}</span>
              </button>
            </form>
          </div>

          {/* Información Institucional */}
          <div>
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Showroom Principal</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '8px' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Dirección</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Av. Del Libertador 4580, Belgrano, CABA
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '8px' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Teléfono & Ventas</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      +54 (11) 4589-9820 / +54 9 11 4589-9820 (WA)
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '8px' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Email</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      contacto@muebleriajota.com
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '8px' }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Horarios de Atención</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Lunes a Viernes: 10:00 - 19:30 hs<br />
                      Sábados: 10:00 - 18:00 hs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
