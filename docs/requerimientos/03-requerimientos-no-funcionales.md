# 03 · Requerimientos no funcionales

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026
**Total:** 14 requerimientos no funcionales · 8 categorías de atributos de calidad

---

## 1. Resumen

| ID | Categoría | Requerimiento | Métrica / umbral | Prioridad |
|---|---|---|---|---|
| RNF-01 | Usabilidad | Flujo de publicación simple y guiado | ≤ 60 s y ≤ 4 pantallas para publicar | Must |
| RNF-02 | Rendimiento | Respuesta ágil en gama media y red móvil | Arranque en frío ≤ 4 s · listados ≤ 2 s | Must |
| RNF-03 | Compatibilidad | Cobertura de dispositivos y plataformas | Android 8.0+ · iOS 14+ · pantallas 5"–6.7" | Must |
| RNF-04 | Seguridad | Autenticación, autorización y protección de datos | OWASP MASVS L1 · RLS activo en 100 % de tablas | Must |
| RNF-05 | Disponibilidad | Servicio disponible y despliegue reproducible | ≥ 99 % mensual · rollback < 15 min | Should |
| RNF-06 | Calidad | Pruebas automatizadas y control de defectos | Cobertura ≥ 60 % · 0 defectos críticos | Must |
| RNF-07 | Mantenibilidad | Código legible, tipado y modular | TypeScript estricto · 0 errores de lint | Must |
| RNF-08 | Escalabilidad | Soportar el crecimiento del piloto | 500 usuarios concurrentes · degradación < 20 % | Should |
| RNF-09 | Accesibilidad | Uso por personas con capacidades diversas | Contraste ≥ 4.5:1 · área táctil ≥ 44 px | Should |
| RNF-10 | Localización | Idioma y formatos locales | es-PE · fechas y distancias locales | Should |
| RNF-11 | Privacidad | Cumplimiento de la Ley N.° 29733 | Consentimiento explícito · ubicación aproximada | Must |
| RNF-12 | Resiliencia | Operación con conectividad intermitente | Sin pérdida de datos ante corte de red | Should |
| RNF-13 | Eficiencia de recursos | Bajo consumo de almacenamiento, datos y batería | APK ≤ 60 MB · < 5 % batería por hora | Should |
| RNF-14 | Auditabilidad | Trazabilidad de operaciones y acciones administrativas | 100 % de cambios de estado registrados | Must |

---

## 2. Especificación detallada

### RNF-01 · Usabilidad

| Campo | Detalle |
|---|---|
| **Descripción** | La aplicación debe permitir completar las tareas principales sin capacitación previa. Los formularios usan etiquetas visibles, validación en línea y mensajes de error accionables en español. |
| **Métrica** | (a) Publicar una donación: ≤ 60 segundos y ≤ 4 pantallas desde el inicio de sesión. (b) Reservar una donación: ≤ 3 toques desde el listado. (c) Tasa de éxito en la primera ejecución durante UAT ≥ 90 %. |
| **Verificación** | Cronometraje y observación directa con 5 usuarios en la sesión de UAT; registro en el acta de aceptación. |
| **Prioridad** | Must |
| **Riesgo si no se cumple** | Donantes y comedores abandonan el flujo; el MVP pierde su propósito. |

### RNF-02 · Rendimiento

| Campo | Detalle |
|---|---|
| **Descripción** | La app debe sentirse fluida en dispositivos de gama media (4 GB RAM) y con red 3G/4G. Se aplica carga diferida de imágenes, paginación del listado y caché de consultas. |
| **Métrica** | Arranque en frío ≤ 4 s · cambio de pantalla ≤ 300 ms · listado de 20 donaciones ≤ 2 s en 4G · imágenes ≤ 300 KB tras compresión · scroll a 60 fps sostenidos · primera consulta a la API ≤ 1,5 s (p95). |
| **Verificación** | Medición con React Native Performance Monitor y flipper; pruebas en dispositivo real de gama media; revisión del tamaño de imágenes en Storage. |
| **Prioridad** | Must |
| **Riesgo si no se cumple** | Percepción de app "lenta" y abandono en el momento crítico (donación con caducidad cercana). |

