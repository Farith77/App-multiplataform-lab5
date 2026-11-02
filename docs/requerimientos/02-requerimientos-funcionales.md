# 02 · Requerimientos funcionales

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026
**Total:** 32 requerimientos funcionales · 8 módulos · Prioridad MoSCoW

---

## Resumen por módulo

| Módulo | Nombre | RF | Must | Should | Could |
|---|---|---|---|---|---|
| M1 | Cuenta, autenticación y perfiles | RF-01 – RF-05 | 4 | 1 | 0 |
| M2 | Publicación y gestión de donaciones | RF-06 – RF-12 | 5 | 2 | 0 |
| M3 | Geolocalización y descubrimiento | RF-13 – RF-14 | 2 | 0 | 0 |
| M4 | Reservas y logística de recojo | RF-15 – RF-20 | 6 | 0 | 0 |
| M5 | Notificaciones y comunicación | RF-21 – RF-23 | 1 | 1 | 1 |
| M6 | Impacto social y reputación | RF-24 – RF-27 | 2 | 2 | 0 |
| M7 | Administración y moderación | RF-28 – RF-30 | 1 | 2 | 0 |
| M8 | Resiliencia y modo offline | RF-31 – RF-32 | 0 | 2 | 0 |
| | **Total** | **32** | **21** | **10** | **1** |

**Leyenda de sprint:** S1 = 22–26 oct · S2 = 27–30 oct · S3 = 31 oct (cierre) · *Backlog* = posterior a la entrega.

---

## M1 · Cuenta, autenticación y perfiles

| ID | Requerimiento | Descripción | Actor | Prioridad | Sprint | Criterio de aceptación (resumen) |
|---|---|---|---|---|---|---|
| **RF-01** | Registro de usuario | El usuario se registra con correo y contraseña o con su cuenta de Google. Se solicitan nombre, correo, teléfono y contraseña (mínimo 8 caracteres, una letra y un número). | Todos | Must | S1 | Un correo no registrado crea la cuenta y deja la sesión iniciada; un correo duplicado muestra error claro y no crea registros; la contraseña débil se rechaza con mensaje específico. |
| **RF-02** | Inicio y cierre de sesión, recuperación de contraseña | El usuario inicia sesión con sus credenciales, cierra sesión y puede restablecer su contraseña por correo. | Todos | Must | S1 | La sesión persiste tras cerrar la app; "Cerrar sesión" limpia el token y regresa al login; el enlace de recuperación llega al correo y permite definir una nueva contraseña. |
| **RF-03** | Selección de rol y datos de organización | Tras registrarse, el usuario elige su rol (donante, beneficiario o voluntario) y, si aplica, registra el nombre, tipo y dirección de su organización. | Todos | Must | S1 | El rol se guarda y condiciona la navegación; no es posible completar el flujo sin rol asignado; los campos de organización son obligatorios para donante y beneficiario. |
| **RF-04** | Verificación de organización beneficiaria | El administrador revisa y aprueba las organizaciones beneficiarias antes de que puedan reservar donaciones. | Administrador | Should | S2 | Una organización en estado *pendiente* no puede reservar; al aprobarla recibe notificación y puede reservar; el estado queda registrado con fecha y responsable. |
| **RF-05** | Edición de perfil | El usuario edita nombre, foto, teléfono, dirección y datos de su organización; la foto se sube desde cámara o galería. | Todos | Must | S1 | Los cambios se reflejan de inmediato en la app y persisten tras reiniciar; la foto se comprime a ≤ 300 KB; se validan tipos y tamaño de archivo. |

**Reglas de negocio asociadas:** RN-01.

---

## M2 · Publicación y gestión de donaciones

