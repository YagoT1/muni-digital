# ADR-008 — Organizational Authority & Delegation Model v1 — Muni Digital

> Documento conceptual del modelo de autoridad institucional, delegación, sustitución y sucesión.
> Basado en: PDA.md · ADR-001 · ADR-002 · ADR-003 · ADR-004 · ADR-005 · ADR-006 · ADR-007
> Estado: Propuesta para revisión y aprobación.
> Restricción: Este documento NO define tablas, entidades, código, APIs, JWT, permisos técnicos, infraestructura ni implementación.
> Este documento es prerequisito para los módulos de Expedientes, Resoluciones, Firma Digital, Reclamos, Trámites y Gobierno Electrónico.

---

## Resumen Ejecutivo

ADR-007 estableció que la posición organizacional existe con independencia de quien la ocupa: tiene historial propio, puede estar vacante y no se confunde con la persona que la ejerce. Esa decisión resolvió el problema de representar el lugar institucional. Pero deja abierta una pregunta que todo sistema de gobierno digital debe resolver antes de construir expedientes, resoluciones o cualquier mecanismo de firma: ¿qué puede hacer exactamente esa posición? ¿Quién decide en su nombre cuando está vacante? ¿Qué ocurre cuando el titular delega una facultad, se ausenta temporalmente o es reemplazado por sucesión?

Los sistemas de gobierno digital fallan sistemáticamente en este punto porque tienden a resolverlo de la forma más simple e incorrecta: tratan la autoridad como una propiedad de la persona ("el Secretario Pérez puede firmar esto porque es Pérez") en lugar de tratarla como una propiedad de la posición que la persona ejerce mientras la ocupa ("la posición de Secretario de Hacienda puede firmar esto, y en este momento Pérez la ejerce"). Esta diferencia, que parece sutil, determina si el sistema puede sobrevivir a un cambio de gobierno, a una licencia médica, a una vacancia inesperada o a una delegación temporal sin colapsar su lógica de funcionamiento.

La decisión central de este documento es la siguiente:

**La autoridad institucional pertenece a la posición organizacional, no a la persona que la ocupa. Las personas ejercen autoridad mientras ocupan una posición. La autoridad puede delegarse, sustituirse temporalmente o transferirse interinamente bajo reglas explícitas, pero nunca se convierte en propiedad personal del ocupante.**

Este modelo define qué es la autoridad institucional, cómo se diferencia de la autoridad técnica del sistema, qué es una decisión institucional, qué es la firma, qué es la delegación, qué es la sustitución y qué es la cadena de sucesión. Establece, sin ambigüedad, que ninguna de estas categorías equivale a un permiso técnico del sistema Muni Digital, y que todas ellas dependen estructuralmente del modelo de posiciones de ADR-007.

---

## ¿Qué es Autoridad Institucional?

La autoridad institucional es la capacidad reconocida formalmente para tomar decisiones, comprometer a la institución frente a terceros y dirigir a otras posiciones dentro de la estructura organizacional. La autoridad no es un atributo de la persona; es un atributo de la posición que la persona ocupa, conforme a ADR-007.

La autoridad institucional surge de tres fuentes que pueden combinarse: el marco normativo (leyes, ordenanzas, decretos que asignan competencias a determinados cargos), el acto de creación de la posición en el organigrama (que define su ubicación jerárquica y su ámbito de función) y el acto de designación de la persona que la ocupa (que activa el ejercicio de esa autoridad por parte de un individuo concreto).

La autoridad se ejerce dentro de los límites de la función asignada a la posición (ADR-007) y dentro del marco normativo aplicable. Una posición no tiene autoridad ilimitada simplemente por estar alta en la jerarquía: el Intendente tiene autoridad máxima en el ejecutivo municipal, pero esa autoridad está acotada por la Carta Orgánica Municipal, las ordenanzas vigentes y las competencias reservadas al Concejo Deliberante.

### Autoridad Institucional

Es la categoría general: la capacidad de la posición para producir efectos jurídicos y administrativos válidos dentro de la institución. Engloba a las demás categorías de autoridad que se describen a continuación.

### Autoridad Administrativa

Es la capacidad de gestionar los recursos, el personal y los procesos internos de un área o institución: aprobar licencias, autorizar movimientos de personal, gestionar la ejecución presupuestaria dentro del ámbito de competencia. La autoridad administrativa es la más extendida en la estructura organizacional: la tienen Directores, Jefes y Encargados en proporción a su nivel jerárquico.

### Autoridad Operativa

Es la capacidad de decidir sobre la ejecución concreta de tareas y procesos cotidianos sin que esas decisiones tengan trascendencia jurídica externa. Un Jefe que decide el orden de prioridad de las tareas de su equipo ejerce autoridad operativa. La autoridad operativa no requiere necesariamente firma formal ni produce actos administrativos.

### Autoridad Política

Es la capacidad de definir orientaciones, prioridades y decisiones de gobierno que no derivan de la carrera administrativa sino de la confianza política otorgada por la autoridad electa. La tienen el Intendente, los Secretarios y los funcionarios de designación política. La autoridad política puede coexistir con autoridad administrativa en la misma posición (un Secretario tiene autoridad política sobre la orientación de su Secretaría y autoridad administrativa sobre su funcionamiento interno).

### Autoridad Legal

No es una categoría adicional de autoridad sino la condición de validez que atraviesa a las demás: una decisión solo tiene efectos jurídicos válidos si quien la toma tiene la autoridad legalmente reconocida para hacerlo. La autoridad legal es la que determina si un acto administrativo es válido, anulable o nulo según haya sido dictado por la posición competente o por una posición sin competencia para hacerlo.

### Cómo se limita la autoridad

Toda autoridad institucional tiene límites: de materia (sobre qué temas puede decidir), de jerarquía (sobre qué posiciones puede dirigir), de cuantía (hasta qué montos puede comprometer presupuestariamente a la institución) y de procedimiento (qué formalidades debe cumplir para que su decisión sea válida). Estos límites no son una característica opcional del modelo; son la condición misma que distingue una autoridad institucional de un poder arbitrario.

---

## ¿Qué es una Decisión Institucional?

Una decisión institucional es un acto de voluntad de una posición, ejercido por su ocupante, que produce efectos dentro o fuera de la institución y que puede ser atribuido formalmente a esa posición.

### Decisiones Ordinarias

Son las decisiones recurrentes propias del funcionamiento cotidiano de una posición: aprobar una licencia, autorizar un pago dentro del presupuesto asignado, resolver un trámite estándar. Las toma la posición correspondiente conforme a su función asignada (ADR-007), sin requerir habilitación especial adicional a la que ya posee por su ubicación en el organigrama.

### Decisiones Extraordinarias

Son decisiones que exceden el curso ordinario de la función de la posición, sea por su excepcionalidad, por su impacto institucional o por estar expresamente reservadas a un nivel jerárquico superior. Declarar una emergencia, autorizar un gasto fuera de lo presupuestado, intervenir un área son decisiones extraordinarias. Quién puede tomarlas depende del marco normativo y de la jerarquía: en general, a mayor excepcionalidad, mayor es el nivel de la posición requerida.

