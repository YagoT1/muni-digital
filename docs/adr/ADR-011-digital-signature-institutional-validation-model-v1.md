# ADR-011 — Digital Signature & Institutional Validation Model v1 — Muni Digital

> Documento conceptual del modelo de firma y validación institucional.
> Basado en: PDA.md · ADR-001 · ADR-002 · ADR-003 · ADR-004 · ADR-005 · ADR-006 · ADR-007 · ADR-008 · ADR-009 · ADR-010
> Estado: Propuesta para revisión y aprobación.
> Restricción: Este documento NO define tablas, entidades técnicas, código, APIs, JWT, OAuth, certificados concretos, proveedores de firma digital, bases de datos, frameworks, infraestructura ni implementación.
> Este documento es la fuente de verdad conceptual para la futura Firma Digital de Muni Digital.

---

## Resumen Ejecutivo

ADR-009 estableció qué es un acto administrativo y estableció, como una de sus distinciones centrales, que la firma valida el acto pero no lo crea. ADR-010 estableció qué es un procedimiento administrativo y cómo se compone de actuaciones sucesivas y paralelas, algunas de las cuales requieren validación formal y otras no. Ambos documentos, sin embargo, dejaron deliberadamente sin desarrollar en profundidad una pregunta que ahora se vuelve impostergable: ¿qué es exactamente la firma? ¿Qué significa, en términos institucionales, que algo quede "validado"? ¿Cómo se preserva, en el tiempo, la certeza de que una autoridad efectivamente avaló una decisión, incluso después de que esa autoridad deje de existir en la forma en que existía al momento de firmar?

Este vacío conceptual es el que ADR-011 debe cerrar. Es, en cierto sentido, el ADR más delicado de la serie, porque toca un objeto (la firma) que el lenguaje cotidiano y la tecnología disponible en el mercado tienden a presentar de la forma más simplificada posible: un certificado, una clave criptográfica, un clic. Esa simplificación tecnológica es legítima en su propio plano, pero es completamente insuficiente como fundamento institucional, porque deja sin responder las preguntas que realmente importan para un municipio: ¿la firma pertenece a la persona o a la posición que ocupa? ¿Qué ocurre con la validez de los actos firmados por alguien que, dos años después, ya no ocupa esa posición? ¿Puede una decisión institucional existir y tener valor antes de que se complete su firma formal? ¿Qué significa que un órgano colegiado "firme" algo, si la firma es, por definición, un acto individual de validación?

Los sistemas de gobierno digital que no resuelven estas preguntas en el plano conceptual terminan resolviéndolas, por defecto y sin advertirlo, en el plano tecnológico: la firma se convierte en sinónimo de la certificación digital, la identidad de la persona se convierte en sinónimo de su autoridad institucional, y la integridad criptográfica del documento se convierte en sinónimo de la validez jurídica del acto. Cada una de estas tres equivalencias es falsa, y cada una de ellas, si se deja sin corregir, contamina el diseño técnico de Firma Digital con errores que luego son extraordinariamente costosos de revertir, porque para entonces ya existen miles de actos firmados bajo una lógica institucionalmente incorrecta.

La decisión central de este documento es la siguiente:

**La firma es la manifestación formal mediante la cual una autoridad válidamente constituida, en ejercicio de la competencia de una posición determinada, valida una actuación o un acto administrativo, produciendo evidencia institucional de su autoría, integridad y no repudio. La firma no es la identidad de quien firma, ni es la autoridad que ejerce, ni es el acto que valida: es el puente formal entre esos tres planos, y su validez depende de que los tres estén correctamente constituidos en el momento en que se produce.**

Este modelo desarrolla la diferencia entre identidad, autoridad y firma; establece qué significa la validación institucional de una actuación; analiza los distintos tipos de validación (firma simple, institucional, digital, electrónica, automática, colegiada); desarrolla en profundidad el caso de la firma colegiada; define el ciclo de vida completo de una firma desde su creación hasta su conservación histórica; y establece los principios y riesgos que deben gobernar el futuro diseño técnico de Firma Digital en Muni Digital.

---

## Definiciones Fundamentales

### Identidad

Conforme a ADR-006, la identidad es la representación verificada y única de una persona dentro de Muni Digital. La identidad responde a la pregunta de quién es, biográficamente, el ser humano que interviene en un acto institucional. La identidad es estable, persiste en el tiempo y no depende de ninguna posición que la persona ocupe.

### Autoridad

Conforme a ADR-008, la autoridad es la capacidad institucional para decidir, comprometer a la institución y dirigir a otras posiciones, capacidad que pertenece a la posición organizacional (ADR-007) y que la persona ejerce mientras la ocupa, en cualquiera de los cinco caracteres ya definidos: titular, delegado, suplente, interino o sucesor. La autoridad responde a la pregunta de qué puede decidir, institucionalmente, quien interviene.

### Firma

La firma es la manifestación formal mediante la cual la persona que ejerce válidamente la autoridad de una posición competente expresa su validación sobre una actuación o un acto administrativo determinado, produciendo evidencia de que esa validación efectivamente ocurrió, de quién la produjo, en qué carácter, y de que el contenido validado no fue alterado con posterioridad. La firma responde a la pregunta de cómo se demuestra, ante cualquiera que lo requiera en el futuro, que la decisión institucional efectivamente fue tomada por quien tenía la competencia para tomarla.

### Validación Institucional

La validación institucional es el efecto que la firma produce sobre una actuación o un acto: el reconocimiento formal, atribuible a una autoridad determinada, de que ese contenido es el que la institución asume como su voluntad. La validación es la consecuencia de la firma, no su sinónimo: la firma es el acto de validar; la validación institucional es el estado que ese acto produce sobre lo firmado.

### Autenticación

La autenticación es el proceso mediante el cual se verifica que quien pretende ejercer una identidad determinada (ADR-006) es efectivamente esa persona, y no otra. La autenticación es condición previa y necesaria para que una firma pueda atribuirse correctamente a una identidad, pero la autenticación, por sí sola, no verifica si esa identidad estaba además ejerciendo válidamente la autoridad institucional requerida: eso es un paso conceptual adicional, que este documento desarrolla en profundidad.

### Atribución

La atribución es el resultado de vincular, sin ambigüedad, una firma determinada con la identidad de la persona que la produjo y con el carácter de autoridad bajo el cual actuaba en ese momento. La atribución correcta es la condición de la que depende todo el valor probatorio de la firma: una firma cuya atribución es incierta carece de la utilidad institucional que la firma está llamada a proporcionar.

### Integridad

La integridad es la propiedad de un contenido validado (una actuación, un acto, un documento) de no haber sido alterado desde el momento en que la firma lo validó. La integridad es la garantía de que lo que se consulta hoy es exactamente lo mismo que la autoridad competente validó en su momento.

### No Repudio

Conforme a los principios ya establecidos en ADR-005 y ADR-008, el no repudio es la imposibilidad de que quien produjo una firma válidamente atribuida pueda negar haberla producido. El no repudio depende de la solidez conjunta de la autenticación, la atribución y la integridad.

