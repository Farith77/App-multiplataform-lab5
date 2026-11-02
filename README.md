# RedSolidaria

[![CI](https://github.com/Farith77/App-multiplataform-lab5/actions/workflows/ci.yml/badge.svg)](https://github.com/Farith77/App-multiplataform-lab5/actions/workflows/ci.yml)

**Aplicación multiplataforma para el rescate de alimentos y el abastecimiento de comedores populares y ollas comunes.**

Proyecto desarrollado para el curso de **Plataformas Emergentes** con framework multiplataforma **React Native (Expo)**.

**Repositorio:** <https://github.com/Farith77/App-multiplataform-lab5> · `main` (entregable) · `develop` (integración)

**Periodo de ejecución:** miércoles 21/10/2026 → domingo 01/11/2026 (10 jornadas de trabajo + día de entrega).

---

## 1. El problema

En muchas ciudades conviven dos realidades que podrían resolverse mutuamente: comercios que desechan alimentos aptos para el consumo (restaurantes, panaderías, mercados de abastos, supermercados) y organizaciones sociales que alimentan a población vulnerable (comedores populares, ollas comunes, albergues) y que operan con presupuesto insuficiente y sin herramientas digitales para conseguir donaciones de forma oportuna.

Hoy la coordinación se hace por llamadas, grupos de WhatsApp y contactos personales. Eso produce tres fallas concretas:

1. **Alimentos que se pierden** porque el donante no encuentra a quién donarlos a tiempo.
2. **Donaciones informales sin trazabilidad**, lo que desincentiva a los comercios (no pueden demostrar su aporte).
3. **Descoordinación logística**: alguien debe trasladar la donación y no siempre hay voluntario disponible.

## 2. La propuesta

**RedSolidaria** conecta en un solo flujo digital a **donantes**, **organizaciones beneficiarias** y **voluntarios de recojo**, con trazabilidad de cada entrega y medición del impacto social generado (kilogramos rescatados, porciones habilitadas y CO₂ evitado).

Flujo principal: **publicar → descubrir en el mapa → reservar → recojo → confirmación con QR/PIN → panel de impacto**.

## 3. Estado del proyecto

| Fase | Estado |
|---|---|
| Levantamiento de requerimientos y gestión del proyecto | ✅ Completado (T-01) |
| Sprint 0 · Arranque (repo, CI, arquitectura, diseño, base Expo) | ✅ Completado (T-02 a T-05) |
| Sprint 1 · Núcleo (auth, publicación, listado, mapa) | ⏳ Siguiente |
| Sprint 2 · Logística (reservas, recojo, entrega, impacto, pruebas) | ⏳ Pendiente |
| Sprint 3 · Cierre (UAT, build, manuales, sustentación) | ⏳ Pendiente |

## 4. Puesta en marcha

Requisitos: **Node.js 20+** y **npm 10+** (verificado en este equipo con Node 26.5.0 / npm 11.17.0).

```bash
npm install          # instala dependencias
npm start            # Expo: elige Android, iOS o web
npm run web          # atajo para abrir la versión web
npm run typecheck    # TypeScript en modo estricto
npm run lint         # ESLint (config de Expo)
npm run test         # Jest + Testing Library
npm run ci           # typecheck + lint + formato + pruebas
```

> Para probar en un teléfono físico basta con **Expo Go** (no se necesita Android Studio en el día 1).
> Copia `.env.example` a `.env` cuando exista el proyecto de Supabase (Sprint 1).

### Estructura del código

```
src/
├── app/                    Rutas (Expo Router, file-based)
│   ├── _layout.tsx         Providers: Query, SafeArea, GestureHandler
│   ├── index.tsx           Bienvenida
│   ├── (auth)/             Registro, login, selección de rol
│   ├── (tabs)/             Mapa, donar, reservas, impacto, perfil
│   ├── donacion/[id].tsx   Detalle de donación
│   └── perfil/editar.tsx   Edición de perfil
├── components/
│   ├── ui/                 Sistema de diseño (Button, Card, Badge, ...)
│   └── dev/                Andamiaje de Sprint 0 (PlaceholderScreen)
├── features/               Lógica por dominio (auth, donations, ...)
├── lib/                    HTTP, storage offline, formato, tipos
└── theme/                  Tokens de color, tipografía y espaciado
```

Cada pantalla del andamiaje está etiquetada con la **historia de usuario**, el **requerimiento
funcional** y el **sprint** en el que se implementa.

## 5. Documentación

```
docs/
├── requerimientos/
│   ├── README.md                        Índice y glosario
│   ├── 01-vision-y-alcance.md           Problema, objetivos, alcance, actores
│   ├── 02-requerimientos-funcionales.md 32 requerimientos funcionales (RF-01 … RF-32)
│   ├── 03-requerimientos-no-funcionales.md 14 RNF con métricas verificables
│   ├── 04-casos-de-uso.md               12 casos de uso + especificación detallada
│   ├── 05-historias-de-usuario.md       Backlog de historias con criterios Gherkin
│   ├── 06-modelo-de-datos.md            Entidades, atributos y relaciones
│   └── 07-matriz-trazabilidad.md        RF → HU → UC → Tarea → Prueba
├── arquitectura/
│   ├── 01-arquitectura.md               Capas, navegación, estado, seguridad y ADR
│   └── 02-contrato-api.md               Endpoints, errores y ejemplos
├── diseno/
│   ├── 01-wireframes.md                 Las 12 pantallas y sus reglas transversales
│   └── 02-sistema-de-diseno.md          Tokens, componentes y accesibilidad
└── gestion-proyecto/
    ├── README.md                        Ficha del proyecto e índice
    ├── 00-acta-de-constitucion.md        Acta, alcance y compromiso del equipo
    ├── 01-equipo-y-roles.md              Integrantes, roles, capacidades y acuerdos
    ├── 02-plan-y-cronograma.md           Fases y calendario de 10 jornadas
    ├── 03-backlog-y-asignacion.md        33 tareas con responsable y horas
    ├── 04-matriz-raci.md                 Responsabilidades por actividad
    ├── 05-riesgos-y-supuestos.md         Registro de riesgos y supuestos
    ├── 06-gantt.html                     Diagrama de Gantt interactivo
    └── cronograma.csv                    Cronograma para Excel / Project
```

## 6. Stack tecnológico

| Capa | Tecnología | Motivo |
|---|---|---|
| App móvil | React Native 0.88 + Expo SDK 58, TypeScript estricto | Multiplataforma Android/iOS/web con un solo código |
| Navegación | Expo Router 58 | Rutas por archivos y deep links |
| Estado y datos | TanStack Query + Zustand | Caché, reintentos y estado ligero |
| Backend / BaaS | Supabase (PostgreSQL, Auth, Storage, RLS) | Backend productivo sin infraestructura propia |
| Mapas | react-native-maps + expo-location | Requisito de geolocalización |
| Notificaciones | expo-notifications | Push y recordatorios |
| Offline | AsyncStorage + cola de sincronización | Zonas con conectividad intermitente |
| Calidad | TypeScript, ESLint, Prettier, Jest, Testing Library, GitHub Actions | CI en cada push a `main` y `develop` |
| Pruebas E2E | Maestro | Flujos críticos sobre build real |

## 7. Equipo

| Integrante | Rol principal |
|---|---|
| Alan Jorge Garcia Apaza | Líder de proyecto · Arquitecto de software |
| Frank Ducks Hanccocallo Hachircana | Desarrollador móvil · UI/UX |
| Vladimir Jaward Hancco Soncco | Backend · Base de datos · QA/DevOps |

Detalle en [`docs/gestion-proyecto/01-equipo-y-roles.md`](docs/gestion-proyecto/01-equipo-y-roles.md).

## 8. Cómo visualizar el cronograma

Abrir `docs/gestion-proyecto/06-gantt.html` en cualquier navegador (doble clic). Es un archivo
autocontenido, no requiere servidor. La versión para Excel es `docs/gestion-proyecto/cronograma.csv`.
