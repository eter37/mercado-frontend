
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
- Clonar y ejecutar el backend primero: https://github.com/eter37/backend-actualizado

## Instrucciones de ejecución

### 1. Clonar y ejecutar el Backend

```bash
git clone https://github.com/eter37/backend-actualizado.git
cd backend-actualizado
npm install
npm start
```

Debe verse: `Servidor corriendo en http://localhost:3000`

### 2. Ejecutar el Frontend

```bash
npm install
npm start
```

La aplicación abre automáticamente en http://localhost:3001

## Arquitectura
Frontend (React) → localhost:3001
Backend (Express + Sequelize) → localhost:3000

- **pages/** - Páginas de cada módulo con CRUD completo
- **services/** - Lógica de consumo de API con Axios
- **components/** - Componentes reutilizables

## Variables de entorno

El frontend usa un archivo `.env` con:
PORT=3001
REACT_APP_API_URL=http://localhost:3000/api