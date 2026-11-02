# 01 · Visión y alcance del proyecto

**Proyecto:** RedSolidaria
**Versión:** 1.0 · **Fecha:** 21/10/2026
**Elaborado por:** Alan Jorge Garcia Apaza (líder) · **Revisado por:** Frank Ducks Hanccocallo Hachircana y Vladimir Jaward Hancco Soncco

---

## 1. Resumen ejecutivo

**RedSolidaria** es una aplicación móvil multiplataforma (Android e iOS) que digitaliza el ciclo completo de una donación de alimentos: **publicación del excedente → descubrimiento geolocalizado → reserva → recojo por un voluntario → entrega confirmada → medición del impacto**.

El producto resuelve un problema de coordinación, no de escasez: los alimentos existen y las organizaciones que los necesitan también; lo que falta es un canal confiable, oportuno y trazable entre ambos. La aplicación lo provee con un costo operativo cercano a cero para el donante y para el beneficiario.

## 2. Contexto y justificación social

### 2.1 Situación problemática

En el Perú, una parte significativa de los alimentos aptos para el consumo se pierde en la etapa de comercialización y consumo final, mientras comedores populares y ollas comunes atienden diariamente a familias en situación de inseguridad alimentaria. La FAO estima que alrededor de **un tercio de los alimentos producidos en el mundo se pierde o se desperdicia**, lo que además genera emisiones evitables de gases de efecto invernadero.

> **Nota metodológica:** las cifras globales citadas son referenciales y provienen de organismos internacionales. Antes de la sustentación final, el equipo debe validar los indicadores locales con fuentes oficiales (MIDAGRI, MINAM, INEI) y registrar la cita exacta en la presentación.

### 2.2 Por qué la solución actual (WhatsApp + llamadas) no basta

| Limitación del proceso actual | Consecuencia | Respuesta de RedSolidaria |
|---|---|---|
| La oferta circula en grupos dispersos y se pierde en el ruido | Donaciones que caducan sin ser recogidas | Tablero único de donaciones disponibles con filtro por distancia y caducidad |
| No hay registro de quién recogió ni cuándo | Desconfianza entre las partes; imposibilidad de rendir cuentas | Máquina de estados + confirmación con QR/PIN + historial |
| La ubicación se describe por texto ("frente al mercado") | Recojos fallidos o tardíos | Mapa con geocodificación y cálculo de distancia |
| Nadie mide el aporte del donante | Los comercios no tienen incentivo reputacional | Panel de impacto y constancia digital de donaciones |

### 2.3 Contribución a los ODS

| ODS | Meta relacionada | Cómo aporta el proyecto |
|---|---|---|
| **ODS 2** — Hambre cero | 2.1 Acceso a alimentos seguros y nutritivos | Acerca excedentes aptos a organizaciones que alimentan a población vulnerable |
| **ODS 12** — Producción y consumo responsables | 12.3 Reducir a la mitad el desperdicio de alimentos per cápita | Rescate y redistribución de excedentes antes de su caducidad |
| **ODS 11** — Ciudades y comunidades sostenibles | 11.6 Reducir el impacto ambiental urbano | Menos residuos orgánicos y menos emisiones asociadas |
| **ODS 17** — Alianzas para lograr objetivos | 17.17 Alianzas multisectoriales | Articula comercios, organizaciones sociales y voluntariado |

## 3. Objetivos

### 3.1 Objetivo general

Desarrollar una aplicación multiplataforma con React Native que conecte donantes de alimentos con organizaciones beneficiarias y voluntarios de recojo, reduciendo el tiempo entre la publicación de un excedente y su entrega efectiva, y generando trazabilidad verificable de cada donación.

### 3.2 Objetivos específicos

