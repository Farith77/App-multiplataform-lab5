# 01 · Equipo y roles

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026

---

## 1. Composición del equipo

| # | Integrante | Rol principal | Rol secundario | Horas |
|---|---|---|---|---|
| 1 | **Alan Jorge Garcia Apaza** | Líder de proyecto · Arquitecto de software | Soporte full-stack · Documentación | 57 h |
| 2 | **Frank Ducks Hanccocallo Hachircana** | Desarrollador móvil · UI/UX | Pruebas E2E · Accesibilidad | 57 h |
| 3 | **Vladimir Jaward Hancco Soncco** | Backend · Base de datos · QA/DevOps | Seguridad · Despliegue | 57 h |

**Criterio de reparto:** la carga se equilibró a 57 h por integrante (95 % de la capacidad de 60 h), dejando 3 h de reserva individual para imprevistos.

---

## 2. Alan Jorge Garcia Apaza — Líder de proyecto y arquitecto

| Campo | Detalle |
|---|---|
| **Rol** | Project Lead + Software Architect |
| **Enfoque** | Decisiones técnicas, integración del flujo logístico y cierre del proyecto |
| **Horas planificadas** | 57 h |
| **Módulos asignados** | Perfiles (RF-05) · Geolocalización (RF-13, RF-14) · Logística (RF-19, RF-20) · Impacto (RF-24, RF-25) · Offline (RF-31, RF-32) |

**Responsabilidades**

1. Mantener actualizados el alcance, el cronograma y el registro de riesgos.
2. Definir la arquitectura, el contrato de API y el modelo de datos junto con Vladimir.
3. Implementar el panel de impacto social y el flujo de recojo/entrega.
4. Asegurar la integración entre módulos y resolver bloqueos del equipo.
5. Dirigir las ceremonias (planificación, daily, review y retrospectiva).
6. Coordinar la UAT y elaborar el acta de cierre.
7. Preparar la presentación final y el video demo.

**Competencias requeridas** · Arquitectura de software · React Native intermedio · Modelado de datos · Gestión de proyectos ágil · Comunicación.

**Riesgo asociado al rol** | Concentra demasiadas actividades de coordinación y de desarrollo; si se sobrecarga, se retrasa el cierre. *Mitigación:* el equipo acuerda que la documentación se redacta en paralelo al desarrollo, no al final.

---

## 3. Frank Ducks Hanccocallo Hachircana — Desarrollador móvil y UI/UX

| Campo | Detalle |
|---|---|
| **Rol** | Mobile Developer + UI/UX Designer |
| **Enfoque** | Experiencia de usuario, pantallas y calidad visual de la aplicación |
| **Horas planificadas** | 57 h |
| **Módulos asignados** | Diseño y sistema de componentes · Autenticación (RF-01…RF-03) · Publicación (RF-06…RF-08) · Reservas UI (RF-15…RF-18) · Historial y valoraciones (RF-26, RF-27) · Accesibilidad e i18n |

**Responsabilidades**

1. Diseñar los wireframes y el sistema de diseño (colores, tipografía, espaciados).
2. Construir la interfaz de todos los flujos, garantizando consistencia visual.
3. Implementar los formularios con validación en línea y mensajes claros.
4. Asegurar accesibilidad (contraste, tamaños táctiles, etiquetas para lectores de pantalla).
5. Ejecutar las pruebas E2E de los flujos críticos y reportar defectos.
6. Mantener la biblioteca de componentes reutilizables.
7. Realizar el pulido final de la interfaz tras la UAT.

**Competencias requeridas** · React Native · TypeScript · Diseño de interfaces móviles · Figma · Pruebas de componentes.

**Riesgo asociado al rol** | Es el único perfil con foco en UI; si se enferma, la interfaz se detiene. *Mitigación:* los componentes se documentan en Figma y el código, y Alan puede cubrir ajustes simples.

---

## 4. Vladimir Jaward Hancco Soncco — Backend, datos y QA/DevOps

| Campo | Detalle |
|---|---|
| **Rol** | Backend Developer + DBA + QA/DevOps |
| **Enfoque** | Datos confiables, reglas de negocio en el servidor y entrega estable |
| **Horas planificadas** | 57 h |
| **Módulos asignados** | Infraestructura y CI · Supabase (Auth, RLS, Storage) · API de donaciones (RF-06…RF-10) · Reservas y estados (RF-15…RF-18) · Notificaciones (RF-21, RF-22) · Administración (RF-04, RF-28…RF-30) · Seguridad · Builds |

**Responsabilidades**

1. Configurar el proyecto de Supabase: tablas, políticas RLS, Storage y datos semilla.
2. Implementar y documentar la API y las reglas de negocio del lado del servidor.
3. Garantizar la máquina de estados y la tabla de auditoría.
4. Configurar el pipeline de CI (typecheck, lint, pruebas) y los entornos de staging.
5. Implementar el envío de notificaciones push y los recordatorios programados.
6. Ejecutar las pruebas de API y el endurecimiento de seguridad.
7. Generar el build APK/AAB firmado y el manual técnico.

**Competencias requeridas** · PostgreSQL y RLS · Node.js/TypeScript · Supabase · CI/CD · Pruebas de API · Seguridad móvil básica.

**Riesgo asociado al rol** | Dependencia crítica: el resto del equipo no puede avanzar sin el backend. *Mitigación:* el sprint 0 prioriza dejar el esquema y los datos semilla listos antes del día 3, y se trabaja con datos mock mientras tanto.

---

## 5. Distribución de responsabilidades por módulo

