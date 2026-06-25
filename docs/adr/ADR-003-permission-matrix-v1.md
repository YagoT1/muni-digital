# Permissions Matrix v1 — Muni Digital

> Documento conceptual de permisos.
> Basado en: PDA.md · ADR-001 Organizational Model v1 · ADR-002 Security Model v1
> Estado: Propuesta para revisión y aprobación.
> Restricción: Este documento NO define tablas, entidades, código, guards, APIs, JWT ni implementación.

---

## Resumen Ejecutivo

El modelo de seguridad aprobado en ADR-002 establece el **quién**: cuatro roles técnicos evaluados en un contexto organizacional. Este documento establece el **qué**: qué acciones concretas puede realizar cada rol, en qué dominios funcionales, y bajo qué condiciones.

La decisión central de este documento es la siguiente:

**Un permiso en Muni Digital es una capacidad de acción sobre un dominio funcional, siempre evaluada dentro de un contexto organizacional. Los permisos no pertenecen a personas, no se derivan de cargos y no se heredan por área. Se asignan explícitamente a roles dentro de contextos.**

Este modelo extiende ADR-002 sin contradecirlo. Los cuatro roles técnicos permanecen inalterados. Lo que este documento agrega es la granularidad funcional que permite al sistema distinguir, por ejemplo, entre un INTERNO del área de RRHH y un INTERNO del área de Tesorería, dentro de la misma institución.

El modelo escala con el crecimiento institucional: nuevas áreas, nuevas instituciones y nuevos módulos se incorporan sin modificar los roles técnicos ni el modelo de autorización base.

---

## Definición de Permiso

### Qué es un permiso

Un permiso es la **habilitación explícita para ejecutar una acción específica sobre un dominio funcional del sistema, dentro de un contexto organizacional determinado**.

Un permiso tiene tres componentes inseparables:

La **acción** describe qué se puede hacer. Las acciones posibles son: consultar, crear, modificar, desactivar, exportar, auditar, configurar. La acción es el verbo del permiso.

El **dominio funcional** describe sobre qué área del sistema se ejerce la acción. Los dominios funcionales son las categorías conceptuales que se definen en la sección siguiente. El dominio es el sustantivo del permiso.

El **contexto organizacional** describe dentro de qué institución y área es válido ese permiso. El mismo par acción-dominio puede estar permitido en una institución y denegado en otra, o permitido en un área y denegado en otra. El contexto es el límite del permiso.

### Qué NO es un permiso

Un permiso **no es un rol técnico**. El rol técnico define la categoría general de un usuario (SUPERADMIN, ADMIN, INTERNO, CIUDADANO). El permiso define la acción concreta dentro de esa categoría. Un INTERNO puede tener permisos diferentes a otro INTERNO dependiendo de su contexto. El rol es el mismo; los permisos son distintos.

Un permiso **no es un cargo institucional**. El cargo de Director de RRHH es una designación del organigrama municipal. No otorga permisos automáticamente. El ADMIN de la institución decide qué permisos tiene el usuario que ocupa ese cargo, basándose en la función que cumple, no en el título que tiene.

Un permiso **no es una área**. Pertenecer al área de RRHH no otorga permisos. El área es un componente del contexto organizacional que permite acotar el alcance de los permisos, pero no los genera por sí misma.

Un permiso **no es una institución**. La institución define el límite máximo del alcance de un permiso, pero no lo crea. Pertenecer a la Municipalidad no otorga ningún permiso. Los permisos siempre son asignaciones explícitas.

### Resumen de la diferencia

El rol técnico responde a: ¿qué tipo de usuario eres?
El permiso responde a: ¿qué puedes hacer?
El área responde a: ¿en qué ámbito funcional operas?
El cargo institucional responde a: ¿qué posición tienes en el organigrama?
La institución responde a: ¿hasta dónde llega tu alcance máximo?

Ninguno de estos conceptos implica automáticamente al otro. Todos son independientes y se combinan en el momento de evaluar el acceso.

---

## Categorías de Permisos

Las categorías de permisos son los **dominios funcionales** del sistema. Representan agrupaciones conceptuales de funcionalidades relacionadas. Son independientes de los roles técnicos: un dominio puede ser accesible por múltiples roles con distintas acciones habilitadas.

