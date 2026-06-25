ADR-000 — Architecture Decision Record Governance Model

Estado: APPROVED

Versión: 1.0

Reemplaza: Ninguno

Extiende: PDA.md

Objetivo

Definir el modelo oficial de gobernanza de la colección de Architecture Decision Records (ADR) de Muni Digital.

Este documento establece qué representa un ADR, cuál es su autoridad, cómo evoluciona, cómo se versiona y cómo se relaciona con el resto de la documentación arquitectónica del proyecto.

No define reglas del dominio municipal ni decisiones funcionales. Define las reglas que rigen a los propios ADR.

Alcance

Aplica a todos los ADR presentes y futuros del proyecto, independientemente de su dominio funcional.

Incluye:

creación
modificación
reemplazo
versionado
aprobación
obsolescencia
relación entre documentos
interpretación

No aplica al código fuente ni al proceso de implementación, ya regulados por el PDA.

Problema

A medida que crece la colección de ADR surge un problema estructural:

múltiples versiones del mismo ADR
reemplazos
cambios de numeración
documentos obsoletos
interpretación de autoridad
relación entre documentos

Sin reglas explícitas, la colección deja de comportarse como una arquitectura documental consistente.

Decisión Arquitectónica

La colección completa de ADR constituye un sistema documental único.

Cada ADR representa una decisión arquitectónica independiente.

La colección completa constituye la arquitectura conceptual oficial de Muni Digital.

Principios
Un único ADR vigente por número

Para cada identificador ADR sólo puede existir una versión vigente.

Ejemplo:

ADR-013

Estado:
APPROVED

Versión:
1.2

No deben coexistir:

ADR-013
ADR-013.1
ADR-013.2

como documentos oficiales simultáneamente.

Las versiones históricas pueden conservarse únicamente como registro de evolución.

Inmutabilidad

Un ADR aprobado no se modifica parcialmente.

Toda modificación significativa genera una nueva versión completa.

Nunca se realizan ediciones silenciosas.

Reemplazo

Cuando una versión reemplaza otra:

la versión anterior pasa a estado REPLACED u OBSOLETE;
la nueva versión hereda el mismo número de ADR;
la nueva versión pasa a ser la única fuente de verdad.

Ejemplo:

ADR-013 v1.0

↓

ADR-013 v1.1

↓

ADR-013 v1.2 (APPROVED)

Repositorio:

ADR-013.md

Histórico:

archive/ADR-013-v1.0.md

archive/ADR-013-v1.1.md

Fuente de Verdad

La única versión con autoridad arquitectónica es la versión vigente del ADR.

Los borradores, conversaciones y propuestas no poseen autoridad documental.

Trazabilidad

Toda decisión debe poder responder:

de qué problema surgió;
qué ADR reemplazó;
qué ADR depende de ella;
qué ADR dependen de ella.
Compatibilidad

Un ADR nuevo no puede contradecir un ADR vigente.

Si necesita modificar una decisión previa deberá reemplazar explícitamente ese ADR.

Nunca coexistirán dos decisiones oficiales incompatibles.

Jerarquía

La autoridad documental queda definida de la siguiente forma:

PDA
ADR-000
ADR Conceptuales
ADR Organizacionales
ADR de Dominio
ADR Técnicos
Diseño Técnico
Código
Ciclo de Vida de un ADR

Todo ADR atraviesa los siguientes estados:

PROPOSED

↓

UNDER REVIEW

↓

APPROVED

↓

IMPLEMENTED

↓

VALIDATED

↓

OBSOLETE (si es reemplazado)

Versionado

Las versiones representan la evolución del mismo ADR.

Ejemplo:

ADR-009

v1.0

v1.1

v1.2

El número del ADR nunca cambia.

Sólo cambia su versión.

Organización del Repositorio

Se recomienda mantener la siguiente estructura:

docs/

PDA.md

ADR-000.md

ADR-001.md

ADR-002.md

...

archive/

ADR-009-v1.0.md

ADR-009-v1.1.md

ADR-013-v1.0.md

ADR-013-v1.1.md

La carpeta archive conserva únicamente trazabilidad histórica.

Nunca constituye fuente de verdad.

Clasificación de ADR

Los ADR podrán clasificarse en:

Conceptuales

Definen conceptos fundamentales.

Ejemplo:

Persona

Documento

Expediente

Procedimiento

Organizacionales

Definen estructura institucional.

Ejemplo:

Instituciones

Áreas

Posiciones

Autoridad

Dominio

Definen modelos propios del negocio municipal.

Ejemplo:

Compras

RRHH

Mesa de Entradas

HCD

Obras Públicas

Técnicos

Transforman los modelos conceptuales en decisiones de implementación.

Ejemplo:

Persistencia

Eventos

API

Integraciones

Relación con el PDA

El PDA responde:

¿Cómo se toma una decisión arquitectónica?

ADR-000 responde:

¿Cómo se gobierna una decisión una vez convertida en ADR?

Ambos documentos son complementarios y no se sustituyen entre sí.

Relación con el resto de la serie

Todos los ADR posteriores:

ADR-001

ADR-002

...

ADR-999

deben respetar este documento.

Consecuencias
Positivas
una única fuente de verdad por ADR;
versionado consistente;
reemplazos explícitos;
eliminación de contradicciones documentales;
trazabilidad histórica;
escalabilidad de la colección documental.
Negativas

Toda modificación futura requerirá una disciplina documental mayor.

Esto aumenta el costo de mantenimiento, pero reduce significativamente el riesgo de inconsistencias arquitectónicas.

Criterios de Aprobación

Este ADR se considera vigente cuando:

el PDA se mantiene como documento rector del proceso;
toda la colección de ADR adopta esta política de versionado;
existe una única versión vigente por número de ADR;
las versiones históricas quedan claramente identificadas como archivo.