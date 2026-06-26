# ADR-014 — Notification & Institutional Communication Model — Muni Digital

> Documento conceptual del modelo de comunicación institucional y notificación.
> Basado en: PDA.md · ADR-001 · ADR-005 · ADR-006 · ADR-007 · ADR-008 · ADR-009 · ADR-010 · ADR-011 · ADR-012 · ADR-013
> Versión: 1.0
> Estado: APPROVED
> Restricción: Este documento NO define tablas, bases de datos, entidades ORM, clases, código, APIs, endpoints, JWT, OAuth, colas, eventos de software, microservicios, correo electrónico, WhatsApp, SMS, infraestructura, tecnologías ni frameworks. Es exclusivamente conceptual y debe permanecer válido con independencia de la tecnología que en cada época lo instrumente.
> Este documento es la fuente de verdad conceptual para toda comunicación y notificación institucional de Muni Digital.

---

## Resumen Ejecutivo

ADR-013 dejó resuelto, de manera definitiva, qué es un expediente y cómo se relaciona con el procedimiento, el documento y el acto administrativo que puede contener. Pero a lo largo de toda esa serie de documentos —y en particular en ADR-009, al definir la notificación como un tipo de acto administrativo— quedó pendiente una pregunta que ningún documento anterior tuvo como objeto principal: ¿qué significa, en sentido institucional pleno, que el municipio comunique algo? ¿En qué se diferencia comunicar de notificar? ¿Y en qué se diferencia, sobre todo, el hecho de enviar algo del hecho de haberlo comunicado válidamente?

Esta pregunta no es retórica. Es, de hecho, una de las fuentes más frecuentes de litigiosidad administrativa y de fracaso institucional en los sistemas de gobierno digital. Un municipio puede haber enviado una notificación —puede incluso conservar prueba fehaciente de haberla despachado— y, sin embargo, no haber comunicado válidamente nada, porque el envío no llegó a su destinatario, porque el destinatario no era la persona correcta, o porque el medio empleado no era el que el tipo de acto exigía. La consecuencia jurídica de esa distinción es enorme: los plazos de impugnación de un acto administrativo no comienzan a correr desde que el municipio envió algo, sino desde que la comunicación produjo, válidamente, sus efectos sobre el destinatario. Confundir ambos momentos —el del envío y el de la comunicación válida— es uno de los errores conceptuales más graves que un sistema de gestión documental puede cometer, porque compromete directamente la seguridad jurídica de toda la actividad administrativa del municipio.

Los sistemas de gobierno digital no resuelven esta pregunta en el plano conceptual tienden a colapsar, sin advertirlo, tres planos distintos en uno solo. El primero es el documento: el soporte material que transporta el contenido de lo que se comunica (ADR-012). El segundo es el acto administrativo de notificación: la manifestación de voluntad institucional mediante la cual la autoridad competente dispone que algo debe ser comunicado a un interesado (ADR-009). El tercero —y este es el que ningún documento anterior de la serie desarrolló con la profundidad que merece— es la comunicación institucional en sí misma: el fenómeno por el cual una información, efectivamente, traspasa la frontera entre la institución y su destinatario, produciendo evidencia verificable de que ese traspaso ocurrió.

Este documento tiene como objeto exclusivo ese tercer plano. Su decisión central, que se desarrolla extensamente a lo largo de todas sus secciones, es la siguiente:

**La comunicación institucional es un concepto propio, independiente del documento que la soporta, del acto administrativo que puede ordenarla y del procedimiento o expediente en cuyo contexto se produce. La notificación es una forma específica y cualificada de comunicación institucional, reservada a aquellos casos en que el ordenamiento exige que el destinatario tome conocimiento formal de un acto que lo afecta. Comunicar no equivale necesariamente a notificar. Enviar no equivale a comunicar válidamente. Comunicar no equivale a que el destinatario haya tomado conocimiento efectivo. Y la evidencia de que una comunicación ocurrió, y de cómo ocurrió, constituye un dominio de evidencia institucional propio, tan riguroso como el que ADR-005 exige para cualquier otro evento auditable.**

Este modelo desarrolla, con el mismo nivel de exhaustividad ya alcanzado en ADR-013, la naturaleza de la comunicación institucional, su relación con cada uno de los conceptos ya definidos en los documentos previos de esta serie, sus tipos, su ciclo de vida propio, su régimen de evidencia y conservación, y los riesgos y principios que deben gobernar todo diseño técnico futuro que dependa de él.

---

## Definiciones Fundamentales

### Comunicación Institucional

La comunicación institucional es el acto por el cual una institución transmite, de forma verificable, información a un destinatario determinado o determinable, con el propósito de que ese destinatario quede en condiciones de conocerla. La comunicación institucional no requiere que el destinatario efectivamente la haya leído, comprendido o respondido: requiere que la institución haya puesto esa información a su disposición, por un medio idóneo, de manera tal que el destinatario pudiera razonablemente tomar conocimiento de ella.

La comunicación institucional es, ante todo, un hecho jurídico-administrativo: produce consecuencias dentro del ordenamiento que rige la actividad municipal, no por la sola voluntad de quien comunica, sino porque el ordenamiento le reconoce ese efecto cuando se cumplen determinadas condiciones de idoneidad del medio, de identificación del destinatario y de registro de su producción.

### Notificación

La notificación, conforme ya estableció ADR-009, es el acto administrativo mediante el cual se comunica formalmente a un interesado el contenido de otro acto que lo afecta, produciendo a partir de ese momento los efectos procedimentales correspondientes (entre ellos, el más relevante: el inicio del cómputo de los plazos para recurrir). La notificación es, en consecuencia, una especie dentro del género más amplio de la comunicación institucional: es la comunicación institucional cualificada por el ordenamiento como condición de eficacia de un acto administrativo determinado.

No toda comunicación institucional es una notificación. Una circular que informa a las áreas municipales sobre un cambio de horario de atención es una comunicación institucional, pero no es una notificación en el sentido técnico que aquí se desarrolla, porque no está destinada a poner en conocimiento de un interesado un acto administrativo que produce efectos jurídicos sobre su situación particular.

### Aviso

El aviso es una forma de comunicación institucional de menor formalidad que la notificación, empleada para poner en conocimiento de uno o más destinatarios una información de interés, sin que de ese aviso se derive el inicio de plazos procedimentales ni la eficacia condicionada de un acto administrativo. Un aviso puede anteceder a una notificación (advertir que una notificación está próxima a producirse) sin sustituirla.

### Comunicación Interna

La comunicación interna es aquella que se produce entre posiciones organizacionales dentro de la misma institución (ADR-007), sin que su destinatario sea un interesado externo. Una derivación entre áreas, ya desarrollada como tipo de actuación en ADR-010, conlleva frecuentemente una comunicación interna que pone en conocimiento de la posición destinataria el contenido que se deriva.

### Comunicación Externa

