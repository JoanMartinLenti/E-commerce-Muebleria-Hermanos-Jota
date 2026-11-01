import React, { useCallback, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPanel from './components/CartPanel';
import ContactForm from './components/ContactForm';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import './App.css';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const agregarAlCarrito = useCallback((producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }, []);

  const cantidadTotal = useMemo(
    () => carrito.reduce((total, item) => total + item.cantidad, 0),
    [carrito]
  );

  const totalPrecio = useMemo(
    () => carrito.reduce((total, item) => total + (Number(item.precio) || 0) * item.cantidad, 0),
    [carrito]
  );

  const cambiarCantidad = useCallback((id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + delta } : item))
        .filter((item) => item.cantidad > 0)
    );
  }, []);

  const quitarDelCarrito = useCallback((id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const abrirCarrito = useCallback(() => setCarritoAbierto(true), []);
  const cerrarCarrito = useCallback(() => setCarritoAbierto(false), []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar cartCount={cantidadTotal} onCartClick={abrirCarrito} />
        <CartPanel abierto={carritoAbierto} carrito={carrito} total={totalPrecio} onCerrar={cerrarCarrito} onCambiarCantidad={cambiarCantidad} onQuitar={quitarDelCarrito} />
        <Routes>
          <Route path="/" element={<Catalog onAgregar={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<ProductDetail onAgregar={agregarAlCarrito} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ContactForm />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;