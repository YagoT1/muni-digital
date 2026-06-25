# ADR-009 — Administrative Act & Resolution Model v1 — Muni Digital

> Documento conceptual del modelo de acto administrativo y resoluciones.
> Basado en: PDA.md · ADR-001 · ADR-002 · ADR-003 · ADR-004 · ADR-005 · ADR-006 · ADR-007 · ADR-008
> Estado: Propuesta para revisión y aprobación.
> Restricción: Este documento NO define tablas, entidades técnicas, código, APIs, JWT, infraestructura, UI ni implementación.
> Este documento es la fuente de verdad conceptual para Expedientes, Resoluciones, Decretos, Disposiciones y Firma Digital.

---

## Resumen Ejecutivo

ADR-008 resolvió quién puede decidir dentro de Muni Digital: estableció que la autoridad institucional pertenece a la posición organizacional, que se ejerce a través de quien la ocupa, y que puede delegarse, sustituirse o sucederse bajo reglas explícitas. Queda pendiente una pregunta que ningún sistema de gobierno digital puede postergar: ¿qué produce exactamente esa autoridad cuando se ejerce? La respuesta institucional tiene un nombre preciso en la tradición administrativa argentina: el acto administrativo.

Los sistemas de gestión municipal cometen, con extraordinaria regularidad, tres confusiones que este documento debe desarmar antes de que cualquier módulo de Expedientes, Resoluciones o Firma Digital comience su diseño técnico.

La primera confusión es tratar al expediente como si fuera el acto. Un expediente es un contenedor administrativo: agrupa documentos, informes, dictámenes y, eventualmente, uno o varios actos administrativos a lo largo de su tramitación. Cuando el sistema asume que "resolver el expediente" es lo mismo que "dictar el acto", pierde la capacidad de representar expedientes que nunca producen un acto, actos que se dictan sin expediente previo, y expedientes que contienen múltiples actos sucesivos a lo largo de su tramitación.

La segunda confusión es tratar al documento como si fuera el acto. Un documento transporta información: un PDF, una nota, un informe técnico. El acto administrativo produce efectos institucionales: modifica una situación jurídica, autoriza algo, deniega algo, certifica algo. Cuando el sistema confunde ambos, termina otorgando valor de decisión institucional a cualquier papel que se suba al sistema, o, en sentido inverso, despoja de soporte documental adecuado a decisiones que sí tienen consecuencias jurídicas.

La tercera confusión es tratar a la firma como si fuera el acto. La firma valida que el acto fue dictado por la autoridad competente; no es la que crea el contenido decisorio del acto. Cuando el sistema asume que "firmar" es sinónimo de "decidir", pierde la capacidad de representar el período de elaboración y revisión que precede a la firma, y corre el riesgo de tratar como inexistente a un acto que fue válidamente decidido pero que aún no completó su circuito de firma.

Las consecuencias institucionales de estas tres confusiones son severas: actos sin trazabilidad de su autoría real, expedientes que no pueden auditarse porque se confunden con decisiones puntuales, y sistemas de firma digital que validan documentos sin verificar si quien firma tenía la competencia institucional para hacerlo, en los términos que ya estableció ADR-008.

La decisión central de este documento es la siguiente:

**Un acto administrativo es un objeto institucional independiente que representa una decisión formal emitida por una autoridad válida, en ejercicio de una competencia legítima, dentro de una institución determinada y con efectos jurídicos o administrativos identificables. Un acto administrativo no es un expediente. Un expediente puede contener múltiples actos administrativos. La firma valida un acto; la firma no crea el acto.**

Este modelo establece las definiciones, los elementos constitutivos, los tipos, los estados y el ciclo de vida del acto administrativo en Muni Digital, y su relación estructural con la autoridad de ADR-008, la posición de ADR-007 y la auditoría de ADR-005.

---

## Definiciones Fundamentales

### Acto Administrativo

El acto administrativo es la manifestación de voluntad institucional, emitida por una autoridad competente en ejercicio de una atribución legítima, que produce efectos jurídicos o administrativos identificables dentro de una institución determinada. El acto es el objeto central de este documento: existe con independencia del expediente que pudo haberlo originado, del documento que lo soporta materialmente y de la firma que lo valida.

### Documento

El documento es el soporte material o digital que registra información. Transporta contenido pero no produce, por sí mismo, efectos institucionales. Un informe técnico, una nota interna, un correo electrónico institucional y el archivo digital que contiene el texto de una resolución son todos documentos. Un acto administrativo necesita estar soportado en al menos un documento para ser comunicable y conservable, pero el documento no es el acto: es su vehículo.

### Expediente

El expediente es el contenedor institucional que agrupa de forma ordenada y cronológica los documentos, informes, dictámenes, actos y notificaciones producidos en la tramitación de un asunto administrativo. El expediente organiza la secuencia de actuación; no decide nada por sí mismo. Un expediente puede tramitarse íntegramente sin que se dicte un acto administrativo formal (por ejemplo, un expediente que se archiva sin resolución porque el interesado desiste). Un expediente puede contener varios actos administrativos sucesivos (una providencia que ordena un informe, un dictamen que opina, una resolución que decide, una notificación que comunica esa resolución).

### Firma

La firma es la manifestación formal mediante la cual la autoridad competente, ejerciendo la autoridad institucional definida en ADR-008, valida que un acto administrativo fue dictado por ella y produce, a partir de ese momento, los efectos que le son propios. La firma es la condición de validez del acto frente a terceros, pero no es la fuente de su contenido decisorio: el acto pudo haber sido elaborado, motivado y redactado con anterioridad a la firma; lo que la firma agrega es la validación institucional de que la autoridad competente asume esa decisión como propia.

### Competencia

La competencia es el conjunto de materias, facultades y atribuciones que el marco normativo y el organigrama institucional asignan a una posición determinada, conforme a ADR-007. La competencia es lo que habilita a una posición a producir válidamente un tipo de acto administrativo determinado sobre una materia determinada. No toda autoridad institucional (ADR-008) implica competencia sobre cualquier materia: un Director tiene autoridad institucional dentro de su Dirección, pero su competencia se limita a las materias que el organigrama y la normativa le asignan específicamente.

### Autoridad

Conforme a ADR-008, la autoridad es la capacidad reconocida formalmente para tomar decisiones, comprometer a la institución y dirigir a otras posiciones, capacidad que pertenece a la posición organizacional y que la persona ejerce mientras la ocupa, ya sea como titular, delegado, suplente, interino o sucesor. En este documento, la autoridad es la condición subjetiva habilitante: quien dicta un acto debe estar ejerciendo válidamente la autoridad de la posición competente para esa materia.

### Posición

Conforme a ADR-007, la posición es el lugar formal en la estructura institucional que existe con independencia de quien lo ocupe. La posición es el ancla institucional de la competencia: la competencia para dictar determinado tipo de acto no pertenece a una persona sino a la posición, y se ejerce por quien válidamente la ocupa en cada momento.

### Institución

Conforme a ADR-001, la institución es la unidad organizacional de mayor nivel (Municipalidad, HCD, Hospital, instituciones futuras), cada una con autonomía administrativa y aislamiento de datos respecto de las demás. Todo acto administrativo se dicta dentro de una institución determinada y produce efectos primariamente dentro de su ámbito, salvo los casos de actos con efectos interinstitucionales explícitamente previstos.

### Efecto Jurídico

El efecto jurídico es la consecuencia que un acto administrativo produce sobre derechos, obligaciones o situaciones jurídicas de personas determinadas o determinables, sean empleados, ciudadanos, contratistas o terceros. Un decreto que designa a un funcionario produce efecto jurídico sobre la situación de esa persona. Una resolución que rechaza un reclamo produce efecto jurídico sobre la pretensión del reclamante.

### Efecto Administrativo

El efecto administrativo es la consecuencia que un acto produce sobre la organización interna o el funcionamiento de los procesos institucionales, sin necesariamente alterar derechos de terceros de forma directa. Una providencia que ordena pasar un expediente a otra área produce efecto administrativo sobre la tramitación, sin decidir sobre el fondo del asunto.

---

## ¿Qué es un Acto Administrativo?

El acto administrativo es un objeto institucional con existencia propia, independiente del expediente que lo contiene, del documento que lo soporta y de la firma que lo valida. Esta independencia tiene consecuencias conceptuales precisas que deben quedar establecidas sin ambigüedad.

### Independencia del expediente

