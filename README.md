# Mueblería Hermanos Jota - E-Commerce MERN

Aplicación web Full Stack MERN desarrollada para los Sprints 5 y 6. El sistema implementa persistencia de datos en la nube con MongoDB Atlas, operaciones CRUD completas mediante una API REST en Express y un frontend reactivo con React Router DOM.

---

## 👥 Integrantes
- Maia De Blasis
- Joan Martin Lenti
- Camila Paredez
- Ivan Campos Wainer
- Javier Barreto

---

## 🌐 Enlaces de Despliegue

- **Frontend (Vercel):** [https://tu-proyecto.vercel.app]
- **Backend API (Render):** [https://tu-api.onrender.com]

---

## 🚀 Arquitectura y Tecnologías

- **Frontend:** React, Vite, React Router DOM (v6), CSS nativo.
- **Backend:** Node.js, Express.js, CORS, Dotenv.
- **Persistencia:** MongoDB Atlas con ODM Mongoose.

---

## ⚙️ Configuración de Variables de Entorno

Para ejecutar la aplicación localmente, configurar los archivos `.env` tomando como base los `.env.example` provistos[cite: 3, 6]:

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=tu_cadena_de_conexion_a_mongodb_atlas
CORS_ORIGIN=http://localhost:5173
