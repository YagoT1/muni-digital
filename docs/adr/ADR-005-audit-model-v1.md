# ADR-005 — Audit Model v1 — Muni Digital

> Documento conceptual del modelo de auditoría institucional.
> Basado en: PDA.md · ADR-001 · ADR-002 · ADR-003 · ADR-004
> Estado: Propuesta para revisión y aprobación.
> Restricción: Este documento NO define tablas, entidades, código, APIs, infraestructura ni implementación.
> Sirve de base para: ADR-006 User Identity Model.

---

## Resumen Ejecutivo

La auditoría en sistemas municipales no es una función técnica opcional. Es una obligación institucional. El municipio opera con fondos públicos, toma decisiones que afectan a ciudadanos y gestiona información sensible sobre personas. Cada acción relevante del sistema debe poder responderse con evidencia: quién lo hizo, cuándo, sobre qué y con qué autoridad.

El error más frecuente en sistemas de gobierno digital es diseñar la auditoría como un log técnico de bajo nivel: registros de base de datos, errores de sistema, timestamps de sesión. Ese log tiene valor operativo para el equipo de desarrollo pero no tiene valor institucional. No puede presentarse ante un organismo de control, un proceso judicial ni una auditoría administrativa porque no responde preguntas institucionales; responde preguntas técnicas.

La decisión central de este documento es la siguiente:

**La auditoría en Muni Digital es un registro de evidencia institucional. Su propósito no es el monitoreo técnico del sistema; es la trazabilidad de las decisiones y acciones que tienen consecuencias administrativas, laborales, legales o de seguridad. Cada evento auditable es un hecho institucional, no un evento de software.**

Este modelo extiende ADR-002 (que establece auditoría obligatoria para ciertas acciones) y ADR-003 (que clasifica acciones por nivel de auditoría requerido), y los integra en un marco conceptual unificado que define qué es evidencia, cómo se genera, quién puede accederla y bajo qué condiciones conserva validez.

---

## Definición de Auditoría Institucional

La auditoría institucional es el conjunto de mecanismos que permiten reconstruir, con certeza razonable, la historia de decisiones y acciones relevantes tomadas dentro del sistema, identificando en cada caso el actor responsable, el momento en que ocurrió, el objeto sobre el que actuó y el resultado producido.

La auditoría institucional no es sinónimo de vigilancia. No registra todo lo que ocurre en el sistema. Registra lo que tiene consecuencias institucionales: lo que modifica el estado de algo que importa al municipio, a sus empleados o a sus ciudadanos.

La auditoría institucional tampoco es diagnóstico técnico. Los registros técnicos (performance, errores de sistema, latencia) tienen su propio ciclo y propósito. No forman parte de la auditoría institucional aunque compartan infraestructura de almacenamiento.

---

## Tipos de Auditoría

### Auditoría Administrativa

Registra las acciones sobre la estructura organizacional y la gestión del personal: altas, bajas, movimientos, licencias, cambios de cargo, cambios de área. Su propósito es garantizar que toda modificación en la situación laboral de una persona tiene respaldo documental y trazabilidad completa. Es el soporte del legajo institucional.

### Auditoría Operativa

Registra las acciones sobre los procesos del municipio: reclamos ciudadanos, expedientes administrativos, resoluciones, derivaciones. Su propósito es garantizar que cada trámite puede reconstruirse desde su inicio hasta su resolución, identificando quién intervino en cada etapa y qué decisión tomó.

### Auditoría de Seguridad

Registra las acciones sobre el sistema de acceso: creación y baja de usuarios, asignación y revocación de roles, modificación de permisos, exportaciones de datos, accesos a información sensible. Su propósito es garantizar que el modelo de seguridad aprobado (ADR-002) se cumple en la práctica y que cualquier desvío puede detectarse.

### Auditoría Legal

No es un tipo separado de registro sino el conjunto de condiciones que debe cumplir cualquier registro para tener valor probatorio ante organismos externos: completitud, integridad, no repudio, conservación adecuada. La auditoría legal no genera eventos propios; determina los requisitos que deben cumplir los registros generados por los otros tres tipos.

### Relación entre los tipos