### Decisiones Estratégicas

Son decisiones que definen orientaciones de mediano o largo plazo para la institución o un área significativa de ella: un plan de obras, una reestructuración organizacional, una política sectorial. Las toman las posiciones de conducción política (Intendente, Secretarios) o, en el ámbito del HCD, el cuerpo deliberativo en su conjunto a través de ordenanzas.

### Decisiones Operativas

Son decisiones de ejecución inmediata sobre los procesos de trabajo, sin trascendencia jurídica externa: la organización de tareas, la asignación de turnos, la priorización de expedientes dentro de un área. Las toman las posiciones de menor jerarquía (Jefes, Encargados) dentro del marco que les fijan las posiciones superiores.

### Quién puede tomarlas

La capacidad de tomar cada tipo de decisión está determinada por la función asignada a la posición (ADR-007) y por el marco normativo vigente, no por la persona que ocupa la posición en un momento dado. Si la posición de Director de Obras Públicas tiene competencia para aprobar certificados de obra hasta un monto determinado, esa competencia es de la posición; cualquier persona que la ocupe legítimamente puede ejercerla, y ninguna persona puede ejercerla si no ocupa la posición o no ha recibido delegación válida para hacerlo.

---

## ¿Qué es una Firma Institucional?

La firma institucional es la manifestación formal de que una decisión fue tomada por la posición competente y produce, por ello, efectos jurídicos y administrativos válidos. La firma no es un trazo gráfico ni una credencial técnica: es la representación de que el acto cuenta con la autoridad necesaria para existir válidamente.

### Diferencia entre firma y autorización

La autorización es el acto de habilitar que algo ocurra (por ejemplo, autorizar el uso de un vehículo oficial). La firma es la formalización de que esa autorización, o cualquier otro acto administrativo, fue dictada por la autoridad competente. Puede existir autorización verbal o informal en la operación cotidiana; la firma es siempre la instancia formal que da validez documental al acto.

### Diferencia entre firma y permiso técnico

Esta distinción es crítica y se desarrolla en profundidad más adelante en este documento. La firma es un acto de autoridad institucional: refleja que la posición competente avaló una decisión. El permiso técnico es la capacidad configurada en Muni Digital para que una cuenta ejecute una acción en el sistema (ADR-002, ADR-003). Un usuario puede tener el permiso técnico para registrar una resolución en el sistema sin tener la autoridad institucional para firmarla. La carga en el sistema y la firma del acto son dos cosas distintas que pueden o no coincidir en la misma persona.

### Diferencia entre firma y cargo

El cargo (ADR-007) es la denominación legal y escalafonaria de la posición. La firma es el ejercicio concreto de la autoridad de esa posición en un acto determinado. Tener el cargo de Director no implica automáticamente que se tenga la firma habilitada para todos los actos posibles de esa posición: puede haber actos reservados a instancias superiores, o la persona puede estar inhabilitada transitoriamente para firmar por estar bajo investigación, sin perder el cargo.

### Análisis de la firma en posiciones concretas

El **Intendente** tiene la firma de mayor jerarquía del ejecutivo municipal: decretos, resoluciones de máximo nivel, contratos que comprometen al municipio. Su firma es indelegable en los actos que el marco normativo reserva expresamente al titular del Ejecutivo, y delegable en el resto conforme a las reglas que se establecen en este documento.

El **Secretario** firma dentro del ámbito de competencia de su Secretaría: resoluciones internas, actos de gestión de su área. Su firma deriva de la autoridad política que ejerce y está limitada por la materia de su cartera.

El **Director** firma actos de gestión dentro de su Dirección: certificaciones, informes técnicos, actos administrativos de menor jerarquía que los reservados a Secretario o Intendente.

El **Jefe** generalmente no tiene firma con efectos jurídicos externos plenos; su autoridad se ejerce principalmente sobre actos internos de su unidad, salvo que el marco normativo o una delegación expresa le otorgue facultad de firma sobre actos específicos.

El **Concejal** no firma actos administrativos individuales del Ejecutivo; su forma de manifestar voluntad institucional es el voto dentro del cuerpo deliberativo, que se traduce en ordenanzas firmadas colectivamente conforme al procedimiento legislativo (generalmente con la firma del Presidente del HCD y del Secretario del Cuerpo).

El **Presidente del HCD** firma las comunicaciones oficiales del Concejo, las ordenanzas sancionadas (junto al Secretario del Cuerpo) y representa institucionalmente al HCD en sus relaciones externas. Su firma deriva de la autoridad que el propio cuerpo le delega al elegirlo como su presidente.

---

## ¿Qué es una Delegación?

La delegación es el acto formal por el cual una posición que posee determinada autoridad habilita a otra posición o persona para ejercerla en su nombre, dentro de límites explícitos y por un período determinado o determinable.

La delegación no transfiere la titularidad de la autoridad: la posición delegante sigue siendo la titular de la competencia. Lo que se transfiere es el ejercicio, no la propiedad. Esto es coherente con el principio general del modelo: la autoridad pertenece a la posición, y la delegación es un mecanismo por el cual esa posición permite que su autoridad sea ejercida, en ciertos actos, por otra posición.

### Delegación Parcial

Es la delegación de una porción acotada de la autoridad de una posición, definida por materia, tipo de acto o monto. Un Secretario puede delegar en un Director la firma de actos administrativos de gestión interna, manteniendo para sí la firma de las resoluciones de política sectorial.

### Delegación Total

Es la delegación de la totalidad de la autoridad de una posición sobre un ámbito determinado, generalmente asociada a circunstancias de ausencia prolongada del titular. Es menos frecuente que la delegación parcial y suele superponerse conceptualmente con la sustitución (que se analiza en la sección siguiente), aunque son mecanismos distintos: la delegación total mantiene al delegante como titular de la competencia; la sustitución habilita a otra posición a actuar como si fuera el titular durante el período de sustitución.

### Delegación Temporal

Es la delegación acotada en el tiempo, con fecha de inicio y fecha de fin determinada o determinable (por ejemplo, mientras dure un viaje oficial o un proceso específico). Es la forma más común de delegación en la operación municipal.

### Delegación Funcional

Es la delegación asociada a una función específica y recurrente, no a un período de tiempo acotado: por ejemplo, delegar de forma permanente la firma de los actos de mero trámite de un área en el Jefe correspondiente, manteniendo la firma de los actos de mayor relevancia en el Director. La delegación funcional puede ser de plazo indeterminado pero siempre revocable.

### Qué puede delegarse

Puede delegarse el ejercicio de la autoridad administrativa y operativa, y en ciertos casos la autoridad política dentro de los límites que el marco normativo permita. La delegación debe ser expresa, formal y documentada: no existe delegación tácita o presunta en este modelo.

### Qué no puede delegarse

