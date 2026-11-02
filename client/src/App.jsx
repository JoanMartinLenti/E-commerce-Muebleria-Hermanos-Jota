import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Contact from './pages/Contact.jsx';
import ProductCreate from './pages/ProductCreate.jsx';
import ProductEdit from './pages/ProductEdit.jsx';

export const App = () => {
  return (
    <div className="app-container">
      {/* Barra de navegación superior fija */}
      <Navbar />

      {/* Contenido principal con las rutas de la consigna */}
      <main className="main-content">
        <Routes>
          {/* 1. / — Inicio */}
          <Route path="/" element={<Home />} />

          {/* 2. /productos — Catálogo */}
          <Route path="/productos" element={<Catalog />} />

          {/* 3. /productos/:id — Detalle (useParams) */}
          <Route path="/productos/:id" element={<ProductDetail />} />

          {/* 4. /contacto — Formulario */}
          <Route path="/contacto" element={<Contact />} />

          {/* 5. /admin/crear-producto — Alta de producto */}
          <Route path="/admin/crear-producto" element={<ProductCreate />} />

          {/* 6. /admin/editar-producto/:id — Edición de producto */}
          <Route path="/admin/editar-producto/:id" element={<ProductEdit />} />

          {/* Redirección por defecto para rutas no existentes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Pie de página institucional */}
      <Footer />
    </div>
  );
};

export default App;
