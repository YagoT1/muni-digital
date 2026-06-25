# ADR-013 — Administrative Case File & Dossier Model — Muni Digital

> Documento conceptual definitivo del modelo de expediente administrativo.
> Basado en: PDA.md · ADR-001 · ADR-002 · ADR-003 · ADR-004 · ADR-005 · ADR-006 · ADR-007 · ADR-008 · ADR-009 · ADR-010 · ADR-011 · ADR-012
> Versión: 1.2 — Consolida el Plan de Cambios ADR-013.1 → ADR-013.2, incorporando las precisiones sobre efecto institucional de la radicación incompetente, resolución de expedientes sin procedimiento, tratamiento de casos administrativos en procesos de acumulación, transición entre los estados Resuelto y Cerrado, articulación entre Cadena de Custodia y Responsable, reconocimiento de competencia concurrente, simetría del riesgo Expediente-Caso, identidad remanente en acumulación parcial, instructor por procedimiento, carácter declarativo de la dependencia entre expedientes, propagación de vinculaciones ante acumulación y división, y vínculo explícito entre Radicación y Continuidad Institucional. Reemplaza íntegramente a ADR-013.1.
> Estado: **APPROVED**

## Historial de Cambios

| Versión | Estado | Descripción |
|---|---|---|
| v1 | Reemplazada | Versión original del modelo de expediente. |
| v1.1 | Reemplazada | Incorporó Radicación, Competencia del Expediente y la precisión de la relación Expediente-Caso. Revisada por el Architecture Review Board con veredicto NO APROBABLE (7 hallazgos CRÍTICOS, 7 hallazgos ALTOS). |
| v1.2 | **APPROVED** | Consolida el Plan de Cambios que resolvió la totalidad de los hallazgos CRÍTICOS y los hallazgos ALTOS bloqueantes. Validada en segunda pasada por el Architecture Review Board con veredicto APROBABLE CON OBSERVACIONES. Las observaciones remanentes fueron reclasificadas como recomendaciones no bloqueantes que no condicionan el avance a P1. |

> Restricción: Este documento NO define tablas, entidades técnicas, código, APIs, endpoints, JWT, OAuth, frameworks, infraestructura, microservicios ni implementación.
> Este documento es la fuente de verdad conceptual definitiva para Mesa de Entradas, Expedientes Electrónicos, Gestión Documental, Archivo Digital, Procedimientos, Actos Administrativos, Notificaciones, Compras, RRHH, Obras Públicas y HCD.

---

## Resumen Ejecutivo

A lo largo de cuatro documentos sucesivos —ADR-009, ADR-010, ADR-011 y ADR-012— Muni Digital ha ido acercándose, capa por capa, a un concepto que estuvo presente en todos ellos sin haber sido nunca definido con la profundidad que merece: el expediente. ADR-009 lo introdujo como contenedor de actos administrativos. ADR-010 lo amplió como contenedor de uno o más procedimientos relacionados. ADR-011 lo mencionó como contexto donde la firma se aplica sobre los actos que contiene. ADR-012 lo desarrolló como agrupador cronológico de documentos. En cada caso, el expediente apareció correctamente caracterizado como lo que no es (no es el acto, no es el procedimiento, no es el documento), pero ninguno de esos documentos tuvo como objetivo principal resolver, de manera completa y definitiva, qué es el expediente en sí mismo, en toda su complejidad institucional: cómo nace, cómo acumula otros expedientes, cómo se divide, cómo se vincula con otros, qué firma puede o no recibir, y cómo se conserva a lo largo de las décadas que la vida institucional de un municipio puede requerir.

Esta tarea pendiente no es menor. El expediente es, en la práctica administrativa argentina, el objeto más visible y más mencionado de toda la gestión municipal: todo empleado, todo funcionario y todo ciudadano que alguna vez tramitó algo ante el Estado conoce la palabra "expediente" mucho antes de conocer cualquiera de los conceptos más abstractos que los documentos anteriores de esta serie han desarrollado. Precisamente por esa centralidad y esa familiaridad, el expediente es también el concepto que con mayor facilidad termina absorbiendo, en el diseño apresurado de sistemas, la identidad de todo lo demás: se dice "el expediente decide" cuando en realidad decide un acto producido dentro de un procedimiento que el expediente contiene; se dice "el expediente está firmado" cuando en realidad lo que está firmado es alguno de los documentos que el expediente agrupa; se dice "se cerró el expediente" sin distinguir si lo que culminó fue el procedimiento que contenía, o si simplemente dejó de recibir nuevas actuaciones mientras procedimientos relacionados continúan vigentes en otro contexto.

Este documento tiene como objetivo cerrar, de manera definitiva y sin dejar zonas grises, la pregunta que ha quedado pendiente en toda la serie: ¿qué es exactamente un expediente? La respuesta no es trivial, porque el expediente tiene una naturaleza híbrida que ningún documento anterior tuvo que resolver con esta profundidad: no es un acto (ADR-009), no es un procedimiento (ADR-010), no es una firma (ADR-011) y no es un documento (ADR-012), pero se relaciona con los cuatro de manera tan estrecha que, sin una definición propia y autónoma, el expediente corre el riesgo de quedar reducido a una mera "carpeta" sin entidad institucional propia, o, en el extremo opuesto, de absorber indebidamente las propiedades de todo lo que contiene.

La decisión central de este documento es la siguiente:

**El expediente es la unidad institucional de agrupación y conservación que organiza, de forma ordenada y trazable, las actuaciones, documentos y actos administrativos producidos en relación con uno o más procedimientos sobre un asunto determinado. El expediente no decide, no procedimenta y no firma: registra, organiza y conserva lo que el procedimiento produce, dotándolo de identidad institucional propia, de un responsable determinado y de una trayectoria que puede acumularse, dividirse o vincularse con otros expedientes sin perder su trazabilidad histórica.**

Este modelo desarrolla, con la exhaustividad que la pregunta central exige, todos los aspectos de la naturaleza, el ciclo de vida, la acumulación, la división, la vinculación, la conservación y la evidencia institucional del expediente, estableciendo de forma definitiva su relación con cada uno de los conceptos ya desarrollados en los documentos previos de esta serie.

La versión 1.2 de este documento consolida, sobre esa base, tres precisiones adicionales que el proceso de revisión arquitectónica determinó imprescindibles. Incorpora la **Radicación** como la ubicación institucional operativa del expediente dentro de la estructura organizacional, distinta de la responsabilidad institucional sobre su tramitación. Incorpora la **Competencia del Expediente** como la relación entre su objeto y la estructura organizacional habilitada para gestionarlo, admitiendo tanto la incompetencia originaria como la sobrevenida por reestructuración, y reconociendo la posibilidad de competencia concurrente entre posiciones sin debilitar la unicidad de la radicación. Y precisa de forma definitiva la **Separación Expediente-Caso**, estableciendo que entre ambos conceptos no existe ni debe asumirse cardinalidad obligatoria, y articulando esa separación con los procesos de acumulación, de modo que los casos administrativos contenidos en expedientes acumulados conserven su identidad propia. Esta versión fue sometida a revisión formal por el Architecture Review Board, que resolvió la totalidad de los hallazgos críticos y los hallazgos altos bloqueantes identificados en la versión anterior, y se encuentra aprobada como fuente de verdad conceptual definitiva.

---

## Definiciones Fundamentales

### Expediente

El expediente es la unidad institucional que agrupa, de forma ordenada, cronológica y trazable, las actuaciones (ADR-010), los documentos (ADR-012) y los actos administrativos (ADR-009) producidos en el desarrollo de uno o más procedimientos relacionados con un asunto determinado, dotada de una identificación única, un objeto, un responsable institucional y un historial propio que persiste independientemente de las vicisitudes de los procedimientos que en cada momento contiene.

### Carátula

La carátula es el conjunto de datos identificatorios que individualizan a un expediente: su número, su fecha de apertura, su asunto, el interesado que lo origina (cuando corresponde) y la institución y área de radicación inicial. La carátula es la puerta de entrada a la identidad del expediente, pero no es el expediente en sí mismo: es su ficha de identificación, equivalente, en cierto sentido, a los metadatos que ADR-012 definió para el documento, aplicados ahora al expediente como unidad.

### Asunto

El asunto es la descripción sustantiva y sintética de la materia sobre la cual versa el expediente: "Solicitud de habilitación comercial de Juan Pérez", "Reclamo por bache en calle San Martín al 1200", "Contratación de obra de pavimentación del Barrio Norte". El asunto orienta sobre el contenido del expediente sin agotar su descripción, ya que un expediente puede, a lo largo de su vida, incorporar procedimientos conexos que matizan o amplían su asunto original.

### Objeto

El objeto es la finalidad institucional concreta que el expediente persigue satisfacer: otorgar o denegar la habilitación solicitada, resolver el reclamo planteado, adjudicar y ejecutar la obra de pavimentación. El objeto se diferencia del asunto en que el asunto describe la materia, mientras que el objeto describe el resultado institucional que se busca alcanzar.

### Actuación

Conforme a ADR-010, la actuación es cada intervención individual producida dentro del desarrollo de un procedimiento. Las actuaciones de los procedimientos que un expediente contiene quedan registradas, en su conjunto, dentro de ese expediente, conforme al orden cronológico de su producción.

### Documento

Conforme a ADR-012, el documento es el soporte material que registra información. Los documentos producidos o incorporados durante la tramitación de los procedimientos que un expediente contiene se agrupan dentro de ese expediente, formando su cadena documental.

### Acto Administrativo

Conforme a ADR-009, el acto administrativo es la manifestación de voluntad institucional que produce efectos jurídicos o administrativos identificables. Los actos producidos dentro de los procedimientos de un expediente quedan registrados dentro de él, sin que el expediente se identifique con ninguno de esos actos individualmente.

### Procedimiento

Conforme a ADR-010, el procedimiento es la secuencia institucional de actuaciones orientada a producir un resultado administrativo. El expediente registra y conserva uno o más procedimientos relacionados, sin ser, en ningún caso, equivalente a ninguno de ellos.

### Interesado

El interesado es la persona, conforme a ADR-006, cuyo interés legítimo motiva o se ve afectado por la tramitación de un expediente: quien presenta una solicitud, quien formula un reclamo, quien resulta destinatario de una decisión. Un expediente puede tener uno o más interesados, y puede, en determinados casos (procedimientos internos conforme a ADR-010), no tener ningún interesado externo identificado.

### Instructor