No puede delegarse la autoridad que el marco normativo reserva expresamente al titular de la posición sin posibilidad de delegación (por ejemplo, ciertos actos que la Carta Orgánica Municipal reserva indelegablemente al Intendente, o las facultades que la normativa reserva al cuerpo deliberativo en su conjunto y no a su Presidente individualmente). No puede delegarse la responsabilidad institucional última por el acto: aunque el ejercicio se delegue, la posición delegante mantiene responsabilidad por haber delegado correctamente y por supervisar el ejercicio delegado.

### Quién puede delegar

Únicamente la posición que es titular de la autoridad puede delegarla. Una posición no puede delegar una autoridad que no posee, ni delegar una autoridad que a su vez le fue delegada (salvo que la delegación original lo autorice expresamente, lo cual es excepcional y debe estar explícitamente habilitado).

### Quién puede recibir delegación

Puede recibir delegación cualquier posición subordinada en la jerarquía a la posición delegante, dentro de los límites que la propia delegación establezca. No es necesario que la posición receptora esté inmediatamente debajo en la jerarquía; puede delegarse a posiciones de nivel intermedio según la materia.

---

## ¿Qué es una Sustitución?

La sustitución es el conjunto de mecanismos por los cuales una posición distinta a la titular ejerce, temporalmente, la totalidad o una parte sustancial de la autoridad de la posición sustituida, generalmente como consecuencia de la ausencia, vacancia o impedimento del titular.

### Suplencia

La suplencia, ya definida conceptualmente en ADR-007 como tipo de vínculo de ocupación, tiene en este documento su correlato de autoridad: durante la suplencia, la persona suplente ejerce la autoridad de la posición suplida con el mismo alcance que tendría el titular, salvo que el marco normativo o el acto de designación de la suplencia establezca límites específicos. El titular mantiene su vínculo con la posición pero no ejerce su autoridad durante el período de suplencia.

### Interinato

El interinato, también definido en ADR-007, implica el ejercicio de la autoridad de una posición vacante por parte de una persona designada interinamente, hasta que se produzca la designación definitiva. El interino ejerce la autoridad de la posición con la plenitud que el acto de designación interina le confiera, que generalmente es equivalente a la del titular salvo limitación expresa.

### Reemplazo

El reemplazo es la sustitución definitiva de una persona por otra en el ejercicio de una posición, sin que medie un período de transición formal de sustitución temporal: el titular anterior cesa y el nuevo titular asume. No debe confundirse con la suplencia ni el interinato, que son por definición temporales.

### Sustitución Automática

La sustitución automática es el mecanismo por el cual el marco normativo o el organigrama institucional establece de antemano que, ante la ausencia o vacancia de una posición, su autoridad es ejercida automáticamente por otra posición determinada, sin necesidad de un acto de designación específico para cada caso. Por ejemplo, la normativa puede establecer que, ante la ausencia del Intendente, asume automáticamente quien ocupe la posición de Presidente del HCD, conforme al orden de sucesión legalmente establecido en el régimen municipal aplicable.

### Consecuencias institucionales

Toda sustitución, cualquiera sea su tipo, debe ser registrada con su causa, su alcance, su fecha de inicio y su condición de finalización. Los actos firmados durante una sustitución tienen la misma validez jurídica que los firmados por el titular, siempre que la sustitución haya sido válidamente constituida conforme al marco normativo y debidamente registrada. La ausencia de registro formal de una sustitución no invalida necesariamente el acto sustantivo, pero compromete gravemente su trazabilidad y su defensa ante un cuestionamiento posterior.

---

## ¿Qué es una Cadena de Sucesión?

La cadena de sucesión es el orden predeterminado conforme al cual la autoridad de una posición pasa a ser ejercida por otra posición ante la vacancia, ausencia o impedimento del titular, cuando no existe una sustitución específica ya constituida.

### Intendente

La cadena de sucesión del Intendente está generalmente definida por la Ley Orgánica de las Municipalidades de la provincia y, en su caso, por la Carta Orgánica Municipal cuando el municipio cuenta con autonomía para dictarla. Habitualmente, ante la ausencia temporal o la vacancia definitiva del Intendente, asume el Presidente del HCD (en muchos regímenes provinciales argentinos) o, según el régimen aplicable, otra autoridad designada por la normativa. Es indispensable que el modelo conceptual reconozca que esta cadena de sucesión proviene del marco normativo externo al sistema, no de una decisión de diseño de Muni Digital: el sistema debe representarla, no inventarla.

### Secretarios

No existe, en general, una cadena de sucesión automática entre Secretarios: la vacancia de una Secretaría es cubierta por designación política del Intendente, no por sucesión automática de otro Secretario. Mientras se produce la nueva designación, la posición puede quedar en estado de vacancia con autoridad residual (ver sección siguiente) o ser cubierta por un interino designado por el Intendente.

### Directores

De manera similar, la sucesión de un Director no es automática: corresponde a la autoridad jerárquica superior (Secretario o Subsecretario) designar un interino o cubrir la vacancia mediante el mecanismo correspondiente (concurso, promoción, designación política según el tipo de posición).

### HCD

La cadena de sucesión dentro del HCD para la Presidencia generalmente está definida por su propio reglamento interno: ante la ausencia o vacancia del Presidente, asume habitualmente el Vicepresidente del Cuerpo, si esa posición existe en el reglamento del Concejo, o quien el propio cuerpo designe conforme a su procedimiento interno. La banca de un Concejal vacante por fallecimiento, renuncia o remoción se cubre conforme al sistema de suplentes de la lista electoral correspondiente, lo cual es un mecanismo distinto al de sucesión jerárquica administrativa: es una sucesión de origen electoral.

### Continuidad institucional

El propósito de la cadena de sucesión es garantizar que la institución nunca quede sin capacidad de decisión en sus posiciones críticas. El modelo debe representar la cadena de sucesión como un atributo de la posición (a quién corresponde sucederla automáticamente según la normativa) independientemente de qué persona ocupe en cada momento la posición sucesora.

### Vacancia inesperada

Cuando una posición queda vacante de forma súbita e imprevista (fallecimiento, renuncia intempestiva, remoción), la cadena de sucesión es el mecanismo que evita la parálisis institucional. El modelo debe permitir registrar la activación de la cadena de sucesión como un evento institucional propio, distinto del registro de la vacancia en sí.

### Ausencia prolongada

Cuando el titular de una posición está ausente por un período prolongado pero no definitivo (licencia médica extendida, comisión de servicio larga), la institución puede optar por activar la cadena de sucesión, designar un interino específico o constituir una sustitución, según lo que el caso y el marco normativo permitan. El modelo debe distinguir estas tres vías como mecanismos disponibles y no equivalentes.

---

## ¿Qué Ocurre Cuando una Posición Queda Vacante?

ADR-007 estableció que una posición puede quedar vacante. Este documento define qué ocurre con la autoridad de esa posición durante la vacancia.

### Autoridad Residual

Es la porción de autoridad que, ante la vacancia, queda en suspenso pero no se transfiere a ninguna otra posición: ningún acto que requiera esa autoridad específica puede dictarse hasta que la posición sea cubierta, salvo que exista delegación, sustitución o sucesión aplicable. La autoridad residual es el estado por defecto cuando ninguno de los otros mecanismos se activa.