Los cuatro tipos comparten el mismo principio: el registro de un hecho institucional con identificación del actor, el objeto, el momento y la consecuencia. Se diferencian en el dominio funcional sobre el que actúan y en el propósito primario del registro.

Un mismo evento puede cruzar tipos. El alta de un usuario es auditoría de seguridad (se otorga acceso al sistema) y auditoría administrativa (un empleado comienza a operar en el sistema). Un movimiento de personal es auditoría administrativa (cambia la situación laboral) y auditoría de seguridad (sus permisos cambian). El modelo no obliga a elegir un tipo; los registros responden a todos los tipos que correspondan.

---

## Eventos Auditables

### Qué constituye un evento auditable

Un evento auditable es una acción que modifica el estado de algo con consecuencia institucional, o el acceso a información cuya consulta tiene relevancia por la sensibilidad del dato o la posición del actor.

Un evento auditable tiene cinco componentes obligatorios:

El **actor** es la persona o cuenta técnica que ejecutó la acción. Debe ser identificable de forma unívoca. Sin actor identificable, el evento no puede ser evidencia.

El **objeto** es aquello sobre lo que se actuó: un usuario, un empleado, un expediente, un permiso, una configuración. El objeto debe ser identificable de forma unívoca.

La **acción** describe qué se hizo sobre el objeto: se creó, modificó, desactivó, consultó, exportó, aprobó, rechazó.

El **momento** es la marca temporal del evento. Debe ser confiable y no manipulable por el actor que generó el evento.

El **resultado** indica si la acción se completó, falló o fue rechazada. Las acciones fallidas o rechazadas también son evidencia institucional relevante: un intento de acceso no autorizado tiene valor de auditoría aunque no haya producido cambio.

### Cuándo un evento genera evidencia

Un evento genera evidencia cuando cumple los cinco componentes anteriores y está clasificado en las categorías de auditoría obligatoria o recomendada. La evidencia es el registro completo e íntegro del evento, almacenado de forma que no pueda ser alterado por ningún actor del sistema.

### Cuándo un evento no genera evidencia

Un evento no genera evidencia cuando es de naturaleza puramente técnica (error de conexión, timeout de sesión, operación de caché), cuando no tiene consecuencia institucional (lectura de información pública no sensible por un ciudadano no identificado) o cuando está clasificado en la categoría sin auditoría.

---

## Clasificación de Eventos

### Auditoría Obligatoria

Estos eventos deben registrarse siempre, automáticamente, sin posibilidad de deshabilitación por ningún actor, incluyendo el SUPERADMIN. La omisión de cualquiera de estos registros invalida la trazabilidad institucional.

**Gestión de acceso:**
Creación de usuarios. Modificación de usuarios. Desactivación y reactivación de usuarios. Asignación de roles técnicos. Revocación de roles técnicos. Asignación de permisos individuales fuera del perfil de área. Revocación de permisos individuales. Toda acción ejecutada con rol SUPERADMIN. Toda acción ejecutada con rol ADMIN sobre usuarios de su institución. Intentos de acceso denegado a cualquier recurso.

**Gestión de personal:**
Ingreso de empleados. Movimientos de personal (cambio de área, cambio de cargo). Inicio y cierre de licencias. Baja laboral. Modificaciones al legajo individual.

**Gestión organizacional:**
Creación y modificación de instituciones. Creación y modificación de áreas. Cambios en la estructura jerárquica organizacional.

**Operación administrativa:**
Creación de expedientes. Aprobaciones y rechazos formales en cualquier dominio. Resoluciones firmadas. Derivaciones entre áreas o instituciones.

**Acceso a información sensible:**
Toda consulta al dominio de Personal y Legajos (conforme a Permissions Matrix v1). Toda exportación de datos de cualquier dominio. Acceso al registro de auditoría por parte de cualquier actor.

**Configuración del sistema:**
Cambios en parámetros globales. Habilitación o deshabilitación de módulos por institución.

### Auditoría Recomendada

Estos eventos deben registrarse en la mayoría de las implementaciones. Su omisión no invalida inmediatamente la trazabilidad pero reduce la capacidad de reconstrucción de la historia operativa.