| ID | Objetivo específico | Indicador de logro |
|---|---|---|
| OE-01 | Digitalizar la publicación de excedentes alimentarios | Un donante publica una donación en ≤ 60 segundos |
| OE-02 | Facilitar el descubrimiento de donaciones cercanas | El beneficiario encuentra donaciones en un radio de 5 km en ≤ 3 acciones desde el inicio |
| OE-03 | Formalizar la reserva y el recojo | 100 % de las entregas cuentan con confirmación digital (QR/PIN) |
| OE-04 | Incorporar voluntariado logístico | Asignación de voluntario en ≤ 10 minutos desde la aceptación |
| OE-05 | Medir el impacto social generado | Reporte automático de kg rescatados, porciones y CO₂ evitado |
| OE-06 | Operar con conectividad intermitente | Consulta de donaciones y creación de publicaciones funcionan sin red y sincronizan al reconectar |

### 3.3 Objetivos de aprendizaje (académicos)

- Aplicar un framework multiplataforma (React Native) a un problema real de proyección social.
- Ejecutar un ciclo de vida de software abreviado: levantamiento, planificación, construcción por iteraciones, pruebas y entrega.
- Practicar trabajo colaborativo con roles definidos, control de versiones y gestión de riesgos en un plazo fijo de doce días calendario.

## 4. Alcance

### 4.1 Dentro del alcance (MVP, versión 1.0)

1. Registro, autenticación y gestión de perfiles con tres roles: donante, beneficiario y voluntario.
2. Verificación de organizaciones beneficiarias por parte del administrador.
3. Publicación de donaciones con fotos, categoría, cantidad, caducidad y ventana de recojo.
4. Descubrimiento de donaciones mediante listado con filtros y mapa geolocalizado.
5. Reserva de donaciones y gestión de solicitudes por parte del donante.
6. Asignación de voluntario y flujo de recojo con confirmación por QR/PIN.
7. Notificaciones push de eventos clave y recordatorios.
8. Panel de impacto social e historial de operaciones.
9. Valoraciones mutuas entre las partes.
10. Panel de administración y moderación de contenido.
11. Funcionamiento básico sin conexión (caché de lectura + cola de escritura).

### 4.2 Fuera del alcance (versión 1.0)

| Elemento excluido | Motivo | Consideración futura |
|---|---|---|
| Pasarela de pagos o donaciones monetarias | No es necesario para validar el flujo de rescate de alimentos | Fase 2 |
| Logística con reparto propio (rutas optimizadas, flota) | Requiere operación y datos que el equipo no posee | Fase 2 con algoritmo de ruteo |
| Chat en tiempo real entre las partes | Sustituible por notificaciones en el MVP | Backlog `Should` post-entrega (RF-23) |
| Integración con SUNAT/comprobantes de donación | Requiere convenio y validación tributaria | Fase 3 |
| Traducción completa al quechua | Solo se deja la infraestructura i18n preparada | Fase 2 |
| Versión web de administración | El panel se resuelve dentro de la app | Fase 2 |
| Modelos de IA para predecir excedentes | Excede el alcance académico y el plazo | Investigación futura |

### 4.3 Criterio de éxito del MVP

El MVP se considera logrado cuando un usuario puede completar de punta a punta el flujo **publicar → descubrir → reservar → recolectar → confirmar entrega → ver impacto** en un dispositivo Android real, con datos persistidos y sin intervención manual del equipo.

## 5. Actores y partes interesadas

| Actor | Tipo | Interés | Influencia |
|---|---|---|---|
| Donante (comercio) | Primario | Rapidez y constancia de su aporte | Alta |
| Beneficiario (comedor/olla) | Primario | Abastecimiento oportuno y cercano | Alta |
| Voluntario | Primario | Asignaciones claras y coordinadas | Media |
| Administrador (ONG) | Primario | Verificación y moderación | Alta |
| Docente del curso | Secundario | Cumplimiento de estándares y rúbrica | Alta |
| Comunidad / familias atendidas | Secundario | Acceso a alimentación | Baja |
| Municipalidad / programas sociales | Externo | Articulación con políticas locales | Media |

## 6. Supuestos