La comunicación externa es aquella cuyo destinatario es una persona ajena a la estructura interna de la institución: un ciudadano, un contratista, otra institución, un organismo de control. La notificación, en su acepción más característica, es casi siempre una forma de comunicación externa, aunque puede excepcionalmente notificarse también a un empleado en su carácter de interesado en un procedimiento que lo afecta personalmente (por ejemplo, un procedimiento disciplinario).

### Destinatario

El destinatario es la persona, conforme a ADR-006, a quien la comunicación institucional está dirigida y respecto de quien se pretende producir el efecto de puesta en conocimiento. El destinatario debe ser identificable de forma unívoca, conforme a los principios de identidad ya establecidos en ADR-006, para que la comunicación pueda considerarse válidamente dirigida a él y no a otra persona.

### Emisor Institucional

El emisor institucional es la posición organizacional (ADR-007), ejercida por quien válidamente la ocupa conforme a ADR-008, que dispone o produce la comunicación. El emisor institucional no es necesariamente la misma posición que dictó el acto administrativo que se comunica: puede existir una posición competente para decidir y una posición distinta, competente para instrumentar su comunicación.

### Medio de Comunicación

El medio de comunicación es el canal o soporte a través del cual la institución pone la información a disposición del destinatario. Este modelo es deliberadamente neutral respecto de cuál sea ese medio: lo que importa, a los efectos conceptuales, es que el medio empleado sea idóneo para el tipo de comunicación de que se trate y que su empleo sea verificable, no la naturaleza tecnológica específica del canal.

### Idoneidad del Medio

La idoneidad del medio es la condición por la cual un determinado canal de comunicación es apto, conforme al marco normativo aplicable y a la naturaleza del acto que se comunica, para producir válidamente el efecto de puesta en conocimiento que se persigue. Un medio puede ser perfectamente funcional desde el punto de vista técnico y, sin embargo, no ser idóneo institucionalmente para un tipo de comunicación determinado, si el ordenamiento exige un medio distinto para ese caso.

### Envío

El envío es el acto material por el cual la institución transmite la información a través del medio elegido, con destino al destinatario identificado. El envío es una condición necesaria de la comunicación, pero no es, por sí mismo, suficiente para que la comunicación se considere válidamente producida, conforme se desarrolla extensamente en la sección de Diferencias Fundamentales.

### Recepción

La recepción es el hecho por el cual la información enviada ingresa efectivamente a la esfera de disponibilidad del destinatario: queda en su domicilio, en su casilla, en su bandeja, en cualquier lugar o medio que el destinatario controla y del cual puede, razonablemente, tomar conocimiento. La recepción es distinta del conocimiento efectivo: el destinatario puede haber recibido la comunicación sin haberla leído, y el ordenamiento, en la generalidad de los casos, hace recaer sobre el destinatario la carga de tomar conocimiento de lo que ha recibido.

### Conocimiento Efectivo

El conocimiento efectivo es el hecho, de naturaleza subjetiva y por ello generalmente no exigible como condición de validez, por el cual el destinatario ha leído, comprendido o de cualquier modo accedido intelectualmente al contenido de la comunicación. El conocimiento efectivo puede acreditarse en determinadas circunstancias (una respuesta del destinatario que demuestra que conoció el contenido), pero, como regla general, el ordenamiente no exige probar el conocimiento efectivo para que la comunicación produzca sus efectos: basta con acreditar la recepción válida por un medio idóneo.

### Constancia de Comunicación

La constancia de comunicación es el registro institucional que da cuenta de que una comunicación fue emitida, por qué medio, con qué contenido, dirigida a qué destinatario, y en qué fecha. La constancia es el soporte documental (ADR-012) de la evidencia de comunicación, pero no se identifica con ella: la constancia es necesaria, pero la evidencia de comunicación, conforme se desarrolla en su propia sección, exige algo más que la sola existencia de un registro de que algo fue enviado.

### Efecto de la Comunicación

El efecto de la comunicación es la consecuencia jurídico-administrativa que el ordenamiento atribuye al hecho de que una comunicación se haya producido válidamente: el inicio de un plazo, la oponibilidad de un acto frente al destinatario, la pérdida de la posibilidad de invocar desconocimiento. El efecto de la comunicación no es un efecto que la comunicación produzca por su propia naturaleza material, sino uno que el ordenamiento le reconoce cuando se cumplen las condiciones de validez correspondientes.

---

## Diferencias Fundamentales

### Comunicar vs Notificar

Comunicar es el género; notificar es la especie. Toda notificación es una comunicación institucional, pero no toda comunicación institucional es una notificación. La notificación se distingue por estar reservada a aquellos casos en que el ordenamiento exige, como condición de eficacia de un acto administrativo determinado, que el interesado tome conocimiento formal de su contenido, con las consecuencias procedimentales que de ello derivan (el inicio de plazos, la posibilidad de recurrir). Una comunicación que no cumple esa función cualificada —un aviso, una circular, una comunicación interna— es comunicación institucional sin ser notificación.

### Enviar vs Notificar

Esta es, posiblemente, la distinción de mayor trascendencia práctica de todo este documento. Enviar es el acto material de transmitir la información por el medio elegido. Notificar es el efecto jurídico-administrativo de que esa información haya sido puesta válidamente en conocimiento del destinatario, con todas las consecuencias procedimentales que de ello derivan. Una institución puede haber enviado una comunicación —y conservar prueba fehaciente de haberlo hecho— sin que esa comunicación haya producido el efecto de notificación, si el envío no llegó a destino, si el destinatario no era el correcto, o si el medio empleado no era el que el tipo de acto exigía. El envío es condición necesaria de la notificación; nunca es, por sí mismo, condición suficiente.

### Comunicación vs Documento

Conforme ya estableció ADR-012, el documento es el soporte material que registra información; no produce, por sí mismo, ningún efecto institucional. La comunicación institucional puede valerse de uno o más documentos como soporte de su contenido (el texto de la cédula de notificación, la copia del acto que se comunica), pero la comunicación, en sí misma, no es el documento: es el hecho institucional de la transmisión efectiva de ese contenido hacia el destinatario. Un documento puede existir —redactado, completo, conservado en el sistema— sin que jamás haya sido comunicado a nadie; en ese caso, existe el documento, pero no existe la comunicación.

### Comunicación vs Acto Administrativo

Conforme a ADR-009, el acto administrativo es la manifestación de voluntad institucional que produce efectos jurídicos o administrativos identificables. La comunicación de ese acto a su destinatario es, ella misma, frecuentemente un acto administrativo distinto —la notificación, como ya se ha dicho, es un tipo de acto administrativo en el catálogo de ADR-009—, pero la comunicación institucional, como fenómeno, no se identifica con ninguno de los dos actos involucrados: ni con el acto que se comunica (la resolución, el decreto), ni con el acto que ordena o instrumenta su comunicación (la notificación). La comunicación es el puente fáctico entre la decisión institucional y el conocimiento de su destinatario; los actos administrativos que pueden estar involucrados en ese puente no agotan, por sí solos, el fenómeno de la comunicación.

### Comunicación vs Procedimiento

