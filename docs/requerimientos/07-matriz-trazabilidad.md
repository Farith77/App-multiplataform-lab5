# 07 · Matriz de trazabilidad

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026

---

## 1. Trazabilidad funcional (RF → HU → UC → Tarea → Prueba)

| RF | Requerimiento | HU | UC | Tarea(s) | Prueba | Sprint | Estado |
|---|---|---|---|---|---|---|---|
| RF-01 | Registro de usuario | HU-01 | UC-01 | T-07 | PR-01 | S1 | Pendiente |
| RF-02 | Sesión y recuperación de contraseña | HU-01 | UC-01 | T-07 | PR-02 | S1 | Pendiente |
| RF-03 | Rol y datos de organización | HU-02 | UC-01 | T-06, T-08 | PR-03 | S1 | Pendiente |
| RF-04 | Verificación de organización | HU-04 | UC-02 | T-23 | PR-04 | S2 | Pendiente |
| RF-05 | Edición de perfil y foto | HU-03 | — | T-09 | PR-05 | S1 | Pendiente |
| RF-06 | Publicar donación | HU-05 | UC-03 | T-10, T-11 | PR-06 | S1 | Pendiente |
| RF-07 | Adjuntar fotografías | HU-05 | UC-03 | T-11 | PR-07 | S1 | Pendiente |
| RF-08 | Ventana de recojo y ubicación | HU-06 | UC-03 | T-11, T-13 | PR-08 | S1 | Pendiente |
| RF-09 | Editar y retirar publicación | HU-07 | UC-03 | T-10 | PR-09 | S2 | Pendiente |
| RF-10 | Caducidad automática | HU-07 | — | T-10 | PR-10 | S2 | Pendiente |
| RF-11 | Listado de donaciones disponibles | HU-08 | UC-04 | T-12 | PR-11 | S1 | Pendiente |
| RF-12 | Filtros, orden y búsqueda | HU-08 | UC-04 | T-12 | PR-12 | S1 | Pendiente |
| RF-13 | Ubicación del usuario y punto de recojo | HU-06 | UC-03 | T-13 | PR-13 | S1 | Pendiente |
| RF-14 | Mapa de donaciones cercanas | HU-09 | UC-04 | T-13 | PR-14 | S1 | Pendiente |
| RF-15 | Reservar donación | HU-10 | UC-05 | T-17, T-18 | PR-15 | S2 | Pendiente |
| RF-16 | Aceptar o rechazar solicitudes | HU-11 | UC-06 | T-17 | PR-16 | S2 | Pendiente |
| RF-17 | Cancelar reserva | HU-11 | UC-06 | T-17 | PR-17 | S2 | Pendiente |
| RF-18 | Máquina de estados | HU-12 | UC-06 | T-17, T-18 | PR-18 | S2 | Pendiente |
| RF-19 | Asignación de voluntario | HU-13 | UC-07 | T-19 | PR-19 | S2 | Pendiente |
| RF-20 | Confirmación de entrega con QR/PIN | HU-14 | UC-08 | T-19 | PR-20 | S2 | Pendiente |
| RF-21 | Notificaciones push | HU-15 | — | T-20 | PR-21 | S2 | Pendiente |
| RF-22 | Recordatorios operativos | HU-15 | — | T-20 | PR-22 | S2 | Pendiente |
| RF-23 | Mensajería entre partes | — | — | — | — | Backlog | **Fuera del MVP** |
| RF-24 | Panel de impacto social | HU-16 | UC-09 | T-21 | PR-24 | S2 | Pendiente |
| RF-25 | Reporte mensual exportable | HU-16 | UC-09 | T-21 | PR-25 | S2 | Pendiente |
| RF-26 | Historial de operaciones | HU-17 | UC-09 | T-22 | PR-26 | S2 | Pendiente |
| RF-27 | Valoraciones mutuas | HU-17 | UC-10 | T-22 | PR-27 | S2 | Pendiente |
| RF-28 | Panel de administración | HU-19 | UC-11 | T-23 | PR-28 | S2 | Pendiente |
| RF-29 | Reporte de contenido | HU-18 | UC-11 | T-23 | PR-29 | S2 | Pendiente |
| RF-30 | Moderación y bloqueo | HU-18 | UC-11 | T-23 | PR-30 | S2 | Pendiente |
| RF-31 | Consulta sin conexión | HU-20 | UC-12 | T-24 | PR-31 | S2 | Pendiente |
| RF-32 | Cola de sincronización | HU-20 | UC-12 | T-24 | PR-32 | S2 | Pendiente |