### RNF-03 · Compatibilidad

| Campo | Detalle |
|---|---|
| **Descripción** | Un solo código base debe ejecutarse en Android e iOS mediante React Native con Expo. La interfaz debe adaptarse a distintos tamaños y densidades de pantalla, incluidos notch y barras de navegación. |
| **Métrica** | Android 8.0 (API 26) o superior · iOS 14 o superior · soporte de pantallas de 5" a 6.7" en orientación vertical · sin desbordes de texto al 130 % de tamaño de fuente del sistema · Expo SDK 51+. |
| **Verificación** | Pruebas en al menos un Android físico y en un emulador iOS; revisión visual en 3 tamaños; prueba con fuente del sistema ampliada. |
| **Prioridad** | Must |
| **Riesgo si no se cumple** | Exclusión de usuarios con equipos de gama baja, que son justamente el público objetivo del voluntariado y de los comedores. |

### RNF-04 · Seguridad

| Campo | Detalle |
|---|---|
| **Descripción** | Toda comunicación viaja por HTTPS. La autorización se valida en el backend con políticas RLS por rol. Las contraseñas se almacenan con hash (bcrypt/argon2) y los tokens tienen expiración y renovación. No se versionan secretos en el repositorio. |
| **Métrica** | 100 % de tablas con RLS habilitado · token de acceso con expiración ≤ 1 h y refresh token ≤ 30 días · 0 secretos en el historial de Git · validación de entrada en el 100 % de endpoints de escritura · resistencia a los 10 riesgos del OWASP Mobile Top 10 (nivel MASVS L1). |
| **Verificación** | Revisión de políticas RLS en Supabase; prueba manual de acceso cruzado entre usuarios de distinto rol (debe fallar); escaneo de secretos con `git secrets`/Gitleaks; checklist OWASP. |
| **Prioridad** | Must |
| **Riesgo si no se cumple** | Exposición de datos personales de población vulnerable; incumplimiento legal; pérdida total de confianza. |

### RNF-05 · Disponibilidad y despliegue

| Campo | Detalle |
|---|---|
| **Descripción** | El backend gestionado debe estar disponible durante el periodo de evaluación. Los despliegues se realizan por canales (development, preview, production) con builds reproducibles mediante Expo EAS o scripts documentados. |
| **Métrica** | Disponibilidad ≥ 99 % mensual (excluyendo mantenimientos anunciados) · tiempo de despliegue ≤ 15 min · rollback documentado y probado en ≤ 15 min · entorno de staging siempre accesible para el equipo. |
| **Verificación** | Panel de estado de Supabase; bitácora de despliegues; prueba de rollback en staging. |
| **Prioridad** | Should |
| **Riesgo si no se cumple** | Imposibilidad de demostrar la app durante la sustentación. |

### RNF-06 · Calidad y pruebas

| Campo | Detalle |
|---|---|
| **Descripción** | La lógica de negocio debe estar cubierta por pruebas automatizadas y los flujos críticos por pruebas end-to-end. Todo defecto se registra con severidad y estado. |
| **Métrica** | Cobertura de líneas ≥ 60 % en `src/features` y `src/lib` · 5 flujos E2E automatizados (registro, publicar, reservar, recojo, cierre) · 0 defectos de severidad crítica o alta abiertos al cierre · 100 % de requerimientos *Must* con al menos un caso de prueba. |
| **Verificación** | Reporte de cobertura de Jest; ejecución de la suite E2E en CI; revisión del registro de defectos en el acta de cierre. |
| **Prioridad** | Must |
| **Riesgo si no se cumple** | Regresiones en la demostración final y pérdida de credibilidad técnica. |

### RNF-07 · Mantenibilidad

| Campo | Detalle |
|---|---|
| **Descripción** | Código organizado por *features*, con TypeScript en modo estricto, componentes reutilizables, separación entre UI y acceso a datos, y convenciones de nombres y commits documentadas. |
| **Métrica** | `strict: true` sin errores · 0 advertencias de ESLint en el build · ningún archivo de más de 400 líneas · componente reutilizable para cada patrón repetido ≥ 3 veces · README con guía de instalación reproducible en < 15 min. |
| **Verificación** | Pipeline de CI (typecheck + lint + tests); revisión de código cruzada antes de fusionar a `main`. |
| **Prioridad** | Must |
| **Riesgo si no se cumple** | Imposibilidad de que un integrante continúe el trabajo de otro; retrabajo en la segunda semana. |

