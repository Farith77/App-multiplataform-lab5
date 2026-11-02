# 01 · Arquitectura de la solución

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026
**Tarea:** T-03 · **Responsable:** Alan Jorge Garcia Apaza
**Requerimientos que atiende:** RNF-03 (mantenibilidad), RNF-05 (disponibilidad), RNF-07 (rendimiento)

---

## 1. Vista general

RedSolidaria es una aplicación **cliente-servidor**: un cliente React Native (Expo) que corre en
Android, iOS y web, y un backend gestionado con Supabase (PostgreSQL + Auth + Storage + Row Level
Security). No hay servidor propio que mantener, lo que reduce el riesgo de infraestructura en un
proyecto de 12 días.

```
┌─────────────────────────────────────────────────────────────────────┐
│  Cliente · React Native + Expo (Android / iOS / Web)                │
│                                                                     │
│  src/app            Rutas (Expo Router, file-based)                 │
│  src/features       Lógica por dominio (auth, donations, ...)       │
│  src/components/ui  Sistema de diseño                               │
│  src/lib            HTTP, storage offline, formato, tipos           │
│  src/theme          Tokens de color, tipografía y espaciado         │
└───────────────┬─────────────────────────────────────────────────────┘
                │  HTTPS · JWT de Supabase · JSON
┌───────────────▼─────────────────────────────────────────────────────┐
│  Supabase                                                           │
│  ├── Auth            Correo/contraseña, sesión y JWT                │
│  ├── PostgreSQL      Tablas del modelo de datos + vistas de impacto │
│  ├── RLS             Políticas por rol (donante, beneficiario, ...)  │
│  ├── Storage         Fotos de donaciones y avatares                 │
│  └── Edge Functions  Lógica sensible (confirmar entrega, expirar)   │
└─────────────────────────────────────────────────────────────────────┘
                │
        ┌───────▼────────┐        ┌──────────────────┐
        │ Expo Push API  │        │ OpenStreetMap /  │
        │ Notificaciones │        │ geocodificación  │
        └────────────────┘        └──────────────────┘
```

## 2. Capas del cliente

| Capa | Ubicación | Regla |
|---|---|---|
| **Rutas** | `src/app` | Solo composición de pantallas y navegación. Sin lógica de red. |
| **Features** | `src/features/<dominio>` | Hooks de datos, mutaciones, componentes del dominio y tipos. |
| **UI** | `src/components/ui` | Componentes tontos y reutilizables, sin dependencia del dominio. |
| **Infraestructura** | `src/lib` | Cliente HTTP, storage, formato, tipos compartidos, configuración. |
| **Tema** | `src/theme` | Única fuente de verdad de valores visuales. |

Flujo de una acción típica (reservar una donación):

```
Pantalla  →  useReserveDonation()  →  apiRequest('/reservations')  →  Supabase
   ↑                │                        │
   └── estado ──────┘  TanStack Query        └── RLS valida rol y stock
```

## 3. Navegación

Expo Router con rutas por archivos. El grupo `(tabs)` contiene la navegación principal y `(auth)`
las pantallas previas al inicio de sesión.

```
/                        Bienvenida (pública)
/(auth)/login            Inicio de sesión
/(auth)/register         Registro
/(auth)/onboarding       Selección de rol
/(tabs)                  Grupo de pestañas
/(tabs)/mapa             Mapa de donaciones (inicio)
/(tabs)/donaciones       Listado con filtros
/(tabs)/publicar         Publicar donación
/(tabs)/reservas         Reservas y seguimiento
/(tabs)/impacto          Panel de impacto
/(tabs)/perfil           Perfil
/donacion/[id]           Detalle de donación
/perfil/editar           Edición de perfil
```

## 4. Gestión de estado

| Tipo de estado | Herramienta | Ejemplo |
|---|---|---|
| Estado del servidor | TanStack Query | Listado de donaciones, reservas, impacto |
| Estado global de sesión | Zustand | Usuario autenticado y rol activo |
| Estado local de pantalla | `useState` | Texto del formulario, filtros |
| Persistencia offline | AsyncStorage | Sesión, caché de donaciones, cola de acciones |

