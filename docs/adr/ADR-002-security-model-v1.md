Security Model v1 — Muni Digital
> Documento conceptual de seguridad.
> Basado en: PDA.md · ADR-001 Organizational Model v1
> Estado: Propuesta para revisión y aprobación.
> Restricción: Este documento NO define tablas, entidades, código, APIs, JWT ni implementación.
---
Resumen Ejecutivo
Muni Digital opera sobre una estructura organizacional municipal real, con múltiples instituciones, jerarquías heterogéneas, actores internos y ciudadanos externos. El modelo de seguridad debe reflejar esa complejidad sin sobre-ingeniería.
El error más frecuente en sistemas municipales es confundir el cargo institucional de una persona con su nivel de acceso técnico al sistema. Un Director de RRHH tiene autoridad institucional sobre el personal, pero eso no significa que deba tener acceso irrestricto a toda la información del sistema. Esa confusión genera brechas de seguridad estructurales.
La decisión central de este documento es la siguiente:
El acceso en Muni Digital se controla mediante Roles Técnicos combinados con Contexto Organizacional. El cargo institucional informa pero nunca determina por sí solo el acceso técnico.
Este modelo es escalable, auditable y compatible con la estructura municipal argentina sin requerir rediseño cuando el organigrama cambia.
---
Roles Técnicos
Los roles técnicos son categorías de acceso al sistema. No describen quién es la persona ni qué cargo tiene. Describen qué puede hacer dentro de Muni Digital.
Se definen cuatro roles técnicos:
---
SUPERADMIN
Justificación: Muni Digital es un sistema multi-institución. Alguien debe poder configurar el sistema a nivel global, crear instituciones, gestionar administradores y actuar ante situaciones de emergencia técnica. Este rol no existe en el organigrama municipal. Es un rol puramente técnico del sistema.
Responsabilidades:
Configurar el sistema a nivel global. Crear y desactivar instituciones. Asignar y revocar ADMINs. Acceder a logs de auditoría completos. Intervenir en situaciones de bloqueo administrativo.
Límites:
No debe usar este rol para operación cotidiana. No debe usarse para acceder a datos operativos de instituciones salvo auditoría justificada. Toda acción de SUPERADMIN debe quedar registrada con justificación. Debe ser un rol asignado a personas identificadas, no a procesos automáticos.
Quién lo tiene: Personal técnico responsable del sistema. Nunca un funcionario municipal por su cargo.
---
ADMIN
Justificación: Cada institución necesita autonomía para gestionar sus propios usuarios, áreas y configuraciones internas. El ADMIN es el administrador institucional. Conoce la estructura de su institución y es responsable de que los accesos sean correctos dentro de ella.
Responsabilidades:
Crear, modificar y desactivar usuarios dentro de su institución. Asignar roles técnicos INTERNO dentro de su institución. Configurar áreas dentro de su institución. Gestionar cargos institucionales dentro de su institución.
Límites:
No puede actuar sobre usuarios de otra institución. No puede crear otros ADMINs sin autorización de SUPERADMIN. No puede modificar la configuración global del sistema. No puede acceder a datos de otras instituciones.
Quién lo tiene: Generalmente el responsable de sistemas o el referente designado de cada institución. El cargo institucional de esta persona es irrelevante para este rol.
---
INTERNO
Justificación: La mayoría de los agentes municipales necesitan usar el sistema para realizar su trabajo cotidiano: cargar datos, consultar información, tramitar expedientes, gestionar personal. Tienen acceso acotado según su área y función real.
Responsabilidades:
Operar las funcionalidades asignadas dentro de su área. Consultar información autorizada. Ejecutar trámites y procesos habilitados para su contexto.
Límites:
No puede ver información de otras áreas salvo que esté explícitamente autorizado. No puede gestionar usuarios. No puede modificar configuraciones del sistema. Su acceso está delimitado por el contexto organizacional: institución + área + función.
Quién lo tiene: Todo agente municipal con acceso al sistema.
---
CIUDADANO
Justificación: Muni Digital interactúa con el ciudadano. El ciudadano no es parte de la organización municipal. Tiene un perfil diferente, necesidades diferentes y debe estar completamente aislado del entorno interno.
Responsabilidades:
Acceder a servicios municipales habilitados para el público. Consultar el estado de sus propios trámites. Presentar solicitudes.
Límites:
No puede ver ningún dato interno del municipio. No puede interactuar con otros ciudadanos a través del sistema. No puede acceder a ninguna funcionalidad administrativa. Su sesión y sus datos están completamente separados del entorno interno.
Quién lo tiene: Cualquier persona registrada como ciudadano en el sistema.
---
Separación de Conceptos
Este es el punto más crítico del modelo. La confusión entre estos cuatro conceptos es la fuente de la mayoría de las brechas de seguridad en sistemas municipales.
---
Definiciones
Institución es la unidad organizacional de más alto nivel. Ejemplo: Municipalidad de Roque Pérez, Hospital Municipal, HCD. Cada institución tiene su propio espacio de datos, su propio ADMIN y sus propias reglas internas.
Área es una división dentro de una institución. Ejemplo: RRHH, Tesorería, Mesa de Entradas. El área define el ámbito de trabajo de una persona, no su nivel de acceso.
Cargo Institucional es la posición formal que ocupa una persona en el organigrama. Ejemplo: Director de RRHH, Secretario de Hacienda, Jefe de Obras Públicas. El cargo describe autoridad institucional, no acceso técnico.
Rol Técnico es la categoría de acceso al sistema. Es el único concepto que determina qué puede hacer una persona dentro de Muni Digital.
---
Errores de seguridad cuando se mezclan
Error 1: Usar el cargo para determinar el acceso.
Si el sistema asigna permisos basándose en el cargo institucional, ocurre lo siguiente: cuando una persona cambia de cargo, sus permisos quedan desactualizados. Cuando dos personas tienen el mismo cargo en distintas instituciones, pueden acceder a información que no les corresponde. Un Director interino hereda permisos que no debería tener. Este error es CRÍTICO porque es silencioso: el sistema funciona correctamente pero el acceso es incorrecto.
Error 2: Usar el área como permiso.
Si se asume que pertenecer a RRHH otorga acceso a toda la información de personal, cualquier persona que sea trasladada a RRHH temporalmente tiene acceso completo. Un pasante en RRHH ve lo mismo que el Director. Este error es ALTO porque es fácil de cometer y difícil de detectar.
Error 3: No separar instituciones.
Si el sistema no aísla correctamente los datos por institución, un ADMIN del Hospital puede ver expedientes de la Municipalidad. Un agente del HCD puede consultar legajos de empleados municipales. Este error es CRÍTICO porque viola la autonomía institucional y puede tener consecuencias legales.
Error 4: Asumir que SUPERADMIN debe ser un cargo municipal.
Si se designa como SUPERADMIN al Director de Sistemas porque tiene ese cargo, la persona usa ese rol para operación cotidiana. Cuando cambia el Director, el acceso queda sin gestionar. Este error es ALTO porque mezcla jerarquía institucional con privilegio técnico máximo.
Error 5: Dar a RRHH acceso técnico elevado porque tiene autoridad institucional.
La autoridad de RRHH sobre el personal es institucional, no técnica. RRHH puede aprobar una licencia, pero eso no significa que deba poder modificar el rol técnico de un agente en el sistema. Este error es ALTO y se detalla en la sección correspondiente.
---
Modelo de Autorización Recomendado
Evaluación de alternativas consideradas
RBAC puro asigna permisos únicamente por rol. Es simple pero insuficiente para Muni Digital porque no distingue entre un INTERNO del Hospital y un INTERNO de la Municipalidad. Todos los INTERNOs verían lo mismo, lo cual viola el aislamiento institucional.
RBAC + Permisos granulares agrega permisos individuales sobre el rol. Permite ajuste fino pero genera explosión de permisos con el tiempo. En un municipio con alta rotación de personal y reorganizaciones frecuentes, mantener permisos individuales es inviable operativamente. Genera deuda de seguridad acumulada.
RBAC + Contexto Organizacional asigna el rol técnico pero lo evalúa siempre dentro de un contexto: institución y área. El acceso no depende solo de quién eres, sino de quién eres dentro de dónde. Este modelo es el único que refleja la realidad municipal.
Modelo elegido: RBAC + Contexto Organizacional
La autorización en Muni Digital se resuelve combinando tres elementos:
El rol técnico define la capacidad de acción: qué tipo de operaciones puede realizar una persona.
El contexto institucional define el alcance: sobre qué institución puede ejercer esas operaciones.
El contexto de área define el ámbito funcional: dentro de qué área operativa puede actuar.
Una persona con rol INTERNO en el Área de RRHH de la Municipalidad puede realizar las operaciones habilitadas para ese área dentro de esa institución. No puede realizar esas mismas operaciones en RRHH del Hospital, aunque el área tenga el mismo nombre, porque el contexto institucional es diferente.
Este modelo escala naturalmente. Cuando se crea una nueva institución, se crea su contexto. Cuando se crea un área nueva, se incorpora al contexto. El rol técnico no cambia. El sistema no necesita rediseño.
Principio de evaluación del acceso
Para cualquier solicitud de acceso, el sistema evalúa en este orden:
Primero: ¿El rol técnico de la persona permite este tipo de operación?
Segundo: ¿La institución de la persona corresponde al contexto de lo que se intenta acceder?
Tercero: ¿El área de la persona tiene habilitada esta función dentro de esa institución?
Si cualquiera de las tres condiciones falla, el acceso se deniega. No hay excepciones implícitas.
---
Administración de Usuarios
La gestión de usuarios sigue una cadena de responsabilidad descendente y delimitada por contexto institucional.
¿Quién puede crear usuarios?
El SUPERADMIN puede crear usuarios en cualquier institución. El ADMIN puede crear usuarios únicamente dentro de su propia institución. Ningún INTERNO puede crear usuarios.
¿Quién puede desactivar usuarios?
El SUPERADMIN puede desactivar cualquier usuario. El ADMIN puede desactivar usuarios de su institución. Un ADMIN no puede desactivar a otro ADMIN sin intervención del SUPERADMIN. Ningún INTERNO puede desactivar usuarios.
¿Quién puede modificar datos de usuarios?
El SUPERADMIN puede modificar cualquier usuario. El ADMIN puede modificar usuarios de su institución, incluyendo cambios de área y cargo institucional. Un usuario INTERNO puede modificar sus propios datos de perfil no sensibles, dentro de los límites que el ADMIN defina.
¿Quién puede modificar roles técnicos?
El SUPERADMIN puede modificar cualquier rol técnico. El ADMIN puede asignar el rol INTERNO a usuarios de su institución. El ADMIN no puede auto-asignarse SUPERADMIN ni crear otros ADMINs por su cuenta. El ADMIN no puede asignar el rol CIUDADANO a un agente interno ni viceversa.
¿Quién puede modificar permisos contextuales?
El ADMIN puede configurar qué áreas de su institución tienen acceso a qué funcionalidades. El SUPERADMIN puede auditar y corregir cualquier configuración. Los INTERNOs no tienen capacidad de modificar su propio acceso.
¿Quién puede administrar administradores?
Solo el SUPERADMIN puede crear, modificar y revocar ADMINs. Este es un punto de control no delegable. Si un ADMIN necesita ser reemplazado, la operación requiere intervención de SUPERADMIN. Esto previene que una institución se quede sin acceso o que el acceso administrativo prolifere sin control.
---
RRHH
¿RRHH es un rol o un área?
RRHH es un área. No es un rol técnico. Una persona que trabaja en el área de RRHH tiene el rol técnico INTERNO, con contexto de área RRHH dentro de su institución.
¿RRHH debe tener privilegios especiales?
No en el sentido técnico del término. RRHH tiene autoridad institucional sobre la gestión del personal municipal. Esa autoridad se traduce en que las funcionalidades del módulo de personal están habilitadas para su área. Pero eso no le da privilegio técnico elevado: sigue siendo un INTERNO.
La diferencia es crucial: RRHH puede gestionar legajos, licencias y movimientos de personal porque esas funcionalidades están asignadas a su área. No puede gestionar usuarios del sistema, no puede modificar roles técnicos, no puede ver datos de otras instituciones.
¿Sobre quién puede actuar RRHH?
RRHH puede actuar sobre el personal de su propia institución, en el alcance de las funcionalidades habilitadas para su área: legajos, licencias, cargos institucionales, movimientos de personal.
¿Sobre quién NO puede actuar RRHH?
RRHH no puede actuar sobre:
Personal de otras instituciones, aunque se llamen RRHH también. Los roles técnicos de los agentes en el sistema: eso es responsabilidad del ADMIN. Usuarios con rol ADMIN o SUPERADMIN: su gestión está fuera del alcance de RRHH. El propio personal de RRHH, en lo que respecta a sus propios legajos en situaciones donde exista conflicto de interés, aunque esto es una decisión de política institucional más que técnica.
Riesgo específico a evitar
El error más común es darle a RRHH acceso de ADMIN porque "necesita ver todo el personal". Ver información de personal dentro de su institución es una funcionalidad del área, no requiere rol de administrador. Si se le da ADMIN a RRHH, RRHH puede crear usuarios, modificar roles y gestionar áreas, lo cual no es su función y representa una brecha de seguridad grave.
---
HCD
El Honorable Concejo Deliberante es una institución con autonomía política y administrativa respecto al Ejecutivo Municipal. Esta independencia institucional debe reflejarse en el modelo de seguridad.
Independencia institucional
El HCD debe ser una institución separada dentro de Muni Digital. No comparte administración con la Municipalidad. Tiene su propio ADMIN. Sus datos están aislados de los datos del Ejecutivo. Sus agentes son INTERNOs del HCD, no de la Municipalidad.
No comparte administración
El ADMIN de la Municipalidad no puede crear usuarios del HCD. El ADMIN del HCD no puede crear usuarios de la Municipalidad. Esta separación es no negociable porque refleja la independencia de poderes municipal.
No comparte permisos automáticamente
El hecho de que un módulo exista en la Municipalidad no significa que el HCD tenga acceso a él. El HCD habilita sus propias funcionalidades dentro de su contexto institucional. Si hay funcionalidades compartidas (por ejemplo, consulta de ciertos expedientes públicos), esas funcionalidades se definen explícitamente como accesibles desde el contexto HCD, no se heredan.
Punto de coordinación técnica
El SUPERADMIN es el único punto de coordinación técnica entre la Municipalidad y el HCD. Si hay necesidad de intercambio de información entre instituciones, eso se define a nivel de sistema, no a nivel de administración cruzada.
---
Principio de Menor Privilegio
El principio de menor privilegio establece que cada usuario debe tener acceso únicamente a lo que necesita para cumplir su función, y nada más.
Aplicación en Muni Digital
Todo usuario comienza sin permisos. El acceso se otorga explícitamente, nunca se hereda automáticamente por pertenecer a un área o tener un cargo. Cuando una persona cambia de área, sus permisos del área anterior se revocan. Cuando una persona cambia de cargo institucional, ese cambio no altera su rol técnico automáticamente: el ADMIN debe revisar y ajustar si corresponde. El acceso temporal (comisiones, reemplazos) se otorga con fecha de expiración o revisión.
Riesgos identificados
Acumulación silenciosa de permisos. Cuando una persona cambia de área pero mantiene los permisos del área anterior. Este riesgo es ALTO y ocurre sin que nadie lo detecte si no hay auditoría activa.
Permisos por cargo heredado. Cuando se asigna acceso basado en el cargo y el cargo cambia sin actualización en el sistema. Este riesgo es CRÍTICO.
Rol elevado para simplificar onboarding. Dar rol ADMIN a alguien temporalmente para que pueda configurar su propio acceso. Este riesgo es ALTO y deja al sistema en estado inseguro indefinidamente si no se revoca.
SUPERADMIN como usuario operativo. Usar el rol de máximo privilegio para tareas cotidianas. Este riesgo es CRÍTICO porque cualquier error operativo tiene impacto global.
---
Riesgos
CRÍTICO
Usar el cargo institucional como determinante de acceso técnico. Un cambio de organigrama provoca brechas automáticas. Es silencioso, difícil de detectar y de alto impacto.
No aislar instituciones en el modelo de datos de acceso. Un agente de una institución puede ver o modificar información de otra. Viola autonomía institucional y puede tener implicancias legales.
SUPERADMIN usado como usuario operativo cotidiano. Cualquier error de operación tiene alcance global. La superficie de ataque del rol más privilegiado se expande innecesariamente.
Permisos heredados automáticamente por cargo o área sin revisión. El sistema mantiene accesos incorrectos indefinidamente.
ALTO
RRHH con rol ADMIN. Genera acceso a funciones de gestión de usuarios que no corresponden a su función institucional.
Acumulación de permisos por rotación de personal no gestionada. Una persona con múltiples cambios de área acumula acceso a información de todas las áreas por las que pasó.
HCD bajo administración de la Municipalidad. Viola la independencia institucional y puede generar conflictos políticos y legales.
Ciudadano con acceso a funcionalidades internas por error de asignación de rol. Un ciudadano registrado que recibe rol INTERNO por error accede a información sensible.
Falta de registro de auditoría en acciones de ADMIN y SUPERADMIN. Imposibilita la trazabilidad ante incidentes.
MEDIO
Permisos de área demasiado amplios por comodidad operativa. En lugar de definir qué funcionalidades necesita cada área, se habilita todo y se restringe después. El "después" nunca llega.
Roles técnicos mal comunicados a los usuarios. Los usuarios no saben qué pueden y qué no pueden hacer, generando pedidos de acceso innecesarios y presión sobre el ADMIN para ampliar permisos.
Falta de proceso formal de baja de usuarios. Cuando un agente deja la institución, su usuario permanece activo.
No definir proceso para gestión de comisiones y reemplazos temporales. Se otorgan accesos permanentes para necesidades temporales.
BAJO
Nomenclatura inconsistente entre áreas de distintas instituciones. No es un riesgo de seguridad directo, pero dificulta la auditoría y el soporte.
Exceso de áreas definidas sin usuarios activos. Genera ruido en la configuración pero no representa un riesgo de acceso inmediato.
---
Security Model v1 Recomendado
El modelo de seguridad de Muni Digital se define de la siguiente manera:
Cuatro roles técnicos con responsabilidades y límites claros: SUPERADMIN, ADMIN, INTERNO, CIUDADANO. Los roles técnicos no se derivan de cargos institucionales ni de pertenencia a áreas.
Aislamiento institucional completo. Cada institución es un espacio de datos y administración independiente. Municipalidad, HCD, Hospital y cualquier institución futura operan sin interferencia entre sí. El SUPERADMIN es el único con visibilidad global.
Autorización por RBAC + Contexto Organizacional. El acceso se evalúa combinando el rol técnico con el contexto de institución y área. El mismo rol técnico en diferentes contextos organizacionales produce accesos diferentes.
Cadena de administración descendente y delimitada. SUPERADMIN gestiona ADMINs. ADMIN gestiona INTERNOs de su institución. Ningún INTERNO gestiona usuarios. La cadena no puede saltarse ni invertirse.
RRHH como área funcional, no como rol técnico elevado. La autoridad institucional de RRHH sobre el personal se traduce en funcionalidades habilitadas para su área, no en privilegios técnicos adicionales.
HCD como institución independiente. Administración separada, datos separados, sin herencia de permisos desde el Ejecutivo Municipal.
Principio de menor privilegio como regla de oro. Todo acceso es explícito, revisable y revocable. Ningún acceso se hereda automáticamente por cargo, área o institución.
Auditoría obligatoria para ADMIN y SUPERADMIN. Toda acción de gestión de usuarios, roles y configuraciones queda registrada con identificación del actor y justificación cuando corresponda.
---
Roadmap Conceptual
El roadmap está dividido en fases independientes y verificables. Ninguna fase puede comenzar sin que la anterior esté cerrada y validada.
---
P0 — Fundación conceptual aprobada
Objetivo: Validar y aprobar el modelo conceptual de seguridad antes de cualquier implementación.
Dependencias: PDA.md aprobado. ADR-001 aprobado. Este documento aprobado por los responsables del proyecto.
Criterio de cierre: El equipo técnico y los referentes municipales acuerdan el modelo. No existe ambigüedad sobre la diferencia entre rol técnico, cargo institucional, área e institución.
---
P1 — Diseño de estructura de autorización
Objetivo: Traducir el modelo conceptual en decisiones de diseño técnico. Esto incluye decidir cómo se representan los contextos organizacionales, cómo se evalúa el acceso y cómo se registra la auditoría.
Dependencias: P0 cerrado.
Criterio de cierre: Existe un documento de diseño técnico aprobado que no contradice este modelo conceptual.
Riesgo: ALTO. Es el momento más frecuente de regresión hacia modelos más simples pero incorrectos (RBAC puro, permisos por cargo).
---
P2 — Implementación de gestión de usuarios y roles
Objetivo: El sistema puede crear, modificar y desactivar usuarios. Los roles técnicos funcionan correctamente. El aislamiento institucional es verificable.
Dependencias: P1 cerrado.
Criterio de cierre: Tests de aislamiento institucional exitosos. Tests de cadena de administración exitosos. Ningún usuario puede acceder a datos fuera de su contexto.
---
P3 — Implementación de contexto de área y auditoría
Objetivo: El contexto de área funciona dentro del contexto institucional. Las funcionalidades habilitadas por área están operativas. El registro de auditoría está activo para ADMIN y SUPERADMIN.
Dependencias: P2 cerrado.
Criterio de cierre: Un INTERNO de RRHH puede acceder a las funcionalidades de su área y solo a ellas. Un ADMIN puede ver el log de sus propias acciones. El SUPERADMIN puede auditar cualquier institución.
---
> Este documento define el modelo conceptual de seguridad de Muni Digital v1.
> No debe modificarse sin revisión del equipo de arquitectura y aprobación formal.
> Próximo documento requerido: Diseño Técnico de Autorización (P1).