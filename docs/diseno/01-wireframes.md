# 01 · Wireframes de las 12 pantallas

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026
**Tarea:** T-04 · **Responsable:** Frank Ducks Hanccocallo Hachircana
**Requerimientos que atiende:** RNF-01 (usabilidad), RNF-09 (accesibilidad)

Los wireframes son de **baja fidelidad**: definen jerarquía, contenido y navegación, no color final.
Se construyen con la biblioteca de componentes documentada en
[`02-sistema-de-diseno.md`](02-sistema-de-diseno.md).

---

## 1. Mapa de navegación

```
Bienvenida
   ├── Iniciar sesión ──► Mapa (tabs)
   └── Crear cuenta ──► Selección de rol ──► Mapa (tabs)

Tabs:  Mapa · Donar · Reservas · Impacto · Perfil
        │              │         │          │        └── Editar perfil
        └── Detalle ───┘         └── Seguimiento + PIN
```

| # | Pantalla | Ruta | HU | Sprint |
|---|---|---|---|---|
| 01 | Registro | `/(auth)/register` | HU-01 | S1 |
| 02 | Inicio de sesión | `/(auth)/login` | HU-02 | S1 |
| 03 | Selección de rol | `/(auth)/onboarding` | HU-03 | S1 |
| 04 | Mapa de donaciones | `/(tabs)/mapa` | HU-06 | S1 |
| 05 | Listado con filtros | `/(tabs)/donaciones` | HU-07 | S1 |
| 06 | Publicar donación | `/(tabs)/publicar` | HU-05 | S1 |
| 07 | Detalle de donación | `/donacion/[id]` | HU-08 | S2 |
| 08 | Reserva y entrega con PIN | `/(tabs)/reservas` | HU-09, HU-12 | S2 |
| 09 | Mis reservas | `/(tabs)/reservas` | HU-10 | S2 |
| 10 | Panel de impacto | `/(tabs)/impacto` | HU-17 | S2 |
| 11 | Perfil | `/(tabs)/perfil` | HU-04 | S1 |
| 12 | Editar perfil | `/perfil/editar` | HU-04 | S1 |

## 2. Wireframes

### 01 · Registro

```
┌───────────────────────────────┐
│ ←                             │
│ Crear cuenta                  │
│ Datos básicos para unirte     │
│                               │
│ Nombre completo               │
│ ┌───────────────────────────┐ │
│ │ Nombres y apellidos       │ │
│ └───────────────────────────┘ │
│ Correo electrónico            │
│ ┌───────────────────────────┐ │
│ │ nombre@correo.com         │ │
│ └───────────────────────────┘ │
│ Teléfono                      │
│ ┌───────────────────────────┐ │
│ │ 9XX XXX XXX               │ │
│ └───────────────────────────┘ │
│ Contraseña                    │
│ ┌───────────────────────────┐ │
│ │ ••••••••                  │ │
│ └───────────────────────────┘ │
│ Mínimo 8 caracteres           │
│                               │
│ [        Continuar          ] │
└───────────────────────────────┘
```

**Validaciones:** correo con formato válido, teléfono de 9 dígitos, contraseña ≥ 8 con una letra y un
número. El error se muestra bajo el campo y se anuncia a lectores de pantalla.

### 02 · Inicio de sesión

```
┌───────────────────────────────┐
│ ←                             │
│ Iniciar sesión                │
│                               │
│ Correo electrónico            │
│ ┌───────────────────────────┐ │
│ │ nombre@correo.com         │ │
│ └───────────────────────────┘ │
│ Contraseña                    │
│ ┌───────────────────────────┐ │
│ │ ••••••••                  │ │
│ └───────────────────────────┘ │
│                               │
│ [         Ingresar          ] │
│      ¿Olvidaste tu clave?     │
│                               │
│ Al continuar aceptas los      │
│ términos de uso.              │
└───────────────────────────────┘
```

### 03 · Selección de rol

```
┌───────────────────────────────┐
│ ←  ¿Cómo participas?          │
│                               │
│ ┌───────────────────────────┐ │
│ │ 🏪  Donante               │ │
│ │ Restaurante, mercado...   │ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ 🍲  Organización          │ │
│ │ Comedor popular u olla... │ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ 🛵  Voluntario            │ │
│ │ Traslada la donación...   │ │
│ └───────────────────────────┘ │
│                               │
│ [        Continuar         ]  │
└───────────────────────────────┘
```

