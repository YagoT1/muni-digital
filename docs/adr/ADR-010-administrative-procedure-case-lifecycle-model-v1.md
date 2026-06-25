# ADR-010 — Administrative Procedure & Case Lifecycle Model v1 — Muni Digital

> Documento conceptual del modelo de procedimiento administrativo y ciclo de vida de casos.
> Basado en: PDA.md · ADR-001 · ADR-002 · ADR-003 · ADR-004 · ADR-005 · ADR-006 · ADR-007 · ADR-008 · ADR-009
> Estado: Propuesta para revisión y aprobación.
> Restricción: Este documento NO define tablas, entidades técnicas, código, APIs, JWT, endpoints, infraestructura, microservicios ni implementación.
> Este documento es la fuente de verdad conceptual para Mesa de Entradas, Reclamos, Trámites, Compras, RRHH, Obras Públicas, Expedientes y Gobierno Electrónico.

---

## Resumen Ejecutivo

ADR-009 resolvió qué es lo que la autoridad institucional produce cuando se ejerce: el acto administrativo. Pero un acto administrativo no aparece de la nada. Es, casi siempre, el resultado de una secuencia de actuaciones que se desarrollan en el tiempo: alguien inicia algo, otra posición interviene, se solicita un informe, se recibe una respuesta, se analiza, se decide, se notifica. Esa secuencia tiene nombre propio en la tradición administrativa: procedimiento administrativo. Y ese procedimiento, en la práctica municipal argentina, suele tramitarse dentro de un expediente.

Aquí aparece la confusión más persistente y más dañina de todo el dominio de gobierno digital municipal: tratar al expediente como si fuera el procedimiento mismo. Esta confusión no es accidental; es casi inevitable si no se la previene explícitamente, porque en el lenguaje cotidiano del municipio se dice indistintamente "el expediente está en trámite" y "el procedimiento está en trámite", como si fueran lo mismo. Pero no lo son, y la diferencia tiene consecuencias estructurales profundas.

Cuando un sistema confunde expediente con procedimiento, pierde la capacidad de representar varias situaciones que ocurren constantemente en la operación municipal real: un mismo expediente que tramita simultáneamente más de un procedimiento relacionado (por ejemplo, un expediente de obra pública que tramita en paralelo el procedimiento de aprobación técnica y el procedimiento de aprobación presupuestaria); un procedimiento que se inicia, se desarrolla y se resuelve sin que jamás se abra un expediente formal (por ejemplo, ciertos reclamos de atención inmediata resueltos en el mismo acto de recepción); y un expediente que contiene la huella de varios procedimientos sucesivos a lo largo de los años, cada uno con su propio inicio, su propio desarrollo y su propio cierre, sin que el cierre de uno implique el cierre del expediente que los contiene a todos.

Esta confusión rompe la trazabilidad institucional de una manera particularmente insidiosa: como el expediente sí tiene un número, una carátula y una existencia visible para todos los actores municipales, resulta tentador usarlo como la única unidad de seguimiento. El resultado es que el sistema puede decir "en qué expediente está algo" pero no puede responder con precisión "en qué etapa del procedimiento está esa decisión", "quién intervino en qué momento del proceso de formación de la voluntad institucional" ni "cuántos procedimientos distintos conviven dentro de este mismo expediente". Sin esa capacidad, la auditoría institucional que exige ADR-005 queda estructuralmente limitada a la granularidad gruesa del expediente, perdiendo toda la riqueza de la secuencia real de actuaciones que condujo a cada decisión.

Este documento es, por esta razón, prerequisito conceptual indispensable para el diseño de Mesa de Entradas, Reclamos, Trámites, Compras, RRHH, Obras Públicas, Expedientes, Firma Digital y, en general, cualquier módulo de Gobierno Electrónico que Muni Digital deba construir. Ninguno de esos módulos puede diseñarse correctamente si previamente no queda resuelta, sin ambigüedad, la diferencia entre procedimiento y expediente.

La decisión central de este documento es la siguiente:

**Un procedimiento administrativo es una secuencia institucional de actuaciones destinada a producir uno o más resultados administrativos. El expediente registra y conserva el procedimiento, pero no es el procedimiento. Un procedimiento no es un expediente. Un expediente puede contener múltiples procedimientos relacionados.**

Este modelo elimina, de forma explícita y definitiva, cinco confusiones que de otro modo contaminarían el diseño técnico de los módulos que dependen de él: procedimiento no es expediente, caso no es expediente, actuación no es acto administrativo, procedimiento no es workflow técnico, y el estado del procedimiento no es el estado del expediente.

---

## Definiciones Fundamentales

### Procedimiento Administrativo

El procedimiento administrativo es la secuencia ordenada de actuaciones institucionales, desarrolladas conforme a reglas determinadas, que tiene por finalidad producir uno o más resultados administrativos sobre un asunto determinado. El procedimiento tiene un inicio identificable, un desarrollo compuesto por actuaciones sucesivas o paralelas, y una culminación que puede consistir en uno o más actos administrativos (ADR-009), en la constatación de que no corresponde dictar ningún acto, o en su extinción anticipada por desistimiento, caducidad o abandono.

### Caso Administrativo

El caso administrativo es la instancia concreta de un procedimiento determinado, identificada por su objeto específico y sus participantes concretos. Mientras el procedimiento describe el patrón general de tramitación (por ejemplo, "procedimiento de habilitación comercial"), el caso es la ocurrencia particular de ese patrón sobre un asunto específico (por ejemplo, "la habilitación comercial solicitada por tal contribuyente para tal local en tal fecha"). Un reclamo presentado por un vecino, una solicitud de licencia de un empleado, un proceso de compra de insumos, una solicitud de habilitación comercial y un proceso de contratación de una obra son todos casos administrativos: instancias concretas de distintos tipos de procedimiento.

### Actuación

La actuación es cada intervención individual que se produce dentro del desarrollo de un procedimiento: una derivación, un informe, un dictamen, una solicitud de información adicional, una observación, una corrección, una aprobación parcial, un rechazo, una firma, una notificación. El procedimiento está compuesto por la sucesión de sus actuaciones; ninguna actuación individual constituye, por sí sola, el procedimiento completo.

### Expediente

Conforme ya lo estableció ADR-009, el expediente es el contenedor institucional que agrupa, de forma ordenada y cronológica, los documentos, informes, dictámenes, actos y notificaciones producidos en la tramitación de un asunto administrativo. Este documento extiende esa definición precisando que el expediente registra y conserva uno o más procedimientos, pero no es, en sí mismo, ninguno de esos procedimientos.

### Participante

El participante es cualquier actor que interviene en un procedimiento determinado: un ciudadano que lo inicia, un empleado que produce una actuación, una posición institucional que decide, un órgano colegiado que vota. El participante se identifica conforme a los modelos ya definidos en ADR-006 (persona e identidad), ADR-004 (empleado) y ADR-007 (posición), según corresponda a la naturaleza de su intervención.

### Intervención

La intervención es la relación específica entre un participante y una actuación determinada dentro del procedimiento: quién la produjo, en qué carácter, en qué momento. La intervención es lo que conecta al participante (quién) con la actuación (qué se hizo).

### Resultado

El resultado es lo que el procedimiento produce al culminar: puede ser uno o más actos administrativos (ADR-009), la constatación de que el asunto no requiere acto formal, o la extinción del procedimiento sin resultado sustantivo (por desistimiento, caducidad o abandono).

### Trámite

El trámite es la denominación coloquial e institucionalmente extendida que el ciudadano y el empleado municipal utilizan habitualmente para referirse a un caso administrativo concreto, particularmente cuando ese caso es iniciado por un interesado externo a la institución (un ciudadano, un contratista). El trámite, a los efectos de este modelo, es equivalente al caso administrativo: la instancia concreta de un procedimiento, vista desde la perspectiva de quien lo inicia o lo sigue.

### Flujo

El flujo describe la secuencia esperada o prevista de actuaciones que un tipo de procedimiento determinado sigue habitualmente, conforme a la normativa o la práctica institucional que lo regula. El flujo es la descripción general del patrón; el procedimiento concreto (el caso) puede seguir ese flujo con exactitud o desviarse de él conforme a las circunstancias particulares del asunto. El flujo no debe confundirse con el workflow técnico, distinción que se desarrolla en detalle más adelante.

