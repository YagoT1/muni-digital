# ADR-012 — Document & Institutional Record Model v1 — Muni Digital

> Documento conceptual del modelo de documento y registro institucional.
> Basado en: PDA.md · ADR-001 · ADR-002 · ADR-003 · ADR-004 · ADR-005 · ADR-006 · ADR-007 · ADR-008 · ADR-009 · ADR-010 · ADR-011
> Estado: Propuesta para revisión y aprobación.
> Restricción: Este documento NO define tablas, entidades técnicas, código, APIs, endpoints, JWT, OAuth, certificados, infraestructura, microservicios, frameworks ni implementación.
> Este documento es la fuente de verdad conceptual para Mesa de Entradas, Expedientes Electrónicos, Archivo Digital, Firma Digital, Actos Administrativos, Procedimientos, Notificaciones y Gestión Documental.

---

## Resumen Ejecutivo

A lo largo de esta serie de documentos, Muni Digital ha ido construyendo, capa por capa, un modelo institucional completo: la posición que existe con independencia de quien la ocupa (ADR-007), la autoridad que esa posición habilita a ejercer (ADR-008), el acto administrativo que esa autoridad produce (ADR-009), el procedimiento que conduce hasta ese acto (ADR-010), y la firma que valida formalmente todo lo anterior (ADR-011). En cada una de esas capas se ha repetido, con variaciones propias de cada dominio, una misma operación intelectual: separar el objeto institucional de su representación material y de los mecanismos que lo producen o lo validan.

Queda, sin embargo, una última pieza sin resolver, y es precisamente la que con mayor frecuencia los sistemas de gestión municipal terminan colapsando con todas las demás: el documento. El documento es el soporte que hace visible, legible y conservable todo lo que las capas anteriores han definido en términos institucionales. Es, en cierto sentido, la superficie de contacto entre el mundo abstracto de la competencia, la autoridad y el acto, y el mundo concreto de lo que un empleado efectivamente abre, lee, imprime o descarga.

Precisamente por ocupar ese lugar de superficie visible, el documento es el concepto que con mayor facilidad termina absorbiendo, en el lenguaje cotidiano y en el diseño apresurado de sistemas, la identidad de todo lo que contiene. Se dice "el decreto" para referirse al archivo PDF que lo contiene, cuando el decreto es el acto administrativo (ADR-009) y el PDF es solo uno de sus posibles soportes documentales. Se dice "el expediente" para referirse al documento consolidado que un sistema genera al final de una tramitación, cuando el expediente (ADR-009, ADR-010) es el contenedor institucional de todo el procedimiento, y ese documento consolidado es, a lo sumo, una de sus representaciones. Se dice "el archivo" tanto para referirse al lugar físico o digital donde se conservan documentos antiguos como para referirse a un documento informático individual, mezclando en una sola palabra dos conceptos que este modelo debe mantener completamente separados.

Esta confusión tiene una consecuencia estructural grave: si el sistema trata al documento como si fuera, indistintamente, el acto, el procedimiento, el expediente o el registro de auditoría, pierde la capacidad de representar situaciones absolutamente cotidianas en la operación municipal. Un mismo acto administrativo puede estar soportado por más de un documento (el texto principal y sus anexos técnicos). Un mismo documento puede ser referenciado desde varios expedientes distintos (un informe técnico general que se cita en múltiples trámites). Un documento puede sufrir sucesivas versiones antes de ser validado, sin que cada una de esas versiones constituya un acto distinto. Y un documento puede perder toda vigencia operativa y pasar al archivo histórico mientras el acto que contiene, y los efectos jurídicos que ese acto produjo, siguen plenamente vigentes.

La decisión central de este documento es la siguiente:

**El documento es el soporte institucional que registra información. Puede contener actos administrativos, actuaciones, notificaciones, informes, dictámenes u otros contenidos institucionales, pero no se identifica con ninguno de ellos.**

Este modelo desarrolla, con la misma profundidad que ya alcanzaron ADR-009, ADR-010 y ADR-011 para el acto, el procedimiento y la firma, qué es exactamente el documento, en qué se diferencia de cada uno de los conceptos institucionales que puede soportar, qué tipos de documentos existen en la operación municipal, cómo se versiona, cómo se conserva, y qué evidencia documental debe garantizar el sistema para que cada documento conserve, a lo largo del tiempo, su valor probatorio institucional.

---

## Definiciones Fundamentales

### Documento

El documento es el soporte material o digital que registra información de forma estable y consultable. El documento transporta contenido; no produce, por sí mismo, ningún efecto institucional. Esta definición, ya introducida en ADR-009, es el punto de partida de todo este documento, que la desarrolla con la extensión y el detalle que merece.

### Registro

El registro es la constancia formal de que algo ha ocurrido, conservada con la finalidad de permitir su consulta y verificación posterior. El registro es una noción más amplia que el documento: puede expresarse documentalmente (un acta, una constancia) o puede existir como entrada en un sistema de auditoría (ADR-005) sin necesidad de adoptar la forma de un documento autónomo. Todo documento institucional es, en algún sentido, un registro, pero no todo registro requiere materializarse como documento independiente.

### Contenido

El contenido es la información sustantiva que el documento transporta: el texto de una resolución, los datos de un informe técnico, las cláusulas de un contrato. El contenido es lo que el documento hace visible y consultable; el documento es el envoltorio que lo sostiene, lo identifica y lo conserva.

### Expediente

Conforme a ADR-009 y ADR-010, el expediente es el contenedor institucional que agrupa, de forma ordenada y cronológica, los documentos, actuaciones y actos producidos en la tramitación de uno o más procedimientos relacionados. El expediente no es un documento: es un contenedor que puede, a su vez, contener numerosos documentos individuales.

### Archivo

El archivo, en el sentido institucional que este modelo adopta, es el repositorio organizado donde se conservan los documentos que han dejado de requerir gestión operativa activa, conforme a los principios de conservación histórica que se desarrollan en su propia sección. El archivo no debe confundirse con el documento individual: un documento puede estar archivado (es su estado de conservación), pero el archivo en sí mismo es la institución o el repositorio que lo conserva, no el documento.

### Documento Institucional

El documento institucional es aquel producido, recibido o conservado por la institución en ejercicio de su función pública, con valor administrativo, legal o probatorio para la organización. Se distingue de cualquier documento que pueda circular informalmente sin haber sido incorporado al circuito institucional de gestión documental.

### Documento Externo

El documento externo es aquel que ingresa a la institución desde afuera de su organización: una nota presentada por un ciudadano, una factura de un proveedor, una comunicación de otro organismo. El documento externo se incorpora al circuito documental institucional en el momento de su recepción formal, conforme se desarrolla en la sección de ciclo de vida.

### Documento Interno

El documento interno es aquel producido por la propia institución para su circulación o conservación dentro de su propio ámbito: un memorando entre áreas, un informe técnico elaborado por una dirección, una nota interna de coordinación.

### Documento Electrónico

El documento electrónico es aquel cuyo soporte es un medio informático, independientemente de si su origen fue digital desde su creación o si proviene de la digitalización de un soporte físico preexistente. La categoría de documento electrónico es la más amplia en términos de soporte; incluye tanto a los documentos nativamente digitales como a las representaciones digitalizadas de documentos físicos.

### Documento Digital

El documento digital, a los efectos de este modelo, es el documento electrónico que nace directamente en formato digital, sin que exista un soporte físico previo del cual derive (a diferencia del documento digitalizado, que es la representación electrónica de un original físico preexistente). Esta distinción, aunque sutil, es relevante para la evidencia documental: el documento digital nativo no requiere acreditar la fidelidad de una digitalización, mientras que el documento digitalizado sí.

### Documento Firmado

El documento firmado es aquel sobre el cual se ha aplicado una validación conforme al modelo de firma institucional desarrollado en ADR-011. La firma no convierte al documento en un acto administrativo (ADR-009); simplemente le confiere, cuando el documento soporta efectivamente a un acto, la condición de soporte validado de ese acto.

### Documento Histórico