**Cobertura funcional:** 31 de 32 RF con historia, caso de uso, tarea y prueba asignadas (96,9 %). El RF-23 está deliberadamente fuera del MVP por priorización `Could`.

## 2. Trazabilidad inversa (HU → RF)

| HU | RF cubiertos | Puntos | Sprint |
|---|---|---|---|
| HU-01 | RF-01, RF-02 | 5 | S1 |
| HU-02 | RF-03 | 3 | S1 |
| HU-03 | RF-05 | 3 | S1 |
| HU-04 | RF-04 | 5 | S2 |
| HU-05 | RF-06, RF-07 | 8 | S1 |
| HU-06 | RF-08, RF-13 | 5 | S1 |
| HU-07 | RF-09, RF-10 | 3 | S2 |
| HU-08 | RF-11, RF-12 | 5 | S1 |
| HU-09 | RF-14 | 8 | S1 |
| HU-10 | RF-15, RF-18 | 8 | S2 |
| HU-11 | RF-16, RF-17 | 5 | S2 |
| HU-12 | RF-18 | 5 | S2 |
| HU-13 | RF-19 | 8 | S2 |
| HU-14 | RF-20 | 8 | S2 |
| HU-15 | RF-21, RF-22 | 5 | S2 |
| HU-16 | RF-24, RF-25 | 8 | S2 |
| HU-17 | RF-26, RF-27 | 5 | S2 |
| HU-18 | RF-29, RF-30 | 5 | S2 |
| HU-19 | RF-28 | 5 | S2 |
| HU-20 | RF-31, RF-32 | 8 | S2 |

> RF-18 aparece en HU-10 y HU-12 porque la máquina de estados se valida tanto al reservar como al hacer seguimiento.

## 3. Trazabilidad de requerimientos no funcionales

| RNF | Atributo | Tarea(s) que lo aseguran | Evidencia de verificación | Sprint |
|---|---|---|---|---|
| RNF-01 | Usabilidad | T-04, T-11, T-29 | Cronometraje en UAT (acta) | S0, S1, S3 |
| RNF-02 | Rendimiento | T-10, T-12, T-13 | Medición en dispositivo real; tamaño de imágenes | S1 |
| RNF-03 | Compatibilidad | T-05, T-25, T-30 | Pruebas en Android físico y emulador iOS | S0, S2, S3 |
| RNF-04 | Seguridad | T-06, T-27 | Checklist OWASP + prueba de acceso cruzado | S1, S2 |
| RNF-05 | Disponibilidad | T-16, T-31 | Bitácora de despliegues y prueba de rollback | S1, S3 |
| RNF-06 | Calidad | T-14, T-26, T-29 | Reporte de cobertura y registro de defectos | S1, S2, S3 |
| RNF-07 | Mantenibilidad | T-02, T-05, T-28 | CI en verde + revisión de código | S0, S2 |
| RNF-08 | Escalabilidad | T-03, T-10, T-28 | Prueba de carga con k6 en staging | S2 |
| RNF-09 | Accesibilidad | T-04, T-25 | Checklist de accesibilidad + TalkBack | S0, S2 |
| RNF-10 | Localización | T-25 | Revisión de archivos de idioma | S2 |
| RNF-11 | Privacidad | T-06, T-09, T-25 | Aviso de privacidad + prueba de eliminación de cuenta | S1, S2 |
| RNF-12 | Resiliencia | T-24 | Prueba en modo avión por flujo | S2 |
| RNF-13 | Eficiencia de recursos | T-05, T-11, T-31 | Tamaño de APK y monitoreo de batería/datos | S0, S3 |
| RNF-14 | Auditabilidad | T-17, T-23, T-27 | Consulta a tabla `auditoria` | S2 |

## 4. Plan de pruebas (PR)