El acto puede existir conceptualmente sin estar inserto en un expediente formal, en aquellos casos en que la normativa o la práctica institucional prevén actos de emisión directa (por ejemplo, ciertas certificaciones de mero trámite). De modo inverso, un expediente puede tramitarse en su totalidad sin que llegue a producirse un acto administrativo formal, si el asunto se resuelve por desistimiento, archivo o caducidad sin necesidad de un pronunciamiento decisorio. El expediente es el contexto procedimental; el acto es la decisión que, eventualmente, ese contexto produce.

### Independencia del documento

El acto administrativo puede estar soportado en uno o varios documentos (el texto de la resolución, sus considerandos, los anexos técnicos que la fundamentan), pero el acto no se identifica con ninguno de esos documentos individualmente. Si el documento que soporta materialmente al acto se pierde, se corrompe o debe reemplazarse por un duplicado certificado, el acto administrativo en sí mismo no deja de haber existido ni pierde sus efectos: lo que se pierde o reemplaza es su soporte documental, no la decisión institucional que el acto representa.

### Independencia de la firma

El acto administrativo nace en el momento en que la autoridad competente forma y expresa su voluntad institucional decisoria, no en el momento en que estampa su firma. Esta distinción, que se desarrolla con mayor profundidad en la sección de Estados del Acto, es fundamental para representar correctamente los períodos de elaboración, revisión y circuito de firma que preceden a la validación final. La firma es la condición que habilita al acto a producir efectos plenos frente a terceros; no es la génesis de su contenido decisorio.

---

## Elementos Constitutivos del Acto

Todo acto administrativo, para ser válido, requiere la concurrencia de los siguientes elementos constitutivos. La ausencia de cualquiera de ellos compromete la validez del acto.

### Autoridad Competente

El acto debe ser dictado por la posición que tiene competencia institucional sobre la materia, ejercida válidamente por quien la ocupa en el carácter que corresponda (titular, delegado, suplente, interino o sucesor), conforme a ADR-008. Un acto dictado por una posición sin competencia sobre la materia, o por una persona que no ejerce válidamente la autoridad de la posición competente, carece de este elemento esencial.

### Voluntad Institucional

El acto debe expresar una decisión real de la autoridad competente, no una mera formalidad vacía de contenido decisorio. La voluntad institucional es lo que distingue a un acto administrativo de un documento puramente informativo: el acto decide, autoriza, deniega, certifica o dispone algo concreto.

### Objeto

El objeto es aquello sobre lo que el acto decide: el contenido específico de la decisión. Debe ser preciso, posible y conforme al ordenamiento jurídico aplicable. "Designar a Juan Pérez en el cargo de Director de Obras Públicas a partir del 1 de julio" es un objeto preciso; "mejorar la gestión del área" no constituye, por su vaguedad, un objeto de acto administrativo idóneo.

### Motivo

El motivo es la razón de hecho y de derecho que justifica la decisión: los antecedentes, las circunstancias y el fundamento normativo que la autoridad invoca para decidir en ese sentido. El motivo se expresa habitualmente en los considerandos del acto.

### Finalidad

La finalidad es el propósito institucional que el acto persigue, que debe ser coherente con la competencia ejercida y con el interés público que la posición está llamada a satisfacer. Un acto dictado para una finalidad distinta de la prevista por la norma que otorga la competencia (por ejemplo, una designación de personal dictada con la finalidad real de eludir un proceso de concurso) compromete la validez del acto por desviación de su finalidad institucional.

### Forma

La forma es el conjunto de requisitos formales que el acto debe cumplir para ser válido: la modalidad de exteriorización (escrita, en este contexto generalmente digital), la estructura que corresponde a su tipo (considerandos, parte resolutiva, firma), y los recaudos de publicidad o notificación que el ordenamiento exige según el tipo de acto y sus destinatarios.

### Competencia

La competencia, ya definida, es el elemento que conecta al acto con la posición organizacional de ADR-007: el acto solo es válido si la materia sobre la que decide está dentro del ámbito de competencia que el organigrama y la normativa asignan a la posición que lo dicta.

### Efecto

El efecto es la consecuencia jurídica o administrativa que el acto produce una vez que entra en vigencia. Todo acto administrativo debe tener un efecto identificable; un acto sin ningún efecto reconocible no cumple su función institucional y carece de razón de ser como tal.

---

## Tipos de Actos Administrativos

### Decreto

El decreto es el acto de mayor jerarquía emitido por el Departamento Ejecutivo Municipal, generalmente reservado a la firma del Intendente (o de quien válidamente ejerza esa autoridad conforme a ADR-008). Se emplea para decisiones de gobierno de relevancia institucional: la promulgación de ordenanzas, la designación de funcionarios políticos, la declaración de emergencias, la aprobación de reglamentaciones. Requiere la competencia y autoridad propias del máximo nivel del Ejecutivo.

### Resolución

La resolución es el acto administrativo emitido habitualmente por Secretarios, Subsecretarios o Directores dentro del ámbito de su competencia, para decidir sobre asuntos de gestión que no requieren la jerarquía de un decreto. Es, junto con el decreto, uno de los tipos de acto más frecuentes en la operación municipal cotidiana: resolver un reclamo, aprobar un gasto dentro de la competencia del área, designar una comisión de trabajo interna.

### Disposición

La disposición es el acto emitido por posiciones de nivel jerárquico intermedio, generalmente Direcciones o Jefaturas, para decidir sobre cuestiones de alcance más acotado que las resoluciones, dentro del ámbito específico de su unidad organizacional. La disposición suele regular aspectos operativos o de detalle dentro del marco ya establecido por una resolución o decreto superior.

### Providencia

La providencia es el acto de mero trámite que impulsa el procedimiento administrativo sin decidir sobre el fondo del asunto: ordena pasar el expediente a otra área, solicita un informe, fija un plazo procedimental. La providencia tiene efecto administrativo (impulsa la tramitación) pero generalmente no produce, por sí misma, efecto jurídico sustantivo sobre derechos de terceros.

### Dictamen

El dictamen es el acto de opinión técnica o jurídica emitido por un área especializada (típicamente Asesoría Legal, o un área técnica competente) dentro de la tramitación de un expediente, que no decide sino que asesora a la autoridad que sí tiene competencia decisoria. El dictamen no es vinculante por sí mismo salvo que la normativa expresamente le otorgue ese carácter; su función institucional es ilustrar el criterio de la autoridad decisoria, no sustituirla.

### Circular

La circular es el acto mediante el cual una autoridad competente comunica criterios, instrucciones o lineamientos de aplicación general dentro de su ámbito de competencia, generalmente con destino a las posiciones subordinadas. Tiene efecto administrativo interno y, según su contenido, puede tener trascendencia hacia terceros si establece criterios de aplicación de normas que los afectan.

### Instrucción

La instrucción es similar a la circular pero con un carácter más operativo y específico: ordena un curso de acción determinado a posiciones subordinadas dentro de una competencia jerárquica de dirección. Se diferencia de la circular en que la instrucción suele ser más puntual y dirigida a una situación concreta, mientras que la circular tiende a fijar criterios de aplicación más generales y duraderos.

### Certificación

La certificación es el acto mediante el cual la autoridad competente da fe formal de un hecho, una situación o una condición determinada (la certificación de servicios de un empleado, la certificación de un domicilio, la certificación de libre deuda). Su efecto es declarativo: no crea una situación nueva sino que da constancia oficial de una situación preexistente.

### Autorización

La autorización es el acto mediante el cual la autoridad competente habilita a alguien (un empleado, un ciudadano, un contratista) a realizar una conducta que, sin esa habilitación, no podría realizarse válidamente (autorizar el uso de un vehículo oficial, autorizar una obra particular, autorizar un gasto). Tiene efecto jurídico directo sobre la esfera de quien recibe la autorización.

### Acta

El acta es el acto que registra formalmente lo ocurrido en una reunión, sesión o procedimiento determinado, dando fe de su desarrollo y de las decisiones tomadas en su seno (el acta de una sesión del HCD, el acta de una comisión de adjudicación de una licitación). El acta tiene valor probatorio sobre lo allí consignado y puede, según su contenido, incorporar dentro de sí otros actos administrativos (por ejemplo, el acta de sesión del HCD que registra la sanción de una ordenanza).

### Notificación

La notificación es el acto mediante el cual se pone en conocimiento formal de un interesado el contenido de otro acto administrativo que lo afecta, produciendo a partir de ese momento los efectos procedimentales correspondientes (el inicio del cómputo de plazos para recurrir, por ejemplo). La notificación no decide sobre el fondo; comunica formalmente una decisión ya tomada por otro acto.

