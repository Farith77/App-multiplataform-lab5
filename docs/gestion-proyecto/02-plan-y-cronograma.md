# 02 · Plan y cronograma

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026
**Periodo:** miércoles 21/10/2026 → domingo 01/11/2026 · 12 días calendario (10 jornadas de trabajo + día de entrega)

---

## 1. Enfoque de planificación

El proyecto se ejecuta en **3 sprints + cierre**, con una lógica de dependencias clara: primero se construye la base técnica y el flujo de donaciones, después la logística de recojo y finalmente la entrega.

| Fase | Días | Fechas | Objetivo | Entregable verificable |
|---|---|---|---|---|
| **Sprint 0 · Arranque** | D1 | mié 21 oct | Marco documental, diseño, arquitectura y base del repositorio | Repo con CI, wireframes aprobados, esquema de datos |
| **Sprint 1 · Núcleo** | D2 – D5 | 22 – 26 oct | Registro, publicación, listado y mapa | Un donante publica y un beneficiario ve la donación en el mapa |
| **Sprint 2 · Logística** | D6 – D9 | 27 – 30 oct | Reservas, recojo, entrega, notificaciones, impacto y pruebas | Flujo completo de punta a punta con datos persistidos |
| **Sprint 3 · Cierre** | D10 | sáb 31 oct | UAT, correcciones, build, documentación y presentación | APK/AAB + manuales + video + acta de cierre (entrega: dom 01 nov) |

> **Nota sobre el cierre:** la documentación final y el guion del video se preparan de forma progresiva desde el D9; el D10 se reserva para la UAT, las correcciones de último momento, el build definitivo y el ensayo de la presentación.

## 2. Calendario día por día

| Día | Fecha | Foco | Tareas activas | Responsables | Entregable del día |
|---|---|---|---|---|---|
| **D1** | mié 21 oct | Arranque | T-01, T-02, T-03, T-04, T-05 | Alan, Vladimir, Frank | Acta, repo con CI, arquitectura, inicio de wireframes |
| **D2** | jue 22 oct | Base técnica | T-04, T-05, T-06, T-07 | Frank, Vladimir | Wireframes cerrados, app base corriendo, BD creada |
| **D3** | vie 23 oct | Autenticación | T-06, T-07, T-08, T-09, T-10 | Vladimir, Frank, Alan | Login funcional, API de donaciones en curso |
| **D4** | sáb 24 oct | Publicación | T-09, T-10, T-11, T-13 | Alan, Vladimir, Frank | Formulario de publicación y mapa en desarrollo |
| **D5** | lun 26 oct | Cierre Sprint 1 | T-12, T-13, T-14, T-15, T-16 | Todos | **H2:** demo de publicar → listar → ver en mapa |
| **D6** | mar 27 oct | Reservas | T-17, T-18 | Vladimir, Frank | API y UI de reservas |
| **D7** | mié 28 oct | Recojo | T-17, T-18, T-19, T-20 | Todos | Asignación de voluntario y notificaciones |
| **D8** | jue 29 oct | Impacto y calidad | T-19, T-21, T-22, T-23, T-24, T-26 | Todos | Panel de impacto, moderación y pruebas E2E |
| **D9** | vie 30 oct | Cierre de desarrollo | T-22, T-24, T-25, T-26, T-27, T-28, T-32 | Todos | **H3:** flujo completo funcionando + retro |
| **D10** | sáb 31 oct | Cierre y entrega técnica | T-29, T-30, T-31, T-32, T-33 | Todos | **H4:** UAT, APK/AAB, manuales y video |
| **—** | dom 01 nov | Sustentación | — | Todos | Presentación final ante el docente |

## 3. Objetivos por sprint y criterios de aceptación

### Sprint 0 — Arranque (D1)

**Meta:** que los tres integrantes tengan un entorno idéntico, un diseño acordado y un esquema de datos estable.

- [ ] Repositorio creado con `main` y `develop`, protección de rama y pipeline de CI.
- [ ] Proyecto Expo ejecutando en al menos un dispositivo físico.
- [ ] Wireframes de las 12 pantallas principales aprobados por el equipo.
- [ ] Diagrama de arquitectura y modelo de datos revisados.
- [ ] Datos semilla cargados en Supabase.

### Sprint 1 — Núcleo (D2–D5)

**Meta:** demostrar el ciclo de valor mínimo: alguien ofrece comida y otra persona la encuentra.

- [ ] Registro, inicio de sesión y selección de rol funcionando (RF-01…RF-03).
- [ ] Publicación de donación con fotos y ubicación (RF-06…RF-08).
- [ ] Listado con filtros y vista de mapa (RF-11…RF-14).
- [ ] Pruebas de API y colección Postman (RNF-06).
- [ ] Entorno de staging disponible (RNF-05).

**Criterio de salida:** un usuario externo al equipo publica una donación desde su teléfono y otro la ve en el mapa en menos de 3 minutos.

### Sprint 2 — Logística (D6–D9)

**Meta:** cerrar el ciclo completo con trazabilidad y medición de impacto.

- [ ] Reserva, aceptación y máquina de estados (RF-15…RF-18).
- [ ] Asignación de voluntario y confirmación por QR/PIN (RF-19, RF-20).
- [ ] Notificaciones push y recordatorios (RF-21, RF-22).
- [ ] Panel de impacto, historial y valoraciones (RF-24…RF-27).
- [ ] Moderación y administración (RF-28…RF-30).
- [ ] Modo offline básico (RF-31, RF-32).
- [ ] Pruebas E2E de los 5 flujos críticos (RNF-06).