### Autoridad Suspendida

Es la autoridad que, durante la vacancia, queda explícitamente congelada por decisión institucional, generalmente en posiciones donde se decide no designar interino mientras se sustancia un proceso (por ejemplo, durante una investigación administrativa que motivó la vacancia). La autoridad suspendida es una decisión deliberada, distinta de la autoridad residual que es simplemente el estado pasivo de ausencia de mecanismo.

### Autoridad Delegada

Si antes de quedar vacante la posición había delegado parte de su autoridad en otra posición (delegación funcional, por ejemplo), esa delegación puede continuar vigente durante la vacancia si así lo permite el acto de delegación original, o puede caducar automáticamente con la vacancia si el acto de delegación estaba condicionado a la persona del delegante (lo cual sería, en rigor, una desviación del principio de que la delegación pertenece a la posición y no a la persona, y debe evitarse en el diseño de los actos de delegación).

### Autoridad Interina

Si se designa un interino conforme a los mecanismos de ADR-007, la autoridad de la posición pasa a ser ejercida por esa persona con el alcance que el acto de designación interina establezca, hasta que la vacancia sea cubierta de forma definitiva.

---

## ¿Qué Ocurre Durante las Licencias?

### Licencia Ordinaria

Durante una licencia ordinaria (vacaciones, licencias breves previstas en el régimen de empleo público), la autoridad de la posición generalmente se transfiere a quien la normativa interna o el organigrama prevean como reemplazo natural (a menudo, el segundo en la línea jerárquica del área), sin requerir un acto formal específico de sustitución si el mecanismo ya está predefinido en el organigrama.

### Licencia Médica

Durante una licencia médica, especialmente si es prolongada, la autoridad de la posición puede ejercerse mediante suplencia formal, designada conforme a los mecanismos correspondientes. Si la licencia médica es breve, puede optarse por la autoridad residual (postergar decisiones no urgentes) combinada con la atención de lo urgente por la línea jerárquica superior.

### Licencia Política

Cuando un funcionario político (Secretario, Director político) se encuentra en licencia por motivos políticos (por ejemplo, para participar de una campaña electoral según lo que la normativa exija), su autoridad puede ser ejercida por quien el Intendente designe interinamente, dado que se trata de una posición de confianza política cuya cobertura no sigue las reglas de la carrera administrativa.

### Comisión de Servicio

Cuando el titular de una posición es asignado temporalmente a otra función (comisión de servicio), su posición de origen entra en un estado de vacancia transitoria que debe resolverse mediante suplencia, interinato o autoridad residual, según la duración y la importancia de la posición. La autoridad de la posición de destino de la comisión depende de si esa comisión implica la ocupación de otra posición formal (en cuyo caso aplica el régimen de ocupación de ADR-007) o si es una asignación funcional sin ocupación formal de una nueva posición.

---

## Relación con ADR-007 — Organizational Position Model

ADR-007 estableció que la posición es un objeto institucional independiente de la persona, con su propio ciclo de vida, su propio historial y su propia ubicación jerárquica. Este documento se apoya en esa base para establecer una distinción adicional, igualmente fundamental:

**La posición no es la autoridad. La posición contiene la autoridad.**

La posición es el lugar institucional (ADR-007). La autoridad es la capacidad de decisión y representación que ese lugar tiene asignada. Una posición puede existir sin que en este momento alguien esté ejerciendo su autoridad (posición vacante con autoridad residual). La autoridad no puede existir sin que exista la posición que la porta: no hay autoridad flotante, sin posición que la sustente.

Esta relación es análoga, pero no idéntica, a la relación entre persona e identidad en ADR-006: así como la identidad representa a la persona dentro del sistema sin ser la persona misma, la autoridad representa la capacidad de decisión de la posición sin ser la posición misma. La posición es el continente institucional; la autoridad es lo que ese continente habilita a hacer.

Todo evento de autoridad (delegación, sustitución, sucesión) presupone la existencia de una posición válida conforme a ADR-007. No puede delegarse la autoridad de una posición que no existe en el organigrama, ni puede constituirse una sustitución sobre una posición que ha sido eliminada.

---

## Relación con ADR-006 — Person & Identity Model

ADR-006 estableció que la persona es la unidad fundamental, que la identidad la representa de forma única dentro del sistema y que ninguno de los dos colapsa con la cuenta ni con el rol técnico. Este documento extiende ese principio a la autoridad:

**La autoridad no pertenece a la identidad. La persona ejerce autoridad. La autoridad no sobrevive a la ocupación.**

Cuando una persona deja de ocupar una posición (por baja, fin de mandato, fin de designación política, conforme a ADR-004 y ADR-007), deja de ejercer la autoridad de esa posición en el mismo instante. La autoridad no es un atributo que la persona conserve como parte de su identidad o de su historial personal: es estrictamente funcional al hecho de ocupar la posición.

Esto tiene una consecuencia práctica relevante: una persona que fue Secretario y dejó de serlo no conserva ningún resto de la autoridad de esa posición, aunque su identidad (ADR-006) conserve el historial de haber ocupado esa posición en el pasado (a través del historial de ocupación de ADR-007). El historial es memoria institucional; la autoridad es ejercicio presente y solo existe mientras la ocupación está activa.

La identidad de la persona es el ancla que permite saber, en cualquier momento del pasado, quién ejercía la autoridad de una posición determinada (a través de la relación entre identidad y vínculo de ocupación de ADR-006 y ADR-007). Pero la identidad en sí misma no porta autoridad: solo la posición la porta, y la persona la ejerce mientras la ocupa.

---

## Relación con ADR-005 — Audit Model

ADR-005 estableció que todo evento con consecuencia institucional debe generar evidencia: un registro con actor identificable, objeto, acción, momento y resultado, conservado de forma inmutable. Este documento define los eventos de autoridad que constituyen auditoría obligatoria conforme a ese marco.

### Auditoría obligatoria para delegaciones

Toda constitución de una delegación (parcial, total, temporal o funcional) es auditoría obligatoria. El registro debe incluir la posición delegante, la posición o persona receptora, el alcance de la delegación, su fundamento normativo o institucional, su fecha de inicio y su condición de finalización.

### Auditoría obligatoria para sustituciones

Toda constitución de una suplencia, interinato o reemplazo es auditoría obligatoria, conforme ya establece ADR-007 para el vínculo de ocupación, y que este documento extiende específicamente al ejercicio de autoridad que esa sustitución habilita.

### Auditoría obligatoria para firmas

Todo acto firmado en ejercicio de autoridad institucional (sea como titular, delegado, suplente o interino) debe quedar registrado con identificación de la posición en cuyo nombre se firma, la persona que ejerce esa posición en el momento de la firma, y el carácter en que firma (titular, delegado, suplente, interino, sucesor).

### Auditoría obligatoria para revocaciones

Toda revocación de una delegación, finalización anticipada de una sustitución o modificación del alcance de una autoridad delegada es auditoría obligatoria. La revocación debe registrar quién la dispuso, cuándo y con qué motivo.