El documento histórico es aquel que, habiendo agotado su vigencia operativa, se conserva por su valor institucional, probatorio o patrimonial, conforme a los principios de conservación permanente que se desarrollan más adelante.

### Versión

La versión es cada estado sucesivo por el que atraviesa el contenido de un documento antes de alcanzar su forma definitiva, o cada nueva edición de un documento que reemplaza formalmente a una anterior. El versionado es uno de los aspectos más delicados del modelo documental y se desarrolla en su propia sección extensa.

### Copia

La copia es la reproducción de un documento existente, que puede tener distinto valor probatorio según su origen y su proceso de certificación: una copia simple, una copia certificada, un testimonio.

### Original

El original es el documento en su primera y auténtica expresión, del cual derivan las copias. En el contexto de la gestión documental electrónica, el concepto de "original" requiere una consideración especial que se desarrolla en la sección de evidencia documental, dado que un documento nativamente digital no tiene, en el mismo sentido que un documento papel, una distinción física entre original y copia.

### Anexo

El anexo es el documento que se incorpora a otro documento principal para complementar, detallar o fundamentar su contenido, sin perder su propia identidad documental: los planos técnicos anexos a una resolución de aprobación de obra, por ejemplo.

### Adjunto

El adjunto es el documento que se acompaña a una actuación o a una presentación, sin integrarse necesariamente al contenido sustantivo del documento principal, pero formando parte de la documentación de respaldo de un caso o procedimiento (ADR-010): el comprobante de pago que un ciudadano adjunta a su solicitud.

### Referencia

La referencia es la mención o el vínculo que un documento hace hacia otro documento, acto o expediente existente, sin incorporarlo materialmente: la cita de un decreto anterior dentro de los considerandos de una nueva resolución.

### Metadato

El metadato es la información estructurada que describe al documento sin formar parte de su contenido sustantivo: su fecha de creación, su autor, su tipo, su clasificación, su relación con un expediente o procedimiento determinado. El metadato es lo que permite organizar, buscar y conservar correctamente al documento, sin necesidad de interpretar su contenido sustantivo cada vez.

### Conservación

La conservación es el conjunto de principios y prácticas orientados a garantizar que un documento permanezca disponible, íntegro y legible durante el período que su valor institucional, legal o histórico requiera.

### Retención

La retención es el período mínimo durante el cual un documento determinado debe conservarse, conforme a su naturaleza, su valor probatorio y el marco normativo aplicable, antes de que pueda considerarse su eventual eliminación o transferencia a otro régimen de conservación.

### Trazabilidad Documental

La trazabilidad documental es la capacidad de reconstruir, en cualquier momento, el recorrido completo de un documento: quién lo produjo o lo recibió, cómo se incorporó al circuito institucional, qué versiones atravesó, a qué actos, procedimientos o expedientes se vinculó, y cuál es su estado de conservación actual.

### Cadena Documental

La cadena documental es la secuencia ordenada de documentos relacionados entre sí por sucesión, referencia o complementación, que en su conjunto permite comprender la evolución completa de un asunto a través de sus distintos soportes documentales: el documento inicial, sus versiones sucesivas, sus anexos, y los documentos posteriores que lo modifican, lo complementan o lo sustituyen.

### Evidencia Documental

La evidencia documental es el conjunto de propiedades (autoría, integridad, trazabilidad, no repudio, cadena de custodia) que un documento debe conservar para mantener su valor probatorio institucional a lo largo del tiempo, conforme se desarrolla extensamente en su propia sección.

---

## Diferencias Fundamentales

### Documento vs Acto Administrativo

Conforme ya estableció ADR-009 con la máxima claridad posible, el acto administrativo es la manifestación de voluntad institucional que produce efectos jurídicos o administrativos. El documento es, simplemente, el soporte que hace visible y conservable ese acto. El acto puede existir, en su dimensión decisoria, antes de que su documento esté completamente redactado en su forma final; y el documento que soporta a un acto puede, en determinadas circunstancias excepcionales (pérdida, deterioro, corrupción del archivo digital), requerir ser reconstruido o reemplazado sin que ello afecte la existencia ni la validez del acto que contenía, siempre que pueda acreditarse adecuadamente la correspondencia entre el documento reconstruido y el acto original.

### Documento vs Procedimiento

Conforme a ADR-010, el procedimiento es la secuencia institucional de actuaciones orientada a producir un resultado. El documento es, en el mejor de los casos, el soporte de una o varias de esas actuaciones individuales. Un procedimiento extenso puede generar decenas de documentos a lo largo de su desarrollo (informes, dictámenes, notas, resoluciones), sin que ninguno de ellos, ni siquiera el documento que soporta el acto decisorio final, se identifique con el procedimiento en su totalidad.

### Documento vs Actuación

Conforme a ADR-010, la actuación es cada intervención individual dentro del desarrollo de un procedimiento. Una actuación puede estar soportada por uno o más documentos (un informe técnico que se produce como actuación está soportado por el documento que contiene su texto), pero la actuación en sí misma es el hecho institucional de la intervención, mientras que el documento es su registro material.

### Documento vs Expediente

Ya desarrollada en las definiciones fundamentales: el expediente es el contenedor que agrupa múltiples documentos, mientras que el documento es cada unidad individual contenida. Un expediente sin documentos es, en rigor, un contenedor vacío que todavía no registró ninguna actuación; un documento sin expediente puede existir perfectamente cuando el procedimiento que lo originó (ADR-010) no requiere tramitación expedientillo formal.

### Documento vs Archivo

El archivo es el repositorio o régimen de conservación; el documento es la unidad que ese repositorio conserva. Un documento puede pasar del archivo activo al archivo histórico sin dejar de ser, en su identidad, el mismo documento: lo que cambia es su régimen de conservación y accesibilidad, no su naturaleza.

### Documento vs Registro

Todo documento institucional es, en algún sentido, un registro de algo que ocurrió. Pero no todo registro requiere materializarse como un documento autónomo: muchas actuaciones de mero trámite (una derivación simple, conforme a ADR-010) quedan registradas en la capa de auditoría (ADR-005) sin que sea necesario ni eficiente producir, para cada una de ellas, un documento individual con entidad propia.

### Documento vs Firma

Conforme a ADR-011, la firma es la validación formal que se aplica sobre un contenido (frecuentemente, sobre un documento que soporta a un acto o a una actuación de trascendencia). El documento es el soporte sobre el cual la firma se aplica; la firma no es un atributo intrínseco del documento sino un evento que se le aplica en un momento determinado de su ciclo de vida.

### Documento vs Notificación

La notificación, conforme a ADR-009, es el acto mediante el cual se comunica formalmente a un interesado el contenido de otro acto administrativo. La notificación puede instrumentarse mediante un documento (la cédula de notificación, la comunicación electrónica que la formaliza), pero la notificación en sí misma es el acto de comunicar, mientras que el documento es su soporte instrumental.

### Documento vs Evidencia

La evidencia, en el sentido más amplio que utiliza ADR-005, es cualquier elemento que permite reconstruir y probar que algo ocurrió institucionalmente. El documento es una de las formas más habituales que la evidencia adopta, pero no la única: un registro de auditoría sin forma documental autónoma, o el registro de una firma conforme a ADR-011, son también evidencia institucional sin necesariamente constituir, por sí mismos, documentos independientes.

### Documento vs Datos

Los datos son la información elemental, estructurada y habitualmente reutilizable que puede formar parte del contenido de un documento o que puede existir de forma autónoma dentro de un sistema, sin estar necesariamente organizada en la forma legible, estable y conservable que caracteriza al documento. Un documento puede contener datos (los importes de una factura, las fechas de un informe), pero no todo dato existente en el sistema constituye, por sí mismo, un documento.

---

## ¿Qué es un Documento Institucional?

### Cómo Nace

