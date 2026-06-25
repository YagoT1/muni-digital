# ADR-006 — Person & Identity Model v1 — Muni Digital

> Documento conceptual del modelo de persona e identidad.
> Basado en: PDA.md · ADR-001 · ADR-002 · ADR-003 · ADR-004 · ADR-005
> Estado: Propuesta para revisión y aprobación.
> Restricción: Este documento NO define tablas, entidades, código, APIs, JWT, autenticación técnica ni implementación.
> Este documento es la fuente de verdad para toda identidad humana y técnica dentro de Muni Digital.

---

## Resumen Ejecutivo

El error más común y más costoso en sistemas de gobierno digital es modelar la identidad de una persona a partir de su cuenta de usuario. Cuando eso ocurre, el sistema no puede representar a una persona que no tiene cuenta, no puede gestionar a una persona que tiene más de una relación con la institución, no puede conservar la historia de una persona después de que su cuenta se cierra y no puede distinguir entre la persona y el mecanismo que usa para acceder al sistema.

En un municipio, las consecuencias son inmediatas: un empleado que no usa el sistema no existe para RRHH. Un ciudadano que se convierte en empleado tiene dos registros sin conexión. Un funcionario que deja el cargo pierde toda su historia institucional cuando se desactiva su cuenta. Un concejal que también tramita como ciudadano es dos personas distintas para el sistema.

La decisión central de este documento es la siguiente:

**Una persona es una realidad preexistente al sistema. Una identidad es la representación verificada de esa persona dentro del sistema. Una cuenta es el mecanismo de acceso técnico. Los tres conceptos son distintos, independientes y se relacionan sin colapsar.**

Este modelo establece que la persona es la unidad fundamental e inmutable. La identidad la representa. La cuenta le da acceso. Ninguno de los tres implica automáticamente a los otros dos.

---

## El Problema de Confundir Persona y Usuario

### El supuesto incorrecto

Cuando un sistema asume que "usuario = persona", diseña el registro de la persona como si fuera el registro del acceso. El nombre de usuario, el email, la contraseña y los permisos quedan en el mismo objeto conceptual que el nombre legal, el documento de identidad y la historia institucional.

Este supuesto parece razonable cuando el sistema tiene un solo tipo de usuario, en un solo contexto, con una sola relación con la institución. En Muni Digital, ninguna de esas condiciones se cumple.

### Riesgos conceptuales de la simplificación

**El empleado sin cuenta no existe.** Si la persona se define a partir de su cuenta, un agente municipal que no tiene acceso al sistema digital no puede ser registrado en legajos, no puede tener movimientos de personal y no puede ser objeto de auditoría. Muni Digital sería incapaz de gestionar a la mayoría de los empleados de la Municipalidad desde el día uno.

**El ciudadano que se convierte en empleado se duplica.** Si una persona tiene una cuenta ciudadana y luego ingresa al municipio como empleado, el sistema le crea una segunda cuenta con una segunda identidad. Ahora esa persona tiene dos registros sin conexión. Sus trámites ciudadanos no tienen relación con su legajo de empleado. La trazabilidad es imposible.

**El cierre de cuenta elimina la historia.** Si desactivar la cuenta de un empleado que se jubila implica perder o aislar su historial, el sistema viola el principio de conservación histórica establecido en ADR-005 y los requisitos de legajo del ADR-004. El empleado existió; eso no puede borrarse.

**La identidad se vuelve frágil.** Si la identidad de una persona depende de su email o su nombre de usuario, un cambio de email produce una crisis de identidad en el sistema. Un empleado que cambia de nombre por matrimonio o por rectificación documental se convierte en un problema técnico que ningún módulo sabe cómo resolver.

**La auditoría pierde al actor.** ADR-005 establece que todo evento auditable debe tener un actor identificable de forma unívoca. Si la identidad colapsa con la cuenta, cuando la cuenta se cierra el actor de eventos históricos queda identificado por una cuenta inexistente. El no repudio, principio central de ADR-005, se rompe.

**Los roles se confunden con la identidad.** Si el usuario es la persona, es tentador agregar el rol técnico como atributo del usuario-persona. Eso viola ADR-002, que establece que el rol es una categoría de acceso al sistema, no una característica de la persona.

---

## Definición de Persona

Una persona es un ser humano con existencia real, independientemente de cualquier sistema digital. La persona existe antes de que Muni Digital exista, existe mientras el sistema existe y existe después de que el sistema ya no exista.

