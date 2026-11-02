# 🪵 Mueblería Jota — Aplicación Full Stack MERN

> **Entrega Final — Sprints 5 y 6: Persistencia de Datos y CRUD Completo**  
> Curso de Desarrollo Full Stack MERN.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.21-lightgrey?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-purple?style=for-the-badge&logo=vite)
![Despliegue Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)
![Despliegue Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)

---

## 📌 1. Enlaces a los Despliegues en Producción

Los dos componentes de la aplicación están preparados y listos para ser desplegados en la nube:

| Servicio | Plataforma de Hosting | Enlace / URL en Producción | Estado |
| :--- | :--- | :--- | :--- |
| **Frontend (React SPA)** | **Vercel** | https://e-commerce-muebleria-hermanos-jota-2llr6fvnm-grupo-36.vercel.app/ | ![Vercel](https://img.shields.io/badge/Deploy-Vercel-success) |
| **Backend (Express API)** | **Render** | https://e-commerce-muebleria-hermanos-jota-k4m3.onrender.com/ | ![Render](https://img.shields.io/badge/Deploy-Render-success) |

> 💡 **Nota para evaluación**: Si utilizas nuevos despliegues con tus cuentas de Render y Vercel, simplemente sustituye los dominios anteriores en este archivo `README.md`. El endpoint de verificación rápida del backend es:  
> `https://<tu-backend-en-render>.onrender.com/api/health`

---

## 📖 2. Resumen del Proyecto

**Mueblería Jota** es una plataforma web completa de catálogo y administración de muebles de diseño. Transforma un catálogo estático previo en una solución web full stack real y persistente:
- **Base de Datos en la nube (MongoDB Atlas)** conectada mediante **Mongoose**.
- **API RESTful completa** con operaciones CRUD (`GET`, `POST`, `PUT`, `DELETE`).
- **Frontend interactivo en React** con navegación basada en rutas dinámicas (`useParams`), formularios controlados y redirección programática (`useNavigate`).

---

## 🗂️ 3. Estructura del Repositorio

El repositorio está organizado en dos subproyectos claramente desacoplados:

```text
muebleria-jota/
├── server/                    # Backend (Node.js, Express, Mongoose)
│   ├── src/
│   │   ├── config/db.js       # Conexión a MongoDB Atlas
│   │   ├── controllers/       # Lógica del controlador CRUD (productController.js)
│   │   ├── models/            # Modelo y validación Mongoose (Product.js)
│   │   ├── routes/            # Rutas RESTful de Express (productRoutes.js)
│   │   ├── seeds/             # Script para sembrar muebles de prueba (seedProducts.js)
│   │   └── server.js          # Punto de entrada Express y configuración CORS
│   ├── .env.example           # Plantilla de variables de entorno del servidor
│   └── package.json           # Dependencias y scripts del servidor
│
├── client/                    # Frontend (React 18, Vite, React Router DOM)
│   ├── src/
│   │   ├── components/        # Navbar, Footer, ProductCard, LoadingSpinner
│   │   ├── pages/
│   │   │   ├── Home.jsx           # '/' - Portada y destacados
│   │   │   ├── Catalog.jsx        # '/productos' - Catálogo con filtros y búsqueda
│   │   │   ├── ProductDetail.jsx  # '/productos/:id' - Detalle (useParams)
│   │   │   ├── Contact.jsx        # '/contacto' - Formulario de contacto
│   │   │   ├── ProductCreate.jsx  # '/admin/crear-producto' - Alta (useNavigate)
│   │   │   └── ProductEdit.jsx    # '/admin/editar-producto/:id' - Edición
│   │   ├── services/api.js    # Conexión con la API RESTful (VITE_API_URL)
│   │   ├── App.jsx            # Configuración de React Router DOM
│   │   └── index.css          # Sistema de diseño y estilos responsive
│   ├── vercel.json            # Reescribe rutas SPA en Vercel (evita error 404)
│   ├── .env.example           # Plantilla de variable VITE_API_URL
│   └── package.json           # Dependencias del cliente
│
├── Guia_Commits_GitHub_Equipo.pdf # Guía de trabajo colaborativo para los 5 integrantes
├── GUIA_COMMITS_EQUIPO.md         # Versión markdown de la guía de commits
└── README.md                  # Este documento
```