Se definen los siguientes dominios funcionales para Muni Digital:

---

### Gestión de Usuarios

Comprende todo lo relacionado con el ciclo de vida de los usuarios del sistema: creación, modificación, desactivación, asignación de roles y gestión de accesos. Este dominio es sensible porque afecta directamente al modelo de seguridad.

---

### Gestión Organizacional

Comprende la configuración de la estructura institucional: creación y modificación de instituciones, áreas y la relación entre ellas. Define el contexto organizacional sobre el cual se evalúan todos los permisos.

---

### Reclamos y Solicitudes Ciudadanas

Comprende el ciclo completo de trámites iniciados por ciudadanos: recepción, clasificación, derivación, seguimiento y resolución. Es el dominio de mayor volumen operativo y el más visible para el ciudadano.

---

### Expedientes y Documentación

Comprende la gestión de expedientes administrativos internos: creación, movimiento entre áreas, firma, archivo y consulta. Es el dominio central de la operación administrativa municipal.

---

### Personal y Legajos

Comprende la gestión del personal municipal: legajos, licencias, designaciones, movimientos, sanciones y toda información vinculada al empleo público. Es el dominio exclusivo del área de RRHH y de alta sensibilidad.

---

### Auditoría y Trazabilidad

Comprende el acceso a los registros de actividad del sistema: quién hizo qué, cuándo y sobre qué dato. Es un dominio de consulta, no de modificación. Nadie puede modificar registros de auditoría.

---

### Configuración del Sistema

Comprende la configuración técnica y funcional del sistema: parámetros globales, integración con servicios externos, configuración de módulos y gestión de características habilitadas por institución.

---

### Reportes e Información Agregada

Comprende la generación de informes, estadísticas y datos agregados sobre la operación del municipio. Puede cruzar información de múltiples áreas, por lo que requiere especial atención en el contexto institucional de acceso.

---

### Comunicaciones y Notificaciones

Comprende el envío de comunicaciones oficiales, notificaciones automáticas y mensajería interna entre áreas o hacia ciudadanos.

---

### Servicios Públicos Ciudadanos

Comprende las funcionalidades disponibles para ciudadanos: consulta de trámites, presentación de solicitudes, descarga de documentos y acceso a información pública. Es el único dominio accesible por el rol CIUDADANO.

---

## Relación entre Roles y Permisos

La relación entre rol técnico, institución, área y permiso se evalúa como un sistema de tres capas anidadas. Ninguna capa puede omitirse.

### Primera capa: el rol técnico define el universo posible

Cada rol técnico tiene un conjunto máximo de acciones que puede ejecutar en el sistema, independientemente del contexto. Ningún usuario puede tener permisos que superen el límite máximo de su rol técnico. Un INTERNO nunca puede tener permisos de gestión de usuarios, sin importar en qué institución esté o qué cargo tenga.

### Segunda capa: la institución define el límite de alcance

Dentro del universo posible para su rol, un usuario solo puede ejercer acciones sobre datos e información de su propia institución. No hay permisos que crucen instituciones, excepto para el SUPERADMIN que opera a nivel global.

### Tercera capa: el área define el ámbito funcional activo

Dentro de la institución, el área determina qué dominios funcionales están activos para ese usuario. Un INTERNO del área de RRHH tiene habilitado el dominio de Personal y Legajos. Un INTERNO del área de Tesorería no lo tiene habilitado, aunque ambos sean INTERNOs de la misma institución.

### Cómo se asignan los permisos en la práctica

El SUPERADMIN configura qué dominios funcionales existen en el sistema.
El ADMIN de cada institución configura qué dominios están habilitados por área dentro de su institución.
Cuando se asigna un usuario a un área, hereda los permisos configurados para esa área por el ADMIN.
Si un usuario necesita permisos adicionales fuera de los configurados para su área, el ADMIN puede asignarlos individualmente con justificación registrada.

Este mecanismo garantiza que el modelo sea gestionable: el ADMIN no configura permisos usuario por usuario en la mayoría de los casos. Configura el área y los usuarios del área obtienen los permisos correspondientes. Las excepciones son explícitas y auditables.