El instructor es la posición organizacional (ADR-007), ejercida por quien válidamente la ocupa (ADR-008), responsable de impulsar el desarrollo sustantivo de los procedimientos contenidos en el expediente: producir las derivaciones, requerir los informes, elaborar las propuestas de decisión que se sometan a la autoridad competente. Cuando un expediente contiene más de un procedimiento simultáneo, puede existir un instructor distinto para cada procedimiento, sin que ello afecte la unicidad del responsable institucional del expediente en su conjunto.

### Responsable

El responsable del expediente es la posición organizacional que, conforme al organigrama institucional (ADR-007), tiene a su cargo la custodia, el seguimiento y la correcta tramitación del expediente en su conjunto, independientemente de qué posición sea, en cada momento, la instructora de un procedimiento específico contenido en él, y con independencia, asimismo, de la radicación operativa que el expediente tenga en un momento dado conforme a la definición de Radicación establecida en este documento: el responsable institucional del expediente puede no coincidir, en determinados momentos de su tramitación, con el área donde el expediente se encuentra físicamente o digitalmente radicado para su circulación administrativa inmediata. Todo expediente debe tener un responsable institucional identificable; un expediente sin responsable es, conforme se desarrolla en la sección de riesgos, una situación institucionalmente inadmisible.

### Radicación

La radicación es la ubicación institucional actual del expediente dentro de la estructura organizacional definida en ADR-007.

La radicación determina:

* dónde se encuentra operativamente el expediente;
* qué área tiene su custodia inmediata;
* qué bandeja institucional debe visualizarlo;
* qué área debe continuar su circulación administrativa.

La radicación no implica, por sí misma:

* autoridad decisoria;
* competencia exclusiva sobre el asunto;
* responsabilidad jurídica sobre todos los actos contenidos en el expediente.

La radicación puede cambiar múltiples veces durante la vida institucional del expediente sin alterar su identidad, su historial ni su continuidad administrativa.

Todo cambio de radicación constituye un evento institucional relevante y debe conservar trazabilidad completa de origen, destino, fecha, fundamento y responsable de la operación.

### Competencia del Expediente

La competencia del expediente es la relación entre el objeto del expediente y la estructura organizacional institucionalmente habilitada para gestionarlo.

Todo expediente debe encontrarse radicado dentro de una cadena organizacional competente para el asunto que tramita.

La competencia:

* deriva del modelo organizacional definido en ADR-007;
* se ejerce mediante los mecanismos de autoridad definidos en ADR-008;
* condiciona la regularidad institucional de las actuaciones producidas dentro del expediente.

La existencia de actuaciones impulsadas desde áreas manifiestamente incompetentes constituye una irregularidad institucional que debe quedar registrada y ser susceptible de revisión.

La competencia pertenece a la organización y a sus posiciones institucionales, no a las personas que circunstancialmente las ocupan.

La competencia sobre un expediente puede ser ejercida de forma concurrente por más de una posición organizacional cuando el asunto que tramita así lo requiera institucionalmente, sin que ello contradiga el principio de radicación única: la radicación identifica dónde se encuentra operativamente el expediente en cada momento, mientras que la competencia concurrente reconoce que más de un área puede tener atribuciones legítimas sobre su objeto. Esta situación es frecuente en expedientes legislativos del HCD, donde una comisión y el cuerpo en pleno pueden tener competencias superpuestas sobre el mismo asunto.

Las actuaciones producidas durante un período de incompetencia no son, por ese solo hecho, nulas. Permanecen en estado de validez provisional hasta que la autoridad competente, una vez corregida la radicación, las ratifique expresamente o disponga su revisión. Esta regla es distinta cuando la incompetencia es sobrevenida por una reestructuración organizacional conforme a ADR-007: en ese caso no existe irregularidad alguna que revisar, sino un mero hecho administrativo que exige una re-radicación, y las actuaciones producidas con anterioridad a la reestructuración conservan plena validez sin necesidad de ratificación.

### Expediente Principal

El expediente principal es aquel que, tras un proceso de acumulación (desarrollado en su propia sección), conserva la identidad de referencia bajo la cual se continúa la tramitación conjunta de los asuntos acumulados, recibiendo las actuaciones futuras relacionadas con todos ellos.

### Expediente Vinculado

El expediente vinculado es aquel que mantiene con otro expediente una relación de conexión institucional (por tratar materias conexas, por ser antecedente o consecuencia del otro) sin que medie acumulación: ambos expedientes conservan su identidad, su numeración y su tramitación independientes, pero el sistema preserva la referencia explícita entre ellos.

### Expediente Acumulado

El expediente acumulado es aquel que, mediante el proceso desarrollado en su propia sección, pasa a tramitarse conjuntamente con otro expediente (el principal), conservando su identidad histórica pero dejando de recibir, a partir de la acumulación, actuaciones autónomas separadas de las del expediente principal.

### Expediente Derivado

El expediente derivado es aquel que nace de un proceso de división (desarrollado en su propia sección) a partir de un expediente preexistente, conservando la referencia a ese expediente de origen como antecedente de su propia historia institucional.

### Expediente Histórico

El expediente histórico es aquel que, habiendo agotado su tramitación activa, se conserva por su valor institucional, probatorio o patrimonial, conforme a los principios de conservación permanente desarrollados en su propia sección.

### Expediente Archivado

El expediente archivado es aquel que, conforme a los regímenes de conservación desarrollados en este documento, ha pasado del circuito de gestión operativa activa a alguno de los regímenes de archivo (activo, intermedio o histórico), sin que ello suponga, necesariamente, su condición de histórico en el sentido patrimonial pleno.

### Expediente Electrónico

El expediente electrónico es aquel cuya existencia, tramitación y conservación se desarrolla íntegramente en soporte digital, conforme al modelo de documento electrónico ya definido en ADR-012.

### Expediente Físico

El expediente físico es aquel que existe y se tramita en soporte papel, conforme a las prácticas administrativas previas a la digitalización, o que la institución continúa empleando para determinadas materias por disposición normativa específica.

### Expediente Mixto

El expediente mixto es aquel que combina, en su historia institucional, tramitación en soporte físico y en soporte electrónico, situación habitual durante los procesos de transición hacia la digitalización completa de la gestión documental municipal, o cuando un expediente físico antiguo recibe, en una etapa posterior de su tramitación, actuaciones producidas íntegramente en el entorno digital de Muni Digital.

### Legajo

El legajo, conforme ya fue definido en ADR-004 en el contexto específico del empleado municipal, es la agrupación documental que registra la historia laboral de una persona. El legajo es conceptualmente afín al expediente (ambos son agrupaciones institucionales con identidad propia), pero se diferencia de él en que el legajo agrupa la historia continua de un sujeto determinado (un empleado) a lo largo de toda su relación con la institución, mientras que el expediente agrupa la tramitación de un asunto determinado, generalmente acotado en su objeto y, en la mayoría de los casos, con vocación de alcanzar una resolución y no de acompañar indefinidamente la trayectoria de una persona.

### Dossier

El dossier, en el sentido que adopta este modelo, es la agrupación informal o de trabajo de documentos y antecedentes sobre una materia determinada, sin la formalidad institucional, la numeración oficial ni el régimen de conservación que caracteriza al expediente. Un dossier puede constituirse como instancia preparatoria previa a la apertura formal de un expediente, pero no sustituye ni equivale a él.

### Trámite

Conforme ya estableció ADR-010, el trámite es la denominación coloquial del caso administrativo: la instancia concreta de un procedimiento determinado, vista desde la perspectiva del interesado que lo sigue. El trámite, en este sentido, no es sinónimo de expediente: un trámite puede tramitarse dentro de un expediente, pero también puede resolverse mediante un procedimiento simplificado sin apertura de expediente formal, conforme ya reconoció ADR-010.

---

## Diferencias Fundamentales

### Expediente vs Procedimiento

Ya extensamente desarrollada en ADR-010 y reafirmada en este documento: el procedimiento es la secuencia institucional de actuaciones orientada a un resultado; el expediente es el contenedor que registra y conserva uno o más procedimientos relacionados. El expediente no tramita, no decide y no produce resultados por sí mismo; es el procedimiento que contiene el que lo hace.

### Expediente vs Documento

Ya extensamente desarrollada en ADR-012: el documento es la unidad individual de soporte material de información; el expediente es el contenedor que agrupa cronológicamente numerosos documentos relacionados con los procedimientos que registra.

### Expediente vs Acto

Ya extensamente desarrollada en ADR-009: el acto administrativo es la manifestación de voluntad institucional que produce efectos jurídicos o administrativos; el expediente puede contener uno, varios o ningún acto a lo largo de su tramitación, sin identificarse con ninguno de ellos.

### Expediente vs Trámite

El trámite, conforme a ADR-010, es la perspectiva del interesado sobre la instancia concreta de un procedimiento. El expediente es la unidad institucional de registro y conservación que, en la mayoría de los casos, sirve de soporte a ese trámite, pero no en todos: pueden existir trámites resueltos mediante procedimientos simplificados sin expediente formal, conforme ya reconoció ADR-010.

### Expediente vs Archivo

El archivo, conforme a ADR-012, es el régimen o repositorio de conservación. El expediente es la unidad institucional que, en determinado momento de su ciclo de vida, pasa a alguno de los regímenes de archivo (activo, intermedio, histórico), sin que el expediente y el archivo sean, en ningún momento, el mismo concepto.

### Expediente vs Legajo

Ya desarrollada en las definiciones fundamentales: el legajo agrupa la historia continua de un sujeto (típicamente, un empleado, conforme a ADR-004); el expediente agrupa la tramitación de un asunto determinado, generalmente con vocación de alcanzar una resolución y cierre, a diferencia del legajo, que acompaña a su sujeto durante toda la extensión de su vínculo institucional.

### Expediente vs Dossier

Ya desarrollada en las definiciones fundamentales: el dossier es una agrupación informal, sin numeración oficial ni régimen de conservación institucional; el expediente es la unidad formal, numerada y sometida al régimen de conservación que este documento desarrolla.

### Expediente vs Registro

El registro, conforme ya se introdujo en ADR-012, es la constancia formal de que algo ha ocurrido, que puede o no adoptar la forma de un documento o de un expediente autónomo. El expediente es, en sí mismo, susceptible de producir múltiples registros (de auditoría, conforme a ADR-005) a lo largo de su tramitación, sin que el expediente se identifique con ninguno de esos registros individuales.

### Expediente vs Caso

El caso administrativo y el expediente son conceptos distintos, y este modelo establece de forma explícita que entre ambos no existe ni debe asumirse ninguna relación de cardinalidad obligatoria uno a uno.