Modificaciones en expedientes existentes. Cambios de estado en reclamos y solicitudes ciudadanas. Consultas individuales de legajos por INTERNOs del área de RRHH. Generación de reportes agregados con datos de personal. Cambios en la configuración de áreas dentro de una institución. Inicio de trámites ciudadanos formales. Derivaciones internas dentro de una misma área.

### Auditoría Opcional

Estos eventos pueden registrarse según la política de cada institución. Su valor varía según el contexto operativo.

Consultas de información pública por ciudadanos identificados. Consultas de estado de trámites propios por ciudadanos. Acceso a módulos de solo lectura por INTERNOs con perfil estándar. Generación de reportes de uso frecuente sin datos sensibles. Inicio y cierre de sesión para usuarios con rol INTERNO.

### Sin Auditoría

Estos eventos no generan registros de auditoría institucional.

Errores técnicos del sistema sin consecuencia operativa. Operaciones de mantenimiento automatizado del sistema. Consultas de información completamente pública por actores no identificados. Eventos de monitoreo técnico de performance e infraestructura.

---

## Actores Auditables

La auditoría siempre tiene un actor. Sin actor identificable, no hay evidencia institucional.

**Ciudadano:** Sus acciones se registran cuando inician trámites formales o acceden a información que genera consecuencias administrativas. La consulta del estado de un trámite propio es auditoría opcional. La presentación formal de un reclamo es auditoría obligatoria.

**INTERNO:** Sus acciones se registran según el dominio en el que operan y el nivel de sensibilidad. En dominios de alta sensibilidad (Personal y Legajos), toda acción es auditoría obligatoria. En dominios operativos estándar, los cambios de estado y aprobaciones son auditoría obligatoria; las consultas son auditoría recomendada.

**ADMIN:** Toda acción de un ADMIN es auditoría obligatoria sin excepción. El ADMIN gestiona accesos y estructura organizacional; sus decisiones tienen consecuencias directas sobre la seguridad y la operación institucional.

**SUPERADMIN:** Toda acción del SUPERADMIN es auditoría obligatoria sin excepción y debe incluir justificación cuando la acción sea sobre datos de una institución específica. El SUPERADMIN tiene el mayor nivel de privilegio; sus acciones requieren el mayor nivel de trazabilidad.

**Funcionario Político:** Sus acciones sobre expedientes, resoluciones y actos administrativos son auditoría obligatoria. Son la firma institucional del municipio; su trazabilidad tiene valor legal directo.

**Empleado (sin acceso técnico al sistema):** Las acciones registradas sobre su legajo por otros actores (RRHH, ADMIN) generan evidencia que lo involucra como objeto de la acción. No genera eventos propios pero es objeto auditable.

**Concejal:** Sus acciones dentro del contexto HCD siguen las mismas reglas que los INTERNOs del HCD en términos de auditoría. Sus actos formales (votos, presentaciones, resoluciones) son auditoría obligatoria.

**Cuentas técnicas:** Toda acción de una cuenta técnica (integración, proceso automatizado) es auditoría obligatoria. Las cuentas técnicas no tienen rol SUPERADMIN ni ADMIN. Sus acciones deben estar acotadas al dominio funcional de la integración y deben ser identificables de forma unívoca como actor no humano.

**Integraciones con sistemas externos:** Cuando sistemas externos consumen o modifican datos de Muni Digital, el evento se registra con la identificación de la integración como actor, el tipo de operación y los datos afectados. Una integración no puede ser actor anónimo.

---

## Acceso a Auditoría

### Quién puede consultar auditorías

El SUPERADMIN puede consultar la auditoría de cualquier institución, en cualquier dominio, sin restricción. Toda consulta del SUPERADMIN a registros de auditoría genera a su vez un registro de auditoría (el acceso a auditoría es en sí mismo auditable).

El ADMIN puede consultar la auditoría de su propia institución, en todos los dominios. No puede consultar auditorías de otras instituciones.

Los INTERNOs con función específica de control interno o auditoría institucional (configurada explícitamente por el ADMIN) pueden consultar auditorías del dominio que les corresponda dentro de su institución. Este acceso es la excepción, no la regla, y requiere asignación explícita.

Los organismos de control externos (Tribunal de Cuentas, auditorías provinciales, Fiscalía) acceden a través de un proceso formal de solicitud que genera su propio registro de auditoría. El acceso externo no se otorga directamente; se exporta la información solicitada en formato adecuado con registro del proceso completo.