### Estado

El estado es la condición institucional en la que se encuentra, en un momento dado, un procedimiento o un expediente. Este documento desarrolla extensamente que los estados del procedimiento y los estados del expediente son conjuntos distintos, que no deben confundirse ni mapearse uno a uno.

### Instancia

La instancia es la ocurrencia concreta y singular de un procedimiento sobre un caso determinado, ya definida bajo el término "caso administrativo". Se utiliza el término instancia particularmente cuando se quiere enfatizar la relación entre el patrón general (el procedimiento como tipo) y su realización concreta (el caso como instancia de ese tipo).

### Competencia

Conforme a ADR-009, la competencia es el conjunto de materias y facultades que el marco normativo y el organigrama asignan a una posición determinada (ADR-007). En el contexto de este documento, la competencia determina qué posición o posiciones tienen la facultad institucional de intervenir, decidir o producir actos dentro de un procedimiento determinado.

---

## ¿Qué es un Procedimiento Administrativo?

El procedimiento administrativo es la secuencia institucional que conduce, a través de un conjunto ordenado de actuaciones, desde el planteamiento de un asunto hasta su resolución o extinción. El procedimiento tiene una estructura conceptual reconocible en sus grandes etapas, aunque su desarrollo concreto varía según el tipo de asunto y la normativa aplicable.

**Inicio:** El procedimiento comienza con un hecho institucional identificable: la presentación de una solicitud por un interesado, la iniciación de oficio por la propia administración, o la ocurrencia de un evento que la normativa determina como disparador de un procedimiento determinado (por ejemplo, el vencimiento de un plazo que activa automáticamente un procedimiento de renovación).

**Desarrollo:** El procedimiento se desarrolla a través de la sucesión de actuaciones: derivaciones entre áreas, solicitudes de informes técnicos o legales, recepción de esos informes, observaciones, correcciones, intervenciones de distintos participantes conforme a su competencia. El desarrollo puede ser lineal (una actuación sigue a la otra en secuencia estricta) o puede admitir procedimientos paralelos, conforme se desarrolla en su propia sección más adelante.

**Control:** En determinadas etapas, el procedimiento atraviesa instancias de control: verificación de requisitos formales, revisión técnica o legal, control de legalidad previo a la decisión. El control es, en sí mismo, una categoría de actuación dentro del desarrollo del procedimiento.

**Decisión:** El procedimiento llega a un punto en el que la autoridad competente, conforme a ADR-008, forma su voluntad institucional sobre el asunto, lo cual habitualmente se materializa en uno o más actos administrativos conforme a ADR-009.

**Cierre:** El procedimiento culmina cuando se ha producido su resultado (el acto o actos correspondientes, debidamente notificados cuando así corresponda) o cuando se extingue anticipadamente por desistimiento, caducidad o abandono del interesado, sin que se haya llegado a una decisión de fondo.

### Diferencia entre Procedimiento y Acto Administrativo

ADR-009 estableció que el acto administrativo es la manifestación de voluntad institucional que produce efectos jurídicos o administrativos identificables. El procedimiento, en cambio, es la secuencia de actuaciones que conduce a la producción de ese acto. El procedimiento es el camino; el acto es, frecuentemente, uno de los destinos posibles de ese camino, aunque no el único: un procedimiento puede concluir sin producir ningún acto administrativo formal (por ejemplo, por desistimiento del interesado), y un procedimiento puede producir más de un acto administrativo a lo largo de su desarrollo (una providencia que impulsa el trámite, un dictamen que opina, una resolución que decide, una notificación que comunica). El procedimiento produce actos; el acto, por sí mismo, no produce procedimientos: es el procedimiento el que antecede y origina al acto, no a la inversa.

---

## ¿Qué es un Caso Administrativo?

El caso administrativo es la concreción singular de un tipo de procedimiento sobre un asunto determinado, con sus propios participantes, su propio objeto y su propio resultado esperado.

Un reclamo presentado por un vecino sobre el estado de una calle es un caso: la instancia concreta del procedimiento general de "gestión de reclamos ciudadanos", aplicado a ese vecino, esa calle y esa fecha. Una solicitud de licencia médica de un empleado es un caso: la instancia concreta del procedimiento de "gestión de licencias", aplicado a ese empleado y esas circunstancias de salud. Un proceso de compra de insumos de oficina es un caso: la instancia concreta del procedimiento de "compras menores", aplicado a esos insumos y ese monto. Una solicitud de habilitación comercial es un caso: la instancia concreta del procedimiento de "habilitaciones comerciales", aplicado a ese comercio y ese rubro. Un proceso de contratación de una obra de pavimentación es un caso: la instancia concreta del procedimiento de "contrataciones de obra pública", aplicado a esa obra específica.

### Origen

El origen del caso es el hecho institucional que lo dispara: la presentación del interesado, la iniciativa de oficio de la administración, o el evento normativamente determinado que activa el procedimiento correspondiente.

### Objetivo

El objetivo del caso es el resultado institucional que se busca alcanzar: resolver el reclamo, otorgar o denegar la licencia, adjudicar la compra, otorgar o denegar la habilitación, adjudicar y ejecutar la contratación de la obra.

### Participantes

Los participantes del caso son los actores concretos que intervienen en él: el vecino reclamante, los empleados de las áreas que producen informes, las posiciones que tienen competencia para decidir, los órganos colegiados que eventualmente deban intervenir (por ejemplo, una comisión de adjudicación en un proceso de compra).

### Resultado Esperado

El resultado esperado del caso es la culminación institucional prevista para ese tipo de procedimiento: la resolución del reclamo (favorable o desfavorable), el otorgamiento o denegación de la licencia, la adjudicación de la compra, el otorgamiento o denegación de la habilitación, la adjudicación y posterior ejecución de la obra.

---

## ¿Qué es una Actuación?

La actuación es la unidad elemental de desarrollo de un procedimiento: cada intervención concreta que un participante produce dentro de su secuencia.

### Ejemplos de actuaciones

**Derivación:** El traslado de un asunto de un área a otra dentro de la misma institución, para que esta última intervenga conforme a su competencia.

**Informe:** La producción de un análisis técnico, contable o de cualquier otra naturaleza especializada, por parte de un área competente, destinado a ilustrar a la autoridad decisoria.

**Dictamen:** Conforme a ADR-009, la opinión técnica o jurídica que un área especializada produce dentro del procedimiento, no vinculante salvo previsión normativa expresa.

**Solicitud:** El requerimiento formal de información, documentación o subsanación dirigido al interesado o a otra área, necesario para continuar la tramitación.

**Observación:** El señalamiento de un defecto, omisión o inconsistencia detectada en una etapa anterior del procedimiento, que debe ser atendido antes de continuar.

**Corrección:** La subsanación de una observación previamente formulada, sea por el interesado o por el área que produjo la actuación observada.

**Aprobación:** La conformidad expresada por una posición competente respecto de una etapa parcial del procedimiento, que no necesariamente constituye la decisión final sobre el fondo del asunto.

**Rechazo:** La disconformidad o denegación expresada respecto de una solicitud, una etapa parcial o, eventualmente, el fondo del asunto.

**Firma:** Conforme a ADR-009, la validación formal de un acto administrativo producido dentro del procedimiento.

**Notificación:** Conforme a ADR-009, la comunicación formal de un acto al interesado, que es en sí misma una actuación dentro del procedimiento.

### El procedimiento como composición de actuaciones

El procedimiento no es una entidad abstracta separada de sus actuaciones: es, precisamente, la secuencia ordenada de ellas. No existe procedimiento sin actuaciones que lo compongan, del mismo modo en que no existe oración sin palabras que la compongan. Pero el procedimiento, como totalidad, tiene propiedades que ninguna actuación individual posee por sí sola: tiene un inicio y un fin, tiene un objetivo unificador, y tiene un resultado que es la consecuencia del conjunto, no de cualquier actuación aislada.

---

## Diferencias Conceptuales Fundamentales

### Caso y Procedimiento