---

## SUPERADMIN

### Capacidades que debe tener

El SUPERADMIN tiene acceso completo a todos los dominios funcionales de todas las instituciones. Puede crear y desactivar instituciones. Puede crear, modificar y revocar ADMINs. Puede acceder al dominio de Auditoría y Trazabilidad de cualquier institución. Puede configurar parámetros globales del sistema. Puede intervenir en situaciones de bloqueo administrativo donde ningún ADMIN puede actuar (por ejemplo, si el único ADMIN de una institución está inactivo).

### Capacidades que NO debería usar normalmente

El SUPERADMIN no debería operar en dominios funcionales de instituciones específicas en la operación cotidiana. No debería crear usuarios operativos (INTERNOs) directamente: eso es responsabilidad del ADMIN institucional. No debería modificar datos de reclamos, expedientes o legajos directamente, salvo situación de emergencia documentada.

La razón de estas restricciones no es técnica sino de gobernanza: si el SUPERADMIN opera cotidianamente en datos institucionales, se convierte en un actor invisible en la trazabilidad institucional y genera confusión sobre la responsabilidad de los datos.

### Acciones que requieren auditoría obligatoria

Toda acción del SUPERADMIN requiere auditoría obligatoria sin excepción. La auditoría debe registrar el actor, la acción, el objeto afectado, el timestamp y la justificación cuando la acción sea sobre datos de una institución específica.

---

## ADMIN

### Qué puede administrar

El ADMIN puede gestionar el ciclo de vida completo de usuarios dentro de su institución: crear, modificar, desactivar y asignar roles técnicos INTERNO. Puede configurar las áreas de su institución. Puede asignar y revocar permisos de área. Puede consultar el dominio de Auditoría dentro de su institución. Puede configurar qué dominios funcionales están habilitados para cada área de su institución.

### Qué no puede administrar

El ADMIN no puede actuar sobre usuarios de otras instituciones. No puede crear otros ADMINs (eso requiere SUPERADMIN). No puede modificar parámetros globales del sistema. No puede acceder a datos de otras instituciones, ni siquiera en modo consulta. No puede asignar roles técnicos SUPERADMIN ni ADMIN.

### Límites institucionales

El límite institucional del ADMIN es absoluto. No existen permisos de "colaboración entre instituciones" que el ADMIN pueda otorgar unilateralmente. Si dos instituciones necesitan compartir información, eso se define a nivel de sistema por el SUPERADMIN, no a través de permisos cruzados que el ADMIN conceda.

### Relación con otras instituciones

El ADMIN no tiene relación técnica con otras instituciones. No puede ver su estructura, sus usuarios ni sus configuraciones. Esta separación protege la autonomía institucional y es coherente con la independencia entre Municipalidad, HCD, Hospital y cualquier institución futura.

---

## INTERNO

### Permisos por defecto

Un INTERNO recién creado no tiene permisos activos hasta ser asignado a un área. La asignación a un área es el mecanismo que activa los permisos. Sin área asignada, el INTERNO puede autenticarse en el sistema pero no puede ejecutar ninguna acción funcional.

### Permisos dependientes del área

El área determina qué dominios funcionales están disponibles para el INTERNO. El área de RRHH habilita el dominio de Personal y Legajos. El área de Mesa de Entradas habilita el dominio de Reclamos y Solicitudes. El área de Tesorería habilita dominios financieros cuando estos existan. El área de Sistemas habilita el dominio de Configuración dentro de los límites que el ADMIN defina.

Los permisos por área son el mecanismo estándar. Cubre la mayoría de los casos operativos sin necesidad de configuración individual.

### Permisos dependientes de funciones específicas

Dentro de un área, puede existir diferenciación funcional. En el área de RRHH, no todos los agentes necesitan el mismo acceso: alguien puede gestionar licencias pero no tener acceso a sanciones. Estas diferenciaciones se configuran a nivel de función dentro del área.

El modelo conceptual distingue tres niveles de acción dentro de un dominio para un INTERNO: consulta (ver información), operación (crear y modificar registros) y validación (aprobar o rechazar acciones de otros). Cuál de estos niveles tiene un INTERNO en un dominio específico depende de la configuración de su área y función.

