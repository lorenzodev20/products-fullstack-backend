# REST API - Gestión de Productos

REST API desarrollada con Node.js, Express y TypeScript para la gestión de productos. Incluye operaciones CRUD completas, validación de datos, documentación con Swagger y testing automatizado.

## 🛠️ Tecnologías Clave

- **Node.js** con **Express** `^5.1.0`
- **TypeScript** `^5.9.2`
- **PostgreSQL** con **Sequelize** `^6.37.7` y **Sequelize-TypeScript** `^2.1.6`
- **Express Validator** `^7.2.1` para validación de datos
- **Swagger** para documentación de API
- **CORS** configurado para integración frontend
- **Morgan** para logging de peticiones HTTP
- **Jest** y **Supertest** para testing

## 📋 Características

- ✅ CRUD completo de productos (Crear, Leer, Actualizar, Eliminar)
- ✅ Validación de datos de entrada
- ✅ Documentación interactiva con Swagger UI
- ✅ Soft deletes (eliminación lógica)
- ✅ Tests unitarios y de integración
- ✅ CORS configurado
- ✅ Variables de entorno con dotenv
- ✅ Logging de peticiones HTTP

## 🗂️ Estructura del Proyecto

```
server/
├── src/
│   ├── config/         # Configuración de BD y Swagger
│   ├── data/           # Scripts de datos
│   ├── handlers/       # Controladores de rutas
│   ├── middleware/     # Middleware personalizado
│   ├── models/         # Modelos de Sequelize
│   ├── __tests__/      # Tests
│   ├── index.ts        # Punto de entrada
│   ├── server.ts       # Configuración del servidor
│   └── router.ts       # Definición de rutas
├── .env                # Variables de entorno
└── package.json
```

## 📦 Instalación

```bash
# Clona el repositorio
git clone <URL_DEL_REPOSITORIO>

# Entra al directorio del proyecto
cd server

# Instala las dependencias
npm install

# Configura las variables de entorno
# Crea un archivo .env con:
# DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_bd
# PORT=4000
# FRONTEND_URL=http://localhost:5173

# Inicia la app en desarrollo
npm run dev
```

## 🚀 Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon y hot-reload
- `npm run test`: Ejecuta los tests con Jest
- `npm run test:coverage`: Ejecuta los tests y genera reporte de cobertura
- `npm run pretest`: Limpia y prepara la base de datos para testing

## 📚 Endpoints de la API

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:id` | Obtener un producto por ID |
| POST | `/api/products` | Crear un nuevo producto |
| PUT | `/api/products/:id` | Actualizar un producto completo |
| PATCH | `/api/products/:id` | Actualizar disponibilidad de producto |
| DELETE | `/api/products/:id` | Eliminar un producto (soft delete) |

### Documentación Interactiva

Accede a la documentación completa de la API en:
```
http://localhost:4000/docs
```

## 🧪 Testing

El proyecto incluye tests unitarios y de integración utilizando Jest y Supertest.

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests con cobertura
npm run test:coverage
```

## 🔧 Configuración de Base de Datos

La API utiliza PostgreSQL con Sequelize ORM. Asegúrate de:

1. Tener PostgreSQL instalado y ejecutándose
2. Crear una base de datos para el proyecto
3. Configurar la variable `DATABASE_URL` en el archivo `.env`

## 🌐 CORS

La API está configurada para aceptar peticiones desde:
- `http://localhost:4000` (mismo servidor)
- URL del frontend (configurada en variable de entorno `FRONTEND_URL`)

## 📄 Licencia

MIT

## ✍️ Autor

Lorenzo Rojo - [lorenzodev2020@gmail.com](mailto:lorenzodev2020@gmail.com)