### Síntesis sobre los tipos

Cada tipo de acto requiere una autoridad y una competencia determinadas, conforme a la posición que lo dicta (ADR-007) y al carácter de su ejercicio (ADR-008). Un decreto requiere la autoridad del Intendente (titular, delegado conforme a lo delegable, interino o sucesor válidamente constituido). Una resolución requiere la autoridad de la posición de Secretario, Subsecretario o Director según la materia. Una providencia o un dictamen pueden requerir un nivel de autoridad considerablemente menor, acorde a su menor trascendencia institucional.

---

## Diferencia entre Acto y Documento

Un documento transporta información. Un acto produce efectos institucionales. Esta diferencia, aparentemente sencilla, es la fuente de errores de diseño recurrentes cuando se confunde "cargar un documento en el sistema" con "dictar un acto administrativo".

Considérese el siguiente ejemplo: un informe técnico elaborado por un ingeniero municipal sobre el estado de un puente es un documento. Contiene información valiosa, pero no decide nada por sí mismo: no autoriza una obra, no compromete fondos, no modifica ninguna situación jurídica. Cuando el Director de Obras Públicas, sobre la base de ese informe, dicta una disposición que ordena el cierre preventivo del puente, allí sí existe un acto administrativo: produce el efecto jurídico y administrativo de restringir el tránsito y genera obligaciones de cumplimiento.

Otro ejemplo: el texto completo de una resolución, redactado y guardado como archivo digital antes de su firma, es un documento que contiene el contenido de un acto en preparación. El acto administrativo, en sentido pleno, solo existe una vez que la autoridad competente expresa su voluntad institucional decisoria sobre ese contenido (lo cual, como se desarrolla en la sección de Estados, puede ocurrir incluso antes de la firma formal, en el momento en que la decisión queda formada, aunque su validación plena frente a terceros requiera la firma).

El sistema debe tratar a los documentos como soporte material de los actos, identificables y conservables, pero conceptualmente subordinados al acto que representan o que lo originan como antecedente (informes, dictámenes, notas).

---

## Diferencia entre Acto y Expediente

El expediente es un contenedor institucional. Organiza, en orden cronológico, la secuencia de documentos, informes, dictámenes, actos y notificaciones que se producen en la tramitación de un asunto. El expediente no decide: ordena la decisión.

Dentro de un mismo expediente pueden producirse múltiples actos administrativos de distinto tipo, en distintos momentos de su tramitación: una providencia inicial que da curso al trámite, un dictamen de asesoría legal que opina sobre la procedencia del reclamo, una resolución final que decide sobre el fondo, y una notificación que comunica esa resolución al interesado. Todos estos actos pertenecen a un mismo expediente, pero son objetos distintos entre sí, cada uno con sus propios elementos constitutivos, su propia autoridad competente y su propio ciclo de vida.

Un expediente puede existir y tramitarse íntegramente sin que se produzca jamás una resolución formal: el interesado puede desistir de su pretensión, el trámite puede caducar por inactividad, o el asunto puede resolverse por una vía distinta a la decisión formal (por ejemplo, mediante un acuerdo informal que pone fin al interés en continuar el trámite, dejando el expediente para su archivo sin acto decisorio).

De modo inverso, ciertos actos administrativos pueden dictarse sin que medie un expediente formal previo, cuando la normativa o la práctica institucional prevén su emisión directa: una certificación de mero trámite solicitada y emitida en el mismo acto, sin necesidad de abrir un expediente completo para su tramitación.

El modelo conceptual establece, por lo tanto, que el expediente y el acto son objetos institucionales distintos, relacionados por contención (el expediente puede contener actos) pero no equivalentes ni mutuamente necesarios en todos los casos.

---

## Diferencia entre Acto y Firma

La firma valida. No crea. Esta es una de las distinciones más delicadas del modelo y la que con mayor frecuencia se invierte en el diseño de sistemas de gobierno digital, generalmente por la influencia de los sistemas de firma digital que, al centrar la atención técnica en el momento de la firma, inducen a pensar que el acto "nace" cuando se firma.

El acto administrativo, en su dimensión institucional, existe desde el momento en que la autoridad competente forma su voluntad decisoria sobre el objeto, el motivo y la finalidad correspondientes. Ese momento puede ser anterior a la firma: la autoridad puede haber decidido, e incluso comunicado informalmente su decisión, mientras el circuito de elaboración formal, revisión y firma todavía está en curso.

La firma es la condición que habilita al acto a producir plenos efectos frente a terceros y a ingresar en el régimen de publicidad, notificación y eventual impugnación que la normativa prevé para los actos administrativos formales. Sin firma, el acto puede existir como decisión institucional ya formada (en estado de elaboración avanzada o pendiente de firma, conforme se detalla en la sección de Estados), pero no produce todavía sus efectos plenos.

Esta distinción permite que el modelo represente correctamente situaciones frecuentes en la operación municipal: una resolución redactada y aprobada en su contenido por el área competente, que aguarda en un circuito de firma mientras el titular de la posición se encuentra en un viaje oficial, y que es finalmente firmada por quien ejerce la suplencia conforme a ADR-008. El acto, en su contenido decisorio, no cambió; lo que varió fue quién, en qué carácter, le dio la validación formal de la firma.

---

## Diferencia entre Acto y Autoridad

ADR-008 estableció el marco conceptual de quién puede decidir: la autoridad institucional pertenece a la posición, se ejerce por quien la ocupa, y puede delegarse, sustituirse o sucederse. Este documento, ADR-009, define qué es lo que esa autoridad produce cuando se ejerce efectivamente: el acto administrativo.

La autoridad es la capacidad habilitante, anterior y condición de posibilidad del acto. El acto es el resultado concreto del ejercicio de esa capacidad sobre una materia determinada. Una posición puede tener autoridad y competencia para dictar determinado tipo de acto sin que, en un momento dado, haya dictado ninguno: la autoridad existe en potencia mientras la posición esté válidamente ocupada (o su autoridad esté siendo ejercida conforme a los mecanismos de delegación, sustitución o sucesión de ADR-008), y el acto existe en acto (en el sentido lógico del término) cada vez que esa autoridad se ejerce efectivamente sobre una decisión concreta.

Esta relación es estructuralmente análoga a la que ADR-007 estableció entre posición y persona, y a la que ADR-008 estableció entre posición y autoridad: la autoridad es a la posición lo que el acto es a la autoridad. Cada capa representa una concreción adicional de la anterior, sin colapsarse con ella.

---

## Estados del Acto

El acto administrativo recorre, conceptualmente, un conjunto de estados que representan su grado de avance institucional desde su concepción hasta su archivo definitivo o, eventualmente, su revocación o anulación.

### Borrador

El acto se encuentra en estado de borrador cuando existe una primera formulación de su contenido (objeto, motivo, finalidad) pero esa formulación no ha sido todavía sometida a ningún circuito de elaboración formal ni cuenta con la decisión institucional definitiva de la autoridad competente. El borrador es modificable libremente y no produce ningún efecto.

### En Elaboración

El acto está en elaboración cuando su contenido está siendo desarrollado y ajustado por el área competente, incorporando los antecedentes, fundamentos normativos y redacción definitiva que el acto requiere antes de ser sometido a la decisión de la autoridad. En esta etapa pueden intervenir distintas áreas técnicas o asesoras sin que ninguna de ellas tenga, todavía, la competencia decisoria final.

### En Revisión

El acto está en revisión cuando su contenido elaborado es sometido a control previo por parte de instancias técnicas, legales o jerárquicas antes de llegar a la autoridad competente para su decisión final. La revisión puede incluir el dictamen de asesoría legal u otros informes técnicos que constituyen, a su vez, actos administrativos propios (de tipo dictamen) dentro del mismo expediente.

### Pendiente de Firma

El acto está pendiente de firma cuando su contenido decisorio ya ha sido formado y aprobado por la autoridad competente, pero todavía no ha sido formalmente validado mediante la firma que lo habilita a producir efectos plenos. Este estado es el que mejor ilustra la distinción entre acto y firma desarrollada en la sección anterior: el acto, en su dimensión decisoria, ya existe; lo que falta es la validación formal.

### Firmado

El acto está firmado cuando la autoridad competente, en el carácter que corresponda (titular, delegado, suplente, interino o sucesor, conforme a ADR-008), ha validado formalmente su contenido. La firma es la condición que habilita el paso al estado de vigencia, generalmente sujeto a los requisitos adicionales de publicidad o notificación que el tipo de acto requiera.

