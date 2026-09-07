# API Semillas

API REST para la gestión de un catálogo de semillas, con autenticación de usuarios, roles y control de acceso.

## Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) para autenticación
- bcryptjs para hash de contraseñas
- express-validator para validación de datos

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd semillas
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Y completa tus propios valores:
   ```
   PORT=4000
   MONGODB_URI=tu_cadena_de_conexion_de_mongodb
   TOKEN_SECRET=tu_secreto_para_jwt
   ```

4. Ejecuta el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

El servidor arrancará en `http://localhost:4000` (o el puerto que definas en `.env`).

## Roles de usuario

| Rol | Descripción |
|---|---|
| `cliente` | Rol por defecto. Puede ver el catálogo de productos. |
| `admin` | Puede gestionar el catálogo completo (crear, editar, eliminar productos). |
| `proveedor` | Puede gestionar el catálogo completo (crear, editar, eliminar productos). |

## Endpoints

### Autenticación (`/api`)

#### `POST /api/register`
Registra un nuevo usuario.

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "telefono": "5551234567",
  "rol": "cliente"
}
```
`telefono` y `rol` son opcionales. `rol` puede ser `cliente`, `admin` o `proveedor` (por defecto `cliente`).

**Respuesta exitosa (201):**
```json
{
  "id": "...",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "rol": "cliente",
  "createdAt": "..."
}
```

#### `POST /api/login`
Inicia sesión y devuelve un token JWT.

**Body:**
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "...",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "rol": "cliente",
  "token": "..."
}
```

#### `GET /api/profile` 🔒
Devuelve el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

---

### Productos (`/api/products`)

#### `GET /api/products`
Lista todos los productos. Ruta pública.

#### `GET /api/products/:id`
Obtiene un producto por su ID. Ruta pública.

#### `POST /api/products` 🔒 (admin, proveedor)
Crea un nuevo producto.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "nombre": "Semilla de tomate",
  "descripcion": "Semilla orgánica",
  "precio": 25,
  "stock": 100,
  "categoria": "hortalizas"
}
```

#### `PUT /api/products/:id` 🔒 (admin, proveedor)
Actualiza un producto existente. Acepta los mismos campos que el registro, todos opcionales.

#### `DELETE /api/products/:id` 🔒 (admin, proveedor)
Elimina un producto. Devuelve `204 No Content`.

🔒 = requiere token JWT válido. Las rutas marcadas con roles específicos además requieren que el usuario tenga uno de esos roles.

## Manejo de errores

Todas las respuestas de error siguen el formato:

```json
{ "message": "Descripción del error" }
```

Cuando la validación de datos falla, el formato es:

```json
{ "errors": ["mensaje de error 1", "mensaje de error 2"] }
```

### Códigos de estado usados

| Código | Significado |
|---|---|
| 200 | Solicitud exitosa |
| 201 | Recurso creado |
| 204 | Recurso eliminado (sin contenido) |
| 400 | Datos inválidos o error de validación |
| 401 | No autenticado (falta token o es inválido) |
| 403 | No autorizado (rol sin permisos) |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

## Estructura del proyecto

```
src/
├── config/          # Configuración (conexión a la base de datos)
├── controllers/     # Lógica de negocio
├── middlewares/      # Auth, roles, validación, manejo de errores
├── models/routes/    # Definición de rutas
├── schema/          # Modelos de Mongoose
├── utils/           # Helpers (asyncHandler, ApiError)
└── validators/       # Reglas de validación por entidad
```