En el contexto de Muni Digital, una persona es cualquier ser humano que tiene o puede tener alguna relación con el municipio: como habitante, como empleado, como funcionario, como representante electo o como prestador de servicios.

### Atributos que forman parte de la identidad humana

Los atributos de identidad de una persona son los que la distinguen de cualquier otra persona de forma verificable y con respaldo en documentación oficial: número de documento de identidad nacional, nombre y apellido completos tal como constan en el documento, fecha de nacimiento, género registrado en el documento. Estos atributos son los que el Estado argentino reconoce como definitorios de la identidad civil.

### Atributos que NO forman parte de la identidad

El email no es identidad. Es un canal de contacto que puede cambiar, puede pertenecer a otra persona, puede dejar de existir. El nombre de usuario no es identidad. Es un alias de acceso al sistema. El cargo institucional no es identidad. Es una posición en el organigrama. El rol técnico no es identidad. Es una categoría de acceso. El área no es identidad. Es un ámbito funcional. El número de legajo no es identidad. Es un identificador administrativo interno que puede variar entre instituciones.

### Qué tienen en común todos los tipos de personas en Muni Digital

Ciudadano, empleado, funcionario político, concejal, contratista y personal HCD son todos seres humanos con identidad civil verificable. Lo que los diferencia no es su naturaleza como personas sino el tipo de relación que tienen con la institución. Esa diferencia de relación no afecta la definición de persona; afecta cómo se registra el vínculo.

---

## Definición de Identidad

La identidad es la representación verificada y registrada de una persona dentro de Muni Digital. Es el puente entre la realidad de la persona y el sistema digital.

La identidad no es la persona. Es su representación. La identidad existe dentro del sistema; la persona existe fuera de él. La identidad puede ser incompleta o provisional mientras se verifica; la persona no cambia por eso.

### Diferencia entre persona e identidad

La persona es el referente real. La identidad es el registro verificado de ese referente en el sistema. Una persona puede existir sin tener identidad en Muni Digital: es simplemente una persona que aún no fue registrada. Una identidad sin persona real detrás es un error o un fraude; no es una condición válida del sistema.

### ¿La identidad existe antes del sistema?

No. La identidad en Muni Digital se crea en el momento en que la persona es registrada. Sin embargo, los atributos que conforman esa identidad (documento, nombre, fecha de nacimiento) preexisten al sistema. El sistema los registra; no los crea.

### ¿Puede la identidad sobrevivir al sistema?

Sí, en el sentido de que los registros asociados a una identidad deben persistir conforme a los principios de conservación establecidos en ADR-005, independientemente de que el sistema evolucione o sea reemplazado. La historia institucional de una persona no se pierde porque el sistema cambie.

### ¿Puede la identidad cambiar?

Los atributos de identidad pueden actualizarse cuando la persona actualiza su documentación civil. Un cambio de nombre por matrimonio, una rectificación documental, un cambio de género registrado son actualizaciones válidas de la identidad. El mecanismo correcto es registrar el cambio con la fecha en que se produjo y conservar los atributos anteriores como historial. La identidad no se reemplaza; se actualiza con trazabilidad.

**Cambio de apellido:** Es una actualización de atributo con historial. El apellido anterior permanece en el registro histórico de la identidad.

**Cambio de género:** Es una actualización de atributo con historial. El sistema debe soportarlo sin generar ambigüedades en registros históricos anteriores al cambio.

**Rectificación documental:** Es una corrección de un atributo registrado incorrectamente. Debe quedar evidencia de la corrección, su fecha y la autoridad que la respaldó.

**Doble nacionalidad:** No es un caso de múltiples identidades. Una persona con doble nacionalidad tiene una sola identidad en Muni Digital. El documento primario de referencia es el DNI argentino cuando existe; cuando no existe, la documentación equivalente reconocida por la institución.

---

## Relación Persona e Identidad

### ¿Una persona puede tener múltiples identidades en Muni Digital?

No. Una persona tiene exactamente una identidad en Muni Digital. La unicidad de la identidad es un principio no negociable de este modelo. Si el sistema detecta dos registros de identidad para la misma persona, eso es un error que debe corregirse, no una condición válida.

La razón es conceptual y operativa: si una persona puede tener múltiples identidades, la trazabilidad se fragmenta. Los eventos auditables de ADR-005 no pueden atribuirse a un actor único. Los vínculos laborales de ADR-004 no pueden consolidarse. Los permisos de ADR-003 no pueden gestionarse coherentemente.

### ¿Una identidad puede pertenecer a múltiples personas?