| ID | Supuesto | Impacto si no se cumple |
|---|---|---|
| SU-01 | Los integrantes disponen de ~6 horas efectivas por jornada durante los 10 días de trabajo. | Replanificación inmediata y recorte de alcance `Could`/`Should` |
| SU-02 | Los donantes cuentan con un smartphone con datos móviles. | Se refuerza el modo offline y el registro asistido por el administrador |
| SU-03 | Existe al menos un comedor y un comercio dispuestos a participar en la validación. | La UAT se realiza con datos simulados y usuarios del propio equipo |
| SU-04 | El uso de servicios gestionados (Supabase) es aceptable para el curso. | Migración a backend propio Node.js + PostgreSQL, con costo de 1–2 días |
| SU-05 | La conectividad en los puntos de recojo es intermitente pero no nula. | Se prioriza la cola de sincronización sobre el modo totalmente offline |

## 7. Restricciones

| Tipo | Restricción |
|---|---|
| **Tiempo** | 12 días calendario (10 jornadas de trabajo + día de entrega), del 21/10/2026 al 01/11/2026 |
| **Equipo** | 3 integrantes con dedicación parcial (otras asignaturas) |
| **Tecnología** | Framework multiplataforma obligatorio; se elige React Native con Expo |
| **Presupuesto** | Cero costo de infraestructura: planes gratuitos (Expo EAS free tier, Supabase free tier) |
| **Legal** | Cumplimiento de la Ley N.° 29733 de Protección de Datos Personales (Perú) |
| **Dispositivos** | Android 8.0+ e iOS 14+; el equipo cuenta con al menos un Android físico para pruebas |

## 8. Enfoque de solución (visión de arquitectura)

```
┌──────────────────────────────────────────────────────────────┐
│                    APP MÓVIL (React Native + Expo)           │
│  Donante · Beneficiario · Voluntario · Administrador         │
│  Expo Router · TanStack Query · Zustand · react-native-maps  │
│  AsyncStorage (caché + cola offline) · expo-notifications    │
└───────────────────────────┬──────────────────────────────────┘
                            │ HTTPS / JSON (JWT)
┌───────────────────────────▼──────────────────────────────────┐
│                      SUPABASE (BaaS)                         │
│  Auth (correo/Google) · PostgreSQL + RLS · Storage (fotos)   │
│  Edge Functions (lógica de estados, push, métricas)          │
└───────────────────────────┬──────────────────────────────────┘
                            │
        ┌───────────────────┴────────────────────┐
        │  Servicios externos                    │
        │  Expo Push · Mapas · Geocodificación   │
        └────────────────────────────────────────┘
```

**Decisiones de arquitectura relevantes**

| Decisión | Alternativa descartada | Justificación |
|---|---|---|
| Expo (managed workflow) | React Native CLI puro | Elimina la configuración nativa y permite probar en dispositivo físico con Expo Go desde el día 1 |
| Supabase como BaaS | Backend Node.js propio | Ahorra ~3 días de trabajo en autenticación, almacenamiento y tiempo real; PostgreSQL + RLS cubre la seguridad por rol |
| TypeScript estricto | JavaScript | Reduce defectos en un equipo pequeño con poco tiempo de pruebas |
| Arquitectura por *features* | Capas globales (screens/services) | Facilita repartir trabajo entre integrantes sin conflictos de archivos |

## 9. Métricas de éxito del proyecto

| Métrica | Meta | Medición |
|---|---|---|
| Flujo principal completado sin errores | 100 % en UAT | Guion de pruebas de aceptación |
| Defectos críticos abiertos al cierre | 0 | Registro de defectos |
| Cobertura de pruebas de lógica de negocio | ≥ 60 % | Reporte de Jest |
| Tiempo de publicación de una donación | ≤ 60 s | Cronometraje en UAT |
| Requerimientos `Must` implementados | 100 % (21/21) | Matriz de trazabilidad |
| Satisfacción de usuarios de prueba | ≥ 4/5 | Encuesta breve post-UAT |

## 10. Control de cambios

| Versión | Fecha | Autor | Cambio |
|---|---|---|---|
| 0.1 | 21/10/2026 | Alan J. Garcia Apaza | Borrador inicial de visión y alcance |
| 0.2 | 21/10/2026 | Frank D. Hanccocallo Hachircana | Ajuste de alcance móvil y exclusiones |
| 1.0 | 21/10/2026 | Vladimir J. Hancco Soncco | Revisión técnica, línea base aprobada por el equipo |