### Auditoría obligatoria para transferencias de autoridad

Toda activación de la cadena de sucesión, toda asignación de autoridad residual a un mecanismo de cobertura y todo cambio en el estado de la autoridad de una posición vacante (de residual a suspendida, de suspendida a interina, etc.) es auditoría obligatoria.

### Valor probatorio de los registros de autoridad

Conforme a los principios de ADR-005, los registros de autoridad tienen valor probatorio cuando permiten reconstruir, sin ambigüedad, quién tenía la facultad de decidir en un momento determinado y en virtud de qué título (titularidad, delegación, sustitución, sucesión). Esta capacidad de reconstrucción es esencial para la validez jurídica de cualquier acto administrativo cuestionado y para la defensa institucional del municipio ante reclamos o procesos judiciales.

---

## Relación con ADR-002 y ADR-003 — Security Model y Permissions Matrix

Este es el punto del documento que requiere mayor precisión conceptual, porque es donde la confusión entre autoridad institucional y permiso técnico produce los errores más graves del sistema.

**La autoridad institucional no equivale a permisos técnicos.**

ADR-002 estableció cuatro roles técnicos (SUPERADMIN, ADMIN, INTERNO, CIUDADANO) que determinan qué puede hacer un actor dentro del sistema Muni Digital. ADR-003 estableció que esos roles se combinan con el contexto organizacional (institución y área) para definir permisos concretos sobre dominios funcionales. Ninguno de los dos modelos tiene relación directa con la autoridad institucional que define este documento.

### Ejemplo 1 — El Intendente con rol técnico limitado

El Intendente tiene la autoridad institucional máxima del ejecutivo municipal: puede firmar decretos, comprometer al municipio en contratos, dirigir a todas las Secretarías. En el sistema Muni Digital, sin embargo, puede tener configurado un rol técnico INTERNO con permisos acotados a los módulos que efectivamente utiliza (por ejemplo, la firma digital de resoluciones y la consulta de reportes ejecutivos), sin tener rol ADMIN ni SUPERADMIN. Su autoridad institucional no requiere que tenga acceso técnico irrestricto al sistema.

### Ejemplo 2 — El operador del sistema sin autoridad institucional

Un agente del área de Sistemas puede tener rol técnico ADMIN, con capacidad de crear usuarios, asignar roles y configurar áreas dentro de su institución (ADR-002, ADR-003). Ese mismo agente no tiene ninguna autoridad institucional: no puede firmar un decreto, no puede comprometer al municipio, no puede tomar una decisión administrativa con efectos externos. Su rol ADMIN es exclusivamente técnico, sobre el sistema, no institucional sobre la organización.

### Ejemplo 3 — El delegado de firma sin permiso técnico ampliado

Un Director puede recibir delegación de firma de su Secretario para un conjunto específico de actos administrativos (autoridad institucional delegada). Esto no implica que el sistema deba otorgarle automáticamente permisos técnicos adicionales: el ADMIN de la institución decide separadamente si ese Director necesita, por ejemplo, acceso al módulo de Resoluciones para registrar digitalmente los actos que ahora puede firmar. La delegación de autoridad y la ampliación de permisos técnicos son decisiones independientes que pueden, pero no necesariamente deben, coincidir en el tiempo.

### Ejemplo 4 — El interino con plenitud de autoridad y permisos heredados de su posición propia

Una persona designada interina en la posición de Director mientras mantiene su posición propia de Jefe ejerce, durante el interinato, la plenitud de la autoridad institucional de la Dirección. Sus permisos técnicos en el sistema, sin embargo, no cambian automáticamente por el interinato: siguen siendo los configurados para su cuenta conforme a ADR-002 y ADR-003, salvo que el ADMIN decida expresamente ajustarlos para permitirle ejercer operativamente las funciones del interinato en el sistema.

### Principio general de la relación

La autoridad institucional habilita a decidir y a comprometer a la institución. El permiso técnico habilita a operar el sistema Muni Digital. Una persona puede tener autoridad institucional plena y permisos técnicos mínimos (porque no necesita usar el sistema extensivamente para ejercer su función), o permisos técnicos amplios sin ninguna autoridad institucional (porque su función es exclusivamente la operación técnica del sistema, no la toma de decisiones institucionales). El diseño de Muni Digital debe mantener estos dos planos completamente separados, conforme ya lo estableció ADR-002 para la relación entre rol técnico y cargo institucional, y que este documento extiende ahora a la relación entre rol técnico y autoridad institucional plena.

---

## Análisis de Posiciones Concretas: Autoridad, Responsabilidad, Firma, Delegación y Sucesión

### Intendente

**Autoridad:** Máxima autoridad del Ejecutivo Municipal. Autoridad política, administrativa y de representación institucional externa.

**Responsabilidad:** Responde políticamente ante la ciudadanía (a través del proceso electoral) y legalmente ante los organismos de control por la gestión de los recursos municipales.

**Firma:** Decretos, resoluciones de máximo nivel, contratos que comprometen al municipio. Algunos actos son indelegables conforme al marco normativo provincial y la Carta Orgánica Municipal cuando exista.

**Delegación:** Puede delegar autoridad administrativa y operativa en Secretarios y otras posiciones, dentro de los límites que el marco normativo permita. No puede delegar las facultades que la normativa reserva indelegablemente al cargo.

**Sucesión:** Conforme al régimen municipal provincial aplicable, generalmente sucede el Presidente del HCD u otra autoridad prevista normativamente, ante vacancia o ausencia.

### Secretario

**Autoridad:** Política y administrativa dentro del ámbito de su Secretaría. Deriva de la designación de confianza del Intendente.

**Responsabilidad:** Responde ante el Intendente por la gestión de su Secretaría y, en lo que corresponda, ante los organismos de control.

**Firma:** Resoluciones y actos administrativos dentro de la competencia de su Secretaría.

**Delegación:** Puede delegar autoridad administrativa y operativa en Subsecretarios y Directores de su Secretaría.

**Sucesión:** No tiene sucesión automática entre Secretarios. La vacancia se cubre por nueva designación política del Intendente o por interinato designado por este.

### Subsecretario

**Autoridad:** Política y administrativa dentro del ámbito que el Secretario le asigne, generalmente sobre un subconjunto de la Secretaría.

**Responsabilidad:** Responde ante el Secretario por la gestión del ámbito asignado.

**Firma:** Actos de gestión dentro de su ámbito, conforme a la delegación o competencia que el Secretario le haya reconocido.

**Delegación:** Puede recibir delegación del Secretario y, a su vez, delegar autoridad operativa en Directores bajo su coordinación.

**Sucesión:** No automática; depende de la decisión del Secretario o del Intendente.

### Director

**Autoridad:** Administrativa y operativa dentro de su Dirección. Puede ser de carrera o de designación política según el caso.

**Responsabilidad:** Responde ante su Secretario o Subsecretario por la gestión de su Dirección.

**Firma:** Certificaciones, informes, actos administrativos de gestión interna de su Dirección.

**Delegación:** Puede recibir delegación de su superior jerárquico y delegar autoridad operativa en Jefes de su Dirección.