No. Una identidad corresponde exactamente a una persona. Una identidad compartida (por ejemplo, una cuenta familiar o una cuenta departamental usada por múltiples personas) no es una identidad en el sentido de este modelo; es un problema de diseño que debe eliminarse. El principio de no repudio de ADR-005 requiere que cada identidad corresponda a exactamente una persona.

### Condiciones para considerar una identidad única

Una identidad se considera única cuando corresponde a una sola persona, está respaldada por documentación civil verificable, no puede ser confundida con la identidad de otra persona dentro del sistema, y persiste a lo largo del tiempo independientemente de los cambios en sus atributos actualizables.

El número de documento de identidad nacional es el ancla de unicidad primaria en el contexto municipal argentino. No puede haber dos identidades con el mismo número de documento. No puede haber una identidad sin número de documento (excepto casos excepcionales con documentación alternativa formalmente definida).

---

## Definición de Usuario

Un usuario es un actor reconocido por el sistema que puede iniciar sesión y ejecutar acciones dentro de Muni Digital. El usuario es un concepto técnico de acceso; no es una persona ni una identidad.

### Función del usuario

El usuario es el mecanismo por el cual una identidad interactúa con el sistema. Sin usuario, la identidad existe pero no puede acceder. El usuario no tiene valor sin una identidad que lo respalde. La dirección es unidireccional: el usuario depende de la identidad; la identidad no depende del usuario.

### Relación con la identidad

Un usuario siempre está vinculado a exactamente una identidad. No existen usuarios sin identidad (excepto las cuentas técnicas, que se analizan en su propia sección). No existen usuarios que vinculen a múltiples identidades.

### Relación con la autenticación

El usuario es el sujeto de la autenticación: es lo que el sistema verifica cuando alguien intenta acceder. Los mecanismos de autenticación (contraseña, token, certificado) son atributos del usuario, no de la identidad ni de la persona.

### Relación con los permisos

El usuario es el portador de los permisos en el momento de la sesión. Los permisos se evalúan sobre el usuario en su contexto organizacional, conforme a ADR-002 y ADR-003. Los permisos no pertenecen a la identidad; pertenecen al usuario en su rol dentro de su institución y área.

---

## Definición de Cuenta

Una cuenta es la instancia operativa que vincula una identidad con un conjunto de credenciales de acceso, un rol técnico y un contexto organizacional. Si el usuario es el concepto abstracto del actor en el sistema, la cuenta es su instancia concreta y operativa.

### Qué representa una cuenta

La cuenta representa la habilitación de una identidad para operar en el sistema bajo un rol técnico específico, dentro de un contexto institucional determinado. Una cuenta activa significa que la identidad puede acceder al sistema en este momento.

### Responsabilidades de una cuenta

Una cuenta es responsable de: mantener las credenciales de acceso del actor, portar el rol técnico asignado por el ADMIN o SUPERADMIN, operar dentro del contexto organizacional definido (institución y área), y ser el actor registrado en todos los eventos de auditoría que genera.

### Qué NO representa una cuenta

Una cuenta no representa a la persona. La persona puede existir sin cuenta. Una cuenta no es permanente: puede crearse, suspenderse, bloquearse y cerrarse. El cierre de una cuenta no elimina la identidad ni la historia institucional de la persona. Una cuenta no determina qué es la persona: un empleado no deja de ser empleado porque su cuenta esté suspendida.

---

## Relación Persona → Identidad → Cuenta

La relación es jerárquica y unidireccional: la persona es el fundamento, la identidad la representa, la cuenta le da acceso. Cada nivel depende del anterior; el anterior no depende del siguiente.

### Una persona sin cuenta

Es el caso más común en un municipio. Un agente de limpieza, un operario de obras públicas, un empleado administrativo sin funciones digitales tiene identidad en el sistema (está registrado como empleado, tiene legajo, existe en RRHH) pero no tiene cuenta. Puede ser objeto de acciones auditables (movimientos de personal, licencias) sin tener acceso al sistema. Es válido, frecuente y el modelo debe soportarlo sin forzar la creación de una cuenta.

### Una persona con una cuenta

Es el caso estándar para usuarios del sistema. Una persona tiene una identidad y esa identidad tiene una cuenta activa con un rol técnico en una institución. La mayoría de los INTERNOs y los ADMIN responden a este esquema.

### Una persona con múltiples cuentas

