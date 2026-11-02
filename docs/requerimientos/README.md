# Documento de Requerimientos — RedSolidaria

**Proyecto:** RedSolidaria — plataforma de rescate de alimentos y apoyo a comedores populares
**Versión:** 1.0 (línea base congelada)
**Fecha:** 21/10/2026
**Fase:** Levantamiento y especificación
**Framework:** React Native (Expo)

---

## 1. Índice

| # | Documento | Contenido |
|---|---|---|
| 01 | [Visión y alcance](01-vision-y-alcance.md) | Problema, justificación social, objetivos, alcance, actores, supuestos y restricciones |
| 02 | [Requerimientos funcionales](02-requerimientos-funcionales.md) | 32 requerimientos (RF-01 … RF-32) organizados en 8 módulos |
| 03 | [Requerimientos no funcionales](03-requerimientos-no-funcionales.md) | 14 RNF con métricas verificables y método de verificación |
| 04 | [Casos de uso](04-casos-de-uso.md) | 12 casos de uso, diagrama de actores y especificación detallada de los 6 críticos |
| 05 | [Historias de usuario](05-historias-de-usuario.md) | Backlog con criterios de aceptación en formato Gherkin y estimación |
| 06 | [Modelo de datos](06-modelo-de-datos.md) | Entidades, atributos, relaciones y reglas de integridad |
| 07 | [Matriz de trazabilidad](07-matriz-trazabilidad.md) | RF → HU → UC → Tarea → Prueba → Sprint |

## 2. Resumen cuantitativo

| Elemento | Cantidad |
|---|---|
| Módulos funcionales | 8 |
| Requerimientos funcionales | 32 (21 Must · 10 Should · 1 Could) |
| Requerimientos no funcionales | 14 |
| Casos de uso | 12 (6 especificados en detalle) |
| Historias de usuario | 20 (115 puntos de historia) |
| Entidades de datos | 11 |
| Actores del sistema | 4 |

## 3. Priorización (MoSCoW)

| Nivel | Significado en este proyecto | Consecuencia si no se entrega |
|---|---|---|
| **Must** | Imprescindible para que el producto tenga sentido | El MVP no se considera entregado |
| **Should** | Importante; aporta valor claro al flujo principal | Se entrega con funcionalidad reducida y se documenta |
| **Could** | Deseable; se implementa si el cronograma lo permite | Pasa al roadmap posterior a la entrega |
| **Won't (esta versión)** | Explicitamente fuera de alcance | — |

Regla de decisión del equipo: ante riesgo de incumplimiento, **se recorta desde "Could" hacia "Should"**, nunca desde "Must".

## 4. Actores del sistema

| Actor | Descripción | Necesidad principal |
|---|---|---|
| **Donante** | Restaurante, panadería, mercado de abastos, supermercado o particular que tiene excedentes de alimentos aptos | Deshacerse del excedente rápido, sin costo y con constancia de su aporte |
| **Beneficiario** | Comedor popular, olla común, albergue u ONG que recibe donaciones | Enterarse a tiempo de alimentos disponibles cerca y asegurar su recojo |
| **Voluntario** | Persona que traslada la donación desde el donante hasta el beneficiario | Recibir asignaciones claras con ruta y horario |
| **Administrador** | ONG que opera la red o equipo de soporte del proyecto | Verificar organizaciones y moderar contenido |

## 5. Glosario

| Término | Definición |
|---|---|
| **Donación / publicación** | Oferta de alimentos publicada por un donante, con cantidad, caducidad, fotos y punto de recojo |
| **Reserva** | Solicitud formal de un beneficiario sobre una publicación concreta |
| **Recojo** | Traslado físico de la donación desde el donante hacia el beneficiario |
| **Olla común** | Organización vecinal autogestionada que prepara alimentos para familias de su zona |
| **Comedor popular** | Organización social que brinda alimentación subsidiada a población vulnerable |
| **Caducidad** | Fecha y hora límite de consumo recomendada para el alimento ofrecido |
| **Ventana de recojo** | Rango horario en el que el donante puede entregar la donación |
| **Impacto** | Métricas acumuladas: kg rescatados, porciones habilitadas y CO₂ evitado |
| **RLS** | *Row Level Security*: políticas de acceso a nivel de fila en PostgreSQL/Supabase |
| **UAT** | *User Acceptance Testing*: pruebas de aceptación con usuarios reales |
| **DoD** | *Definition of Done*: criterios que una tarea debe cumplir para considerarse terminada |

## 6. Convenciones de identificadores

| Prefijo | Significado | Ejemplo |
|---|---|---|
| `RF-xx` | Requerimiento funcional | RF-06 Publicar donación |
| `RNF-xx` | Requerimiento no funcional | RNF-02 Rendimiento |
| `UC-xx` | Caso de uso | UC-03 Publicar donación |
| `HU-xx` | Historia de usuario | HU-04 Publicar una donación |
| `T-xx` | Tarea del plan de trabajo | T-11 Formulario de publicación |
| `RN-xx` | Regla de negocio | RN-03 No se publican alimentos vencidos |
| `PR-xx` | Prueba / caso de prueba | PR-11 Publicación con foto obligatoria |

## 7. Reglas de negocio

| ID | Regla | Requerimiento asociado |
|---|---|---|
| RN-01 | Un usuario tiene exactamente un rol activo por organización; un voluntario puede además ser donante particular. | RF-03 |
| RN-02 | Solo usuarios con rol *Beneficiario* verificado pueden reservar donaciones. | RF-04, RF-15 |
| RN-03 | No se puede publicar ni reservar un alimento cuya caducidad sea anterior al momento actual. | RF-06, RF-10 |
| RN-04 | Una publicación solo puede tener una reserva activa a la vez. | RF-15, RF-18 |
| RN-05 | El cambio de estado de una donación solo es válido según la máquina de estados definida (`publicada → reservada → en_recojo → entregada → cerrada`, con `cancelada` como salida lateral). | RF-18 |
| RN-06 | La entrega se confirma con código QR/PIN de 6 dígitos generado al momento de la reserva. | RF-20 |
| RN-07 | Toda donación entregada suma al panel de impacto del donante, del beneficiario y de la red. | RF-24 |
| RN-08 | Una publicación con más de 3 reportes confirmados se oculta automáticamente hasta revisión del administrador. | RF-29, RF-30 |
| RN-09 | Las valoraciones solo pueden emitirse entre las partes de una donación cerrada y una sola vez por operación. | RF-27 |
| RN-10 | Los datos de ubicación se muestran con precisión aproximada (≈150 m) hasta que exista una reserva aceptada. | RNF-11 |

---

*Documento vivo: cualquier cambio posterior al 21/10/2026 debe registrarse en una nueva versión con control de cambios.*