Regla: **el estado del servidor no se copia a Zustand**. Si un dato viene de la API, se lee desde
la caché de Query para evitar inconsistencias.

## 5. Modelo de datos (resumen)

Once entidades; el detalle con columnas, tipos e índices está en
[`../requerimientos/06-modelo-de-datos.md`](../requerimientos/06-modelo-de-datos.md).

```
users ──1:1── profiles
  │                │
  │                └──1:N── notifications
  ├──1:N── donations ──1:N── donations_media
  │             │
  │             └──1:N── reservations ──1:N── deliveries
  │                          │
  │                          └──1:N── messages
  ├──1:N── ratings
  └──1:N── audit_log ──1:N── reports
```

Decisiones clave:

- **`reservations.donation_id` es único mientras el estado sea `pendiente`/`aceptada`** (índice
  parcial) para evitar que dos comedores reserven la misma donación.
- **El estado de la donación se deriva de la reserva** pero se materializa en la tabla para que el
  mapa filtre sin joins costosos.
- **`deliveries.delivery_code`** es un PIN de 6 dígitos hasheado; el QR contiene el id de la entrega
  firmado, no el PIN.
- **Borrado lógico** (`deleted_at`) en `donations`, `reservations` y `profiles` para auditoría.

## 6. Seguridad

| Control | Implementación |
|---|---|
| Autenticación | Supabase Auth con JWT de corta duración y refresh token |
| Autorización | Políticas RLS por tabla y por rol; el cliente nunca decide permisos |
| Secretos | Solo la `anon key` viaja al cliente; la `service_role` vive en Edge Functions |
| Fotos | Buckets privados con URLs firmadas de 1 hora |
| Validación | Esquemas Zod en el cliente + restricciones `CHECK` en la base de datos |
| Auditoría | Tabla `audit_log` con las transiciones de estado críticas |

## 7. Rendimiento y offline

- Listados paginados de 20 elementos con `limit`/`offset`.
- El mapa consulta solo el *bounding box* visible y un máximo de 100 puntos.
- Imágenes redimensionadas a 1080 px antes de subir y servidas en formato WebP.
- Caché de Query con `staleTime` de 60 s; `refetchOnWindowFocus` desactivado.
- Cola offline (RF-32): las acciones de publicación y reserva se guardan en AsyncStorage y se
  reintentan al recuperar conexión, con marca de tiempo para resolver conflictos.

## 8. Despliegue

| Entorno | Cliente | Backend |
|---|---|---|
| Desarrollo | `expo start` (Expo Go / web) | Proyecto Supabase de desarrollo |
| Staging | Build interno EAS (`preview`) | Proyecto Supabase de staging con datos semilla |
| Producción | APK/AAB firmado con EAS (`production`) | Proyecto Supabase de producción |

CI en GitHub Actions ejecuta `typecheck`, `lint`, `format:check` y `test` en cada push a `main` y
`develop` (ver `.github/workflows/ci.yml`).

## 9. Riesgos arquitectónicos asumidos

| Riesgo | Mitigación |
|---|---|
| Dependencia total de Supabase | El acceso a datos está encapsulado en `src/features/*/api.ts`; migrar a otra API solo afecta esa capa |
| `react-native-maps` no funciona en web | En web se muestra un listado con enlaces a OpenStreetMap |
| Notificaciones push no llegan en Expo Go (Android) | Se valida en un *development build* y se deja el recordatorio interno como respaldo |
| RLS mal configurado expone datos | Pruebas negativas por rol antes de cada entrega (T-27) |

## 10. Decisiones registradas (ADR resumido)

| # | Decisión | Alternativa descartada | Motivo |
|---|---|---|---|
| ADR-01 | Expo + Expo Router | React Native CLI + React Navigation | Menos configuración nativa y build web gratis |
| ADR-02 | Supabase | Backend Node/Express propio | Auth, BD, Storage y RLS en un solo servicio |
| ADR-03 | TanStack Query | Redux Toolkit Query | Menos *boilerplate* y caché integrada |
| ADR-04 | Zustand | Context API | Selectores simples sin re-render global |
| ADR-05 | TypeScript estricto | JavaScript | Detecta errores antes de la demo |