Esta situación se presenta cuando una misma persona tiene vínculos con más de una institución y necesita operar en ambas. Por ejemplo, una persona que es empleada de la Municipalidad y simultáneamente tiene un rol en el HCD. En este caso, la persona tiene una única identidad y dos cuentas, cada una asociada a un contexto institucional distinto. Las cuentas son independientes en cuanto a rol y permisos; la identidad que las vincula es única. Esta situación es válida pero excepcional y debe ser gestionada con especial atención en auditoría.

### Múltiples cuentas para la misma identidad en la misma institución

Esta situación no es válida en condiciones normales. Una identidad no puede tener dos cuentas activas simultáneas dentro de la misma institución. Si se detecta, es un error de gestión que debe corregirse.

### Cierre de cuenta

El cierre de una cuenta termina la capacidad de acceso del actor al sistema. No elimina la identidad. No elimina la historia de eventos generados por esa cuenta. Los registros de auditoría asociados a la cuenta cerrada permanecen y el actor sigue siendo identificable a través de su identidad. El cierre de cuenta es el estado final del ciclo de vida de la cuenta; no es el final del ciclo de vida de la identidad.

### Bloqueo de cuenta

El bloqueo es un estado temporal de suspensión del acceso. La cuenta existe pero no puede operar. La identidad permanece intacta. El bloqueo puede ser por razones de seguridad (intentos fallidos de autenticación), por decisión administrativa (suspensión de funciones) o por proceso en curso (investigación disciplinaria). El bloqueo es reversible; el cierre no lo es en condiciones normales.

---

## Cuentas Técnicas

Las cuentas técnicas son actores del sistema que no corresponden a personas físicas: integraciones con sistemas externos, webhooks, procesos batch automáticos, servicios internos.

### ¿Son personas?

No. Las cuentas técnicas no tienen persona detrás. Son actores del sistema, no representaciones de seres humanos.

### ¿Tienen identidad?

Tienen una identidad técnica: son identificables de forma unívoca dentro del sistema. Pero esa identidad técnica no sigue el modelo de identidad humana. No tiene atributos civiles, no tiene historial personal, no tiene ciclo de vida biológico. La identidad técnica de una cuenta de integración es su identificador único en el sistema y el registro de su propósito, su titular responsable (una persona o área humana) y su contexto de operación.

### ¿Son usuarios?

Son actores del sistema en el sentido de que pueden ejecutar acciones y generar eventos auditables. No son usuarios en el sentido de que no representan a una persona ni tienen sesión interactiva. Tienen un perfil de operación definido que los distingue de los usuarios humanos.

### Relación con ADR-005

Las cuentas técnicas son actores auditables conforme a ADR-005. Todo evento generado por una cuenta técnica debe registrar la cuenta como actor de forma inequívoca. La cuenta técnica debe ser identificable y su responsable humano (la persona o área que la gestiona) debe estar documentado.

Las cuentas técnicas no pueden tener rol SUPERADMIN ni rol ADMIN. Su alcance de operación debe estar estrictamente definido y acotado al propósito para el que fueron creadas. Una integración con el sistema de expedientes no puede tener permisos sobre el módulo de personal.

---

## Ciclo de Vida

### Nacimiento de identidad

La identidad de una persona en Muni Digital nace cuando la persona es registrada formalmente por primera vez. Puede ocurrir de tres maneras: cuando un ciudadano crea una cuenta en el portal, cuando un empleado es ingresado al sistema de RRHH por el ADMIN de la institución, o cuando un ADMIN o SUPERADMIN registra a una persona por cualquier motivo institucional. En todos los casos, se verifica la documentación de identidad y se establece el ancla de unicidad (número de documento).

### Creación de cuenta

La creación de cuenta ocurre después del registro de la identidad. La cuenta vincula la identidad existente con credenciales de acceso y un contexto de operación. Una identidad puede existir sin cuenta (empleado sin acceso al sistema). Una cuenta no puede existir sin identidad.

### Activación

La activación es el momento en que la cuenta pasa a estado operativo: el actor puede autenticarse y ejecutar acciones. Para usuarios INTERNO y ADMIN, la activación la realiza el ADMIN de la institución. Para usuarios CIUDADANO, la activación puede ser automática tras la verificación de identidad.

### Suspensión

La suspensión es un bloqueo temporal de acceso. La cuenta existe, la identidad existe, pero el actor no puede operar. La suspensión no elimina ni afecta los permisos configurados; los pone en pausa. Cuando se levanta la suspensión, el actor recupera exactamente el estado anterior.

### Bloqueo