Un documento institucional nace de dos formas posibles: por producción interna (la institución, a través de una posición competente conforme a ADR-007, elabora el documento como soporte de una actuación, un acto o un informe) o por recepción externa (un interesado, otro organismo o un tercero presenta un documento que la institución incorpora formalmente a su circuito de gestión documental). En ambos casos, el nacimiento institucional del documento se produce en el momento en que queda formalmente incorporado al sistema de gestión documental de Muni Digital, con sus metadatos correspondientes, independientemente de si el contenido material que transporta fue redactado u originado en un momento ligeramente anterior.

### Qué Representa

El documento representa el soporte estable y consultable de un contenido institucional determinado: el texto de un acto, el desarrollo de un informe, la constancia de una comunicación recibida. El documento no representa, por sí mismo, ninguna decisión, ninguna autoridad ni ningún efecto jurídico: esos atributos pertenecen, según corresponda, al acto administrativo (ADR-009), a la actuación (ADR-010) o a la firma que eventualmente lo valide (ADR-011).

### Quién Puede Producirlo

Puede producir un documento institucional cualquier posición con competencia funcional sobre la materia que el documento aborda, conforme a ADR-007, sin que esto requiera necesariamente que esa posición tenga, además, la autoridad institucional plena que ADR-008 exige para la firma de actos decisorios. Un agente sin ninguna autoridad de decisión institucional puede, perfectamente, producir un documento (redactar un informe, elaborar una nota) que luego sea sometido a la validación de quien sí ostenta la autoridad correspondiente.

### Cómo se Conserva

El documento se conserva conforme a los principios de retención, archivo y conservación histórica que se desarrollan en su propia sección extensa, garantizando su disponibilidad, integridad y legibilidad durante el período que su naturaleza y valor institucional requieran.

### Cómo se Referencia

El documento se referencia mediante un identificador estable que permite su localización y consulta sin ambigüedad, complementado por sus metadatos descriptivos (tipo, fecha, autor, clasificación, vinculación con expedientes o procedimientos), de modo que pueda ser citado o invocado desde otros documentos, actos o procedimientos sin necesidad de reproducir su contenido íntegro cada vez.

### Cómo se Vincula a Procedimientos

El documento se vincula a un procedimiento (ADR-010) cuando soporta una de las actuaciones que ese procedimiento produce a lo largo de su desarrollo. Un mismo documento puede vincularse, en determinadas circunstancias, a más de un procedimiento (por ejemplo, un informe técnico general que se cita como antecedente en varios trámites distintos), sin que esa pluralidad de vinculaciones altere su identidad como documento único.

### Cómo se Vincula a Actos

El documento se vincula a un acto administrativo (ADR-009) cuando constituye su soporte material: el texto que contiene los elementos constitutivos del acto (autoridad, objeto, motivo, finalidad, forma). Un acto puede estar soportado por más de un documento (el cuerpo principal de una resolución y sus anexos técnicos), y un documento puede, en determinadas circunstancias, contener más de un acto (un acta de sesión del HCD que registra, dentro de un mismo documento, varias ordenanzas sancionadas en una misma jornada).

### Cómo se Vincula a Firmas

El documento se vincula a una firma (ADR-011) cuando esa firma se aplica sobre su contenido para validar el acto o la actuación que el documento soporta. La vinculación entre documento y firma es la que produce, en conjunto, la condición de "documento firmado" definida en las secciones anteriores.

---

## Tipos de Documentos

### Resoluciones, Decretos y Disposiciones

Estos documentos, ya analizados como tipos de acto administrativo en ADR-009, son los soportes documentales que contienen el texto de esos actos: sus considerandos, su parte resolutiva, la identificación de la autoridad que los dicta. El documento es el soporte; el decreto, la resolución o la disposición, en su dimensión institucional plena, son el acto que ese soporte contiene.

### Notas y Memorandos

Las notas y memorandos son documentos de comunicación interna o externa que no necesariamente constituyen, por sí mismos, actos administrativos: pueden transmitir información, realizar consultas, coordinar acciones entre áreas, sin producir efectos jurídicos directos, aunque puedan dar origen, dentro de un procedimiento, a actuaciones que sí los produzcan.

### Informes

Los informes son documentos que contienen el análisis técnico, contable o de cualquier otra naturaleza especializada producido por un área competente, destinados a ilustrar a la autoridad decisoria dentro de un procedimiento, conforme ya desarrolló ADR-010 para la actuación de tipo informe.

### Dictámenes

Los dictámenes, conforme a ADR-009 y ADR-010, son documentos que contienen la opinión técnica o jurídica producida por un área especializada, no vinculante salvo previsión normativa expresa.

### Actas

Las actas son documentos que registran formalmente lo ocurrido en una reunión, sesión o procedimiento determinado, conforme ya desarrolló ADR-009, pudiendo incorporar dentro de sí el registro de actos colegiados (la sanción de una ordenanza, por ejemplo).

### Certificaciones

Las certificaciones son documentos que contienen el acto administrativo de igual nombre (ADR-009), mediante el cual la autoridad competente da fe formal de un hecho o situación determinada.

### Notificaciones

Las notificaciones son documentos que instrumentan el acto de comunicar formalmente a un interesado el contenido de otro acto administrativo, conforme a ADR-009.

### Constancias

Las constancias son documentos breves que registran un hecho puntual de naturaleza administrativa, frecuentemente de menor trascendencia institucional que una certificación formal, pero igualmente útiles como soporte de verificación de una situación determinada.

### Documentación Ciudadana

La documentación ciudadana comprende los documentos externos que un ciudadano presenta ante el municipio en el marco de un trámite o reclamo: solicitudes, formularios, documentación de respaldo, adjuntos probatorios de su pretensión.

### Documentación Contractual

La documentación contractual comprende los documentos que instrumentan las relaciones contractuales del municipio con terceros: pliegos de bases y condiciones, ofertas, contratos, garantías, certificados de obra.

### Documentación de RRHH

La documentación de RRHH comprende los documentos vinculados al legajo y la gestión de personal conforme a ADR-004: solicitudes de licencia, certificados médicos, actos de designación, informes de evaluación de desempeño.

### Documentación de Compras

La documentación de compras comprende los documentos propios del procedimiento de compras conforme a ADR-010: solicitudes de cotización, ofertas de proveedores, cuadros comparativos, órdenes de compra.

### Documentación de Obras Públicas

La documentación de obras públicas comprende los proyectos técnicos, planos, certificados de avance de obra, actas de recepción y demás documentos propios del procedimiento de gestión de obras conforme a ADR-010.

### Documentación Legislativa

La documentación legislativa comprende los proyectos de ordenanza, los dictámenes de comisión, las actas de sesión del HCD y las ordenanzas sancionadas, conforme al procedimiento legislativo propio de ese órgano colegiado.

### Documentación Histórica

La documentación histórica comprende los documentos que, habiendo agotado su vigencia operativa, se conservan por su valor institucional, probatorio o patrimonial para la memoria del municipio, conforme se desarrolla en la sección de conservación documental.

---

## Documento y Procedimiento

### Qué Documentos Pueden Existir Dentro de un Procedimiento

Dentro del desarrollo de un procedimiento (ADR-010) pueden existir tantos documentos como actuaciones requieran soporte documental: la presentación inicial del interesado, los informes producidos por las áreas intervinientes, los dictámenes, la resolución que decide, la notificación que comunica esa decisión. Cada uno de estos documentos soporta una actuación específica dentro de la secuencia del procedimiento.

### Qué Documentos Pueden Existir Fuera de un Procedimiento

Pueden existir documentos institucionales que no se vinculan a ningún procedimiento determinado: documentos de referencia general (un manual de procedimientos interno, una circular de aplicación permanente), documentos de comunicación institucional sin trascendencia procedimental específica, o documentos históricos conservados por su valor patrimonial sin relación con ningún trámite activo.

### Cómo se Relacionan

La relación entre documento y procedimiento es de soporte, no de identidad: el documento sostiene materialmente una o más actuaciones del procedimiento, pero el procedimiento, como secuencia institucional, existe con independencia de la persistencia material de cada uno de sus documentos de soporte (sin perjuicio de que la pérdida de esos documentos comprometa, en la práctica, la capacidad de probar lo que el procedimiento efectivamente registró).