El caso administrativo, conforme a ADR-010, representa el asunto: la instancia concreta de un tipo de procedimiento, con sus propios participantes, su propio objeto y su propio resultado esperado, vista como unidad sustantiva de gestión independientemente del contenedor institucional en el que se tramite.

El expediente representa la estructura institucional de gestión y conservación: la unidad que agrupa, organiza cronológicamente y conserva las actuaciones, documentos y actos producidos en relación con uno o más procedimientos.

De esta distinción se derivan explícitamente las siguientes consecuencias:

**Un caso puede generar múltiples expedientes.** Un mismo asunto sustantivo puede requerir, a lo largo de su tramitación, la apertura de más de un expediente (por ejemplo, cuando un proceso de división conforme a su propia sección separa la tramitación de aspectos parciales del mismo caso, o cuando distintas etapas sucesivas del caso se gestionan en contenedores documentales distintos por razones institucionales).

**Un expediente puede contener múltiples casos relacionados.** Conforme ya estableció la sección de Naturaleza del Expediente, un expediente puede, particularmente tras un proceso de acumulación, agrupar la tramitación conjunta de más de un caso administrativo relacionado.

**No existe relación obligatoria 1:1.** Ninguna implementación futura de Muni Digital debe asumir, como regla estructural, que cada caso corresponde exactamente a un expediente y que cada expediente corresponde exactamente a un caso. Esta correspondencia, cuando se produce, es la situación operativa más frecuente, pero es una coincidencia de hecho en el caso concreto, no una condición necesaria del modelo.

### Expediente vs Notificación

La notificación, conforme a ADR-009, es el acto mediante el cual se comunica formalmente a un interesado el contenido de otro acto. La notificación se produce dentro del desarrollo de un procedimiento contenido en un expediente, y queda registrada como una actuación más dentro de su cadena documental, sin que la notificación se identifique con el expediente que la contiene.

---

## Naturaleza del Expediente

### ¿El Expediente es un Contenedor?

El expediente es, ante todo, una entidad institucional con identidad propia, persistente y trazable. Contener actuaciones, documentos y actos relacionados con uno o más procedimientos es una característica que el expediente posee, no la totalidad de su naturaleza. Reducir al expediente a la función de contención, aunque sea correcto en un plano elemental, es una caracterización incompleta: el expediente, además de contener, organiza esa agrupación de forma cronológica y trazable, la dota de una identidad institucional propia (su número, su carátula, su responsable, su radicación) que trasciende la mera suma de sus contenidos, y conserva esa identidad incluso en estados (como el de creado, conforme a su ciclo de vida) en los que todavía no contiene ningún elemento sustantivo. La función de contención no agota, por lo tanto, la naturaleza institucional del expediente: es una de sus características, derivada de su condición más fundamental de entidad institucional con existencia propia.

### ¿Es un Caso Administrativo?

No necesariamente, aunque frecuentemente coincide con uno. El expediente es el contenedor institucional; el caso administrativo (ADR-010) es la instancia concreta de un tipo de procedimiento. Conforme se desarrolla con mayor extensión en la sección de Diferencias Fundamentales de este documento, entre expediente y caso no existe relación de cardinalidad obligatoria: un expediente puede contener un único caso, puede, conforme a los procesos de acumulación desarrollados en su propia sección, contener más de un caso relacionado tramitándose conjuntamente, y un mismo caso puede, a su vez, requerir más de un expediente para su tramitación completa.

### ¿Es una Agrupación Documental?

Es, entre otras cosas, una agrupación documental, pero no únicamente eso: el expediente también agrupa actuaciones (que pueden no requerir, en sí mismas, un documento autónomo conforme a ADR-012) y actos administrativos, además de los documentos que los soportan.

### ¿Es un Soporte?

No en el sentido en que ADR-012 define al documento como soporte material de información. El expediente no es, en sí mismo, un soporte de contenido sustantivo: es la estructura organizativa que agrupa a los soportes (los documentos) que sí transportan ese contenido.

### ¿Es una Entidad Institucional?

Sí, y esta es la caracterización más completa: el expediente es una entidad institucional con identidad propia, persistente en el tiempo, con un responsable determinado, susceptible de acumularse con otros, de dividirse, de vincularse, y de conservarse conforme a un régimen propio, que existe con relativa independencia de las vicisitudes (apertura, suspensión, cierre) de los procedimientos específicos que en cada momento de su historia contiene.

### ¿Puede Existir sin Documentos?

En su momento de apertura, un expediente puede existir con la sola carátula que lo identifica, antes de que se incorpore su primer documento sustantivo, aunque este estado es, en la práctica, sumamente transitorio: la apertura del expediente y la incorporación de su primera actuación documental suelen producirse de forma casi simultánea.

### ¿Puede Existir sin Actuaciones?

De forma análoga al punto anterior, un expediente recién abierto puede, durante un breve lapso, no haber registrado todavía ninguna actuación sustantiva más allá del hecho mismo de su apertura, que es, en sí, la primera actuación de su historia.

### ¿Puede Existir sin Actos?

Sí, plenamente, y de forma sostenida en el tiempo, no solo transitoria. Conforme ya estableció ADR-009 y ADR-010, un expediente puede tramitarse en su totalidad sin que se produzca jamás un acto administrativo formal, si el asunto se resuelve por desistimiento, archivo o caducidad del procedimiento que contiene, sin necesidad de un pronunciamiento decisorio.

### ¿Puede Existir sin Procedimiento?

Esta es la pregunta más delicada de toda la sección, y la respuesta debe ser matizada. En su acepción más estricta, un expediente que no contiene ningún procedimiento es, conceptualmente, una carátula vacía sin contenido institucional sustantivo: el expediente nace, precisamente, para registrar la tramitación de un procedimiento. Sin embargo, puede existir, de forma transitoria, el estado en que un expediente ha sido recién abierto y el procedimiento que va a contener todavía no ha iniciado formalmente su desarrollo sustantivo (está, por ejemplo, en estado de "iniciado" conforme a ADR-010, sin actuaciones de desarrollo todavía registradas). Lo que no puede existir es un expediente que, de forma permanente y definitiva, jamás llegue a contener ningún procedimiento: en ese caso, el expediente carecería de razón de ser institucional y debería, conforme a los criterios de gestión documental, considerarse para su cierre o anulación administrativa.

La determinación de que un expediente ha alcanzado ese estado patológico corresponde al responsable institucional del expediente, conforme a una revisión periódica de los expedientes abiertos sin procedimiento sustantivo asociado. Esa revisión, y la decisión de cierre o anulación que de ella derive, constituye en sí misma un evento de auditoría obligatoria conforme a ADR-005. Este modelo no fija el plazo a partir del cual corresponde iniciar esa revisión, por tratarse de una decisión de política institucional ajena al alcance conceptual de este documento.

---

## Expediente y Procedimiento

### ¿Un Procedimiento Puede Existir sin Expediente?

Sí, conforme ya estableció ADR-010 con toda claridad: existen procedimientos de tramitación simplificada que la normativa o la práctica institucional habilitan sin necesidad de apertura de expediente formal (determinadas certificaciones de emisión directa, conforme ya reconoció ADR-009). Este documento reafirma ese principio sin modificarlo: el expediente es, para la mayoría de los procedimientos de mediana o alta complejidad, el contenedor natural de su tramitación, pero no es una condición necesaria de la existencia institucional de todo procedimiento.

### ¿Un Expediente Puede Contener Múltiples Procedimientos?

Sí, conforme ya estableció ADR-010 con el ejemplo recurrente del expediente de obra pública, que contiene sucesivamente el procedimiento de aprobación del proyecto técnico, el procedimiento de contratación, el procedimiento de ejecución y certificación de avance, y el procedimiento de recepción definitiva. Este documento reafirma ese principio y lo extiende: la capacidad de un expediente de contener múltiples procedimientos no se limita a procedimientos sucesivos en el tiempo, sino que puede incluir también procedimientos conexos que se desarrollan de forma parcialmente simultánea dentro del mismo contenedor, cuando la naturaleza del asunto así lo justifique.

### ¿Un Procedimiento Puede Migrar entre Expedientes?

En determinadas circunstancias excepcionales, sí, aunque este modelo establece que esa migración debe ser siempre un evento institucional explícito y plenamente auditado, nunca una operación silenciosa. Un procedimiento puede migrar de un expediente a otro como consecuencia de un proceso de división (desarrollado en su propia sección), cuando se determina que su tramitación debe separarse de la del expediente que lo contenía originalmente, o como consecuencia de un proceso de acumulación, cuando se determina que su tramitación debe unificarse con la de otro expediente preexistente. En ambos casos, la migración debe conservar la trazabilidad completa del procedimiento migrado: su historial de actuaciones no se pierde ni se reescribe, sino que se traslada junto con la referencia explícita al expediente de origen del cual proviene.

### ¿Un Expediente Puede Sobrevivir al Cierre de un Procedimiento?

Sí, de forma sumamente frecuente. Conforme ya desarrolló ADR-010, el cierre de un procedimiento (su paso al estado de finalizado) no implica necesariamente el cierre del expediente que lo contiene, particularmente cuando ese expediente contiene, o puede llegar a contener en el futuro, otros procedimientos relacionados con el mismo asunto. El expediente de obra pública, una vez finalizado el procedimiento de aprobación del proyecto técnico, sigue abierto y activo para recibir el siguiente procedimiento de su secuencia (la contratación), sin que el cierre del primero implique, de ningún modo, el cierre del expediente que los contiene a todos.

### Cómo se Relacionan

La relación entre expediente y procedimiento es de contención ordenada con autonomía relativa: el expediente contiene y organiza cronológicamente a los procedimientos relacionados con su asunto, pero cada procedimiento conserva su propia identidad, su propio ciclo de vida (conforme a los diez estados ya definidos en ADR-010) y su propia capacidad de iniciarse, desarrollarse y finalizar de forma relativamente independiente del estado general del expediente que lo contiene, en correspondencia exacta con el principio ya establecido en ADR-010 de que los estados del procedimiento y los estados del expediente son conjuntos distintos que no deben mapearse rígidamente uno a uno.

---

## Expediente y Documento

### El Expediente Contiene Documentos

Conforme ya estableció extensamente ADR-012, el expediente agrupa, de forma cronológica, los documentos producidos en la tramitación de los procedimientos que contiene, distinguiendo entre documentos principales, adjuntos y referenciados.

### ¿Puede Contener Referencias Documentales?