Conforme a ADR-010, el procedimiento es la secuencia institucional de actuaciones orientada a producir un resultado administrativo. La comunicación de los resultados de un procedimiento (su decisión final, sus actos intermedios cuando corresponda) es, frecuentemente, una de las actuaciones que ese procedimiento produce, pero la comunicación, como concepto, no es el procedimiento ni se agota dentro de uno solo: una misma comunicación institucional puede producirse en el contexto de distintos tipos de procedimiento (un reclamo, una licencia, una contratación), y sus reglas de validez no dependen del tipo de procedimiento en el que se produce, sino de la naturaleza propia de la comunicación y del acto que comunica.

### Comunicación vs Expediente

Conforme a ADR-013, el expediente es la unidad institucional que agrupa, de forma ordenada y trazable, las actuaciones, documentos y actos producidos en relación con uno o más procedimientos. Una comunicación puede producirse en el contexto de un expediente determinado, y su constancia documental puede incorporarse a él conforme al mecanismo ya desarrollado en ADR-012 y ADR-013; pero la comunicación no es el expediente, ni depende necesariamente de la existencia de uno para producirse, conforme se desarrolla en la sección siguiente.

---

## Naturaleza de la Comunicación Institucional

### ¿Qué es una Comunicación Institucional?

Es, ante todo, un hecho institucional con tres componentes inseparables: un contenido que se transmite, un destinatario identificado o identificable al que se dirige, y un medio idóneo por el cual esa transmisión efectivamente ocurre. La ausencia de cualquiera de los tres componentes impide que exista comunicación institucional en sentido pleno: sin contenido, no hay nada que comunicar; sin destinatario identificado, no hay a quién comunicar; sin medio idóneo, lo que ocurre puede ser un intento de comunicación, pero no una comunicación válidamente producida.

### ¿Puede Existir una Comunicación sin Expediente?

Sí, sin ninguna limitación conceptual. Conforme ya estableció ADR-010 y reafirmó extensamente ADR-013, existen procedimientos que se tramitan sin apertura de expediente formal, y las comunicaciones que esos procedimientos requieran se producen igualmente, sin que la ausencia de expediente las invalide. Una certificación de emisión directa, ya reconocida como acto sin tramitación expedientillo en ADR-009, puede comunicarse a su destinatario sin que exista expediente alguno que la contenga.

### ¿Puede Existir una Comunicación sin Acto Administrativo?

Sí. Las comunicaciones internas de coordinación operativa, los avisos informativos, las circulares de aplicación general, no necesariamente comunican un acto administrativo en el sentido pleno de ADR-009: pueden comunicar información, criterios, instrucciones, sin que detrás de esa comunicación exista una decisión que produzca efectos jurídicos identificables sobre la situación de una persona determinada. La comunicación institucional, como género, excede ampliamente al universo de los actos administrativos que eventualmente comunica.

### ¿Puede Existir una Notificación sin Documento?

En sentido estricto, no, o al menos no de forma institucionalmente recomendable. Toda notificación, para ser verificable, requiere de algún soporte documental que dé cuenta de su contenido y de las circunstancias de su producción, conforme al modelo ya desarrollado en ADR-012. Sin embargo, es importante distinguir: el documento es el soporte de la notificación, no la notificación misma. Puede existir, en teoría, una manifestación verbal que pretenda comunicar algo, pero esa manifestación, sin ningún soporte documental que la respalde, carece de la verificabilidad que la notificación, como acto administrativo formal, exige para producir sus efectos procedimentales.

### ¿Qué Significa Comunicar Válidamente?

Comunicar válidamente significa que la transmisión de la información se produjo cumpliendo las tres condiciones que el ordenamiento exige para reconocerle el efecto de puesta en conocimiento: que el medio empleado era idóneo para el tipo de comunicación de que se trataba, que el destinatario estaba correctamente identificado conforme a ADR-006, y que existe evidencia institucional suficiente, conforme se desarrolla en su propia sección, de que la información efectivamente llegó a la esfera de disponibilidad del destinatario. La validez de la comunicación no depende de que el destinatario haya, en los hechos, tomado conocimiento efectivo de su contenido: depende de que la institución haya cumplido, de forma verificable, con su carga de ponerla a su disposición por un medio idóneo.

---

## Comunicación y Acto Administrativo

Conforme ya se ha desarrollado en las Diferencias Fundamentales, la comunicación de un acto administrativo y el acto administrativo comunicado son dos objetos institucionales distintos. El acto que se comunica (una resolución, un decreto, una disposición) tiene su propio ciclo de vida, ya desarrollado extensamente en ADR-009: nace cuando la autoridad competente forma su voluntad decisoria, se valida mediante firma conforme a ADR-011, y entra en vigencia cuando se cumplen, entre otros requisitos, los de comunicación a su destinatario cuando esto corresponda.

La notificación, en tanto acto administrativo de comunicación, tiene a su vez su propio ciclo de vida conforme a ADR-009 (puede estar en borrador, en elaboración, pendiente de firma, firmada, vigente), pero ese ciclo de vida del acto-notificación no debe confundirse con el ciclo de vida de la comunicación institucional como fenómeno, que este documento desarrolla en su propia sección y que tiene etapas que el ciclo de vida del acto administrativo no contempla: el envío, la recepción, y la producción del efecto comunicacional pleno.

Un acto administrativo puede entrar en vigencia condicionado a su comunicación (la generalidad de los actos que afectan derechos de un interesado determinado), o puede entrar en vigencia con independencia de cualquier comunicación a un destinatario específico (los actos de alcance general, como una ordenanza, cuya vigencia depende de su publicidad general y no de la notificación individual a cada habitante). Esta distinción, de origen remoto en el derecho administrativo y no una innovación de este modelo, debe ser representada conceptualmente: no todo acto requiere comunicación individualizada para producir efectos.

---

## Comunicación y Procedimiento

La comunicación de los resultados de un procedimiento es, frecuentemente, una de sus actuaciones finales, conforme ya estableció ADR-010 al incluir a la notificación entre los tipos de actuación que un procedimiento puede producir. Pero la comunicación institucional puede producirse también en etapas intermedias del procedimiento (un aviso de que se requiere documentación adicional, una comunicación de que el expediente fue derivado a otra área), sin que esas comunicaciones intermedias constituyan, necesariamente, notificaciones en el sentido técnico pleno, porque pueden no estar condicionando la eficacia de ningún acto decisorio.

El procedimiento, como secuencia institucional, puede entonces producir múltiples comunicaciones a lo largo de su desarrollo, de distinto tipo y trascendencia, sin que el modelo deba asumir que existe una correspondencia de uno a uno entre procedimiento y comunicación: un procedimiento puede no requerir ninguna comunicación formal (si se resuelve íntegramente de oficio sin interesado externo, conforme reconoció ADR-010), y puede requerir varias comunicaciones sucesivas a lo largo de su desarrollo.

---

## Comunicación y Documento

El documento, conforme a ADR-012, es el soporte material; la comunicación es el hecho de la transmisión efectiva de ese soporte —o de su contenido— hacia el destinatario. Esta relación es estructuralmente análoga a la que ADR-011 estableció entre el documento y la firma: así como la firma valida un documento sin ser el documento mismo, la comunicación transmite un documento sin ser el documento mismo.

