# 00 · Acta de constitución del proyecto

**Proyecto:** RedSolidaria — aplicación multiplataforma de rescate de alimentos
**Curso:** Plataformas Emergentes
**Fecha de inicio:** 21/10/2026 (miércoles) · **Fecha de entrega:** 01/11/2026 (domingo)
**Versión:** 1.0

---

## 1. Propósito

Constituir formalmente el equipo de trabajo, definir el objetivo del proyecto, el alcance comprometido, los entregables y los criterios de aceptación, de modo que los tres integrantes trabajen sobre una línea base común y verificable.

## 2. Objetivo del proyecto

Desarrollar con React Native una aplicación móvil multiplataforma que conecte a donantes de alimentos con organizaciones beneficiarias y voluntarios de recojo, con trazabilidad digital de cada entrega y medición del impacto social generado, en un plazo de doce días calendario (21/10/2026 – 01/11/2026).

## 3. Alcance comprometido

| Incluido en el MVP | Excluido (fases posteriores) |
|---|---|
| Registro y autenticación con tres roles | Pasarela de pagos o donaciones monetarias |
| Publicación de donaciones con fotos y geolocalización | Mensajería en tiempo real entre usuarios |
| Listado con filtros y mapa de donaciones cercanas | Optimización de rutas de reparto |
| Reserva y gestión de solicitudes | Integración tributaria / comprobantes |
| Asignación de voluntario y confirmación por QR/PIN | Traducción completa al quechua |
| Notificaciones push y recordatorios | Versión web de administración |
| Panel de impacto, historial y valoraciones | Modelos de IA para predecir excedentes |
| Moderación y panel de administración | |
| Funcionamiento básico sin conexión | |

## 4. Entregables

| # | Entregable | Responsable | Fecha |
|---|---|---|---|
| 1 | Documentación de requerimientos (RF, RNF, casos de uso, historias, modelo de datos, trazabilidad) | Alan / Vladimir | 21/10/2026 |
| 2 | Documentación de gestión (equipo, plan, backlog, RACI, riesgos, Gantt) | Alan | 21/10/2026 |
| 3 | Código fuente en repositorio Git con historial y CI verde | Vladimir | 31/10/2026 |
| 4 | Aplicación compilada (APK/AAB) firmada e instalable | Vladimir | 31/10/2026 |
| 5 | Manual técnico y documentación de API | Vladimir | 31/10/2026 |
| 6 | Manual de usuario y video demostrativo | Alan | 31/10/2026 |
| 7 | Presentación final y sustentación | Los tres | 01/11/2026 |

## 5. Criterios de aceptación del proyecto

1. El flujo **publicar → descubrir → reservar → recolectar → confirmar entrega → ver impacto** se completa en un dispositivo Android real sin intervención del equipo.
2. Se implementan los **21 requerimientos `Must`** definidos en la línea base.
3. **0 defectos críticos o altos** abiertos al cierre.
4. Cobertura de pruebas de lógica de negocio **≥ 60 %**.
5. Documentación completa, coherente y trazable con el código entregado.
6. UAT realizada con al menos **3 usuarios** y acta firmada.

## 6. Recursos

| Recurso | Disponibilidad |
|---|---|
| Equipo humano | 3 integrantes × 60 h de capacidad = 180 h |
| Esfuerzo planificado | 171 h (95 %) · reserva de 9 h |
| Herramientas | Node.js 26.5.0, npm 11.17.0, Git 2.52, VS Code, Expo, Supabase |
| Dispositivos | Al menos un Android físico y un emulador iOS |
| Presupuesto monetario | S/ 0 (planes gratuitos) |

## 7. Autoridad y gobierno

| Rol | Integrante | Autoridad |
|---|---|---|
| Líder de proyecto | Alan Jorge Garcia Apaza | Aprueba alcance, cronograma y recortes; resuelve conflictos |
| Desarrollador móvil / UI-UX | Frank Ducks Hanccocallo Hachircana | Decide sobre interfaz, componentes y accesibilidad |
| Backend / QA-DevOps | Vladimir Jaward Hancco Soncco | Decide sobre modelo de datos, seguridad y despliegue |

Las decisiones que afecten el alcance requieren consenso de los tres integrantes y se registran en la sección de control de cambios del documento correspondiente.

## 8. Compromiso del equipo

Los abajo firmantes declaran conocer el alcance, el cronograma y sus responsabilidades; se comprometen a cumplir la Definición de Terminado, a participar de las ceremonias acordadas y a comunicar oportunamente cualquier riesgo o bloqueo.

| Integrante | Rol | Firma | Fecha |
|---|---|---|---|
| Alan Jorge Garcia Apaza | Líder de proyecto · Arquitecto | ____________________ | 21/10/2026 |
| Frank Ducks Hanccocallo Hachircana | Desarrollador móvil · UI/UX | ____________________ | 21/10/2026 |
| Vladimir Jaward Hancco Soncco | Backend · Datos · QA/DevOps | ____________________ | 21/10/2026 |

---

*Este acta forma parte de la línea base del proyecto y se archiva en `docs/gestion-proyecto/`.*