---

## CIUDADANO

### Qué puede consultar

El CIUDADANO puede consultar el estado de sus propios trámites iniciados. Puede ver información pública municipal disponible en el sistema. No puede ver información de otros ciudadanos. No puede ver información interna del municipio.

### Qué puede iniciar

El CIUDADANO puede iniciar solicitudes y reclamos habilitados para el público en el dominio de Servicios Públicos Ciudadanos. La iniciación de un trámite genera un registro que pasa al dominio interno de Reclamos y Solicitudes, donde los INTERNOs correspondientes lo gestionan. El CIUDADANO no tiene visibilidad del proceso interno, solo del estado público del trámite.

### Qué información puede visualizar

El CIUDADANO puede visualizar únicamente información que se le otorgó explícitamente: el estado de sus propios trámites, documentos emitidos a su nombre y notificaciones dirigidas a él. El CIUDADANO no puede deducir información institucional a partir de los datos que consulta. El diseño del sistema debe garantizar que las respuestas al CIUDADANO no expongan datos internos de forma inadvertida.

### Separación total del entorno interno

El CIUDADANO opera en un espacio funcionalmente separado. No comparte sesión, contexto ni datos con el entorno INTERNO. Esta separación es estructural, no solo de permisos.

---

## RRHH

### Qué funcionalidades necesita RRHH

RRHH necesita acceso completo al dominio de Personal y Legajos dentro de su institución: gestión de legajos individuales, registro y aprobación de licencias, carga de designaciones y movimientos de personal, registro de sanciones y sumarios, consulta de dotación por área, generación de reportes de personal.

Adicionalmente, RRHH necesita acceso de consulta al dominio de Gestión Organizacional para poder ver la estructura de áreas y cargos institucionales vigentes, que son el marco de referencia para la gestión del personal.

### Qué permisos requiere RRHH

Los permisos de RRHH se configuran a nivel de área dentro del dominio de Personal y Legajos, con distinción entre los tres niveles de acción: consulta, operación y validación. El nivel de validación (aprobar licencias, confirmar movimientos) puede requerir diferenciación interna dentro del área, donde solo algunos agentes tienen capacidad de aprobación formal.

RRHH requiere también acceso al dominio de Reportes e Información Agregada, acotado al personal de su institución.

### Qué permisos NO debería tener RRHH

RRHH no debe tener acceso al dominio de Gestión de Usuarios. La autoridad institucional de RRHH sobre el personal no incluye la capacidad de crear, modificar o desactivar usuarios del sistema. Esa responsabilidad pertenece al ADMIN.

RRHH no debe tener acceso al dominio de Expedientes y Documentación de áreas que no sean RRHH. El expediente de una obra pública o de un reclamo ciudadano no es competencia de RRHH.

RRHH no debe tener acceso al dominio de Configuración del Sistema.

RRHH no debe poder modificar los roles técnicos de los agentes que gestiona institucionalmente. Puede saber quiénes son, qué cargo tienen y qué área integran, pero no puede cambiar sus permisos en el sistema.

### Reafirmación del modelo

RRHH es un área con acceso privilegiado a un dominio funcional específico (Personal y Legajos). No es un rol técnico elevado. No tiene capacidades de administración del sistema. Su autoridad institucional y sus permisos técnicos son conceptos distintos y deben mantenerse separados permanentemente.

---

## HCD

### Permisos propios del HCD

El HCD opera como institución independiente. Dentro de su contexto institucional, el HCD tiene acceso pleno a los dominios funcionales que correspondan a su operación: gestión de sesiones y actas del Concejo, seguimiento de ordenanzas, gestión de su propio personal a través de su propio RRHH (si tiene área de RRHH), reclamos ciudadanos dirigidos al Concejo y expedientes internos del HCD.

### Permisos que podrían compartirse

El concepto de "compartir permisos" entre instituciones no existe en este modelo. Lo que puede existir es acceso a **información pública** que el sistema expone sin contexto institucional: por ejemplo, la consulta del estado de un expediente que tiene componente legislativo puede ser visible tanto desde el contexto Municipalidad como desde el contexto HCD, si el diseño del módulo así lo define.