El bloqueo es una suspensión por razones de seguridad, generalmente automática ante detección de comportamiento anómalo (múltiples intentos fallidos de autenticación). Puede requerir intervención del ADMIN para levantarse.

### Cierre

El cierre es el fin del ciclo operativo de la cuenta. Se produce cuando el vínculo que justificaba el acceso termina: baja laboral, fin de mandato, decisión administrativa. El cierre es definitivo en condiciones normales. La identidad y su historia permanecen.

### Baja

La baja de identidad es conceptualmente diferente al cierre de cuenta y es un evento excepcional. Solo ocurre cuando la persona fue registrada por error (duplicado detectado, registro fraudulento) o en circunstancias extraordinarias formalmente documentadas. La baja de identidad debe dejar registro permanente del hecho y su causa. No elimina los eventos de auditoría históricos; los conserva con referencia a la identidad dada de baja.

### Recuperación

La recuperación aplica al acceso (cuenta), no a la identidad. Si un actor pierde sus credenciales o su cuenta es bloqueada, el proceso de recuperación verifica la identidad y restaura o crea una nueva cuenta vinculada a la misma identidad. La identidad no se pierde ni se duplica en una recuperación.

### Historial

El historial de una identidad es la suma de todos los eventos asociados a ella a lo largo del tiempo: cuentas creadas y cerradas, vínculos laborales activos e históricos, cambios de atributos de identidad, eventos de auditoría como actor. El historial es inmutable y persistente, conforme a ADR-005.

### Qué sobrevive a cada etapa

La identidad sobrevive a todo: al cierre de cuenta, a la baja laboral, a la jubilación, al fin de mandato, a la desactivación del sistema. Los eventos de auditoría sobreviven al cierre de cuenta y a la baja de identidad. Los vínculos laborales históricos sobreviven al cierre de cuenta. Las credenciales de acceso no sobreviven al cierre de cuenta: son el único elemento que desaparece.

---

## Relación con Employee Model

ADR-004 define que el empleado es una persona con vínculo laboral activo o histórico con una institución. Este modelo establece cómo esa persona existe en el sistema sin duplicación.

Una persona es registrada en Muni Digital con su identidad verificada. Su vínculo laboral (modalidad, institución, área, cargo, historial de movimientos) se registra asociado a esa identidad. Si la persona tiene cuenta de acceso al sistema, esa cuenta también se asocia a la misma identidad.

La relación correcta es: identidad → vínculo laboral (empleado). No: cuenta → empleado. No: usuario → legajo.

Cuando un ciudadano se convierte en empleado, su identidad ya existe en el sistema. El ingreso laboral registra un nuevo vínculo sobre la identidad existente. No se crea una nueva identidad. La persona es la misma; su relación con la institución cambia.

Cuando un empleado se jubila, el vínculo laboral se cierra históricamente. La identidad persiste. El legajo persiste. Si tenía cuenta de acceso, esa cuenta se cierra. La persona no desaparece del sistema.

El funcionario político tiene un vínculo de designación, no laboral en el sentido estricto de la carrera administrativa. Se registra como un tipo de vínculo bajo la misma identidad. Cuando deja el cargo, el vínculo se cierra; la identidad permanece.

El concejal tiene un vínculo de mandato en el contexto del HCD. Su identidad es la misma que tendría si también fuera ciudadano o empleado. El sistema no duplica la identidad por el hecho de que la persona tenga mandato electivo.

---

## Relación con Security Model

ADR-002 define cuatro roles técnicos: SUPERADMIN, ADMIN, INTERNO, CIUDADANO. Este modelo establece que los roles no son atributos de la identidad; son atributos de la cuenta dentro de un contexto organizacional.

La misma identidad puede tener una cuenta con rol INTERNO en la Municipalidad y, excepcionalmente, otra cuenta con rol ADMIN en el HCD. Los roles son diferentes; la identidad es una. Los roles no se mezclan entre cuentas. La identidad no determina el rol; el ADMIN de cada institución lo determina.

El rol CIUDADANO es el rol por defecto para cuentas de acceso ciudadano. Una persona que tiene cuenta ciudadana y es también empleada tiene dos cuentas (una CIUDADANO, una INTERNO) vinculadas a la misma identidad. Esto es válido, es explícito y debe estar claramente registrado.

Los roles nunca son atributos de la persona ni de la identidad. Son categorías de acceso de la cuenta, configurables, revocables y dependientes del contexto organizacional.

---

## Relación con Audit Model

ADR-005 establece que todo evento auditable debe tener un actor identificable de forma unívoca. Este modelo es el que garantiza esa condición.