### Qué Ocurre Cuando un Procedimiento Genera Múltiples Documentos

Es la situación más habitual: un procedimiento de mediana o alta complejidad genera, a lo largo de su desarrollo, una cadena documental extensa (conforme a la definición ya establecida), donde cada documento individual conserva su propia identidad, sus propios metadatos y su propio estado de conservación, mientras el conjunto, ordenado cronológicamente dentro del expediente que lo contiene, permite reconstruir la totalidad del desarrollo del procedimiento.

### Qué Ocurre Cuando un Documento Participa en Múltiples Procedimientos

Un documento puede ser referenciado o utilizado como antecedente en más de un procedimiento sin que ello implique su duplicación: un informe técnico general sobre el estado de la red de agua potable puede citarse como antecedente en distintos procedimientos de reclamos vinculados a esa misma red, conservando su identidad única y siendo simplemente referenciado, no copiado, desde cada uno de esos procedimientos.

---

## Documento y Acto Administrativo

### Qué Actos Requieren Documento

La generalidad de los actos administrativos conforme a ADR-009 requiere, para su existencia comunicable y conservable, al menos un documento que contenga sus elementos constitutivos. Existen, sin embargo, ciertas actuaciones de muy baja trascendencia institucional (algunas providencias de mero trámite, en determinadas prácticas institucionales) que pueden registrarse con un nivel mínimo de soporte documental, sin que ello comprometa su validez si la normativa o la práctica institucional lo permite.

### Qué Documentos Pueden Contener Múltiples Actos

Conforme ya señaló ADR-009, un acta de sesión del HCD puede contener, dentro de un único documento, el registro de varias ordenanzas sancionadas en la misma jornada. Cada una de esas ordenanzas es un acto administrativo independiente, con sus propios elementos constitutivos, aunque todas compartan el mismo soporte documental.

### Qué Ocurre Cuando un Acto Cambia

Cuando un acto administrativo es modificado, revocado o anulado conforme a los mecanismos ya desarrollados en ADR-009, ese cambio se instrumenta mediante un nuevo acto, soportado por un nuevo documento, que hace referencia al acto y al documento original sin alterarlo. El documento original permanece inalterado como evidencia de lo que el acto decía en su momento; el cambio se registra como un evento adicional en la cadena documental.

### Qué Ocurre Cuando el Documento Cambia

Cuando es el soporte documental el que requiere actualización, corrección o reemplazo (por ejemplo, la detección de un error material en la redacción que no afecta la decisión de fondo del acto), ese cambio se instrumenta mediante el mecanismo de versionado que se desarrolla en su propia sección, sin que ello implique, necesariamente, un cambio en el acto que el documento soporta, salvo que la corrección afecte alguno de sus elementos constitutivos, en cuyo caso corresponde el régimen de modificación del acto, no el de simple versionado documental.

---

## Documento y Firma

### Documento Firmado

El documento firmado es aquel sobre el cual se ha aplicado, conforme a ADR-011, la validación formal de la autoridad competente, produciendo evidencia de autoría, integridad y no repudio sobre su contenido.

### Documento sin Firma

El documento sin firma es válido y existe plenamente como soporte de información, pero, cuando el contenido que transporta requiere validación institucional conforme a ADR-011 (por ejemplo, porque soporta a un acto administrativo), permanece en un estado de validación pendiente hasta que la firma correspondiente se produzca.

### Documento con Múltiples Firmas

Un documento puede requerir, conforme a su naturaleza, la validación de más de una autoridad: una resolución que requiere la firma del Secretario que la dicta y, adicionalmente, el refrendo de otra autoridad cuya intervención es requerida por la normativa aplicable.

### Firma Secuencial

La firma secuencial es aquella en la que las distintas validaciones requeridas sobre un mismo documento deben producirse en un orden determinado, donde la firma de una autoridad es condición previa para que el documento pueda someterse a la firma de la siguiente.

### Firma Colegiada

Conforme a ADR-011, la firma colegiada es la formalización de una decisión cuya voluntad institucional se formó mediante deliberación y voto de un órgano colectivo, instrumentada habitualmente mediante la firma de quien preside ese órgano junto con quien ejerce su secretaría, sobre el documento (típicamente, un acta) que registra el resultado de esa deliberación.

### Contrafirma

La contrafirma es la validación adicional que una segunda autoridad produce sobre un documento ya firmado por la autoridad principal, frecuentemente con el propósito de certificar la regularidad formal del acto o de comprometer la responsabilidad conjunta de dos posiciones distintas sobre el mismo contenido.

### Refrendo

El refrendo es una forma específica de contrafirma, habitual en el derecho administrativo, mediante la cual una autoridad de menor jerarquía avala formalmente, con su propia firma, un acto dictado por una autoridad superior, asumiendo con ello una responsabilidad institucional compartida sobre su regularidad.

### Validación Parcial

La validación parcial es aquella que recae solamente sobre una porción del contenido de un documento extenso (por ejemplo, la aprobación de uno de varios anexos técnicos, mientras los demás continúan en revisión), sin que el documento en su conjunto alcance todavía el estado de plenamente validado.

### Validación Total

La validación total es aquella que recae sobre la totalidad del contenido de un documento, habilitándolo a producir, cuando corresponda, los plenos efectos del acto que soporta.

---

## Versionado

### Versión Inicial

La versión inicial es la primera formulación registrada del contenido de un documento, sin que haya atravesado todavía ningún ciclo de revisión o ajuste.

### Borrador

El documento está en estado de borrador cuando su contenido es modificable libremente por quien lo está elaborando, sin que haya sido sometido a ningún circuito formal de elaboración o revisión, en correspondencia directa con el estado homólogo ya definido para el acto administrativo en ADR-009.

### En Revisión

El documento está en revisión cuando su contenido elaborado es sometido a control previo por instancias técnicas, legales o jerárquicas antes de avanzar hacia su validación, en correspondencia con el estado homólogo de ADR-009.

### Aprobado

El documento está aprobado cuando ha superado las instancias de revisión que correspondan y su contenido ha sido conformado como apto para ser sometido a la validación final mediante firma, sin que ello implique todavía que esa firma se haya producido.

### Firmado

El documento está firmado cuando ha recibido la validación formal conforme a ADR-011, correspondiente al estado homólogo "firmado" ya definido para el acto en ADR-009.

### Vigente

El documento está vigente cuando, habiendo sido firmado y cumplidos los requisitos de publicidad o notificación que correspondan al acto que soporta, ese acto produce plenamente sus efectos, correspondiendo el documento, en consecuencia, al soporte activo y de referencia operativa del acto vigente.

### Histórico

El documento está en estado histórico cuando, sin haber perdido su valor probatorio, ha dejado de ser el soporte de referencia operativa activa, conforme a los principios de conservación que se desarrollan en su propia sección.

### Anulado

El documento queda en estado de anulado cuando el acto que soporta ha sido anulado conforme a ADR-009, conservándose el documento como evidencia histórica de un acto que ya no produce efectos válidos desde su origen.

### Reemplazado

El documento está reemplazado cuando una nueva versión, formalmente validada, lo sustituye como soporte vigente de referencia, conservándose el documento reemplazado en el historial documental como antecedente, sin que se elimine su registro.

### Archivado

El documento está archivado cuando, conforme a los principios de conservación de esta sección y de ADR-005, pasa al régimen de conservación que corresponda a su valor institucional o histórico, fuera del circuito de gestión operativa activa.

### Cómo se Relaciona con ADR-009

Los estados del documento desarrollados en esta sección guardan una correspondencia estructural directa con los estados del acto administrativo ya definidos en ADR-009 (borrador, en elaboración, en revisión, pendiente de firma, firmado, vigente, suspendido, revocado, anulado, archivado), en la medida en que el documento es, frecuentemente, el soporte material de un acto. Sin embargo, esta correspondencia no es una identidad: un documento puede recorrer sus propios estados de versionado (por ejemplo, sucesivas correcciones menores de redacción durante la etapa de revisión) sin que cada una de esas versiones intermedias constituya un cambio de estado en el acto que, conceptualmente, todavía no ha sido formalmente decidido.

