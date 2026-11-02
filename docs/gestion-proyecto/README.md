# Gestión del proyecto — RedSolidaria

**Proyecto:** RedSolidaria — aplicación multiplataforma de rescate de alimentos
**Curso:** Plataformas Emergentes
**Duración:** 12 días calendario (10 jornadas de trabajo + día de entrega) · 21/10/2026 → 01/11/2026
**Framework:** React Native + Expo + TypeScript

---

## 1. Ficha del proyecto

| Campo | Detalle |
|---|---|
| **Nombre del producto** | RedSolidaria |
| **Tipo de proyecto** | Aplicación móvil multiplataforma con enfoque de proyección social |
| **Problema que atiende** | Desperdicio de alimentos aptos y desabastecimiento de comedores populares y ollas comunes |
| **Objetivo general** | Conectar donantes, organizaciones beneficiarias y voluntarios en un flujo digital trazable de rescate de alimentos |
| **Alcance de la entrega** | MVP funcional con 21 requerimientos *Must*, APK/AAB, documentación y video demo |
| **Metodología** | Scrum adaptado a una iteración corta de 12 días (3 sprints + cierre), con tablero Kanban |
| **Herramientas** | Git + GitHub, GitHub Projects (tablero), Figma (wireframes), Supabase, Expo EAS, WhatsApp (coordinación diaria) |
| **Entregable final** | Repositorio con código, APK/AAB firmado, manual técnico, manual de usuario, video demo y esta documentación |

## 2. Índice de documentos

| # | Documento | Contenido |
|---|---|---|
| 00 | [Acta de constitución](00-acta-de-constitucion.md) | Objetivo, alcance, entregables, criterios de aceptación y compromiso de los integrantes |
| 01 | [Equipo y roles](01-equipo-y-roles.md) | Integrantes, responsabilidades, capacidades, acuerdos y reglas de trabajo |
| 02 | [Plan y cronograma](02-plan-y-cronograma.md) | Fases, sprints, calendario día por día, hitos y ceremonias |
| 03 | [Backlog y asignación](03-backlog-y-asignacion.md) | 33 tareas con responsable, horas, dependencias y entregable |
| 04 | [Matriz RACI](04-matriz-raci.md) | Quién ejecuta, quién aprueba, a quién se consulta y a quién se informa |
| 05 | [Riesgos y supuestos](05-riesgos-y-supuestos.md) | Registro de riesgos con probabilidad, impacto y mitigación |
| 06 | [Diagrama de Gantt](06-gantt.html) | Vista visual del cronograma (abrir en navegador) |
| — | [cronograma.csv](cronograma.csv) | Cronograma importable a Excel / Project |

## 3. Resumen del equipo

| Integrante | Rol | Horas planificadas |
|---|---|---|
| Alan Jorge Garcia Apaza | Líder de proyecto · Arquitecto de software | 57 h |
| Frank Ducks Hanccocallo Hachircana | Desarrollador móvil · UI/UX | 57 h |
| Vladimir Jaward Hancco Soncco | Backend · Base de datos · QA/DevOps | 57 h |
| **Total** | | **171 h** |

Capacidad disponible estimada: 180 h (3 integrantes × 6 h efectivas × 10 días). **Reserva de contingencia: 9 h (5 %).**

## 4. Calendario general

| Fase | Días | Fechas | Objetivo |
|---|---|---|---|
| **Sprint 0 · Arranque** | D1 | mié 21 oct | Definiciones, diseño, arquitectura y base del proyecto |
| **Sprint 1 · Núcleo** | D2 – D5 | 22 – 26 oct | Autenticación, publicación, listado y mapa operativos |
| **Sprint 2 · Logística** | D6 – D9 | 27 – 30 oct | Reservas, recojo, notificaciones, impacto y pruebas |
| **Sprint 3 · Cierre** | D10 | sáb 31 oct | UAT, correcciones, build, documentación y entrega |
| **Entrega** | — | dom 01 nov | Sustentación final |

> La documentación final se elabora de forma progresiva: los manuales y el guion del video se adelantan el D9, de modo que el último día solo se integra, se corrige y se ensaya la presentación.

## 5. Hitos

| Hito | Fecha | Criterio de cumplimiento |
|---|---|---|
| **H1 · Línea base aprobada** | mié 21 oct | Documentos de requerimientos y plan firmados por los 3 integrantes |
| **H2 · Sprint Review 1** | lun 26 oct | Un usuario puede registrarse, publicar una donación y verla en el mapa |
| **H3 · Funcionalidad completa** | vie 30 oct | Flujo completo publicar → reservar → recojo → entrega → impacto funcionando |
| **H4 · Entrega final** | sáb 31 oct | UAT aprobada, APK/AAB, manuales y video listos |
| **H5 · Sustentación** | dom 01 nov | Presentación final ante el docente |

## 6. Cómo leer esta carpeta

1. Empiece por `01-equipo-y-roles.md` para conocer quién hace qué.
2. `02-plan-y-cronograma.md` explica el calendario y las ceremonias.
3. `03-backlog-y-asignacion.md` es el listado operativo de tareas.
4. `06-gantt.html` da la vista visual (doble clic para abrir en el navegador).
5. `05-riesgos-y-supuestos.md` se revisa en cada reunión de seguimiento.

## 7. Estado de ejecución

| Sprint | Fechas | Estado | Evidencia |
|---|---|---|---|
| Sprint 0 · Arranque | mié 21 oct | ✅ Cerrado | Repo con CI, arquitectura, contrato de API, wireframes, sistema de diseño y app Expo con navegación y pruebas |
| Sprint 1 · Núcleo | 22 – 26 oct | ⏳ Siguiente | — |
| Sprint 2 · Logística | 27 – 30 oct | ⏳ Pendiente | — |
| Sprint 3 · Cierre | 31 oct + 01 nov | ⏳ Pendiente | — |

**Verificación del Sprint 0:** `npm run typecheck`, `npm run lint`, `npm run format:check` y `npm test`
(8 pruebas) en verde; build web generado con `npx expo export --platform web`.

---

*Documentación de gestión v1.1 · Sprint 0 cerrado el 21/10/2026*
