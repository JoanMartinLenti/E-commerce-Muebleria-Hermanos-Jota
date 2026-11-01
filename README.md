# Mueblería Hermanos Jota - E-Commerce MERN

Aplicación web Full Stack MERN desarrollada para los Sprints 5 y 6. El sistema implementa persistencia de datos en la nube con MongoDB Atlas, operaciones CRUD completas mediante una API REST en Express y un frontend reactivo con React Router DOM.

---

## 🌐 Enlaces de Despliegue

* **Frontend (Vercel):** [[https://tu-proyecto.vercel.app](https://tu-proyecto.vercel.app)]


* **Backend API (Render):** [[https://tu-api.onrender.com](https://tu-api.onrender.com)]



---

## 🚀 Arquitectura y Tecnologías

* **Frontend:** React, Vite, React Router DOM (v6), CSS nativo.


* **Backend:** Node.js, Express.js, CORS, Dotenv.


* **Persistencia:** MongoDB Atlas con ODM Mongoose.



---

## ⚙️ Configuración de Variables de Entorno

Para ejecutar la aplicación localmente, configurar los archivos `.env` tomando como base los `.env.example` provistos:

### Backend (`server/.env`)

```env
PORT=5000
MONGODB_URI=tu_cadena_de_conexion_a_mongodb_atlas
CORS_ORIGIN=http://localhost:5173

```



### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api

```



---

## 🛠️ Instalación y Ejecución en Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/JoanMartinLenti/E-commerce-Muebleria-Hermanos-Jota.git
cd E-commerce-Muebleria-Hermanos-Jota

```

### 2. Configurar y levantar el Backend

```bash
cd server
npm install
npm run seed     # Poblar la base de datos con el catálogo inicial
npm run dev      # Servidor Express activo en http://localhost:5000

```



### 3. Configurar y levantar el Frontend

En una nueva terminal:

```bash
cd client
npm install
npm run dev      # Cliente Vite activo en http://localhost:5173

```



---

## 📋 Rutas y Endpoints Implementados

### Frontend (Rutas SPA)

* `/`: Portada y vista principal de la mueblería.


* `/productos`: Catálogo interactivo con buscador y filtros por categoría.


* `/productos/:id`: Ficha de detalle de producto dinámica consumiendo `useParams`.


* `/contacto`: Formulario de contacto.


* `/admin/crear-producto`: Alta de productos mediante formulario controlado y redirección con `useNavigate`.


* `/admin/editar/:id`: Edición y actualización de productos existentes.



### Backend (Endpoints REST)

* `GET /api/productos`: Retorna el listado completo de productos.


* `GET /api/productos/:id`: Retorna un producto específico por su identificador.


* `POST /api/productos`: Crea un nuevo producto (código `201`).


* `PUT /api/productos/:id`: Actualiza un producto existente.


* `DELETE /api/productos/:id`: Elimina un producto de la base de datos.



---

## 👥 Equipo de Desarrollo y Roles

* **Integrante 1:** Servidor base, conexión con MongoDB y configuración CORS (`feat/backend-setup`).


* **Integrante 2:** Modelado Mongoose, controladores CRUD y script de seed (`feat/backend-crud`).


* **Integrante 3:** Configuración de React con Vite, layout global y páginas base (`feat/frontend-routes`).


* **Integrante 4:** Conexión con API, catálogo dinámico y detalle con `useParams` (`feat/frontend-catalog`).


* **Integrante 5:** Formularios admin con `useNavigate`, despliegues y documentación (`feat/frontend-admin-deploy`).