### Cómo se Relaciona con ADR-011

El paso del documento del estado "aprobado" al estado "firmado" es, precisamente, el evento que ADR-011 desarrolla en profundidad como la aplicación de la firma: la validación formal mediante la cual la autoridad competente, en el carácter de ejercicio que corresponda, valida el contenido del documento aprobado, produciendo la evidencia de autoría, integridad y no repudio que ese modelo exige.

---

## Documento y Expediente

### Un Expediente Puede Contener Múltiples Documentos

Conforme ya ha quedado establecido extensamente en ADR-009 y ADR-010, el expediente, como contenedor institucional, agrupa de forma cronológica todos los documentos producidos a lo largo de la tramitación de uno o más procedimientos relacionados.

### Un Documento Puede Estar Referenciado desde Múltiples Expedientes

Un documento de carácter general o de referencia (un informe técnico amplio, un dictamen sobre una cuestión de interpretación normativa de alcance general) puede ser citado o referenciado desde más de un expediente, sin que ello implique su duplicación física ni la pérdida de su identidad como documento único, conforme ya se desarrolló en la sección de Documento y Procedimiento.

### Documento Principal

El documento principal es aquel que contiene el contenido sustantivo central de una actuación o de un acto dentro del expediente: el texto de la resolución, el cuerpo del informe.

### Documento Adjunto

El documento adjunto es aquel que se incorpora al expediente como respaldo o complemento de una presentación o actuación, sin constituir, por sí mismo, el contenido sustantivo principal de esa actuación: el comprobante que el ciudadano adjunta a su solicitud.

### Documento Referenciado

El documento referenciado es aquel que, sin estar materialmente incorporado al expediente, es mencionado o citado por otro documento dentro de él, conforme a la definición ya establecida de "referencia" en las definiciones fundamentales.

### Cadena Documental dentro del Expediente

La cadena documental dentro de un expediente es la secuencia ordenada de todos sus documentos (principales, adjuntos y referenciados), que en su conjunto permite reconstruir la totalidad de la historia documental de los procedimientos que el expediente contiene.

---

## Conservación Documental

### Retención

La retención, ya definida, es el período mínimo durante el cual un documento debe conservarse antes de que pueda considerarse su eventual eliminación o cambio de régimen de conservación, conforme a su naturaleza y al marco normativo aplicable. Este modelo no fija plazos de retención específicos, que dependen de la normativa municipal, provincial y nacional aplicable a cada tipo de documento; establece el principio de que toda implementación futura debe definir esos plazos conforme a esa normativa.

### Archivo Activo

El archivo activo es el régimen de conservación correspondiente a los documentos que todavía forman parte de la gestión operativa cotidiana de la institución, con alta frecuencia de consulta y necesidad de acceso inmediato.

### Archivo Intermedio

El archivo intermedio es el régimen de conservación correspondiente a los documentos que han dejado de requerir consulta operativa frecuente, pero que todavía no han alcanzado el período de retención que permitiría evaluar su destino final (eliminación, transferencia o conservación permanente). El archivo intermedio cumple una función de transición entre la gestión activa y el destino final del documento.

### Archivo Histórico

El archivo histórico es el régimen de conservación correspondiente a los documentos que, por su valor institucional, probatorio o patrimonial, deben conservarse indefinidamente, independientemente de que ya no tengan ninguna utilidad operativa para la gestión cotidiana.

### Eliminación

La eliminación es la destrucción definitiva de un documento, que solo puede producirse conforme a un proceso institucional formal, una vez agotado su período de retención obligatoria, y nunca sobre documentos cuyo valor probatorio, legal o histórico exija su conservación permanente. La eliminación, cuando se produce, debe en sí misma quedar registrada como evento de auditoría obligatoria conforme a ADR-005 (no el contenido eliminado, sino el hecho institucional de la eliminación, su fecha, su autorización y su fundamento).

### Transferencia

La transferencia es el traslado de un documento entre regímenes de conservación (del archivo activo al intermedio, del intermedio al histórico) o, en determinadas circunstancias institucionales, entre instituciones (por ejemplo, ante una reorganización que traslada competencias de un área a otra, o de una institución a otra conforme a ADR-001).

### Conservación Permanente

La conservación permanente es el régimen aplicable a los documentos que, por su naturaleza (actos administrativos de trascendencia institucional, documentación legislativa, documentación que respalda derechos de personas), nunca deben eliminarse, conforme a los principios de conservación histórica ya establecidos en ADR-005.

---

## Evidencia Documental

### Autoría

La autoría, en el plano documental, es la atribución cierta de un documento a la posición o a la persona que lo produjo o lo presentó, conforme a los principios ya desarrollados en ADR-006 (identidad) y ADR-011 (firma) para la atribución de la autoría de actos y firmas.

### Integridad

La integridad documental es la garantía de que el contenido de un documento no ha sido alterado desde el momento de su incorporación formal al circuito institucional o, cuando corresponda, desde el momento de su validación mediante firma conforme a ADR-011.

### Trazabilidad

La trazabilidad documental, ya definida extensamente en las definiciones fundamentales, es la capacidad de reconstruir el recorrido completo de un documento desde su origen hasta su estado de conservación actual.

### No Repudio

El no repudio documental es la imposibilidad de que quien produjo o presentó un documento niegue haberlo hecho, en virtud de la solidez conjunta de la autoría y la integridad, en línea directa con los principios ya establecidos en ADR-005 y ADR-011.

### Cadena de Custodia

La cadena de custodia es el registro ininterrumpido de quién tuvo acceso, control o responsabilidad sobre un documento determinado a lo largo de su ciclo de vida, particularmente relevante para documentos cuyo valor probatorio pueda ser cuestionado en un proceso administrativo o judicial. La cadena de custodia documental es, en este modelo, una extensión específica de la trazabilidad general ya exigida por ADR-005.

### Relación con ADR-005

Todos los elementos de evidencia documental desarrollados en esta sección son una aplicación específica, en el dominio del documento, de los principios generales de trazabilidad, integridad, no repudio y responsabilidad institucional ya establecidos con carácter transversal en ADR-005 para toda la auditoría institucional de Muni Digital.

---

## Estados del Documento

### Borrador

El documento en estado de borrador contiene una primera formulación de su contenido, libremente modificable, sin haber sido sometido a ningún circuito formal de elaboración. No produce ningún efecto institucional y no requiere ningún nivel de control de acceso distinto del que corresponda a su autor y a quienes colaboren directamente en su redacción.

### En Elaboración

El documento está en elaboración cuando su contenido está siendo desarrollado de forma más sistemática, incorporando los antecedentes y la estructura que su tipo documental requiere, sin que todavía se haya sometido a ninguna instancia de control externo a su propia área de origen.

### En Revisión

El documento está en revisión cuando su contenido elaborado es sometido a control técnico, legal o jerárquico previo a su aprobación final, pudiendo generar observaciones que requieran su corrección antes de avanzar.

### Pendiente de Validación

El documento está pendiente de validación cuando ha completado su elaboración y revisión, y se encuentra a la espera de que la autoridad competente, conforme a ADR-008 y ADR-011, produzca la firma o validación formal correspondiente.

### Validado

El documento está validado cuando ha recibido la validación formal correspondiente conforme a ADR-011, sin que esto se confunda necesariamente con el estado de "firmado" en el sentido más estricto: ciertas validaciones documentales pueden producirse mediante mecanismos de validación distintos de la firma individual, conforme a los tipos de validación desarrollados en ADR-011 (validación automática, validación colegiada).

### Firmado

El documento está firmado cuando ha recibido específicamente la validación mediante firma institucional conforme a ADR-011, con la atribución de autoría, autoridad y carácter de ejercicio que ese modelo exige.

### Vigente

El documento está vigente cuando constituye el soporte activo y de referencia operativa de un acto o contenido institucional que produce plenos efectos, conforme al estado homólogo del acto en ADR-009.

### Anulado