Un documento puede tener múltiples comunicaciones asociadas a lo largo de su historia: una primera comunicación a su destinatario original, y comunicaciones posteriores a otros interesados que se incorporan al procedimiento, o comunicaciones de corrección si la primera no produjo válidamente sus efectos. Cada una de esas comunicaciones es un evento institucional distinto, con su propia evidencia y su propio ciclo de vida, aunque todas ellas transmitan, en sustancia, el mismo contenido documental.

---

## Comunicación y Expediente

Conforme ya desarrolló extensamente ADR-013, el expediente es el contenedor que agrupa, de forma cronológica, las actuaciones, documentos y actos relacionados con uno o más procedimientos. Las comunicaciones producidas en el contexto de un expediente —y, en particular, sus constancias documentales— se incorporan a él conforme al mismo mecanismo ya desarrollado para cualquier otro documento o actuación.

La radicación del expediente, conforme al concepto incorporado en ADR-013, no es la misma cosa que el destinatario de una comunicación: el expediente puede estar radicado en un área determinada mientras la comunicación que produce se dirige a un interesado completamente externo a esa área. No debe confundirse la ubicación operativa del expediente con el destino de las comunicaciones que se producen en su contexto.

---

## Comunicación y Firma

Conforme a ADR-011, la firma es la manifestación formal mediante la cual una autoridad válidamente constituida valida una actuación o un acto administrativo, produciendo evidencia de autoría, integridad y no repudio. La notificación, en tanto acto administrativo, requiere firma conforme a ese modelo: alguien, ejerciendo válidamente la autoridad de la posición competente, debe validar que la comunicación de un acto determinado fue dispuesta institucionalmente.

Pero la firma del acto-notificación no debe confundirse con la evidencia de que la comunicación efectivamente se produjo y llegó a su destinatario. Puede existir una notificación válidamente firmada por la autoridad competente, cuyo envío posterior, sin embargo, fracasó: el documento firmado existe, la decisión de comunicar existe, pero la comunicación, como hecho institucional pleno, no llegó a producirse. La firma valida la decisión de comunicar; no garantiza, por sí misma, que la comunicación efectivamente alcanzó a su destinatario.

---

## Comunicación e Identidad

Conforme a ADR-006, la identidad es la representación verificada y única de una persona dentro del sistema. La validez de toda comunicación institucional depende, de forma crítica, de que su destinatario esté correctamente identificado conforme a ese modelo: una comunicación dirigida a una identidad incorrecta, duplicada, o insuficientemente verificada, no puede considerarse válidamente producida, por más que el envío material se haya ejecutado sin errores técnicos.

Esta dependencia es particularmente relevante cuando el destinatario es una persona que, conforme a ADR-006, puede tener más de una relación con la institución (un ciudadano que es también empleado, por ejemplo): la comunicación debe dirigirse a la identidad de la persona en el carácter que corresponda a la materia comunicada, sin que la existencia de otras cuentas o vínculos de esa misma persona genere ambigüedad sobre a cuál de ellos corresponde dirigir la comunicación.

---

## Comunicación y Autoridad

Conforme a ADR-008, la autoridad institucional pertenece a la posición organizacional, no a la persona que la ocupa, y se ejerce en cualquiera de los cinco caracteres ya definidos: titular, delegado, suplente, interino o sucesor. La decisión de comunicar un acto administrativo determinado —cuándo, por qué medio, con qué contenido— es, en sí misma, una decisión que requiere el ejercicio de la autoridad de la posición competente sobre la materia, en alguno de esos cinco caracteres.

Una comunicación dispuesta por una posición sin competencia sobre la materia, o por una persona que no ejercía válidamente la autoridad correspondiente en ese momento, adolece del mismo vicio que cualquier otro acto administrativo dictado sin autoridad válida conforme a ADR-008 y ADR-009: carece de fundamento institucional, independientemente de que el envío material se haya ejecutado correctamente.

---

## Tipos de Comunicación Institucional

### Notificación Personal

La notificación personal es aquella en que el medio empleado garantiza que el contenido llega a la esfera de disponibilidad exclusiva del destinatario, identificado de forma individual. Es el tipo de comunicación de mayor exigencia de idoneidad, reservado a los actos cuya trascendencia sobre la situación jurídica del destinatario así lo requiere.

### Notificación por Edictos o Publicidad General

Cuando el destinatario no puede ser identificado individualmente, o cuando el ordenamiento prevé la publicidad general como medio idóneo (la promulgación de una ordenanza, por ejemplo), la comunicación institucional adopta la forma de publicidad dirigida a un universo indeterminado de destinatarios, produciendo sus efectos conforme a las reglas propias de esa modalidad, distintas de las que rigen la notificación personal.

### Aviso Informativo

Conforme ya se definió en las Definiciones Fundamentales, el aviso informativo comunica información de interés sin condicionar la eficacia de ningún acto administrativo ni dar inicio a plazos procedimentales.

### Comunicación Interinstitucional

La comunicación interinstitucional es aquella cuyo destinatario es otra institución (el HCD comunicándose con la Municipalidad, el Hospital con cualquiera de las dos), conforme al aislamiento organizacional ya establecido en ADR-001. Esta modalidad requiere una idoneidad de medio y una identificación de destinatario propias del vínculo entre instituciones, distintas de las que rigen la comunicación con un ciudadano o un empleado.

### Comunicación Interna

Conforme ya se definió, la comunicación interna vincula a posiciones organizacionales dentro de la misma institución, y su régimen de exigencia de idoneidad es, en general, menos estricto que el de la comunicación externa, dado que no está destinada a producir efectos sobre la esfera jurídica de un interesado ajeno a la institución.

### Comunicación de Cortesía o Recordatorio

Es la comunicación que, sin sustituir a una notificación ya válidamente producida, refuerza o recuerda al destinatario la existencia de una comunicación anterior, sin que de ella derive ningún nuevo efecto procedimental. Una comunicación de cortesía no reinicia plazos ni sustituye a la notificación original.

---

## Ciclo de Vida

El ciclo de vida de la comunicación institucional es un ciclo propio, distinto del ciclo de vida del acto administrativo (ADR-009), del procedimiento (ADR-010), del documento (ADR-012) o del expediente (ADR-013). Ninguno de esos ciclos coincide necesariamente con el de la comunicación, aunque todos puedan estar relacionados con ella en un caso concreto.

### Dispuesta

La comunicación está dispuesta cuando la autoridad competente, conforme a ADR-008, ha decidido que determinado contenido debe comunicarse a determinado destinatario, sin que todavía se haya ejecutado ningún acto material de transmisión.

### Preparada

La comunicación está preparada cuando su contenido ha sido fijado en el soporte documental correspondiente (ADR-012) y se ha determinado el medio idóneo por el cual será transmitida, sin que el envío todavía se haya producido.

### Enviada

La comunicación está enviada cuando se ha ejecutado el acto material de transmisión por el medio elegido, con destino al destinatario identificado, sin que todavía exista constancia de que la transmisión llegó a su destino.

