# Features (arquitectura por dominio)

Cada carpeta agrupa **una capacidad del negocio** y contiene solo lo que esa capacidad necesita:

```
src/features/<feature>/
├── api.ts          Llamadas HTTP / consultas a Supabase
├── hooks.ts        Hooks de TanStack Query (useDonations, useReserve...)
├── components/     UI propia del dominio (DonationCard, StatusTimeline...)
├── types.ts        Tipos del dominio
└── index.ts        API pública del feature (lo único que se importa desde fuera)
```

| Feature | Responsabilidad | Historias |
|---|---|---|
| `auth` | Registro, login, sesión, selección de rol | HU-01 a HU-03 |
| `donations` | Publicar, listar, filtrar, mapa y detalle | HU-05 a HU-08 |
| `reservations` | Reserva, asignación de voluntario, recojo y entrega con QR/PIN | HU-09 a HU-13 |
| `notifications` | Push y recordatorios de recojo/caducidad | HU-14, HU-15 |
| `impact` | Panel de impacto social e historial | HU-16, HU-17 |
| `profile` | Perfil editable, verificación y moderación | HU-04, HU-18 |

**Reglas**

1. Una feature **no** importa componentes internos de otra: usa su `index.ts`.
2. Lo genérico (botones, tarjetas, campos) vive en `src/components/ui`.
3. Lo transversal (cliente HTTP, storage, formato, tipos compartidos) vive en `src/lib`.
4. Ninguna pantalla contiene lógica de red: solo llama a un hook del feature.

> Estado en Sprint 0: `donations` ya tiene datos mock para validar el layout. El resto se crea en el sprint indicado en el backlog.
