# semana-3-actividad-2

Actividad 2: Configuración e implementación básica con Node.js y Sequelize

## Descripción

Proyecto Node.js que implementa un API REST con operaciones CRUD (Crear, Listar, Obtener, Actualizar, Eliminar) sobre la entidad **Producto**, usando **Sequelize** como ORM.

La aplicación soporta **MySQL**, **PostgreSQL** y **SQLite** como motores de base de datos (configurable por variables de entorno).

## Estructura del proyecto

```
src/
├── config/
│   └── database.js          # Configuración de Sequelize
├── models/
│   └── Producto.js          # Modelo / entidad Producto
├── controllers/
│   └── producto.controller.js  # Lógica CRUD
├── routes/
│   └── producto.routes.js   # Rutas Express
├── index.js                 # Punto de entrada
└── test.js                  # Pruebas CRUD
```

## Instalación

```bash
npm install
```

## Configuración

Copia `.env.example` a `.env` y ajusta los valores según tu base de datos:

```bash
cp .env.example .env
```

Variables disponibles:

| Variable     | Descripción                              | Por defecto  |
|-------------|------------------------------------------|-------------|
| `DB_DIALECT` | Motor de BD: `mysql`, `postgres`, `sqlite` | `sqlite`   |
| `DB_HOST`    | Host del servidor de BD                  | `localhost` |
| `DB_PORT`    | Puerto del servidor de BD                | `3306`      |
| `DB_NAME`    | Nombre de la base de datos               | —           |
| `DB_USER`    | Usuario de la base de datos              | —           |
| `DB_PASSWORD`| Contraseña de la base de datos           | —           |
| `DB_STORAGE` | Ruta del archivo SQLite (solo SQLite)    | `./database.sqlite` |
| `PORT`       | Puerto del servidor Express              | `3000`      |

## Ejecución

```bash
npm start
```

## Pruebas

```bash
npm test
```

## Endpoints de la API

| Método | Ruta                    | Descripción             |
|--------|------------------------|------------------------|
| POST   | `/api/productos`        | Crear un producto       |
| GET    | `/api/productos`        | Listar todos            |
| GET    | `/api/productos/:id`    | Obtener uno por ID      |
| PUT    | `/api/productos/:id`    | Actualizar un producto  |
| DELETE | `/api/productos/:id`    | Eliminar un producto    |

### Ejemplo de uso

**Crear producto:**
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Laptop","descripcion":"15 pulgadas","precio":999.99,"stock":10}'
```

**Listar productos:**
```bash
curl http://localhost:3000/api/productos
```

**Actualizar producto:**
```bash
curl -X PUT http://localhost:3000/api/productos/1 \
  -H "Content-Type: application/json" \
  -d '{"precio":899.99,"stock":8}'
```

**Eliminar producto:**
```bash
curl -X DELETE http://localhost:3000/api/productos/1
```

## Modelo Producto

| Campo        | Tipo          | Descripción          |
|-------------|--------------|---------------------|
| `id`         | INTEGER (PK)  | Identificador único  |
| `nombre`     | STRING(100)   | Nombre del producto  |
| `descripcion`| TEXT          | Descripción opcional |
| `precio`     | DECIMAL(10,2) | Precio               |
| `stock`      | INTEGER       | Unidades disponibles |
| `createdAt`  | DATE          | Fecha de creación    |
| `updatedAt`  | DATE          | Última actualización |