La diferencia conceptual es crítica: no es que el HCD tenga permisos sobre datos de la Municipalidad. Es que ciertos datos son públicos o interinstitucionales por naturaleza y el sistema los expone de forma controlada a ambos contextos. Esto se define módulo por módulo, no como una política general de compartición.

### Límites que deben existir

El HCD no puede acceder a los legajos del personal de la Municipalidad. El HCD no puede ver los reclamos ciudadanos gestionados por la Municipalidad, salvo que exista un proceso formal de derivación. El ADMIN del HCD no puede gestionar usuarios de la Municipalidad. La Municipalidad no puede acceder a las actas internas del HCD.

La regla es simple: lo que no está explícitamente definido como accesible desde otro contexto institucional, es privado de la institución que lo genera.

---

## Auditoría

### Principio general

La auditoría en Muni Digital no es opcional para las acciones sensibles. Es una condición del modelo de seguridad. El registro de auditoría no puede ser modificado por ningún usuario, incluido el SUPERADMIN. La auditoría es el mecanismo de trazabilidad que da validez legal y administrativa a las operaciones del sistema.

### Auditoría obligatoria

Las siguientes acciones deben registrarse sin excepción, automáticamente, sin posibilidad de deshabilitación:

Todas las acciones del SUPERADMIN sobre cualquier recurso.
Creación, modificación y desactivación de usuarios por parte de ADMIN.
Asignación y revocación de roles técnicos.
Asignación y revocación de permisos individuales fuera del perfil de área.
Acceso al dominio de Personal y Legajos (consultas incluidas, dado su carácter sensible).
Creación y cierre de expedientes.
Aprobaciones formales en cualquier dominio (licencias, designaciones, resoluciones).
Acceso al dominio de Auditoría y Trazabilidad.
Exportación de datos en cualquier dominio.
Cambios en la configuración del sistema.

### Auditoría recomendada

Las siguientes acciones deberían registrarse en la mayoría de las implementaciones, aunque con menor criticidad inmediata:

Consultas sobre legajos individuales de personal.
Modificaciones en expedientes existentes.
Generación de reportes agregados.
Cambios en la estructura de áreas dentro de una institución.
Inicio de trámites por parte de ciudadanos.
Cambios de estado en reclamos y solicitudes.

### Auditoría opcional

Las siguientes acciones pueden registrarse según la política de cada institución:

Consultas de información pública por ciudadanos.
Consultas de estado de trámites propios por ciudadanos.
Acceso a módulos de solo lectura por INTERNOs con perfil estándar.
Generación de reportes internos de uso frecuente.

---

## Riesgos

### CRÍTICO

**Derivar permisos del cargo institucional.** Si el sistema asigna permisos basándose en el cargo, cualquier cambio de organigrama produce brechas automáticas e invisibles. Es el riesgo más frecuente y el más difícil de detectar una vez que el sistema está en producción.

**Permitir que el ADMIN se auto-eleve.** Si el modelo permite que un ADMIN asigne su propio rol a ADMIN de otra institución o a SUPERADMIN, la cadena de administración colapsa. Este error suele introducirse "temporalmente" durante el desarrollo y permanece indefinidamente.

**No aislar el contexto institucional en la evaluación de permisos.** Si la evaluación de permisos no incluye la institución como condición, un INTERNO de la Municipalidad puede ejecutar acciones sobre datos del HCD. Este riesgo es silencioso en entornos de prueba donde solo existe una institución.

**Permisos acumulativos no revisados tras cambio de área.** Si un usuario cambia de área y el sistema no revoca los permisos del área anterior, acumula acceso a múltiples dominios funcionales sin justificación. Este riesgo crece con el tiempo y la rotación de personal.

**Dominio de Auditoría modificable.** Si los registros de auditoría pueden ser modificados o eliminados por algún rol, el sistema pierde trazabilidad legal. Esto invalida el valor probatorio de todos los registros.

### ALTO

**RRHH con acceso al dominio de Gestión de Usuarios.** Si se decide darle a RRHH capacidad de gestionar usuarios "por comodidad operativa", se mezclan responsabilidades y RRHH puede modificar permisos de sus propios supervisores.

