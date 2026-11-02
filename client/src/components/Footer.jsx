import React from 'react';
import { Link } from 'react-router-dom';
import { Armchair, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Columna Marca */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: '#fef08a' }}>
              <Armchair size={24} />
              <span style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                Mueblería Jota
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#a8a29e', lineHeight: 1.6, maxWidth: '320px' }}>
              Diseñamos y fabricamos muebles contemporáneos con madera de bosques sustentables y tapizados premium. Calidad artesanal para tu espacio ideal.
            </p>
          </div>

          {/* Columna Navegación */}
          <div>
            <h4 className="footer-title">Navegación</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Catálogo Completo</Link></li>
              <li><Link to="/contacto">Contacto & Ubicación</Link></li>
              <li><Link to="/admin/crear-producto">Panel de Carga</Link></li>
            </ul>
          </div>

          {/* Columna Categorías */}
          <div>
            <h4 className="footer-title">Categorías</h4>
            <ul className="footer-links">
              <li><Link to="/productos?categoria=Living">Living</Link></li>
              <li><Link to="/productos?categoria=Comedor">Comedor</Link></li>
              <li><Link to="/productos?categoria=Dormitorio">Dormitorio</Link></li>
              <li><Link to="/productos?categoria=Oficina">Oficina</Link></li>
              <li><Link to="/productos?categoria=Exterior">Exterior</Link></li>
            </ul>
          </div>

          {/* Columna Contacto */}
          <div>
            <h4 className="footer-title">Atención al Cliente</h4>
            <ul className="footer-links" style={{ fontSize: '0.88rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#eab308" />
                <span>Av. Libertador 4580, Buenos Aires</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#eab308" />
                <span>+54 (11) 4589-9820</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#eab308" />
                <span>ventas@muebleriajota.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="#eab308" />
                <span>Lun a Sáb: 10:00 a 19:30 hs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Mueblería Jota. Desarrollado para los Sprints 5 y 6 del curso Full Stack MERN con persistencia en MongoDB y Express.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
