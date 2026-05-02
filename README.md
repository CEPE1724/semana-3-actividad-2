# Actividad 2: Configuración e implementación básica

## Descripción

Proyecto Node.js con TypeScript que implementa un CRUD completo de **Donaciones** usando Sequelize como ORM con SQLite, siguiendo arquitectura hexagonal (Puertos & Adaptadores).

- Crear y configurar un proyecto Node.js con Sequelize.
- Conectar el ORM a una base de datos SQLite (intercambiable con MySQL o PostgreSQL).
- Definir una entidad simple: **Donacion** (nombre, email, monto, mensaje).
- Implementar operaciones CRUD básicas: crear, listar, actualizar, eliminar.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior

---

## Instalación

```bash
# 1. Clonar el repositorio y entrar a la carpeta
git clone https://github.com/CEPE1724/semana-3-actividad-2.git
cd semana-3-actividad-2

# 2. Instalar dependencias
npm install
```

---

## Configuración

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
NODE_ENV=development
PORT=3000
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
```

> La base de datos SQLite se genera automáticamente al iniciar el servidor. No requiere instalación adicional.

---

## Ejecución

### Modo desarrollo (con recarga automática)

```bash
npm run dev
```

### Modo producción

```bash
# Compilar TypeScript
npm run build

# Iniciar servidor
npm start
```

El servidor quedará escuchando en `http://localhost:3000`.

---

Base URL: `http://localhost:3000/api/uisrael`

| Método | Ruta                        | Descripción                  |
|--------|-----------------------------|------------------------------|
| GET    | `/getAllDonaciones`          | Listar todas las donaciones  |
| POST   | `/insertDonacion`           | Crear una donación           |
| PATCH  | `/updateDonacion/:id`       | Actualizar una donación      |
| DELETE | `/deleteDonacion/:id`       | Eliminar una donación        |

---