**Permisos de área demasiado amplios como política de onboarding.** Habilitar todos los dominios para un área nueva y restringir después es una práctica que genera acceso indebido desde el inicio y que rara vez se corrige formalmente.

**CIUDADANO con acceso a cualquier funcionalidad INTERNA por error de asignación.** Un error en la asignación de rol durante la creación de usuario puede exponer datos internos a un ciudadano. El sistema debe validar que CIUDADANO e INTERNO sean mutuamente excluyentes.

**Falta de proceso formal para gestión de permisos temporales.** Comisiones, reemplazos y accesos de emergencia otorgados sin fecha de expiración se convierten en permisos permanentes no gestionados.

**Exportación de datos sin auditoría.** Si los dominios permiten exportar información sin registro, es imposible detectar exfiltración de datos.

### MEDIO

**Proliferación de excepciones individuales de permisos.** Si el ADMIN constantemente agrega permisos individuales fuera del perfil de área, la configuración se vuelve inmanejable y la auditoría pierde claridad. Indica que la definición de áreas es incorrecta o incompleta.

**Dominios funcionales sin propietario claro.** Si no se define qué área es responsable de cada dominio, múltiples áreas asumen que tienen permisos y el ADMIN otorga acceso duplicado sin criterio.

**Roles técnicos usados como categorías organizacionales.** Crear roles como "JEFE", "COORDINADOR" o "SUPERVISOR" porque la jerarquía municipal lo requiere reproduce el organigrama dentro del sistema de seguridad, exactamente lo que ADR-002 prohíbe.

**Falta de revisión periódica de permisos activos.** Sin un proceso de revisión, los permisos activos divergen progresivamente de la realidad operativa de la institución.

### BAJO

**Nomenclatura inconsistente de dominios entre instituciones.** No genera riesgos de acceso pero dificulta la auditoría centralizada y el soporte.

**Áreas configuradas sin usuarios asignados.** Genera ruido en la configuración pero no representa acceso indebido.

**Documentación de permisos desactualizada.** Riesgo bajo a corto plazo, alto a largo plazo cuando hay cambios de personal en el equipo de desarrollo o soporte.

---

## Permissions Matrix v1 Recomendado

El modelo conceptual de permisos de Muni Digital se define de la siguiente manera:

### Estructura del permiso

Un permiso es la combinación de una acción (consultar, crear, modificar, desactivar, exportar, auditar, configurar) sobre un dominio funcional (los diez dominios definidos en este documento), evaluada dentro de un contexto organizacional (institución + área). Las tres dimensiones son obligatorias.

### Asignación estándar por área

El mecanismo estándar de asignación de permisos es la configuración de área. El ADMIN define qué dominios funcionales están habilitados para cada área, y qué nivel de acción (consulta, operación, validación) tiene esa área en cada dominio. Los usuarios asignados a un área obtienen automáticamente los permisos configurados para ella.

### Asignación excepcional individual

Cuando un usuario necesita permisos que superan o difieren del perfil de su área, el ADMIN puede asignar permisos individuales adicionales. Estas asignaciones son explícitas, quedan registradas en auditoría, y deben incluir justificación. No pueden superar el límite máximo del rol técnico del usuario.

### Límites máximos por rol técnico

El SUPERADMIN no tiene límites de permiso. Opera sobre todos los dominios de todas las instituciones. Toda acción requiere auditoría obligatoria.

El ADMIN puede operar en los dominios de Gestión de Usuarios, Gestión Organizacional, Auditoría y Trazabilidad (de su institución), y Configuración del Sistema (de su institución). No puede operar en dominios funcionales de otras instituciones.

El INTERNO puede operar únicamente en los dominios habilitados para su área dentro de su institución. El límite máximo del INTERNO excluye permanentemente los dominios de Gestión de Usuarios y Configuración del Sistema global.

El CIUDADANO opera exclusivamente en el dominio de Servicios Públicos Ciudadanos. No tiene acceso a ningún otro dominio.

### Principio de no herencia implícita