El procedimiento es el patrón general de tramitación que la normativa o la práctica institucional define para un tipo de asunto (cómo se tramita, en general, una habilitación comercial). El caso es la instancia concreta de ese patrón aplicado a un asunto específico (la habilitación comercial de tal contribuyente). Un mismo procedimiento (tipo) da origen a múltiples casos (instancias) a lo largo del tiempo; cada caso sigue, en mayor o menor medida, el patrón de su procedimiento, pudiendo presentar variaciones conforme a sus circunstancias particulares.

### Procedimiento y Expediente

Esta es la distinción central de todo este documento. El procedimiento es la secuencia institucional de actuaciones orientada a producir un resultado. El expediente es el contenedor que registra, organiza y conserva esa secuencia (y, eventualmente, más de una secuencia relacionada) de forma cronológica y documental. El procedimiento es el proceso; el expediente es el registro de ese proceso. Un procedimiento puede desarrollarse y completarse sin que exista expediente formal (cuando la normativa o la práctica institucional prevén procedimientos de tramitación simplificada sin apertura de expediente), y un expediente puede contener, a lo largo de su existencia, más de un procedimiento relacionado (por ejemplo, un expediente de obra pública que contiene, sucesivamente, el procedimiento de aprobación del proyecto técnico, el procedimiento de contratación, y el procedimiento de recepción de la obra, cada uno con su propio inicio, desarrollo y cierre, dentro del mismo contenedor documental).

### Procedimiento y Workflow Técnico

El workflow técnico es la representación informática de una secuencia de pasos automatizados o semiautomatizados que un sistema ejecuta o coordina. El procedimiento administrativo es una realidad institucional y jurídica que existe con independencia de cualquier sistema informático: existía antes de que Muni Digital existiera, y seguiría existiendo si el municipio tramitara sus asuntos en soporte papel. El workflow técnico, cuando se diseñe en una etapa posterior de implementación, será la representación informática de (parte de) un procedimiento administrativo, pero no debe confundirse con él: el procedimiento es la realidad institucional; el workflow es, en el mejor de los casos, una herramienta que la asiste. Un procedimiento puede tener actuaciones que ningún workflow técnico automatiza (una conversación informal de asesoramiento, una decisión política deliberativa) y seguir siendo, plenamente, un procedimiento administrativo válido.

### Actuación y Acto Administrativo

No toda actuación es un acto administrativo. Una derivación, un informe técnico no vinculante o una observación son actuaciones que no, por sí mismas, producen los efectos jurídicos o administrativos que ADR-009 exige para calificar como acto administrativo. Sin embargo, ciertas actuaciones sí constituyen actos administrativos en el sentido pleno de ADR-009: una providencia que ordena un curso de acción, un dictamen (que es un acto de opinión, aunque no decisorio), una resolución que decide, una notificación que comunica formalmente. La actuación es la categoría más amplia; el acto administrativo es una subcategoría de actuación que cumple, además, con los elementos constitutivos exigidos por ADR-009.

### Expediente y Caso

El expediente es el contenedor documental. El caso es la instancia concreta del procedimiento que ese contenedor registra. En la enorme mayoría de las situaciones operativas del municipio, existe una correspondencia uno a uno entre caso y expediente: se abre un expediente para tramitar un caso determinado. Pero esta correspondencia no es conceptualmente necesaria: pueden existir casos sin expediente formal (procedimientos de tramitación simplificada) y expedientes que, a lo largo del tiempo, terminan conteniendo más de un caso relacionado entre sí (por ejemplo, cuando dos reclamos distintos sobre el mismo problema se unifican administrativamente en un mismo expediente para su tramitación conjunta, sin perder cada uno su identidad como caso individual a efectos de seguimiento y resultado).

---

## Tipos de Procedimientos

### Reclamos

El procedimiento de reclamos ciudadanos se inicia con la presentación de un vecino sobre un problema que afecta al espacio público, un servicio municipal o cualquier otra materia de competencia municipal. Se desarrolla mediante la derivación al área competente, la eventual producción de informes técnicos, y culmina con una resolución (formal o informal según la complejidad del reclamo) y la notificación de esa resolución al reclamante.

### Trámites

Los trámites, en sentido amplio, abarcan la generalidad de las solicitudes que un ciudadano o un contratista presenta ante el municipio buscando un resultado administrativo determinado (una habilitación, una certificación, una autorización). Cada tipo específico de trámite constituye, en rigor, un tipo de procedimiento particular con sus propios requisitos, actuaciones y resultado esperado.

### RRHH

Los procedimientos de RRHH (conforme a ADR-004) incluyen el ingreso de personal, los movimientos, las licencias, los cambios de cargo y las bajas laborales. Cada uno de estos asuntos sigue un procedimiento propio, con sus actuaciones características (solicitud, informe del área, dictamen cuando corresponda, resolución de aprobación o rechazo, notificación al empleado).

### Compras

El procedimiento de compras, en sus distintas modalidades (compra directa, concurso de precios, licitación), se desarrolla mediante la solicitud del área requirente, la verificación presupuestaria, la cotización o convocatoria a proveedores, la evaluación de las ofertas (eventualmente por un órgano colegiado, conforme a ADR-009), la adjudicación y la posterior orden de compra.

### Contrataciones

Las contrataciones de obras o servicios de mayor envergadura siguen un procedimiento más extenso, que incluye la elaboración de pliegos, el llamado a licitación, la apertura y evaluación de ofertas (frecuentemente por una comisión de adjudicación, que constituye un órgano colegiado conforme a ADR-009), la adjudicación, la firma del contrato y el seguimiento de su ejecución.

### Obras Públicas

El procedimiento de gestión de una obra pública, ya mencionado como ejemplo de procedimientos relacionados dentro de un mismo expediente, incluye sucesivamente el procedimiento de aprobación del proyecto técnico, el procedimiento de contratación (que puede a su vez remitirse al tipo de procedimiento de Contrataciones), el procedimiento de ejecución y certificación de avance de obra, y el procedimiento de recepción definitiva.

### HCD

Los procedimientos legislativos del HCD incluyen la presentación de proyectos de ordenanza, su giro a comisión, el tratamiento en comisión, el dictamen de comisión, el tratamiento en el recinto, la votación (acto colegiado conforme a ADR-009) y la posterior comunicación al Departamento Ejecutivo para su promulgación.

### Gobierno Electrónico

Los procedimientos de gobierno electrónico, en sentido transversal, son aquellos cuyo canal principal de inicio o interacción con el ciudadano se desarrolla a través de medios digitales (el portal de trámites, una aplicación móvil). El canal de interacción no altera la naturaleza institucional del procedimiento subyacente: un trámite iniciado digitalmente sigue siendo, en su esencia, el mismo tipo de procedimiento que si se iniciara en papel ante una mesa de entradas física.

### Procedimientos Internos

Los procedimientos internos son aquellos cuyos participantes son exclusivamente actores de la propia institución (empleados, posiciones, áreas), sin intervención directa de un interesado externo: por ejemplo, un procedimiento de reorganización interna de un área, o un procedimiento de evaluación de desempeño.

### Procedimientos Externos

Los procedimientos externos son aquellos iniciados o que involucran directamente a un interesado externo a la institución: un ciudadano, un contratista, otra institución. La mayoría de los reclamos, trámites y contrataciones son procedimientos externos en este sentido.

---

## Participantes del Procedimiento

### Ciudadano

Conforme a ADR-006, el ciudadano puede ser el participante que inicia un procedimiento externo (un reclamo, una solicitud de habilitación) y que recibe, eventualmente, la notificación de su resultado. Su intervención en el procedimiento está acotada a la presentación inicial, la eventual respuesta a solicitudes de información adicional, y la recepción de notificaciones, sin intervenir en las actuaciones internas de análisis y decisión.

### Empleado

Conforme a ADR-004, el empleado interviene en el procedimiento produciendo actuaciones dentro del ámbito de su función: informes, derivaciones, observaciones, correcciones. Su intervención está delimitada por el área y la función que ADR-004 y ADR-007 le asignan.

### Posición

Conforme a ADR-007, la posición es el ancla institucional de la competencia para intervenir o decidir en un procedimiento determinado. No es la persona la que tiene competencia para intervenir en un tipo de procedimiento, sino la posición que ocupa, conforme al organigrama institucional.

### Autoridad

Conforme a ADR-008, la autoridad es el mecanismo por el cual la competencia de una posición se ejerce efectivamente, en cualquiera de sus cinco caracteres (titular, delegado, suplente, interino, sucesor), para producir las actuaciones decisorias del procedimiento, especialmente aquellas que constituyen actos administrativos conforme a ADR-009.

