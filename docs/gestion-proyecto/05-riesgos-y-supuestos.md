# 05 · Riesgos y supuestos

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026
**Revisión:** en cada daily y formalmente en D3, D6 y D9.

---

## 1. Escala de valoración

| Probabilidad | Valor | Impacto | Valor |
|---|---|---|---|
| Alta (más de 60 %) | 3 | Alto: compromete la entrega | 3 |
| Media (30 – 60 %) | 2 | Medio: afecta un módulo | 2 |
| Baja (menos de 30 %) | 1 | Bajo: ajuste menor | 1 |

**Exposición = Probabilidad × Impacto**

| Exposición | Nivel | Acción requerida |
|---|---|---|
| 6 – 9 | 🔴 Crítico | Plan de mitigación obligatorio y seguimiento diario |
| 3 – 5 | 🟠 Alto | Mitigación definida y responsable asignado |
| 1 – 2 | 🟢 Bajo | Monitoreo periódico |

---

## 2. Registro de riesgos

| ID | Riesgo | Categoría | P | I | Exp. | Nivel | Mitigación | Plan de contingencia | Responsable |
|---|---|---|---|---|---|---|---|---|---|
| **R-01** | Curva de aprendizaje de React Native/Expo retrasa las primeras entregas | Técnico | 3 | 2 | 6 | 🔴 | Sprint 0 dedicado a setup y pairing; tutorial guiado el D1; componentes base reutilizables | Reducir el alcance de las pantallas menos críticas y usar plantillas | Alan |
| **R-02** | El retraso del backend (Supabase/RLS) bloquea el desarrollo de la interfaz | Dependencia | 2 | 3 | 6 | 🔴 | Esquema y datos semilla listos antes del D3; datos mock en la app mientras tanto | La UI trabaja contra un archivo de datos locales y se conecta al final | Vladimir |
| **R-03** | Conflictos de merge por trabajo simultáneo en los mismos archivos | Proceso | 3 | 2 | 6 | 🔴 | Ramas por tarea, arquitectura por features, revisión obligatoria antes de fusionar | Resolución en pairing y, si es grave, se rehace la rama desde `develop` | Vladimir |
| **R-04** | Indisponibilidad de un integrante (enfermedad, evaluaciones de otros cursos) | Recurso | 2 | 3 | 6 | 🔴 | Documentación continua, código comentado y conocimiento compartido | Reasignación según RACI y uso de la franja del sábado | Alan |
| **R-05** | La UAT no consigue usuarios reales (comedor o comercio) | Externo | 2 | 2 | 4 | 🟠 | Contacto con organizaciones desde el D3; alternativa con conocidos del entorno | UAT con usuarios simulados y guion documentado | Alan |
| **R-06** | Cambios de alcance o pedidos nuevos durante el desarrollo | Alcance | 2 | 2 | 4 | 🟠 | Línea base congelada; cambios solo por decisión del líder y con recorte equivalente | Registrar la solicitud en el backlog posterior y no ejecutarla | Alan |
| **R-07** | Problemas de rendimiento en dispositivos de gama baja | Técnico | 2 | 2 | 4 | 🟠 | Paginación, compresión de imágenes y caché desde el inicio | Reducir el tamaño de las imágenes y simplificar animaciones | Frank |
| **R-08** | Configuración incorrecta de RLS que expone datos entre usuarios | Seguridad | 1 | 3 | 3 | 🟠 | Revisión cruzada de políticas; prueba de acceso con dos roles distintos | Deshabilitar el acceso público y operar en modo cerrado hasta corregir | Vladimir |
| **R-09** | Límites del plan gratuito de Supabase o Expo EAS | Infraestructura | 2 | 1 | 2 | 🟢 | Uso racional de Storage; limpieza de datos de prueba; builds programados | Migrar a otro proveedor gratuito o reducir la frecuencia de builds | Vladimir |
| **R-10** | Permisos de ubicación o cámara denegados en el dispositivo de prueba | Técnico | 2 | 2 | 4 | 🟠 | Flujos alternativos sin permisos (dirección manual, ingreso de PIN) | Uso de un dispositivo secundario para la demo | Frank |
| **R-11** | La documentación se deja para el final y queda incompleta | Proceso | 3 | 2 | 6 | 🔴 | Cada tarea incluye su actualización documental en la DoD; actas al cierre de cada sprint | Congelar el día 10 para documentación y usar el video como respaldo | Alan |
| **R-12** | Fallo en el build final (APK/AAB) por problemas de firma o dependencias | Entrega | 1 | 3 | 3 | 🟠 | Probar un build de prueba el D5 y otro el D9, no solo el D10 | Presentar con Expo Go y el repositorio como respaldo | Vladimir |

---

## 3. Matriz de exposición

| | Impacto bajo (1) | Impacto medio (2) | Impacto alto (3) |
|---|---|---|---|
| **Prob. alta (3)** | — | R-01, R-03, R-11 | — |
| **Prob. media (2)** | R-09 | R-05, R-06, R-07, R-10 | R-02, R-04 |
| **Prob. baja (1)** | — | — | R-08, R-12 |

**Riesgos críticos activos:** R-01, R-02, R-03, R-04 y R-11. Se revisan todos los días en el stand-up con una pregunta directa: *¿alguna de estas cinco sigue activa y sin acción?*

---

## 4. Supuestos del proyecto

| ID | Supuesto | Validación | Impacto si falla |
|---|---|---|---|
| SU-01 | Cada integrante dispone de ~6 h efectivas diarias | Seguimiento diario del avance | Replanificación y recorte de alcance |
| SU-02 | Los integrantes tienen equipo con Node.js ≥ 20 y npm ≥ 10 | Verificado el 21/10/2026 (Node 26.5.0 / npm 11.17.0) | Bloqueo del entorno de desarrollo |
| SU-03 | Existe al menos un Android físico para pruebas | Verificado el 21/10/2026 | Pruebas solo en emulador; se pierde validación real |
| SU-04 | El uso de Supabase en plan gratuito es aceptable para el curso | Consulta al docente el D1 | Migración a backend propio (+1 a 2 días) |
| SU-05 | Los donantes y comedores tienen smartphone con datos | Entrevistas informales | Se refuerza el modo offline |
| SU-06 | La conectividad en los puntos de recojo es intermitente, no nula | Observación en campo | Se prioriza la cola de sincronización |
| SU-07 | El equipo puede coordinar 4 horas diarias en la franja 18:00–22:00 | Acuerdo del 21/10/2026 | Trabajo asíncrono y mayor riesgo de integración |

---

## 5. Registro de problemas (issue log)

Se completa durante la ejecución. Plantilla:

| ID | Fecha | Problema | Impacto | Acción tomada | Responsable | Estado |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |

---

## 6. Lecciones aprendidas (a completar en el cierre)

| ID | Situación | Qué funcionó | Qué mejoraríamos |
|---|---|---|---|
| — | — | — | — |

---

## 7. Control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 21/10/2026 | Registro inicial de 8 riesgos |
| 0.2 | 21/10/2026 | Incorporación de riesgos de documentación y build (R-11, R-12) |
| 1.0 | 21/10/2026 | Matriz de exposición, supuestos validados y responsables asignados |