El documento está anulado cuando el acto o contenido que soporta ha sido anulado conforme a los mecanismos correspondientes (ADR-009), conservándose como evidencia histórica de un acto que dejó de ser válido desde su origen.

### Archivado

El documento está archivado cuando, conforme a los principios de conservación de esta sección, pasa a un régimen de conservación fuera de la gestión operativa activa, sin que ello afecte su disponibilidad para consulta cuando corresponda.

### Histórico

El documento está en estado histórico cuando, además de archivado, ha alcanzado una condición de conservación permanente por su valor institucional, probatorio o patrimonial, conforme a los principios ya desarrollados.

---

## Riesgos

### CRÍTICO

**Confundir el documento con el acto administrativo que soporta.** Si el sistema trata al documento y al acto como si fueran lo mismo, pierde la capacidad de representar correctamente los estados previos a la firma (un acto cuya decisión ya fue formada pero cuyo documento todavía está en revisión), y corre el riesgo de invalidar actos válidos por meros defectos de redacción de su soporte documental, o de validar como actos contenidos documentales que nunca alcanzaron los elementos constitutivos exigidos por ADR-009.

**Confundir el documento con el expediente que lo contiene.** Si el sistema no distingue con claridad que el expediente es un contenedor de múltiples documentos y no un documento único, pierde la capacidad de representar correctamente expedientes extensos con decenas o cientos de documentos individuales, cada uno con su propio estado y su propia trazabilidad.

**Confundir el documento con el archivo o régimen de conservación.** Si "archivar un documento" y "el archivo" como repositorio se tratan como el mismo concepto sin distinción, se pierde la capacidad de gestionar adecuadamente las políticas de retención, transferencia y conservación permanente que requieren tratar al archivo como un régimen aplicable a múltiples documentos, no como sinónimo de cada documento individual.

**Confundir el documento con la firma que lo valida.** Si se asume que la existencia de una firma sobre un documento es equivalente a la existencia del acto que ese documento soporta, se reproduce exactamente el riesgo crítico ya identificado en ADR-009 y ADR-011: la firma valida, no crea, y el documento es apenas el soporte sobre el cual esa validación se aplica.

**Versionado que sobreescribe el contenido sin conservar el historial.** Si el sistema permite que una nueva versión de un documento reemplace físicamente a la anterior sin conservar un registro inmutable de la versión previa, se vulnera el principio de inmutabilidad histórica ya establecido en ADR-005 y se pierde la posibilidad de reconstruir qué decía el documento en cada momento de su evolución.

**Eliminación de documentos sujetos a conservación permanente.** Si el sistema permite eliminar documentos que, por su naturaleza (actos de trascendencia institucional, documentación que respalda derechos de personas), deben conservarse indefinidamente conforme a ADR-005, se destruye evidencia institucional que puede ser indispensable para la defensa del municipio en procesos posteriores.

**Pérdida de trazabilidad entre el documento y la actuación o acto que soporta.** Si un documento no conserva el vínculo explícito con la actuación (ADR-010) o el acto (ADR-009) que soporta, se pierde la posibilidad de reconstruir, a partir del documento, el contexto institucional completo en el que fue producido.

**Duplicación documental no controlada.** Si el sistema permite la creación de múltiples copias de un mismo documento sin un mecanismo claro de identificación de cuál es el original o el de referencia vigente, se generan inconsistencias sobre cuál es la versión válida a efectos institucionales, con el consiguiente riesgo de que se actúe sobre una versión obsoleta o incorrecta.

**Falta de distinción entre documento digitalizado y documento digital nativo en su valor probatorio.** Si el sistema no distingue estas dos categorías, puede otorgarse a una digitalización el mismo valor probatorio que a un documento nativamente digital, sin haber acreditado adecuadamente la fidelidad de esa digitalización respecto del original físico que representa.

**Documento alterado después de su validación sin invalidar la validación.** Si el contenido de un documento ya validado o firmado puede modificarse posteriormente sin que ello invalide automáticamente esa validación o genere un nuevo ciclo, se rompe el elemento de integridad que es condición esencial de toda evidencia documental, replicando el riesgo crítico ya identificado en ADR-011.

### ALTO

**Falta de metadatos suficientes para la trazabilidad documental.** Si el documento no conserva metadatos completos sobre su origen, su autor, su fecha y su vinculación institucional, la trazabilidad documental se ve comprometida incluso cuando el contenido del documento en sí mismo permanece íntegro.

**Documentos adjuntos sin vínculo claro con el documento principal que complementan.** Si la relación entre un documento principal y sus adjuntos no queda explícitamente registrada, se dificulta la reconstrucción del conjunto completo de la documentación de respaldo de una actuación.

**Referencias documentales rotas o sin verificación de vigencia.** Si un documento referencia a otro documento que posteriormente fue reemplazado, anulado o archivado, sin que el sistema advierta esa situación, quien consulta la referencia puede acceder a información obsoleta sin saberlo.

**Validación parcial confundida con validación total.** Si el sistema no distingue con claridad cuándo una validación recae solo sobre una porción del documento (por ejemplo, uno de varios anexos) y cuándo recae sobre su totalidad, se puede asumir erróneamente que un documento está completamente validado cuando en realidad solo lo está parcialmente.

**Falta de registro de la cadena de custodia en documentos de alta sensibilidad.** Si no se registra quién tuvo acceso, control o responsabilidad sobre un documento sensible a lo largo de su ciclo de vida, su valor probatorio queda debilitado ante un eventual cuestionamiento.

**Documentos históricos sin garantía de legibilidad a largo plazo.** Si la conservación histórica no contempla la necesidad de preservar la legibilidad del documento más allá de la vigencia de un formato o tecnología específica, el documento puede sobrevivir formalmente pero volverse inaccesible en la práctica con el paso del tiempo.

**Transferencia de documentos entre instituciones sin preservar su trazabilidad de origen.** Si, ante una reorganización que traslada competencias entre instituciones (ADR-001), los documentos transferidos pierden la referencia a su institución de origen, se debilita la reconstrucción histórica completa de su trayectoria institucional.

**Eliminación de documentos sin registro de auditoría del evento.** Si la eliminación de un documento, una vez agotado su período de retención y verificado que no está sujeto a conservación permanente, no genera en sí misma un registro de auditoría obligatoria, se pierde la posibilidad de verificar posteriormente que esa eliminación fue institucionalmente correcta.

**Falta de un criterio uniforme sobre qué tipo de documento requiere qué nivel de validación.** Si distintas áreas aplican criterios heterogéneos sobre cuándo un documento requiere firma formal y cuándo basta con su sola incorporación al circuito documental, se introduce inconsistencia institucional, replicando en el plano documental el riesgo ya identificado en ADR-011 respecto de las actuaciones.

**Documentos externos incorporados sin verificación de su autenticidad de origen.** Si la institución incorpora documentos externos (presentaciones de ciudadanos, comunicaciones de terceros) sin un mínimo proceso de verificación de su autenticidad, se debilita el valor probatorio de toda la cadena documental que de ellos derive.

### MEDIO

**Nomenclatura inconsistente entre tipos de documentos en distintas áreas.** Si distintas áreas usan criterios heterogéneos para clasificar tipos de documentos similares, se dificulta la búsqueda y el reporte consolidado.

**Falta de plantillas estandarizadas para los tipos de documentos más frecuentes.** La ausencia de una estructura formal mínima esperable para cada tipo documental puede producir documentos con formato inconsistente entre distintas áreas que producen contenidos similares.

**Ausencia de un criterio claro sobre cuándo un documento debe considerarse principal y cuándo adjunto.** Sin este criterio, distintas áreas pueden organizar de forma heterogénea la documentación de respaldo de actuaciones similares.

**Falta de alertas ante documentos próximos al vencimiento de su período de retención.** Sin estas alertas, la institución pierde la oportunidad de evaluar activamente, en el momento oportuno, el destino de documentos cuyo período de retención obligatoria está próximo a cumplirse.

**Versionado sin indicación clara de cuál es la versión vigente para consulta operativa.** Si, ante la existencia de múltiples versiones históricas de un documento, no queda claramente señalada cuál es la vigente, el personal operativo puede consultar inadvertidamente una versión obsoleta.