### Órgano Colegiado

Conforme a ADR-009, ciertos procedimientos requieren la intervención de un órgano colegiado (una comisión de adjudicación, el HCD en pleno) cuya voluntad institucional se forma por deliberación y voto, y cuya intervención en el procedimiento se registra como la actuación de ese órgano colectivo, no como la suma de actuaciones individuales de sus integrantes.

### Institución

Conforme a ADR-001, todo procedimiento se desarrolla dentro del ámbito de una institución determinada (Municipalidad, HCD, Hospital), cuyo aislamiento organizacional respecto de las demás instituciones se mantiene también a nivel de procedimientos: un procedimiento de la Municipalidad no se mezcla, salvo previsión expresa de derivación interinstitucional, con un procedimiento del HCD.

---

## Estados del Procedimiento

### Iniciado

El procedimiento está en estado iniciado cuando se ha producido el hecho institucional que lo origina (la presentación, la iniciativa de oficio, el evento normativamente determinado), pero todavía no se ha producido ninguna actuación de desarrollo sustantivo más allá de su registro inicial.

### En Trámite

El procedimiento está en trámite cuando se están produciendo sus actuaciones de desarrollo: derivaciones, solicitudes de informes, intervenciones de las áreas competentes, sin que todavía se haya alcanzado una etapa de decisión.

### Pendiente de Información

El procedimiento está pendiente de información cuando su avance depende de que el interesado o un tercero aporte documentación, datos o subsanaciones que son condición necesaria para continuar, y esa información todavía no ha sido proporcionada.

### En Análisis

El procedimiento está en análisis cuando las áreas técnicas o competentes están evaluando la información disponible para formar un criterio que sustente la decisión, sin haber todavía emitido su informe o dictamen conclusivo.

### En Revisión

El procedimiento está en revisión cuando, habiéndose producido un análisis o una propuesta de decisión, esta es sometida a control previo por una instancia técnica, legal o jerárquica adicional, conforme a lo ya desarrollado en ADR-009 para el acto administrativo en particular.

### Pendiente de Decisión

El procedimiento está pendiente de decisión cuando ha completado todas las etapas de desarrollo, análisis y revisión, y se encuentra a la espera de que la autoridad competente, conforme a ADR-008, forme y exprese su voluntad institucional final.

### Decidido

El procedimiento está decidido cuando la autoridad competente ha producido el acto administrativo (o los actos administrativos) que constituyen su resultado, conforme a ADR-009, aunque ese acto pueda todavía no haber sido notificado al interesado.

### Notificado

El procedimiento está notificado cuando el resultado decidido ha sido formalmente comunicado al interesado, conforme a los requisitos de notificación que correspondan al tipo de acto producido.

### Finalizado

El procedimiento está finalizado cuando se han cumplido todas las etapas sustantivas previstas (decisión y notificación cuando corresponda) y no queda ninguna actuación pendiente de desarrollo, sin que esto implique todavía su paso al régimen de conservación archivística.

### Archivado

El procedimiento está archivado cuando, habiendo finalizado, se conserva conforme a los principios de conservación histórica de ADR-005, accesible para consulta y auditoría pero fuera del circuito de gestión operativa activa.

---

## Estados del Expediente

### Abierto

El expediente está abierto cuando ha sido creado como contenedor para el registro de un asunto determinado, independientemente de si el procedimiento o los procedimientos que contendrá ya iniciaron su desarrollo sustantivo.

### Activo

El expediente está activo cuando contiene al menos un procedimiento en desarrollo (en cualquiera de los estados de procedimiento "en trámite", "pendiente de información", "en análisis", "en revisión" o "pendiente de decisión").

### Suspendido

El expediente está suspendido cuando, por decisión institucional o por una causa prevista normativamente, se interrumpe temporalmente su tramitación activa, sin que ello implique su cierre definitivo.

### Cerrado

El expediente está cerrado cuando todos los procedimientos que contiene han alcanzado su estado de finalizado, y no se prevé la apertura de nuevos procedimientos dentro de ese mismo contenedor.

### Archivado

El expediente está archivado cuando, habiendo sido cerrado, se conserva conforme a los principios de conservación histórica de ADR-005.

### Por qué estos estados son distintos de los del procedimiento

Los estados del expediente describen la condición del contenedor documental: si está recibiendo actuaciones, si estas están temporalmente detenidas, si ya no se espera ninguna actuación adicional. Los estados del procedimiento describen la condición de la secuencia institucional concreta orientada a un resultado: en qué etapa de su desarrollo, análisis, decisión o notificación se encuentra. Un expediente puede estar en estado "activo" mientras contiene, simultáneamente, un procedimiento en estado "decidido" (que ya produjo su acto, pero la notificación todavía no se completó) y otro procedimiento en estado "iniciado" (que recién comienza su propio desarrollo dentro del mismo contenedor). Mapear uno a uno los estados del expediente con los estados de un único procedimiento que se asume contenido en él es el error que este documento busca prevenir: el expediente puede contener más de un procedimiento, cada uno con su propio estado, y el estado del expediente refleja la condición del contenedor en su conjunto, no la de ninguno de los procedimientos individualmente.

---

## Ciclo de Vida del Procedimiento

### Creación

El procedimiento se crea conceptualmente cuando se identifica el tipo de asunto que dará origen a una secuencia de actuaciones orientada a un resultado determinado, conforme al tipo de procedimiento aplicable (reclamo, trámite, licencia, compra, contratación).

### Recepción

La recepción es el momento en que la institución toma conocimiento formal del asunto: la presentación del interesado es recibida por el área correspondiente (frecuentemente Mesa de Entradas), o la iniciativa de oficio queda formalmente registrada por la propia administración.

### Validación

La validación verifica que la presentación cumple con los requisitos formales mínimos para dar curso al procedimiento (documentación completa, competencia del área receptora, cumplimiento de plazos cuando corresponda), antes de avanzar a su tramitación sustantiva.

### Tramitación

La tramitación es el desarrollo sustantivo del procedimiento, conforme a la secuencia de actuaciones que su tipo específico requiere.

### Intervenciones

Las intervenciones son las actuaciones concretas de cada participante a lo largo de la tramitación, conforme a su competencia y carácter de actuación.

### Controles

Los controles son las instancias de revisión técnica, legal o jerárquica que el procedimiento atraviesa antes de su decisión final.

### Decisión

La decisión es el momento en que la autoridad competente, conforme a ADR-008, forma su voluntad institucional sobre el asunto, produciendo el acto o actos administrativos correspondientes conforme a ADR-009.

### Notificación

La notificación comunica formalmente la decisión al interesado, conforme a los requisitos del tipo de acto producido.

### Cierre

El cierre del procedimiento se produce cuando se han completado todas sus etapas sustantivas (incluida la notificación, cuando corresponda) sin que quede ninguna actuación pendiente.

### Archivo

El archivo es la conservación del procedimiento finalizado conforme a los principios de ADR-005, dentro del expediente que lo contiene, o de forma independiente si el procedimiento se tramitó sin expediente formal.

---

## Procedimientos Paralelos

En la operación municipal real, es extremadamente frecuente que un mismo caso requiera la intervención simultánea de más de un área especializada, cuyas actuaciones se desarrollan en paralelo antes de converger en una decisión común.

### Ejemplo de informes paralelos

Una solicitud de contratación de una obra de cierta envergadura puede requerir, simultáneamente, un informe legal sobre la adecuación del procedimiento de contratación elegido, un informe técnico sobre la factibilidad de la obra proyectada, y un informe contable sobre la disponibilidad presupuestaria para afrontarla. Estos tres informes pueden producirse en paralelo, sin que uno dependa necesariamente de la finalización del otro, y sin que el orden en que cada área complete su informe esté predeterminado.

### Convergencia

La convergencia es el punto del procedimiento en el cual las actuaciones paralelas, una vez completadas, se reúnen para permitir que la autoridad competente tome la decisión final con la totalidad de los elementos disponibles. El procedimiento no puede avanzar a su etapa de decisión hasta que todas las actuaciones paralelas requeridas hayan convergido, salvo que la normativa o la práctica institucional prevean que la decisión pueda tomarse con elementos parciales en determinadas circunstancias.