### Vigente

El acto está vigente cuando, habiendo sido firmado y cumplidos los requisitos de publicidad o notificación que correspondan, produce plenamente los efectos jurídicos o administrativos que le son propios. La vigencia es el estado de plenitud institucional del acto.

### Suspendido

El acto está suspendido cuando, sin perder su validez de origen, sus efectos quedan transitoriamente neutralizados por decisión de una autoridad competente para suspenderlo (por ejemplo, mientras se sustancia un recurso administrativo o una medida cautelar). La suspensión es reversible: el acto puede recuperar su plena vigencia si la causa de suspensión se levanta.

### Revocado

El acto está revocado cuando la propia autoridad competente (o su sucesora en la posición) decide, mediante un nuevo acto administrativo, dejarlo sin efecto para el futuro, generalmente por razones de oportunidad, mérito o conveniencia institucional, sin que ello implique necesariamente un vicio del acto original. La revocación no opera retroactivamente sobre los efectos ya producidos, salvo que la normativa o el acto revocatorio dispongan expresamente lo contrario.

### Anulado

El acto está anulado cuando una autoridad competente (administrativa o judicial, según corresponda) determina que el acto adolece de un vicio que afecta su validez de origen (por ejemplo, falta de competencia de quien lo dictó, o vicio en alguno de sus elementos constitutivos), y dispone su eliminación del mundo jurídico, generalmente con efectos retroactivos a la fecha de su dictado, salvo las situaciones consolidadas que el ordenamiento proteja.

### Archivado

El acto está archivado cuando, habiendo agotado su vigencia o no siendo ya objeto de tramitación activa, se conserva en el repositorio institucional conforme a los principios de conservación histórica de ADR-005, accesible para consulta y auditoría pero fuera del circuito de gestión operativa activa.

---

## Ciclo de Vida del Acto

### Creación

El ciclo de vida del acto comienza con su creación conceptual: la identificación de la necesidad institucional de producir una decisión sobre una materia determinada, dentro de la competencia de una posición identificable. La creación puede originarse en un expediente en trámite, en una gestión de oficio de la propia administración, o en una solicitud de un interesado.

### Elaboración

Durante la elaboración, el contenido del acto (objeto, motivo, finalidad, fundamentos normativos) se desarrolla y redacta, incorporando los antecedentes necesarios y, cuando corresponda, los informes y dictámenes de las áreas técnicas o legales competentes.

### Revisión

La revisión somete el contenido elaborado a control previo, verificando su adecuación normativa y su consistencia con la competencia de la autoridad que habrá de dictarlo, antes de ser puesto a su decisión final.

### Firma

La firma valida formalmente el acto, conforme al carácter de ejercicio de autoridad que corresponda a quien firma (ADR-008), habilitándolo para producir sus efectos.

### Entrada en Vigencia

La entrada en vigencia se produce cuando, además de la firma, se cumplen los requisitos adicionales de publicidad, registro o notificación que el tipo de acto requiera conforme al ordenamiento aplicable. A partir de ese momento el acto produce plenamente sus efectos jurídicos o administrativos.

### Modificación

Un acto vigente puede ser modificado por otro acto posterior de igual o mayor jerarquía, dictado por una autoridad con competencia para hacerlo, que ajusta parcialmente su contenido sin dejarlo sin efecto en su totalidad.

### Revocación

La revocación, ya definida, deja sin efecto al acto para el futuro por decisión de la autoridad competente, sin afectar necesariamente su validez de origen.

### Anulación

La anulación, ya definida, elimina al acto del mundo jurídico por razón de un vicio en su origen, generalmente con efectos retroactivos.

### Archivo

El archivo es la etapa final del ciclo de vida operativo del acto, donde se conserva conforme a los principios de ADR-005, manteniendo su historial completo y su trazabilidad disponible para consulta y auditoría futura.

---

## ¿Quién Puede Emitir un Acto?

La capacidad de emitir un acto administrativo determinado depende de que quien lo dicte esté ejerciendo válidamente la autoridad de la posición competente para esa materia, conforme a los cinco caracteres de ejercicio que estableció ADR-008.

**El titular** emite el acto en ejercicio pleno y ordinario de la competencia de su posición, sin necesidad de ningún título habilitante adicional más allá de su designación válida en esa posición.

**El delegado** emite el acto en virtud de una delegación expresa, formal y documentada, constituida por la posición titular de la competencia conforme a los tipos de delegación de ADR-008 (parcial, total, temporal o funcional), dentro de los límites exactos que esa delegación establece. Un acto dictado por un delegado fuera de los límites de su delegación carece de competencia válida para esa materia específica.

**El suplente** emite el acto durante el período de suplencia constituida conforme a ADR-007 y ADR-008, ejerciendo la autoridad de la posición suplida con el alcance que el acto de designación de la suplencia haya establecido.

**El interino** emite el acto durante el período de interinato de una posición vacante, con la plenitud de competencia que el acto de designación interina le confiera, conforme a ADR-007 y ADR-008.

**El sucesor** emite el acto en virtud de la activación de la cadena de sucesión definida en ADR-008 ante la vacancia o ausencia imprevista del titular, ejerciendo la autoridad de la posición sucedida en los términos que el marco normativo de sucesión establezca.

Todo acto administrativo, para ser válido, debe identificar no solo la posición que lo dicta sino el carácter de ejercicio (titular, delegado, suplente, interino, sucesor) bajo el cual la persona firmante actuaba en ese momento, conforme al principio de trazabilidad ya establecido en ADR-008.

---

## Competencia Institucional

La competencia institucional es el puente que conecta la posición organizacional (ADR-007) con el acto administrativo (este documento), a través de la autoridad (ADR-008).

La competencia pertenece a la posición: es el organigrama institucional, complementado por el marco normativo aplicable, el que determina qué materias puede decidir cada posición y mediante qué tipo de acto. La Dirección de Obras Públicas tiene competencia sobre las materias de infraestructura municipal; la Secretaría de Hacienda tiene competencia sobre las materias presupuestarias y tributarias. Esta asignación de competencias es un atributo de la posición, no de la persona que en cada momento la ocupa.

La autoridad ejerce competencias: quien ocupa válidamente una posición, en el carácter que corresponda conforme a ADR-008, ejerce las competencias que esa posición tiene asignadas. El ejercicio de la competencia es lo que ADR-008 ya desarrolló extensamente: titularidad, delegación, sustitución, sucesión.

Los actos materializan competencias: cada acto administrativo es la concreción, en un caso determinado, del ejercicio de una competencia específica por parte de la autoridad que válidamente la ejerce. Sin competencia previa de la posición sobre la materia, no hay acto válido posible, independientemente de cuán correctamente constituida esté la autoridad de quien pretenda dictarlo.

---

## Competencias Indelegables

Este modelo, sin pretender interpretar ni sustituir el marco normativo provincial y municipal aplicable a Muni Digital, debe reconocer conceptualmente que no todas las competencias son delegables, conforme ya estableció ADR-008 en términos generales para la autoridad.

**Actos reservados al titular:** Ciertos actos administrativos están reservados, por disposición expresa del marco normativo, a la firma exclusiva del titular de una posición determinada, sin posibilidad de delegación. Históricamente, en el régimen municipal argentino, suelen incluirse en esta categoría ciertos actos de máxima trascendencia institucional reservados al Intendente, o ciertas decisiones que el régimen orgánico reserva al cuerpo deliberativo en su conjunto y no a su Presidencia individualmente.

**Actos delegables:** La mayor parte de los actos de gestión administrativa ordinaria son delegables conforme a los mecanismos de ADR-008, dentro de los límites de materia, monto o procedimiento que la delegación específica establezca.

**Actos no delegables:** Son aquellos que, sin estar necesariamente reservados en términos absolutos al titular, el marco normativo o la práctica institucional excluyen de los mecanismos ordinarios de delegación por su naturaleza (por ejemplo, actos que requieren la apreciación personal e indelegable de quien ostenta una responsabilidad política directa ante la ciudadanía).

Este documento no pretende enumerar exhaustivamente cuáles son esos actos, porque esa enumeración depende del marco normativo provincial y municipal específico aplicable a Muni Digital, que este modelo debe representar fielmente sin sustituir. La función de este documento es establecer que el sistema debe poder representar la existencia de esta categoría de actos indelegables como un atributo de la competencia de la posición, validado contra el marco normativo en el momento del diseño técnico correspondiente.

