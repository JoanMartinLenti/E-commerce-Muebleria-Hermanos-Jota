import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Contact from './pages/Contact.jsx';
import ProductCreate from './pages/ProductCreate.jsx';
import ProductEdit from './pages/ProductEdit.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import MyOrders from './pages/MyOrders.jsx';

export const App = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Catalog />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/contacto" element={<Contact />} />

          {/* Autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* Rutas protegidas */}
          <Route
            path="/perfil"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
          <Route
            path="/mis-pedidos"
            element={<ProtectedRoute><MyOrders /></ProtectedRoute>}
          />

          {/* Admin: las dejé protegidas, si el equipo prefiere dejarlas públicas, sacá el ProtectedRoute */}
          <Route
            path="/admin/crear-producto"
            element={<ProtectedRoute><ProductCreate /></ProtectedRoute>}
          />
          <Route
            path="/admin/editar-producto/:id"
            element={<ProtectedRoute><ProductEdit /></ProtectedRoute>}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;