### Dependencia

La dependencia describe la relación entre actuaciones paralelas cuando, aunque se desarrollan simultáneamente en términos generales, una de ellas requiere como insumo el resultado parcial de otra antes de poder completarse (por ejemplo, el informe contable puede requerir conocer el resultado preliminar del informe técnico para estimar correctamente el costo). El modelo conceptual debe reconocer que el paralelismo no siempre es absoluto: puede existir paralelismo con dependencias parciales entre las actuaciones que se desarrollan simultáneamente.

### Sincronización Institucional

La sincronización institucional es el mecanismo (de gestión, no técnico) mediante el cual la institución garantiza que, antes de avanzar a la etapa de decisión, todas las actuaciones paralelas requeridas han sido efectivamente completadas y están disponibles para la autoridad decisoria. Este documento no define mecanismos técnicos de sincronización (que corresponden al diseño técnico posterior); establece el principio institucional de que el procedimiento debe contemplar, en su diseño conceptual, la posibilidad de actuaciones paralelas con su correspondiente punto de convergencia antes de la decisión.

---

## Procedimientos Suspendidos

### Suspensión

Un procedimiento puede suspenderse cuando una circunstancia sobreviniente impide su continuación normal sin que se considere extinguido: la interposición de un recurso que paraliza la tramitación de otro asunto conexo, la necesidad de aguardar una decisión externa (judicial, de otro organismo), o una decisión institucional de pausar la tramitación por razones de oportunidad.

### Reanudación

La reanudación es el acto institucional por el cual un procedimiento suspendido retoma su tramitación activa, una vez superada o resuelta la circunstancia que motivó la suspensión.

### Caducidad

La caducidad es la extinción del procedimiento por el transcurso de un plazo determinado sin que se haya producido la actuación que correspondía al interesado o a la propia administración, conforme lo establezca el marco normativo aplicable a ese tipo de procedimiento. La caducidad opera, en general, independientemente de la voluntad de las partes, por el solo transcurso del tiempo previsto.

### Abandono

El abandono es la inactividad prolongada del interesado en el impulso de un procedimiento que requiere su intervención, distinta de la caducidad en que el abandono puede requerir, según el marco normativo, una declaración expresa de la administración para producir la extinción del procedimiento, mientras que la caducidad puede operar de forma más automática.

### Desistimiento

El desistimiento es la manifestación expresa del interesado de no continuar con el procedimiento que él mismo inició, lo cual produce su extinción sin que se llegue a una decisión sobre el fondo del asunto planteado.

---

## Procedimientos sin Acto Administrativo

No todo procedimiento culmina en un acto administrativo formal en el sentido pleno de ADR-009. Los siguientes son ejemplos reales de esta situación, que el modelo conceptual debe representar sin forzar la existencia de un acto donde institucionalmente no lo hay.

Un reclamo ciudadano resuelto mediante la simple subsanación material del problema reportado (por ejemplo, la reparación de una luminaria) puede no requerir, según la práctica institucional, ningún acto administrativo formal: el procedimiento se inicia con la presentación, se desarrolla con la derivación al área de mantenimiento, y se cierra con la constatación de que la reparación fue efectuada, sin que medie una resolución formal sobre el fondo.

Un trámite que culmina en desistimiento del interesado no produce ningún acto decisorio sobre el fondo: el procedimiento se extingue por la sola manifestación de voluntad del interesado, registrada como una actuación, sin que sea necesario ni apropiado que la administración dicte una resolución decidiendo sobre algo que el propio interesado ya no pretende.

Un procedimiento interno de mera coordinación entre áreas, que culmina en un acuerdo operativo informal sin trascendencia jurídica externa, puede no requerir ningún acto administrativo formal para su cierre, bastando el registro de las actuaciones que documentan el acuerdo alcanzado.

---

## Procedimientos con Múltiples Actos Administrativos

En relación directa con ADR-009, un único procedimiento puede producir, a lo largo de su desarrollo, más de un acto administrativo, cada uno con su propio carácter, su propia autoridad competente y su propio momento de producción.

Un procedimiento de contratación de obra pública puede producir, sucesivamente: una providencia que da curso al expediente, un dictamen de asesoría legal sobre la modalidad de contratación elegida, una resolución que aprueba el pliego de bases y condiciones, un acto colegiado de la comisión de adjudicación que dictamina sobre las ofertas recibidas, una resolución de adjudicación, y una notificación al adjudicatario. Cada uno de estos actos es un objeto institucional propio conforme a ADR-009, y todos ellos se producen dentro del desarrollo de un único procedimiento de contratación, registrados dentro del mismo expediente (o de expedientes relacionados, según la práctica institucional aplicable).

Este documento establece que el modelo conceptual debe permitir asociar, a un mismo procedimiento, tantos actos administrativos como su desarrollo efectivamente produzca, sin forzar la idea de que un procedimiento se corresponde necesariamente con un único acto final.

---

## Relación con ADR-009 — Administrative Act & Resolution Model

La relación entre este documento y ADR-009 es de generación: el procedimiento produce actos administrativos; el acto administrativo, por sí mismo, no produce procedimientos. El procedimiento es la secuencia institucional que antecede, contextualiza y da origen al acto; una vez producido el acto, este adquiere la existencia independiente que ADR-009 le reconoce (independiente del expediente, del documento y de la firma), pero esa independencia no borra el hecho de que, institucionalmente, el acto fue el resultado de un procedimiento que lo precedió.

Un mismo procedimiento puede dar origen a varios actos sucesivos (conforme a la sección anterior), y un acto administrativo aislado (por ejemplo, una certificación de emisión directa, conforme ya reconoció ADR-009) puede no requerir, según la práctica institucional, un procedimiento previo de desarrollo extenso, bastando un procedimiento mínimo de recepción y verificación.

---

## Relación con ADR-008 — Organizational Authority & Delegation Model

ADR-008 estableció quién puede intervenir, decidir y firmar dentro de la institución, a través de los conceptos de autoridad, competencia, delegación, sustitución y sucesión. Este documento aplica ese marco a la pregunta de quién puede intervenir en cada actuación de un procedimiento determinado: la posición competente conforme a ADR-007, ejercida por quien válidamente la ocupa en el carácter correspondiente conforme a ADR-008.

Las actuaciones que constituyen decisiones (y que, por lo tanto, constituyen actos administrativos conforme a ADR-009) requieren que quien las produce esté ejerciendo válidamente la autoridad de la posición competente. Las actuaciones que no constituyen decisiones (informes, derivaciones, observaciones) requieren, igualmente, que quien las produce tenga la competencia funcional para hacerlo, aunque sin la misma exigencia de carácter de ejercicio de autoridad que se requiere para los actos decisorios propiamente dichos.

---

## Relación con ADR-007 — Organizational Position Model

La competencia para intervenir en un tipo de procedimiento determinado es un atributo de la posición organizacional, conforme a ADR-007, no de la persona que en cada momento la ocupa. El procedimiento de habilitaciones comerciales requiere la intervención de la posición competente en esa materia dentro del organigrama institucional, independientemente de qué persona ocupe esa posición en un momento dado. Cuando la posición cambia de ocupante (por movimiento de personal, conforme a ADR-004, o por cambio de designación, conforme a ADR-007), la competencia sobre el procedimiento permanece intacta: lo que cambia es quién, en cada momento, la ejerce.

---

## Relación con ADR-005 — Audit Model

Todo evento relevante del ciclo de vida de un procedimiento es auditoría obligatoria conforme a ADR-005, dado que se trata de eventos con consecuencia institucional directa sobre la tramitación de asuntos que afectan a empleados, ciudadanos o a la propia organización municipal.

**Inicio:** El registro del inicio de un procedimiento, con identificación de su origen (presentación, oficio, evento normativo) y de su tipo, es auditoría obligatoria.

**Actuación:** Cada actuación producida dentro del desarrollo del procedimiento, con identificación del participante que la produjo, su carácter de intervención y su contenido, es auditoría obligatoria, conforme al criterio de sensibilidad y trascendencia institucional que cada tipo de actuación amerite según ADR-005.

**Derivación:** El traslado de un asunto de un área a otra, con identificación de la posición de origen y destino, es auditoría obligatoria.