---

## Autoridades Colegiadas

Hasta este punto, el modelo ha descrito la autoridad y la competencia en términos de posiciones individuales. Sin embargo, ciertas decisiones institucionales no son producidas por una sola posición sino por un órgano colegiado que decide mediante un mecanismo de deliberación y voto.

### HCD

El Honorable Concejo Deliberante es, en sí mismo, un órgano colegiado: sus decisiones (las ordenanzas) no son el acto de una posición individual sino el resultado de la deliberación y votación del cuerpo en su conjunto, conforme al quórum y la mayoría que su reglamento interno y la normativa aplicable establezcan. El acto colegiado del HCD (la ordenanza) tiene un proceso de formación de voluntad institucional distinto al de un acto unipersonal: requiere la convocatoria a sesión, el debate, la votación y el cómputo de la mayoría requerida, antes de quedar formalmente sancionado y, posteriormente, promulgado por el Departamento Ejecutivo.

### Comisiones

Las comisiones, tanto las internas del HCD (comisiones de trabajo legislativo) como las que pueden constituirse en el ámbito del Ejecutivo (comisiones de evaluación, comisiones de adjudicación de compras), son órganos colegiados de composición acotada cuya función puede ser meramente consultiva (producir un dictamen colegiado) o decisoria dentro de los límites que su norma de creación les asigne.

### Juntas

Las juntas son órganos colegiados con funciones específicas, frecuentemente de naturaleza técnica o disciplinaria (por ejemplo, una Junta de Disciplina en el ámbito del empleo público municipal), cuyas decisiones se forman por deliberación y voto de sus integrantes conforme a su normativa de constitución.

### Tribunales Administrativos

Los tribunales administrativos, cuando existen en la estructura municipal o provincial aplicable, son órganos colegiados con función decisoria sobre controversias administrativas determinadas, cuyas resoluciones siguen igualmente el mecanismo de deliberación y voto propio de los cuerpos colegiados.

### Autoridad colectiva, voto, mayoría y acto colegiado

El modelo conceptual de Muni Digital admite, sin contradicción con lo establecido para las posiciones individuales, que un acto administrativo sea producido por un órgano colegiado. En ese caso, la autoridad competente no es una posición individual sino el órgano colegiado en su conjunto, y el acto se forma a través de un mecanismo de votación cuyo resultado (la mayoría alcanzada conforme a las reglas aplicables) constituye la voluntad institucional del órgano. La firma del acto colegiado recae generalmente en quien presida el órgano (por ejemplo, el Presidente del HCD) junto con quien ejerza la función de Secretario del Cuerpo, pero esa firma valida la decisión ya formada por el voto colectivo; no la sustituye ni la decide unilateralmente.

Este modelo no desarrolla en este documento el detalle del mecanismo de votación, quórum y mayorías (que depende del reglamento interno de cada órgano colegiado y excede el alcance conceptual de este ADR), pero establece que el sistema debe poder representar actos cuya autoridad de origen es un órgano colegiado y no una posición unipersonal, sin que esto contradiga el resto del modelo: el órgano colegiado puede tratarse, a los efectos de este modelo, como un tipo particular de posición organizacional colectiva (conforme lo permite la flexibilidad de ADR-007), cuya autoridad se ejerce mediante un mecanismo de voto en lugar de mediante el ejercicio individual descrito en ADR-008.

---

## Vacancia y Actos

ADR-007 estableció que una posición puede quedar vacante, y ADR-008 estableció qué ocurre con la autoridad de una posición vacante: autoridad residual, autoridad suspendida, autoridad delegada que pueda subsistir, o autoridad interina. Este documento extiende esas categorías al efecto específico sobre la capacidad de dictar actos administrativos.

**Posición vacante con autoridad residual:** Ningún acto que requiera la competencia específica de esa posición puede dictarse válidamente mientras subsista la vacancia sin que se haya activado ningún otro mecanismo de cobertura. Los expedientes que requieran esa decisión quedan en estado de espera hasta que la vacancia se cubra o se active un mecanismo de sustitución o sucesión.

**Posición vacante con interino:** El interino, conforme al alcance de su designación, puede dictar válidamente los actos que correspondan a la competencia de la posición, en el carácter de interino, debiendo quedar este carácter expresamente indicado en el acto conforme al principio de trazabilidad de ADR-008.

**Posición con suplente activo:** Mientras dura la suplencia (por ejemplo, durante la licencia del titular), el suplente puede dictar los actos correspondientes a la competencia de la posición, en el carácter de suplente, con el alcance que el acto de designación de la suplencia haya establecido.

**Posición con sucesión activa:** Cuando se activa la cadena de sucesión definida en ADR-008 ante una vacancia inesperada en una posición crítica, quien asume conforme a esa sucesión puede dictar los actos correspondientes en el carácter de sucesor, conforme al alcance que el régimen de sucesión aplicable le confiera.

En todos los casos, el acto dictado durante un período de cobertura de una vacancia debe expresar con precisión el carácter bajo el cual actuó quien lo dictó, de modo que su validez pueda verificarse en cualquier momento posterior contra el registro de autoridad de ADR-008.

---

## Relación con ADR-005 — Audit Model

Todo evento relevante en el ciclo de vida de un acto administrativo es auditoría obligatoria conforme a ADR-005, dado que se trata, por definición, de eventos con consecuencia institucional directa.

**Creación:** El paso de un acto al estado de borrador o de elaboración, con identificación del área o posición que inicia su redacción, es auditoría obligatoria.

**Revisión:** El sometimiento del acto a las instancias de control técnico o legal, y el resultado de esa revisión (observaciones, conformidad), es auditoría obligatoria.

**Firma:** La validación formal del acto mediante la firma, con identificación de la posición, la persona y el carácter de ejercicio (titular, delegado, suplente, interino, sucesor) bajo el cual se firmó, es auditoría obligatoria, conforme ya estableció ADR-008 para todo acto de autoridad.

**Vigencia:** La entrada en vigencia del acto, una vez cumplidos los requisitos de publicidad o notificación correspondientes, es auditoría obligatoria.

**Revocación:** Toda revocación de un acto vigente, con identificación de la autoridad que la dispone y su motivo, es auditoría obligatoria.

**Anulación:** Toda anulación de un acto, con identificación de la autoridad o instancia que la dispone (administrativa o judicial) y el vicio invocado, es auditoría obligatoria.

El registro de auditoría de un acto administrativo es, en sí mismo, parte del valor probatorio institucional del acto: permite reconstruir, ante cualquier cuestionamiento posterior, la totalidad de su circuito de formación, desde su creación hasta su estado actual, con identificación precisa de cada interviniente y su carácter de actuación.

---

## Relación con ADR-008 — Organizational Authority & Delegation Model

La relación entre este documento y ADR-008 es de dependencia estructural directa. ADR-008 estableció el marco de quién puede decidir (autoridad, delegación, sustitución, sucesión); este documento establece qué produce esa decisión cuando se ejerce (el acto administrativo).

Cada acto administrativo debe poder verificarse contra el modelo de autoridad de ADR-008: la posición que lo dicta debe tener competencia sobre la materia (vínculo con ADR-007), la persona que lo firma debe estar ejerciendo válidamente la autoridad de esa posición en el carácter correspondiente (titular, delegado, suplente, interino, sucesor), y ese ejercicio debe estar, a su vez, válidamente constituido y registrado conforme a los mecanismos de ADR-008 (delegación formal, suplencia constituida, interinato designado, sucesión activada).

Este documento no redefine ni modifica ninguno de los mecanismos de autoridad de ADR-008; los presupone como condición de validez de todo acto administrativo que se pretenda dictar dentro de Muni Digital.

---

## Relación con Firma Digital

La firma digital, en su dimensión técnica, es el mecanismo informático que permite validar, mediante criptografía, que una persona determinada estampó una firma electrónica sobre un documento determinado en un momento determinado, con garantías de integridad y no repudio técnico.

Este documento establece, sin embargo, que la firma digital no reemplaza ni sustituye a la autoridad institucional definida en ADR-008: la firma digital es el medio técnico mediante el cual se evidencia el ejercicio de una autoridad que debe, en todos los casos, estar previamente y válidamente constituida conforme a ese modelo. Que una persona posea un certificado de firma digital válido y lo utilice para firmar un documento no convierte, por sí solo, a ese documento en un acto administrativo válido, si la persona no ostentaba, en ese momento, la autoridad institucional competente sobre la materia.