Sí, plenamente, conforme ya estableció ADR-012: un documento puede ser referenciado desde un expediente sin estar materialmente incorporado a él (la cita de un dictamen de alcance general producido para otro expediente), conservando el documento referenciado su identidad única y su pertenencia material al contexto donde efectivamente fue producido o incorporado por primera vez.

### ¿Puede Contener Documentos Externos?

Sí, y de forma sumamente habitual: la documentación ciudadana (conforme a la tipología ya desarrollada en ADR-012) ingresa al expediente como documento externo desde el momento de su recepción formal en Mesa de Entradas, conforme se desarrolla en la sección de Apertura de este documento.

### ¿Puede Contener Documentos de Múltiples Instituciones?

En general, no, conforme al principio de aislamiento institucional ya establecido en ADR-001 y reafirmado en ADR-009, ADR-010, ADR-011 y ADR-012: un expediente de la Municipalidad no incorpora, como regla general, documentos producidos por el HCD o por el Hospital, salvo en los casos excepcionales de derivación o referencia interinstitucional explícitamente prevista, que deben quedar siempre registrados como tales y no como una incorporación ordinaria.

### ¿Puede Contener Documentos Históricos?

Sí: un expediente en tramitación activa puede incorporar, como antecedente, documentos históricos producidos en expedientes anteriores ya cerrados o archivados (por ejemplo, la cita de una resolución de varios años atrás como fundamento de una nueva decisión), conforme al mecanismo de referencia documental ya desarrollado en ADR-012, sin que ello implique la reapertura del expediente histórico de origen.

---

## Expediente y Actos Administrativos

### ¿Qué Actos Pertenecen al Expediente?

Pertenecen al expediente todos los actos administrativos producidos dentro de los procedimientos que ese expediente contiene, conforme ya estableció extensamente ADR-009 y ADR-010: providencias de mero trámite, dictámenes, resoluciones decisorias, notificaciones, y cualquier otro tipo de acto que la tramitación del asunto haya requerido a lo largo de su desarrollo.

### ¿Qué Ocurre Cuando un Acto es Revocado?

Conforme a ADR-009, la revocación es un nuevo acto que deja sin efecto, para el futuro, a un acto anterior. Ese nuevo acto revocatorio se incorpora al mismo expediente donde se encontraba el acto revocado (o, en determinadas circunstancias excepcionales, a un expediente distinto si la revocación se tramita de forma autónoma), sin que el acto revocado se elimine del historial documental del expediente: permanece como evidencia de la decisión original y de su posterior revocación, conforme al principio de inmutabilidad histórica ya establecido en ADR-005, ADR-009 y ADR-012.

### ¿Qué Ocurre Cuando un Acto es Anulado?

De forma análoga, la anulación (conforme a ADR-009) se registra mediante un nuevo acto o, según corresponda, mediante la incorporación al expediente de la decisión administrativa o judicial que la dispone, sin que el acto anulado se elimine del expediente: permanece registrado, ahora con la indicación expresa de su condición de anulado, como parte de la historia institucional completa del asunto.

### ¿Qué Ocurre Cuando un Acto es Reemplazado?

Cuando un acto es reemplazado por otro posterior que regula de forma más completa o actualizada la misma materia, ambos actos (el reemplazado y el que lo reemplaza) quedan registrados dentro del expediente, con la referencia explícita que vincula al segundo como sustituto del primero, en correspondencia con el mecanismo de versionado y reemplazo ya desarrollado en ADR-012 para los documentos.

### Cómo Impacta en el Expediente

Ninguno de estos tres eventos (revocación, anulación, reemplazo) afecta la identidad ni la continuidad del expediente que los contiene: el expediente permanece como el mismo contenedor institucional, ahora enriquecido con el registro de la evolución completa de los actos relacionados con su asunto, incluyendo tanto las decisiones originales como las sucesivas correcciones, revocaciones o sustituciones que hayan tenido lugar a lo largo de su tramitación.

---

## Expediente y Firma

### ¿Cómo se Relaciona un Expediente con la Firma?

El expediente, como unidad de agrupación y conservación, no es, en sí mismo, objeto de validación mediante firma en el sentido pleno que desarrolla ADR-011. Lo que efectivamente se firma son los documentos individuales (ADR-012) que soportan a los actos administrativos (ADR-009) y a las actuaciones de trascendencia (ADR-010) que el expediente contiene.

### ¿El Expediente se Firma?

No, en el sentido institucional pleno que ADR-011 reserva para la validación de un contenido decisorio determinado. El expediente, como contenedor que puede agrupar decenas o cientos de documentos producidos a lo largo de años de tramitación, no tiene un contenido decisorio único y unificado que sea susceptible de una sola validación comprensiva de la totalidad de su contenido.

### ¿O se Firman los Documentos y Actos Contenidos?

Sí, exactamente: cada documento que requiere validación institucional (porque soporta un acto administrativo o una actuación de trascendencia suficiente) recibe su propia firma de forma individual, conforme al modelo desarrollado en ADR-011, sin que exista ni sea institucionalmente necesaria una firma "del expediente" que pretenda validar, de una sola vez, la totalidad de su contenido heterogéneo.

### ¿Puede Existir un Expediente "Firmado"?

En sentido estricto, no, conforme a lo desarrollado en los puntos anteriores. Lo que coloquialmente se denomina, en la práctica administrativa, "expediente firmado" es, en rigor, un expediente que contiene un acto decisorio (típicamente, la resolución final del asunto) que ya completó su circuito de validación mediante firma conforme a ADR-011. Este modelo desestima, de forma deliberada, la expresión "expediente firmado" como categoría institucional propia, precisamente para evitar la confusión de planos que todo este documento busca prevenir: lo que está firmado es el acto y su documento de soporte, no el expediente que los contiene.

### ¿Tiene Sentido Institucionalmente?

No, salvo que se entienda esa expresión como una forma abreviada y coloquialmente aceptable de referirse a que el expediente contiene, entre sus documentos, al menos uno que alcanzó el estado de "firmado" conforme a ADR-011 y ADR-012. Este modelo recomienda que el diseño técnico futuro evite reproducir esa ambigüedad coloquial como un estado propio del expediente, y que represente, en su lugar, con precisión, el estado de cada documento y acto individual que el expediente contiene.

---

## Apertura

### Quién Puede Iniciar un Expediente

Puede iniciar un expediente cualquier posición organizacional con competencia funcional para recibir o dar curso al tipo de asunto correspondiente, conforme a ADR-007: típicamente, Mesa de Entradas para los expedientes que se originan en una presentación externa, o cualquier área competente cuando se trata de un expediente iniciado de oficio por la propia administración. La apertura de un expediente no requiere, en sí misma, el mismo nivel de autoridad institucional que ADR-008 exige para la firma de un acto decisorio: es, en su naturaleza, un acto de registro administrativo, no una decisión de fondo sobre el asunto que el expediente habrá de tramitar.

### Cómo Nace

El expediente nace en el momento en que se le asigna su identificación única (su número y su carátula), conforme a la recepción formal de una presentación externa, a una iniciativa de oficio, o a la decisión de separar formalmente un asunto en un contenedor propio. El nacimiento del expediente es, conceptualmente, anterior o simultáneo al nacimiento del primer procedimiento que va a contener, en correspondencia con lo ya desarrollado en la sección de Naturaleza del Expediente.

### Qué Información Mínima Requiere

Para nacer válidamente, un expediente requiere, como mínimo, su carátula completa (conforme a la definición ya establecida): asunto, fecha de apertura, institución y área de radicación inicial, y, cuando corresponda, la identificación del interesado que lo origina. A esta información mínima se agrega, conforme a las definiciones de Radicación y Competencia del Expediente ya establecidas en este documento, la determinación explícita de la radicación inicial del expediente y la verificación de que esa radicación se encuentra dentro de una cadena organizacional competente para el asunto que va a tramitar, conforme a ADR-007. Sin esta información mínima, el expediente carece de la identidad institucional propia que este documento exige como condición de su existencia válida.

### Qué Diferencia Existe entre Apertura e Incorporación de Documentos

La apertura es el acto institucional que da nacimiento a la identidad del expediente como tal (su número, su carátula). La incorporación de documentos es el proceso continuo, sostenido durante toda la vida activa del expediente, mediante el cual se van agregando los sucesivos documentos, actuaciones y actos que su tramitación produce. La apertura ocurre una sola vez, en el origen del expediente; la incorporación de documentos es un proceso recurrente que se extiende durante toda su tramitación activa.

---

## Acumulación

La acumulación es uno de los procesos institucionales más delicados de todo el modelo del expediente, y por ello merece un desarrollo extenso y cuidadoso.

### Expediente A + Expediente B

La acumulación se produce cuando la autoridad competente determina que dos o más expedientes preexistentes, por versar sobre asuntos sustancialmente conexos o por requerir una tramitación conjunta más eficiente, deben continuar su tramitación de forma unificada a partir de ese momento.

### Acumulación Parcial

La acumulación parcial es aquella en la que solo determinadas actuaciones, procedimientos o documentos de un expediente se incorporan al otro, mientras que el resto de la tramitación de cada expediente original continúa de forma separada. Este tipo de acumulación, menos frecuente que la total, requiere un criterio institucional especialmente preciso sobre qué porción exacta se acumula y qué porción permanece autónoma. El expediente de origen conserva, sobre la porción no acumulada, su propia carátula y su propio responsable institucional, ajustando su asunto únicamente si la porción acumulada formaba parte sustancial de su identidad original.

### Acumulación Total

La acumulación total es aquella en la que la totalidad de la tramitación de un expediente (el acumulado) se incorpora, de allí en adelante, al otro expediente (el principal), de modo que toda actuación futura relacionada con el asunto conjunto se registra exclusivamente en el expediente principal.

### Expediente Principal

El expediente principal, ya definido en las definiciones fundamentales, es el que conserva la identidad de referencia bajo la cual continúa la tramitación conjunta tras la acumulación. La determinación de cuál de los expedientes acumulados pasa a ser el principal corresponde a un criterio institucional (generalmente, el de mayor antigüedad, el de mayor avance en su tramitación, o el que la autoridad competente determine por razones de eficiencia administrativa).

### Expediente Secundario

El expediente secundario, equivalente al "expediente acumulado" ya definido, es el que, tras la acumulación, deja de recibir actuaciones autónomas y pasa a integrarse, para todos los efectos de tramitación futura, en el expediente principal.

### Conservación de Identidad Histórica