**Decisión:** La producción del acto o actos administrativos que constituyen el resultado del procedimiento es auditoría obligatoria, conforme ya estableció ADR-009 para el ciclo de vida del acto.

**Cierre:** El paso del procedimiento a su estado de finalizado, con identificación de la causa de finalización (cumplimiento del objeto, desistimiento, caducidad, abandono), es auditoría obligatoria.

El registro de auditoría de un procedimiento, en su conjunto, es lo que permite reconstruir la totalidad de su desarrollo: cada actuación, cada participante interviniente, cada control atravesado, hasta su resultado final, constituyendo la base de la trazabilidad institucional que este documento busca garantizar.

---

## Relación con Expedientes

El expediente, conforme a ADR-009 y a la extensión que este documento desarrolla, es el registro cronológico que conserva las actuaciones de uno o más procedimientos relacionados. El expediente no decide, no tramita y no produce resultados por sí mismo: es la memoria documental ordenada de lo que el procedimiento (o los procedimientos) que contiene efectivamente hicieron.

Esta relación de registro, y no de identidad, es la que permite al modelo representar correctamente las situaciones reales de la operación municipal: un expediente de obra pública que, a lo largo de los años, registra sucesivamente el procedimiento de aprobación del proyecto, el procedimiento de contratación, el procedimiento de ejecución y certificación, y el procedimiento de recepción definitiva, sin que el expediente deba cerrarse y reabrirse artificialmente cada vez que uno de esos procedimientos internos culmina y el siguiente comienza.

---

## Historial

Todo procedimiento, conforme a los principios de ADR-005, conserva un historial completo e inmutable de su desarrollo: su inicio, cada actuación producida en su transcurso (con su participante, su carácter de intervención y su contenido), las instancias de control atravesadas, su decisión final (con los actos administrativos producidos, conforme a ADR-009), su notificación, y su cierre.

Este historial permite reconstruir, en cualquier momento posterior, la totalidad del desarrollo institucional de un caso determinado: quién intervino, en qué momento, con qué competencia, qué controles se cumplieron, y cómo se llegó al resultado final. Esta capacidad de reconstrucción es la base de la transparencia institucional frente a la ciudadanía, de la defensa del municipio ante recursos administrativos o procesos judiciales, y de la auditoría de organismos de control.

La trazabilidad del procedimiento se integra con la trazabilidad del acto administrativo (ADR-009), la trazabilidad de la autoridad que intervino (ADR-008), la trazabilidad de la posición competente (ADR-007), y la trazabilidad de la identidad de cada participante (ADR-006), formando una cadena de evidencia institucional completa que recorre, sin quiebres, desde el inicio del caso hasta su resultado final.

---

## Riesgos

### CRÍTICO

**Confundir procedimiento con expediente.** Si el sistema trata al expediente como si fuera el procedimiento mismo, pierde la capacidad de representar expedientes que contienen múltiples procedimientos relacionados, procedimientos que se tramitan sin expediente formal, y la granularidad de actuaciones que componen cada procedimiento individual. Este es el riesgo central que todo este documento busca prevenir, y el que con mayor probabilidad reaparecerá en cualquier diseño técnico que no haya internalizado la distinción.

**Confundir caso con expediente.** Si el sistema asume una correspondencia obligatoria de uno a uno entre caso y expediente, no puede representar la unificación administrativa de varios casos relacionados en un mismo expediente, ni la tramitación de un caso sin apertura de expediente formal cuando la normativa lo permite.

**Confundir actuación con acto administrativo.** Si el sistema trata toda actuación (una derivación, un informe) como si tuviera el mismo valor institucional que un acto administrativo conforme a ADR-009, se produce una inflación del concepto de acto que diluye su trascendencia jurídica real, o, en sentido inverso, si se exige a toda actuación los requisitos formales propios de un acto administrativo, se introduce una rigidez operativa que entorpece el desarrollo cotidiano del procedimiento.

**Confundir procedimiento con workflow técnico.** Si se asume que el procedimiento administrativo es equivalente a su futura representación informática (el workflow técnico), el diseño conceptual queda contaminado por consideraciones de implementación prematuras, y se corre el riesgo de que el modelo institucional termine ajustándose a las limitaciones de una herramienta técnica en lugar de que la herramienta técnica se diseñe para representar fielmente la realidad institucional.

**Confundir el estado del procedimiento con el estado del expediente.** Si el sistema mapea de forma rígida un único estado de expediente a un único estado de procedimiento, no puede representar la situación real y frecuente de un expediente activo que contiene, simultáneamente, procedimientos en distintos estados de avance.

**Procedimiento sin verificación de competencia de quien interviene.** Si el sistema permite que cualquier participante produzca cualquier actuación sin verificar su competencia conforme a ADR-007 y ADR-008, se pierde la garantía institucional de que cada intervención provino de quien estaba legítimamente habilitado para producirla.

**Decisión registrada sin el acto administrativo correspondiente.** Si el procedimiento se marca como "decidido" sin que exista un acto administrativo formalmente constituido conforme a ADR-009 que sustente esa decisión, se rompe la cadena de validez institucional entre el procedimiento y su resultado.

**Eliminación del historial de actuaciones de un procedimiento.** Si el sistema permite borrar o alterar retroactivamente el registro de actuaciones ya producidas, se vulnera el principio de inmutabilidad histórica de ADR-005 y se compromete la trazabilidad institucional completa del caso.

**Procedimientos paralelos sin punto de convergencia definido.** Si el sistema no contempla un mecanismo institucional para garantizar que todas las actuaciones paralelas requeridas (informes legal, técnico, contable) converjan antes de la decisión final, se corre el riesgo de que la autoridad decida sin contar con todos los elementos que el procedimiento exige.

**Caducidad o abandono no distinguidos de un cierre por resultado sustantivo.** Si el sistema no diferencia un procedimiento finalizado por haber alcanzado su objeto sustantivo de uno extinguido por caducidad, abandono o desistimiento, se pierde información institucional relevante sobre la efectividad de la gestión municipal y sobre los derechos del interesado en cada situación.

### ALTO

**Falta de registro del carácter de cada intervención.** Si una actuación no identifica con precisión en qué carácter intervino el participante (como titular de su posición, como delegado, como suplente conforme a ADR-008), se debilita la trazabilidad de la cadena de responsabilidad institucional.

**Procedimientos suspendidos sin causa documentada.** Si la suspensión de un procedimiento no registra explícitamente su causa y, cuando corresponda, su plazo previsto, la situación del caso queda ambigua tanto para la gestión interna como para el interesado que aguarda una respuesta.

**Reanudación de un procedimiento suspendido sin verificación de la persistencia de la competencia.** Si al reanudar un procedimiento suspendido durante un período prolongado no se verifica que la posición competente sigue siendo la misma (puede haber habido una reestructuración conforme a ADR-007), se corre el riesgo de continuar la tramitación bajo una competencia que ya no corresponde.

**Falta de distinción entre procedimientos internos y externos en el tratamiento de plazos.** Si el sistema no diferencia los procedimientos que involucran a un interesado externo (con plazos y garantías procedimentales propias del derecho administrativo) de los procedimientos puramente internos, puede aplicar criterios de plazo o notificación inadecuados a cada caso.

**Procedimientos de tipo no estandarizado entre áreas.** Si cada área define a su propio criterio qué constituye un "tipo de procedimiento" sin un catálogo institucional compartido, la comparación, el reporte y la auditoría consolidada entre áreas o instituciones se vuelve considerablemente más compleja.

**Notificación no registrada como actuación distinta de la decisión.** Si la notificación al interesado no se trata como una actuación propia con su propia fecha y constancia, se pierde precisión sobre el momento exacto a partir del cual comienzan a correr los plazos de impugnación del interesado, en línea con el riesgo ya identificado en ADR-009.

**Falta de vínculo explícito entre actuaciones paralelas y el procedimiento que las contiene.** Si los informes producidos en paralelo (legal, técnico, contable) no quedan vinculados de forma clara al mismo procedimiento que los originó, la reconstrucción posterior de cómo se llegó a la decisión final se dificulta.