### Recibida

La comunicación está recibida cuando existe evidencia institucional de que la información ingresó efectivamente a la esfera de disponibilidad del destinatario, conforme a la definición ya establecida de recepción.

### Eficaz

La comunicación es eficaz cuando, habiendo sido recibida por un medio idóneo y dirigida a un destinatario correctamente identificado, produce el efecto jurídico-administrativo que el ordenamiento le reconoce: el inicio de los plazos correspondientes, la oponibilidad del acto comunicado frente al destinatario.

### Frustrada

La comunicación está frustrada cuando el envío se produjo pero no llegó a constituir recepción válida (el destinatario cambió de domicilio sin informarlo, el medio empleado resultó inidóneo, la identificación del destinatario era incorrecta), requiriendo, según el caso, un nuevo intento de comunicación por el mismo o por otro medio.

### Subsanada

La comunicación está subsanada cuando, habiendo sido frustrada, un nuevo intento de comunicación, o la acreditación de que el destinatario tomó conocimiento efectivo por otra vía, produce finalmente el efecto que la comunicación original no había alcanzado.

### Cuestionada

La comunicación está cuestionada cuando el destinatario o un tercero interesado invoca, formalmente, que la comunicación no se produjo válidamente, dando lugar a una revisión institucional de su evidencia.

### Confirmada

La comunicación está confirmada cuando, tras la revisión que motivó su estado de cuestionada, la autoridad competente determina que la comunicación sí se produjo válidamente y que su eficacia se mantiene.

### Invalidada

La comunicación está invalidada cuando, tras la revisión correspondiente, se determina que no produjo el efecto que se le pretendía atribuir, debiendo en consecuencia producirse una nueva comunicación válida para que el acto correspondiente alcance eficacia frente al destinatario.

### Archivada

La comunicación está archivada cuando, habiendo cumplido o agotado su ciclo de vida, su constancia se conserva conforme a los principios de conservación desarrollados en su propia sección.

---

## Evidencia de la Comunicación

### Qué Constituye Evidencia Suficiente de una Comunicación

La evidencia suficiente de una comunicación institucional requiere, como mínimo, la concurrencia de cuatro elementos: la identificación inequívoca del destinatario conforme a ADR-006, la identificación del medio empleado y de su idoneidad para el tipo de comunicación de que se trata, la constancia de que el envío se ejecutó en una fecha determinada, y la constancia de que el contenido enviado llegó efectivamente a la esfera de disponibilidad del destinatario, conforme a las reglas de recepción propias del medio empleado. La sola constancia de envío, sin evidencia de recepción, es insuficiente para acreditar que la comunicación produjo válidamente sus efectos, salvo en aquellos regímenes en que el propio ordenamiento atribuye al envío, por sí solo y bajo condiciones específicas, el valor de comunicación eficaz.

### Autoría

La autoría de la comunicación es la atribución cierta, conforme a ADR-006 y ADR-008, de la decisión de comunicar a la posición y a la persona que la dispuso, en el carácter de ejercicio de autoridad que corresponda.

### Integridad

La integridad de la comunicación es la garantía de que el contenido efectivamente transmitido al destinatario es idéntico al contenido que la autoridad competente dispuso comunicar, sin alteraciones producidas durante el proceso de transmisión.

### Trazabilidad

La trazabilidad de la comunicación es la capacidad de reconstruir, en cualquier momento posterior, la totalidad de su recorrido: quién la dispuso, cuándo, por qué medio, con qué contenido, y qué resultado produjo (recepción, frustración, subsanación).

### No Repudio

El no repudio de la comunicación es la imposibilidad de que la institución niegue haberla emitido, o de que el destinatario niegue haberla recibido, cuando la evidencia institucional reúne los elementos suficientes ya desarrollados en esta sección.

### Cadena de Custodia de la Evidencia

La cadena de custodia de la evidencia de comunicación es el registro ininterrumpido de cómo se generó, conservó y, eventualmente, verificó cada uno de los elementos de evidencia (constancia de envío, constancia de recepción) a lo largo del tiempo, de modo que esa evidencia pueda sostenerse ante un cuestionamiento posterior, conforme a los principios ya establecidos en ADR-005 y desarrollados para el documento en ADR-012 y para el expediente en ADR-013.

### Relación con ADR-005

Todo lo desarrollado en esta sección es una aplicación específica, en el dominio de la comunicación institucional, de los principios generales de trazabilidad, integridad, no repudio y responsabilidad institucional ya establecidos con carácter transversal en ADR-005. Toda comunicación institucional, y en particular toda notificación, constituye un evento de auditoría obligatoria conforme a ese modelo.

---

## Conservación

La constancia de una comunicación institucional, en tanto documento conforme a ADR-012, se conserva según los mismos regímenes ya desarrollados en ese documento y extendidos en ADR-013 para el expediente: archivo activo mientras la comunicación todavía puede ser objeto de cuestionamiento dentro de los plazos procedimentales ordinarios, archivo intermedio una vez vencidos esos plazos sin haber sido cuestionada, y archivo histórico o conservación permanente cuando la comunicación es soporte de un acto de trascendencia institucional que, conforme a ADR-005 y ADR-012, deba conservarse indefinidamente. Este modelo no fija plazos específicos de retención, que dependen del marco normativo aplicable a cada tipo de acto comunicado.

---

## Riesgos

### CRÍTICO

**Confundir enviar con notificar.** Si el sistema o la práctica institucional asumen que el solo hecho de haber enviado una comunicación es equivalente a haberla notificado válidamente, se atribuyen efectos jurídicos (el inicio de plazos de impugnación, la oponibilidad de un acto) a comunicaciones que en realidad nunca llegaron a producir el efecto de puesta en conocimiento que el ordenamiento exige, exponiendo al municipio a la nulidad de los actos posteriores que se apoyen en esa comunicación frustrada.

**Confundir comunicación con documento.** Si se asume que la existencia del documento que soporta una comunicación (la cédula, el texto a comunicar) es equivalente a que la comunicación efectivamente se produjo, se ignora la necesidad de acreditar el envío y la recepción, comprometiendo la validez de cualquier acto cuya eficacia dependa de esa comunicación.

**Confundir comunicación con acto administrativo.** Si se asume que la decisión de comunicar (la notificación como acto, conforme a ADR-009) agota el fenómeno de la comunicación, se pierde la necesidad de verificar que esa decisión efectivamente se materializó en un envío exitoso y una recepción válida, tratando como comunicado algo que solo fue decidido comunicar.

**Pérdida de evidencia de comunicación.** Si el sistema no conserva, de forma íntegra y trazable, la evidencia de envío y recepción de cada comunicación, la institución queda sin capacidad de acreditar, ante un cuestionamiento posterior, que cumplió válidamente con su obligación de comunicar, comprometiendo la validez de los actos que de esa comunicación dependían.