### Acto Administrativo

Conforme a ADR-009, el acto administrativo es la manifestación de voluntad institucional que produce efectos jurídicos o administrativos identificables. El acto existe, en su dimensión decisoria, desde que la autoridad competente forma su voluntad; la firma es la condición que lo habilita a producir plenos efectos frente a terceros.

### Actuación

Conforme a ADR-010, la actuación es cada intervención individual dentro de un procedimiento. No toda actuación requiere firma en el sentido formal de este documento: muchas actuaciones (una derivación, una observación de mero trámite) se registran con la sola identificación de su autor, sin requerir el circuito de validación pleno que sí exigen los actos administrativos.

### Posición

Conforme a ADR-007, la posición es el lugar institucional, independiente de la persona, que porta la competencia sobre determinada materia. La firma, en su dimensión institucional plena, no es de la persona sino de la posición que la persona ejerce en el momento de firmar.

### Órgano Colegiado

Conforme a ADR-009, el órgano colegiado es una forma particular de posición organizacional colectiva, cuya voluntad institucional se forma por deliberación y voto, y cuya validación formal (la "firma colegiada") tiene una lógica distinta a la de la firma individual, desarrollada en su propia sección de este documento.

---

## ¿Qué Diferencia Existe entre Identidad, Autoridad y Firma?

Estos tres conceptos, que en el lenguaje administrativo cotidiano suelen mencionarse de forma intercambiable ("fulano firmó", "fulano tiene autoridad para esto", "fulano es quien decide"), son en realidad tres planos distintos que este documento debe mantener separados con la misma precisión con que ADR-006, ADR-007 y ADR-008 mantuvieron separados, respectivamente, a la persona, la posición y la autoridad.

La identidad (ADR-006) responde a quién es la persona, en términos biográficos y civiles, con independencia absoluta de cualquier cargo o función institucional. La autoridad (ADR-008) responde a qué puede decidir esa persona en un momento determinado, en virtud de la posición que ocupa y el carácter de ejercicio bajo el cual actúa. La firma, que este documento desarrolla, responde a cómo se demuestra, de forma verificable y perdurable, que esa persona, en ejercicio de esa autoridad, efectivamente validó una decisión institucional determinada.

Estos tres planos pueden disociarse en el tiempo de formas que el modelo debe representar correctamente. Una identidad puede existir sin haber ejercido nunca ninguna autoridad institucional (un ciudadano que nunca ocupó cargo alguno). Una autoridad puede existir y ejercerse sin que, en un caso determinado, se haya requerido ninguna firma formal (una actuación de mero trámite, conforme a ADR-010, validada con la sola identificación de su autor). Y una firma, una vez producida, puede sobrevivir en su valor probatorio mucho después de que la autoridad que la originó haya dejado de existir en esos términos (la posición fue eliminada en una reestructuración, o la persona dejó de ocupar el cargo): la firma sigue siendo prueba de que, en su momento, esa autoridad fue válidamente ejercida.

### ¿Una persona firma o firma una posición institucional?

La respuesta, coherente con todo el desarrollo de ADR-007 y ADR-008, es que **la posición es la que firma institucionalmente, a través de la persona que la ejerce en ese momento.** La firma, en su dimensión de validación institucional, no es un atributo de la persona como individuo biográfico, sino del carácter institucional que esa persona porta en el instante de firmar. Cuando el Director de Obras Públicas firma una certificación, lo que produce efectos institucionales es que la posición de Director de Obras Públicas (con su competencia conforme a ADR-007) fue ejercida (conforme a ADR-008) para validar ese contenido. La persona es indispensable como ejecutante físico y como portadora de la identidad que permite atribuir la firma (ADR-006), pero el valor institucional de lo firmado deriva de la posición y su competencia, no de las cualidades personales de quien la ocupa.

Esta distinción tiene una consecuencia práctica de primer orden, que se desarrolla en la sección siguiente.

### ¿Qué Ocurre Cuando Cambia el Ocupante de una Posición?

Cuando la persona que ocupaba una posición deja de hacerlo (por los mecanismos ya descritos en ADR-004 y ADR-007: baja, fin de mandato, fin de designación, reemplazo), las firmas que esa persona produjo mientras válidamente ejercía la autoridad de esa posición no pierden ningún valor institucional. La firma quedó constituida en su momento, conforme a la autoridad que en ese momento era válida; el cambio posterior de ocupante no es retroactivo y no afecta los actos ya firmados.

Lo que sí cambia, hacia adelante, es quién puede producir nuevas firmas válidas en nombre de esa posición: a partir del cambio de ocupante, solo la nueva persona que ocupa la posición (o quien ejerza su autoridad conforme a los mecanismos de delegación, sustitución o sucesión de ADR-008) puede firmar válidamente en su nombre. El historial de firmas anteriores permanece inalterado y atribuido correctamente a quien las produjo, conforme a su identidad (ADR-006) y al carácter de ejercicio de autoridad que ostentaba en ese momento (ADR-008).

Este principio es el que permite que el modelo de firma sea compatible con la realidad municipal de alta rotación de cargos políticos y de carrera: cada cambio de gobierno, cada movimiento de personal, cada designación nueva, no exige ni permite ninguna revisión retroactiva de las firmas ya producidas por quienes ocuparon esas posiciones en el pasado.

### ¿Puede Existir un Acto Válido sin Firma?

Conforme ya desarrolló extensamente ADR-009, el acto administrativo, en su dimensión de decisión institucional, existe desde el momento en que la autoridad competente forma su voluntad sobre el objeto, motivo y finalidad correspondientes. La firma es la condición que habilita a ese acto a producir plenos efectos frente a terceros y a ingresar en el régimen de publicidad y notificación que le corresponda. Por lo tanto, puede existir un acto en estado de decisión ya formada, pendiente de firma (uno de los estados que ADR-009 reconoce explícitamente), que es un acto válido en su contenido decisorio pero que todavía no produce sus efectos plenos por no haber completado su validación formal. Lo que no puede existir, conforme a este modelo, es un acto que produzca plenos efectos institucionales frente a terceros sin haber completado el circuito de firma que su tipo exige, salvo las excepciones que el propio marco normativo prevea para determinados actos de emisión simplificada.

### ¿Puede Existir Firma sin Acto?

No, en el sentido institucional pleno que este modelo desarrolla. La firma es, por definición, la validación de un contenido decisorio determinado (un acto administrativo o una actuación que lo requiera). Una firma que no recae sobre ningún contenido específico carece de objeto y no constituye, en los términos de este documento, una firma institucional válida: sería, en el mejor de los casos, una prueba de identidad o de disponibilidad de un mecanismo de firma, pero no la validación de ninguna decisión institucional. Este principio es el que cierra la puerta a una de las confusiones más peligrosas en el diseño de sistemas de firma digital: la idea de que "firmar" es una operación técnica independiente que luego se asocia a un documento, en lugar de ser, conceptualmente, un acto que nace ya vinculado a aquello que valida.

---

## Validación Institucional

### ¿Qué Significa que una Actuación Quede Validada Institucionalmente?