---

## 🚀 4. Instalación y Ejecución en Local

### Prerrequisitos
- Node.js versión 18 o superior.
- Una base de datos MongoDB Atlas activa (o MongoDB instalado localmente).

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/<tu-usuario>/muebleria-jota.git
cd muebleria-jota
```

### Paso 2: Iniciar el Backend
```bash
cd server
npm install
npm run seed     # (Opcional) Puebla la base de datos con muebles iniciales
npm run dev      # Inicia el servidor con nodemon en http://localhost:5000
```

### Paso 3: Iniciar el Frontend
En otra terminal:
```bash
cd client
npm install
npm run dev      # Inicia Vite en http://localhost:5173
```

Abre tu navegador en [http://localhost:5173](http://localhost:5173).

---

## 📡 5. Documentación de la API RESTful

Ruta base: `/api/productos`

| Método | Endpoint | Descripción | Cuerpo de la Petición (JSON) | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Health Check del servidor | Ninguno | `200` |
| **GET** | `/api/productos` | Listar catálogo (filtros: `?categoria=...`, `?buscar=...`) | Ninguno | `200`, `500` |
| **GET** | `/api/productos/:id` | Obtener detalle de un mueble por ID | Ninguno | `200`, `400`, `404` |
| **POST** | `/api/productos` | Crear nuevo mueble | Ver ejemplo abajo | `201`, `400`, `500` |
| **PUT** | `/api/productos/:id` | Modificar un mueble existente | Campos a modificar | `200`, `400`, `404` |
| **DELETE** | `/api/productos/:id` | Eliminar un mueble por ID | Ninguno | `200`, `400`, `404` |

### Ejemplo de JSON para `POST /api/productos`
```json
{
  "nombre": "Mesa Ratona Nórdica Paraíso",
  "descripcion": "Mesa baja de living fabricada en madera de paraíso maciza con tapa biselada y terminación hidrolaca satinada.",
  "precio": 78000,
  "categoria": "Living",
  "imagen": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
  "stock": 10,
  "destacado": true
}
```

---

## 🧭 6. Rutas del Frontend (React Router DOM)

Cumpliendo con los requisitos del Sprint 5 y 6:
- `/`: **Inicio** — Presentación, propuesta de valor, categorías y muebles destacados.
- `/productos`: **Catálogo** — Listado completo con buscador en tiempo real y selector de categorías.
- `/productos/:id`: **Detalle** — Utiliza `useParams` para cargar el producto por ID y ofrece botón de consulta directa por WhatsApp, más opciones de edición y eliminación.
- `/contacto`: **Contacto** — Formulario interactivo y controlado con validaciones y datos de la tienda.
- `/admin/crear-producto`: **Alta de producto** — Formulario controlado completo que consume `POST /api/productos` y redirige con `useNavigate`.
- `/admin/editar-producto/:id`: **Edición** — Carga la pieza vía `GET` y actualiza mediante `PUT`.

---

## 👥 7. Trabajo en Equipo y Distribución de Commits

1. **Integrante 1**: Inicialización del repo, estructura del backend, servidor Express y conexión MongoDB Mongoose.
2. **Integrante 2**: Esquema Mongoose (`Product.js`), controlador CRUD completo y rutas de la API.
3. **Integrante 3**: Configuración de React con Vite, React Router DOM, Navbar, Footer, Inicio y Contacto.
4. **Integrante 4**: Cliente de API, Catálogo con filtros y Ficha de Detalle con `useParams`.
5. **Integrante 5**: Vistas de administración (`ProductCreate`, `ProductEdit`), `useNavigate`, configuraciones de Vercel/Render y README.