### Quién NO puede consultar auditorías

Ningún INTERNO puede consultar auditorías fuera del acceso específico que le haya sido asignado explícitamente. El acceso de auditoría no se hereda por área ni por cargo.

Ningún CIUDADANO tiene acceso a registros de auditoría, ni siquiera a los registros de sus propias acciones en el formato interno del sistema. Puede consultar el estado de sus trámites a través de las funcionalidades del dominio de Servicios Públicos, que es una vista acotada y controlada.

Ningún actor puede consultar la auditoría de otra institución excepto el SUPERADMIN.

### Límites que deben existir

El acceso a registros de auditoría de Personal y Legajos está restringido incluso dentro de la institución: solo roles con función de auditoría interna explícitamente asignada o el ADMIN pueden acceder a esa auditoría. La exposición de legajos a través de los registros de auditoría tiene el mismo nivel de protección que el acceso directo al legajo.

El acceso a la auditoría de acciones del ADMIN por parte de INTERNOs de la misma institución está prohibido. La jerarquía de administración no puede ser auditada desde abajo; solo desde el SUPERADMIN hacia abajo.

---

## Contexto Institucional

La auditoría sigue el mismo principio de aislamiento institucional que ADR-002: cada institución es un espacio de datos independiente. Los registros de auditoría de la Municipalidad pertenecen a la Municipalidad. Los del HCD pertenecen al HCD. Los del Hospital pertenecen al Hospital.

### ¿Puede una institución ver auditorías de otra?

No. El ADMIN de una institución no puede acceder a los registros de auditoría de otra institución, ni siquiera en modo consulta. Esta restricción es absoluta y no tiene excepciones configurables a nivel institucional.

### ¿Quién puede hacerlo y bajo qué condiciones?

Únicamente el SUPERADMIN puede acceder a registros de auditoría de cualquier institución. Este acceso está justificado por su función de gobernanza global del sistema y por la necesidad de investigar incidentes que puedan cruzar límites institucionales.

Los organismos de control externos con competencia sobre múltiples instituciones (Tribunal de Cuentas provincial) acceden a través del proceso formal de solicitud gestionado por el SUPERADMIN, no directamente.

### Instituciones futuras

Toda institución que se incorpore al sistema tiene desde su creación un espacio de auditoría propio, aislado y con las mismas reglas. No se requiere configuración especial. El modelo escala sin modificación.

---

## Valor Probatorio

Un registro de auditoría tiene valor probatorio cuando puede presentarse como evidencia ante un organismo externo y resistir cuestionamientos sobre su autenticidad, integridad y completitud.

### Condiciones para el valor probatorio

**Identificación inequívoca del actor.** El registro debe identificar a la persona o cuenta técnica de forma que no haya ambigüedad. Un actor anónimo o identificado solo por un identificador sin respaldo en el modelo de identidad no tiene valor probatorio.

**Marca temporal confiable.** El momento del evento debe estar registrado de forma que no pueda ser manipulado por el actor que generó el evento. La confiabilidad de la marca temporal es una condición del sistema, no del usuario.

**Integridad del registro.** El registro no debe poder modificarse después de su creación. Cualquier mecanismo que permita la edición retroactiva de registros de auditoría invalida el valor probatorio de la totalidad del registro, no solo del registro modificado.

**Completitud de la cadena.** Para que un evento tenga valor probatorio pleno, la cadena de eventos que lo precede y lo sigue debe estar completa. Un registro aislado sin contexto tiene valor limitado. La secuencia completa de un proceso tiene valor pleno.

**Referencia al contexto institucional.** El registro debe incluir la institución y, cuando corresponda, el área en la que ocurrió el evento. Sin contexto organizacional, el registro no puede interpretarse correctamente en el marco del modelo aprobado (ADR-001).

### Cuándo pierde validez

Un registro pierde validez probatoria cuando puede demostrarse que fue modificado después de su creación, cuando el actor no puede identificarse de forma unívoca con la información disponible en el sistema de identidad, cuando la marca temporal es inconsistente con otros registros del sistema, o cuando fue eliminado y solo existe en forma de reconstrucción parcial.