**Notificación al destinatario incorrecto.** Si la identificación del destinatario no se verifica conforme al modelo de identidad de ADR-006, la comunicación puede dirigirse a una persona distinta de la que el acto efectivamente afecta, sin producir ningún efecto válido respecto del verdadero interesado, mientras la institución cree erróneamente haber cumplido su obligación de comunicar.

**Comunicación dispuesta sin autoridad competente.** Si una comunicación de trascendencia institucional es dispuesta por una posición sin competencia sobre la materia, o por una persona que no ejercía válidamente la autoridad correspondiente conforme a ADR-008, la comunicación carece del mismo fundamento institucional que cualquier acto dictado sin autoridad válida.

**Eliminación o alteración de la constancia de comunicación.** Si el registro de una comunicación puede modificarse o eliminarse después de producida, se vulnera el principio de inmutabilidad histórica ya establecido en ADR-005, ADR-012 y ADR-013, destruyendo evidencia que puede ser indispensable para sostener la validez de los actos comunicados ante un cuestionamiento posterior.

**Ruptura del no repudio por ambigüedad en la identidad del destinatario o del emisor.** Si la institución no puede atribuir, sin ambigüedad, una comunicación a la posición y persona que la dispuso, o si no puede atribuir, sin ambigüedad, la recepción a la identidad correcta del destinatario, ninguna de las dos partes puede ser responsabilizada con certeza por lo ocurrido, comprometiendo el valor probatorio de la comunicación en su totalidad.

### ALTO

**Comunicación producida fuera del procedimiento o expediente correspondiente sin referencia explícita a su origen.** Si una comunicación no conserva el vínculo con el procedimiento (ADR-010) o el expediente (ADR-013) que la originó, se dificulta la reconstrucción del contexto institucional completo en que fue dispuesta y su justificación.

**Falta de distinción entre notificación personal y publicidad general en la verificación de eficacia.** Si el sistema aplica el mismo criterio de validez a ambas modalidades sin distinguir sus reglas propias de producción de efectos, puede atribuirse eficacia a una comunicación que no cumplió las condiciones específicas que su tipo exige.

**Comunicación de cortesía tratada como si reiniciara plazos.** Si una comunicación de recordatorio se confunde con una nueva notificación, se puede inducir al destinatario, o a la propia institución, a errores sobre el cómputo de los plazos procedimentales realmente aplicables.

**Falta de verificación de idoneidad del medio para el tipo de acto comunicado.** Si el sistema no verifica que el medio empleado es el que el ordenamiento exige para el tipo de acto que se comunica, puede producirse una comunicación materialmente exitosa pero institucionalmente inválida.

**Comunicación interinstitucional tratada con las mismas reglas que la comunicación con un ciudadano.** Si no se distingue el régimen propio de la comunicación entre instituciones (ADR-001) del régimen de comunicación con interesados externos individuales, se pueden aplicar exigencias de idoneidad inadecuadas a cada caso.

**Falta de registro del estado de frustración y de los intentos de subsanación.** Si una comunicación frustrada no queda registrada como tal, ni se documentan los sucesivos intentos de subsanación, se pierde la posibilidad de acreditar la diligencia institucional en el cumplimiento de su obligación de comunicar.

**Ausencia de revisión formal ante una comunicación cuestionada.** Si el cuestionamiento de una comunicación por parte de un interesado no da lugar a un proceso institucional explícito de revisión (que culmine en su confirmación o su invalidación), la institución carece de un mecanismo claro para resolver la controversia sobre su propia validez.

**Confusión entre el destinatario de la comunicación y la radicación del expediente que la origina.** Si se asume que el área donde está radicado el expediente (ADR-013) es, de alguna manera, parte del circuito de destinatarios de la comunicación, se introduce una confusión entre dos conceptos —radicación operativa y destino comunicacional— que pertenecen a planos distintos.

**Falta de verificación de la autoridad competente para disponer comunicaciones de alto impacto institucional.** Si cualquier posición, sin distinción de competencia, puede disponer comunicaciones de trascendencia institucional (una comunicación interinstitucional, una notificación de alto impacto), se diluye la garantía de regularidad que ADR-008 exige para el ejercicio de autoridad.

**Comunicaciones múltiples sobre el mismo acto sin consolidación de su historial.** Si un acto requiere más de un intento de comunicación (por frustración del primero) y el sistema no consolida el historial completo de esos intentos en una secuencia clara, se dificulta determinar cuál de las comunicaciones fue, finalmente, la eficaz.

### MEDIO

**Falta de un criterio uniforme sobre qué tipo de acto requiere notificación personal y cuál admite publicidad general.** Sin este criterio, distintas áreas pueden aplicar de forma heterogénea el tipo de comunicación a actos de naturaleza similar.

**Ausencia de un catálogo institucional de los tipos de comunicación reconocidos por el modelo.** Sin este catálogo, el personal operativo puede no distinguir con precisión cuándo está produciendo una notificación, un aviso, o una comunicación de cortesía.

**Falta de alertas ante comunicaciones próximas a frustrarse por falta de respuesta del destinatario.** Sin estas alertas, la institución puede no advertir a tiempo la necesidad de iniciar un nuevo intento de comunicación.

**Comunicaciones internas registradas con el mismo nivel de formalidad que las externas.** Si toda comunicación, sin distinción de destinatario, se sujeta al mismo régimen de evidencia exigente, se introduce una carga operativa desproporcionada para las comunicaciones internas de baja trascendencia.

**Falta de visibilidad consolidada del estado de las comunicaciones pendientes dentro de un mismo expediente.** Sin esta vista, el seguimiento de qué comunicaciones ya produjeron eficacia y cuáles continúan pendientes se dificulta.

**Ausencia de un mecanismo claro para que el destinatario externo verifique el estado de una comunicación que lo afecta.** Si el ciudadano no puede confirmar fácilmente si una comunicación dirigida a él ya fue efectivamente registrada como recibida, aumenta la incertidumbre y la litigiosidad.

**Falta de diferenciación de criterio entre instituciones sobre la idoneidad de un mismo medio de comunicación.** Si la Municipalidad, el HCD y el Hospital aplican criterios distintos sin coordinación sobre qué medios son idóneos para tipos de actos equivalentes, se generan inconsistencias en la práctica institucional conjunta.

### BAJO

**Nomenclatura inconsistente entre "aviso", "comunicación" y "notificación" en distintas áreas.** No constituye un riesgo de validez institucional inmediato, pero dificulta la capacitación y la comprensión compartida del modelo.

**Falta de un glosario institucional accesible sobre los tipos de comunicación definidos en este documento.** Dificulta la incorporación de personal nuevo a la correcta aplicación del modelo.

**Ausencia de indicadores de gestión sobre la tasa de frustración de comunicaciones por tipo de acto.** Sin esta información agregada, la institución pierde la posibilidad de identificar patrones recurrentes de ineficacia comunicacional.

---

## Principios del Modelo

### Legalidad

Toda comunicación institucional debe producirse conforme al marco normativo aplicable al tipo de acto que comunica, respetando los requisitos de medio, forma y destinatario que ese marco exige.

### Trazabilidad