Una actuación queda validada institucionalmente cuando una autoridad competente, conforme a ADR-007 y ADR-008, expresa formalmente que asume esa actuación como la voluntad o el reconocimiento de la institución, produciendo evidencia de quién lo hizo, en qué carácter, y garantizando que el contenido validado no será alterado retroactivamente sin dejar rastro de esa alteración.

### ¿Qué Diferencia Existe entre Validación, Aprobación y Decisión?

Estos tres términos, aunque relacionados, no son sinónimos en este modelo.

La **decisión**, conforme a ADR-009 y ADR-010, es el momento en que la autoridad competente forma su voluntad institucional sobre el fondo de un asunto: qué se va a resolver, autorizar, denegar o certificar.

La **aprobación** es un tipo particular de actuación (ya identificada en ADR-010) mediante la cual una autoridad expresa su conformidad con una etapa parcial del desarrollo de un procedimiento, sin que esa conformidad constituya necesariamente la decisión final sobre el fondo del asunto (por ejemplo, la aprobación de un informe técnico previo, que luego es uno de los insumos de la decisión final).

La **validación** es el efecto formal que la firma produce sobre cualquiera de las anteriores (una decisión, una aprobación, o cualquier otra actuación que lo requiera): el reconocimiento institucional, atribuible y verificable, de que esa decisión o esa aprobación efectivamente fue producida por quien tenía la competencia para hacerlo. La validación es, en este sentido, la categoría más amplia y transversal: tanto la decisión final de un procedimiento como una aprobación parcial dentro de su desarrollo pueden requerir validación mediante firma, conforme a la trascendencia institucional que cada una tenga.

### ¿Cuándo una Actuación Adquiere Valor Institucional?

Una actuación adquiere valor institucional pleno cuando concurren tres condiciones: que haya sido producida por quien tenía la competencia para producirla (conforme a ADR-007 y ADR-008), que esa producción haya quedado registrada de forma atribuible y trazable (conforme a ADR-005), y, cuando el tipo de actuación lo requiera, que haya sido formalmente validada mediante firma. No todas las actuaciones requieren el tercer elemento: muchas actuaciones de mero trámite (una derivación, una solicitud de información) adquieren valor institucional pleno con la sola concurrencia de las dos primeras condiciones, sin necesidad de un circuito de firma formal.

### ¿Quién Puede Validar una Actuación?

Puede validar una actuación quien ejerce válidamente la autoridad de la posición competente sobre la materia de esa actuación, en cualquiera de los cinco caracteres de ejercicio ya definidos en ADR-008: titular, delegado, suplente, interino o sucesor. La capacidad de validar no es un atributo libre de la persona ni del rol técnico que esa persona pueda tener en el sistema Muni Digital (ADR-002, ADR-003): es, exclusivamente, una consecuencia de la autoridad institucional válidamente constituida.

---

## Firma y Autoridad

### Relación con ADR-007 — Organizational Position Model

La posición es la que porta la competencia sobre la materia que la firma valida. Sin una posición que tenga, conforme al organigrama institucional, competencia sobre el asunto, ninguna firma puede ser institucionalmente válida, independientemente de la jerarquía o la trascendencia de quien la produzca. La firma de una resolución sobre una materia de Obras Públicas, producida por quien ocupa la posición de Director de Cultura, carece de validez institucional por falta de competencia de la posición, aunque la persona y su firma estén, en sí mismas, correctamente identificadas y autenticadas.

### Relación con ADR-008 — Organizational Authority & Delegation Model

ADR-008 estableció los cinco caracteres bajo los cuales una persona puede ejercer válidamente la autoridad de una posición. Este documento desarrolla cómo cada uno de esos caracteres se traduce en la firma:

**Titular:** Firma en ejercicio pleno y ordinario de la competencia de su posición. La firma identifica a la posición y a la persona, sin necesidad de referencia a ningún título habilitante adicional.

**Delegado:** Firma en virtud de una delegación expresa, formal y documentada conforme a ADR-008. La firma debe expresar, además de la identidad de quien firma, el carácter de delegado y la referencia al acto de delegación que lo habilita, dentro de los límites exactos de esa delegación.

**Suplente:** Firma durante el período de suplencia constituida conforme a ADR-007 y ADR-008, ejerciendo la autoridad de la posición suplida. La firma debe expresar el carácter de suplente y la referencia a la constitución de esa suplencia.

**Interino:** Firma durante el período de interinato de una posición vacante, con la plenitud de competencia que el acto de designación interina le confiera. La firma debe expresar el carácter de interino.

**Sucesor:** Firma en virtud de la activación de la cadena de sucesión definida en ADR-008 ante una vacancia o ausencia imprevista. La firma debe expresar el carácter de sucesor y la referencia al mecanismo de sucesión que lo habilita.

En todos los casos, conforme ya estableció ADR-009, el carácter de ejercicio bajo el cual se firma debe quedar expresamente indicado y no puede inferirse implícitamente de la sola identidad de quien firma.

### Relación con ADR-009 — Administrative Act & Resolution Model

ADR-009 estableció que la firma valida el acto pero no lo crea, y que el acto recorre estados (borrador, en elaboración, en revisión, pendiente de firma, firmado, vigente) que son anteriores y posteriores al momento mismo de la firma. Este documento desarrolla, en mayor profundidad, qué es exactamente lo que ocurre en el instante de la firma: la atribución a una identidad determinada, la verificación de la autoridad bajo la cual actúa, y la producción de evidencia de integridad sobre el contenido validado.

### Relación con ADR-010 — Administrative Procedure & Case Lifecycle Model

ADR-010 estableció que no toda actuación dentro de un procedimiento constituye un acto administrativo, y que, en consecuencia, no toda actuación requiere el circuito pleno de firma que este documento desarrolla. Este documento aporta el criterio para distinguir, dentro del universo de actuaciones que ADR-010 describe, cuáles requieren validación formal mediante firma (las decisiones, las aprobaciones de trascendencia institucional, los actos administrativos en el sentido de ADR-009) y cuáles pueden registrarse válidamente con la sola atribución de autoría, sin firma formal (las derivaciones de mero trámite, las observaciones internas).

---

## Tipos de Validación

### Firma Simple

La firma simple es la validación que identifica a quien produce una actuación sin que medie un mecanismo robusto de verificación de identidad ni de integridad del contenido validado. Es propia de actuaciones de baja trascendencia institucional (observaciones internas, comunicaciones de coordinación operativa) donde el riesgo de repudio o de alteración posterior es bajo y no justifica un circuito de validación más exigente.

### Firma Institucional

La firma institucional es la validación que expresa, con la plenitud de los elementos desarrollados en este documento (identidad, autoridad, carácter de ejercicio), que una posición competente asume formalmente una decisión o actuación como propia. Es la categoría general bajo la cual se ordenan las demás formas de validación más específicas que siguen a continuación, y es la que corresponde, como mínimo, a todo acto administrativo conforme a ADR-009.

### Firma Digital