La ausencia de registros en períodos donde debería haberlos también tiene valor: es evidencia de una brecha en la trazabilidad, que puede ser tan relevante como la evidencia positiva.

---

## Conservación Histórica

La conservación de registros de auditoría responde a principios conceptuales que deben guiar las decisiones de implementación sin definirlas.

### Principio de proporcionalidad

El período de conservación es proporcional a la consecuencia institucional del evento. Los eventos con consecuencias sobre derechos de personas (legajos, licencias, sanciones, bajas laborales) requieren conservación extendida. Los eventos operativos de baja consecuencia pueden tener conservación más acotada.

### Principio de conservación mínima

Todo registro de auditoría obligatoria debe conservarse como mínimo durante el período de vigencia del objeto que registra, más un margen razonable para cobertura de reclamaciones posteriores. Un legajo de empleado debe conservarse mientras el vínculo laboral exista y durante un período posterior a la baja. Los registros de auditoría asociados a ese legajo no pueden eliminarse mientras el legajo deba conservarse.

### Principio de conservación permanente

Ciertos registros no tienen período de expiración conceptual. Los actos administrativos formales (resoluciones, designaciones, sanciones), los registros de acceso a datos de investigaciones judiciales y los registros de acciones del SUPERADMIN sobre instituciones son candidatos a conservación permanente. La justificación es que su valor probatorio puede ser requerido en cualquier momento futuro y no tiene horizonte predecible.

### Principio de archivado histórico

Cuando un registro supera su período de conservación activa pero debe conservarse por razones de valor histórico o normativo, se archiva. El archivado no elimina el registro ni lo hace inaccesible; reduce su visibilidad en las consultas operativas pero mantiene su recuperabilidad ante solicitudes formales.

### Lo que este modelo no determina

La duración específica de cada período de conservación depende del marco normativo municipal, provincial y nacional aplicable. Este modelo define los principios; la implementación define los plazos concretos en función de la normativa vigente.

---

## Modificación y Eliminación

### Qué registros pueden modificarse

Ningún registro de auditoría puede modificarse después de su creación. Esta es una regla sin excepción, incluyendo el SUPERADMIN. La razón es conceptual: un registro que puede modificarse no es evidencia; es una versión editable de los hechos.

Si un registro contiene un error técnico de captura (el sistema registró incorrectamente un dato), la corrección no se hace modificando el registro original. Se crea un nuevo registro que documenta la corrección, su causa y el actor que la ejecutó. El registro original permanece inalterado como evidencia del estado que el sistema tenía en ese momento.

### Qué registros nunca deben modificarse

Todos los registros de auditoría son inmutables. No existe categoría de registro de auditoría modificable.

### Qué registros pueden eliminarse

Los registros de auditoría clasificados como opcionales, asociados a eventos de baja consecuencia institucional, pueden eliminarse una vez cumplido su período de conservación mínima, conforme a la política de retención que defina cada institución.

Los registros de auditoría recomendada pueden eliminarse una vez cumplido un período de conservación extendido, bajo proceso formal documentado.

### Qué registros nunca deben eliminarse

Los registros de auditoría obligatoria no pueden eliminarse. Incluyen toda la auditoría de seguridad (accesos, roles, permisos), toda la auditoría administrativa sobre legajos y personal, toda la auditoría de actos administrativos formales y toda la auditoría de acciones del SUPERADMIN y el ADMIN.

Si por razones técnicas o normativas fuera necesario depurar registros de auditoría obligatoria, ese proceso debe ser en sí mismo un evento auditable de nivel obligatorio, aprobado por el SUPERADMIN, con justificación documentada y registro permanente del hecho de la eliminación (no del contenido eliminado).

---

## Exportación y Acceso Externo

### Exportación de auditorías

La exportación de registros de auditoría es en sí misma un evento de auditoría obligatoria. Toda exportación debe registrar quién la solicitó, con qué autorización, qué período y qué dominio cubre, cuándo se generó y a quién fue entregada.

La exportación no autoriza la modificación de los registros originales. El formato de exportación debe preservar la integridad de los datos: no puede omitir campos, alterar marcas temporales ni agregar información no presente en el registro original.

### Acceso por organismos de control

