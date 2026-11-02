# 05 · Historias de usuario

**Proyecto:** RedSolidaria · **Versión:** 1.0 · **Fecha:** 21/10/2026
**Total:** 20 historias · 115 puntos de historia · 4 sprints

---

## 1. Convenciones

- **Prioridad MoSCoW:** Must / Should / Could.
- **Puntos:** escala Fibonacci (1, 2, 3, 5, 8, 13), calibrada por el equipo el 21/10/2026.
- **Estimación de referencia:** 1 punto ≈ 1,5 h de trabajo efectivo del equipo.
- **Criterios de aceptación:** formato Gherkin (`Dado / Cuando / Entonces`).
- Una historia se considera terminada solo si cumple la **Definición de Terminado (DoD)** del plan de trabajo.

## 2. Resumen del backlog

| Sprint | Historias | Puntos |
|---|---|---|
| S1 (22–26 oct) | HU-01 a HU-09 | 45 |
| S2 (27–30 oct) | HU-10 a HU-20 | 70 |
| **Total** | **20** | **115** |

---

## S1 · Núcleo del producto

### HU-01 · Registro e inicio de sesión
**Como** persona interesada en participar **quiero** crear una cuenta e iniciar sesión **para** acceder a la red según mi rol.

- **RF:** RF-01, RF-02 · **UC:** UC-01 · **Prioridad:** Must · **Puntos:** 5 · **Sprint:** S1

```gherkin
Escenario: Registro exitoso con correo
  Dado que no tengo una cuenta registrada
  Cuando ingreso nombre, correo válido, teléfono y una contraseña de al menos 8 caracteres
  Entonces la cuenta se crea y la sesión queda iniciada
  Y soy redirigido a la selección de rol

Escenario: Correo ya registrado
  Dado que ya existe una cuenta con el correo ingresado
  Cuando intento registrarme con ese correo
  Entonces veo el mensaje "Este correo ya tiene una cuenta"
  Y se me ofrece la opción de iniciar sesión

Escenario: Contraseña débil
  Dado que estoy en el formulario de registro
  Cuando ingreso una contraseña de menos de 8 caracteres
  Entonces el botón de registro permanece deshabilitado
  Y veo el requisito indicado junto al campo

Escenario: Sesión persistente
  Dado que inicié sesión correctamente
  Cuando cierro y vuelvo a abrir la aplicación
  Entonces continúo autenticado sin volver a ingresar credenciales
```

### HU-02 · Selección de rol y datos de organización
**Como** usuario nuevo **quiero** elegir mi rol y registrar mi organización **para** que la app me muestre solo lo que necesito.

- **RF:** RF-03 · **UC:** UC-01 · **Prioridad:** Must · **Puntos:** 3 · **Sprint:** S1

```gherkin
Escenario: Selección de rol Donante
  Dado que acabo de crear mi cuenta
  Cuando selecciono el rol "Donante" e ingreso el nombre y la dirección de mi negocio
  Entonces mi perfil queda asociado a esa organización
  Y la pantalla de inicio muestra la opción "Publicar donación"

Escenario: Bloqueo sin rol
  Dado que no he seleccionado un rol
  Cuando intento navegar a la sección de donaciones
  Entonces la app me redirige a la selección de rol
```

### HU-03 · Editar perfil y foto
**Como** usuario **quiero** actualizar mis datos y mi foto **para** que las demás partes me reconozcan.

- **RF:** RF-05 · **Prioridad:** Must · **Puntos:** 3 · **Sprint:** S1

```gherkin
Escenario: Actualización de foto de perfil
  Dado que estoy en la pantalla de perfil
  Cuando selecciono una imagen de mi galería
  Entonces la imagen se comprime a menos de 300 KB y se muestra como avatar
  Y el cambio persiste después de reiniciar la aplicación

Escenario: Archivo no válido
  Dado que intento subir un archivo que no es una imagen
  Cuando confirmo la selección
  Entonces veo el mensaje "Formato no admitido" y el avatar no cambia
```

### HU-04 · Verificación de organización beneficiaria
**Como** administrador **quiero** aprobar o rechazar organizaciones **para** evitar reservas de cuentas no verificadas.

