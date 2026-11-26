import React, { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../services/api.js';

const TOKEN_KEY = 'jota_token';
const USER_KEY = 'jota_user';

const AuthContext = createContext(null);

// Lee el payload del JWT para saber si ya venció
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp ? payload.exp * 1000 < Date.now() : false;
  } catch {
    return true;
  }
};

// Recupera la sesión guardada (si existe y sigue vigente)
const loadSession = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    if (token && user && !isTokenExpired(token)) {
      return { token, user };
    }
  } catch {
    // datos corruptos: se ignoran
  }
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  return { token: null, user: null };
};

export const AuthProvider = ({ children }) => {
  // Se lee de forma síncrona al montar, así no hay "parpadeo" al recargar
  const [session, setSession] = useState(loadSession);

  const login = async ({ email, password }) => {
    const { token, user } = await loginUser({ email, password });
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setSession({ token, user });
    return user;
  };

  // El backend no devuelve token al registrar, por eso hacemos login automático
  const register = async ({ nombre, email, password }) => {
    await registerUser({ nombre, email, password });
    return login({ email, password });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setSession({ token: null, user: null });
  };

  const value = {
    user: session.user,
    token: session.token,
    isAuthenticated: Boolean(session.token),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  }
  return context;
};