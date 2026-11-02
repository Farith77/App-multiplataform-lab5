# 02 · Contrato de API

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026
**Tarea:** T-03 · **Responsable:** Alan Jorge Garcia Apaza
**Base URL:** `{EXPO_PUBLIC_API_BASE_URL}` · **Formato:** JSON · **Autenticación:** `Authorization: Bearer <jwt>`

---

## 1. Convenciones

| Aspecto | Regla |
|---|---|
| Rutas | `kebab-case`, sustantivos en plural (`/donations`, `/reservations`) |
| Fechas | ISO 8601 con zona horaria (`2026-10-21T19:00:00-05:00`) |
| Identificadores | UUID v4 |
| Paginación | `?limit=20&offset=0` · respuesta con `meta.total` |
| Errores | `{ "code": "STRING", "message": "texto para el usuario", "details": {...} }` |
| Códigos | `400` validación · `401` sin sesión · `403` rol sin permiso · `404` no existe · `409` conflicto de estado · `422` regla de negocio · `500` error interno |
| Idempotencia | Las mutaciones aceptan `Idempotency-Key` (UUID) para reintentos de la cola offline |
| Versionado | Prefijo `/v1` en el path de las Edge Functions |

## 2. Endpoints

### 2.1 Autenticación y perfil

| Método | Ruta | Descripción | Rol | HU |
|---|---|---|---|---|
| POST | `/auth/register` | Crea usuario y perfil | público | HU-01 |
| POST | `/auth/login` | Devuelve JWT y refresh token | público | HU-02 |
| POST | `/auth/recover` | Envía correo de recuperación | público | HU-02 |
| GET | `/profiles/me` | Perfil del usuario autenticado | autenticado | HU-04 |
| PATCH | `/profiles/me` | Actualiza perfil y organización | autenticado | HU-04 |
| POST | `/profiles/me/avatar` | Sube avatar (multipart) | autenticado | HU-04 |

### 2.2 Donaciones

| Método | Ruta | Descripción | Rol | HU |
|---|---|---|---|---|
| POST | `/donations` | Publica una donación | donante | HU-05 |
| GET | `/donations` | Lista con filtros `category`, `bbox`, `q`, `status` | autenticado | HU-07 |
| GET | `/donations/{id}` | Detalle con fotos y donante | autenticado | HU-08 |
| PATCH | `/donations/{id}` | Edita una donación propia `disponible` | donante | HU-05 |
| DELETE | `/donations/{id}` | Cancela lógicamente la donación | donante / admin | HU-05 |
| POST | `/donations/{id}/media` | Sube foto (multipart, máx. 5) | donante | HU-05 |

### 2.3 Reservas, recojo y entrega

| Método | Ruta | Descripción | Rol | HU |
|---|---|---|---|---|
| POST | `/donations/{id}/reservations` | Reserva una donación `disponible` | beneficiario | HU-09 |
| GET | `/reservations` | Reservas del usuario según su rol | autenticado | HU-10 |
| POST | `/reservations/{id}/accept` | Acepta la reserva | donante | HU-10 |
| POST | `/reservations/{id}/reject` | Rechaza la reserva | donante | HU-10 |
| POST | `/reservations/{id}/cancel` | Cancela la reserva | beneficiario | HU-10 |
| POST | `/reservations/{id}/assign` | Asigna un voluntario | beneficiario / admin | HU-11 |
| POST | `/deliveries/{id}/confirm` | Confirma la entrega con PIN o QR | voluntario / beneficiario | HU-12 |

### 2.4 Notificaciones, impacto y administración

| Método | Ruta | Descripción | Rol | HU |
|---|---|---|---|---|
| POST | `/devices` | Registra el token de push | autenticado | HU-14 |
| GET | `/notifications` | Bandeja de notificaciones | autenticado | HU-15 |
| PATCH | `/notifications/{id}/read` | Marca como leída | autenticado | HU-15 |
| GET | `/impact/summary` | Métricas del periodo (`from`, `to`) | autenticado | HU-17 |
| GET | `/history` | Historial de operaciones cerradas | autenticado | HU-16 |
| POST | `/ratings` | Valora a la contraparte (1–5) | autenticado | HU-16 |
| GET | `/admin/organizations` | Organizaciones pendientes de verificación | admin | HU-18 |
| POST | `/admin/organizations/{id}/verify` | Verifica o rechaza una organización | admin | HU-18 |
| POST | `/reports` | Reporta una publicación | autenticado | HU-19 |