Toda comunicación debe poder reconstruirse en su totalidad: quién la dispuso, cuándo, por qué medio, con qué contenido, y qué resultado produjo.

### Integridad

El contenido efectivamente transmitido al destinatario debe ser idéntico al contenido que la autoridad competente dispuso comunicar, sin alteraciones producidas durante el proceso de transmisión.

### Evidencia

Ninguna comunicación se considera válidamente producida sin evidencia institucional suficiente de su envío y de su recepción, conforme a los elementos ya desarrollados en este documento.

### No Repudio

Ni la institución puede negar haber emitido una comunicación válidamente registrada, ni el destinatario puede negar haberla recibido, cuando la evidencia institucional reúne los elementos exigidos por este modelo.

### Neutralidad Tecnológica

Este modelo no presupone ni privilegia ningún medio tecnológico específico de comunicación. La validez de una comunicación depende de la idoneidad institucional del medio empleado para el tipo de acto comunicado, no de la naturaleza tecnológica particular de ese medio, que puede cambiar con el tiempo sin que los principios de este documento deban revisarse.

### Separación Comunicación-Documento

La comunicación es el hecho institucional de la transmisión efectiva; el documento (ADR-012) es el soporte material de su contenido. Un documento puede existir sin haber sido comunicado; una comunicación no puede existir sin algún soporte documental que la respalde, pero no se identifica con él.

### Separación Comunicación-Acto

La comunicación de un acto administrativo y el acto administrativo comunicado son objetos distintos, conforme a ADR-009. La notificación, en tanto acto administrativo de comunicación, tampoco se identifica con el fenómeno comunicacional pleno, que exige además evidencia de envío y recepción.

### Separación Comunicación-Procedimiento

La comunicación puede producirse en el contexto de un procedimiento (ADR-010), como una de sus actuaciones, pero no se identifica con el procedimiento en su totalidad ni depende necesariamente de la existencia de uno.

### Separación Comunicación-Expediente

La comunicación puede producirse en el contexto de un expediente (ADR-013), y su constancia puede incorporarse a él, pero la comunicación no depende necesariamente de la existencia de un expediente para producirse válidamente.

---

## Relación con los ADR Anteriores

### Relación con ADR-001 — Organizational Context Model

La comunicación interinstitucional respeta el aislamiento organizacional ya establecido en ADR-001: cada institución comunica desde su propio ámbito, y la comunicación entre instituciones distintas (Municipalidad, HCD, Hospital) sigue un régimen propio, distinto del aplicable a la comunicación con ciudadanos o empleados.

### Relación con ADR-005 — Audit Model

Toda comunicación institucional, y en particular toda notificación, constituye un evento de auditoría obligatoria conforme a ADR-005. Los principios de trazabilidad, integridad, no repudio y responsabilidad institucional desarrollados en ese documento son la base directa de la sección de Evidencia de la Comunicación de este ADR.

### Relación con ADR-006 — Person & Identity Model

La validez de toda comunicación depende de que su destinatario y su emisor estén correctamente identificados conforme al modelo de identidad única de ADR-006, evitando que la comunicación se dirija a una identidad incorrecta o ambigua.

### Relación con ADR-007 — Organizational Position Model

El emisor institucional de una comunicación es una posición organizacional conforme a ADR-007, no una persona individual. La competencia para disponer una comunicación determinada deriva de la posición que el organigrama institucional asigna sobre la materia comunicada.

### Relación con ADR-008 — Organizational Authority & Delegation Model

La decisión de comunicar requiere el ejercicio válido de la autoridad de la posición competente, en cualquiera de los cinco caracteres definidos en ADR-008: titular, delegado, suplente, interino o sucesor.

### Relación con ADR-009 — Administrative Act & Resolution Model

La notificación es, conforme a ADR-009, un tipo de acto administrativo. Este documento desarrolla, con mayor profundidad, el fenómeno comunicacional que ese acto administrativo dispone, distinguiendo la decisión de comunicar (el acto) de la comunicación efectivamente producida (el hecho institucional).

### Relación con ADR-010 — Administrative Procedure & Case Lifecycle Model

La comunicación de los resultados de un procedimiento es, frecuentemente, una de sus actuaciones, conforme a ADR-010. Este documento precisa que no toda comunicación constituye una actuación de trascendencia decisoria, y que el ciclo de vida de la comunicación es independiente del ciclo de vida del procedimiento en cuyo contexto se produce.

### Relación con ADR-011 — Digital Signature & Institutional Validation Model

La notificación, en tanto acto administrativo, requiere validación mediante firma conforme a ADR-011. Este documento distingue esa validación formal de la decisión de comunicar, de la evidencia de que la comunicación efectivamente se produjo y llegó a su destinatario, que exige elementos adicionales a la sola firma del acto.

### Relación con ADR-012 — Document & Institutional Record Model

La constancia de comunicación es un documento conforme a ADR-012, sometido a los mismos regímenes de versionado, evidencia y conservación ya desarrollados en ese modelo, sin que el documento se identifique con la comunicación que soporta.

### Relación con ADR-013 — Administrative Case File & Dossier Model

Las comunicaciones producidas en el contexto de un expediente se incorporan a él conforme al mecanismo ya desarrollado en ADR-013, sin que la comunicación dependa necesariamente de la existencia de un expediente, ni se confunda con la radicación operativa que ese documento desarrolla para el expediente.

---

## Modelo Conceptual Definitivo

El modelo conceptual de comunicación institucional de Muni Digital se define de la siguiente manera:

### La comunicación como concepto propio

La comunicación institucional es un hecho institucional con existencia conceptual independiente del documento que la soporta, del acto administrativo que puede ordenarla, del procedimiento en cuyo contexto se produce, y del expediente que eventualmente la contiene. Tiene tres componentes inseparables: contenido, destinatario identificado y medio idóneo de transmisión efectiva.

### La notificación como especie cualificada

La notificación es la forma de comunicación institucional reservada a los casos en que el ordenamiento exige, como condición de eficacia de un acto administrativo, que el interesado tome conocimiento formal de su contenido. Toda notificación es comunicación institucional; no toda comunicación institucional es notificación.

### El envío como condición necesaria pero no suficiente

Enviar es el acto material de transmisión. Comunicar válidamente exige, además del envío, evidencia institucional de recepción por un medio idóneo, dirigida a un destinatario correctamente identificado. El envío sin recepción válida es comunicación frustrada, no comunicación eficaz.

### El conocimiento efectivo como hecho no exigible por regla general

La validez de la comunicación depende de la recepción por un medio idóneo, no del conocimiento efectivo y subjetivo del destinatario, que el ordenamiento, como regla general, presume a partir de la recepción válidamente acreditada.

### La evidencia de comunicación como dominio propio

La evidencia de que una comunicación se produjo válidamente —su autoría, su integridad, su trazabilidad, su no repudio— constituye un dominio de evidencia institucional propio, regido por los mismos principios generales de ADR-005, pero con elementos específicos (constancia de envío, constancia de recepción, idoneidad del medio) que ningún otro dominio de evidencia ya desarrollado en esta serie exige de la misma manera.