Los organismos de control con competencia sobre el municipio (Tribunal de Cuentas, auditorías externas) acceden a los registros de auditoría a través de un proceso formal que comienza con una solicitud documentada. El SUPERADMIN es el responsable de gestionar ese acceso. El proceso completo de la solicitud, la autorización, la generación del paquete de información y la entrega queda registrado como auditoría obligatoria.

### Acceso judicial

El acceso judicial a registros de auditoría sigue el mismo proceso que el acceso por organismos de control, con la particularidad de que una orden judicial tiene carácter imperativo. El sistema debe poder generar un paquete de información verificable que pueda presentarse como evidencia en un proceso judicial. La cadena de custodia del paquete exportado debe estar documentada desde su generación hasta su entrega.

### Acceso administrativo interno

El acceso interno a registros de auditoría está gobernado por las reglas definidas en la sección de Acceso a Auditoría. No existe acceso administrativo informal. Toda consulta a registros de auditoría es en sí misma auditable.

---

## Riesgos

### CRÍTICO

**Registros de auditoría modificables.** Si algún actor del sistema puede editar registros de auditoría después de su creación, la totalidad del sistema de trazabilidad pierde valor probatorio. Este riesgo invalida el modelo completo.

**Actor no identificable.** Si el sistema permite acciones sin identificación unívoca del actor (sesiones compartidas, cuentas genéricas, acciones de sistema sin identificación de origen), los registros generados no son evidencia institucional. Son logs técnicos sin valor probatorio.

**Auditoría deshabilitada por configuración.** Si existe algún mecanismo que permita deshabilitar el registro de eventos de auditoría obligatoria, sea por configuración del ADMIN, del SUPERADMIN o por carga técnica del sistema, la trazabilidad es discontinua y la evidencia incompleta.

**Acceso cruzado entre instituciones sin registro.** Si el aislamiento institucional de la auditoría falla y una institución puede consultar registros de otra sin que eso quede registrado, se produce una brecha de privacidad y seguridad que puede no detectarse hasta que cause daño.

**Eliminación de registros de auditoría obligatoria.** Si por error de diseño, falla técnica o acción deliberada se eliminan registros de auditoría obligatoria, la institución queda expuesta en cualquier proceso de control o legal que requiera esa trazabilidad.

### ALTO

**Marca temporal no confiable.** Si la marca temporal de los eventos puede ser manipulada por el actor que los genera (por ejemplo, modificando el reloj del cliente), los registros existen pero no son confiables como evidencia de cuándo ocurrió algo.

**Auditoría incompleta en operaciones compuestas.** Si una operación genera múltiples cambios pero solo algunos se registran (por ejemplo, cambio de área registrado pero cambio de permisos asociado no registrado), la reconstrucción del evento es parcial e imprecisa.

**Cuentas técnicas con identidad compartida.** Si múltiples integraciones o procesos automatizados comparten la misma cuenta técnica, es imposible distinguir qué proceso ejecutó cada acción. Las cuentas técnicas deben ser individuales y con identidad unívoca.

**Acceso a auditoría sin registro del acceso.** Si consultar registros de auditoría no genera a su vez un registro, actores con acceso pueden consultar información sensible sin dejar rastro.

**Exportaciones sin proceso formal.** Si los datos de auditoría pueden exportarse sin registro del proceso, es imposible saber qué información salió del sistema, cuándo y a quién.

### MEDIO

**Sobreauditoría de eventos de baja consecuencia.** Si se registran como obligatorios eventos que no tienen consecuencia institucional, el volumen de registros crece sin valor agregado y dificulta la consulta de registros relevantes. La clasificación de eventos debe ser precisa.

**Falta de referencia al contexto organizacional.** Si los registros no incluyen institución y área, son difíciles de interpretar en el marco del modelo organizacional. Un evento de modificación de legajo sin contexto institucional no puede atribuirse correctamente.

**Períodos de conservación no definidos formalmente.** Si no existe una política de retención documentada, los registros se acumulan indefinidamente o se eliminan sin criterio. Ambos extremos generan problemas: el primero operativo, el segundo legal.

**Formatos de exportación no estandarizados.** Si cada exportación se genera en un formato ad hoc, la verificación de integridad por parte de organismos externos es difícil y la cadena de custodia se debilita.

### BAJO