- **RF:** RF-04 · **UC:** UC-02 · **Prioridad:** Should · **Puntos:** 5 · **Sprint:** S2

```gherkin
Escenario: Aprobación de una organización
  Dado que existe una organización en estado "pendiente"
  Cuando el administrador revisa sus datos y la aprueba
  Entonces el estado cambia a "aprobada" con fecha y responsable
  Y la organización recibe una notificación y puede reservar

Escenario: Reserva bloqueada por falta de verificación
  Dado que mi organización está en estado "pendiente"
  Cuando intento reservar una donación
  Entonces veo el mensaje "Tu organización está en revisión"
  Y no se crea ninguna reserva
```

### HU-05 · Publicar una donación
**Como** donante **quiero** publicar un excedente con fotos y cantidad **para** que un comedor pueda reservarlo antes de que se malogre.

- **RF:** RF-06, RF-07 · **UC:** UC-03 · **Prioridad:** Must · **Puntos:** 8 · **Sprint:** S1

```gherkin
Escenario: Publicación completa
  Dado que soy donante y tengo sesión iniciada
  Cuando completo título, categoría, cantidad, caducidad, al menos una foto y el punto de recojo
  Entonces la donación se guarda en estado "publicada"
  Y aparece en el listado y en el mapa en menos de 5 segundos

Escenario: Campos obligatorios incompletos
  Dado que estoy en el formulario de publicación
  Cuando intento publicar sin indicar la caducidad
  Entonces el envío se bloquea y el campo se marca con el mensaje correspondiente

Escenario: Límite de fotografías
  Dado que ya adjunté 3 fotografías
  Cuando intento agregar una cuarta
  Entonces la app informa que el máximo es 3
```

### HU-06 · Ubicación y ventana de recojo
**Como** donante **quiero** marcar en el mapa dónde y cuándo se recoge **para** que el voluntario llegue sin confusiones.

- **RF:** RF-08, RF-13 · **UC:** UC-03 · **Prioridad:** Must · **Puntos:** 5 · **Sprint:** S1

```gherkin
Escenario: Confirmación de punto de recojo
  Dado que estoy publicando una donación
  Cuando muevo el marcador sobre mi local
  Entonces la app muestra la dirección aproximada del punto
  Y guarda latitud y longitud al publicar

Escenario: Permiso de ubicación denegado
  Dado que rechacé el permiso de ubicación
  Cuando abro el mapa de selección
  Entonces puedo buscar la dirección manualmente y continuar con la publicación
```

### HU-07 · Editar, retirar y caducidad automática
**Como** donante **quiero** corregir o retirar una publicación y que las vencidas desaparezcan **para** no ofrecer alimentos no aptos.

- **RF:** RF-09, RF-10 · **Prioridad:** Must · **Puntos:** 3 · **Sprint:** S2

```gherkin
Escenario: Retiro de publicación
  Dado que mi donación está en estado "publicada"
  Cuando la retiro indicando un motivo
  Entonces cambia a "cancelada" y deja de ser visible para los beneficiarios

Escenario: Caducidad automática
  Dado que una donación superó su fecha y hora de caducidad
  Cuando un beneficiario actualiza el listado
  Entonces esa donación no aparece en los resultados
  Y el donante la ve en su historial como "expirada"
```

### HU-08 · Explorar donaciones disponibles
**Como** beneficiario **quiero** ver y filtrar las donaciones disponibles **para** elegir la más conveniente según distancia y urgencia.

- **RF:** RF-11, RF-12 · **UC:** UC-04 · **Prioridad:** Must · **Puntos:** 5 · **Sprint:** S1

```gherkin
Escenario: Listado con información relevante
  Dado que existen donaciones vigentes
  Cuando abro la pantalla de exploración
  Entonces veo tarjetas con foto, categoría, cantidad, distancia y tiempo restante de caducidad

Escenario: Filtro por categoría y radio
  Dado que estoy en el listado
  Cuando filtro por categoría "Panadería" y radio de 3 km
  Entonces solo veo donaciones que cumplen ambas condiciones
  Y puedo limpiar los filtros en una sola acción

Escenario: Búsqueda tolerante a tildes
  Dado que busco "pan"
  Cuando existen donaciones con la palabra "Pan"
  Entonces los resultados incluyen esas donaciones
```