Ningún permiso se hereda por cargo, antigüedad, jerarquía organizacional o cualquier criterio distinto de la asignación explícita por área o individual. Cuando una persona cambia de área, sus permisos anteriores se revocan automáticamente. Cuando una persona cambia de cargo institucional, sus permisos no cambian a menos que el ADMIN los modifique explícitamente.

### Invariantes del modelo

Los cuatro roles técnicos definidos en ADR-002 son inmutables. No se crean roles nuevos para resolver necesidades de permisos; se resuelven a través de la configuración de dominios por área.

El aislamiento institucional es absoluto. Ningún permiso puede cruzar el límite institucional sin intervención del SUPERADMIN.

La auditoría de acciones críticas es no negociable. No existe configuración que permita deshabilitar el registro de auditoría para las acciones clasificadas como obligatorias.

---

## Roadmap Conceptual

El roadmap de permisos se ejecuta en cuatro fases independientes y verificables. Ninguna fase comienza sin que la anterior esté formalmente cerrada.

---

### P0 — Aprobación del modelo conceptual

**Objetivo:** Validar y aprobar este documento como fuente de verdad del sistema de permisos.

Dependencias: ADR-001 aprobado. ADR-002 aprobado. Este documento revisado por el equipo técnico y los referentes municipales.

Criterio de cierre: No existe ambigüedad sobre la definición de permiso, los dominios funcionales y los límites por rol. El equipo de desarrollo puede responder, basándose solo en este documento, qué puede hacer cada rol en cada dominio.

Riesgo: CRÍTICO si se avanza a implementación sin este cierre. Las decisiones de diseño tomadas sin modelo conceptual aprobado generan deuda estructural.

---

### P1 — Diseño técnico del sistema de permisos

**Objetivo:** Traducir el modelo conceptual en decisiones de diseño técnico: cómo se representan los dominios, cómo se evalúan las tres dimensiones del permiso (acción + dominio + contexto), cómo se almacena y audita la configuración de permisos.

Dependencias: P0 cerrado.

Criterio de cierre: Existe un documento de diseño técnico que implementa este modelo sin contradicirlo. El diseño técnico define la estructura de datos necesaria sin violar ADR-001 ni ADR-002.

Riesgo: ALTO. Es el momento donde los desarrolladores tienden a simplificar el modelo "para avanzar rápido", eliminando el contexto organizacional y volviendo a RBAC puro.

Archivos que el diseño técnico debe cubrir: modelo de datos de permisos, mecanismo de evaluación de acceso, integración con el contexto organizacional de ADR-001, integración con los roles técnicos de ADR-002, estructura de registros de auditoría.

---

### P2 — Implementación del núcleo de permisos

**Objetivo:** El sistema puede evaluar correctamente el acceso para cualquier combinación de rol + institución + área + dominio. La asignación de permisos por área funciona. La auditoría obligatoria está activa.

Dependencias: P1 cerrado.

Criterio de cierre: Tests de aislamiento institucional exitosos. Tests de límites por rol técnico exitosos. Tests de no herencia implícita exitosos. Registro de auditoría verificable para todas las acciones clasificadas como obligatorias.

Rollback: Si P2 falla las validaciones, revertir a configuración de acceso mínimo (ningún INTERNO con permisos activos) hasta corregir.

---

### P3 — Configuración de dominios por área e institución

**Objetivo:** Las instituciones reales (Municipalidad, HCD) tienen sus áreas configuradas con los dominios funcionales correctos. Los usuarios operativos pueden trabajar dentro de sus permisos configurados. El ADMIN puede gestionar la configuración sin asistencia técnica.

Dependencias: P2 cerrado.

Criterio de cierre: Un ADMIN puede crear un área, asignarle dominios, crear un usuario y asignarlo al área sin intervención del equipo técnico. Un INTERNO de RRHH puede operar en Personal y Legajos y no puede acceder a ningún otro dominio. Un CIUDADANO no puede acceder a ninguna funcionalidad interna.

---

> Este documento define el modelo conceptual de permisos de Muni Digital v1.
> No debe modificarse sin revisión del equipo de arquitectura y aprobación formal.
> No contradice ADR-001 ni ADR-002. Los extiende.
> Próximo documento requerido: Diseño Técnico del Sistema de Permisos (P1).