**Documentos de referencia general sin clasificación que facilite su reutilización.** Si los documentos que son citados frecuentemente como antecedentes en múltiples procedimientos no están adecuadamente clasificados y son de fácil localización, se incrementa el riesgo de que distintas áreas redacten informes redundantes sobre la misma materia.

**Falta de un proceso de revisión periódica del archivo intermedio.** Sin este proceso, los documentos pueden permanecer indefinidamente en el régimen de archivo intermedio sin que se evalúe activamente su paso al archivo histórico o su eventual eliminación conforme a la política de retención.

**Documentación contractual sin vínculo explícito con el procedimiento de contratación que la originó.** Si los documentos contractuales no conservan la referencia al procedimiento (ADR-010) del cual derivan, se dificulta la reconstrucción del contexto completo de la relación contractual.

**Falta de diferenciación visual o de metadatos entre documento digital nativo y documento digitalizado.** Sin esta diferenciación accesible, quien consulta el documento puede no advertir que se trata de una representación de un original físico, con las implicancias de valor probatorio que ello conlleva.

**Ausencia de indicadores de gestión sobre volumen y antigüedad de documentos por tipo o área.** Sin esta información agregada, la institución pierde la posibilidad de planificar adecuadamente sus políticas de conservación y archivo a futuro.

### BAJO

**Diferencias de estilo de redacción entre documentos de distintas áreas.** No constituye un riesgo institucional de validez, aunque dificulta la lectura comparada de la producción documental del municipio.

**Falta de numeración correlativa unificada de documentos entre instituciones.** Si la Municipalidad, el HCD y el Hospital numeran sus documentos de forma independiente sin un criterio que permita identificarlos sin ambigüedad en un contexto multi-institucional, la referencia cruzada puede resultar más trabajosa, sin afectar la validez de cada documento dentro de su propia institución.

**Ausencia de resumen ejecutivo adjunto a documentos extensos.** No afecta la validez del documento, pero puede dificultar su comprensión rápida por parte de quienes deben consultarlo operativamente.

**Variabilidad en la terminología utilizada para describir tipos de adjuntos similares.** Diferencias menores de nomenclatura no comprometen la validez del documento si su contenido sustantivo está adecuadamente identificado.

**Falta de un glosario institucional de tipos documentales accesible al personal.** Dificulta la capacitación de nuevo personal en la distinción entre los distintos tipos de documentos, sin constituir un riesgo de validez institucional inmediato.

---

## Principios del Modelo

### Legalidad

Todo documento institucional debe producirse, conservarse y eliminarse conforme al marco normativo aplicable a su naturaleza y a los plazos de retención que esa normativa establezca.

### Trazabilidad

Todo documento debe poder reconstruirse en su origen, sus versiones sucesivas, sus vinculaciones con actos, procedimientos y expedientes, y su estado actual de conservación.

### Integridad

El contenido de un documento validado o firmado no puede alterarse sin que ello invalide la validación previa y genere un nuevo ciclo de versionado y validación.

### No Repudio

Quien produjo o presentó un documento institucional, válidamente atribuido conforme a ADR-006 y ADR-011, no puede negar haberlo hecho.

### Conservación

Todo documento debe conservarse durante el período que su naturaleza, su valor probatorio y el marco normativo aplicable exijan, conforme a los regímenes de archivo activo, intermedio, histórico y conservación permanente desarrollados en este documento.

### Accesibilidad

Todo documento debe permanecer disponible y legible para quienes tengan legitimidad institucional para consultarlo, durante todo el período de su conservación, independientemente de los cambios tecnológicos que puedan producirse en el soporte específico empleado.

### Continuidad

La gestión documental no debe interrumpirse por cambios en la estructura organizacional, en el personal de la institución o en la tecnología empleada para su soporte, conforme a los principios de continuidad institucional ya establecidos en ADR-007 y ADR-008.

### Separación Documento-Acto

El documento es el soporte material; el acto administrativo (ADR-009) es la manifestación de voluntad institucional que ese soporte puede contener. Esta separación es absoluta y no admite excepciones de diseño que las colapsen en un único objeto.

### Separación Documento-Procedimiento

El documento es la unidad de soporte material de una o más actuaciones; el procedimiento (ADR-010) es la secuencia institucional completa que esas actuaciones componen. Un documento no es, por sí solo, equivalente al procedimiento que documenta.

### Separación Documento-Expediente

El documento es la unidad individual de contenido; el expediente (ADR-009, ADR-010) es el contenedor que agrupa cronológicamente múltiples documentos relacionados con uno o más procedimientos.

### Inmutabilidad Histórica

El historial de versiones, validaciones y estados de conservación de un documento, una vez registrado, no puede modificarse ni eliminarse. Toda corrección posterior se expresa mediante un nuevo evento que se suma al historial, nunca mediante la alteración del registro original.

---

## Relación con los ADR Anteriores

### Relación con ADR-001 — Organizational Context Model

Todo documento institucional pertenece a una institución determinada (Municipalidad, HCD, Hospital, instituciones futuras), conforme al aislamiento organizacional ya establecido en ADR-001. La gestión documental de cada institución es independiente, salvo los casos de referencia o transferencia interinstitucional explícitamente previstos.

### Relación con ADR-005 — Audit Model

Todos los principios de evidencia documental desarrollados en este documento (autoría, integridad, trazabilidad, no repudio, cadena de custodia) son una aplicación específica, en el dominio del documento, de los principios generales de auditoría institucional ya establecidos con carácter transversal en ADR-005. Todo evento relevante del ciclo de vida documental (creación, versionado, validación, archivo, eliminación) constituye auditoría obligatoria conforme a ese modelo.

### Relación con ADR-006 — Person & Identity Model

La autoría de un documento, cuando corresponde a una persona física, se atribuye conforme a la identidad única definida en ADR-006, garantizando que la misma persona no pueda tener múltiples identidades que fragmenten la trazabilidad de los documentos que produjo a lo largo del tiempo.

### Relación con ADR-007 — Organizational Position Model

La competencia para producir un documento institucional determinado deriva de la posición organizacional que ADR-007 define, no de la persona que en cada momento la ocupa. Un documento producido por la posición de Director de Obras Públicas conserva su valor institucional independientemente de quién ocupe esa posición en el momento de su consulta posterior.

### Relación con ADR-008 — Organizational Authority & Delegation Model

La validación de un documento que soporta un acto administrativo requiere que quien la produce ejerza válidamente la autoridad de la posición competente, en cualquiera de los cinco caracteres definidos en ADR-008 (titular, delegado, suplente, interino, sucesor), carácter que debe quedar expresamente registrado en el documento o en la firma que lo valida.

### Relación con ADR-009 — Administrative Act & Resolution Model

El documento es el soporte material del acto administrativo que ADR-009 define. La independencia entre acto y documento, ya establecida extensamente en ese modelo, es el fundamento directo de todo este documento, que la desarrolla con la profundidad adicional que el dominio documental requiere.

### Relación con ADR-010 — Administrative Procedure & Case Lifecycle Model

El documento es, frecuentemente, el soporte material de las actuaciones que componen un procedimiento conforme a ADR-010. La independencia entre documento y procedimiento, así como entre documento y expediente, desarrollada extensamente en este documento, es coherente con la independencia ya establecida entre procedimiento y expediente en ese modelo.

### Relación con ADR-011 — Digital Signature & Institutional Validation Model

La firma, conforme a ADR-011, es el evento que se aplica sobre el documento para validar formalmente el acto o la actuación que soporta. Este documento desarrolla, en el plano específico del soporte documental, los estados de versionado (borrador, en elaboración, en revisión, pendiente de validación, validado, firmado) que anteceden y siguen a ese evento de validación, en correspondencia directa con los principios ya establecidos en ese modelo.

---

## Document & Institutional Record Model v1 Recomendado

El modelo conceptual de documento y registro institucional de Muni Digital se define de la siguiente manera:

### Qué es un Documento