### RNF-08 · Escalabilidad

| Campo | Detalle |
|---|---|
| **Descripción** | La arquitectura debe soportar el crecimiento del piloto sin cambios estructurales: consultas paginadas, índices en columnas de filtro (categoría, estado, fecha, ubicación) y almacenamiento de imágenes desacoplado. |
| **Métrica** | Sostener 500 usuarios concurrentes y 5 000 donaciones con degradación ≤ 20 % del tiempo de respuesta · paginación de 20 elementos por consulta · consultas del listado < 300 ms con índice. |
| **Verificación** | Prueba de carga con k6 o Artillery sobre staging con datos sintéticos (script documentado). |
| **Prioridad** | Should |
| **Riesgo si no se cumple** | El piloto con varias organizaciones se vuelve inusable y obliga a rediseñar. |

### RNF-09 · Accesibilidad

| Campo | Detalle |
|---|---|
| **Descripción** | La app debe ser usable por personas con baja visión, daltonismo o motricidad reducida, condición frecuente entre voluntarios y personal de comedores. |
| **Métrica** | Contraste de texto ≥ 4.5:1 (AA) · área táctil mínima 44×44 px · etiquetas `accessibilityLabel` en el 100 % de controles interactivos · información nunca transmitida solo por color · soporte de escalado de fuente del sistema hasta 130 % sin pérdida de contenido. |
| **Verificación** | Lista de verificación de accesibilidad; prueba con TalkBack en Android; inspección de contraste con herramienta automatizada. |
| **Prioridad** | Should |
| **Riesgo si no se cumple** | Exclusión de una parte del público objetivo; penalización en la rúbrica de calidad. |

### RNF-10 · Localización

| Campo | Detalle |
|---|---|
| **Descripción** | Todos los textos de interfaz se centralizan en archivos de traducción. Se usa español (Perú) por defecto, con formatos locales de fecha, hora y distancia. |
| **Métrica** | 0 textos codificados directamente en los componentes · fechas en formato `dd/MM/yyyy` y horas en formato 24 h · distancias en km con coma decimal · estructura i18n preparada para una segunda lengua (quechua) sin refactorización. |
| **Verificación** | Búsqueda de cadenas literales en componentes; revisión de los archivos `locales/*.json`. |
| **Prioridad** | Should |
| **Riesgo si no se cumple** | Dificultad para extender la app a comunidades quechuahablantes en una fase posterior. |

### RNF-11 · Privacidad y cumplimiento legal

| Campo | Detalle |
|---|---|
| **Descripción** | Se aplica la Ley N.° 29733 (Protección de Datos Personales, Perú): consentimiento informado en el registro, finalidad declarada, minimización de datos, derecho de acceso y eliminación. La ubicación exacta de comedores y voluntarios no se expone públicamente. |
| **Métrica** | Consentimiento explícito registrado con fecha y versión del aviso · ubicación mostrada con precisión aproximada (≈150 m) hasta que exista reserva aceptada · opción de eliminar cuenta y datos desde la app en ≤ 30 días · 0 datos sensibles en registros de log. |
| **Verificación** | Revisión del aviso de privacidad; prueba de eliminación de cuenta; inspección de logs y del payload de las respuestas de la API. |
| **Prioridad** | Must |
| **Riesgo si no se cumple** | Sanción legal y exposición de población vulnerable. |

### RNF-12 · Resiliencia y tolerancia a fallos