| ID | Caso de prueba | Tipo | Requerimiento | Resultado esperado |
|---|---|---|---|---|
| PR-01 | Registro con correo nuevo y con correo duplicado | Integración | RF-01 | Crea cuenta / muestra error sin duplicar |
| PR-02 | Persistencia de sesión y cierre | Integración | RF-02 | Sesión persiste y se limpia al cerrar |
| PR-03 | Asignación de rol y campos de organización | Unitaria | RF-03 | Rol obligatorio y coherente con la navegación |
| PR-04 | Reserva bloqueada por organización pendiente | Integración | RF-04 | Se rechaza la reserva |
| PR-05 | Compresión y validación de imagen de perfil | Unitaria | RF-05 | Archivo ≤ 300 KB y tipo validado |
| PR-06 | Publicación con campos completos e incompletos | E2E | RF-06 | Publica / bloquea con mensajes por campo |
| PR-07 | Límite de 3 fotografías | Unitaria | RF-07 | La cuarta se rechaza |
| PR-08 | Ventana de recojo posterior a la caducidad | Unitaria | RF-08 | Se rechaza o se corrige |
| PR-09 | Retiro de publicación | E2E | RF-09 | Estado `cancelada` y oculto del listado |
| PR-10 | Job de caducidad | Integración | RF-10 | Publicación vencida no aparece |
| PR-11 | Listado con datos vigentes | E2E | RF-11 | Solo donaciones vigentes con metadatos |
| PR-12 | Filtros combinados y limpieza | Integración | RF-12 | Resultados coherentes |
| PR-13 | Permiso de ubicación denegado | Manual | RF-13 | La app sigue operativa |
| PR-14 | Coherencia entre mapa y listado filtrado | E2E | RF-14 | Mismos elementos en ambos |
| PR-15 | Reserva exitosa y reserva sobre donación tomada | E2E | RF-15 | Una sola reserva activa |
| PR-16 | Aceptar y rechazar solicitudes | Integración | RF-16 | Estados y notificaciones correctos |
| PR-17 | Cancelación por ambas partes | Integración | RF-17 | Libera publicación y audita |
| PR-18 | Transiciones inválidas de estado | Unitaria | RF-18 | Rechazo en backend y UI |
| PR-19 | Asignación y declinación de voluntario | Integración | RF-19 | Reasignación disponible |
| PR-20 | Confirmación con QR válido, inválido y bloqueo | E2E | RF-20 | Estados y bloqueo tras 3 fallos |
| PR-21 | Recepción de notificación y navegación | Manual | RF-21 | Abre la pantalla correcta |
| PR-22 | Recordatorio único de cierre de ventana | Integración | RF-22 | No se duplica |
| PR-24 | Actualización de métricas tras cierre | Unitaria | RF-24 | kg, porciones y CO₂ coherentes |
| PR-25 | Generación de PDF mensual | Integración | RF-25 | Archivo válido y legible |
| PR-26 | Historial filtrado por estado y periodo | Integración | RF-26 | Resultados correctos |
| PR-27 | Valoración única por operación cerrada | Unitaria | RF-27 | Se impide duplicado |
| PR-28 | Acceso al panel de administración | Seguridad | RF-28 | Denegado a roles no admin |
| PR-29 | Reporte y reporte duplicado | Integración | RF-29 | Registro único por usuario/objeto |
| PR-30 | Ocultamiento automático tras 3 reportes | Integración | RF-30 | Publicación oculta |
| PR-31 | Consulta con caché sin red | Manual | RF-31 | Datos con aviso de antigüedad |
| PR-32 | Cola de sincronización y conflicto | Integración | RF-32 | Orden, sin duplicados, aviso de conflicto |

**Distribución:** 10 unitarias · 14 de integración · 6 end-to-end · 2 manuales.

## 5. Reglas de negocio → verificaciones

| Regla | Verificada en |
|---|---|
| RN-01 Rol único por usuario | PR-03 |
| RN-02 Solo beneficiarios verificados reservan | PR-04 |
| RN-03 No se publica/reserva alimento vencido | PR-06, PR-10, PR-15 |
| RN-04 Una reserva activa por donación | PR-15 |
| RN-05 Transiciones válidas | PR-18 |
| RN-06 Confirmación por QR/PIN | PR-20 |
| RN-07 Impacto al cerrar donación | PR-24 |
| RN-08 Ocultamiento tras 3 reportes | PR-30 |
| RN-09 Valoración única | PR-27 |
| RN-10 Ubicación aproximada | PR-04, PR-31 |

## 6. Resumen de cobertura

| Dimensión | Total | Cubiertos | % |
|---|---|---|---|
| Requerimientos funcionales | 32 | 31 | 96,9 % |
| Requerimientos no funcionales | 14 | 14 | 100 % |
| Reglas de negocio | 10 | 10 | 100 % |
| Historias de usuario | 20 | 20 | 100 % |

## 7. Control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 21/10/2026 | Matriz inicial RF → HU |
| 0.2 | 21/10/2026 | Incorporación de tareas y plan de pruebas |
| 1.0 | 21/10/2026 | Trazabilidad de RNF y reglas de negocio; línea base aprobada |