La firma digital es, en su dimensión conceptual y sin entrar en consideraciones tecnológicas o de proveedores específicos, el mecanismo que utiliza herramientas criptográficas para vincular de forma verificable una identidad determinada con un contenido específico, garantizando tanto la atribución como la integridad de ese contenido frente a alteraciones posteriores. La firma digital es un medio técnico que puede instrumentar una firma institucional, pero, conforme ya estableció ADR-009, la validez de la firma digital como evidencia institucional depende de que, además de la robustez criptográfica, la persona firmante haya estado ejerciendo válidamente la autoridad institucional requerida.

### Firma Electrónica

La firma electrónica, en sentido amplio y sin pretender fijar aquí una clasificación técnica o normativa exhaustiva (que corresponde al marco legal aplicable y al futuro diseño técnico), es cualquier mecanismo electrónico de manifestación de voluntad que no necesariamente alcanza el nivel de robustez criptográfica de la firma digital, pero que puede ser suficiente, según el tipo de actuación y el marco normativo aplicable, para producir una validación institucional válida (por ejemplo, la validación mediante usuario y contraseña dentro de un sistema con controles de acceso adecuados, para actuaciones de menor trascendencia).

### Validación Automática

La validación automática es aquella que el propio sistema produce, sin intervención humana directa en el momento, conforme a reglas previamente establecidas y aprobadas por la autoridad competente (por ejemplo, la generación automática de una certificación de mero trámite cuando se cumplen determinadas condiciones predefinidas). La validación automática no es una autoridad nueva ni distinta de las ya descritas en ADR-008: es la ejecución, por medios automatizados, de una regla que la autoridad competente estableció de antemano, y la responsabilidad institucional de esa validación recae sobre la posición que aprobó la regla, no sobre el mecanismo automatizado en sí mismo, que conforme a ADR-006 no es una persona ni porta autoridad propia.

### Validación Colegiada

La validación colegiada es aquella que un órgano colegiado produce mediante su mecanismo de deliberación y voto, conforme ya introdujo ADR-009. Se desarrolla con la profundidad que merece en la sección siguiente, dada su complejidad particular respecto de la firma individual.

---

## Firma Colegiada

### HCD

El Honorable Concejo Deliberante, como órgano colegiado conforme a ADR-009, no produce su validación institucional mediante la firma individual de cada uno de sus integrantes sobre cada ordenanza, sino mediante el voto de cada Concejal en el momento de la sesión, cuyo resultado (la mayoría alcanzada conforme al reglamento interno y la normativa aplicable) constituye la voluntad institucional del cuerpo. La firma que formaliza ese resultado (generalmente la del Presidente del HCD junto con la del Secretario del Cuerpo) no sustituye ni decide por el cuerpo: valida que el procedimiento de votación efectivamente se cumplió y que su resultado fue el que se consigna.

### Comisiones

Las comisiones de trabajo, tanto internas del HCD como las que puedan constituirse en el ámbito del Ejecutivo, producen su validación de forma análoga: mediante la deliberación y el voto o consenso de sus integrantes, formalizado en un dictamen o acta de comisión que valida, mediante la firma de quien preside la comisión o de la totalidad de sus integrantes según lo exija su norma de constitución, que ese fue efectivamente el resultado de su deliberación colectiva.

### Jurados

Los jurados, constituidos para procesos de selección de personal por concurso o para la evaluación de propuestas determinadas, producen su validación mediante el acuerdo o votación de sus miembros sobre el resultado del proceso evaluado, formalizado en un acta o dictamen que cada uno de los integrantes del jurado, o quien lo presida, valida mediante su firma.

### Mesas Evaluadoras

Las mesas evaluadoras, frecuentes en procesos de concurso público o de evaluación técnica, siguen una lógica equivalente a la de los jurados: la validación institucional recae sobre el resultado colectivo de su evaluación, no sobre la opinión individual de ninguno de sus integrantes por separado.

### Comisiones de Adjudicación

Las comisiones de adjudicación, ya mencionadas en ADR-009 y ADR-010 en el contexto de los procedimientos de compras y contrataciones, validan institucionalmente el resultado de la evaluación de ofertas mediante un acto colegiado (un dictamen o acta de adjudicación) que es la expresión de su deliberación conjunta, formalizado mediante la firma de quienes la integran o de quien la preside, conforme a su norma de constitución.

### Cómo se Forma la Voluntad Colectiva

La voluntad colectiva de un órgano colegiado se forma mediante un proceso de deliberación (intercambio de posiciones entre sus integrantes) seguido de un mecanismo de decisión (votación, consenso, u otro mecanismo que la norma de constitución del órgano establezca), del cual resulta una posición única que se atribuye al órgano en su conjunto, no a la suma de las posiciones individuales de sus integrantes. Este modelo conceptual no pretende definir aquí los mecanismos específicos de quórum y mayoría (que dependen del marco normativo y reglamentario de cada órgano), pero establece que el sistema debe representar la existencia de ese proceso colectivo como antecedente necesario de la validación colegiada.

### Cómo se Valida Institucionalmente una Decisión Colectiva

La validación institucional de una decisión colectiva se produce cuando, una vez formada la voluntad del órgano mediante su mecanismo interno de deliberación y voto, esa voluntad se formaliza mediante la firma de quien tiene la competencia para representar formalmente al órgano (su Presidente, su Secretario, o la totalidad de sus integrantes, según lo exija la norma de constitución del órgano). Esta firma de formalización no es una nueva decisión que se superponga a la del órgano: es la validación de que el proceso colectivo efectivamente se cumplió y produjo el resultado que se consigna.

### Diferencia entre Firma Individual y Validación Colegiada

La firma individual valida una decisión que pertenece, en su origen, a una sola posición institucional, ejercida por una sola persona en un carácter de ejercicio determinado (titular, delegado, suplente, interino, sucesor). La validación colegiada valida una decisión cuyo origen no es ninguna posición individual sino el órgano colectivo en su conjunto, y cuya formación requiere, como antecedente necesario, el proceso de deliberación y voto de sus integrantes. La firma que formaliza una validación colegiada no debe confundirse, en su naturaleza, con una firma individual: aunque pueda materializarse mediante la firma física o digital de una o más personas determinadas, lo que esas firmas validan no es la voluntad personal de quienes firman, sino el resultado del proceso colectivo que las antecede.

---

## Ciclo de Vida de una Firma

### Creación

La firma se crea en el momento en que la persona que ejerce válidamente la autoridad de la posición competente expresa su validación sobre un contenido determinado (una actuación o un acto administrativo), conforme al carácter de ejercicio que en ese momento ostenta.

### Aplicación

La aplicación es el momento concreto en que la firma se materializa sobre el contenido específico que valida, produciendo el vínculo indisoluble entre la identidad de quien firma, el carácter de autoridad bajo el cual actúa, y el contenido validado.

### Verificación

La verificación es el proceso, posterior a la aplicación de la firma, mediante el cual cualquier interesado legítimo puede comprobar que la firma efectivamente corresponde a la identidad que se le atribuye, que la autoridad bajo la cual se ejerció estaba válidamente constituida en ese momento, y que el contenido validado no fue alterado desde entonces.

### Revocación