Este es el punto más crítico de todo el proceso de acumulación: el expediente secundario o acumulado **no pierde su identidad histórica** por el solo hecho de la acumulación. Su número, su carátula original y la totalidad de las actuaciones, documentos y actos que contenía hasta el momento de la acumulación permanecen plenamente consultables y trazables, con la sola indicación adicional de que, a partir de determinada fecha, su tramitación continuó de forma unificada bajo la referencia del expediente principal. Eliminar o hacer desaparecer la identidad histórica de un expediente acumulado, fusionando irreversiblemente su numeración o su historial con el del expediente principal sin dejar rastro de su existencia previa, es uno de los riesgos críticos que se desarrollan en la sección correspondiente.

Los casos administrativos que cada expediente acumulado representaba, conforme a la distinción ya establecida entre expediente y caso, conservan su identidad propia tras la acumulación. La acumulación une la tramitación documental de los expedientes; no fusiona los casos que estos contenían. Cada caso continúa siendo una unidad de seguimiento independiente, con su propio resultado esperado, ahora gestionada dentro del expediente principal.

### Riesgos Institucionales de la Acumulación

Una acumulación mal ejecutada puede producir consecuencias institucionales graves: la pérdida de trazabilidad sobre el origen de determinadas actuaciones (si no queda claro de cuál de los expedientes acumulados proviene cada documento anterior a la acumulación), la confusión sobre cuál es el expediente vigente para efectos de notificación a los interesados de cada asunto original, o la indebida extensión de los efectos de la acumulación a materias que, pese a cierta conexión superficial, en realidad debían mantener tramitación separada por afectar a interesados o competencias distintas.

---

## División

La división es el proceso inverso, conceptualmente, a la acumulación, y merece el mismo nivel de cuidado en su desarrollo.

### Expediente Madre

El expediente madre es aquel del cual, mediante el proceso de división, se separa una porción de su tramitación (determinadas actuaciones, procedimientos o documentos) para constituir un nuevo expediente autónomo.

### Expediente Hijo

El expediente hijo, equivalente al "expediente derivado" ya definido, es el que nace de ese proceso de división, recibiendo su propia identificación (nuevo número y carátula propia) pero conservando, en su historial, la referencia explícita al expediente madre del cual se originó.

### Separación de Actuaciones

La división requiere determinar con precisión qué actuaciones específicas del expediente madre pasan a integrar el nuevo expediente hijo, y cuáles permanecen en el expediente madre. Esta determinación debe ser institucionalmente explícita y fundada, nunca una operación ambigua o parcialmente documentada.

### Separación Documental

De forma correlativa a la separación de actuaciones, los documentos vinculados a las actuaciones que se dividen deben quedar correctamente referenciados desde el nuevo expediente hijo, conforme al mecanismo de vinculación documental ya desarrollado en ADR-012, preservando la trazabilidad de su origen en el expediente madre.

### Conservación de Trazabilidad

Tanto el expediente madre como el expediente hijo deben conservar, de forma explícita y bidireccional, la referencia al proceso de división que los vincula: el expediente madre debe poder mostrar que una porción de su tramitación fue derivada hacia el expediente hijo, y el expediente hijo debe poder mostrar, en todo momento, su origen en el expediente madre, de modo que la reconstrucción histórica completa del asunto original permanezca siempre posible, independientemente de en cuántos expedientes distintos haya terminado fragmentándose con el paso del tiempo.

---

## Vinculación

La vinculación es el mecanismo más flexible y menos invasivo de relación entre expedientes, ya que, a diferencia de la acumulación y la división, no implica ninguna alteración en la tramitación independiente de cada expediente vinculado.

### Expedientes Relacionados

Los expedientes relacionados son aquellos que, sin acumularse ni dividirse, mantienen entre sí una conexión temática o institucional relevante que conviene que quede explícitamente registrada para facilitar su consulta conjunta (por ejemplo, los sucesivos expedientes de habilitación comercial de un mismo contribuyente a lo largo de los años).

### Expedientes Dependientes

Los expedientes dependientes son aquellos cuya tramitación, sin llegar a fusionarse mediante acumulación, requiere institucionalmente que se resuelva primero el asunto de otro expediente del cual depende su procedencia (por ejemplo, un expediente de adjudicación de una vivienda social que depende de la resolución previa del expediente que aprueba el padrón de beneficiarios). Esta dependencia es de naturaleza declarativa: registra la conexión institucional entre ambos expedientes, pero no bloquea por sí misma el avance del expediente dependiente; es la autoridad competente, no el sistema, quien decide si corresponde aguardar la resolución del expediente del cual depende antes de avanzar.

### Expedientes de Referencia

Los expedientes de referencia son aquellos que se citan como antecedente documental o normativo dentro de la tramitación de otro expediente, sin que medie ninguna relación de dependencia procedimental entre ambos, de forma análoga al mecanismo de referencia documental ya desarrollado en ADR-012.

### Expedientes Complementarios

Los expedientes complementarios son aquellos que, tramitándose de forma independiente, abordan aspectos parciales o conexos de un mismo asunto institucional más amplio, sin que su tramitación conjunta justifique la acumulación formal (por ejemplo, en un proyecto de obra pública de gran escala, un expediente para la expropiación de los terrenos necesarios y otro expediente, separado, para la licitación de la construcción).

### Expedientes Antecedentes

Los expedientes antecedentes son aquellos cuya tramitación previa constituye el fundamento histórico o normativo directo de un expediente posterior (por ejemplo, el expediente de la sanción de una ordenanza que se cita como antecedente directo del expediente de su posterior reglamentación).

Toda vinculación que un expediente tuviera constituida con anterioridad a un proceso de acumulación o división se conserva en su registro histórico y no se traslada automáticamente al expediente principal, hijo o madre resultante de esa operación. Su traslado, cuando corresponda, requiere una decisión institucional explícita que constituya una nueva vinculación, dejando constancia de la vinculación anterior como antecedente.

---

## Ciclo de Vida

### Creado

El expediente está en estado de creado en el instante inmediatamente posterior a la asignación de su identificación única, antes incluso de que se complete la totalidad de los datos de su carátula o se incorpore su primera actuación sustantiva.

### Abierto

El expediente está abierto cuando su carátula está completa y ha comenzado, o está en condiciones de comenzar, a recibir las actuaciones y documentos correspondientes a los procedimientos que va a contener.

### En Trámite

El expediente está en trámite cuando contiene al menos un procedimiento en alguno de los estados de desarrollo activo definidos en ADR-010 (en trámite, pendiente de información, en análisis, en revisión, pendiente de decisión), correspondiendo, en esencia, al estado "activo" ya desarrollado en ADR-010 para el expediente.

### En Revisión

El expediente está en revisión cuando, en su conjunto, se encuentra sometido a un proceso de control institucional global (por ejemplo, una auditoría administrativa o una revisión de gestión) distinto del control específico que pueda estar atravesando, de forma puntual, alguno de los procedimientos que contiene.

### Suspendido

El expediente está suspendido cuando, por decisión institucional o por una causa prevista normativamente, se interrumpe temporalmente la posibilidad de incorporar nuevas actuaciones, conforme al estado homólogo ya definido en ADR-010, sin que ello implique su cierre definitivo.

### Resuelto

El expediente está resuelto cuando el procedimiento o los procedimientos sustantivos que contiene han alcanzado su decisión final conforme a ADR-009 y ADR-010, aunque puedan quedar pendientes actuaciones complementarias (notificaciones, registros administrativos posteriores) antes de su cierre definitivo. La resolución de los procedimientos sustantivos no impide ni agota la posibilidad de nuevas actuaciones dentro del mismo expediente: pueden existir, con posterioridad a la resolución, recursos administrativos interpuestos por el interesado, revisiones de oficio o a instancia de parte, o procedimientos de ejecución de lo decidido, todos los cuales se incorporan al mismo expediente como nuevas actuaciones o, según corresponda, como nuevos procedimientos conexos, sin que el estado de resuelto deba interpretarse como un cierre anticipado de su capacidad de recibir tramitación futura. El expediente mantiene, en todos los casos, continuidad histórica plena entre la decisión original y cualquier actuación posterior vinculada a ella.

### Cerrado

El expediente está cerrado cuando se han completado todas las actuaciones sustantivas y complementarias de los procedimientos que contiene, conforme al estado homólogo ya definido en ADR-010, y no se prevé la apertura de nuevos procedimientos dentro de ese mismo contenedor. Si con posterioridad al cierre se interpone un recurso administrativo, se dispone una revisión de oficio, o se requiere una actuación de ejecución de lo decidido, el expediente no se reabre: esa nueva actuación se tramita en un expediente vinculado o derivado, conforme a los mecanismos ya desarrollados en las secciones de Vinculación y División, preservando la referencia explícita al expediente cerrado que le dio origen.

### Archivado

El expediente está archivado cuando, habiendo sido cerrado, pasa a alguno de los regímenes de conservación desarrollados en su propia sección, fuera del circuito de gestión operativa activa, pero permaneciendo disponible para consulta y auditoría.

### Histórico

El expediente está en estado histórico cuando, además de archivado, alcanza una condición de conservación permanente por su valor institucional, probatorio o patrimonial, conforme a los principios ya desarrollados extensamente en ADR-005 y ADR-012.

---

## Evidencia del Expediente

### Autoría

La autoría, en el plano del expediente, es la atribución cierta de su apertura a la posición que lo inició (ADR-007) y, a lo largo de su historia, la atribución de cada actuación incorporada a quien efectivamente la produjo, conforme a los principios ya establecidos en ADR-006 y ADR-010.

### Trazabilidad

La trazabilidad del expediente es la capacidad de reconstruir, en cualquier momento, su recorrido completo: su apertura, los procedimientos que contuvo, sus eventuales acumulaciones, divisiones y vinculaciones con otros expedientes, y su estado de conservación actual.

### Cadena de Custodia

La cadena de custodia del expediente es el registro ininterrumpido de qué posición tuvo, en cada momento de su historia, la responsabilidad institucional sobre su correcta tramitación y conservación, conforme al concepto ya desarrollado en ADR-012 para el documento, ahora aplicado a la unidad más amplia del expediente en su conjunto. La cadena de custodia incorpora, de forma específica, el historial completo de radicaciones que el expediente atravesó a lo largo de su vida institucional, conforme a la definición de Radicación ya establecida en este documento: cada área que tuvo, en algún momento, la custodia inmediata del expediente, la fecha de inicio y fin de esa radicación, y el fundamento institucional que motivó cada movimiento. Sin este historial completo de radicaciones y sin el fundamento institucional de cada movimiento, la cadena de custodia del expediente queda incompleta, debilitando su valor probatorio ante cualquier cuestionamiento sobre quién tuvo, en un momento determinado, la responsabilidad operativa sobre su tramitación.