La firma digital evidencia el ejercicio de la autoridad; no la crea ni la sustituye. El diseño técnico futuro de Firma Digital en Muni Digital (que excede el alcance conceptual de este documento) deberá necesariamente verificar, antes de aceptar como válida una firma digital sobre un acto administrativo, que la persona firmante está ejerciendo válidamente, en ese momento y para esa materia, la autoridad institucional correspondiente conforme a ADR-008, y deberá registrar el carácter de ese ejercicio junto con la evidencia técnica de la firma.

---

## Relación con Expedientes

El expediente, conforme ya se ha definido extensamente en este documento, contiene actos administrativos sin ser, en sí mismo, un acto administrativo. La relación entre ambos es de contención ordenada, no de equivalencia.

El acto administrativo no depende del expediente para existir conceptualmente: sus elementos constitutivos (autoridad, competencia, objeto, motivo, finalidad, forma, efecto) son propios del acto y no derivan de su pertenencia a un expediente determinado. Lo que el expediente aporta es el contexto procedimental: el orden cronológico de los antecedentes, informes y actos previos que llevaron a la producción de un acto determinado, y la trazabilidad de la secuencia completa de tramitación de un asunto.

El diseño técnico futuro del módulo de Expedientes deberá representar esta relación de contención sin asumir, en ningún caso, que el cierre o archivo de un expediente es equivalente al dictado de un acto, ni que la apertura de un expediente presupone necesariamente que producirá un acto administrativo formal.

---

## Historial

Todo acto administrativo, conforme a los principios de ADR-005, conserva un historial completo e inmutable de su ciclo de vida: su creación, las sucesivas etapas de elaboración y revisión que atravesó, la identificación de quien lo firmó y en qué carácter, su entrada en vigencia, y cualquier modificación, suspensión, revocación o anulación posterior.

Este historial permite la reconstrucción institucional completa de cualquier acto administrativo en cualquier momento posterior a su dictado: quién decidió, con qué competencia, en qué carácter de ejercicio de autoridad, con qué fundamento, y qué efectos produjo. Esta capacidad de reconstrucción es la base del valor probatorio institucional del acto, indispensable para su defensa ante recursos administrativos, auditorías de organismos de control o procesos judiciales.

La trazabilidad del acto administrativo se complementa con la trazabilidad de la autoridad que lo produjo (ADR-008), la trazabilidad de la posición que la porta (ADR-007), y la trazabilidad de la identidad de quien la ejerció (ADR-006), formando una cadena de evidencia institucional completa, desde la persona real hasta el efecto jurídico concreto que el acto produjo.

---

## Riesgos

### CRÍTICO

**Acto sin autoridad competente.** Si el sistema permite registrar como válido un acto administrativo dictado por una posición que no tiene competencia sobre la materia, o por una persona que no ejercía válidamente la autoridad de esa posición en ese momento, el acto carece de uno de sus elementos esenciales y es susceptible de nulidad, comprometiendo la seguridad jurídica de toda la actuación municipal que se apoye en él.

**Acto sin competencia sobre la materia.** Si la verificación de validez de un acto no contempla que la materia decidida esté efectivamente dentro de la competencia asignada a la posición que lo dicta (conforme a ADR-007), se pueden producir actos formalmente firmados por una autoridad existente pero sobre materias que exceden su ámbito de atribuciones.

**Firma sin autoridad institucional válidamente constituida.** Si el sistema acepta como válida la firma digital de una persona sin verificar, en ese momento, que ejercía la autoridad institucional correspondiente (titular, delegado, suplente, interino, sucesor conforme a ADR-008), la firma técnica es válida pero el acto institucional que pretende validar carece de fundamento.

**Confusión entre expediente y acto.** Si el sistema trata el cierre o la resolución de un expediente como equivalente al dictado de un acto administrativo, sin diferenciar ambos objetos, se pierde la capacidad de auditar individualmente cada acto producido dentro de la tramitación y de representar expedientes que se resuelven sin acto formal.

**Acto sin registro de auditoría obligatoria.** Si alguna etapa del ciclo de vida del acto (creación, firma, vigencia, revocación, anulación) no genera el registro de auditoría correspondiente conforme a ADR-005, la cadena de evidencia institucional queda incompleta y el acto pierde valor probatorio pleno.

**Autoridad técnica confundida con autoridad institucional para la firma.** Si se asume que poseer un rol técnico ADMIN o SUPERADMIN en el sistema (ADR-002) habilita a firmar actos administrativos, se produce una usurpación de hecho de la autoridad institucional por parte de quien administra el sistema técnico, exactamente el riesgo crítico ya identificado en ADR-008 y que aquí se materializa en el peor escenario posible: un acto institucional inválido producido por una confusión de planos.

**Modificación retroactiva del contenido de un acto ya firmado.** Si el sistema permite alterar el contenido decisorio de un acto después de su firma sin generar un nuevo acto de modificación, revocación o anulación formalmente registrado, se vulnera la inmutabilidad histórica que ADR-005 exige y se compromete la integridad de toda la cadena de actos relacionados.

**Acto colegiado registrado como acto individual.** Si el sistema no distingue que ciertos actos (ordenanzas del HCD, decisiones de comisiones o juntas) provienen de un órgano colegiado y los registra como si hubieran sido decididos por una sola posición individual, se pierde la trazabilidad del proceso de votación y mayoría que constituyó la voluntad institucional real.

**Vacancia no contemplada en la verificación de competencia del acto.** Si el sistema no verifica, al momento de validar un acto, si la posición que lo dicta estaba vacante, suspendida o cubierta por un mecanismo de sustitución o sucesión válidamente constituido, puede aceptarse como válido un acto dictado durante un período en que nadie ejercía legítimamente esa autoridad.

**Eliminación física de un acto administrativo.** Si el sistema permite eliminar un acto administrativo del registro histórico en lugar de revocarlo o anularlo mediante un nuevo acto, se destruye evidencia institucional que puede ser indispensable para la defensa del municipio en procesos posteriores, vulnerando el principio de inmutabilidad histórica de ADR-005.

### ALTO

**No distinguir el carácter de ejercicio en el acto firmado.** Si el acto no registra explícitamente si quien lo firmó actuaba como titular, delegado, suplente, interino o sucesor, la reconstrucción posterior de la cadena de responsabilidad institucional es ambigua y debilita su defensa ante un cuestionamiento.

**Confusión entre dictamen y resolución.** Si el sistema no distingue que un dictamen es un acto de opinión no vinculante (salvo previsión normativa expresa) y una resolución es un acto decisorio, puede llegar a tratarse erróneamente al dictamen como si zanjara definitivamente el asunto.

**Falta de verificación de competencia indelegable.** Si el sistema permite que un acto reservado al titular sin posibilidad de delegación sea firmado por un delegado sin que exista alerta o bloqueo, se compromete la validez del acto sin que el área operativa lo advierta a tiempo.

**Notificación registrada como parte del mismo acto que notifica.** Si la notificación de una resolución no se trata como un acto distinto con su propio ciclo de vida, se pierde la capacidad de determinar con precisión la fecha a partir de la cual comienzan a correr los plazos de impugnación del interesado.

**Acto vigente sin verificación de cumplimiento de requisitos de publicidad.** Si el sistema marca un acto como vigente sin haber verificado que se cumplieron los requisitos de publicidad o notificación que su tipo exige, se puede considerar erróneamente en vigencia un acto que todavía no produce plenos efectos frente a terceros.

**Revocación sin identificación de la autoridad que la dispone.** Si el acto de revocación no identifica con precisión qué posición y qué persona, en qué carácter, dispuso la revocación, se debilita la trazabilidad de la decisión revocatoria misma.

**Actos colegiados sin registro del mecanismo de votación.** Si el sistema no conserva evidencia de cómo se alcanzó la mayoría requerida para un acto colegiado, la validez de ese acto puede quedar en entredicho ante un cuestionamiento sobre el quórum o la votación.

**Borradores tratados con el mismo nivel de control que actos firmados.** Si los borradores y documentos en elaboración se sometieron a los mismos requisitos de control de acceso, auditoría y formalidad que los actos firmados, se introduce una rigidez operativa innecesaria que entorpece el trabajo cotidiano de elaboración sin aportar valor institucional adicional.

**Falta de relación explícita entre el acto y el expediente que lo origina.** Si un acto administrativo no conserva la referencia al expediente del cual surge (cuando corresponde que exista), se pierde parte del contexto procedimental necesario para comprender los antecedentes de la decisión.