**Sucesión:** No automática; se cubre por interinato designado por la autoridad superior o por el mecanismo de carrera correspondiente si es posición de carrera.

### Coordinador

**Autoridad:** Funcional sobre procesos o proyectos específicos, no necesariamente jerárquica sobre personas.

**Responsabilidad:** Responde ante la posición de la que depende funcionalmente por el avance y resultado de la coordinación a su cargo.

**Firma:** Generalmente no tiene firma con efectos jurídicos externos; su actuación se traduce en informes y propuestas que son elevados a la posición con autoridad de firma correspondiente.

**Delegación:** Puede recibir delegación operativa acotada a la coordinación específica que ejerce.

**Sucesión:** No aplica de forma estandarizada; depende de la naturaleza del proyecto o función coordinada.

### Jefe

**Autoridad:** Administrativa y operativa sobre el personal de su unidad.

**Responsabilidad:** Responde ante el Director o la autoridad superior de su área por el funcionamiento de su unidad.

**Firma:** Generalmente limitada a actos internos; puede tener firma habilitada sobre actos específicos por delegación expresa.

**Delegación:** Puede recibir delegación de su Director y delegar autoridad operativa en Encargados de su unidad.

**Sucesión:** No automática; cubierta por interinato o por la línea jerárquica superior.

### Encargado

**Autoridad:** Operativa sobre un proceso o grupo reducido de personas dentro de un área.

**Responsabilidad:** Responde ante el Jefe o la autoridad jerárquica inmediata superior.

**Firma:** No tiene, en general, firma con efectos jurídicos formales; su actuación es de supervisión operativa cotidiana.

**Delegación:** Puede recibir delegación operativa muy acotada; rara vez delega a su vez, salvo en estructuras con mayor profundidad jerárquica.

**Sucesión:** No formalizada; generalmente resuelta informalmente por la línea jerárquica superior ante ausencia.

### Agente

**Autoridad:** Ninguna autoridad de decisión institucional ni de dirección sobre otras posiciones. Ejecuta tareas conforme a las instrucciones de las posiciones de conducción.

**Responsabilidad:** Responde por la correcta ejecución de las tareas que le son asignadas.

**Firma:** No tiene firma con efectos institucionales, salvo en actos de mero trámite que la normativa específicamente le habilite (por ejemplo, la firma de la recepción de documentación en mesa de entradas, que no constituye un acto de autoridad institucional sino de constancia material).

**Delegación:** No delega, por no tener autoridad propia que delegar. Puede recibir tareas delegadas operativamente, lo cual no constituye delegación de autoridad en el sentido de este documento.

**Sucesión:** No aplica.

### Concejal

**Autoridad:** Legislativa, ejercida colectivamente a través del voto dentro del cuerpo deliberativo, no individualmente sobre actos administrativos del Ejecutivo.

**Responsabilidad:** Responde políticamente ante el electorado que lo eligió y, en lo institucional, ante el propio cuerpo conforme a su reglamento interno.

**Firma:** No firma actos administrativos individuales; su manifestación de voluntad es el voto, registrado en las actas de sesión.

**Delegación:** No delega su banca ni su voto; la representación política es personal e indelegable conforme al mandato electivo recibido.

**Sucesión:** Su banca, en caso de vacancia, se cubre por el sistema de suplentes de la lista electoral correspondiente, conforme al régimen electoral aplicable, no por una cadena de sucesión jerárquica administrativa.

### Presidente del HCD

**Autoridad:** Institucional sobre el funcionamiento del Concejo: preside sesiones, ordena el debate, representa al cuerpo externamente. Es una autoridad delegada por el propio cuerpo al elegirlo.

**Responsabilidad:** Responde ante el plenario del Concejo por la conducción del cuerpo.

**Firma:** Firma las comunicaciones oficiales del HCD y las ordenanzas sancionadas, generalmente junto al Secretario del Cuerpo, conforme al reglamento interno.

**Delegación:** Puede delegar funciones de conducción de sesión en el Vicepresidente cuando el reglamento interno lo prevea, pero no delega su representación institucional externa salvo casos expresamente previstos.

**Sucesión:** Conforme al reglamento interno del HCD, generalmente sucede el Vicepresidente del Cuerpo o quien el propio cuerpo designe ante vacancia o ausencia de la Presidencia.

---

## Riesgos

### CRÍTICO

**Autoridad ligada a la persona en lugar de a la posición.** Si el sistema o la práctica institucional asocian la autoridad a la persona ("esto lo puede aprobar Fulano" en lugar de "esto lo puede aprobar quien ocupe la Dirección de Obras Públicas"), la institución queda paralizada cada vez que esa persona se ausenta, renuncia o es reemplazada, porque nadie sabe con certeza quién hereda esa autoridad. Este es el error conceptual que todo el documento busca prevenir.

**Delegaciones sin registro formal.** Si las delegaciones de autoridad se otorgan verbalmente o por práctica informal sin quedar registradas, ningún acto firmado en virtud de esa delegación puede sostenerse ante un cuestionamiento posterior. La institución queda expuesta a la nulidad de los actos y a la imposibilidad de determinar responsabilidades.

**Firmas sin autoridad habilitante.** Si el sistema permite que se registre como firmado un acto sin verificar que quien firma tenía, en ese momento, la autoridad institucional (como titular, delegado, suplente, interino o sucesor) para hacerlo, se generan actos potencialmente nulos sin que el sistema lo detecte ni lo señale.

**Autoridad técnica confundida con autoridad institucional.** Si se asume que tener rol ADMIN o SUPERADMIN en el sistema (ADR-002) equivale a tener autoridad institucional para decidir, firmar o comprometer a la institución, se produce una usurpación de hecho de la autoridad institucional por parte de quien simplemente administra el sistema técnico. Es el error inverso y igualmente grave al anterior: confundir el plano técnico con el plano institucional en cualquiera de las dos direcciones es crítico.

**Vacancias sin mecanismo de sucesión o cobertura.** Si una posición crítica queda vacante y no existe cadena de sucesión definida, ni mecanismo de interinato, ni delegación previa que cubra la función, la institución queda sin capacidad de decisión en esa materia. Esto es particularmente grave en posiciones de conducción política o de firma de actos urgentes.

### ALTO

**Delegación que sobrevive a quien la otorgó sin revisión.** Si una delegación de autoridad queda vigente indefinidamente después de que la posición delegante cambia de ocupante, sin que el nuevo ocupante la revise o ratifique, se corre el riesgo de que personas sigan ejerciendo autoridad delegada por una decisión de una gestión anterior que ya no responde a la voluntad institucional vigente.

**Sustitución sin límite de alcance definido.** Si una suplencia o interinato se constituye sin precisar exactamente qué autoridad se transfiere (la totalidad de la posición o solo una parte de su competencia), el sustituto puede ejercer facultades que no le correspondían o, a la inversa, abstenerse de ejercer facultades que sí debía asumir, generando vacíos de decisión.

