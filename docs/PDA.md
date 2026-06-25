# Muni Digital - Proceso de Decisión Arquitectónica (PDA)

Versión: 1.0

Estado: APROBADO

---

# Objetivo

Garantizar que todas las decisiones estructurales de Muni Digital sean tomadas de forma consistente, documentada, auditada y verificable.

Este documento tiene prioridad sobre:

* opiniones individuales
* conversaciones aisladas
* decisiones ad-hoc
* implementaciones temporales

Su objetivo es preservar la coherencia arquitectónica del proyecto a largo plazo.

---

# Alcance

Este documento aplica a cualquier cambio que afecte:

* Roles
* Permisos
* Usuarios
* Empleados
* Áreas
* Instituciones
* Seguridad
* Auditoría
* Base de datos
* APIs públicas
* Arquitectura backend
* Arquitectura frontend
* Infraestructura
* Integraciones externas

---

# Principios

## 1. No se modifica arquitectura sin definición previa

Ningún cambio arquitectónico puede implementarse directamente.

Primero debe existir una decisión arquitectónica aprobada.

---

## 2. Toda propuesta debe comenzar por un problema

Incorrecto:

"Agreguemos SUPERADMIN."

Correcto:

"Necesitamos una forma de que un administrador pueda ser gestionado por una autoridad superior."

Toda propuesta debe partir de un problema real.

---

## 3. Las decisiones deben documentarse

Toda decisión relevante debe registrar:

* Problema
* Objetivo
* Restricciones
* Alternativas evaluadas
* Decisión final
* Justificación
* Impacto esperado

---

## 4. No se aprueban cambios por intuición

Toda propuesta debe responder:

* ¿Qué problema resuelve?
* ¿Qué riesgos introduce?
* ¿Qué módulos afecta?
* ¿Existe una solución más simple?
* ¿Qué evidencia respalda el cambio?

---

## 5. Compatibilidad primero

Antes de aprobar cualquier decisión debe evaluarse impacto sobre:

* Backend
* Frontend
* API
* Base de datos
* Deploy
* Seguridad
* Observabilidad

---

## 6. Estabilidad antes que velocidad

Se prioriza:

* consistencia
* mantenibilidad
* trazabilidad

sobre velocidad de implementación.

---

# Estados de una decisión

Toda decisión arquitectónica debe encontrarse en uno de los siguientes estados.

## PROPUESTA

La idea existe pero todavía no fue auditada.

---

## EN EVALUACIÓN

Está siendo analizada por:

* ChatGPT
* Claude + Skills
* documentación existente

---

## APROBADA

Existe una decisión formal y un plan de implementación.

---

## IMPLEMENTADA

La decisión fue llevada al código.

---

## VALIDADA

La implementación fue comprobada y coincide con la decisión aprobada.

---

## RECHAZADA

Se decidió no avanzar.

---

## OBSOLETA

Fue reemplazada por una decisión posterior.

---

# Flujo obligatorio

## Paso 1 - Definición

Se documenta:

* problema
* objetivo
* restricciones

---

## Paso 2 - Auditoría

La propuesta es revisada por:

* Yago Torres (Product Owner - Chief Domain Architect):
-Definir la visión de Muni Digital.
-Decidir el alcance de cada ADR.
-Resolver conflictos conceptuales.
-Priorizar qué dominio se modela después.
-Aprobar o rechazar propuestas.
-Mantener la coherencia del negocio.
-Ser el custodio de la fuente de verdad.

*ChatGPT(Principal Enterprise Architect):
-Detectar contradicciones.
-Encontrar huecos conceptuales.
-Proponer modelos.
-Diseñar la arquitectura.
-Anticipar problemas futuros.
-Mantener consistencia entre ADR.
-Proponer mejoras.
-Cuestionar decisiones cuando vea riesgos.
-Pensar varios pasos hacia adelante.

*Claude(Architecture Review Board):
-inconsistencias;
-contradicciones;
-ambigüedades;
-estados imposibles;
-casos límite;
-errores de arquitectura;
-principios mal definidos;
-conceptos redundantes;
-riesgos futuros.

Objetivo:

* identificar riesgos
* detectar contradicciones
* evaluar escalabilidad
* validar consistencia

---

## Paso 3 - Decisión

Se selecciona una única dirección.

No se permiten múltiples diseños simultáneos para el mismo problema.

---

## Paso 4 - Plan

Se genera un plan de implementación.

Formato mínimo:

* P0
* P1
* P2
* P3

Cada fase debe incluir:

* objetivo
* validaciones
* riesgo
* rollback

---

## Paso 5 - Implementación

Recién aquí se modifica código.

---

## Paso 6 - Validación

Se verifica:

* compilación
* contratos
* compatibilidad
* despliegue
* funcionamiento esperado

---

## Paso 7 - Cierre

La decisión pasa a estado VALIDADA.

---

# Regla de Compatibilidad

Todo cambio debe analizar impacto sobre:

* Backend
* Frontend
* API
* Base de datos
* Deploy
* Seguridad
* Observabilidad

Ningún cambio se considera aprobado sin esta evaluación.

---

# Regla de Estabilización

No se inicia una nueva fase mientras exista una fase anterior abierta.

Ejemplo:

❌ Diseñar permisos mientras Auth sigue inestable.

✅ Estabilizar Auth → cerrar → continuar.

---

# Regla Anti-Refactor

No se permite refactorizar una parte estable del sistema sin evidencia de un problema real.

No son motivos válidos:

* "queda más lindo"
* "me parece mejor"
* "podría servir en el futuro"
* "es más moderno"

Se requiere al menos uno de:

* bug comprobado
* limitación funcional
* riesgo de seguridad
* problema de escalabilidad
* contradicción con una decisión aprobada
* deuda técnica demostrable

---

# Registro de Decisiones Arquitectónicas

Toda decisión aprobada debe generar un ADR
(Architecture Decision Record).

Formato:

ADR-001-superadmin.md

ADR-002-auth-cookie-model.md

ADR-003-audit-log.md

---

## Estructura mínima de un ADR

* Estado
* Fecha
* Problema
* Alternativas consideradas
* Decisión tomada
* Consecuencias
* Riesgos
* Plan de implementación

---

# Jerarquía de documentos

La jerarquía oficial del proyecto es:

1. PDA.md
2. Arquitectura Organizacional
3. Modelo de Seguridad
4. Matriz de Permisos
5. ADRs
6. Código

Si el código contradice los documentos aprobados:

El código debe corregirse.

---

# Fuente de Verdad

Las decisiones aprobadas en los documentos arquitectónicos constituyen la fuente de verdad oficial del proyecto.

Las conversaciones no tienen validez arquitectónica por sí mismas.

Una conversación sólo se considera oficial cuando deriva en:

* un ADR aprobado
* una actualización de documentación oficial

---

# Definición de Éxito

Una decisión se considera cerrada únicamente cuando:

* Está documentada.
* Fue auditada.
* Tiene plan de implementación.
* Fue implementada.
* Fue validada.
* No existen inconsistencias conocidas.

Hasta entonces permanece en estado ABIERTO.

---

# Objetivo Final

Construir Muni Digital como una plataforma municipal sostenible a largo plazo, minimizando deuda técnica, evitando refactors innecesarios y asegurando consistencia entre arquitectura, implementación y operación institucional.
