# 02 · Sistema de diseño

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026
**Tarea:** T-04 · **Responsable:** Frank Ducks Hanccocallo Hachircana
**Implementación:** `src/theme/tokens.ts` + `src/components/ui`

---

## 1. Principios

| Principio | Cómo se aplica |
|---|---|
| **Claridad antes que adornos** | Una acción primaria por pantalla; el resto se jerarquiza con variantes |
| **Confianza** | Estados explícitos (disponible, reservada, entregada) con texto e ícono, no solo color |
| **Rapidez en campo** | Áreas táctiles de 48 px, formularios cortos y feedback inmediato |
| **Consistencia** | Todo valor visual sale de un token; ningún color literal en pantallas |
| **Inclusión** | Contraste AA, textos escalables, etiquetas para lectores de pantalla |

## 2. Color

Verde como color de marca (alimento, solidaridad) y ámbar para la urgencia de caducidad.

| Token | Hex | Uso |
|---|---|---|
| `brand500` | `#0F7B4F` | Acción primaria, marca, marcador activo |
| `brand600` | `#0B6240` | Texto sobre fondos claros, ítem activo de la tab bar |
| `brand700` | `#084B32` | Texto de énfasis sobre `brand50` |
| `brand50` | `#E9F7F0` | Fondo de botón secundario y etiquetas |
| `accent500` | `#F59E0B` | Aviso de caducidad próxima |
| `success` | `#15803D` | Donación disponible, entrega confirmada |
| `info` | `#1D4ED8` | Donación reservada |
| `warning` | `#B45309` | Caducidad < 4 h, datos incompletos |
| `danger` | `#B91C1C` | Cancelación, error de validación |
| `background` | `#F6F8FB` | Fondo de pantalla |
| `surface` | `#FFFFFF` | Tarjetas, campos, hojas |
| `textPrimary` | `#0F172A` | Texto principal |
| `textSecondary` | `#475569` | Texto de apoyo |
| `textMuted` | `#64748B` | Metadatos y placeholders |

**Estados de donación**

| Estado | Color | Etiqueta visible |
|---|---|---|
| `disponible` | `#0F7B4F` | Disponible |
| `reservada` | `#1D4ED8` | Reservada |
| `en_recojo` | `#B45309` | En recojo |
| `entregada` | `#15803D` | Entregada |
| `cancelada` | `#B91C1C` | Cancelada |
| `vencida` | `#64748B` | Vencida |

## 3. Tipografía

Una sola familia del sistema (`System` / `Segoe UI` / `Roboto`), sin fuentes descargadas: menos peso
y carga instantánea.

| Token | Tamaño / interlínea | Peso | Uso |
|---|---|---|---|
| `display` | 32 / 38 | 700 | Bienvenida y cifras de impacto |
| `h1` | 24 / 30 | 700 | Título de pantalla |
| `h2` | 20 / 26 | 700 | Título de sección |
| `h3` | 17 / 22 | 600 | Título de tarjeta |
| `body` | 15 / 22 | 400 | Texto corriente |
| `bodyStrong` | 15 / 22 | 600 | Etiqueta de botón |
| `caption` | 13 / 18 | 400 | Metadatos, ayudas |
| `label` | 12 / 16 | 600 | Etiquetas de campo, chips |

## 4. Espaciado y radios

Escala de 4 px: `xs 4 · sm 8 · md 12 · lg 16 · xl 24 · 2xl 32 · 3xl 48`.

| Radio | Valor | Uso |
|---|---|---|
| `sm` | 8 | Etiquetas, chips |
| `md` | 12 | Botones y campos |
| `lg` | 16 | Tarjetas y contenedores |
| `xl` | 24 | Hojas modales |
| `pill` | 999 | Badges, avatares |

## 5. Componentes

| Componente | Archivo | Variantes / props | Notas |
|---|---|---|---|
| `Screen` | `Screen.tsx` | `scroll`, `padded` | Safe area + fondo + padding |
| `Button` | `Button.tsx` | `primary`, `secondary`, `ghost`, `danger` · `sm/md/lg` | `loading` y `disabled` accesibles |
| `TextField` | `TextField.tsx` | `label`, `error`, `hint` | Error anunciado con `accessibilityLiveRegion` |
| `Card` | `Card.tsx` | `title`, `subtitle`, `footer` | Usada en donaciones, reservas y métricas |
| `Badge` | `Badge.tsx` | `neutral`, `brand`, `success`, `warning`, `danger`, `info` | Nunca comunica estado solo por color |
| `EmptyState` | `EmptyState.tsx` | `title`, `description`, `icon`, `action` | Toda lista vacía debe tener salida |
| `SectionHeader` | `SectionHeader.tsx` | `eyebrow`, `title`, `subtitle`, `right` | Jerarquía de encabezados |
| `PlaceholderScreen` | `components/dev` | `hus`, `rfs`, `sprint` | Solo Sprint 0; se elimina al implementar |

**Composición de una tarjeta de donación**

```
Card
├── Title          → nombre del alimento
├── Subtitle       → donante · peso
├── Badge(s)       → estado y caducidad
└── Footer → Button secundario "Ver detalle"
```

## 6. Iconografía

- `@expo/vector-icons` (Ionicons) para navegación y acciones.
- Emoji solo en estados vacíos y selección de rol, donde aporta calidez.
- Tamaños: 20 px en línea, 24 px en tab bar y encabezados.
- Todo ícono interactivo lleva `accessibilityLabel`; los decorativos,
  `accessibilityElementsHidden`.

## 7. Accesibilidad (RNF-09)

| Criterio | Implementación |
|---|---|
| Contraste | Texto principal sobre superficie ≥ 12:1; texto secundario ≥ 4.6:1 |
| Área táctil | Mínimo 48 × 48 px (`TOUCH_TARGET`) |
| Texto escalable | Sin alturas fijas en textos; `numberOfLines` solo en etiquetas de botón |
| Lectores de pantalla | `accessibilityRole`, `accessibilityLabel`, `accessibilityState` |
| Estados | Color + texto + ícono (nunca solo color) |
| Formularios | Etiqueta visible, `hint`, error asociado y anunciado |
| Movimiento | Animaciones de 200–250 ms; se respeta “reducir movimiento” del sistema |

## 8. Internacionalización (RNF-10)

- Español (Perú) como idioma base; quechua planificado para el Sprint 2.
- Fechas con `Intl.DateTimeFormat('es-PE')` y zona `America/Lima`.
- Pesos en kilogramos con una decimal, separador decimal según locale.
- Textos centralizados: ningún literal de UI dentro de un componente de dominio.

## 9. Responsive

| Ancho | Comportamiento |
|---|---|
| < 768 px | Una columna, tab bar inferior |
| 768 – 1023 px | Listados a dos columnas, mapa a la izquierda |
| ≥ 1024 px | Contenedor centrado de 1080 px, mapa y listado lado a lado |

## 10. Reglas de contribución

1. Un componente nuevo entra en `src/components/ui` solo si se usa en **dos o más** pantallas.
2. Todo valor visual nuevo se agrega primero a `tokens.ts` con nombre semántico.
3. Ningún componente de UI importa de `src/features`.
4. Cada componente nuevo incluye al menos una prueba en `__tests__`.
5. Los cambios de diseño se revisan en el daily y se registran en este documento.