**Confusión entre autoridad delegada y permiso técnico ampliado.** Si delegar autoridad institucional se traduce automáticamente, sin decisión separada del ADMIN, en una ampliación de permisos técnicos en el sistema, se produce una expansión de acceso no controlada que viola el principio de menor privilegio de ADR-002.

**Cadena de sucesión no documentada en el organigrama.** Si la cadena de sucesión de las posiciones críticas no está explícitamente registrada como atributo de la posición conforme a ADR-007, su aplicación ante una vacancia inesperada depende de que alguien recuerde correctamente el marco normativo aplicable en el momento de la urgencia, lo cual es una práctica de alto riesgo institucional.

**No distinguir el carácter de la firma (titular, delegado, suplente, interino, sucesor).** Si el registro de un acto firmado no indica en qué carácter actuó el firmante, la reconstrucción posterior de la cadena de responsabilidad es ambigua y debilita el valor probatorio del acto ante un cuestionamiento.

### MEDIO

**Delegaciones parciales mal delimitadas en su alcance.** Si la delegación parcial no especifica con precisión qué materias, montos o tipos de acto cubre, se generan zonas grises donde no está claro si el delegado tenía o no la facultad para el acto específico que firmó.

**Falta de revisión periódica de delegaciones vigentes.** Si no existe un proceso de revisión periódica de las delegaciones activas, estas pueden acumularse y volverse inconsistentes con la estructura organizacional vigente, especialmente después de reestructuraciones.

**Autoridad residual prolongada sin evaluación.** Si una posición queda en estado de autoridad residual (vacante, sin sucesión ni interinato) por un período extendido sin que la institución evalúe activamente la situación, decisiones necesarias quedan postergadas indefinidamente sin que haya una decisión consciente de postergarlas.

**Ambigüedad entre coordinación funcional y autoridad jerárquica.** Si no se distingue claramente que el Coordinador ejerce autoridad funcional sobre procesos y no necesariamente autoridad jerárquica sobre personas, se generan conflictos de mando con los Jefes o Directores de las áreas involucradas en la coordinación.

### BAJO

**Nomenclatura inconsistente para los tipos de delegación entre distintas áreas.** No constituye un riesgo institucional grave, pero dificulta la estandarización de los registros y la generación de reportes consolidados sobre el estado de las delegaciones vigentes.

**Documentación de la cadena de sucesión dispersa en múltiples normas.** Si el fundamento normativo de cada sucesión está disperso en distintas leyes, ordenanzas y reglamentos sin una referencia centralizada, la consulta operativa es menos eficiente, aunque no afecta la validez del mecanismo en sí.

---

## Principios del Modelo

### Autoridad ligada a la posición

La autoridad institucional es un atributo de la posición organizacional (ADR-007), no de la persona que la ocupa. Este es el principio fundacional de todo el documento y el que resuelve la mayoría de los riesgos identificados.

### Continuidad institucional

La institución debe poder seguir funcionando y decidiendo aun cuando una posición quede vacante, su titular se ausente o sea reemplazado. Los mecanismos de delegación, sustitución y sucesión existen precisamente para garantizar esta continuidad.

### Delegación explícita

Ninguna autoridad se transfiere de forma tácita o presunta. Toda delegación, sustitución o activación de sucesión debe constituirse mediante un acto formal, documentado y con alcance definido.

### Trazabilidad

Todo acto de autoridad —su ejercicio, su delegación, su sustitución, su revocación— debe poder reconstruirse en el tiempo: quién lo ejerció, en virtud de qué título y dentro de qué límites.

### Responsabilidad

La responsabilidad institucional por una decisión recae sobre la posición que la tomó y, en última instancia, sobre la persona que la ejerció en el momento del acto, conforme al carácter en que actuaba (titular, delegado, suplente, interino, sucesor).

### No repudio institucional

Una posición, a través de quien la ejerce en cada momento, no puede negar haber tomado una decisión válidamente registrada conforme a este modelo y a ADR-005. El no repudio aplicado a la autoridad institucional es la extensión natural del no repudio aplicado a la identidad en ADR-006.

### Separación entre autoridad y permisos

La autoridad institucional y los permisos técnicos del sistema (ADR-002, ADR-003) son dimensiones completamente independientes. Ninguna decisión de diseño puede hacer que una derive automáticamente de la otra.

### Temporalidad de la delegación

Toda delegación, salvo la delegación funcional de carácter permanente y expresamente así constituida, tiene un horizonte temporal definido o determinable. La delegación no es, por defecto, indefinida.

### Cadena de sucesión

Toda posición crítica para la continuidad institucional debe tener, en la medida en que el marco normativo lo prevea, una cadena de sucesión explícitamente documentada que se active automáticamente ante vacancia o ausencia, sin requerir improvisación institucional en el momento de la urgencia.

### Gobernanza

El conjunto de reglas que rigen la autoridad, la delegación y la sucesión debe ser conocido, consistente y aplicado de forma uniforme en toda la institución. La gobernanza de la autoridad no es un asunto exclusivamente legal: es un componente central de la arquitectura institucional que este modelo representa.

---

## Organizational Authority & Delegation Model v1 Recomendado

El modelo conceptual de autoridad, delegación y sucesión de Muni Digital se define de la siguiente manera:

### La autoridad como atributo de la posición

La autoridad institucional pertenece a la posición organizacional definida en ADR-007. Se compone de autoridad administrativa, operativa y, cuando corresponda, política, dentro de los límites de materia, jerarquía, cuantía y procedimiento que el marco normativo y la función asignada a la posición establecen. La autoridad legal no es una categoría adicional sino la condición de validez que atraviesa a las demás.

### El ejercicio como vínculo entre persona y autoridad

La persona ejerce la autoridad de la posición mientras la ocupa, conforme al vínculo de ocupación de ADR-007. El ejercicio puede ser como titular, como delegado, como suplente, como interino o como sucesor activado por la cadena de sucesión. El carácter del ejercicio debe quedar siempre explícito en todo acto registrado.

### La firma como manifestación formal de autoridad válida

La firma institucional es la representación formal de que un acto fue dictado por la posición competente, a través de quien la ejercía válidamente en ese momento. La firma se distingue de la autorización informal, del permiso técnico del sistema y de la mera tenencia del cargo.

### La delegación como transferencia de ejercicio sin transferencia de titularidad

La delegación, en sus formas parcial, total, temporal o funcional, transfiere el ejercicio de una porción de la autoridad a otra posición, sin que la posición delegante pierda la titularidad de la competencia ni la responsabilidad última de haber delegado correctamente. Toda delegación es explícita, formal, documentada y, salvo excepción expresa, temporalmente acotada.

### La sustitución como cobertura temporal de la posición

La suplencia, el interinato, el reemplazo y la sustitución automática son los mecanismos por los cuales la autoridad de una posición es ejercida temporalmente por una persona distinta al titular, conforme a las reglas ya establecidas en ADR-007 para el vínculo de ocupación y extendidas en este documento al ejercicio de autoridad que ese vínculo habilita.

### La sucesión como garantía de continuidad institucional