La revocación de una firma, en el sentido de este modelo, no es la negación retroactiva de que la firma haya sido válidamente producida en su momento, sino la constatación posterior, mediante un acto administrativo conforme a ADR-009, de que la firma fue producida sin la autoridad institucional requerida (por ejemplo, porque se descubre que quien firmó actuaba bajo una delegación que ya había sido revocada en ese momento). La revocación de la firma no debe confundirse con la revocación del acto que esa firma validó: pueden coexistir ambos conceptos, pero responden a causas distintas.

### Expiración

La expiración, en su dimensión puramente técnica (la vigencia temporal de un certificado de firma digital), no afecta la validez institucional de las firmas producidas mientras ese mecanismo técnico estaba vigente y la autoridad institucional correspondiente estaba válidamente constituida. La expiración del mecanismo técnico de firma es un evento distinto, y de menor trascendencia institucional, que la constitución o cese de la autoridad institucional que la firma representa.

### Sustitución

La sustitución de una firma, en el sentido de este modelo, se produce cuando, por una causa de fuerza mayor o por la corrección de un error detectado, es necesario que la validación originalmente producida por una persona sea reemplazada por la de otra persona válidamente habilitada (por ejemplo, si quien debía firmar un acto en su carácter de titular cesa antes de completar el circuito de firma, y debe completarlo quien lo sucede o sustituye conforme a ADR-008). La sustitución de la firma debe quedar expresamente registrada como tal, sin alterar el registro de que la firma original, si efectivamente se produjo, fue producida en su momento por quien la produjo.

### Conservación Histórica

Conforme a los principios de ADR-005, toda firma, una vez producida, se conserva de forma inmutable y perdurable, junto con la evidencia de la identidad de quien la produjo, el carácter de autoridad bajo el cual actuaba, y el contenido específico que validó. La conservación histórica de la firma es la que permite, en cualquier momento futuro, reconstruir con certeza quién validó qué, cuándo y en virtud de qué autoridad, incluso después de que la posición que la originó haya sido eliminada del organigrama vigente o de que la persona que la produjo haya dejado de tener cualquier vínculo con la institución.

---

## Evidencia Institucional

### Autoría

La autoría es la atribución cierta de una firma a la identidad de la persona que la produjo, conforme a ADR-006. La autoría es el primer elemento de la evidencia institucional que la firma debe garantizar: sin autoría cierta, ninguno de los demás elementos tiene sentido.

### Integridad

La integridad, ya definida, es la garantía de que el contenido validado por la firma no ha sido alterado desde el momento de la validación. La integridad es lo que permite confiar en que lo que se consulta hoy es exactamente lo que la autoridad competente decidió validar en su momento.

### No Repudio

El no repudio, conforme a ADR-005 y ADR-008, es la imposibilidad de que quien produjo la firma niegue haberla producido, en virtud de la solidez conjunta de la autoría y la integridad. El no repudio es la consecuencia institucional más relevante de un sistema de firma correctamente diseñado: es lo que permite que la institución pueda sostener, ante cualquier cuestionamiento posterior, que una decisión determinada fue efectivamente tomada por quien la firma le atribuye.

### Trazabilidad

La trazabilidad, conforme a ADR-005, es la capacidad de reconstruir, en cualquier momento, la cadena completa de eventos que condujo a la producción de una firma determinada: quién la produjo, bajo qué carácter de autoridad, sobre qué contenido, en qué momento, y dentro de qué actuación o acto administrativo.

### Cadena de Evidencia

La cadena de evidencia institucional es el conjunto articulado de los registros de identidad (ADR-006), posición (ADR-007), autoridad (ADR-008), acto administrativo (ADR-009), procedimiento (ADR-010) y firma (este documento) que, en conjunto, permiten reconstruir sin ambigüedad la totalidad del recorrido institucional que condujo a una decisión determinada, desde la persona real que intervino hasta el efecto jurídico concreto que produjo.

### Relación con ADR-005

Todo lo desarrollado en esta sección es una aplicación directa de los principios de trazabilidad, integridad, no repudio y responsabilidad institucional que ADR-005 estableció como fundamento general de la auditoría institucional de Muni Digital. Este documento no introduce principios nuevos en este punto: extiende y precisa, en el dominio específico de la firma, los principios que ADR-005 ya estableció con carácter general.

---

## Estados de una Validación Institucional

### Pendiente

La validación está pendiente cuando el contenido que requiere firma ya ha sido elaborado y, eventualmente, revisado, pero todavía no ha sido sometido a la persona que debe producir la validación final.

### En Revisión

La validación está en revisión cuando el contenido se encuentra siendo sometido a un control previo (técnico, legal o jerárquico) antes de ser presentado a quien debe validarlo formalmente, conforme ya desarrolló ADR-009 para el estado homólogo del acto administrativo.

### Validada

La validación está en estado de validada cuando la firma ha sido efectivamente producida por quien ejercía válidamente la autoridad competente, conforme a los elementos desarrollados en este documento.

### Rechazada

La validación está rechazada cuando la persona que debía producirla, en ejercicio de su autoridad, decide no validar el contenido sometido a su firma, devolviéndolo para su reelaboración o decidiendo, en su caso, un curso de acción distinto.

### Revocada

La validación está revocada cuando, conforme ya se desarrolló en la sección de ciclo de vida, se constata posteriormente que fue producida sin la autoridad institucional requerida, mediante un acto administrativo que así lo declara.

### Histórica

La validación está en estado histórico cuando, habiendo cumplido su ciclo de vigencia activa, se conserva conforme a los principios de conservación de ADR-005, accesible para consulta y auditoría.

---

## Riesgos

### CRÍTICO

**Firma atribuida a persona incorrecta.** Si el mecanismo de autenticación falla o es vulnerado, y una firma queda atribuida a una identidad distinta de la que efectivamente la produjo, se rompe el elemento más fundamental de toda la evidencia institucional: la autoría. Ningún otro elemento de este modelo (integridad, no repudio, trazabilidad) tiene sentido si la atribución de origen es incorrecta.

**Firma sin autoridad institucional válidamente constituida.** Si el sistema acepta como válida la firma de una persona que, en el momento de firmar, no ejercía la autoridad de la posición competente (porque su designación había cesado, porque su delegación había sido revocada, porque no existía suplencia o interinato válidamente constituido), el acto o actuación validado carece de fundamento institucional, exactamente el riesgo crítico ya identificado en ADR-008 y ADR-009 y que aquí se materializa en el plano específico de la firma.

**Acto firmado por una posición incompetente sobre la materia.** Si la verificación de la firma no contempla que la posición que la produce tenga competencia institucional sobre la materia específica del contenido validado (conforme a ADR-007), se pueden validar formalmente actos que exceden el ámbito de atribuciones de quien los firma.

**Confusión entre identidad y autoridad en el mecanismo de validación.** Si el sistema asume que verificar la identidad de quien firma (autenticación) es equivalente a verificar que esa persona tenía la autoridad institucional requerida, se produce exactamente la confusión de planos que este documento busca prevenir desde su Resumen Ejecutivo: una firma técnicamente impecable en su atribución de identidad puede carecer por completo de fundamento institucional.