**Criterio de salida:** el flujo publicar → reservar → recojo → entrega → impacto se completa sin intervención manual del equipo.

### Sprint 3 — Cierre (D10 + entrega)

**Meta:** entregar un producto demostrable, documentado y estable.

- [ ] UAT con al menos 3 usuarios y acta firmada.
- [ ] 0 defectos críticos o altos abiertos.
- [ ] APK/AAB firmado e instalable.
- [ ] Manual técnico, manual de usuario, video demo y presentación.
- [ ] Acta de cierre y retrospectiva.

## 4. Ruta crítica

```
T-06 (BD/RLS) → T-10 (API donaciones) → T-11 (formulario publicación)
      → T-12 (listado) → T-17 (API reservas) → T-18 (UI reservas)
      → T-19 (recojo/entrega) → T-26 (pruebas E2E) → T-29 (UAT)
      → T-31 (build APK) → T-33 (cierre)
```

**Lectura:** cualquier retraso superior a **4 horas** en T-06, T-10, T-11 o T-17 impacta directamente la fecha de entrega. Estas tareas tienen prioridad absoluta y se revisan primero en el daily.

**Holgura total del proyecto:** 9 horas (5 % de la capacidad).

## 5. Ceremonias y puntos de control

| Día | Momento | Actividad | Duración |
|---|---|---|---|
| D1 | 18:00 | *Kickoff* y planificación del Sprint 1 | 45 min |
| D1 – D9 | 18:00 | Daily stand-up | 15 min |
| D3 | 19:00 | Revisión de riesgos y avance | 15 min |
| D5 | 21:00 | **Sprint Review 1** + demo | 30 min |
| D6 | 18:00 | Planificación del Sprint 2 | 45 min |
| D9 | 20:00 | **Sprint Review 2**, retrospectiva y revisión de riesgos | 45 min |
| D10 | 20:00 | Ensayo de presentación y cierre | 30 min |
| Dom 01 nov | — | Sustentación final | — |

> **Jornada de los sábados:** el 24 y el 31 de octubre son jornadas completas de trabajo (mañana y tarde). El domingo 25 de octubre se mantiene libre como descanso obligatorio para no llegar agotados a la última semana.

## 6. Distribución de la carga

| Integrante | S0 | S1 | S2 | S3 | Total | % de 60 h |
|---|---|---|---|---|---|---|
| Alan | 8 h | 19 h | 19 h | 11 h | **57 h** | 95 % |
| Frank | 10 h | 20 h | 23 h | 4 h | **57 h** | 95 % |
| Vladimir | 4 h | 23 h | 25 h | 5 h | **57 h** | 95 % |
| **Total** | **22 h** | **62 h** | **67 h** | **20 h** | **171 h** | 95 % |

> El detalle por tarea está en [`03-backlog-y-asignacion.md`](03-backlog-y-asignacion.md) y la vista visual en [`06-gantt.html`](06-gantt.html).

## 7. Plan de contingencia

### 7.1 Umbrales de alerta

| Señal | Umbral | Acción |
|---|---|---|
| Retraso en ruta crítica | > 4 h | Reparto de la tarea en el daily y apoyo de otro integrante |
| Avance del sprint | < 70 % al cierre del día 3 | Activar recorte de alcance |
| Defectos críticos abiertos | ≥ 3 el día 9 | Congelar nuevas funcionalidades y dedicar el día 10 a correcciones |
| Integrante no disponible | ≥ 1 día | Reasignación según la matriz RACI y ajuste del cronograma |

### 7.2 Orden de recorte (de menor a mayor impacto)

1. HU-20 / RF-31, RF-32 — modo offline se limita a caché de lectura.
2. HU-19 / RF-28 — panel de administración se sustituye por consultas en Supabase durante la demo.
3. HU-17 / RF-27 — se entrega historial sin valoraciones.
4. HU-04 / RF-04 — verificación de organizaciones se resuelve con datos semilla.
5. RF-25 — exportación de reporte mensual pasa a roadmap.

**Nunca se recorta:** autenticación, publicación, listado, reserva, confirmación de entrega y panel de impacto. Sin ellos no hay producto demostrable.

### 7.3 Plan de recuperación de un día perdido

- Se elimina la documentación de detalle pendiente y se prioriza código funcional.
- Se usa el domingo 25/10 (jornada libre) o la franja nocturna extra como recuperación.
- Se paraleliza: mientras un integrante corrige defectos, otro adelanta el capítulo de documentación.

## 8. Plan de comunicación

| Canal | Uso | Frecuencia |
|---|---|---|
| WhatsApp (grupo del equipo) | Avisos rápidos y bloqueos | Permanente |
| GitHub Issues / Projects | Tareas, defectos y revisiones | Permanente |
| Reunión diaria (videollamada) | Coordinación y reparto | Diaria 15 min |
| Documento compartido | Decisiones y actas | Por evento |

**Regla de oro:** una decisión que afecte a más de un integrante se escribe; si no está escrita, no existe.

## 9. Control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 21/10/2026 | Cronograma base de 10 jornadas |
| 0.2 | 21/10/2026 | Ajuste de carga por integrante y ruta crítica |
| 1.0 | 21/10/2026 | Periodo reajustado a 21/10 – 01/11 (10 jornadas + día de entrega); contingencia y comunicación aprobadas |