Si se elige *Organización* se añaden dos campos obligatorios: nombre y dirección del comedor.

### 04 · Mapa de donaciones

```
┌───────────────────────────────┐
│ Cerca de ti         [🔔]      │
│ Donaciones disponibles        │
│ [Todas][Frutas][Pan][Cocidos] │
│ ┌───────────────────────────┐ │
│ │                           │ │
│ │        MAPA               │ │
│ │   (marcadores con kg)     │ │
│ │                           │ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ Pan artesanal del día     │ │
│ │ Panadería El Trigal · 6kg │ │
│ │ [Disponible]  Vence 23:00 │ │
│ │              [Ver detalle]│ │
│ └───────────────────────────┘ │
└───────────────────────────────┘
```

- El filtro activo se marca con color y texto, no solo con color (RNF-09).
- Si se deniega el permiso de ubicación, se muestra un aviso con un botón para reintentar y se usa
  el distrito por defecto.

### 05 · Listado con filtros

```
┌───────────────────────────────┐
│ Donaciones publicadas         │
│ 3 resultados                  │
│ [🔍 Buscar alimento...]       │
│ ┌───────────────────────────┐ │
│ │ Pan artesanal del día     │ │
│ │ Panadería El Trigal       │ │
│ │ [6 kg] [Vence hoy 23:00]  │ │
│ │              [Ver detalle]│ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ Frutas y verduras         │ │
│ │ Mercado San Camilo        │ │
│ │ [12 kg] [Reservada]       │ │
│ └───────────────────────────┘ │
└───────────────────────────────┘
```

### 06 · Publicar donación

```
┌───────────────────────────────┐
│ Publicar donación             │
│ ┌───────────────────────────┐ │
│ │  + Agregar fotos (0/5)    │ │
│ └───────────────────────────┘ │
│ Qué se donará                 │
│ ┌───────────────────────────┐ │
│ │ Ej. Pan artesanal del día │ │
│ └───────────────────────────┘ │
│ Categoría                     │
│ [Frutas][Pan][Lácteos][...]   │
│ Cantidad                      │
│ ┌──────────┐ ┌──────────────┐ │
│ │ 6 kg     │ │ 40 porciones │ │
│ └──────────┘ └──────────────┘ │
│ Fecha límite de consumo       │
│ ┌───────────────────────────┐ │
│ │ dd/mm/aaaa · hh:mm        │ │
│ └───────────────────────────┘ │
│ Punto de recojo               │
│ ┌───────────────────────────┐ │
│ │ 📍 Av. Independencia 455  │ │
│ └───────────────────────────┘ │
│ [       Publicar           ]  │
└───────────────────────────────┘
```

**Regla:** no se puede publicar con fecha de caducidad anterior a la ventana de recojo.

### 07 · Detalle de donación

```
┌───────────────────────────────┐
│ ←                             │
│ ┌───────────────────────────┐ │
│ │      FOTO (16:9)          │ │
│ └───────────────────────────┘ │
│ Pan artesanal del día         │
│ Panadería El Trigal           │
│ [6 kg] [40 porciones]         │
│ [Vence hoy 23:00]             │
│                               │
│ Descripción                   │
│ Bolsas de pan francés...      │
│                               │
│ 📍 Av. Independencia 455      │
│ 🕖 Recojo 19:00 – 21:00       │
│                               │
│ [     Reservar donación     ] │
└───────────────────────────────┘
```

### 08 · Reserva y entrega con PIN

```
┌───────────────────────────────┐
│ Reserva confirmada            │
│                               │
│ Código de entrega             │
│ ┌───────────────────────────┐ │
│ │       4 8 2 9 1 3         │ │
│ └───────────────────────────┘ │
│ Comparte este código con el   │
│ voluntario al recibir.        │
│                               │
│ Línea de tiempo               │
│ ● Reservada      18:20        │
│ ○ Aceptada                    │
│ ○ En recojo                   │
│ ○ Entregada                   │
│                               │
│ Voluntario asignado           │
│ ┌───────────────────────────┐ │
│ │ 👤 Luis M.     [Llamar]   │ │
│ └───────────────────────────┘ │
│ [   Ver mis reservas       ]  │
└───────────────────────────────┘
```