**Procedimientos que se inician sin verificar la existencia de un procedimiento previo relacionado.** Si el sistema no permite verificar fácilmente si ya existe un procedimiento en curso sobre el mismo asunto (por ejemplo, un segundo reclamo del mismo vecino sobre el mismo problema), se puede producir una duplicación de esfuerzos y una fragmentación innecesaria de la gestión.

**Falta de alertas ante procedimientos cercanos a su plazo de caducidad.** Si el sistema no advierte oportunamente que un procedimiento se aproxima al vencimiento del plazo que produciría su caducidad, se incrementa el riesgo de que se pierdan derechos o expectativas legítimas por mera inacción no advertida a tiempo.

**Abandono declarado sin la formalidad que el marco normativo pueda requerir.** Si el sistema permite cerrar un procedimiento por abandono sin que medie la declaración expresa que, según el tipo de procedimiento, pueda ser normativamente requerida, se compromete la validez de ese cierre.

### MEDIO

**Catálogo de tipos de procedimientos incompleto o desactualizado.** Si el catálogo institucional de tipos de procedimientos no se mantiene actualizado conforme surgen nuevas modalidades de gestión, las áreas pueden verse forzadas a clasificar casos nuevos bajo tipos preexistentes que no los representan adecuadamente.

**Falta de plantillas de actuaciones recurrentes.** La ausencia de modelos estandarizados para las actuaciones más frecuentes (solicitudes de informe, observaciones típicas) puede generar inconsistencias de redacción y de criterio entre distintas áreas que producen actuaciones similares.

**Procedimientos internos tratados con el mismo rigor formal que los externos.** Si los procedimientos puramente internos, sin interesado externo involucrado, se sometan a las mismas exigencias de notificación formal y plazo que los procedimientos externos, se introduce una carga operativa innecesaria sin beneficio institucional correspondiente.

**Ausencia de un criterio uniforme para decidir cuándo unificar varios casos en un mismo expediente.** Sin un criterio institucional claro, distintas áreas pueden adoptar prácticas heterogéneas sobre cuándo conviene unificar la tramitación de casos relacionados, generando inconsistencias en la organización documental.

**Falta de visibilidad consolidada de los procedimientos paralelos en curso dentro de un mismo caso.** Si no existe una vista que permita observar, en conjunto, el estado de avance de todas las actuaciones paralelas de un caso, la gestión cotidiana del seguimiento se vuelve más trabajosa.

**Procedimientos suspendidos sin revisión periódica de su situación.** Si no existe un proceso de revisión periódica de los procedimientos suspendidos, estos pueden permanecer en ese estado más tiempo del necesario, sin que la institución lo advierta activamente.

**Terminología inconsistente para describir los estados del procedimiento entre distintas áreas.** El uso de términos distintos para describir situaciones equivalentes ("en análisis" en un área, "en estudio" en otra) dificulta la generación de reportes consolidados y la comprensión cruzada entre áreas.

**Falta de un mecanismo para vincular procedimientos sucesivos dentro de un mismo expediente de larga duración.** En expedientes como los de obra pública, que contienen procedimientos sucesivos a lo largo de los años, la ausencia de un criterio claro para señalar dónde termina uno y comienza el siguiente puede dificultar la lectura histórica del expediente.

**Ausencia de indicadores de gestión sobre tiempos de tramitación por tipo de procedimiento.** Sin esta información agregada, la institución pierde la posibilidad de identificar cuellos de botella recurrentes en determinados tipos de procedimientos.

**Procedimientos externos sin información clara para el interesado sobre su estado actual.** Si el ciudadano no puede conocer con facilidad en qué etapa se encuentra su trámite, aumenta la carga de consultas informales hacia las áreas administrativas, generando ineficiencia operativa.

### BAJO

**Diferencias de nomenclatura entre instituciones para tipos de procedimientos equivalentes.** No constituye un riesgo institucional grave pero dificulta la comparación cruzada entre la Municipalidad, el HCD y el Hospital.

**Falta de un glosario institucional accesible sobre los tipos de actuaciones más frecuentes.** Dificulta la capacitación de personal nuevo, sin comprometer la validez de las actuaciones ya producidas.

**Ausencia de numeración correlativa unificada de procedimientos dentro de un mismo expediente extenso.** Puede dificultar la referencia rápida a un procedimiento específico dentro de un expediente con larga historia, sin afectar la validez de su tramitación.

**Variabilidad de estilo en la redacción de actuaciones de mero trámite.** No compromete la validez institucional de la actuación, aunque puede dificultar levemente su lectura comparada.

**Falta de resumen consolidado del estado de un caso para consulta rápida.** No afecta la validez del procedimiento, pero puede requerir mayor esfuerzo de consulta para obtener una vista rápida de su situación actual.

---

## Principios del Modelo

### Legalidad

Todo procedimiento administrativo debe desarrollarse conforme al marco normativo aplicable a su tipo, con las actuaciones, plazos y garantías que ese marco prevé para los interesados.

### Competencia

La competencia para intervenir en cada actuación de un procedimiento es un atributo de la posición organizacional (ADR-007), ejercida por quien válidamente la ocupa conforme a ADR-008, nunca un atributo de la persona en sí misma.

### Trazabilidad

Todo procedimiento debe poder reconstruirse en su totalidad: su inicio, cada actuación producida, cada participante interviniente, los controles atravesados, su decisión y su cierre.

### Continuidad

La tramitación de un procedimiento no debe interrumpirse de forma injustificada por la ausencia, vacancia o cambio de la persona que ocupa la posición competente, en virtud de los mecanismos de delegación, sustitución y sucesión ya garantizados por ADR-008.

### Auditoría

Todo evento relevante del ciclo de vida del procedimiento (inicio, actuación, derivación, decisión, cierre) constituye auditoría obligatoria conforme a ADR-005, sin excepción.

### Transparencia

El desarrollo del procedimiento debe ser, en la medida que el marco normativo lo permita, accesible para consulta por parte del interesado externo, de modo que pueda conocer el estado de su caso sin requerir gestiones informales adicionales.

### No Repudio

Ningún participante puede negar haber producido una actuación válidamente registrada conforme a este modelo, en línea con los principios de no repudio ya establecidos en ADR-005 y ADR-008.

### Separación entre Procedimiento y Expediente

El procedimiento es la secuencia institucional de actuaciones; el expediente es el contenedor documental que la registra y conserva. Esta separación es absoluta y no admite excepciones de diseño que las colapsen en un único objeto.

### Separación entre Procedimiento y Workflow

El procedimiento administrativo es una realidad institucional y jurídica independiente de cualquier sistema informático. El workflow técnico, cuando se diseñe, es una herramienta que asiste la gestión del procedimiento, no su definición constitutiva.

### Inmutabilidad Histórica

El historial de actuaciones de un procedimiento, una vez registrado, no puede modificarse ni eliminarse. Toda corrección posterior se expresa mediante una nueva actuación que se suma al historial, nunca mediante la alteración del registro original.

---

## Administrative Procedure & Case Lifecycle Model v1 Recomendado

El modelo conceptual de procedimientos administrativos y ciclo de vida de casos de Muni Digital se define de la siguiente manera:

### El procedimiento como secuencia institucional independiente del expediente

El procedimiento administrativo es la secuencia ordenada de actuaciones que conduce, desde un inicio identificable, hasta un resultado administrativo (uno o más actos conforme a ADR-009, o su extinción anticipada). El expediente es el contenedor documental que registra y conserva uno o más procedimientos relacionados, sin ser, en ningún caso, equivalente a ninguno de ellos.

### El caso como instancia concreta de un tipo de procedimiento

Todo asunto administrativo concreto (un reclamo, una licencia, una compra, una habilitación, una contratación) es un caso: la realización singular de un tipo de procedimiento general, con sus propios participantes, su propio objeto y su propio resultado esperado.

### La actuación como unidad elemental del desarrollo procedimental

El procedimiento se compone de actuaciones sucesivas o paralelas (derivaciones, informes, dictámenes, solicitudes, observaciones, correcciones, aprobaciones, rechazos, firmas, notificaciones), cada una con su participante, su carácter de intervención y su contenido propio. No toda actuación constituye un acto administrativo en el sentido pleno de ADR-009; solo aquellas que cumplen sus elementos constitutivos.

### Los estados del procedimiento y del expediente como conjuntos distintos