La cadena de custodia registra dos series distinguibles y consultables de forma independiente: la responsabilidad institucional del expediente, que corresponde al Responsable y puede permanecer estable a lo largo de toda su tramitación, y la responsabilidad operativa inmediata derivada de cada Radicación sucesiva. Ante una irregularidad detectada en un momento determinado, ambas series deben consultarse conjuntamente: la primera identifica a quién responde por el expediente en su conjunto, la segunda identifica a quién tenía la custodia operativa en el momento específico del hecho.

### Integridad

La integridad del expediente es la garantía de que su historial de actuaciones, documentos y actos no ha sido alterado retroactivamente, conforme al principio de inmutabilidad histórica ya establecido en ADR-005 y reafirmado en cada uno de los documentos de esta serie.

### No Repudio

El no repudio, aplicado al expediente, es la imposibilidad de que la institución niegue la existencia o el contenido de un expediente válidamente registrado, en virtud de la solidez conjunta de su autoría, su trazabilidad y su integridad.

### Relación con ADR-005

Todos los elementos de evidencia del expediente desarrollados en esta sección son una aplicación específica, en el dominio de la unidad expediente, de los principios generales de trazabilidad, integridad, no repudio y responsabilidad institucional ya establecidos con carácter transversal en ADR-005.

---

## Conservación

### Archivo Activo

El expediente, mientras se encuentra en trámite o recién resuelto, permanece en el régimen de archivo activo, con alta frecuencia de consulta operativa y necesidad de acceso inmediato por parte de las áreas intervinientes.

### Archivo Intermedio

El expediente cerrado, que ha dejado de requerir consulta operativa frecuente pero que todavía no ha alcanzado el período de retención que permita evaluar su destino final, pasa al régimen de archivo intermedio, en correspondencia con el régimen homólogo ya desarrollado en ADR-012 para el documento.

### Archivo Histórico

El expediente que, por su valor institucional, probatorio o patrimonial, debe conservarse indefinidamente, pasa al régimen de archivo histórico, independientemente de que ya no tenga ninguna utilidad operativa para la gestión cotidiana.

### Retención

El período de retención del expediente, conforme al principio ya desarrollado en ADR-012, depende de la naturaleza del asunto que contiene y del marco normativo municipal, provincial y nacional aplicable, sin que este modelo fije plazos específicos.

### Conservación Permanente

Determinados expedientes, por la trascendencia institucional de su contenido (expedientes que contienen actos de designación de funcionarios, expedientes legislativos del HCD, expedientes de obras públicas de gran envergadura), deben conservarse de forma permanente, conforme a los principios ya establecidos en ADR-005 y ADR-012.

### Transferencia

La transferencia del expediente entre regímenes de conservación, o, en circunstancias institucionales excepcionales, entre instituciones (conforme a una reorganización de competencias prevista en ADR-001), debe preservar la totalidad de su trazabilidad de origen, en correspondencia con el principio homólogo ya desarrollado en ADR-012 para el documento.

### Eliminación

La eliminación de un expediente, cuando proceda conforme a la política de retención aplicable y siempre que no esté sujeto a conservación permanente, debe ser un proceso institucional formal, registrado como evento de auditoría obligatoria conforme a ADR-005, documentando el hecho de la eliminación, su fecha, su autorización y su fundamento, nunca el contenido eliminado en sí mismo.

---

## Riesgos

### CRÍTICO

**Confundir expediente con procedimiento.** Si el sistema trata al expediente como si fuera el procedimiento mismo, reproduce exactamente el riesgo crítico central ya identificado en ADR-010, perdiendo la capacidad de representar expedientes que contienen múltiples procedimientos relacionados y procedimientos que se tramitan sin expediente formal.

**Confundir expediente con documento.** Si el sistema trata a la totalidad del expediente como si fuera un único documento consolidado, en lugar de un contenedor de múltiples documentos individuales, pierde la capacidad de gestionar correctamente el versionado, la firma individual y la trazabilidad propia de cada documento conforme a ADR-012.

**Pérdida de trazabilidad en procesos de acumulación.** Si la acumulación de expedientes no conserva la identidad histórica de los expedientes acumulados, conforme se desarrolló extensamente en su sección, se pierde la posibilidad de reconstruir el origen de actuaciones anteriores a la acumulación, comprometiendo gravemente la evidencia institucional completa del asunto.

**Acumulación incorrecta de expedientes que afectan a interesados o competencias distintas.** Si se acumulan expedientes que, pese a cierta conexión temática superficial, en realidad requerían tramitación separada por afectar derechos o intereses de personas distintas, se produce una mezcla institucionalmente indebida que puede comprometer las garantías procedimentales de cada interesado individual.

**División incorrecta que fragmenta indebidamente un procedimiento unitario.** Si la división de un expediente separa actuaciones que, por pertenecer a un mismo procedimiento en curso, no debían fragmentarse, se compromete la coherencia institucional de ese procedimiento y la capacidad de la autoridad competente de decidir sobre la totalidad de los elementos relevantes.

**Cierre prematuro de un expediente con procedimientos aún activos.** Si el sistema permite cerrar un expediente mientras todavía contiene procedimientos en estado de desarrollo activo conforme a ADR-010, se interrumpe indebidamente la tramitación de asuntos que la institución todavía debe resolver.

**Eliminación indebida de expedientes sujetos a conservación permanente.** Si el sistema permite eliminar expedientes que, por su naturaleza institucional, deben conservarse indefinidamente, se destruye evidencia institucional que puede ser indispensable para la defensa del municipio en procesos posteriores, replicando el riesgo crítico ya identificado en ADR-005 y ADR-012.

**Expedientes duplicados sobre el mismo asunto sin detección ni vinculación.** Si el sistema no advierte que ya existe un expediente abierto sobre un asunto sustancialmente idéntico al que se pretende iniciar nuevamente, se produce una fragmentación innecesaria de la gestión y un riesgo de decisiones contradictorias sobre la misma materia.

**Expedientes huérfanos sin ningún procedimiento ni responsable identificable.** Si el sistema permite que un expediente permanezca indefinidamente sin contener ningún procedimiento sustantivo ni tener un responsable institucional claramente asignado, se genera un objeto sin ninguna utilidad de gestión que, sin embargo, consume recursos de conservación y puede inducir a confusión sobre su estado real.

**Expedientes sin responsable institucional asignado.** Si un expediente carece, en algún momento de su existencia, de una posición organizacional claramente identificada como responsable de su custodia y seguimiento, ningún actor institucional puede ser efectivamente responsabilizado por demoras, pérdidas o irregularidades en su tramitación.

**Confundir expediente con caso administrativo.** Si el sistema asume que existe una relación obligatoria de uno a uno entre expediente y caso administrativo, conforme se desestimó explícitamente en la sección de Diferencias Fundamentales de este documento, pierde la capacidad de representar casos que requieren más de un expediente para su tramitación completa y expedientes que, tras un proceso de acumulación, contienen más de un caso relacionado. Esta confusión, además, induce a tratar el cierre de un expediente como si fuera necesariamente la resolución del caso que contiene, y viceversa, cuando ambos eventos institucionales pueden ser independientes entre sí.

**Asumir que todo caso administrativo requiere necesariamente un expediente para existir o tramitarse válidamente.** Si el sistema o la práctica institucional asumen que ningún caso puede gestionarse sin la apertura previa de un expediente formal, se contradice lo ya establecido en ADR-010 sobre procedimientos de tramitación simplificada sin expediente, y se fuerza la apertura de expedientes innecesarios para asuntos que la normativa o la práctica institucional habilitan a resolver sin ese contenedor formal.

### ALTO

**Falta de registro explícito del proceso de acumulación o división.** Si la acumulación o la división de expedientes se ejecuta sin que el sistema registre, como evento de auditoría obligatoria conforme a ADR-005, el fundamento, la fecha y la autoridad que dispuso la operación, se debilita la trazabilidad institucional de un evento de alta trascendencia.

**Vinculación entre expedientes sin distinguir el tipo de relación.** Si el sistema no diferencia entre expedientes relacionados, dependientes, de referencia, complementarios y antecedentes (conforme a la tipología desarrollada en este documento), se pierde precisión sobre la naturaleza exacta de la conexión institucional entre ellos.

**Migración de procedimientos entre expedientes sin preservar su historial de actuaciones.** Si, al migrar un procedimiento de un expediente a otro (conforme a un proceso de división o acumulación), su historial de actuaciones previas no se preserva íntegramente, se compromete la reconstrucción completa de su desarrollo institucional.

**Confusión entre expediente principal y expediente acumulado tras la acumulación.** Si no queda claramente establecido cuál de los expedientes acumulados es el principal que continúa recibiendo actuaciones futuras, se pueden producir actuaciones dispersas y contradictorias sobre el mismo asunto ya unificado.

**Expediente derivado sin referencia explícita a su expediente madre.** Si el expediente hijo, nacido de un proceso de división, no conserva la referencia institucional a su expediente madre de origen, se pierde la posibilidad de reconstruir la historia completa del asunto original que se fragmentó.

**Falta de distinción entre el estado del expediente y el estado de los procedimientos que contiene.** Si el sistema asume una correspondencia rígida entre ambos conjuntos de estados, reproduce el riesgo ya identificado extensamente en ADR-010 sobre la independencia de estos dos conjuntos conceptuales.

**Documentos incorporados al expediente sin verificación de su pertinencia institucional.** Si cualquier documento puede incorporarse a un expediente sin verificar mínimamente su relación con el asunto que ese expediente tramita, se introduce ruido documental que dificulta la consulta y puede comprometer la claridad de la cadena documental.

**Expediente mixto sin trazabilidad clara entre su porción física y su porción electrónica.** Si un expediente que combina tramitación en papel y en soporte digital no conserva una referencia clara sobre en qué momento de su historia se produjo la transición entre ambos soportes, se dificulta la reconstrucción completa de su tramitación.

**Falta de verificación de competencia del instructor en cada etapa del expediente.** Si el sistema no verifica que quien impulsa una actuación dentro del expediente tiene la competencia funcional correspondiente, conforme a ADR-007 y ADR-008, se debilita la garantía de regularidad institucional de toda su tramitación.

**Transferencia de expedientes entre instituciones sin registro de la causa institucional que la motiva.** Si la transferencia no documenta el fundamento normativo o administrativo que justifica el traslado de competencia entre instituciones, se compromete la regularidad de esa transferencia.