**Nomenclatura inconsistente de acciones auditadas.** Si la misma acción se describe con términos distintos en distintos módulos, la búsqueda y análisis de registros es menos eficiente. No afecta la validez probatoria pero dificulta la operación.

**Falta de documentación del modelo de auditoría.** Si este documento no es conocido por el equipo de desarrollo, cada módulo puede implementar criterios de auditoría distintos, generando inconsistencias acumulativas.

---

## Principios del Modelo

### Trazabilidad

Toda acción con consecuencia institucional debe poder reconstruirse. La trazabilidad no es un feature del sistema; es una condición de validez del sistema como herramienta de gobierno municipal.

### Integridad

Un registro de auditoría es íntegro cuando su contenido en el momento de la consulta es idéntico a su contenido en el momento de su creación. La integridad no puede depender de la buena voluntad de los actores; debe ser garantizada por el diseño del sistema.

### No repudio

Un actor que ejecutó una acción no puede negar haberla ejecutado si el registro existe, es íntegro y el actor está identificado de forma unívoca. El no repudio depende de la solidez del sistema de identidad (que se define en ADR-006) y de la integridad del registro.

### Responsabilidad institucional

Toda acción registrada tiene un responsable identificable. La responsabilidad institucional no se diluye en "el sistema lo hizo" ni en cuentas genéricas. Cada acción tiene un actor; cada actor tiene identidad; cada identidad tiene responsabilidad.

### Proporcionalidad

El nivel de registro es proporcional a la consecuencia institucional del evento. No todo merece el mismo nivel de auditoría. La clasificación de eventos (obligatoria, recomendada, opcional, sin auditoría) responde a este principio.

### Independencia

Los registros de auditoría son independientes de los datos que registran. Si un expediente se elimina (si eso fuera posible), el registro de auditoría de su existencia y de las acciones sobre él permanece. La auditoría no depende de la supervivencia del objeto auditado.

### Accesibilidad controlada

La auditoría debe ser accesible para quienes tienen legitimidad para consultarla, en el tiempo en que lo necesitan, sin requerir intervención técnica para cada consulta. La accesibilidad controlada no es permisividad; es eficiencia institucional. Una auditoría que solo puede consultarse con ayuda del equipo de desarrollo no es operativamente útil.

### Anticipación

El modelo de auditoría se diseña antes de la implementación. No se agrega como capa posterior. La razón es conceptual: agregar auditoría a un sistema ya construido requiere revisar cada módulo para verificar qué queda registrado y qué no. Los eventos auditables deben estar contemplados desde el diseño de cada dominio funcional.

---

## Audit Model v1 Recomendado

El modelo de auditoría institucional de Muni Digital se define de la siguiente manera:

### Auditoría como capa transversal

La auditoría no pertenece a ningún módulo funcional específico. Es una capa transversal que atraviesa todos los dominios: gestión de usuarios, personal, expedientes, reclamos, configuración. Cada dominio genera eventos; la capa de auditoría los captura, los clasifica y los almacena conforme a este modelo.

### Eventos como hechos institucionales

Cada evento auditable es un hecho institucional, no un evento técnico. El modelo define los cinco componentes obligatorios de todo evento (actor, objeto, acción, momento, resultado) y establece que sin alguno de ellos el registro no tiene valor probatorio.

### Inmutabilidad como condición estructural

Los registros de auditoría son inmutables desde su creación. Esta no es una restricción técnica de implementación; es un principio conceptual del modelo. Toda implementación futura debe garantizarla estructuralmente, no confiar en controles de acceso para protegerla.

### Cuatro niveles de clasificación

Los eventos se clasifican en obligatorios, recomendados, opcionales y sin auditoría. La clasificación es parte del diseño de cada dominio funcional. Todo dominio nuevo que se incorpore al sistema debe incluir la clasificación de sus eventos como parte de su definición.

### Aislamiento institucional de la auditoría

Los registros de auditoría de cada institución son propios de esa institución. El acceso cruzado está prohibido excepto para el SUPERADMIN, y ese acceso es en sí mismo auditable.

### Acceso formal y auditado

Toda consulta a registros de auditoría genera un registro de auditoría. No existe acceso informal a la trazabilidad institucional. Los organismos externos acceden a través de procesos formales documentados.

