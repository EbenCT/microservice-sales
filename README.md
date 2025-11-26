# Microservicio de Ventas

Este microservicio gestiona ventas y demuestra comunicación con el microservicio de usuarios.

## Rutas disponibles

### Info general
- `GET /`  
  Información y estado del microservicio.

### Ventas (CRUD)
- `GET /api/sales`  
  Listar todas las ventas.
- `POST /api/sales`  
  Crear una nueva venta.  
  **Body:** `{ customerId, productId, quantity, unitPrice }`
- `GET /api/sales/:id`  
  Obtener una venta por ID.
- `PUT /api/sales/:id`  
  Actualizar una venta.  
  **Body:** `{ quantity?, unitPrice?, status? }`
- `DELETE /api/sales/:id`  
  Eliminar una venta por ID.

### Comunicación con microservicio de usuarios
- `GET /api/sales/users-demo`  
  Devuelve la lista de usuarios obtenida desde el microservicio de usuarios remoto.

## Notas
- El almacenamiento de ventas es en memoria (no persistente).
- CORS está habilitado para todos los orígenes.
- Para pruebas de integración, puedes usar la ruta `/api/sales/users-demo`.