El documento es el soporte institucional, material o digital, que registra información de forma estable y consultable. Transporta contenido; no produce, por sí mismo, ningún efecto jurídico o administrativo.

### Qué no es un Documento

El documento no es el acto administrativo que puede contener (ADR-009), no es el procedimiento que puede soportar (ADR-010), no es el expediente que lo contiene junto a otros documentos relacionados, no es el archivo o régimen de conservación al que eventualmente se somete, y no es la firma que eventualmente lo valida (ADR-011).

### Cómo se Relaciona con Actos

El documento es el soporte material de los elementos constitutivos del acto administrativo. Un acto puede estar soportado por uno o varios documentos; un documento puede, en determinadas circunstancias, soportar más de un acto.

### Cómo se Relaciona con Procedimientos

El documento soporta una o más actuaciones dentro del desarrollo de un procedimiento. Un procedimiento extenso genera, habitualmente, una cadena documental compuesta por numerosos documentos individuales, cada uno con su propia identidad y trazabilidad.

### Cómo se Relaciona con Expedientes

El expediente es el contenedor que agrupa cronológicamente los documentos producidos en la tramitación de uno o más procedimientos relacionados. Un documento puede, además, ser referenciado desde más de un expediente sin perder su identidad única.

### Cómo se Relaciona con Firmas

La firma, conforme a ADR-011, es el evento de validación que se aplica sobre el documento, produciendo el paso del estado "pendiente de validación" al estado "firmado", y habilitando, cuando corresponda, al acto que el documento soporta a producir sus plenos efectos.

### Cómo se Conserva

El documento se conserva conforme a los regímenes de archivo activo, intermedio e histórico, y eventualmente de conservación permanente, según su naturaleza, su valor probatorio y el marco normativo aplicable, garantizando en todo momento su integridad, su trazabilidad y su accesibilidad para quienes tengan legitimidad institucional para consultarlo.

---

## Roadmap Conceptual

### P0 — Aprobación conceptual

**Objetivo:** Validar y aprobar este documento como fuente de verdad conceptual para la gestión documental de Muni Digital.

Dependencias: ADR-001 a ADR-011 aprobados. Este documento revisado por el equipo de arquitectura, los referentes de gestión documental y archivo municipal (dado que los plazos de retención y los regímenes de conservación dependen del marco normativo de archivo aplicable), y los referentes operativos de Mesa de Entradas y las áreas que producen mayor volumen documental (RRHH, Compras, Obras Públicas).

Criterio de cierre: El equipo puede responder sin ambigüedad qué es un documento, en qué se diferencia de un acto, un procedimiento, un expediente, un archivo y una firma, qué estados recorre en su versionado, y qué garantías de evidencia documental debe sostener a lo largo del tiempo.

Riesgo: CRÍTICO si los módulos de Mesa de Entradas, Expedientes Electrónicos o Archivo Digital inician su diseño técnico sin este modelo aprobado. La ausencia de este modelo obliga a esos módulos a decidir ad hoc qué es un "documento" en el sistema, reproduciendo las confusiones identificadas en el Resumen Ejecutivo de este documento.

---

### P1 — Diseño técnico

**Objetivo:** Traducir el modelo conceptual en decisiones de diseño técnico: cómo se representa el documento como objeto independiente del acto, el procedimiento y el expediente, cómo se modela su versionado, cómo se vincula con la firma de ADR-011, y cómo se representan los distintos regímenes de conservación.

Dependencias: P0 cerrado. ADR-009, ADR-010 y ADR-011 implementados en su diseño técnico (modelos de acto, procedimiento y firma disponibles para anclar las relaciones del documento). ADR-005 implementado en su diseño técnico (capa de auditoría disponible para registrar los eventos del ciclo de vida documental).

Criterio de cierre: El diseño técnico mantiene la independencia conceptual entre documento, acto, procedimiento y expediente. El diseño representa los estados de versionado definidos en este documento de forma distinguible de los estados del acto que el documento eventualmente soporte. El diseño admite que un documento sea referenciado desde múltiples expedientes o procedimientos sin duplicación. El diseño contempla los regímenes de archivo activo, intermedio, histórico y conservación permanente.

Riesgo: ALTO. Es el momento donde la presión de simplicidad técnica puede llevar a modelar el documento como un simple archivo adjunto sin estados propios ni trazabilidad de versionado, o a asumir una correspondencia rígida de uno a uno entre documento y acto que contradiga la independencia ya establecida en ADR-009.

Archivos conceptuales que debe cubrir el diseño: modelo de documento con sus metadatos y estados de versionado, modelo de vinculación flexible entre documento y acto (de cardinalidad no necesariamente uno a uno), modelo de vinculación entre documento y procedimiento o expediente, modelo de regímenes de conservación con sus criterios de transición, integración con la capa de firma de ADR-011, integración con la capa de auditoría de ADR-005.

---

### P2 — Implementación del núcleo de gestión documental

**Objetivo:** El sistema puede crear documentos en estado de borrador, llevarlos a través de su ciclo de elaboración, revisión y validación, vincularlos con los actos, procedimientos y expedientes correspondientes, y registrar su paso entre los distintos regímenes de conservación sin pérdida de trazabilidad.

Dependencias: P1 cerrado.

Criterio de cierre: Es posible crear un documento sin que esté obligatoriamente vinculado a un único acto o procedimiento determinado en el momento de su creación. Es posible que un documento sea referenciado desde múltiples expedientes sin duplicarse. El versionado de un documento conserva el historial completo de sus versiones anteriores de forma inmutable. La validación de un documento mediante firma queda registrada conforme al modelo de ADR-011. La auditoría obligatoria de cada evento del ciclo de vida documental está activa.

Rollback: Si P2 permite que una nueva versión de un documento sobreescriba a la anterior sin conservar su historial, o si el sistema no puede distinguir entre documento, acto y expediente, revertir el módulo afectado hasta corregir. Un sistema de gestión documental que no garantiza la inmutabilidad del historial no debe liberarse a producción, dado el valor probatorio que estos registros representan para el municipio.

---

### P3 — Integración con Mesa de Entradas, Expedientes, Archivo Digital y Firma Digital

**Objetivo:** El módulo de Mesa de Entradas incorpora la recepción formal de documentos externos conforme al modelo de este documento. El módulo de Expedientes organiza cronológicamente los documentos vinculados a sus procedimientos. El módulo de Archivo Digital gestiona la transición entre los regímenes de conservación activa, intermedia, histórica y permanente. El módulo de Firma Digital, cuando se diseñe e incorpore una solución tecnológica concreta, opera sobre los documentos conforme al modelo de validación de ADR-011.

Dependencias: P2 cerrado. ADR-009, ADR-010 y ADR-011 implementados. ADR-005 implementado.

Criterio de cierre: Un documento externo presentado por un ciudadano puede recibirse formalmente en Mesa de Entradas, incorporarse a un expediente existente o a uno nuevo, y vincularse al procedimiento correspondiente sin pérdida de trazabilidad de su origen. Un expediente extenso puede mostrar la totalidad de su cadena documental organizada cronológicamente, distinguiendo documentos principales, adjuntos y referenciados. Un documento puede transitar correctamente entre los regímenes de archivo activo, intermedio e histórico, conforme a la política de retención aplicable, sin pérdida de su trazabilidad ni de su vínculo con los actos y procedimientos que documenta.

---

> Este documento define el modelo conceptual de documento y registro institucional de Muni Digital v1.
>
> No debe modificarse sin revisión del equipo de arquitectura, los referentes de gestión documental y archivo, y aprobación formal.
>
> Extiende ADR-001, ADR-005, ADR-006, ADR-007, ADR-008, ADR-009, ADR-010 y ADR-011 sin contradecirlos.
>
> Es la fuente de verdad conceptual para Mesa de Entradas, Expedientes Electrónicos, Archivo Digital, Firma Digital, Actos Administrativos, Procedimientos, Notificaciones y Gestión Documental.
>
> Próximo documento recomendado:
>
> ADR-013 — Notification & Public Communication Model v1.