**Trazabilidad:** Cada evento generado por una cuenta puede rastrearse hasta la identidad de la persona que la usa. El cierre de la cuenta no interrumpe esa trazabilidad porque la identidad persiste.

**Responsabilidad:** La responsabilidad institucional de un evento recae sobre la persona identificada por la identidad, no sobre la cuenta. Si una cuenta es comprometida y alguien más la usa, el evento queda registrado con la cuenta como actor, pero la investigación institucional puede distinguir entre el uso autorizado y el no autorizado a través de los mecanismos de recuperación y bloqueo documentados.

**No repudio:** Una persona no puede negar haber ejecutado una acción si su identidad está vinculada a la cuenta que la ejecutó y la cuenta estaba activa en ese momento. El no repudio descansa sobre la unicidad de la identidad (una sola persona por identidad) y la integridad de los registros de auditoría (inmutables conforme a ADR-005).

Las cuentas técnicas también cumplen con ADR-005: son identificables, sus acciones quedan registradas y su responsable humano está documentado. No hay actor anónimo en el sistema.

---

## Riesgos

### CRÍTICO

**Identidad basada en email.** Si el email es el ancla de unicidad de la identidad, la identidad cambia cuando el email cambia, dos personas pueden tener el mismo email en distintos momentos, y el sistema no puede distinguir a una persona de su dirección de correo. El email es un canal de contacto, no un identificador de identidad.

**Identidad basada en nombre de usuario.** El nombre de usuario es un alias de acceso que puede cambiar, puede reutilizarse tras el cierre de una cuenta y puede colisionar entre personas en sistemas federados. Usarlo como ancla de identidad produce los mismos problemas que el email, con el agravante de que los nombres de usuario son frecuentemente reutilizados.

**Duplicación de personas.** Si el sistema no verifica la unicidad de la identidad al momento del registro, la misma persona puede tener múltiples identidades. Esto fragmenta su historia laboral, sus trámites ciudadanos, su auditoría y sus vínculos institucionales. El costo de corregir duplicaciones en producción es extremadamente alto.

**Eliminación física de identidad.** Si el sistema permite eliminar permanentemente el registro de una identidad, la historia institucional asociada queda huérfana. Los eventos de auditoría pierden su actor. Los legajos pierden su persona. El principio de no repudio de ADR-005 colapsa.

**Cuentas compartidas entre personas.** Una cuenta usada por múltiples personas (una cuenta departamental, una cuenta de guardia) hace imposible atribuir eventos a actores individuales. Todo el modelo de auditoría de ADR-005 pierde valor probatorio para los eventos generados por esa cuenta.

### ALTO

**Colapsar persona y cuenta en un solo registro.** Si persona y cuenta son el mismo objeto conceptual, el cierre de cuenta elimina a la persona del sistema. Un empleado jubilado no existe. Un ciudadano que elimina su cuenta desaparece. La historia institucional se fragmenta con cada cambio de credenciales.

**No conservar historial de cambios de atributos de identidad.** Si un cambio de nombre o género sobreescribe el atributo anterior sin dejar trazabilidad, los eventos históricos quedan con datos que ya no coinciden con el registro actual. La coherencia entre auditoría e identidad se rompe.

**Identidad sin ancla de unicidad verificable.** Si el sistema acepta registrar personas sin verificar su número de documento, es posible registrar la misma persona varias veces con variantes de nombre o con documentos distintos. La unicidad se convierte en aspiracional en lugar de estructural.

**Cuentas técnicas con identidad humana.** Si las cuentas de integración se gestionan como usuarios humanos (con nombre, apellido, documento), el modelo de identidad se contamina con actores que no son personas. Si se les asignan roles ADMIN o SUPERADMIN, el modelo de seguridad colapsa.

**Roles técnicos asignados a la identidad en lugar de a la cuenta.** Si los roles se guardan en el registro de identidad en lugar del registro de cuenta, una persona no puede tener diferentes roles en diferentes instituciones, los roles no se pueden revocar independientemente en cada contexto, y la separación entre identidad y acceso se pierde.

### MEDIO

**No modelar el vínculo entre múltiples cuentas de una misma identidad.** Si una persona tiene cuenta ciudadana y cuenta de empleado y el sistema no las vincula explícitamente a través de la identidad, la trazabilidad entre los dos contextos es imposible. Operativamente parece funcionar; el problema aparece cuando se necesita auditar la historia completa de la persona.