## 3. Ejemplos

### 3.1 Publicar donación

```http
POST /v1/donations
Authorization: Bearer <jwt>
Content-Type: application/json
Idempotency-Key: 8f14e45f-ceea-4f1c-9c1f-2f0a6a1d9c11

{
  "title": "Pan artesanal del día",
  "description": "Bolsas de pan francés horneadas esta mañana",
  "category": "panaderia",
  "quantityKg": 6,
  "portions": 40,
  "expiresAt": "2026-10-21T23:00:00-05:00",
  "pickupWindow": { "from": "2026-10-21T19:00:00-05:00", "to": "2026-10-21T21:00:00-05:00" },
  "location": { "latitude": -16.409, "longitude": -71.5375, "address": "Av. Independencia 455" }
}
```

`201 Created`

```json
{
  "id": "d1f0b6a2-7f3e-4e6b-9a51-6f6a2f5c9b10",
  "status": "disponible",
  "createdAt": "2026-10-21T18:07:00-05:00"
}
```

### 3.2 Reservar donación

```http
POST /v1/donations/d1f0b6a2-7f3e-4e6b-9a51-6f6a2f5c9b10/reservations
Authorization: Bearer <jwt>
```

`201 Created`

```json
{
  "id": "a36b2c40-1c1e-4b8a-9d0a-2b6e7f1c3d55",
  "donationId": "d1f0b6a2-7f3e-4e6b-9a51-6f6a2f5c9b10",
  "status": "pendiente",
  "deliveryCode": "482913",
  "createdAt": "2026-10-21T18:20:00-05:00"
}
```

`409 Conflict` si la donación ya no está disponible:

```json
{
  "code": "DONATION_NOT_AVAILABLE",
  "message": "Otra organización reservó esta donación hace un momento.",
  "details": { "currentStatus": "reservada" }
}
```

### 3.3 Confirmar entrega

```http
POST /v1/deliveries/del-778/confirm
{ "method": "pin", "code": "482913" }
```

`200 OK`

```json
{
  "deliveryId": "del-778",
  "status": "confirmada",
  "confirmedAt": "2026-10-21T20:42:00-05:00",
  "impact": { "rescuedKg": 6, "portions": 40, "co2AvoidedKg": 3.5 }
}
```

`422 Unprocessable Entity` si el PIN no coincide. Tras 3 intentos fallidos la entrega se bloquea 10
minutos y se registra en `audit_log`.

### 3.4 Resumen de impacto

```http
GET /v1/impact/summary?from=2026-10-01&to=2026-10-31
```

```json
{
  "rescuedKg": 128.5,
  "portions": 430,
  "co2AvoidedKg": 74.2,
  "deliveries": 37,
  "period": { "from": "2026-10-01", "to": "2026-10-31" }
}
```

## 4. Reglas de negocio vinculadas al contrato

| Regla | Endpoint afectado | Respuesta |
|---|---|---|
| Solo el donante dueño edita su donación | `PATCH /donations/{id}` | `403` |
| Una donación `disponible` admite una sola reserva activa | `POST /reservations` | `409` |
| No se reserva una donación vencida | `POST /reservations` | `422` |
| El PIN se valida en el servidor, nunca en el cliente | `POST /deliveries/confirm` | `422` |
| El impacto solo cuenta entregas `confirmada` | `GET /impact/summary` | — |
| Un usuario no puede valorarse a sí mismo | `POST /ratings` | `403` |

## 5. Estado de implementación

| Sprint | Endpoints |
|---|---|
| S1 | `/auth/*`, `/profiles/*`, `/donations/*` (lectura y escritura) |
| S2 | `/reservations/*`, `/deliveries/*`, `/notifications/*`, `/impact/*`, `/ratings`, `/reports` |
| S3 | `/admin/*`, endurecimiento y pruebas negativas |

> El contrato se congela al inicio del Sprint 1. Cualquier cambio requiere actualizar este documento
> y avisar al equipo en el daily, porque el cliente y el backend avanzan en paralelo.