| Módulo | Líder técnico | Apoyo | Revisor |
|---|---|---|---|
| Autenticación y perfiles | Frank | Vladimir | Alan |
| Publicación de donaciones | Vladimir | Frank | Alan |
| Geolocalización y mapa | Alan | Frank | Vladimir |
| Reservas y logística | Alan | Vladimir | Frank |
| Notificaciones | Vladimir | Alan | Frank |
| Impacto y reputación | Alan | Frank | Vladimir |
| Administración y moderación | Vladimir | Alan | Frank |
| Resiliencia offline | Alan | Vladimir | Frank |

---

## 6. Capacidades y brechas del equipo

| Capacidad | Nivel actual | Necesidad del proyecto | Plan de cierre |
|---|---|---|---|
| React Native + Expo | Medio | Alto | Tutorial guiado en D1 + pairing Frank → Alan |
| TypeScript | Medio | Alto | Configuración estricta y revisión cruzada |
| PostgreSQL / Supabase | Medio | Alto | Vladimir documenta el esquema en D2 para el resto |
| Diseño UI/UX | Medio | Medio | Plantilla de sistema de diseño + Figma |
| Pruebas automatizadas | Bajo | Medio | Sesión de 1 h sobre Jest + Testing Library en D2 |
| CI/CD y builds | Bajo | Medio | Vladimir configura el pipeline y documenta el proceso |
| Gestión ágil | Medio | Medio | Tablero simple con 4 columnas y daily de 15 min |

**Acuerdo de aprendizaje:** cada integrante dedica la primera hora de los días D1 y D2 a cerrar su brecha técnica; ese tiempo ya está contemplado dentro de las 6 h efectivas diarias.

---

## 7. Acuerdos de trabajo

### 7.1 Disponibilidad

| Día | Franja común acordada | Uso |
|---|---|---|
| Mié 21 – vie 23 oct | 18:00 – 22:00 | Trabajo sincrónico, pairing y reuniones |
| Sáb 24 oct | 09:00 – 13:00 y 15:00 – 19:00 | Jornada completa de avance |
| Lun 26 – vie 30 oct | 18:00 – 22:00 | Trabajo sincrónico, pairing y reuniones |
| Sáb 31 oct | 09:00 – 13:00 y 15:00 – 19:00 | Cierre técnico y ensayo |
| Dom 25 oct | Libre | Descanso; solo mensajes urgentes |
| Dom 01 nov | Según horario del curso | Sustentación final |

### 7.2 Ceremonias

| Ceremonia | Cuándo | Duración | Resultado |
|---|---|---|---|
| Daily stand-up | Cada día a las 18:00 | 15 min | Qué hice, qué haré, qué me bloquea |
| Planificación de sprint | D1 (21 oct) y D6 (27 oct) | 45 min | Sprint backlog comprometido |
| Sprint Review | D5 (26 oct) y D9 (30 oct) | 30 min | Demo y validación del incremento |
| Retrospectiva | D9 (30 oct) | 30 min | Acciones de mejora concretas |
| Revisión de riesgos | D3 (23 oct), D6 (27 oct) y D9 (30 oct) | 15 min | Registro de riesgos actualizado |

### 7.3 Reglas de colaboración

1. **Nadie fusiona su propio código sin revisión** de otro integrante (mínimo una aprobación).
2. **Ramas:** `main` (estable) ← `develop` ← `feat/<modulo>-<descripcion>`. Nunca se trabaja directo en `main`.
3. **Commits:** convención `tipo(scope): descripción` — por ejemplo `feat(reservas): agregar confirmación por PIN`. Tipos: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`.
4. **Bloqueos:** si una tarea está detenida más de 2 horas, se avisa en el grupo; no se espera hasta el daily.
5. **Decisiones técnicas:** se documentan en `docs/` o en el issue correspondiente, no solo en el chat.
6. **Nada de secretos en el repositorio:** las claves van en `.env` (ignorado por Git) y se comparten por canal privado.
7. **Código en español para el dominio** (entidades y campos) y en inglés para la infraestructura técnica.

### 7.4 Regla de escalamiento

| Situación | Quién decide | Plazo |
|---|---|---|
| Duda de implementación | Líder del módulo | Inmediato |
| Conflicto entre requerimientos | Alan (líder) | Mismo día |
| Riesgo de incumplimiento del sprint | Equipo en daily | Decisión el mismo día |
| Recorte de alcance | Alan + validación del equipo | En la revisión de sprint |

---

## 8. Definición de Preparado (DoR)

Una tarea puede entrar en desarrollo cuando:

- Tiene requerimiento asociado (RF/RNF) y criterio de aceptación escrito.
- Tiene responsable asignado y estimación en horas.
- Sus dependencias están resueltas o identificadas.
- El diseño de la pantalla (si aplica) está aprobado en Figma.

## 9. Definición de Terminado (DoD)

Una tarea se considera terminada cuando:

1. El código está en `develop` y pasó la revisión de un compañero.
2. Compila sin errores de TypeScript y sin advertencias de ESLint.
3. Las pruebas unitarias o de integración asociadas pasan.
4. Funciona en un dispositivo Android físico.
5. Los estados de carga, vacío y error están implementados.
6. La documentación o el issue quedó actualizado.
7. El responsable hizo una demo de 2 minutos al equipo.

---

## 10. Control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 21/10/2026 | Asignación inicial de roles |
| 0.2 | 21/10/2026 | Equilibrio de carga a 57 h por integrante |
| 1.0 | 21/10/2026 | Acuerdos, DoR y DoD aprobados por los tres integrantes |
