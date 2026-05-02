# Arquitectura del Proyecto — Semana 3

## Patrón: Hexagonal (Ports & Adapters) + DDD táctico ligero, organizado por feature

---

## Árbol de carpetas

```
src/
├── index.ts
└── lib/
    ├── Shared/
    │   └── infrastructure/
    │       ├── env.ts
    │       └── database.ts
    └── donaciones/
        ├── domain/
        │   ├── Donacion.ts
        │   └── DonacionRepository.ts
        ├── application/
        │   ├── CreateDonacion.ts
        │   └── ListDonaciones.ts
        └── infrastructure/
            ├── DonacionModel.ts
            ├── DonacionMapper.ts
            ├── SequelizeDonacionRepository.ts
            ├── DonacionController.ts
            └── donacion.routes.ts
```

---

## Capas y su responsabilidad

### `domain/` — Núcleo del negocio
Contiene las reglas y contratos del negocio. **No depende de ninguna librería externa**.

| Archivo | Descripción |
|---|---|
| `Donacion.ts` | Entidad de dominio. Define la forma de una donación (idDonaciones, nombre, email, monto, mensaje). Es un objeto puro de TypeScript sin lógica de base de datos. |
| `DonacionRepository.ts` | Puerto (interfaz). Declara los métodos que cualquier adaptador de persistencia debe implementar (`create`, `findAll`). El dominio no sabe si la DB es SQLite, MySQL o cualquier otra. |

---

### `application/` — Casos de uso
Orquesta el flujo de negocio. Solo depende de `domain/`. **No sabe nada de Express ni Sequelize**.

| Archivo | Descripción |
|---|---|
| `CreateDonacion.ts` | Caso de uso para crear una donación. Valida que el nombre tenga al menos 2 caracteres, que el email sea válido y que el monto sea mayor a 0. Delega la persistencia al repositorio. |
| `ListDonaciones.ts` | Caso de uso para obtener todas las donaciones. Delega la consulta al repositorio. |

---

### `infrastructure/` (donaciones) — Adaptadores
Implementa los puertos del dominio usando herramientas concretas (Sequelize, Express). **Depende de `domain/` y `application/`**.

| Archivo | Descripción |
|---|---|
| `DonacionModel.ts` | Modelo de Sequelize. Define la tabla `donaciones` en SQLite con sus columnas (idDonaciones, nombre, email, monto, mensaje, timestamps). |
| `DonacionMapper.ts` | Traductor entre capas. Convierte un `DonacionModel` (fila de BD) a una entidad `Donacion` de dominio y viceversa. Evita que Sequelize "contamine" las capas internas. |
| `SequelizeDonacionRepository.ts` | Adaptador del puerto. Implementa `DonacionRepository` usando Sequelize. Es el único lugar del proyecto donde se llama a Sequelize para donaciones. |
| `DonacionController.ts` | Controlador HTTP. Recibe los objetos `Request` y `Response` de Express, llama al caso de uso correspondiente y devuelve la respuesta JSON. Maneja errores HTTP. |
| `donacion.routes.ts` | Rutas Express para el recurso donaciones. Registra `GET /` y `POST /`. Aquí se realiza el **wiring** (inyección manual): conecta repositorio → casos de uso → controller. |

---

### `Shared/infrastructure/` — Infraestructura compartida
Configuración y utilidades usadas por todas las features del proyecto.

| Archivo | Descripción |
|---|---|
| `env.ts` | Lee las variables de entorno del archivo `.env` usando `dotenv`. Exporta un objeto `env` con todos los valores tipados (puerto, dialecto de BD, credenciales, etc.). |
| `database.ts` | Crea y exporta la instancia de Sequelize configurada según `env.ts`. Soporta SQLite (archivo local) y otros dialectos SQL. Expone `connectDatabase()` para autenticar la conexión al arrancar. |

---

### `src/index.ts` — Bootstrap
Punto de entrada de la aplicación. Se encarga de:
1. Conectar la base de datos (`connectDatabase`).
2. Sincronizar los modelos Sequelize con la BD (`sequelize.sync`).
3. Crear la app de Express con CORS y JSON.
4. Registrar las rutas (`/api/donaciones`).
5. Iniciar el servidor en el puerto configurado.

---

## Flujo de una petición

```
HTTP POST /api/donaciones
        ↓
  donacion.routes.ts       ← registra la ruta y hace wiring
        ↓
  DonacionController       ← recibe Request/Response
        ↓
  CreateDonacion           ← valida y orquesta (application)
        ↓
  DonacionRepository       ← puerto/interfaz (domain)
        ↓
  SequelizeDonacionRepository ← implementación real (infrastructure)
        ↓
  DonacionModel            ← escribe en SQLite via Sequelize
        ↓
  DonacionMapper           ← convierte resultado a entidad de dominio
        ↓
  HTTP 201 JSON
```

---

## Regla de dependencias

```
domain        ← no importa nada externo
application   ← solo importa domain
infrastructure← importa domain + application + librerías (Sequelize, Express)
index.ts      ← importa todo y conecta las piezas
```

> Gracias a esta regla, si mañana cambias SQLite por PostgreSQL, solo modificas `DonacionModel.ts`, `database.ts` y `env.ts`. El dominio y los casos de uso no se tocan.
