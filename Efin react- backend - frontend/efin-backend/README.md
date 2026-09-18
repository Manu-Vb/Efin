# EFIN Backend (Node + Express + MongoDB)

## 1. Instalar dependencias

```
npm install
```

## 2. Configurar variables de entorno

Copia `.env.example` a `.env` y completa:

- `MONGO_URI`: tu connection string de MongoDB Atlas (con tu usuario y contraseña reales)
- `JWT_SECRET`: cualquier frase larga y secreta (ej: una oración inventada)
- `PORT`: puerto del servidor (4000 por defecto)

## 3. Correr en desarrollo

```
npm run dev
```

Si todo está bien verás en la consola:

```
✅ Conectado a MongoDB Atlas
👤 Usuario admin creado por defecto (admin / admin123) — cámbialo pronto
🚀 Servidor EFIN corriendo en http://localhost:4000
```

El usuario **admin / admin123** se crea automáticamente la primera vez que el servidor
arranca y no encuentra ningún administrador en la base de datos. Cámbialo apenas
puedas entrar (desde Usuarios, una vez esté conectado el frontend).

## Endpoints disponibles

| Método | Ruta                  | Protegida | Descripción                     |
|--------|-----------------------|-----------|----------------------------------|
| POST   | /api/auth/login       | No        | Inicia sesión, devuelve token JWT |
| GET    | /api/estudiantes      | Sí        | Lista estudiantes                |
| POST   | /api/estudiantes      | Sí        | Crea un estudiante                |
| PUT    | /api/estudiantes/:id  | Sí        | Edita un estudiante               |
| DELETE | /api/estudiantes/:id  | Sí        | Elimina un estudiante             |
| GET/POST/PUT/DELETE | /api/eventos     | Sí | Mismo patrón que estudiantes |
| GET/POST/PUT/DELETE | /api/salones     | Sí | Mismo patrón que estudiantes |
| GET/POST/PUT/DELETE | /api/usuarios    | Sí + solo admin | Gestión de cuentas |

Todas las rutas protegidas requieren el header:

```
Authorization: Bearer <token>
```

El token se obtiene al hacer login.