**Confusión entre firma y acto administrativo.** Si se asume, como ya advirtió ADR-009, que la firma es la que crea el acto en lugar de validarlo, se pierde la capacidad de representar correctamente los estados previos a la firma (decisión ya formada, pendiente de validación formal) y se corre el riesgo de tratar como inexistentes decisiones institucionales que ya fueron tomadas pero que aún no completaron su circuito de validación.

**Validación posterior no registrada como evento distinto.** Si una corrección o sustitución de firma (conforme al ciclo de vida desarrollado en este documento) no queda registrada como un evento propio y distinguible del registro original, se pierde la capacidad de reconstruir con precisión qué fue lo que efectivamente ocurrió y cuándo.

**Revocación de firma no auditada.** Si la revocación de una firma (por constatarse que fue producida sin autoridad válida) no genera, en sí misma, un registro de auditoría obligatoria conforme a ADR-005, se pierde la trazabilidad de un evento de altísima trascendencia institucional: la constatación de que una validación anterior carecía de fundamento.

**Firma colegiada incompleta o sin registro del proceso de votación.** Si la validación de una decisión colegiada se registra mediante la sola firma de quien la formaliza (por ejemplo, el Presidente del HCD), sin conservar evidencia del proceso de deliberación y voto que efectivamente constituyó la voluntad del órgano, la validez de esa decisión queda expuesta ante cualquier cuestionamiento sobre el quórum o la mayoría alcanzada.

**Alteración del contenido después de la firma sin invalidar la validación.** Si el sistema permite que el contenido validado por una firma sea modificado con posterioridad sin que ello invalide automáticamente esa firma o genere un nuevo ciclo de validación, se rompe el elemento de integridad que es condición esencial de toda evidencia institucional.

**Eliminación física del registro de una firma.** Si el sistema permite borrar el registro histórico de una firma en lugar de, cuando corresponda, revocarla mediante un acto administrativo que así lo declare, se destruye evidencia institucional que puede ser indispensable para la defensa del municipio en procesos posteriores, vulnerando el principio de inmutabilidad histórica ya establecido en ADR-005 y ADR-009.

### ALTO

**No distinguir, en el registro de la firma, el carácter de ejercicio de autoridad bajo el cual se produjo.** Si la firma no expresa si quien la produjo actuaba como titular, delegado, suplente, interino o sucesor, se debilita la trazabilidad de la cadena de responsabilidad institucional, replicando el riesgo ya identificado en ADR-008 y ADR-009 en el plano específico de la firma.

**Validación automática sin trazabilidad de la regla que la origina.** Si una validación producida automáticamente por el sistema no conserva referencia a la regla previamente aprobada por la autoridad competente que la habilitó, la responsabilidad institucional de esa validación queda sin anclaje claro.

**Mecanismo técnico de firma digital sin verificación de vigencia de la autoridad institucional.** Si la verificación técnica de una firma digital (validez del certificado, integridad criptográfica) no se complementa con la verificación de que la autoridad institucional correspondiente estaba vigente en ese momento, conforme a ADR-008, se produce una validación técnicamente correcta pero institucionalmente vacía.

**Expiración del mecanismo técnico confundida con pérdida de validez institucional de firmas pasadas.** Si el sistema trata la expiración de un certificado de firma digital como causa de invalidez retroactiva de las firmas producidas mientras ese certificado estaba vigente, se generaría una inseguridad jurídica completamente injustificada sobre decisiones institucionales ya tomadas válidamente.

**Falta de distinción entre rechazo de validación y revocación de validación.** Si el sistema no diferencia con claridad el rechazo (la decisión de no validar algo que todavía no fue validado) de la revocación (la constatación posterior de que algo validado carecía de autoridad), se introduce ambigüedad sobre el estado real de un contenido determinado.

**Validación colegiada registrada como si fuera una firma individual.** Si el sistema trata la firma de quien formaliza una decisión colegiada como si fuera el origen de esa decisión, en lugar de la formalización de un proceso colectivo previo, se pierde la naturaleza institucional real de la decisión y se concentra indebidamente la responsabilidad en una sola persona.

**Falta de verificación de competencia material en la firma de actos de tipo certificación o autorización.** Si los actos de menor jerarquía formal (certificaciones, autorizaciones de mero trámite) no se sometan a la misma verificación de competencia que los actos de mayor trascendencia, se puede producir una proliferation de validaciones sin respaldo institucional adecuado, precisamente por tratarse de actos que, al percibirse como menores, reciben menos escrutinio.

**Sustitución de firma sin registro de la causa que la motivó.** Si una firma sustituida (por cese del firmante original antes de completar el circuito) no registra con precisión la causa de la sustitución y la identificación de quien efectivamente completó la validación, se introduce ambigüedad sobre la cadena real de responsabilidad.

**Conservación histórica de la firma sin vínculo verificable con la posición vigente al momento de producirse.** Si el registro histórico de la firma no conserva, además de la identidad de quien firmó, la referencia a la posición y su estado en el organigrama vigente en ese momento (conforme a ADR-007), la reconstrucción futura de la competencia ejercida se dificulta considerablemente, especialmente después de reestructuraciones organizacionales.

**Falta de un criterio uniforme sobre qué actuaciones requieren firma formal y cuáles no.** Si distintas áreas aplican criterios heterogéneos sobre cuándo una actuación requiere el circuito pleno de validación y cuándo basta la sola atribución de autoría sin firma, se introduce inconsistencia institucional en el tratamiento de actuaciones sustancialmente similares.

### MEDIO

**Terminología inconsistente entre firma simple, electrónica, digital e institucional.** Si distintas áreas o sistemas usan estos términos de forma intercambiable sin un criterio institucional unificado, se dificulta la comprensión compartida de qué nivel de validación corresponde a cada tipo de actuación.

**Falta de un catálogo institucional de qué tipo de validación corresponde a cada tipo de acto o actuación.** Sin este catálogo, cada área puede decidir de forma heterogénea qué nivel de robustez de firma aplicar a actuaciones similares, generando inconsistencias en el tratamiento institucional.

**Ausencia de alertas ante una firma próxima a producirse bajo una delegación cercana a su vencimiento.** Si el sistema no advierte que el plazo de una delegación está próximo a vencer, se incrementa el riesgo de que se produzcan firmas en los límites temporales de una autoridad delegada sin la debida atención.

**Falta de visibilidad consolidada del estado de validación de los distintos actos dentro de un mismo procedimiento.** Si no existe una vista que permita observar, en conjunto, qué actos de un procedimiento ya están validados y cuáles están pendientes, el seguimiento de la tramitación se vuelve más trabajoso.

**Firma colegiada sin plazo definido entre la votación y su formalización.** Si no existe un criterio sobre cuánto tiempo puede transcurrir entre que un órgano colegiado vota una decisión y esa decisión queda formalmente validada mediante la firma correspondiente, se introduce incertidumbre sobre el momento real de producción de efectos.