### HU-09 · Ver donaciones en el mapa
**Como** beneficiario **quiero** ubicar las donaciones en un mapa **para** estimar el traslado antes de reservar.

- **RF:** RF-14 · **UC:** UC-04 · **Prioridad:** Must · **Puntos:** 8 · **Sprint:** S1

```gherkin
Escenario: Marcadores coherentes con el listado
  Dado que apliqué filtros en el listado
  Cuando abro la vista de mapa
  Entonces los marcadores corresponden exactamente a las donaciones filtradas

Escenario: Detalle desde el mapa
  Dado que estoy en la vista de mapa
  Cuando toco un marcador
  Entonces veo un resumen con foto, distancia y botón "Ver detalle"

Escenario: Distancia mostrada
  Dado que el punto de recojo está a 1,24 km de mi ubicación
  Cuando se muestra la distancia
  Entonces aparece como "1,2 km"
```

---

## S2 · Logística e impacto

### HU-10 · Reservar una donación
**Como** beneficiario **quiero** reservar una donación **para** asegurar los alimentos que mi comedor necesita.

- **RF:** RF-15, RF-18 · **UC:** UC-05 · **Prioridad:** Must · **Puntos:** 8 · **Sprint:** S2

```gherkin
Escenario: Reserva exitosa
  Dado que mi organización está aprobada y la donación está "publicada"
  Cuando indico la cantidad requerida y confirmo la reserva
  Entonces la reserva queda "pendiente"
  Y la donación pasa a "reservada" y se oculta para otros beneficiarios
  Y el donante recibe una notificación

Escenario: Donación ya reservada
  Dado que otra organización reservó la donación mientras yo la revisaba
  Cuando confirmo mi reserva
  Entonces veo el mensaje "Esta donación ya no está disponible"
  Y no se crea ningún registro

Escenario: Cantidad mayor a la disponible
  Dado que la donación ofrece 10 kg
  Cuando ingreso 15 kg como cantidad requerida
  Entonces el campo se limita a 10 kg
```

### HU-11 · Gestionar solicitudes recibidas
**Como** donante **quiero** aceptar o rechazar solicitudes **para** decidir a quién entrego mi excedente.

- **RF:** RF-16, RF-17 · **UC:** UC-06 · **Prioridad:** Must · **Puntos:** 5 · **Sprint:** S2

```gherkin
Escenario: Aceptación de solicitud
  Dado que recibí una solicitud para mi donación
  Cuando la acepto
  Entonces la donación pasa a "reservada" y el beneficiario es notificado

Escenario: Rechazo con motivo
  Dado que recibí una solicitud fuera de mi ventana de recojo
  Cuando la rechazo indicando "Fuera de horario"
  Entonces la publicación vuelve a estar disponible
  Y el beneficiario ve el motivo del rechazo

Escenario: Cancelación posterior
  Dado que existe una reserva aceptada
  Cuando cualquiera de las partes la cancela con un motivo
  Entonces el historial registra autor, motivo y fecha
  Y la donación vuelve a "publicada" si aún está vigente
```

### HU-12 · Seguimiento del estado de la donación
**Como** usuario **quiero** ver en qué estado está la donación **para** saber qué acción me corresponde.

- **RF:** RF-18 · **UC:** UC-06 · **Prioridad:** Must · **Puntos:** 5 · **Sprint:** S2

```gherkin
Escenario: Transición válida
  Dado que la donación está "reservada" y el voluntario inició el recojo
  Cuando se registra el cambio
  Entonces el estado pasa a "en_recojo" y ambas partes lo ven actualizado

Escenario: Transición inválida
  Dado que la donación está "entregada"
  Cuando intento cambiarla a "publicada"
  Entonces el backend rechaza la operación
  Y la app muestra "Acción no permitida en el estado actual"
```

### HU-13 · Asignar y ejecutar el recojo
**Como** beneficiario **quiero** asignar un voluntario **para** que la donación llegue a mi comedor.