### Conservación basada en principios

La conservación sigue los principios de proporcionalidad, conservación mínima, conservación permanente para actos formales y archivado histórico para registros vencidos. Los plazos específicos se definen en implementación conforme al marco normativo aplicable.

### Base para el modelo de identidad

Este modelo requiere que todo actor sea identificable de forma unívoca. Esa condición es el insumo central para ADR-006 (User Identity Model): el sistema de identidad debe garantizar que todo actor que genera eventos auditables pueda ser identificado sin ambigüedad, incluyendo personas físicas, cuentas técnicas e integraciones.

---

## Roadmap Conceptual

### P0 — Aprobación del modelo conceptual

**Objetivo:** Validar y aprobar este documento como fuente de verdad del sistema de auditoría institucional.

Dependencias: ADR-001, ADR-002, ADR-003 y ADR-004 aprobados. Este documento revisado por el equipo técnico y los referentes institucionales con competencia en control y auditoría.

Criterio de cierre: El equipo puede responder sin ambigüedad qué es un evento auditable, quién puede consultarlo, qué puede modificarse y qué no, y qué principios rigen la conservación. Todo módulo futuro puede ser evaluado contra este modelo para determinar qué auditoría requiere.

Riesgo: CRÍTICO si algún módulo funcional comienza su implementación antes de que este modelo esté aprobado. La auditoría retroactiva es estructuralmente más costosa que la auditoría por diseño.

---

### P1 — Diseño técnico de la capa de auditoría

**Objetivo:** Traducir el modelo conceptual en decisiones de diseño técnico: cómo se capturan los eventos, cómo se garantiza la inmutabilidad, cómo se gestiona el aislamiento institucional, cómo se implementa la conservación diferenciada.

Dependencias: P0 cerrado. ADR-006 (User Identity Model) debe estar en borrador porque la identificación de actores es una dependencia del diseño técnico de auditoría.

Criterio de cierre: El diseño técnico garantiza inmutabilidad sin depender de controles de acceso. El diseño técnico implementa aislamiento institucional nativo. El diseño técnico incluye la clasificación de eventos por nivel desde el inicio.

Riesgo: ALTO. Es el punto donde la presión de "loggear todo en una tabla" colapsa los cuatro tipos de auditoría en un único mecanismo técnico sin clasificación, sin aislamiento y sin control de acceso diferenciado.

---

### P2 — Integración de auditoría en módulos existentes

**Objetivo:** Los módulos ya implementados (gestión de usuarios, gestión organizacional, legajos) incorporan la capa de auditoría conforme al modelo. Los eventos obligatorios están registrándose. El aislamiento institucional está activo.

Dependencias: P1 cerrado. ADR-006 implementado (identidad de actores disponible).

Criterio de cierre: Todo evento de auditoría obligatoria definido en este documento genera un registro verificable. Ningún registro puede ser modificado por ningún actor. El SUPERADMIN puede consultar auditoría de cualquier institución y esa consulta queda registrada. El ADMIN puede consultar auditoría de su institución únicamente.

Rollback: Si P2 falla las validaciones de inmutabilidad o aislamiento, revertir el módulo afectado a estado previo hasta corregir. No liberar a producción con auditoría parcial o sin aislamiento institucional verificado.

---

### P3 — Auditoría de dominios operativos y acceso externo

**Objetivo:** Los dominios operativos (expedientes, reclamos, resoluciones) tienen su auditoría activa. El proceso de exportación formal para organismos externos está operativo. La conservación diferenciada está implementada.

Dependencias: P2 cerrado.

Criterio de cierre: Una solicitud formal de auditoría de un organismo externo puede procesarse completamente dentro del sistema, con registro del proceso completo. Un expediente puede reconstruirse en su totalidad desde los registros de auditoría. La política de retención está activa y documentada.

---

> Este documento define el modelo conceptual de auditoría institucional de Muni Digital v1.
> No debe modificarse sin revisión del equipo de arquitectura y aprobación formal.
> Extiende ADR-001, ADR-002, ADR-003 y ADR-004 sin contradecirlos.
> Es prerequisito para: ADR-006 User Identity Model.
> Próximo documento requerido: ADR-006 User Identity Model.