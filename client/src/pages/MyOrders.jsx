import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getMyOrders } from '../services/api.js';

export const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyOrders(token)
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="container">Cargando pedidos...</p>;
  if (error) return <p className="container auth-error">{error}</p>;

  return (
    <section className="container auth-page">
      <h1>Mis pedidos</h1>
      {orders.length === 0 && <p>Todavía no hiciste ningún pedido.</p>}
      {orders.map((order) => (
        <article key={order._id} className="auth-form">
          <p>
            <strong>{new Date(order.createdAt).toLocaleDateString('es-AR')}</strong>
            {' · '}{order.estado}
          </p>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>{item.cantidad} x {item.nombre}</li>
            ))}
          </ul>
          <p><strong>Total: ${order.total.toLocaleString('es-AR')}</strong></p>
        </article>
      ))}
    </section>
  );
};

export default MyOrders;