| ID | Requerimiento | Descripción | Actor | Prioridad | Sprint | Criterio de aceptación (resumen) |
|---|---|---|---|---|---|---|
| **RF-06** | Publicar donación | El donante publica un excedente indicando título, categoría, descripción, cantidad con unidad, caducidad y punto de recojo. | Donante | Must | S1 | La donación aparece en el listado y en el mapa dentro de los 5 s posteriores al guardado; los campos obligatorios vacíos bloquean el envío con mensajes por campo. |
| **RF-07** | Adjuntar fotografías | El donante adjunta entre 1 y 3 fotos del alimento desde la cámara o la galería. | Donante | Must | S1 | Se permite máximo 3 imágenes; cada imagen se comprime y se sube a Storage; la publicación muestra miniaturas y permite reemplazarlas. |
| **RF-08** | Ventana de recojo y ubicación | El donante define la dirección de recojo (con selección en mapa) y un rango horario de disponibilidad. | Donante | Must | S1 | La ubicación se confirma en el mapa y se guarda con latitud/longitud; la ventana de recojo se valida contra la caducidad (la ventana debe cerrar antes o en la caducidad). |
| **RF-09** | Editar y retirar publicación | El donante puede modificar una publicación mientras esté *publicada* y retirarla en cualquier momento antes de la reserva. | Donante | Must | S1 | La edición se refleja en el listado; el retiro cambia el estado a *cancelada* con motivo y deja de ser visible para los beneficiarios. |
| **RF-10** | Caducidad automática | Las publicaciones cuya caducidad venció se ocultan del listado y se marcan como *expiradas* automáticamente. | Sistema | Should | S2 | Una publicación con caducidad pasada no aparece en búsquedas ni en el mapa; el donante ve el estado *expirada* en su historial. |
| **RF-11** | Listado de donaciones disponibles | El beneficiario y el voluntario ven un listado de donaciones disponibles con foto, distancia y tiempo restante de caducidad. | Beneficiario / Voluntario | Must | S1 | El listado muestra solo donaciones vigentes; cada tarjeta indica categoría, cantidad, distancia y horas restantes; se actualiza al deslizar hacia abajo. |
| **RF-12** | Filtros, orden y búsqueda | El usuario filtra por categoría, radio de distancia y caducidad, ordena por cercanía o urgencia y busca por texto. | Beneficiario / Voluntario | Should | S1 | Un filtro aplicado reduce el conjunto de resultados de forma verificable; se muestran los filtros activos y se pueden limpiar en una acción; la búsqueda tolera tildes y mayúsculas. |

**Reglas de negocio asociadas:** RN-03.

---

## M3 · Geolocalización y descubrimiento

| ID | Requerimiento | Descripción | Actor | Prioridad | Sprint | Criterio de aceptación (resumen) |
|---|---|---|---|---|---|---|
| **RF-13** | Ubicación del usuario y del punto de recojo | La app solicita permiso de ubicación, centra el mapa en el usuario y permite ajustar el marcador del punto de recojo; obtiene la dirección aproximada (geocodificación inversa). | Todos | Must | S1 | Si se niega el permiso, la app sigue funcionando y permite elegir la zona manualmente; el marcador ajustado devuelve una dirección legible; la ubicación del usuario nunca se comparte con otros usuarios. |
| **RF-14** | Mapa de donaciones cercanas | El beneficiario visualiza las donaciones disponibles como marcadores en un mapa, con distancia y tiempo estimado de traslado. | Beneficiario | Must | S1 | Los marcadores corresponden a las donaciones del listado filtrado; al tocar un marcador se abre el detalle; la distancia se calcula en línea recta y se redondea a 0,1 km. |

**Reglas de negocio asociadas:** RN-10.

---

## M4 · Reservas y logística de recojo