Toda posición crítica tiene, en la medida en que el marco normativo lo prevea, una cadena de sucesión documentada como atributo propio de la posición, que se activa ante vacancia o ausencia sin requerir un acto de designación específico para cada caso, garantizando que la institución no quede sin capacidad de decisión.

### La separación absoluta respecto de los permisos técnicos

La autoridad institucional, en todas sus formas (titular, delegada, sustituida, sucedida), es completamente independiente de los roles y permisos técnicos del sistema definidos en ADR-002 y ADR-003. Ninguna implementación futura puede derivar automáticamente unos de otros.

### La auditoría como condición de validez

Todo evento de autoridad —constitución, ejercicio, delegación, sustitución, revocación, sucesión— es auditoría obligatoria conforme a ADR-005, con identificación inequívoca de la posición involucrada, la persona que actuó, el carácter en que lo hizo y el fundamento de su autoridad para hacerlo.

---

## Roadmap Conceptual

### P0 — Aprobación conceptual

**Objetivo:** Validar y aprobar este documento como fuente de verdad para la autoridad institucional, la delegación, la sustitución y la sucesión en Muni Digital.

Dependencias: ADR-001 a ADR-007 aprobados. Este documento revisado por el equipo de arquitectura, los referentes legales o de asesoría jurídica municipal (dado que la cadena de sucesión y los límites de autoridad derivan en gran medida del marco normativo provincial y municipal) y los referentes institucionales de las instituciones que operarán en Muni Digital.

Criterio de cierre: El equipo puede responder sin ambigüedad qué es la autoridad institucional, cómo se diferencia de la autoridad técnica, qué es una delegación, qué es una sustitución, qué es una cadena de sucesión y por qué ninguna de estas categorías equivale a un permiso técnico. Los referentes legales confirman que el modelo es compatible con el marco normativo aplicable a Muni Digital, sin que este documento pretenda sustituir ni interpretar dicho marco, sino representarlo conceptualmente.

Riesgo: CRÍTICO si los módulos de Expedientes, Resoluciones o Firma Digital inician su diseño técnico sin este modelo aprobado. La ausencia de un modelo de autoridad claro obliga a esos módulos a tomar decisiones de diseño ad hoc sobre quién puede firmar qué, lo cual reproduce exactamente los riesgos críticos identificados en este documento.

---

### P1 — Diseño conceptual de autoridad

**Objetivo:** Traducir el modelo conceptual en decisiones de diseño técnico: cómo se representa la autoridad como atributo de la posición, cómo se modelan los distintos tipos de delegación y sustitución, cómo se registra el carácter del ejercicio en cada acto, cómo se documenta la cadena de sucesión.

Dependencias: P0 cerrado. ADR-007 implementado en su diseño técnico (modelo de posiciones disponible para anclar la autoridad). ADR-005 implementado en su diseño técnico (capa de auditoría disponible para registrar los eventos de autoridad).

Criterio de cierre: El diseño técnico mantiene la autoridad como atributo de la posición, no de la persona ni de la cuenta de usuario. El diseño distingue los cuatro tipos de delegación y los cuatro mecanismos de sustitución definidos en este documento. El diseño permite registrar el carácter del ejercicio (titular, delegado, suplente, interino, sucesor) en cada acto. El diseño no introduce ninguna relación automática entre autoridad institucional y permisos técnicos.

Riesgo: ALTO. Es el momento donde la presión de simplicidad técnica puede llevar a representar la autoridad como un simple campo de texto libre asociado a la posición, sin estructura para los tipos de delegación, sin distinción de carácter de ejercicio y sin vínculo robusto con la cadena de sucesión, lo cual vacía de contenido real al modelo conceptual aprobado en P0.

Archivos conceptuales que debe cubrir el diseño: modelo de autoridad institucional vinculado a la posición (ADR-007), modelo de delegación con sus cuatro tipos y su alcance, modelo de sustitución integrado con el vínculo de ocupación de ADR-007, modelo de cadena de sucesión como atributo de la posición, modelo de registro de carácter de ejercicio para su uso en actos firmados, integración con la capa de auditoría de ADR-005.

---

### P2 — Implementación del núcleo de autoridad

**Objetivo:** El sistema puede registrar la autoridad de cada posición, constituir y revocar delegaciones, constituir sustituciones con su alcance definido, activar la cadena de sucesión ante vacancia y registrar el carácter de ejercicio en cada acto de autoridad.

Dependencias: P1 cerrado.

Criterio de cierre: Es posible delegar una porción específica de la autoridad de una posición en otra posición, con fecha de inicio y fin, y queda registrado en auditoría obligatoria. Es posible constituir una suplencia o un interinato con su alcance de autoridad explícito. Ante la vacancia de una posición con cadena de sucesión documentada, el sistema puede representar la activación de esa sucesión sin requerir un acto de diseño ad hoc. Ningún mecanismo de delegación o sustitución modifica automáticamente los permisos técnicos de ninguna cuenta.

Rollback: Si P2 introduce alguna relación automática entre autoridad institucional y permisos técnicos, o si el carácter de ejercicio no queda registrado en los actos, revertir el módulo afectado hasta corregir. Un sistema que no puede demostrar quién tenía autoridad para firmar un acto determinado no debe liberarse a producción.

---

### P3 — Integración con RRHH, Organigrama, Expedientes y Auditoría

**Objetivo:** Los módulos de RRHH y Organigrama (apoyados en ADR-004 y ADR-007) reflejan la autoridad vigente de cada posición y sus delegaciones y sustituciones activas. El módulo de Expedientes y el futuro módulo de Resoluciones y Firma Digital pueden verificar, antes de aceptar un acto como válido, que quien lo firma tiene la autoridad institucional habilitante en ese momento, en el carácter que corresponda. La auditoría institucional de ADR-005 cubre la totalidad de los eventos de autoridad definidos en este documento.

Dependencias: P2 cerrado. ADR-004 y ADR-007 implementados (módulo de empleado y de posiciones). ADR-005 implementado (auditoría).

Criterio de cierre: Un Expediente o una Resolución firmada por un Director que actuaba como interino de un Secretario queda registrado con el carácter correcto y puede verificarse, en cualquier momento posterior, que esa autoridad estaba válidamente constituida en el momento de la firma. El organigrama puede mostrar, junto a cada posición, su estado de autoridad vigente (ejercida por el titular, delegada parcialmente, sustituida, en sucesión activada). La auditoría de autoridad es consultable por el ADMIN de cada institución y por el SUPERADMIN conforme a las reglas de acceso de ADR-005.

---

> Este documento define el modelo conceptual de autoridad institucional, delegación, sustitución y sucesión de Muni Digital v1.
> No debe modificarse sin revisión del equipo de arquitectura, los referentes legales y aprobación formal.
> Extiende ADR-001, ADR-002, ADR-003, ADR-004, ADR-005, ADR-006 y ADR-007 sin contradecirlos.
> Es prerequisito para los módulos de Expedientes, Resoluciones, Firma Digital, Reclamos, Trámites y Gobierno Electrónico.
> Próximo documento recomendado: ADR-009 — Administrative Act & Resolution Model v1.