**Ausencia de un mecanismo para representar actos sin expediente previo.** Si el diseño técnico asume que todo acto necesariamente proviene de un expediente, no podrá representar válidamente certificaciones u otros actos de emisión directa que la práctica institucional permite sin tramitación expedientillo previa.

### MEDIO

**Nomenclatura inconsistente entre tipos de actos en distintas áreas.** Si distintas áreas de la misma institución usan criterios distintos para decidir si algo es una "disposición" o una "resolución" sin un criterio unificado, se dificulta la comparación y el reporte consolidado de la actividad administrativa.

**Falta de plantillas o estructura estandarizada para cada tipo de acto.** La ausencia de una estructura formal mínima esperable (considerandos, parte resolutiva) para cada tipo de acto puede producir actos con elementos constitutivos incompletos o mal expresados.

**Circulares e instrucciones sin registro de su alcance temporal.** Si no se registra desde cuándo y hasta cuándo (si corresponde) una circular o instrucción está vigente, su aplicación práctica por parte de las posiciones subordinadas puede volverse ambigua con el paso del tiempo.

**Actas de órganos colegiados dispersas sin vínculo con los actos que contienen.** Si el acta de una sesión no se vincula explícitamente con los actos colegiados (ordenanzas, por ejemplo) que en ella se sancionaron, la consulta posterior requiere reconstruir manualmente esa relación.

**Falta de alertas ante competencias próximas a su límite de delegación.** Si el sistema no advierte cuando un acto se acerca a los límites de monto o materia de una delegación parcial, se incrementa el riesgo de que se dicten actos en los bordes de la competencia delegada sin la debida atención.

**Certificaciones tratadas con el mismo circuito que actos decisorios complejos.** Si una certificación de mero trámite, que es declarativa y de bajo riesgo institucional, debe atravesar el mismo circuito extenso de elaboración y revisión que una resolución compleja, se genera una sobrecarga operativa desproporcionada a su trascendencia.

**Ausencia de un criterio uniforme para decidir cuándo un asunto requiere expediente y cuándo no.** Sin un criterio institucional claro, distintas áreas pueden tramitar de forma heterogénea asuntos sustancialmente similares, generando inconsistencias en la gestión documental.

**Dictámenes no vinculantes interpretados informalmente como vinculantes.** Si la práctica institucional, sin sustento normativo expreso, comienza a tratar los dictámenes de asesoría legal como si fueran decisorios, se diluye la distinción conceptual entre opinión técnica y decisión de autoridad.

**Falta de versión consolidada de un acto modificado varias veces.** Si un acto fue modificado en más de una ocasión y el sistema no permite consultar fácilmente su texto consolidado vigente, la aplicación práctica del acto se vuelve más propensa a errores de interpretación.

**Archivo de actos sin clasificación por relevancia institucional.** Si todos los actos archivados se tratan con el mismo criterio de conservación sin distinguir su trascendencia (un decreto de designación política frente a una providencia de mero trámite), la gestión del archivo histórico puede volverse ineficiente sin que ello comprometa, sin embargo, la validez de ningún acto.

### BAJO

**Diferencias de estilo de redacción entre actos de distintas áreas.** No constituye un riesgo institucional de validez, aunque dificulta la lectura comparada de la producción documental del municipio.

**Falta de numeración correlativa unificada entre instituciones.** Si la Municipalidad, el HCD y el Hospital numeran sus actos de forma independiente sin un criterio que permita identificarlos sin ambigüedad en un contexto multi-institucional, la referencia cruzada entre instituciones puede resultar más trabajosa, sin afectar la validez de cada acto dentro de su propia institución.

**Ausencia de resumen ejecutivo adjunto a actos extensos.** No afecta la validez del acto, pero puede dificultar su comprensión rápida por parte de quienes deben aplicarlo operativamente.

**Variabilidad en la terminología de los considerandos.** Diferencias menores de estilo en cómo se exponen los motivos no comprometen la validez del acto si el motivo sustancial está adecuadamente expresado.

**Falta de un glosario institucional de tipos de actos accesible a los empleados.** Dificulta la capacitación de nuevo personal en la distinción entre los distintos tipos de actos, sin constituir un riesgo de validez institucional inmediato.

---

## Principios del Modelo

### Legalidad

Todo acto administrativo debe ser conforme al ordenamiento jurídico aplicable: dictado por la autoridad competente, sobre una materia dentro de su competencia, con la forma y el procedimiento que la normativa exige. El modelo conceptual no sustituye al marco normativo; lo representa fielmente como condición de validez de cada acto.

### Competencia

La competencia es un atributo de la posición organizacional (ADR-007), no de la persona que la ocupa. Todo acto debe poder verificarse contra la competencia de la posición que lo dicta, independientemente de quien en ese momento la ejerza.

### Trazabilidad

Todo acto administrativo debe poder reconstruirse en su totalidad: quién lo creó, quién lo elaboró, quién lo revisó, quién lo firmó y en qué carácter, cuándo entró en vigencia, y qué modificaciones, suspensiones, revocaciones o anulaciones sufrió posteriormente.

### No Repudio

La autoridad que dictó un acto administrativo válidamente registrado no puede negar haberlo dictado, conforme a los principios de no repudio ya establecidos en ADR-005 (para la evidencia institucional en general) y ADR-008 (para el ejercicio de autoridad en particular).

### Separación entre Acto y Firma

El acto administrativo existe como decisión institucional desde el momento en que la autoridad competente forma su voluntad decisoria; la firma es la condición de validación formal que lo habilita a producir plenos efectos, pero no es la fuente de su existencia conceptual.

### Separación entre Acto y Expediente

El acto y el expediente son objetos institucionales distintos, relacionados por contención pero no equivalentes: un expediente puede no producir ningún acto, y un acto puede existir sin expediente previo cuando la normativa lo permite.

### Separación entre Autoridad y Permisos

Conforme a ADR-002, ADR-003 y ADR-008, la autoridad institucional para dictar, firmar o validar un acto administrativo es completamente independiente de los roles y permisos técnicos configurados en el sistema Muni Digital. Ningún permiso técnico, por amplio que sea, sustituye a la autoridad institucional requerida para la validez de un acto.

### Continuidad Institucional

Conforme a ADR-008, la capacidad de dictar actos administrativos no debe interrumpirse por la vacancia, ausencia o impedimento del titular de una posición, siempre que existan mecanismos válidamente constituidos de delegación, sustitución o sucesión que permitan su cobertura.

### Auditoría Obligatoria

Todo evento relevante del ciclo de vida de un acto administrativo (creación, revisión, firma, vigencia, revocación, anulación) constituye auditoría obligatoria conforme a ADR-005, sin excepción y sin posibilidad de deshabilitación por ningún actor del sistema.

### Inmutabilidad Histórica

El historial de un acto administrativo, una vez registrado, no puede modificarse ni eliminarse. Toda corrección, modificación, revocación o anulación se expresa mediante un nuevo acto que se suma al historial, nunca mediante la alteración del registro original.

---

## Administrative Act & Resolution Model v1 Recomendado

El modelo conceptual de actos administrativos y resoluciones de Muni Digital se define de la siguiente manera:

### El acto como objeto institucional independiente

El acto administrativo es un objeto propio del sistema, con existencia conceptual independiente del expediente que pudo originarlo, del documento que lo soporta materialmente y de la firma que lo valida. Tiene sus propios elementos constitutivos (autoridad competente, voluntad institucional, objeto, motivo, finalidad, forma, competencia, efecto) y su propio ciclo de vida.

### Los tipos de acto como categorías con autoridad y efectos propios

Decreto, resolución, disposición, providencia, dictamen, circular, instrucción, certificación, autorización, acta y notificación son tipos de acto con requisitos de autoridad y efectos institucionales propios. Cada tipo requiere una competencia determinada de la posición que lo dicta, conforme a ADR-007, y un carácter de ejercicio de autoridad válidamente constituido, conforme a ADR-008.

### El expediente como contenedor procedimental, no como acto

El expediente organiza la secuencia documental de la tramitación de un asunto, pudiendo contener múltiples actos administrativos o ninguno. La resolución o cierre de un expediente nunca se asimila, por sí sola, al dictado de un acto: cada acto dentro del expediente es un objeto propio con su propio registro y su propia validez.

### La firma como validación, no como génesis