| ID | Requerimiento | Descripción | Actor | Prioridad | Sprint | Criterio de aceptación (resumen) |
|---|---|---|---|---|---|---|
| **RF-15** | Solicitar una donación | El beneficiario verificado reserva una donación indicando cantidad requerida, número de beneficiarios y hora estimada de recojo. | Beneficiario | Must | S1 → S2 | La reserva se crea en estado *pendiente* y bloquea la publicación para otros beneficiarios; un usuario no verificado recibe el mensaje de que su cuenta está en revisión. |
| **RF-16** | Aceptar o rechazar solicitudes | El donante ve las solicitudes recibidas y puede aceptar una o rechazarla indicando motivo. | Donante | Must | S2 | Al aceptar, la donación pasa a *reservada* y se notifica al beneficiario; al rechazar, la publicación vuelve a estar disponible y el beneficiario recibe el motivo. |
| **RF-17** | Cancelar reserva | El beneficiario o el donante cancelan una reserva indicando un motivo; la publicación se libera si aún está vigente. | Donante / Beneficiario | Must | S2 | La cancelación queda en el historial con autor, motivo y fecha; la donación vuelve a *publicada* si no expiró; ambas partes reciben notificación. |
| **RF-18** | Máquina de estados de la donación | El sistema controla las transiciones `publicada → reservada → en_recojo → entregada → cerrada` y `cancelada` como salida lateral. | Sistema | Must | S2 | Una transición no permitida se rechaza en backend y en UI; cada cambio guarda fecha, usuario y estado anterior (auditoría). |
| **RF-19** | Asignación de voluntario | El beneficiario o el administrador asigna un voluntario disponible al recojo; el voluntario acepta o declina la asignación. | Beneficiario / Administrador | Must | S2 | El voluntario asignado ve la tarea con dirección y horario; si declina, la tarea vuelve a estar disponible; el historial registra la asignación. |
| **RF-20** | Confirmación de entrega | La entrega se confirma con un código QR/PIN de 6 dígitos que el beneficiario muestra y el voluntario o donante valida. | Voluntario / Beneficiario | Must | S2 | El código se genera al aceptar la reserva y caduca al cerrar la operación; sin código válido la donación no pasa a *entregada*; se permite adjuntar foto de evidencia. |

**Reglas de negocio asociadas:** RN-02, RN-04, RN-05, RN-06.

---

## M5 · Notificaciones y comunicación

| ID | Requerimiento | Descripción | Actor | Prioridad | Sprint | Criterio de aceptación (resumen) |
|---|---|---|---|---|---|---|
| **RF-21** | Notificaciones push de eventos | Se notifica al usuario cuando: recibe una solicitud, su solicitud es aceptada o rechazada, se le asigna un recojo y se confirma una entrega. | Sistema | Must | S2 | Cada evento genera una notificación en el dispositivo y un registro en la bandeja interna; al tocar la notificación se abre la pantalla correspondiente. |
| **RF-22** | Recordatorios operativos | Se envían recordatorios antes del cierre de la ventana de recojo y avisos de caducidad próxima al donante. | Sistema | Should | S2 | Se envía un recordatorio 60 minutos antes del cierre de ventana; el aviso de caducidad se envía 3 horas antes; no se duplican recordatorios ya enviados. |
| **RF-23** | Mensajería entre partes | Donante y beneficiario intercambian mensajes de texto dentro de una reserva activa. | Donante / Beneficiario | Could | Backlog | *No incluido en el MVP.* Si se implementa: los mensajes quedan asociados a la reserva y se notifican en la app; no se comparten teléfonos personales. |

---

## M6 · Impacto social y reputación