El procedimiento recorre los estados de iniciado, en trámite, pendiente de información, en análisis, en revisión, pendiente de decisión, decidido, notificado, finalizado y archivado. El expediente recorre los estados de abierto, activo, suspendido, cerrado y archivado. Un expediente puede contener simultáneamente procedimientos en distintos estados, y su propio estado refleja la condición del contenedor, no la de ningún procedimiento individual.

### Los procedimientos paralelos como realidad institucional reconocida

El modelo admite y representa la existencia de actuaciones paralelas dentro de un mismo procedimiento (informes legal, técnico y contable simultáneos), con su correspondiente punto de convergencia institucional antes de la decisión final.

### La competencia y la autoridad como fundamento de cada intervención

Toda actuación, y en particular toda decisión, requiere que quien la produce ejerza válidamente la competencia de la posición correspondiente (ADR-007), en el carácter de autoridad que corresponda (ADR-008), conforme al marco ya establecido por esos documentos.

### La auditoría y la inmutabilidad como condición de validez institucional

Todo evento relevante del ciclo de vida del procedimiento es auditoría obligatoria conforme a ADR-005, y su historial, una vez registrado, es inmutable, constituyendo la base de la trazabilidad y la transparencia institucional que el modelo garantiza.

### La separación absoluta respecto del workflow técnico

El procedimiento administrativo es una realidad institucional que el diseño técnico futuro deberá representar fielmente, sin que las limitaciones o conveniencias de una herramienta informática determinada puedan alterar su definición conceptual.

---

## Roadmap Conceptual

### P0 — Aprobación conceptual

**Objetivo:** Validar y aprobar este documento como fuente de verdad conceptual para los procedimientos administrativos y el ciclo de vida de casos en Muni Digital.

Dependencias: ADR-001 a ADR-009 aprobados. Este documento revisado por el equipo de arquitectura, los referentes legales o de asesoría jurídica municipal (dado que los tipos de procedimientos, plazos, caducidad y abandono dependen del marco normativo aplicable), y los referentes operativos de las áreas que tramitan los principales tipos de procedimientos identificados (Mesa de Entradas, RRHH, Compras, Obras Públicas).

Criterio de cierre: El equipo puede responder sin ambigüedad qué es un procedimiento administrativo, en qué se diferencia de un expediente, de un caso, de una actuación y de un workflow técnico, qué estados recorre un procedimiento y por qué son distintos de los estados de un expediente, y por qué un expediente puede contener más de un procedimiento. Los referentes legales confirman que la tipología de procedimientos y el tratamiento de suspensión, caducidad y abandono es compatible con el marco normativo aplicable.

Riesgo: CRÍTICO si los módulos de Mesa de Entradas, Reclamos, Compras o Expedientes inician su diseño técnico sin este modelo aprobado. La ausencia de este modelo obliga a cada módulo a decidir ad hoc qué es un "trámite" en el sistema, reproduciendo exactamente la confusión central entre procedimiento y expediente que este documento busca eliminar.

---

### P1 — Diseño técnico

**Objetivo:** Traducir el modelo conceptual en decisiones de diseño técnico: cómo se representa el procedimiento como objeto independiente del expediente, cómo se modelan sus estados y su ciclo de vida, cómo se representan las actuaciones y sus participantes, cómo se vincula con la competencia de la posición (ADR-007) y la autoridad (ADR-008), y cómo se representan los procedimientos paralelos y su convergencia.

Dependencias: P0 cerrado. ADR-007, ADR-008 y ADR-009 implementados en su diseño técnico (modelo de posiciones, autoridad y actos disponibles para anclar la competencia de cada actuación y la producción de resultados). ADR-005 implementado en su diseño técnico (capa de auditoría disponible para registrar los eventos del ciclo de vida del procedimiento).

Criterio de cierre: El diseño técnico mantiene la independencia conceptual entre procedimiento, caso, actuación y expediente. El diseño representa los diez estados del procedimiento y los cinco estados del expediente definidos en este documento como conjuntos distintos y no mapeados rígidamente uno a uno. El diseño admite que un mismo expediente contenga más de un procedimiento. El diseño admite procedimientos sin expediente formal cuando el tipo de procedimiento lo permite. El diseño representa actuaciones paralelas con su punto de convergencia institucional.

Riesgo: ALTO. Es el momento donde la presión de simplicidad técnica puede llevar a modelar el procedimiento como un simple campo de estado dentro del expediente, replicando exactamente el riesgo crítico identificado en este documento, o a confundir el diseño del workflow técnico con la definición misma del procedimiento institucional.

Archivos conceptuales que debe cubrir el diseño: modelo de procedimiento con sus estados y ciclo de vida, modelo de caso como instancia de un tipo de procedimiento, modelo de actuación con sus participantes e intervenciones, modelo de vinculación entre procedimiento y expediente (de cardinalidad flexible, no de uno a uno obligatorio), modelo de procedimientos paralelos con su mecanismo de convergencia, integración con la capa de competencia y autoridad de ADR-007 y ADR-008, integración con el modelo de actos administrativos de ADR-009, integración con la capa de auditoría de ADR-005.

---

### P2 — Implementación del núcleo de procedimientos

**Objetivo:** El sistema puede crear procedimientos, registrar sus actuaciones sucesivas y paralelas, llevarlos a través de sus estados de desarrollo, análisis y revisión, vincularlos con la producción de actos administrativos conforme a ADR-009, y registrar su cierre o extinción anticipada por desistimiento, caducidad o abandono.

Dependencias: P1 cerrado.

Criterio de cierre: Es posible crear un procedimiento sin necesidad de un expediente formal cuando el tipo lo permite. Es posible vincular un procedimiento a un expediente existente sin que ese vínculo sea obligatorio para todos los tipos. Es posible que un mismo expediente contenga más de un procedimiento, cada uno con su propio estado verificable de forma independiente. Es posible registrar actuaciones paralelas dentro de un mismo procedimiento con su punto de convergencia antes de la decisión. El historial de cada procedimiento es inmutable y consultable en su totalidad. La auditoría obligatoria de cada evento del ciclo de vida del procedimiento está activa.

Rollback: Si P2 introduce un mapeo rígido entre estado de expediente y estado de procedimiento, o si el historial de actuaciones resulta modificable, revertir el módulo afectado hasta corregir. Un sistema que no puede representar correctamente la independencia entre procedimiento y expediente reproduce el riesgo crítico central de este documento y no debe liberarse a producción.

---

### P3 — Integración con Expedientes, Actos Administrativos y Firma Digital

**Objetivo:** El módulo de Expedientes incorpora la capacidad de contener y organizar cronológicamente uno o más procedimientos relacionados. El módulo de Actos Administrativos (ADR-009) queda vinculado a los procedimientos que los originan, permitiendo que un procedimiento se asocie a múltiples actos sucesivos. El módulo de Firma Digital, cuando se diseñe, opera sobre los actos producidos dentro de los procedimientos, conforme a la autoridad institucional verificada según ADR-008.

Dependencias: P2 cerrado. ADR-007, ADR-008 y ADR-009 implementados. ADR-005 implementado.

Criterio de cierre: Un expediente de obra pública puede representarse conteniendo sucesivamente el procedimiento de aprobación del proyecto, el procedimiento de contratación y el procedimiento de recepción de obra, cada uno consultable individualmente con su propio historial de actuaciones. Un procedimiento de contratación puede mostrarse con la totalidad de sus actos administrativos asociados (providencia, dictamen, resolución de pliego, acto colegiado de adjudicación, resolución de adjudicación, notificación), cada uno trazable conforme a ADR-009. Un procedimiento puede cerrarse por desistimiento o caducidad sin que el sistema exija la existencia de un acto administrativo decisorio sobre el fondo.

---

> Este documento define el modelo conceptual de procedimientos administrativos y ciclo de vida de casos de Muni Digital v1.
>
> No debe modificarse sin revisión del equipo de arquitectura, los referentes legales y aprobación formal.
>
> Extiende ADR-001, ADR-005, ADR-007, ADR-008 y ADR-009 sin contradecirlos.
>
> Es la fuente de verdad conceptual para Mesa de Entradas, Reclamos, Trámites, Compras, RRHH, Obras Públicas, Expedientes y Gobierno Electrónico.
>
> Próximo documento recomendado:
>
> ADR-011 — Digital Signature & Institutional Validation Model v1.