**Falta de diferenciación visual o documental entre los distintos caracteres de ejercicio en los registros consultables.** Si la consulta de un acto firmado no distingue con claridad, para quien lo consulta, si la firma fue producida en carácter de titular, delegado, suplente, interino o sucesor, la comprensión de la cadena de responsabilidad se dificulta innecesariamente.

**Validación automática aplicada a materias que deberían requerir intervención humana directa.** Si el alcance de la validación automática no se revisa periódicamente, se corre el riesgo de que abarque materias cuya trascendencia institucional amerite, en rigor, la intervención directa de una autoridad humana en cada caso.

**Ausencia de un proceso de revisión periódica de las reglas que habilitan validaciones automáticas.** Sin esta revisión, las reglas automatizadas pueden volverse inconsistentes con cambios posteriores en el marco normativo o en la estructura organizacional.

**Falta de un mecanismo claro para que el interesado externo verifique la validez de una firma sobre un acto que lo afecta.** Si el ciudadano o el contratista no tienen una vía sencilla para verificar que un acto que les fue notificado cuenta con la validación institucional correspondiente, se debilita la transparencia que ADR-010 estableció como principio.

**Diferencias de criterio entre instituciones sobre qué constituye una firma institucional suficiente para cada tipo de acto.** Si la Municipalidad, el HCD y el Hospital aplican estándares distintos sin coordinación, la interoperabilidad de actos que eventualmente deban reconocerse entre instituciones se complica.

### BAJO

**Nomenclatura distinta para los caracteres de ejercicio en distintos módulos del sistema.** No constituye un riesgo institucional grave pero dificulta la lectura comparada entre módulos.

**Falta de un glosario institucional accesible sobre los tipos de validación definidos en este documento.** Dificulta la capacitación de personal nuevo, sin comprometer la validez de las validaciones ya producidas.

**Ausencia de indicadores de gestión sobre tiempos promedio entre la decisión y su validación formal.** Sin esta información agregada, la institución pierde la posibilidad de identificar demoras sistemáticas en los circuitos de firma.

**Variabilidad de estilo en la forma de expresar el carácter de ejercicio dentro del texto de los actos.** No compromete la validez institucional si el carácter está efectivamente expresado, aunque dificulta levemente la lectura comparada entre distintos actos.

**Falta de resumen consolidado del historial de validaciones de un acto modificado varias veces.** No afecta la validez del acto, pero puede requerir mayor esfuerzo de consulta para reconstruir rápidamente su historia completa de validaciones.

---

## Principios del Modelo

### Legalidad

Toda validación institucional debe producirse conforme al marco normativo aplicable al tipo de acto o actuación que valida, respetando los requisitos de forma y competencia que ese marco establece.

### Competencia

La capacidad de validar institucionalmente una actuación o un acto deriva exclusivamente de la competencia de la posición organizacional (ADR-007) sobre la materia correspondiente, ejercida válidamente conforme a ADR-008.

### Trazabilidad

Toda firma debe poder reconstruirse en su totalidad: quién la produjo, bajo qué identidad (ADR-006), en qué carácter de autoridad (ADR-008), sobre qué contenido específico, y en qué momento.

### Continuidad Institucional

La capacidad de producir validaciones institucionales no debe interrumpirse por la vacancia, ausencia o cambio del titular de una posición, en virtud de los mecanismos de delegación, sustitución y sucesión ya garantizados por ADR-008.

### No Repudio

Quien produjo una firma válidamente atribuida no puede negar haberla producido, en virtud de la solidez conjunta de la autenticación, la atribución y la integridad del contenido validado.

### Inmutabilidad

El registro histórico de una firma, una vez producido, no puede modificarse ni eliminarse. Toda corrección, sustitución o revocación posterior se expresa mediante un nuevo evento que se suma al historial, nunca mediante la alteración del registro original.

### Separación entre Identidad y Autoridad

La identidad de quien firma (ADR-006) y la autoridad institucional bajo la cual firma (ADR-008) son dos planos conceptualmente distintos. La autenticación de la identidad es condición necesaria pero no suficiente para la validez institucional de una firma: además debe verificarse la vigencia y el alcance de la autoridad ejercida.

### Separación entre Firma y Documento

La firma valida un contenido decisorio (un acto o una actuación); el documento (ADR-009) es el soporte material de ese contenido. La integridad que la firma garantiza recae sobre el contenido validado, no sobre el formato o el soporte documental específico que lo contiene, el cual puede eventualmente reproducirse o migrarse sin que ello afecte la validez de la firma original.

### Separación entre Firma y Acto

Conforme ya estableció ADR-009 y desarrolla extensamente este documento, la firma valida el acto administrativo; no lo crea. El acto existe, en su dimensión decisoria, desde que la autoridad competente forma su voluntad, independientemente de que su validación formal mediante firma se complete en un momento posterior.

---

## Digital Signature & Institutional Validation Model v1 Recomendado

El modelo conceptual de firma y validación institucional de Muni Digital se define de la siguiente manera:

### Qué es una Firma Institucional

La firma institucional es la manifestación formal mediante la cual la persona que ejerce válidamente la autoridad de una posición competente, en cualquiera de los cinco caracteres definidos en ADR-008 (titular, delegado, suplente, interino, sucesor), valida una actuación o un acto administrativo determinado, produciendo evidencia de autoría, integridad y no repudio sobre ese contenido.

### Qué Valida

La firma valida que el contenido específico al que se aplica (un acto administrativo conforme a ADR-009, o una actuación de trascendencia suficiente conforme a ADR-010) fue efectivamente decidido, aprobado o reconocido por la autoridad institucional competente, y que ese contenido no ha sido alterado desde el momento de la validación.

### Quién Puede Producirla

Puede producir una firma institucional válida quien ejerce, en el momento de firmar, la autoridad de la posición competente sobre la materia del contenido validado, ya sea como titular, como delegado dentro de los límites de su delegación, como suplente o interino durante el período correspondiente, o como sucesor en virtud de la cadena de sucesión activada conforme a ADR-008. En el caso de los órganos colegiados, la validación se produce mediante la formalización de un proceso previo de deliberación y voto, no mediante la sola voluntad individual de quien la formaliza.

### Cómo se Relaciona con la Autoridad

La firma es la manifestación formal del ejercicio de la autoridad institucional definida en ADR-008. No existe firma institucionalmente válida sin autoridad válidamente constituida que la sustente, y toda firma debe expresar el carácter de ejercicio bajo el cual se produjo.

### Cómo se Relaciona con los Actos Administrativos

Conforme a ADR-009, la firma valida al acto administrativo y lo habilita a producir plenos efectos frente a terceros, pero no es la fuente de su existencia conceptual: el acto, en su dimensión decisoria, puede existir antes de completar su circuito de firma.

### Cómo se Relaciona con los Procedimientos

Conforme a ADR-010, no toda actuación dentro de un procedimiento requiere el circuito pleno de firma institucional: solo aquellas que constituyen decisiones, aprobaciones de trascendencia institucional o actos administrativos en el sentido de ADR-009. Las demás actuaciones se registran válidamente con la sola atribución de autoría conforme a los principios de auditoría de ADR-005.