### 09 · Mis reservas

```
┌───────────────────────────────┐
│ Mis reservas                  │
│ [Activas] [Historial]         │
│ ┌───────────────────────────┐ │
│ │ Pan artesanal del día     │ │
│ │ [Reservada]   Hoy 21:00   │ │
│ │ Voluntario: Luis M.       │ │
│ │              [Ver detalle]│ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ Frutas y verduras         │ │
│ │ [Entregada]   Ayer        │ │
│ │              [Valorar]    │ │
│ └───────────────────────────┘ │
└───────────────────────────────┘
```

Estado vacío: *“Todavía no tienes reservas”* con acción **Explorar donaciones**.

### 10 · Panel de impacto

```
┌───────────────────────────────┐
│ Impacto social                │
│ ┌─────────────┐ ┌───────────┐ │
│ │ 128.5 kg    │ │ 430       │ │
│ │ rescatados  │ │ porciones │ │
│ └─────────────┘ └───────────┘ │
│ ┌─────────────┐ ┌───────────┐ │
│ │ 74.2 kg CO₂ │ │ 37        │ │
│ │ evitado     │ │ entregas  │ │
│ └─────────────┘ └───────────┘ │
│ Evolución semanal             │
│ ┌───────────────────────────┐ │
│ │      gráfico de líneas    │ │
│ └───────────────────────────┘ │
└───────────────────────────────┘
```

### 11 · Perfil

```
┌───────────────────────────────┐
│      ┌───────┐                │
│      │  AQ   │  Ana Quispe    │
│      └───────┘  Comedor...    │
│      [Organización verificada]│
│ ┌───────────────────────────┐ │
│ │ Datos de contacto         │ │
│ │ ana.quispe@correo.com     │ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ Dirección de recojo       │ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ Notificaciones            │ │
│ └───────────────────────────┘ │
│ [      Editar perfil       ]  │
│ [      Cerrar sesión       ]  │
└───────────────────────────────┘
```

### 12 · Editar perfil

```
┌───────────────────────────────┐
│ ←  Editar perfil              │
│ Nombre completo               │
│ ┌───────────────────────────┐ │
│ └───────────────────────────┘ │
│ Correo electrónico            │
│ ┌───────────────────────────┐ │
│ └───────────────────────────┘ │
│ Teléfono                      │
│ ┌───────────────────────────┐ │
│ └───────────────────────────┘ │
│ Nombre de la organización     │
│ ┌───────────────────────────┐ │
│ └───────────────────────────┘ │
│ Dirección                     │
│ ┌───────────────────────────┐ │
│ └───────────────────────────┘ │
│ [     Guardar cambios      ]  │
└───────────────────────────────┘
```

## 3. Reglas transversales de las 12 pantallas

1. **Un objetivo por pantalla**: una acción primaria visible; el resto, secundaria o fantasma.
2. **Estado vacío siempre con salida**: texto explicativo + botón de acción.
3. **Carga**: *skeleton* en listados y mapa; spinner solo en acciones puntuales.
4. **Error**: mensaje en lenguaje claro + acción de reintento; nunca solo un ícono.
5. **Offline**: banda superior “Sin conexión · los cambios se guardarán” y cola visible en perfil.
6. **Área táctil mínima de 48 px** y texto escalable hasta 200 % sin romper el layout.
7. **Contraste mínimo 4.5:1** en texto normal y 3:1 en texto grande.
8. **Navegación de retorno** visible en toda pantalla secundaria.

## 4. Entregables de diseño

| Entregable | Formato | Estado |
|---|---|---|
| Wireframes de 12 pantallas | Markdown + Figma (baja fidelidad) | ✅ D1 |
| Biblioteca de componentes | `src/components/ui` | ✅ D1 |
| Tokens de diseño | `src/theme/tokens.ts` | ✅ D1 |
| Prototipo navegable | Expo Router (build de desarrollo) | ✅ D1 |
| Especificación de accesibilidad | Sección 3 de este documento | ✅ D1 |