| Campo | Detalle |
|---|---|
| **Descripción** | La app no debe perder información capturada si la red falla. Las operaciones de escritura se reintentan con retroceso exponencial y las lecturas usan caché con marca de tiempo. |
| **Métrica** | 0 pérdida de datos del formulario ante corte de red · reintento automático hasta 3 veces con retroceso exponencial · recuperación de la sesión sin reautenticación tras reinicio de la app · la UI indica claramente el estado "sin conexión". |
| **Verificación** | Prueba manual en modo avión durante cada flujo de escritura; pruebas unitarias de la cola de sincronización. |
| **Prioridad** | Should |
| **Riesgo si no se cumple** | Pérdida de donaciones registradas en campo, donde la señal suele ser deficiente. |

### RNF-13 · Eficiencia de recursos

| Campo | Detalle |
|---|---|
| **Descripción** | La app debe ser liviana, porque se dirige a usuarios con planes de datos limitados y equipos de gama baja. |
| **Métrica** | APK/AAB ≤ 60 MB · consumo de batería < 5 % por hora de uso activo · tráfico de datos < 5 MB por sesión típica · uso de almacenamiento local < 50 MB. |
| **Verificación** | Medición del tamaño del build; monitoreo de batería y datos en Android (Estadísticas de uso); revisión del tamaño de la caché. |
| **Prioridad** | Should |
| **Riesgo si no se cumple** | Usuarios que desinstalan por consumo de datos o almacenamiento. |

### RNF-14 · Auditabilidad y trazabilidad

| Campo | Detalle |
|---|---|
| **Descripción** | Toda transición de estado de una donación y toda acción administrativa quedan registradas de forma inmutable con autor, fecha y valores anterior/nuevo. |
| **Métrica** | 100 % de cambios de estado con registro en tabla de auditoría · 100 % de acciones de moderación registradas · retención mínima de 6 meses para el piloto · imposibilidad de modificar o borrar registros de auditoría desde la app. |
| **Verificación** | Consulta directa a la tabla de auditoría tras ejecutar los flujos; prueba de que el cliente no puede alterar registros (RLS de solo inserción). |
| **Prioridad** | Must |
| **Riesgo si no se cumple** | Conflictos no resolubles entre donante y beneficiario; pérdida de credibilidad del sistema. |

---

## 3. Restricciones tecnológicas

| ID | Restricción | Justificación |
|---|---|---|
| RT-01 | El cliente móvil se desarrolla con **React Native + Expo + TypeScript**. | Framework multiplataforma exigido por el curso; un solo código para Android e iOS. |
| RT-02 | El entorno de desarrollo requiere **Node.js ≥ 20** y **npm ≥ 10**. | Requisito de Expo SDK 51+ (verificado: Node 26.5.0 / npm 11.17.0). |
| RT-03 | El backend se apoya en **Supabase** (PostgreSQL + Auth + Storage) en su plan gratuito. | Sin presupuesto de infraestructura; RLS cubre la seguridad por rol. |
| RT-04 | Las pruebas se ejecutan en **dispositivo Android físico** y emulador iOS. | El equipo no dispone de iPhone físico. |
| RT-05 | La entrega se realiza como **APK/AAB** firmado y repositorio Git con historial. | Requisito de evaluación del curso. |

---

## 4. Matriz de atributos de calidad (priorización)

| Atributo | Importancia | Dificultad | Decisión de diseño asociada |
|---|---|---|---|
| Seguridad y privacidad | Alta | Media | RLS + tokens + minimización de datos |
| Usabilidad | Alta | Media | Formularios guiados, ≤ 60 s para publicar |
| Rendimiento | Alta | Media | Paginación, compresión de imágenes, caché |
| Confiabilidad | Alta | Media | Máquina de estados + auditoría |
| Mantenibilidad | Media | Baja | TypeScript estricto + arquitectura por features |
| Escalabilidad | Media | Media | Índices y paginación desde el inicio |
| Accesibilidad | Media | Baja | Contraste, tamaños táctiles, etiquetas |
| Portabilidad | Media | Baja | Expo + componentes sin dependencias nativas frágiles |

---

## 5. Control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 21/10/2026 | Redacción inicial de RNF-01 a RNF-09 |
| 0.2 | 21/10/2026 | Incorporación de privacidad, resiliencia, eficiencia y auditoría (RNF-10 a RNF-14) |
| 1.0 | 21/10/2026 | Umbrales verificables acordados y línea base aprobada |