**Proceso de recuperación de cuenta que crea una nueva identidad.** Si el proceso de recuperación de acceso no verifica que la identidad ya existe y crea un nuevo registro en su lugar, se produce una duplicación silenciosa. El actor original queda con una identidad huérfana.

**No distinguir suspensión de cierre de cuenta.** Si suspender y cerrar son equivalentes en el modelo, la recuperación de una cuenta suspendida por razones legítimas (ausencia temporal, licencia) requiere el mismo proceso que reintegrar a alguien dado de baja, lo cual es administrativamente incorrecto.

### BAJO

**Nomenclatura inconsistente entre persona, identidad, usuario y cuenta.** Si el equipo usa estos términos de forma intercambiable en el desarrollo, las decisiones de diseño futuras se toman sobre supuestos incorrectos. Este riesgo es bajo individualmente pero acumulativo.

**Campos de identidad excesivos desde el inicio.** Modelar todos los posibles atributos de una persona antes de conocer los requisitos reales genera complejidad innecesaria. El modelo debe ser mínimo y extensible.

---

## Principios del Modelo

### Unicidad

Cada persona tiene exactamente una identidad en Muni Digital. Esta condición es estructural, no de configuración. El sistema debe garantizarla en el momento del registro, no confiar en que los operadores la respeten.

### Persistencia

La identidad no se elimina. El cierre de cuenta, la baja laboral, el fin de mandato o el cambio de relación con la institución no eliminan la identidad. La identidad persiste como registro histórico mientras los principios de conservación de ADR-005 lo requieran.

### Independencia

La identidad es independiente de la cuenta, del rol técnico, del cargo institucional, del área y de la institución. Ninguno de estos conceptos define a la persona. La persona los precede y los trasciende.

### Trazabilidad

Toda acción ejecutada en el sistema puede rastrearse hasta la identidad de su actor. La trazabilidad no se interrumpe por el cierre de cuenta, el cambio de credenciales ni la modificación de atributos de identidad.

### Verificabilidad

La identidad está respaldada por documentación civil verificable. No puede crearse una identidad sin ancla de unicidad documentada. La identidad no es una declaración del usuario; es un registro verificado por la institución.

### Mínima exposición

Los atributos de identidad se exponen solo donde son necesarios. El módulo de permisos no necesita saber el nombre de la persona; necesita saber su rol y contexto. El módulo de auditoría necesita identificar al actor; no necesita sus atributos civiles completos en cada registro. La identidad se usa donde se necesita; no se expone globalmente.

### No repudio

La combinación de unicidad de identidad e inmutabilidad de registros de auditoría (ADR-005) garantiza que un actor no puede negar haber ejecutado una acción registrada bajo su identidad. Este principio requiere que las cuentas no sean compartidas y que el proceso de autenticación sea robusto.

### Separación de niveles

Persona, identidad, cuenta y rol son cuatro niveles conceptualmente distintos. El diseño técnico debe mantener esa separación de forma explícita. Cualquier decisión que colapse dos niveles en uno debe ser tratada como una deuda conceptual que se pagará con intereses.

---

## Person & Identity Model v1 Recomendado

El modelo conceptual de persona e identidad en Muni Digital se define de la siguiente manera:

### La persona como capa fundamental

Toda representación en el sistema comienza con una persona: un ser humano real con existencia e identidad civil previa al sistema. El sistema registra personas; no las crea.

### La identidad como representación verificada y única

Cada persona tiene exactamente una identidad en Muni Digital, verificada por documentación civil y anclada al número de documento como garante de unicidad. La identidad agrupa todos los vínculos que la persona tiene con el sistema (empleado, ciudadano, funcionario, concejal) y toda su historia. La identidad es persistente e inmutable en su núcleo; sus atributos actualizables cambian con trazabilidad.

### La cuenta como mecanismo de acceso

La cuenta es la instancia operativa que vincula una identidad con credenciales de acceso, un rol técnico y un contexto organizacional. Una identidad puede tener cero cuentas (persona registrada sin acceso al sistema), una cuenta (caso estándar) o múltiples cuentas en distintas instituciones (caso excepcional y explícito). La cuenta tiene ciclo de vida propio que no afecta la identidad ni la historia institucional.

### Las cuentas técnicas como actores no humanos

Las integraciones, webhooks y procesos automáticos tienen identidad técnica propia, con identificador único, responsable humano documentado y alcance de operación estrictamente definido. No son personas, no tienen identidad humana y no pueden tener roles de gestión (ADMIN, SUPERADMIN).

### La separación como condición de integridad