**Cambios de radicación sin trazabilidad.** Si el sistema permite que un expediente cambie de radicación (conforme a la definición ya establecida en este documento) sin registrar el origen, el destino, la fecha, el fundamento y el responsable de la operación, se pierde la capacidad de reconstruir en qué área se encontraba operativamente el expediente en cada momento de su historia, debilitando tanto la cadena de custodia como la posibilidad de determinar responsabilidades ante demoras o irregularidades en su circulación administrativa.

### MEDIO

**Nomenclatura inconsistente de carátulas entre distintas áreas.** Si distintas áreas redactan las carátulas de sus expedientes con criterios heterogéneos de descripción del asunto, se dificulta la búsqueda y clasificación consolidada.

**Falta de un criterio uniforme sobre cuándo conviene acumular y cuándo conviene vincular.** Sin este criterio institucional, distintas áreas pueden adoptar prácticas heterogéneas ante situaciones de conexión temática similares entre expedientes.

**Ausencia de alertas ante expedientes próximos a su vencimiento de plazo de retención.** Sin estas alertas, la institución pierde la oportunidad de evaluar activamente, en el momento oportuno, el destino de expedientes cuyo período de retención obligatoria está próximo a cumplirse.

**Expedientes en estado suspendido sin revisión periódica de su situación.** Si no existe un proceso de revisión periódica de los expedientes suspendidos, estos pueden permanecer en ese estado más tiempo del institucionalmente razonable, sin que la institución lo advierta activamente.

**Falta de visibilidad consolidada de los expedientes vinculados a un mismo interesado.** Si no existe una vista que permita observar, en conjunto, todos los expedientes en los que una misma persona es interesada, la atención integral a sus distintos asuntos ante el municipio se dificulta.

**Carátulas incompletas en el momento de apertura.** Si el sistema permite la apertura de expedientes con información mínima incompleta (sin asunto claramente descripto, sin interesado identificado cuando corresponde), se generan dificultades de gestión que se manifiestan recién en etapas posteriores de la tramitación.

**Falta de un mecanismo claro para que el interesado externo conozca en qué expediente se tramita su asunto.** Si el ciudadano no puede identificar con facilidad el número de expediente correspondiente a su trámite, aumenta la carga de consultas informales hacia las áreas administrativas.

**Ausencia de indicadores de gestión sobre tiempos de tramitación por tipo de expediente.** Sin esta información agregada, la institución pierde la posibilidad de identificar cuellos de botella recurrentes en determinados tipos de asuntos.

**Documentación histórica referenciada sin verificación de su disponibilidad actual.** Si un expediente cita como antecedente a un expediente histórico que, por algún motivo, ya no está disponible para consulta en las condiciones esperadas, se debilita la fundamentación de la nueva decisión.

**Falta de un proceso de revisión periódica de expedientes en archivo intermedio.** Sin este proceso, los expedientes pueden permanecer indefinidamente en ese régimen sin que se evalúe activamente su paso al archivo histórico o su eventual eliminación conforme a la política de retención.

### BAJO

**Diferencias de estilo en la redacción de carátulas entre instituciones.** No constituye un riesgo institucional grave pero dificulta la comparación cruzada entre la Municipalidad, el HCD y el Hospital.

**Falta de numeración correlativa unificada de expedientes entre instituciones.** Si cada institución numera sus expedientes de forma independiente sin un criterio que permita identificarlos sin ambigüedad en un contexto multi-institucional, la referencia cruzada puede resultar más trabajosa, sin afectar la validez de cada expediente dentro de su propia institución.

**Ausencia de un resumen ejecutivo consolidado del estado de un expediente extenso.** No afecta la validez del expediente, pero puede requerir mayor esfuerzo de consulta para obtener una vista rápida de su situación actual.

**Variabilidad de criterio sobre el nivel de detalle de la carátula entre distintos tipos de asuntos.** No compromete la validez institucional si la información mínima exigida está presente, aunque dificulta levemente la comparación entre expedientes de distinta naturaleza.

**Falta de un glosario institucional accesible sobre los conceptos de acumulación, división y vinculación.** Dificulta la capacitación de personal nuevo en la correcta aplicación de estos mecanismos, sin constituir un riesgo de validez institucional inmediato.

---

## Principios del Modelo

### Legalidad

Todo expediente debe abrirse, tramitarse, acumularse, dividirse y conservarse conforme al marco normativo aplicable a la materia que contiene y a los procedimientos administrativos que regula su tramitación.

### Trazabilidad

Todo expediente debe poder reconstruirse en su totalidad: su apertura, los procedimientos que contuvo, sus eventuales acumulaciones, divisiones y vinculaciones, y su estado de conservación actual.

### Integridad

El historial de un expediente, una vez registrado, no puede alterarse retroactivamente. Toda corrección, acumulación, división o cambio de estado se expresa mediante un nuevo evento que se suma a su historial, nunca mediante la alteración del registro original.

### Continuidad Institucional

La gestión de un expediente no debe interrumpirse por cambios en la estructura organizacional, en el personal responsable o en la tecnología empleada para su soporte, conforme a los principios de continuidad institucional ya establecidos en ADR-007 y ADR-008. Los cambios de radicación, en particular, no constituyen una interrupción de esta continuidad: son movimientos operativos previstos por el propio modelo que no afectan la identidad ni el historial del expediente.

### Conservación

Todo expediente debe conservarse durante el período que su naturaleza, su valor probatorio y el marco normativo aplicable exijan, conforme a los regímenes de archivo activo, intermedio, histórico y conservación permanente desarrollados en este documento.

### Accesibilidad

Todo expediente debe permanecer disponible para consulta por parte de quienes tengan legitimidad institucional para hacerlo, durante todo el período de su conservación, independientemente de los cambios tecnológicos que puedan producirse en su soporte.

### Inmutabilidad Histórica

El historial de actuaciones, documentos y actos de un expediente, una vez registrado, no puede eliminarse. Los procesos de acumulación y división se documentan como eventos adicionales que se suman al historial, sin borrar ni reescribir lo que ya ha ocurrido.

### Separación Expediente-Procedimiento

El expediente es el contenedor; el procedimiento (ADR-010) es la secuencia institucional que ese contenedor registra. Esta separación es absoluta y no admite excepciones de diseño que las colapsen en un único objeto.

### Separación Expediente-Documento

El expediente es la unidad de agrupación; el documento (ADR-012) es cada unidad individual de soporte material que el expediente contiene. Un expediente no es, por sí solo, equivalente a ninguno de los documentos que agrupa, ni a la suma indiferenciada de todos ellos.

### Separación Expediente-Acto

El expediente puede contener uno, varios o ningún acto administrativo (ADR-009) a lo largo de su tramitación, sin identificarse jamás con ninguno de ellos individualmente.

### Separación Expediente-Caso

El expediente no es el caso administrativo, ni el caso administrativo es el expediente. No existe entre ambos una cardinalidad obligatoria: un caso puede requerir, a lo largo de su tramitación, más de un expediente, y un expediente puede contener más de un caso relacionado. Ninguna implementación futura de Muni Digital debe asumir, en su diseño técnico, una relación de uno a uno entre expediente y caso como condición estructural del modelo.

---

## Relación con los ADR Anteriores

### Relación con ADR-001 — Organizational Context Model

Todo expediente pertenece a una institución determinada, conforme al aislamiento organizacional ya establecido en ADR-001. La gestión de expedientes de cada institución es independiente, salvo los casos de transferencia o vinculación interinstitucional explícitamente previstos y debidamente fundados.

### Relación con ADR-005 — Audit Model

Todos los elementos de evidencia del expediente desarrollados en este documento (autoría, trazabilidad, cadena de custodia, integridad, no repudio) son una aplicación específica, en el dominio de la unidad expediente, de los principios generales de auditoría institucional ya establecidos con carácter transversal en ADR-005. Todo evento relevante del ciclo de vida del expediente (apertura, acumulación, división, vinculación, cambio de estado, archivo, eliminación) constituye auditoría obligatoria conforme a ese modelo.

### Relación con ADR-006 — Person & Identity Model

El interesado de un expediente, cuando corresponde a una persona física, se identifica conforme a la identidad única definida en ADR-006, garantizando que la misma persona no tenga múltiples identidades que fragmenten la trazabilidad de los distintos expedientes en los que interviene a lo largo del tiempo.

### Relación con ADR-007 — Organizational Position Model

El instructor y el responsable de un expediente son posiciones organizacionales conforme a ADR-007, no personas individuales. La competencia para iniciar, instruir o responder por un expediente determinado deriva de la posición que el organigrama institucional asigna, no de quien en cada momento la ocupa. La radicación del expediente, conforme a la definición incorporada en este documento, es asimismo una ubicación dentro de la misma estructura organizacional de ADR-007, y la competencia del expediente, también incorporada en este documento, deriva directamente de esa misma estructura: ambos conceptos extienden, sin contradecirlo, el modelo de posiciones ya establecido en ADR-007.

### Relación con ADR-008 — Organizational Authority & Delegation Model

Las decisiones de mayor trascendencia institucional sobre un expediente (su acumulación, su división, su cierre cuando contiene actos de relevancia) requieren que quien las disponga ejerza válidamente la autoridad de la posición competente, en cualquiera de los cinco caracteres definidos en ADR-008.

### Relación con ADR-009 — Administrative Act & Resolution Model

Los actos administrativos producidos dentro de los procedimientos que un expediente contiene se registran dentro de él, sin que el expediente se identifique con ninguno de esos actos individualmente, conforme a la separación ya establecida extensamente en ADR-009 y reafirmada con mayor profundidad en este documento.

### Relación con ADR-010 — Administrative Procedure & Case Lifecycle Model

El expediente registra y conserva uno o más procedimientos relacionados, conforme al modelo ya establecido en ADR-010. Este documento desarrolla, con mayor profundidad y exhaustividad, todos los aspectos de la naturaleza del expediente que ADR-010 había introducido como contraposición necesaria al procedimiento, sin contradecir en ningún punto lo allí ya establecido.

### Relación con ADR-011 — Digital Signature & Institutional Validation Model

El expediente no se firma como unidad: lo que se firma son los documentos individuales que contiene, conforme al modelo de validación institucional desarrollado en ADR-011. Este documento desarrolla explícitamente esta distinción para prevenir la confusión coloquial entre "expediente firmado" y "documento o acto firmado dentro de un expediente".

### Relación con ADR-012 — Document & Institutional Record Model

El expediente agrupa, de forma cronológica, los documentos producidos en la tramitación de los procedimientos que contiene, conforme al modelo ya establecido en ADR-012. Este documento desarrolla, con mayor profundidad, los mecanismos específicos de acumulación, división y vinculación entre expedientes que ADR-012 no tuvo como objetivo principal desarrollar, centrado como estaba en la unidad documento individual.

