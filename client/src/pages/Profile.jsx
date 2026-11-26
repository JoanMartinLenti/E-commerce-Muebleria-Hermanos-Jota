import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <section className="container auth-page">
      <h1>Mi perfil</h1>
      <p><strong>Nombre:</strong> {user.nombre}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </section>
  );
};

export default Profile;