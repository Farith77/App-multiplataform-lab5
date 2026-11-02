# 04 · Matriz RACI

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026

**Leyenda:** **R** = Responsable de ejecutar · **A** = Aprueba / rinde cuentas · **C** = Consultado · **I** = Informado
*Regla:* cada actividad tiene exactamente un **A**, y quien ejecuta (**R**) puede coincidir con **A** solo en actividades de bajo impacto.

---

## 1. Actividades de gestión

| # | Actividad | Alan | Frank | Vladimir |
|---|---|---|---|---|
| 1 | Definición del alcance y acta de constitución | **A/R** | C | C |
| 2 | Levantamiento de requerimientos funcionales | **A** | C | **R** |
| 3 | Definición de requerimientos no funcionales | C | C | **A/R** |
| 4 | Wireframes y sistema de diseño | C | **A/R** | I |
| 5 | Arquitectura de la solución | **A/R** | C | C |
| 6 | Modelo de datos | **A** | I | **R** |
| 7 | Planificación y cronograma | **A/R** | C | C |
| 8 | Gestión de riesgos | **A/R** | C | C |
| 9 | Control de versiones y revisión de código | C | R | **A/R** |
| 10 | Comunicación con el docente | **A/R** | I | I |
| 11 | Ceremonias (daily, review, retro) | **A/R** | R | R |

## 2. Actividades de desarrollo

| # | Actividad | Alan | Frank | Vladimir |
|---|---|---|---|---|
| 12 | Configuración del repositorio y CI | I | I | **A/R** |
| 13 | Base de datos, RLS y datos semilla | C | I | **A/R** |
| 14 | Autenticación y gestión de perfiles | C | **A/R** | R |
| 15 | Publicación de donaciones (API) | I | C | **A/R** |
| 16 | Publicación de donaciones (UI) | I | **A/R** | C |
| 17 | Listado, filtros y búsqueda | **A/R** | C | I |
| 18 | Mapa y geolocalización | **A/R** | R | I |
| 19 | Reservas y máquina de estados (API) | C | I | **A/R** |
| 20 | Reservas y estados (UI) | I | **A/R** | C |
| 21 | Asignación de voluntario y recojo | **A/R** | C | C |
| 22 | Confirmación de entrega con QR/PIN | **A/R** | C | C |
| 23 | Notificaciones push y recordatorios | I | C | **A/R** |
| 24 | Panel de impacto social | **A/R** | C | C |
| 25 | Historial y valoraciones | I | **A/R** | I |
| 26 | Administración y moderación | I | C | **A/R** |
| 27 | Modo offline y sincronización | **A/R** | C | C |
| 28 | Accesibilidad e internacionalización | I | **A/R** | I |

## 3. Actividades de calidad y cierre

| # | Actividad | Alan | Frank | Vladimir |
|---|---|---|---|---|
| 29 | Pruebas unitarias y de integración | I | R | **A/R** |
| 30 | Pruebas E2E de flujos críticos | I | **A/R** | C |
| 31 | Endurecimiento de seguridad | C | I | **A/R** |
| 32 | Despliegue de staging | I | I | **A/R** |
| 33 | UAT con usuarios | **A/R** | R | C |
| 34 | Corrección de defectos post-UAT | C | **A/R** | R |
| 35 | Build APK/AAB y publicación | I | I | **A/R** |
| 36 | Manual técnico | I | I | **A/R** |
| 37 | Manual de usuario y video demo | **A/R** | C | I |
| 38 | Presentación final | **A/R** | R | R |
| 39 | Retrospectiva y acta de cierre | **A/R** | R | R |

---

## 4. Resumen de carga de responsabilidad

| Integrante | Actividades con **A** | Actividades con **R** | Perfil de responsabilidad |
|---|---|---|---|
| Alan | 17 | 14 | Máxima responsabilidad de aprobación: concentra las decisiones de alcance, arquitectura y cierre |
| Frank | 10 | 13 | Responsabilidad de ejecución en interfaz, diseño y pruebas E2E |
| Vladimir | 12 | 14 | Responsabilidad de ejecución en backend, datos, seguridad y entrega técnica |

**Observación de equilibrio:** aunque Alan concentra más aprobaciones (propio del rol de líder), la ejecución está repartida de forma equivalente entre los tres integrantes (13–14 actividades con **R** cada uno), lo que reduce el riesgo de cuello de botella.

---

## 5. Control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 21/10/2026 | Matriz RACI inicial por módulo |
| 1.0 | 21/10/2026 | 39 actividades detalladas y validación de un único **A** por actividad |