| ID | Requerimiento | Descripción | Actor | Prioridad | Sprint | Criterio de aceptación (resumen) |
|---|---|---|---|---|---|---|
| **RF-24** | Panel de impacto social | El usuario ve sus métricas acumuladas: kilogramos rescatados, porciones habilitadas, donaciones completadas y CO₂ evitado estimado. | Todos | Must | S2 | Las métricas se actualizan al cerrar una donación; el cálculo es reproducible a partir de los registros históricos; se muestran totales personales y de la red. |
| **RF-25** | Reporte mensual exportable | El usuario descarga un resumen mensual de su actividad en PDF o CSV. | Donante / Administrador | Should | S2 | El archivo generado incluye periodo, totales y detalle de donaciones; el PDF abre correctamente en el dispositivo. |
| **RF-26** | Historial de operaciones | El usuario consulta el historial de donaciones, reservas y recojos con su estado final. | Todos | Must | S2 | El historial muestra fecha, contraparte, cantidad, estado y permite filtrar por estado y periodo; los registros cancelados también aparecen. |
| **RF-27** | Valoraciones mutuas | Al cerrar una donación, las partes se califican de 1 a 5 estrellas con un comentario opcional. | Donante / Beneficiario | Should | S2 | Solo se puede valorar una operación cerrada y una vez; el promedio se muestra en el perfil; un comentario ofensivo puede reportarse. |

**Reglas de negocio asociadas:** RN-07, RN-09.

---

## M7 · Administración y moderación

| ID | Requerimiento | Descripción | Actor | Prioridad | Sprint | Criterio de aceptación (resumen) |
|---|---|---|---|---|---|---|
| **RF-28** | Panel de administración | El administrador consulta usuarios, organizaciones, publicaciones y reservas, y puede filtrar por estado. | Administrador | Should | S2 | El panel lista y filtra registros; permite ver el detalle de cualquier operación; el acceso está restringido al rol administrador. |
| **RF-29** | Reporte de contenido | Cualquier usuario reporta una publicación, un comentario o a otro usuario indicando el motivo. | Todos | Must | S2 | El reporte queda registrado con autor, motivo y evidencia; el usuario ve confirmación; no se permite reportar dos veces el mismo objeto por el mismo usuario. |
| **RF-30** | Moderación y bloqueo | El administrador revisa reportes, oculta publicaciones y suspende cuentas; toda acción queda en bitácora. | Administrador | Should | S2 | Al ocultar una publicación deja de ser visible de inmediato; una cuenta suspendida no puede iniciar sesión y ve el motivo; la bitácora registra quién, qué y cuándo. |

**Reglas de negocio asociadas:** RN-08.

---

## M8 · Resiliencia y modo offline

| ID | Requerimiento | Descripción | Actor | Prioridad | Sprint | Criterio de aceptación (resumen) |
|---|---|---|---|---|---|---|
| **RF-31** | Consulta sin conexión | El usuario consulta las últimas donaciones, reservas e historial cargados aunque no tenga conexión. | Todos | Should | S2 | Sin red se muestra el último conjunto de datos con un aviso de "datos sin actualizar" y la hora de la última sincronización. |
| **RF-32** | Cola de sincronización | Las acciones realizadas sin conexión (publicar, reservar, confirmar) se encolan y se envían automáticamente al recuperar la red. | Todos | Should | S2 | Al reconectar, la cola se procesa en orden y sin duplicados; si una acción falla por conflicto, el usuario recibe aviso y puede reintentar o descartar. |

**Reglas de negocio asociadas:** RN-03 (revalidación de caducidad al sincronizar).

---

## Criterios de aceptación globales del producto

Un requerimiento se considera aceptado cuando, además de cumplir su criterio específico:

1. Funciona en un dispositivo Android físico con la versión de build entregada.
2. No genera errores no controlados ni cierres inesperados en el flujo principal.
3. Respeta los permisos del rol autenticado (validado también en backend, no solo en la interfaz).
4. Tiene al menos un caso de prueba asociado en la matriz de trazabilidad.
5. Cumple los RNF aplicables de rendimiento, accesibilidad y seguridad.

## Control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 21/10/2026 | Estructura inicial de módulos y RF-01 a RF-20 |
| 0.2 | 21/10/2026 | Incorporación de RF-21 a RF-32 y priorización MoSCoW |
| 1.0 | 21/10/2026 | Línea base aprobada; RF-23 reclasificado a *Could* y movido al backlog post-entrega |