El acto nace cuando la autoridad competente forma su voluntad decisoria; la firma valida ese acto y lo habilita a producir plenos efectos. El sistema debe representar los estados previos a la firma (borrador, en elaboración, en revisión, pendiente de firma) como etapas legítimas del ciclo de vida del acto, no como su inexistencia.

### La competencia como atributo de la posición ejercido por la autoridad

La competencia institucional para dictar cada tipo de acto pertenece a la posición organizacional (ADR-007); la autoridad (ADR-008) es el mecanismo por el cual esa competencia se ejerce efectivamente por quien válidamente ocupa la posición, en cualquiera de los cinco caracteres de ejercicio definidos (titular, delegado, suplente, interino, sucesor).

### Los órganos colegiados como autoridad colectiva representable

El modelo admite que ciertos actos sean producidos por órganos colegiados (el HCD, comisiones, juntas, tribunales administrativos), cuya voluntad institucional se forma por deliberación y voto, sin que esto contradiga el marco general de posición y autoridad: el órgano colegiado se trata como una forma particular de posición organizacional colectiva.

### La auditoría como condición de validez probatoria

Todo evento del ciclo de vida del acto es auditoría obligatoria conforme a ADR-005. El historial de cada acto, inmutable y completo, es la base de su valor probatorio institucional ante cualquier cuestionamiento posterior, administrativo o judicial.

### La separación absoluta respecto de los permisos técnicos

La validez institucional de un acto administrativo nunca depende de los roles o permisos técnicos configurados en el sistema (ADR-002, ADR-003), sino exclusivamente de la competencia de la posición y de la válida constitución de la autoridad de quien lo dicta, conforme a ADR-007 y ADR-008.

---

## Roadmap Conceptual

### P0 — Aprobación conceptual

**Objetivo:** Validar y aprobar este documento como fuente de verdad conceptual para los actos administrativos, resoluciones y, en general, para los futuros módulos de Expedientes y Firma Digital de Muni Digital.

Dependencias: ADR-001 a ADR-008 aprobados. Este documento revisado por el equipo de arquitectura, los referentes de asesoría legal o jurídica municipal (dado que la tipología de actos, las competencias indelegables y los órganos colegiados dependen del marco normativo provincial y municipal aplicable) y los referentes institucionales de Municipalidad y HCD.

Criterio de cierre: El equipo puede responder sin ambigüedad qué es un acto administrativo, en qué se diferencia de un expediente, de un documento y de una firma, qué elementos constitutivos requiere, qué tipos de actos existen y qué autoridad requiere cada uno, y por qué la validez de un acto nunca depende de los permisos técnicos del sistema. Los referentes legales confirman que la tipología de actos y el tratamiento de competencias indelegables y órganos colegiados es compatible con el marco normativo aplicable, sin que este documento pretenda sustituirlo.

Riesgo: CRÍTICO si los módulos de Expedientes o Firma Digital inician su diseño técnico sin este modelo aprobado. La ausencia de un modelo de actos administrativos claro obliga a esos módulos a decidir ad hoc qué es una "resolución" en el sistema, reproduciendo exactamente las tres confusiones identificadas en el Resumen Ejecutivo de este documento.

---

### P1 — Diseño técnico

**Objetivo:** Traducir el modelo conceptual en decisiones de diseño técnico: cómo se representa el acto administrativo como objeto independiente del expediente y del documento, cómo se modelan sus estados y su ciclo de vida, cómo se vincula con la competencia de la posición (ADR-007) y con el carácter de ejercicio de autoridad (ADR-008), y cómo se representan los actos colegiados.

Dependencias: P0 cerrado. ADR-007 y ADR-008 implementados en su diseño técnico (modelo de posiciones y de autoridad disponibles para anclar la competencia y el carácter de ejercicio de cada acto). ADR-005 implementado en su diseño técnico (capa de auditoría disponible para registrar los eventos del ciclo de vida del acto).

Criterio de cierre: El diseño técnico mantiene la independencia conceptual entre acto, documento, expediente y firma. El diseño representa los diez estados del acto definidos en este documento como estados explícitos y distinguibles. El diseño vincula cada acto con la posición competente y el carácter de ejercicio de autoridad de quien lo dictó. El diseño admite la representación de actos producidos por órganos colegiados sin forzarlos a la estructura de una posición individual. El diseño no introduce ninguna relación automática entre permisos técnicos y validez del acto.

Riesgo: ALTO. Es el momento donde la presión de simplicidad técnica puede llevar a modelar el acto administrativo como un simple campo de estado dentro del expediente ("expediente resuelto" / "expediente no resuelto"), vaciando de contenido real la independencia conceptual establecida en este documento, o a tratar la firma digital como si por sí sola constituyera la validez institucional del acto.

Archivos conceptuales que debe cubrir el diseño: modelo de acto administrativo con sus elementos constitutivos, modelo de los distintos tipos de acto con sus requisitos de competencia y autoridad propios, modelo de estados y transiciones del ciclo de vida del acto, modelo de vinculación opcional entre acto y expediente, modelo de representación de órganos colegiados y su mecanismo de voto, integración con la capa de autoridad de ADR-008 para la verificación de competencia y carácter de ejercicio, integración con la capa de auditoría de ADR-005.

---

### P2 — Implementación del núcleo de actos

**Objetivo:** El sistema puede crear actos administrativos en estado de borrador, llevarlos a través de su ciclo de elaboración y revisión, registrar su firma con el carácter de ejercicio correspondiente, marcarlos como vigentes una vez cumplidos los requisitos de publicidad o notificación, y registrar modificaciones, revocaciones o anulaciones posteriores sin alterar el historial original.

Dependencias: P1 cerrado.

Criterio de cierre: Es posible crear un acto sin expediente previo cuando el tipo de acto lo permite. Es posible vincular un acto a un expediente existente sin que ese vínculo sea obligatorio para todos los tipos de acto. La firma de un acto verifica contra el modelo de ADR-008 que quien firma ejerce válidamente la autoridad de la posición competente, en el carácter declarado. Ningún acto puede pasar al estado de vigente sin haber pasado por el estado de firmado. El historial de cada acto es inmutable y consultable en su totalidad. La auditoría obligatoria de cada evento del ciclo de vida del acto está activa y verificable.

Rollback: Si P2 permite que un acto se marque como vigente sin verificación de competencia o carácter de ejercicio, o si el historial resulta modificable, revertir el módulo afectado hasta corregir. Un sistema que no puede garantizar la validez institucional de un acto no debe liberarse a producción, dado el valor jurídico y probatorio que estos objetos representan para el municipio.

---

### P3 — Integración con Expedientes y Firma Digital

**Objetivo:** El módulo de Expedientes incorpora la capacidad de contener y referenciar múltiples actos administrativos a lo largo de su tramitación, sin confundir el cierre del expediente con el dictado de un acto. El módulo de Firma Digital verifica, antes de aceptar una firma como válida sobre un acto, que la autoridad institucional de quien firma está válidamente constituida conforme a ADR-008, y registra el carácter de ejercicio junto con la evidencia técnica de la firma.

Dependencias: P2 cerrado. ADR-007 y ADR-008 implementados (modelo de posiciones y autoridad). ADR-005 implementado (auditoría).

Criterio de cierre: Un expediente puede tramitarse completamente sin generar ningún acto administrativo formal, y el sistema lo permite sin error. Un expediente puede contener múltiples actos de distinto tipo en su línea de tiempo, cada uno consultable individualmente. Una firma digital aplicada a un acto queda rechazada si la persona firmante no ejercía, en ese momento, la autoridad institucional competente sobre la materia del acto, conforme a ADR-008. Un acto colegiado del HCD puede registrarse con su mecanismo de votación y la firma conjunta de Presidencia y Secretaría del Cuerpo, sin necesidad de representarlo como si fuera el acto de una sola posición individual.

---

> Este documento define el modelo conceptual de actos administrativos y resoluciones de Muni Digital v1.
> No debe modificarse sin revisión del equipo de arquitectura, los referentes legales y aprobación formal.
> Extiende ADR-001, ADR-002, ADR-003, ADR-004, ADR-005, ADR-006, ADR-007 y ADR-008 sin contradecirlos.
> Es la fuente de verdad conceptual para Expedientes, Resoluciones, Decretos, Disposiciones, Dictámenes, Providencias, Certificaciones, Autorizaciones, Actas, Notificaciones y Firma Digital.
> Próximo documento recomendado: ADR-010 — Administrative File & Procedure Model v1 (Expedientes y Procedimiento Administrativo).