- **RF:** RF-19 · **UC:** UC-07 · **Prioridad:** Must · **Puntos:** 8 · **Sprint:** S2

```gherkin
Escenario: Asignación de voluntario
  Dado que mi reserva fue aceptada
  Cuando selecciono un voluntario disponible y confirmo
  Entonces se crea la tarea con dirección, horario y destino
  Y el voluntario recibe la notificación

Escenario: Voluntario declina
  Dado que asigné un voluntario
  Cuando el voluntario declina la tarea
  Entonces la tarea vuelve a estar disponible y soy notificado para reasignar

Escenario: Inicio del recojo
  Dado que soy el voluntario asignado
  Cuando toco "Iniciar recojo"
  Entonces la donación pasa a "en_recojo" con la marca de tiempo
```

### HU-14 · Confirmar la entrega con QR/PIN
**Como** voluntario **quiero** validar un código al entregar **para** dejar constancia de que la donación llegó a destino.

- **RF:** RF-20 · **UC:** UC-08 · **Prioridad:** Must · **Puntos:** 8 · **Sprint:** S2

```gherkin
Escenario: Confirmación con QR válido
  Dado que la donación está "en_recojo"
  Cuando escaneo el QR del beneficiario
  Entonces la donación pasa a "entregada" y luego a "cerrada"
  Y se actualizan las métricas de impacto de ambas partes

Escenario: Código incorrecto
  Dado que ingreso un PIN que no corresponde a la reserva
  Cuando confirmo
  Entonces veo "Código incorrecto" y el número de intentos restantes

Escenario: Bloqueo por intentos
  Dado que fallé 3 veces el ingreso del código
  Cuando intento una cuarta vez
  Entonces el ingreso se bloquea por 10 minutos y se notifica al administrador
```

### HU-15 · Notificaciones y recordatorios
**Como** usuario **quiero** recibir avisos oportunos **para** no perder una donación o un recojo.

- **RF:** RF-21, RF-22 · **Prioridad:** Must · **Puntos:** 5 · **Sprint:** S2

```gherkin
Escenario: Notificación de solicitud recibida
  Dado que un beneficiario reservó mi donación
  Cuando se crea la reserva
  Entonces recibo una notificación push y un registro en la bandeja interna
  Y al tocarla se abre el detalle de la reserva

Escenario: Recordatorio de cierre de ventana
  Dado que la ventana de recojo cierra a las 18:00
  Cuando son las 17:00 y la donación no fue recogida
  Entonces recibo un recordatorio
  Y no se envía un segundo recordatorio para el mismo evento
```

### HU-16 · Panel de impacto y reporte mensual
**Como** donante **quiero** ver cuánto he aportado **para** demostrar y compartir mi contribución social.

- **RF:** RF-24, RF-25 · **UC:** UC-09 · **Prioridad:** Must · **Puntos:** 8 · **Sprint:** S2

```gherkin
Escenario: Actualización de métricas
  Dado que una donación de 8 kg fue cerrada
  Cuando abro el panel de impacto
  Entonces mis kilogramos rescatados aumentaron en 8
  Y se muestran las porciones habilitadas y el CO₂ evitado estimado

Escenario: Exportación de reporte
  Dado que tengo donaciones cerradas en el mes
  Cuando solicito el reporte mensual en PDF
  Entonces el archivo se genera con periodo, totales y detalle
  Y se abre correctamente en el dispositivo

Escenario: Usuario sin actividad
  Dado que no tengo donaciones cerradas
  Cuando abro el panel de impacto
  Entonces veo un estado vacío con una invitación a publicar mi primera donación
```

### HU-17 · Historial y valoraciones
**Como** usuario **quiero** revisar mis operaciones y calificar a mi contraparte **para** construir confianza en la red.

- **RF:** RF-26, RF-27 · **UC:** UC-09, UC-10 · **Prioridad:** Should · **Puntos:** 5 · **Sprint:** S2