Persona, identidad, cuenta y rol son cuatro conceptos distintos en el sistema. Su separación no es una opción de diseño; es una condición de integridad del modelo. Todo el modelo de seguridad (ADR-002), de permisos (ADR-003), de empleado (ADR-004) y de auditoría (ADR-005) descansa sobre esta separación.

---

## Roadmap Conceptual

### P0 — Aprobación del modelo conceptual

**Objetivo:** Validar y aprobar este documento como fuente de verdad para toda identidad humana y técnica en Muni Digital.

Dependencias: ADR-001 a ADR-005 aprobados. Este documento revisado por el equipo técnico y los referentes institucionales.

Criterio de cierre: El equipo puede responder sin ambigüedad qué es una persona, qué es una identidad, qué es una cuenta y cuál es la diferencia entre los tres. Todo módulo futuro puede evaluarse contra este modelo para determinar cómo gestiona la identidad de sus actores.

Riesgo: CRÍTICO si algún módulo inicia implementación técnica sin este modelo aprobado. Las decisiones de estructura de datos sobre identidad son las más difíciles de corregir retroactivamente porque afectan a todos los módulos del sistema.

---

### P1 — Diseño técnico del modelo de persona e identidad

**Objetivo:** Traducir el modelo conceptual en decisiones de diseño técnico: cómo se representa la persona, cómo se garantiza la unicidad de identidad, cómo se vinculan cuentas a identidades, cómo se gestiona el historial de cambios de atributos.

Dependencias: P0 cerrado.

Criterio de cierre: El diseño técnico mantiene la separación de cuatro niveles (persona, identidad, cuenta, rol). No existe ninguna entidad que colapse dos o más niveles. La unicidad de identidad está garantizada estructuralmente, no por convención. El diseño soporta una persona con cero cuentas, una cuenta y múltiples cuentas en distintas instituciones.

Riesgo: ALTO. Es el momento donde la presión por simplicidad produce la entidad "usuario" que es persona, identidad y cuenta al mismo tiempo.

Archivos técnicos conceptuales que debe cubrir el diseño: modelo de persona, modelo de identidad con historial de atributos, modelo de cuenta con ciclo de vida, modelo de cuenta técnica, vinculación con contexto organizacional de ADR-001, vinculación con roles de ADR-002.

---

### P2 — Implementación del núcleo de identidad

**Objetivo:** El sistema puede registrar personas con verificación de unicidad, crear identidades vinculadas a personas, gestionar cuentas con ciclo de vida completo y vincular cuentas técnicas con responsable documentado.

Dependencias: P1 cerrado.

Criterio de cierre: No es posible registrar dos identidades para la misma persona. No es posible crear una cuenta sin identidad. El cierre de una cuenta no afecta la identidad ni su historial. El cambio de atributos de identidad genera historial sin modificar el registro original. Las cuentas técnicas son identificables y distintas de las cuentas humanas.

Rollback: Si P2 falla las validaciones de unicidad o separación de niveles, revertir el módulo afectado hasta corregir. No liberar a producción un modelo de identidad que colapse persona y cuenta.

---

### P3 — Integración con empleado, seguridad, permisos y auditoría

**Objetivo:** Los módulos de RRHH, seguridad, permisos y auditoría operan sobre el modelo de identidad aprobado. Los vínculos laborales de ADR-004 se registran sobre identidades existentes. Los roles de ADR-002 se asignan a cuentas, no a identidades. Los eventos de ADR-005 identifican actores a través de cuentas vinculadas a identidades.

Dependencias: P2 cerrado. ADR-004 implementado (módulo de empleado). ADR-002 y ADR-003 implementados (seguridad y permisos). ADR-005 implementado (auditoría).

Criterio de cierre: Un ciudadano que se convierte en empleado no genera duplicación de identidad. Un empleado con cuenta ciudadana y cuenta de empleado es identificado como la misma persona en auditoría. Un evento de auditoría de un actor con cuenta cerrada sigue siendo atribuible a su identidad. Las cuentas técnicas generan eventos auditables con actor identificable.

---

> Este documento define el modelo conceptual de persona e identidad de Muni Digital v1.
> No debe modificarse sin revisión del equipo de arquitectura y aprobación formal.
> Extiende ADR-001, ADR-002, ADR-003, ADR-004 y ADR-005 sin contradecirlos.
> Es la fuente de verdad para toda identidad humana y técnica en Muni Digital.
> No requiere documento sucesor inmediato: este modelo es prerequisito horizontal para todos los módulos funcionales restantes.