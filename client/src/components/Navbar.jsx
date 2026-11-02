import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Armchair, PlusCircle, Menu, X, PhoneCall } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Marca / Logo */}
          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <div className="nav-brand-logo">
              <Armchair size={22} />
            </div>
            <span>Mueblería Jota</span>
          </Link>

          {/* Enlaces de escritorio */}
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/productos"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  Catálogo
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contacto"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  Contacto
                </NavLink>
              </li>
              <li>
                <Link to="/admin/crear-producto" className="nav-admin-btn">
                  <PlusCircle size={16} />
                  <span>Publicar Mueble</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Botón menú responsive */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Menú móvil desplegable */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '1rem 0 1.5rem',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMenu}
              style={{ fontSize: '1.1rem', padding: '0.5rem 0' }}
            >
              Inicio
            </NavLink>
            <NavLink
              to="/productos"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMenu}
              style={{ fontSize: '1.1rem', padding: '0.5rem 0' }}
            >
              Catálogo de Muebles
            </NavLink>
            <NavLink
              to="/contacto"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMenu}
              style={{ fontSize: '1.1rem', padding: '0.5rem 0' }}
            >
              Contacto
            </NavLink>
            <Link
              to="/admin/crear-producto"
              className="btn btn-primary"
              onClick={closeMenu}
              style={{ marginTop: '0.5rem', justifyContent: 'center' }}
            >
              <PlusCircle size={18} />
              Publicar Nuevo Mueble
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