### Cómo se Preserva Históricamente

Toda firma, una vez producida, se conserva de forma inmutable y perdurable conforme a los principios de ADR-005, junto con la evidencia de la identidad de quien la produjo (ADR-006), la posición y su competencia en ese momento (ADR-007), el carácter de autoridad ejercido (ADR-008), y el contenido específico validado (ADR-009 y ADR-010). Esta conservación permite, en cualquier momento futuro, reconstruir con certeza la totalidad de la cadena de evidencia institucional, independientemente de los cambios posteriores en la estructura organizacional, en el personal de la institución, o en la tecnología específica empleada para instrumentar la firma.

---

## Roadmap Conceptual

### P0 — Aprobación conceptual

**Objetivo:** Validar y aprobar este documento como fuente de verdad conceptual para la firma y la validación institucional en Muni Digital.

Dependencias: ADR-001 a ADR-010 aprobados. Este documento revisado por el equipo de arquitectura, los referentes legales o de asesoría jurídica municipal (dado que los requisitos de forma, los tipos de firma reconocidos por la normativa aplicable y el régimen de los actos colegiados dependen del marco normativo provincial y nacional) y los referentes institucionales de Municipalidad y HCD.

Criterio de cierre: El equipo puede responder sin ambigüedad qué diferencia existe entre identidad, autoridad y firma; por qué la firma valida y no crea el acto; cómo se distingue una firma individual de una validación colegiada; y por qué la autenticación de identidad no es, por sí sola, suficiente para la validez institucional de una firma. Los referentes legales confirman que la clasificación de tipos de validación (simple, institucional, digital, electrónica, automática, colegiada) es compatible con el marco normativo aplicable a Muni Digital, sin que este documento pretenda sustituirlo.

Riesgo: CRÍTICO si el futuro módulo de Firma Digital inicia su diseño técnico sin este modelo aprobado. La ausencia de este modelo obliga a ese módulo a resolver, por defecto y bajo la lógica de la herramienta tecnológica elegida, exactamente las confusiones que este documento busca prevenir desde su Resumen Ejecutivo.

---

### P1 — Diseño técnico

**Objetivo:** Traducir el modelo conceptual en decisiones de diseño técnico: cómo se representa la firma como vínculo entre identidad, autoridad y contenido validado, cómo se modelan los distintos tipos de validación, cómo se registra el carácter de ejercicio de autoridad en cada firma, y cómo se representa la validación colegiada distinguiéndola de la firma individual.

Dependencias: P0 cerrado. ADR-006, ADR-007, ADR-008 y ADR-009 implementados en su diseño técnico (modelos de identidad, posición, autoridad y acto disponibles para anclar la firma). ADR-005 implementado en su diseño técnico (capa de auditoría disponible para registrar los eventos del ciclo de vida de la firma).

Criterio de cierre: El diseño técnico mantiene la separación conceptual entre identidad, autoridad y firma. El diseño verifica, antes de aceptar una firma como válida, que la persona firmante ejercía efectivamente la autoridad institucional requerida, y no se limita a verificar la robustez técnica de la autenticación. El diseño representa los seis estados de validación definidos en este documento. El diseño admite la representación de la validación colegiada como un proceso distinto de la firma individual, sin forzarla a la misma estructura.

Riesgo: ALTO. Es el momento donde la presión de adoptar una solución tecnológica de firma digital disponible en el mercado puede llevar a que el sistema acepte como suficiente la sola robustez criptográfica de la firma, sin verificar la autoridad institucional que este documento exige como condición adicional e independiente.

Archivos conceptuales que debe cubrir el diseño: modelo de firma con su vínculo a identidad, autoridad y contenido validado, modelo de los seis estados de validación definidos en este documento, modelo de validación colegiada con su proceso de deliberación y voto previo, modelo de revocación y sustitución de firma con su registro diferenciado, integración con la capa de autoridad de ADR-008 para la verificación de competencia y carácter de ejercicio en el momento de la firma, integración con la capa de auditoría de ADR-005.

---

### P2 — Implementación del núcleo de firma y validación

**Objetivo:** El sistema puede registrar la creación y aplicación de una firma sobre un contenido determinado, verificar la autoridad institucional de quien firma en ese momento, registrar el carácter de ejercicio correspondiente, y conservar de forma inmutable la evidencia completa de cada validación producida.

Dependencias: P1 cerrado.

Criterio de cierre: Ninguna firma puede registrarse como válida sin que el sistema verifique, en ese momento, que la persona firmante ejercía la autoridad institucional requerida conforme a ADR-008. El carácter de ejercicio (titular, delegado, suplente, interino, sucesor) queda expresamente registrado en cada firma. La revocación de una firma genera un evento de auditoría obligatoria distinto del registro original, sin alterarlo. La validación colegiada puede registrarse con su proceso de votación previo, distinguible de la firma individual que la formaliza.

Rollback: Si P2 permite que una firma se valide sin verificación de autoridad institucional, o si el historial de firmas resulta modificable, revertir el módulo afectado hasta corregir. Un sistema de firma que no puede garantizar la autoridad institucional de quien firma no debe liberarse a producción, dado el valor jurídico y probatorio que estos registros representan para el municipio.

---

### P3 — Integración con Actos Administrativos, Procedimientos y Firma Digital

**Objetivo:** El módulo de Actos Administrativos (ADR-009) utiliza este modelo de firma para validar formalmente cada acto antes de su entrada en vigencia. El módulo de Procedimientos (ADR-010) aplica el criterio de este documento para determinar qué actuaciones requieren firma formal y cuáles se registran con la sola atribución de autoría. El mecanismo técnico específico de Firma Digital, cuando se diseñe e incorpore una solución tecnológica concreta, opera como instrumento de este modelo conceptual, sin sustituir ninguno de sus principios.

Dependencias: P2 cerrado. ADR-007, ADR-008, ADR-009 y ADR-010 implementados. ADR-005 implementado.

Criterio de cierre: Un acto administrativo no puede pasar al estado de vigente sin haber completado su validación conforme a este modelo. Un procedimiento puede mostrar, para cada una de sus actuaciones, si requirió firma formal o se registró con la sola atribución de autoría, conforme al criterio institucional establecido. Una decisión colegiada del HCD o de una comisión de adjudicación queda registrada con su proceso de votación y su formalización mediante firma, ambos consultables de forma diferenciada. La incorporación de una solución tecnológica específica de firma digital se integra sin alterar ninguno de los principios conceptuales de este documento.

---

> Este documento define el modelo conceptual de firma y validación institucional de Muni Digital v1.
>
> No debe modificarse sin revisión del equipo de arquitectura, los referentes legales y aprobación formal.
>
> Extiende ADR-001, ADR-005, ADR-006, ADR-007, ADR-008, ADR-009 y ADR-010 sin contradecirlos.
>
> Es la fuente de verdad conceptual para la futura Firma Digital, los Actos Administrativos y los Procedimientos de Muni Digital.
>
> Próximo documento recomendado:
>
> ADR-012 — Notification & Public Communication Model v1.