### El ciclo de vida propio e independiente

La comunicación institucional recorre un ciclo de vida propio —dispuesta, preparada, enviada, recibida, eficaz, frustrada, subsanada, cuestionada, confirmada, invalidada, archivada— que no coincide necesariamente con el ciclo de vida del acto que comunica, del procedimiento en que se produce, del documento que la soporta, ni del expediente que eventualmente la contiene.

### La separación absoluta respecto de los conceptos ya aprobados

La comunicación institucional no sustituye, no redefine y no se confunde con ninguno de los conceptos ya desarrollados en ADR-005 a ADR-013. Los consume, se apoya en ellos, y agrega la dimensión que ninguno de ellos tuvo como objeto principal: el fenómeno por el cual la institución, efectivamente, traspasa información hacia quien debe conocerla, y puede acreditarlo.

---

## Roadmap Conceptual

### P0 — Aprobación conceptual

**Objetivo:** Validar y aprobar este documento como fuente de verdad conceptual para la comunicación y la notificación institucional de Muni Digital.

Dependencias: ADR-001 a ADR-013 aprobados. Este documento revisado por el equipo de arquitectura, los referentes legales o de asesoría jurídica municipal (dado que los requisitos de idoneidad del medio y los efectos procedimentales de la notificación dependen del marco normativo administrativo aplicable), y los referentes operativos de Mesa de Entradas y las áreas de mayor volumen de notificaciones (Reclamos, RRHH, Compras, HCD).

Criterio de cierre: El equipo puede responder sin ambigüedad qué es una comunicación institucional, en qué se diferencia de una notificación, por qué enviar no equivale a notificar, qué constituye evidencia suficiente de una comunicación, y por qué el ciclo de vida de la comunicación es independiente del ciclo de vida del acto, el procedimiento, el documento y el expediente que pueden estar involucrados en ella.

Riesgo: CRÍTICO si algún módulo que dependa de la comunicación de actos (Notificaciones, Mesa de Entradas, Reclamos) inicia su diseño técnico sin este modelo aprobado. La ausencia de este modelo obliga a esos módulos a resolver ad hoc, y con alto riesgo de error, la distinción entre envío y notificación válida, que es la fuente más frecuente de nulidad de actos administrativos por defectos de comunicación.

---

### P1 — Diseño técnico

**Objetivo:** Traducir el modelo conceptual en decisiones de diseño técnico: cómo se representa la comunicación como objeto independiente del documento, el acto, el procedimiento y el expediente, cómo se modelan sus estados de ciclo de vida, y cómo se registra la evidencia de envío y recepción exigida por este documento, con neutralidad respecto de cualquier medio tecnológico específico.

Dependencias: P0 cerrado. ADR-009, ADR-010, ADR-011, ADR-012 y ADR-013 implementados en su diseño técnico. ADR-005 implementado en su diseño técnico.

Criterio de cierre: El diseño técnico mantiene la independencia conceptual entre comunicación, documento, acto, procedimiento y expediente. El diseño representa los once estados de ciclo de vida definidos en este documento. El diseño no presupone ningún medio tecnológico específico de comunicación, permitiendo que distintos medios idóneos se incorporen en el futuro sin alterar el modelo conceptual. El diseño distingue claramente, en su modelo de evidencia, la constancia de envío de la constancia de recepción.

Riesgo: ALTO. Es el momento donde la presión de adoptar un medio tecnológico específico de comunicación puede llevar a que el sistema confunda la capacidad técnica de envío de ese medio con la prueba institucional de comunicación válida, exactamente el riesgo crítico que este documento busca prevenir.

Archivos conceptuales que debe cubrir el diseño: modelo de comunicación con sus tres componentes (contenido, destinatario, medio), modelo de ciclo de vida con sus once estados, modelo de evidencia de envío y recepción, modelo de vinculación opcional con acto, procedimiento y expediente, integración con la capa de autoridad de ADR-008 para la verificación de competencia del emisor, integración con la capa de auditoría de ADR-005.

---

### P2 — Implementación del núcleo de comunicación institucional

**Objetivo:** El sistema puede disponer comunicaciones, prepararlas, registrar su envío, registrar evidencia de su recepción, determinar su eficacia, y gestionar los estados de frustración, subsanación, cuestionamiento, confirmación e invalidación cuando corresponda.

Dependencias: P1 cerrado.

Criterio de cierre: Ninguna comunicación se marca como eficaz sin evidencia de recepción por un medio idóneo. El sistema distingue, en todo momento, entre el estado "enviada" y el estado "eficaz", sin tratarlos como equivalentes. El historial completo de cada comunicación —incluyendo sus eventuales frustraciones y subsanaciones— es inmutable y consultable en su totalidad. La auditoría obligatoria de cada evento del ciclo de vida de la comunicación está activa.

Rollback: Si P2 permite que el sistema trate el envío como equivalente a la notificación eficaz, o si el historial de comunicaciones resulta modificable, revertir el módulo afectado hasta corregir. Un sistema de comunicación que no distingue envío de eficacia no debe liberarse a producción, dado que esa distinción es la que protege la validez jurídica de los actos administrativos del municipio.

---

### P3 — Integración con Actos Administrativos, Procedimientos, Documentos y Expedientes

**Objetivo:** El módulo de Actos Administrativos (ADR-009) consulta el estado de eficacia de las comunicaciones requeridas antes de considerar vigente un acto sujeto a notificación. El módulo de Procedimientos (ADR-010) incorpora las comunicaciones como actuaciones cuando corresponda. El módulo de Documentos (ADR-012) sostiene las constancias de comunicación. El módulo de Expedientes (ADR-013) incorpora esas constancias a su cadena documental.

Dependencias: P2 cerrado. ADR-009, ADR-010, ADR-012 y ADR-013 implementados. ADR-005 implementado.

Criterio de cierre: Un acto administrativo sujeto a notificación no se considera vigente para producir efectos frente a su destinatario hasta que la comunicación correspondiente alcance el estado de eficaz. Un procedimiento puede mostrar, dentro de su secuencia de actuaciones, el estado de cada comunicación producida en su desarrollo. Un expediente puede mostrar, dentro de su cadena documental, las constancias de comunicación junto con su estado de ciclo de vida vigente. Una comunicación cuestionada por un interesado puede tramitarse mediante un proceso de revisión institucional que culmine en su confirmación o invalidación, quedando ambos resultados auditados conforme a ADR-005.

---

> Este documento define el modelo conceptual de comunicación institucional y notificación de Muni Digital v1.0.
>
> Estado: DRAFT.
>
> No debe modificarse sin revisión del equipo de arquitectura, los referentes legales y aprobación formal.
>
> Extiende ADR-001, ADR-005, ADR-006, ADR-007, ADR-008, ADR-009, ADR-010, ADR-011, ADR-012 y ADR-013 sin contradecirlos ni redefinirlos.
>
> Es la fuente de verdad conceptual para toda comunicación y notificación institucional de Muni Digital.
>
> Próximo documento recomendado:
>
> ADR-015 — Public Service Request & Citizen Interaction Model v1.