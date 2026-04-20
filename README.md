# MarketSoft - Frontend SPA Supermercado

Single Page Application desarrollada en React que consume la API REST del sistema de supermercado MarketSoft.

## Integrantes

- Santiago Rodriguez

## Descripción

Aplicación web SPA que permite gestionar los módulos de un supermercado:

- **Productos** - Gestión de inventario
- **Usuarios** - Gestión de usuarios del sistema
- **Proveedores** - Gestión de proveedores
- **Ventas** - Registro de ventas

Cada módulo permite visualizar, crear, actualizar y eliminar registros consumiendo la API REST del backend.


## Tecnologías

- React
- React Router DOM
- Axios
- Bootstrap

## Requisitos previos

- Node.js instalado
- Tener corriendo el backend en http://localhost:3000



## Instrucciones de ejecución

### 1. Iniciar el Backend

```bash
cd backend
npm install
npm start
```

Debe verse: `Servidor corriendo en http://localhost:3000`

### 2. Iniciar el Frontend

```bash
cd frontend
npm install
npm start
```

La aplicación abre automáticamente en http://localhost:3001

## Variables de entorno

El frontend usa un archivo `.env` con:
PORT=3001
REACT_APP_API_URL=http://localhost:3000/api