---

## Administrative Case File & Dossier Model v1 Recomendado

El modelo conceptual definitivo de expediente administrativo de Muni Digital se define de la siguiente manera:

### Qué es el Expediente

El expediente es la unidad institucional de agrupación y conservación que organiza, de forma ordenada, cronológica y trazable, las actuaciones, documentos y actos administrativos producidos en relación con uno o más procedimientos sobre un asunto determinado, con una identificación única, un responsable institucional determinado y un historial propio que persiste independientemente de las vicisitudes de los procedimientos que en cada momento contiene.

### Qué Contiene

El expediente contiene actuaciones (ADR-010), documentos (ADR-012, incluyendo documentos principales, adjuntos y referenciados) y actos administrativos (ADR-009), organizados cronológicamente conforme a su producción, y conserva, además, el registro explícito de sus eventuales procesos de acumulación, división y vinculación con otros expedientes.

### Qué No Contiene

El expediente no contiene, en el sentido de identificarse con ellos, ningún procedimiento individual (que conserva su propia identidad y ciclo de vida conforme a ADR-010), ningún acto administrativo individual (que conserva su propia validez y efectos conforme a ADR-009), y ninguna firma propia distinta de las firmas individuales que recaen sobre los documentos que agrupa.

### Cómo se Relaciona con Actos

El expediente registra los actos administrativos producidos dentro de los procedimientos que contiene, incluyendo sus eventuales revocaciones, anulaciones o reemplazos, sin que ninguno de esos eventos afecte la identidad ni la continuidad del expediente en su conjunto.

### Cómo se Relaciona con Procedimientos

El expediente contiene y organiza cronológicamente a uno o más procedimientos relacionados con su asunto, los cuales conservan su propia capacidad de iniciarse, desarrollarse y finalizar conforme a sus propios estados, en relativa independencia del estado general del expediente.

### Cómo se Relaciona con Documentos

El expediente agrupa cronológicamente los documentos producidos o incorporados durante la tramitación de sus procedimientos, distinguiendo entre documentos principales, adjuntos y referenciados, sin identificarse con ninguno de ellos individualmente.

### Cómo se Conserva

El expediente se conserva conforme a los regímenes de archivo activo, intermedio e histórico, y eventualmente de conservación permanente, según la naturaleza de su asunto, su valor probatorio y el marco normativo aplicable, garantizando en todo momento su integridad, su trazabilidad y su accesibilidad.

### Cómo Mantiene Evidencia Institucional

El expediente mantiene evidencia institucional mediante el registro inmutable de su apertura, de cada actuación, documento y acto incorporado, de sus eventuales acumulaciones, divisiones y vinculaciones, y de su responsable institucional en cada momento de su historia, conforme a los principios generales de auditoría ya establecidos en ADR-005.

---

## Roadmap Conceptual

### P0 — Aprobación conceptual — **COMPLETED**

**Objetivo:** Validar y aprobar este documento como fuente de verdad conceptual definitiva sobre el concepto de expediente en Muni Digital.

Dependencias: ADR-001 a ADR-012 aprobados. Este documento revisado por el equipo de arquitectura, los referentes de Mesa de Entradas y Archivo Municipal, los referentes legales o de asesoría jurídica municipal (dado que los plazos de retención y los regímenes de conservación permanente dependen del marco normativo de archivo aplicable), y los referentes operativos de las áreas de mayor volumen de tramitación (RRHH, Compras, Obras Públicas, HCD).

Criterio de cierre: El equipo puede responder sin ambigüedad qué es un expediente, en qué se diferencia de un procedimiento, un documento, un acto, un archivo, un legajo y un dossier, cómo se acumula, cómo se divide, cómo se vincula con otros expedientes, y por qué un expediente no se firma en el sentido pleno que ADR-011 reserva para los documentos y actos individuales.

Riesgo: CRÍTICO si los módulos de Mesa de Entradas, Expedientes Electrónicos o Archivo Digital inician o continúan su diseño técnico sin este modelo aprobado. La ausencia de este modelo definitivo obliga a esos módulos a resolver ad hoc, en cada caso, qué es un expediente, reproduciendo las confusiones identificadas en el Resumen Ejecutivo de este documento.

**Estado de cierre:** Este ADR fue sometido a revisión formal por el Architecture Review Board. La versión 1.1 obtuvo un veredicto inicial de NO APROBABLE, con 7 hallazgos críticos y 7 hallazgos altos. El Plan de Cambios ADR-013.1 → ADR-013.2, consolidado en la presente versión 1.2, resolvió la totalidad de los hallazgos críticos y los hallazgos altos bloqueantes. La segunda pasada de validación del Architecture Review Board emitió el veredicto APROBABLE CON OBSERVACIONES, quedando las observaciones remanentes reclasificadas como recomendaciones no bloqueantes. **P0 queda formalmente completado. El documento está APPROVED y habilitado para avanzar a P1.**

---

### P1 — Diseño técnico

**Objetivo:** Traducir el modelo conceptual en decisiones de diseño técnico: cómo se representa el expediente como unidad institucional independiente del procedimiento, el documento y el acto, cómo se modelan los procesos de acumulación, división y vinculación, y cómo se representa su ciclo de vida y sus regímenes de conservación.

Dependencias: P0 cerrado. ADR-009, ADR-010, ADR-011 y ADR-012 implementados en su diseño técnico. ADR-005 implementado en su diseño técnico.

Criterio de cierre: El diseño técnico mantiene la independencia conceptual entre expediente, procedimiento, documento y acto. El diseño representa los procesos de acumulación y división preservando la identidad histórica de los expedientes acumulados y la trazabilidad bidireccional entre expedientes madre e hijo. El diseño admite que un expediente contenga más de un procedimiento y que un procedimiento, en circunstancias excepcionales, migre entre expedientes sin pérdida de su historial. El diseño no introduce un estado de "expediente firmado" como categoría propia.

Riesgo: ALTO. Es el momento donde la presión de simplicidad técnica puede llevar a modelar el expediente como un simple agregador plano de archivos sin distinguir entre acumulación, división y vinculación, o a introducir una identidad de firma propia del expediente que contradiga lo ya establecido en este documento.

Archivos conceptuales que debe cubrir el diseño: modelo de expediente con su carátula y metadatos, modelo de relación entre expediente y procedimiento (de cardinalidad flexible), modelo de acumulación con preservación de identidad histórica, modelo de división con trazabilidad bidireccional, modelo de vinculación con sus distintos tipos, modelo de regímenes de conservación con sus criterios de transición, integración con la capa de documentos de ADR-012 y de actos de ADR-009.

---

### P2 — Implementación del núcleo de expedientes

**Objetivo:** El sistema puede crear expedientes con su carátula completa, incorporar documentos y actuaciones a lo largo de su tramitación, ejecutar procesos de acumulación y división preservando la trazabilidad bidireccional, y registrar su paso entre los distintos regímenes de conservación.

Dependencias: P1 cerrado.

Criterio de cierre: Es posible abrir un expediente con la información mínima de carátula exigida. Es posible que un expediente contenga más de un procedimiento, cada uno con su propio estado verificable de forma independiente. La acumulación de dos expedientes preserva la identidad histórica de ambos, permitiendo consultar el expediente acumulado de forma independiente aun después de la acumulación. La división de un expediente preserva la referencia bidireccional entre el expediente madre y el expediente hijo. La auditoría obligatoria de cada evento del ciclo de vida del expediente está activa.

Rollback: Si P2 permite que una acumulación o división elimine o haga inconsultable la identidad histórica de algún expediente afectado, revertir el módulo hasta corregir. Un sistema de expedientes que no garantiza la preservación de la identidad histórica en estos procesos no debe liberarse a producción, dado el valor institucional y probatorio que estos registros representan para el municipio.

---

### P3 — Integración con Mesa de Entradas, Procedimientos, Documentos, Firma y Notificaciones

**Objetivo:** El módulo de Mesa de Entradas incorpora la apertura formal de expedientes a partir de presentaciones externas. El módulo de Procedimientos opera sobre expedientes existentes o habilita procedimientos sin expediente formal cuando corresponda. El módulo de Documentos organiza la cadena documental dentro de cada expediente. El módulo de Firma valida los documentos y actos individuales contenidos en el expediente. El módulo de Notificaciones comunica formalmente a los interesados las decisiones registradas dentro del expediente.

Dependencias: P2 cerrado. ADR-009, ADR-010, ADR-011 y ADR-012 implementados. ADR-005 implementado.

Criterio de cierre: Una presentación ciudadana recibida en Mesa de Entradas puede dar lugar a la apertura de un nuevo expediente o a la incorporación de actuaciones a uno existente, sin pérdida de trazabilidad. Un expediente de obra pública puede mostrar, organizados cronológicamente, los sucesivos procedimientos que contiene y la totalidad de su cadena documental. Un acto contenido en un expediente puede mostrarse con su estado de validación conforme a ADR-011, distinguible del estado general del expediente que lo contiene. Un proceso de acumulación o división ejecutado en producción puede auditarse íntegramente, mostrando su fundamento, su fecha y la autoridad que lo dispuso.

---

> Este documento define el modelo conceptual definitivo de expediente administrativo de Muni Digital v1.2.
>
> Estado: **APPROVED.**
>
> No debe modificarse sin revisión del equipo de arquitectura, los referentes de Mesa de Entradas y Archivo Municipal, los referentes legales, y aprobación formal.
>
> Extiende ADR-001, ADR-005, ADR-006, ADR-007, ADR-008, ADR-009, ADR-010, ADR-011 y ADR-012 sin contradecirlos. Reemplaza íntegramente a ADR-013.1, consolidando el Plan de Cambios que resolvió la totalidad de los hallazgos críticos y altos bloqueantes identificados por el Architecture Review Board, e incorporando de forma definitiva los conceptos de Radicación y Competencia del Expediente, y la precisión de la relación entre Expediente y Caso administrativo.
>
> Aprobado por el Architecture Review Board con veredicto APROBABLE CON OBSERVACIONES. Las observaciones remanentes constituyen recomendaciones no bloqueantes y no condicionan el avance a P1.
>
> Es la fuente de verdad conceptual definitiva para Mesa de Entradas, Expedientes Electrónicos, Gestión Documental, Archivo Digital, Procedimientos, Actos Administrativos, Notificaciones, Compras, RRHH, Obras Públicas y HCD.
>
> Próximo documento recomendado:
>
> ADR-014 — Notification & Public Communication Model v1.