```gherkin
Escenario: Historial filtrable
  Dado que tengo operaciones en distintos estados
  Cuando filtro el historial por "cerradas"
  Entonces solo veo esas operaciones con fecha, contraparte y cantidad

Escenario: Valoración única
  Dado que la donación está cerrada y aún no califiqué
  Cuando envío 5 estrellas con un comentario
  Entonces la valoración se registra y el promedio del perfil se actualiza
  Y no puedo volver a calificar la misma operación

Escenario: Valoración fuera de estado
  Dado que la donación sigue "en_recojo"
  Cuando intento calificar
  Entonces la opción no está disponible
```

### HU-18 · Reportar contenido y moderar
**Como** usuario **quiero** reportar publicaciones inapropiadas **para** mantener la confianza en la red.

- **RF:** RF-29, RF-30 · **UC:** UC-11 · **Prioridad:** Must · **Puntos:** 5 · **Sprint:** S2

```gherkin
Escenario: Reporte de publicación
  Dado que veo una publicación con alimentos en mal estado
  Cuando la reporto con el motivo "Alimento en mal estado"
  Entonces el reporte queda registrado y veo la confirmación

Escenario: Reporte duplicado
  Dado que ya reporté esa publicación
  Cuando intento reportarla de nuevo
  Entonces la app indica que ya existe un reporte mío para ese contenido

Escenario: Ocultamiento automático
  Dado que una publicación acumula 3 reportes confirmados
  Cuando se registra el tercero
  Entonces la publicación se oculta y queda en revisión del administrador
```

### HU-19 · Panel de administración
**Como** administrador **quiero** ver y gestionar usuarios, organizaciones y publicaciones **para** operar la red.

- **RF:** RF-28 · **UC:** UC-11 · **Prioridad:** Should · **Puntos:** 5 · **Sprint:** S2

```gherkin
Escenario: Acceso restringido
  Dado que soy un usuario con rol Donante
  Cuando intento abrir el panel de administración
  Entonces el acceso es denegado y no veo datos de otros usuarios

Escenario: Suspensión de cuenta
  Dado que reviso un reporte confirmado
  Cuando suspendo la cuenta del infractor
  Entonces el usuario no puede iniciar sesión y ve el motivo
  Y la acción queda registrada en la bitácora con mi usuario y la fecha
```

### HU-20 · Operar sin conexión
**Como** usuario **quiero** seguir usando la app sin señal **para** no perder donaciones en zonas con mala cobertura.

- **RF:** RF-31, RF-32 · **UC:** UC-12 · **Prioridad:** Should · **Puntos:** 8 · **Sprint:** S2

```gherkin
Escenario: Consulta con caché
  Dado que abrí la app con conexión hace 20 minutos
  Cuando pierdo la señal y vuelvo a abrir el listado
  Entonces veo los últimos datos sincronizados con el aviso "Sin conexión · actualizado hace 20 min"

Escenario: Publicación en cola
  Dado que estoy sin conexión
  Cuando publico una donación
  Entonces se guarda localmente como "pendiente de sincronización"
  Y al recuperar la red se envía automáticamente y cambia a "publicada"

Escenario: Conflicto al sincronizar
  Dado que una reserva encolada ya no es válida porque la donación fue tomada
  Cuando se procesa la cola
  Entonces recibo un aviso de conflicto con la opción de reintentar o descartar
  Y no se generan registros duplicados
```

---

## 3. Priorización y recorte

Si al final del Sprint 1 el avance es menor al 70 % de lo planificado, el equipo aplicará este orden de recorte:

1. HU-20 (offline) → se reduce a solo caché de lectura.
2. HU-19 (panel de administración) → se sustituye por consultas directas en Supabase durante la demo.
3. HU-17 (historial y valoraciones) → se entrega solo historial, sin valoraciones.
4. HU-04 (verificación) → las organizaciones se aprueban por seed de datos.

Las historias `Must` no se recortan: si hay riesgo, se reduce su alcance funcional, no su existencia.

## 4. Control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 21/10/2026 | Historias del Sprint 1 |
| 0.2 | 21/10/2026 | Historias del Sprint 2 y criterios Gherkin |
| 1.0 | 21/10/2026 | Estimación calibrada (115 puntos) y plan de recorte aprobados |
