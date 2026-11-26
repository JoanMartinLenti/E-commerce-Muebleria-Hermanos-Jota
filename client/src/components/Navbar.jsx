import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Armchair, PlusCircle, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  const renderLinks = () => (
    <>
      <li><NavLink to="/" className={linkClass} onClick={closeMenu}>Inicio</NavLink></li>
      <li><NavLink to="/productos" className={linkClass} onClick={closeMenu}>Catálogo</NavLink></li>
      <li><NavLink to="/contacto" className={linkClass} onClick={closeMenu}>Contacto</NavLink></li>

      {isAuthenticated ? (
        <>
          <li><NavLink to="/mis-pedidos" className={linkClass} onClick={closeMenu}>Mis pedidos</NavLink></li>
          <li><NavLink to="/perfil" className={linkClass} onClick={closeMenu}>Hola, {user.nombre}</NavLink></li>
          <li>
            <Link to="/admin/crear-producto" className="nav-admin-btn" onClick={closeMenu}>
              <PlusCircle size={16} />
              <span>Publicar Mueble</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="nav-link"
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Cerrar sesión
            </button>
          </li>
        </>
      ) : (
        <>
          <li><NavLink to="/login" className={linkClass} onClick={closeMenu}>Ingresar</NavLink></li>
          <li>
            <Link to="/registro" className="nav-admin-btn" onClick={closeMenu}>
              Registrarse
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <div className="nav-brand-logo">
              <Armchair size={22} />
            </div>
            <span>Mueblería Jota</span>
          </Link>

          {/* Escritorio */}
          <nav>
            <ul className="nav-links">{renderLinks()}</ul>
          </nav>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Móvil */}
        {mobileMenuOpen && (
          <ul
            style={{
              listStyle: 'none',
              padding: '1rem 0 1.5rem',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {renderLinks()}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Navbar;