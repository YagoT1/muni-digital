organizational-model-v1.md
Proyecto: Muni Digital  
Versión: 1.0  
Estado: Aprobado para diseño  
Clasificación: Documento de Decisión Arquitectónica (PDA)  
Fecha: 2026-06-12  
Autores: Arquitecto Principal · Experto en Dominio Municipal · Planificador de Implementación
---
> Este documento define el modelo organizacional conceptual de Muni Digital.  
> No contiene diseño de tablas, entidades, permisos, código ni base de datos.  
> Es la fuente de verdad organizacional del sistema a partir de esta versión.
---
Resumen Ejecutivo
Un municipio no es una empresa. No es una startup. No es un conjunto de usuarios con roles.
Un municipio argentino es una organización pública compleja con dos poderes diferenciados — el Ejecutivo Municipal y el Honorable Concejo Deliberante — cada uno con su propia estructura jerárquica, su propio personal, sus propias funciones constitucionales y sus propios circuitos de trabajo. Además, el municipio presta servicios a una población: sus ciudadanos.
El error más frecuente al digitalizar un municipio es modelarlo como si todos sus actores fueran instancias del mismo objeto con atributos diferentes. Un ciudadano no es "un empleado con rol ciudadano". Un concejal no es "un empleado con permisos especiales". Un intendente no es "el usuario con más privilegios". Son tipos de personas fundamentalmente distintos, que existen en contextos institucionales distintos, con relaciones con el sistema completamente distintas.
Este documento establece cuatro conceptos fundacionales que deben permanecer separados en todo momento — Institución, Área, Cargo Institucional y Rol Técnico — y define los tipos de personas que interactúan con la plataforma. Esta separación no es una preferencia de diseño: es una condición necesaria para que el sistema pueda crecer durante 10 años sin requerir refactors estructurales que destruyan lo construido.
El modelo propuesto reconoce que Muni Digital debe ser capaz de representar la realidad municipal tal como existe, no como sería conveniente que existiera para simplificar el desarrollo.
---
Instituciones
Definición
Una Institución es una entidad con personalidad jurídica propia dentro del sistema político-administrativo municipal, con autoridades elegidas o designadas de forma independiente, con presupuesto propio y con competencias constitucionales diferenciadas.
Una Institución no es un departamento. No es un área. No depende de otra Institución aunque comparta territorio y recursos.
Las dos instituciones del municipio
Municipio (Poder Ejecutivo Municipal)
Es el gobierno municipal propiamente dicho. Está encabezado por el Intendente, quien ejerce el poder ejecutivo. Tiene a su cargo la administración general del municipio: recaudación, obras públicas, servicios públicos, salud, cultura, turismo, comercio, habilitaciones y todo lo que implique la gestión cotidiana del territorio.
El Municipio se organiza internamente en Secretarías, Subsecretarías, Direcciones y demás unidades administrativas que el Intendente determine mediante decreto.
HCD — Honorable Concejo Deliberante (Poder Legislativo Municipal)
Es el órgano legislativo municipal. Está compuesto por Concejales elegidos por votación popular. Su función constitucional es sancionar ordenanzas, controlar al Ejecutivo, aprobar presupuestos y legislar sobre materias de competencia municipal.
El HCD tiene sus propias autoridades (Presidente del HCD, Vicepresidente, Secretario del HCD), su propio personal administrativo, sus propias comisiones de trabajo y sus propios circuitos de producción normativa.
¿Son instituciones independientes?
Sí, completamente. El Municipio y el HCD son instituciones independientes desde el punto de vista constitucional, presupuestario y operacional. Un empleado del Municipio no tiene acceso automático al sistema del HCD. Un concejal no es un empleado municipal. El Intendente no tiene autoridad sobre el Concejo Deliberante ni viceversa.
En Muni Digital, esto significa que ambas instituciones deben poder existir como contextos separados con sus propios usuarios, sus propias estructuras internas y sus propios flujos de trabajo, aunque compartan una plataforma tecnológica común.
La relación entre ellas existe y debe poder representarse — el HCD puede interpelar al Ejecutivo, puede requerir información, puede sancionar ordenanzas que el Ejecutivo debe implementar — pero esta relación es de coordinación institucional, no de jerarquía.
Consideraciones para el futuro
Si el sistema crece, podrían incorporarse otras instituciones con características similares:
Tribunal de Faltas Municipal — organismo cuasi-judicial con independencia funcional.
Ente de Servicios Públicos — si existe como ente autárquico.
Obras Sanitarias Municipal — si opera como ente descentralizado.
El modelo debe estar preparado para incorporar nuevas instituciones sin reestructuración.
---
Áreas
Definición
Un Área es una unidad organizacional interna de una Institución, creada por acto administrativo, con una función específica dentro de la misión institucional, con responsabilidades definidas y con personal asignado formalmente.
Un Área no es una categoría de usuarios. No es un tipo de rol. Es una unidad de la estructura organizacional que existe en el mundo real, con nombre oficial, con autoridades designadas y con funciones que emanan de normas o decretos.
Propiedades de un Área
Toda Área tiene:
Un nombre oficial tal como figura en el organigrama municipal.
Una institución a la que pertenece — toda área pertenece al Municipio o al HCD, nunca a ambos.
Una dependencia jerárquica — toda área reporta a otra área o directamente a la máxima autoridad de la institución.
Una función primaria — el propósito por el cual fue creada.
Posibilidad de tener áreas subordinadas — una Secretaría puede contener Subsecretarías, que contienen Direcciones, que contienen Divisiones o Departamentos.
Estructura jerárquica típica del Municipio
La jerarquía de áreas en un municipio argentino sigue generalmente este orden, de mayor a menor:
```
Intendencia
└── Secretaría (ej: Secretaría de Obras Públicas)
    └── Subsecretaría (ej: Subsecretaría de Infraestructura)
        └── Dirección (ej: Dirección de Vialidad)
            └── División / Departamento (ej: División Mantenimiento)
```
No todos los municipios tienen todos los niveles. Un municipio pequeño puede tener Secretarías que contengan Divisiones directamente, sin niveles intermedios. El modelo debe ser flexible en la cantidad de niveles, sin asumir una profundidad fija.
Áreas previstas para Muni Digital
Las siguientes áreas son las identificadas en el relevamiento inicial. Esta lista no es exhaustiva ni definitiva — nuevas áreas pueden incorporarse sin cambiar el modelo.
Dependientes del Municipio (Poder Ejecutivo):
RRHH (Recursos Humanos) — gestión del personal municipal: legajos, licencias, liquidaciones, escalafón, control de asistencia. Transversal a todo el Municipio porque afecta a todos los empleados.
Turismo — promoción turística, registro de prestadores, eventos turísticos, circuitos.
Cultura — gestión de espacios culturales, eventos, patrimonio, museos.
Obras Públicas — planificación, ejecución y supervisión de obras de infraestructura municipal. Incluye habilitaciones de obras privadas.
Producción — fomento de la actividad productiva local, registro de productores, apoyo a emprendedores.
Comercio — habilitaciones comerciales, fiscalización, registro de comercios.
Licencias — licencias de conducir, habilitaciones profesionales y todo trámite de licencia municipal.
Recaudación (o Hacienda/Rentas) — liquidación y cobro de tributos municipales, deudas, ejecuciones fiscales.
Bromatología — control de alimentos, habilitaciones gastronómicas, inspecciones de salubridad.
Hospital / Salud — si el municipio tiene hospital propio o efectores de salud: gestión de pacientes, turnos médicos, historia clínica en lo que competa al nivel municipal.
Mesa de Entradas — recepción, registro, distribución y seguimiento de todo expediente o nota que ingresa al Municipio. Es el punto de entrada formal de la documentación institucional.
Despacho — producción y salida de documentación oficial del Ejecutivo: decretos, resoluciones, disposiciones. Trabaja en estrecha relación con la Intendencia.
Dependientes del HCD (Poder Legislativo):
Secretaría del HCD — administración interna del HCD: gestión documental de sesiones, ordenanzas, resoluciones del Cuerpo.
Comisiones del HCD — unidades de trabajo temático del Cuerpo (Comisión de Obras Públicas, Comisión de Hacienda, etc.). Las comisiones no tienen personal propio permanente pero tienen autoridades designadas entre los concejales.
Relación entre áreas
Las áreas se relacionan entre sí de dos maneras:
Relación jerárquica: un área puede contener sub-áreas. Esta es una relación de dependencia formal que define quién reporta a quién dentro de la institución.
Relación funcional: un área puede interactuar con otra en el marco de un trámite o expediente. Por ejemplo, un expediente de habilitación comercial puede pasar por Mesa de Entradas, luego por Comercio, luego por Bromatología, y finalmente por Recaudación antes de resolverse. Esta relación no es jerárquica sino procedimental.
Ambos tipos de relación deben poder representarse en el modelo. La relación jerárquica define la estructura organizacional. La relación funcional define los flujos de trabajo.
---
Cargos Institucionales
Definición
Un Cargo Institucional es la función formal que una persona ocupa dentro de una Institución en un momento determinado. El cargo define la posición de esa persona en la jerarquía organizacional, sus responsabilidades generales y su nivel de autoridad sobre otros.
Un cargo existe independientemente de la persona que lo ocupa. Cuando una persona deja el cargo, el cargo sigue existiendo. Puede estar vacante hasta que se designe o elija a otra persona.
Un cargo no es permanente para la persona: puede ser designado (por decreto del Intendente), elegido (Concejales, Intendente) o de carrera (empleados de planta permanente que ascienden por escalafón).
Jerarquía de Cargos en el Municipio (Poder Ejecutivo)
En orden de mayor a menor autoridad:
Intendente — máxima autoridad del Poder Ejecutivo Municipal. Elegido por voto popular. Ejerce la administración general del municipio, designa y remueve funcionarios, promulga o veta ordenanzas, emite decretos.
Secretario/a — funcionario político designado por el Intendente. Conduce una Secretaría (área de primer nivel). Es el responsable político y administrativo de su área. Firma resoluciones en el ámbito de su competencia.
Subsecretario/a — funcionario político designado, dependiente de un Secretario. Conduce una Subsecretaría. Tiene firma delegada en los asuntos de su área.
Director/a — puede ser funcionario político designado o empleado de carrera con función ejecutiva. Conduce una Dirección. Es el nivel de ejecución más concreto de las políticas del área.
Jefe de División / Jefe de Departamento — empleado de carrera con responsabilidad sobre una unidad operativa específica. Coordina equipos de trabajo.
Empleado Municipal — persona que presta servicios en relación de dependencia con el municipio. Puede ser de planta permanente, contratado, o bajo otras modalidades según la legislación local. Es el nivel base de la organización.
Jerarquía de Cargos en el HCD (Poder Legislativo)
Presidente del HCD — máxima autoridad del Cuerpo. Elegido entre los concejales por el propio Cuerpo. Preside las sesiones, representa al HCD, firma las ordenanzas y resoluciones sancionadas.
Vicepresidente del HCD — reemplaza al Presidente en su ausencia. También elegido entre los concejales.
Concejal — miembro del Cuerpo legislativo. Elegido por voto popular. Participa en sesiones, integra comisiones, propone y vota ordenanzas.
Secretario del HCD — empleado o funcionario que gestiona la administración interna del Cuerpo. Puede ser cargo electivo (elegido por el Cuerpo) o designado. Es el responsable de la producción documental del HCD.
Personal Administrativo del HCD — empleados que trabajan en la estructura interna del Cuerpo legislativo.
Naturaleza temporal del cargo
Un cargo institucional es una relación temporal y formal. Una misma persona puede:
Ocupar cargos distintos en momentos diferentes de su vida.
Ocupar un cargo en una institución y otro cargo simultáneo en la misma o distinta institución (aunque esto tiene limitaciones legales).
Haber ocupado un cargo que ya no existe en la estructura actual.
El sistema debe poder representar el historial de cargos de una persona, no solo el cargo actual.
---
Roles Técnicos
Definición
Un Rol Técnico es una categoría de acceso funcional al sistema informático. Define qué operaciones puede realizar un usuario dentro de la plataforma digital, con qué datos puede interactuar y a qué secciones del sistema puede acceder.
El rol técnico es una construcción del sistema. No existe en el mundo real. No aparece en el organigrama del municipio. No figura en ningún decreto ni resolución. Es una decisión del equipo de desarrollo para gestionar el acceso a la plataforma.
Roles técnicos actuales en Muni Digital
A modo de referencia, los roles técnicos existentes en la versión actual del sistema son: `admin`, `operador`, `empleado`, `ciudadano`, `moderador`. Estos son roles del sistema, no cargos del municipio.
La diferencia fundamental con los demás conceptos
Concepto	Quién lo define	Dónde existe	Ejemplo
Institución	La ley / la Constitución	En el mundo real	Municipio, HCD
Área	Decreto o resolución del Ejecutivo	En el organigrama	Secretaría de Obras Públicas
Cargo Institucional	Decreto de designación o voto popular	En el expediente de designación	Director de Cultura
Rol Técnico	El equipo de desarrollo	En el sistema informático	`admin`, `empleado`
Por qué mezclarlos es un error arquitectónico crítico
Si se modela el Cargo Institucional como un Rol Técnico, se producen los siguientes problemas que no tienen solución incremental:
Explosión combinatoria. Si el sistema necesita representar "Director de Cultura con acceso a módulo de cultura" y "Director de Obras Públicas con acceso a módulo de obras públicas", se necesitan roles técnicos distintos para cada combinación. Con 15 áreas y 8 niveles jerárquicos posibles, el número de roles técnicos necesarios se vuelve inmanejable.
Acoplamiento entre política organizacional y lógica de acceso. Si el municipio reorganiza su estructura — fusiona dos secretarías, crea una nueva dirección — el sistema requiere cambios de código para reflejar el nuevo organigrama. Un cambio organizacional deja de ser un acto administrativo y se convierte en una tarea de desarrollo.
Imposibilidad de representar el historial. Si el cargo es un rol técnico, no se puede registrar que una persona fue "Director de Cultura" entre 2022 y 2024 y luego "Secretario de Gobierno" desde 2024. El sistema solo puede ver el estado actual.
Pérdida de trazabilidad institucional. En un municipio, un expediente firmado por "el Director de Obras Públicas" debe registrar qué persona ocupaba ese cargo en el momento de la firma. Si el cargo y el rol técnico son el mismo concepto, cuando esa persona cambia de rol se pierde la referencia histórica.
Conclusión: El Rol Técnico debe derivarse del Cargo Institucional y del Área, no confundirse con ellos. Una persona que ocupa el Cargo de "Operador de Ventanilla" en el Área de "Mesa de Entradas" tendrá un Rol Técnico `operador` en el módulo correspondiente. Esa derivación es una regla de negocio, no una identidad.
---
Tipos de Personas
Ciudadano
El ciudadano es una persona física (vecino, contribuyente, residente) que interactúa con el municipio en carácter particular. Su relación con el municipio es de servicio: solicita trámites, paga tributos, presenta reclamos, saca turnos, consulta información pública.
El ciudadano no tiene cargo en el municipio. No pertenece a ningún área. Su identidad en el sistema es su persona civil: nombre, DNI, domicilio, datos de contacto.
Un ciudadano puede, en el mismo momento, ser también un empleado municipal. Son dos relaciones distintas con la institución que deben poder coexistir sin confundirse.
Empleado Municipal
El empleado municipal es una persona que presta servicios en relación de dependencia con el Municipio (Poder Ejecutivo). Tiene un legajo, pertenece a un área, ocupa un cargo, tiene una jornada laboral, está incluido en una liquidación de sueldos.
El empleado municipal puede también ser ciudadano del mismo municipio. Cuando presenta un reclamo personal de vecino, actúa como ciudadano. Cuando ejecuta sus tareas laborales, actúa como empleado.
A diferencia del ciudadano, el empleado tiene una relación formal con la institución que genera obligaciones y derechos mutuos regidos por el estatuto del empleado municipal y los convenios colectivos de trabajo.
Funcionario Político
El funcionario político es una persona designada por el Intendente para conducir un área de gobierno. Ocupa cargos como Secretario, Subsecretario o Director político. Su designación es por decreto y su mandato coincide generalmente con el del Intendente que lo designó.
El funcionario político puede no ser un empleado municipal de carrera: puede ser designado desde afuera de la planta permanente. En ese caso, coexisten su condición de "funcionario designado" y la ausencia de legajo de empleado de planta.
Su relación con el sistema es de autoridad sobre un área: firma documentación, aprueba expedientes, emite actos administrativos en el ámbito de su competencia.
Concejal
El concejal es un representante elegido por voto popular para integrar el HCD. No pertenece al Municipio (Poder Ejecutivo). Es miembro del Poder Legislativo Municipal.
El concejal tiene mandato temporal definido por la ley electoral. No tiene relación de dependencia laboral con el Municipio. Su función es legislativa: participa en sesiones, vota ordenanzas, integra comisiones.
Es un error tratar a un concejal como "un empleado del HCD". El concejal es una autoridad electa del HCD, no personal administrativo.
Personal del HCD
El personal del HCD son los empleados que trabajan en la estructura administrativa del Concejo Deliberante. Incluye el Secretario del HCD, empleados administrativos, personal de apoyo técnico. Su empleador es el HCD como institución, no el Municipio.
Tienen legajo propio del HCD, que es distinto al legajo de los empleados municipales del Ejecutivo.
Similitudes y diferencias
Todos comparten: son personas físicas que interactúan con la plataforma. Tienen datos de identidad personal (nombre, DNI, contacto).
Lo que los diferencia no son sus "permisos en el sistema" sino su relación con las instituciones:
El ciudadano no tiene cargo institucional. Interactúa como particular.
El empleado municipal tiene cargo en el Ejecutivo. Interactúa como agente del Municipio.
El funcionario político tiene cargo de conducción en el Ejecutivo. Su autoridad es política y temporal.
El concejal tiene cargo electivo en el Legislativo. Su autoridad es constitucional.
El personal del HCD tiene cargo administrativo en el Legislativo.
Una misma persona puede ser simultáneamente ciudadano (siempre) y también empleado municipal, o también concejal. El sistema debe poder representar todas estas relaciones sin colisión.
---
Conceptos que Deben Permanecer Separados
La siguiente separación es la más importante de este documento. Violarla en cualquier etapa del diseño produce deuda técnica que no tiene solución incremental.
Los cuatro conceptos fundacionales
Institución ≠ Área ≠ Cargo Institucional ≠ Rol Técnico
Ninguno de estos cuatro conceptos es equivalente a otro. Ninguno puede reemplazar a otro. Ninguno debe usarse como proxy del otro.
Separaciones adicionales críticas
Identidad de persona ≠ Relación institucional. Los datos de identidad de una persona (nombre, DNI, fecha de nacimiento, contacto) son independientes de su relación con las instituciones. Una persona existe en el sistema independientemente de si es empleado, funcionario, concejal o solo ciudadano.
Cargo actual ≠ Historial de cargos. El cargo que una persona ocupa hoy es distinto al registro de todos los cargos que ocupó. Ambos deben poder representarse.
Área de pertenencia ≠ Área de trabajo en un trámite. Un empleado pertenece formalmente a un área. Pero puede estar actuando en un expediente de otra área por comisión, delegación o procedimiento interárea. Son relaciones distintas.
Institución de origen ≠ Institución en la que se actúa. Raro pero posible: una persona puede actuar en representación de una institución en el contexto de la otra (un concejal que también es médico del hospital municipal actúa como concejal en el HCD y como médico en el hospital, que depende del Municipio).
Estructura organizacional ≠ Flujo de trabajo. El organigrama define quién depende de quién. El flujo de un expediente define por qué áreas pasa una tramitación. Son modelos distintos que se relacionan pero no se confunden.
Acceso técnico ≠ Autoridad institucional. Que una persona tenga rol técnico `admin` en el sistema no significa que tenga autoridad institucional sobre nadie. El acceso técnico es una decisión operacional. La autoridad institucional emana de un cargo.
Regla de oro
> Si un concepto organizacional real del municipio necesita un cambio de código para reflejarse en el sistema, el modelo está mal diseñado.
El organigrama puede cambiar por decreto. La estructura de áreas puede reorganizarse. Un funcionario puede ser removido y reemplazado. Todas estas situaciones deben poder reflejarse mediante configuración o datos, nunca mediante cambios en el código fuente.
---
Riesgos
🔴 Críticos
Modelar los cargos institucionales como roles técnicos (enum en código). Si `Secretario`, `Director`, `Concejal` son valores de un enum TypeScript, cada reorganización municipal requiere un deploy. Cuando el municipio crea una nueva Secretaría, hay que modificar código. Esto convierte el desarrollo en una dependencia operacional de la gestión municipal.
Unificar ciudadanos y empleados en el mismo objeto sin distinción de contexto. Si un ciudadano y un empleado son el mismo tipo de objeto con campos distintos en nullable, todos los módulos futuros (RRHH, Legajos, Expedientes) necesitan validar constantemente en qué contexto están operando. La lógica de negocio se contamina con verificaciones de tipo de persona en lugar de trabajar con el concepto correcto.
Ignorar la separación Ejecutivo / HCD. Si el HCD se modela como "un área más del municipio", los flujos legislativos (sesiones, ordenanzas, comisiones) se intentarán encajar en una estructura pensada para el Ejecutivo. El resultado es un sistema que no representa bien ni al Ejecutivo ni al HCD.
No representar la temporalidad de los cargos. Si el sistema solo puede ver el cargo actual de una persona, los expedientes firmados por "el Director de X" pierden trazabilidad cuando esa persona es reemplazada. En un contexto municipal esto tiene consecuencias legales.
🟠 Altos
No distinguir área de pertenencia de área de actuación en un trámite. Un empleado de RRHH puede ser habilitado para intervenir en un expediente de Obras Públicas. Si el sistema solo conoce "el área del empleado", no puede representar esta situación sin forzar al empleado a "cambiar de área" temporalmente, lo que rompe el registro de RRHH.
Modelar la jerarquía de áreas con profundidad fija. Si el sistema asume que siempre hay "Secretaría → Dirección → División", un municipio que tenga cuatro niveles o solo dos no puede representarse correctamente. La profundidad jerárquica es variable y debe ser configurable.
Tratar al HCD como una extensión del Ejecutivo. El personal del HCD y los concejales no son empleados municipales del Ejecutivo. Si comparten la misma estructura de legajos o el mismo sistema de RRHH sin diferenciación de institución, se mezclan presupuestos, responsabilidades y dependencias que legalmente son independientes.
🟡 Medios
No representar el período de mandato o designación de los cargos. Un Intendente tiene mandato de 4 años. Un concejal también. Un Secretario puede ser removido en cualquier momento. Sin representar el período de vigencia de un cargo, no es posible reconstruir quién era el responsable de un área en una fecha determinada.
Ignorar la existencia de cargos interinos o subrogantes. En ausencia del titular, un cargo puede ser subrogado por otro funcionario. Esta situación es frecuente y debe poder representarse sin generar inconsistencias en el sistema.
Permitir que el modelo de acceso técnico crezca sin relación explícita con el modelo organizacional. Si los roles técnicos se asignan manualmente sin derivarse de la estructura institucional, con el tiempo se pierde la relación entre "qué puede hacer en el sistema" y "qué cargo ocupa en el municipio". La gestión de accesos se vuelve opaca.
🟢 Bajos
Nomenclatura inconsistente entre lo real y lo digital. Si el sistema llama "área" a lo que el municipio llama "secretaría", o "cargo" a lo que el municipio llama "función", los usuarios municipales no reconocen el sistema como propio. Es un problema de usabilidad y adopción, no arquitectónico, pero tiene costo de corrección creciente.
No prever la existencia de entes descentralizados. Algunos municipios tienen Obras Sanitarias, Entes de Servicios Públicos o Institutos como organismos con cierta autonomía. Si el modelo solo reconoce "Municipio" y "HCD", estos entes no tienen representación adecuada.
---
Modelo Organizacional v1 Recomendado
Premisa de diseño
El modelo organizacional de Muni Digital se construye sobre cuatro conceptos fundacionales independientes que se relacionan entre sí pero nunca se sustituyen:
Institución → Área → Cargo Institucional → Rol Técnico
La flecha indica dirección de derivación, no subordinación. El Rol Técnico se deriva del Cargo y del Área, pero no es igual a ninguno de los dos.
Descripción del modelo
Nivel 1: Instituciones
El sistema reconoce múltiples instituciones. En la versión inicial son dos: Municipio y HCD. Cada institución es un contexto organizacional completamente independiente.
Toda área pertenece exactamente a una institución. Todo cargo pertenece exactamente a una institución. Toda persona puede tener relaciones con una o más instituciones simultáneamente, pero cada relación es independiente.
Nivel 2: Estructura de Áreas
Dentro de cada institución existe una jerarquía de áreas de profundidad variable. Cada área conoce a qué institución pertenece y de qué área padre depende (si no es de primer nivel).
La jerarquía de áreas es un árbol configurable, no una estructura fija de niveles. El sistema no asume "siempre hay secretaría, subsecretaría y dirección". Asume que existe una raíz (la institución) y que cada área puede tener cero o más subáreas.
Las áreas tienen nombre oficial, descripción de función, vigencia temporal (una área puede ser creada, modificada y suprimida por acto administrativo) y dependencia jerárquica.
Nivel 3: Cargos Institucionales
Los cargos son objetos configurables del sistema, no valores fijos de un enum. Cada cargo tiene nombre, nivel jerárquico dentro de su institución, área a la que corresponde y tipo (electivo, designado político, de carrera, interino).
Una persona ocupa un cargo en un período de tiempo determinado. El sistema registra no solo el cargo actual sino el historial completo de cargos de cada persona.
Un cargo puede estar vacante (sin persona asignada) o cubierto (con persona designada). La vacancia de un cargo es un estado legítimo del sistema.
Nivel 4: Personas y sus relaciones
El sistema reconoce personas con identidad propia (datos civiles). Cada persona puede tener múltiples relaciones institucionales simultáneas:
Puede ser ciudadano (siempre, si reside o tributa en el municipio).
Puede tener uno o más cargos activos en una o más instituciones.
Puede haber tenido cargos históricos que ya no están vigentes.
La persona no "es" un tipo fijo. La persona tiene relaciones con el sistema que pueden cambiar en el tiempo.
Nivel 5: Roles Técnicos
Los roles técnicos son la única capa de acceso al sistema informático. Se derivan de la combinación de cargo institucional y área de actuación, pero no son idénticos a ellos.
La derivación puede ser automática (si el sistema conoce las reglas de qué cargo habilita qué acceso) o manual (un administrador del sistema asigna roles técnicos a las personas según sus cargos).
Los roles técnicos no representan jerarquía municipal. Son categorías operacionales: quién puede leer, quién puede escribir, quién puede aprobar, en qué módulo del sistema.
Representación esquemática del modelo
```
INSTITUCIÓN
├── Municipio (Poder Ejecutivo)
│   ├── Área: Intendencia
│   │   ├── Área: Despacho
│   │   └── Área: Mesa de Entradas
│   ├── Área: Secretaría de Hacienda
│   │   ├── Área: Recaudación
│   │   └── Área: Subsecretaría de Administración
│   ├── Área: Secretaría de Obras Públicas
│   │   ├── Área: Dirección de Infraestructura
│   │   └── Área: Dirección de Vialidad
│   ├── Área: RRHH (transversal a Municipio)
│   ├── Área: Turismo
│   ├── Área: Cultura
│   ├── Área: Comercio / Licencias / Bromatología
│   └── Área: Hospital Municipal
│
└── HCD (Poder Legislativo)
    ├── Área: Presidencia HCD
    ├── Área: Secretaría HCD
    └── Área: Comisiones

CARGOS (vinculados a institución y área)
├── Intendente                  → Institución: Municipio, Área: Intendencia
├── Secretario/a de Obras       → Institución: Municipio, Área: Sec. Obras Públicas
├── Director/a de Infraestructura → Institución: Municipio, Área: Dir. Infraestructura
├── Empleado Municipal          → Institución: Municipio, Área: variable
├── Presidente del HCD          → Institución: HCD, Área: Presidencia HCD
├── Concejal                    → Institución: HCD, Área: variable por comisión
└── Secretario/a del HCD        → Institución: HCD, Área: Secretaría HCD

PERSONA
├── Tiene identidad civil (nombre, DNI, contacto)
├── Puede tener relación como CIUDADANO (siempre)
└── Puede tener CARGOS INSTITUCIONALES (historial)
    ├── Cargo actual → deriva en ROL TÉCNICO
    └── Cargos anteriores → trazabilidad histórica

ROLES TÉCNICOS (en el sistema Muni Digital)
├── admin           → acceso global de configuración del sistema
├── operador        → operaciones en módulos específicos según área
├── empleado        → acceso al propio perfil y módulos de autogestión
└── ciudadano       → acceso al portal ciudadano y servicios públicos
```
Principio de extensibilidad
El modelo v1 admite sin refactors:
Nuevas instituciones (un ente descentralizado, un consorcio municipal).
Nuevas áreas en cualquier nivel jerárquico.
Nuevos cargos en cualquier institución y área.
Nuevas personas con cualquier combinación de relaciones institucionales.
Nuevos roles técnicos para nuevos módulos del sistema.
El único cambio estructural que requeriría revisión del modelo sería la necesidad de representar un tipo de relación institucional radicalmente nuevo que no hubiera sido contemplado (por ejemplo, una persona jurídica como ciudadana, o una institución supramunicipal como parte del organigrama).
---
Roadmap para Evolucionar desde el Modelo Actual
Este roadmap no es un plan técnico de implementación. Es la secuencia conceptual para que el modelo organizacional definido en este documento reemplace gradualmente el modelo actual sin disrupciones.
Estado actual (referencia)
El sistema actual tiene:
`UserRole` como enum TypeScript con valores `admin`, `operador`, `ciudadano`, `empleado`, `moderador`.
Una entidad `User` única que mezcla ciudadanos y empleados.
Sin representación de áreas, cargos, instituciones ni jerarquía.
Sin historial de cargos ni temporalidad.
P0 — Estabilización conceptual (prerequisito, sin cambios de modelo)
Antes de evolucionar el modelo, el equipo debe internalizar la separación conceptual de este documento. Toda conversación de diseño futura debe usar la terminología correcta: Institución, Área, Cargo Institucional, Rol Técnico, y nunca confundirlos.
Este paso no tiene entregables técnicos. El entregable es el acuerdo del equipo sobre las definiciones.
Validación: El equipo puede explicar la diferencia entre un Cargo Institucional y un Rol Técnico sin referirse a código.
P1 — Introducción de Instituciones y Áreas como conceptos del sistema
El primer paso técnico (cuyo diseño de implementación queda fuera de este documento) es introducir Institución y Área como objetos de configuración del sistema. Esto permite que el organigrama municipal exista en el sistema antes de que los usuarios sean vinculados a él.
En esta fase, los usuarios existentes no se modifican. El nuevo modelo coexiste con el actual.
Validación: Es posible configurar el organigrama completo del municipio en el sistema sin escribir código.
P2 — Vinculación de personas a cargos y áreas
Una vez que el organigrama existe, los empleados y funcionarios existentes se vinculan a él: cada persona tiene un cargo en un área de una institución, con fecha de inicio y (opcionalmente) fecha de fin.
Los ciudadanos no se ven afectados. Su relación con el sistema no cambia.
Validación: Todo empleado del municipio tiene un cargo vigente asignado en el sistema. El historial de cargos puede registrarse retroactivamente para el personal existente.
P3 — Derivación de roles técnicos desde cargos y áreas
Una vez que las personas tienen cargos, el sistema establece las reglas de derivación: qué combinación de cargo + área habilita qué rol técnico. Los roles técnicos existentes (`admin`, `operador`, `empleado`, `ciudadano`) se mantienen pero dejan de ser el único concepto de acceso.
Validación: Un cambio de cargo de una persona actualiza automáticamente sus accesos en el sistema, sin que un administrador deba intervenir manualmente en los roles técnicos.
P4 — Extensión a módulos futuros
Con el modelo organizacional funcionando, cada nuevo módulo (RRHH, Expedientes, HCD, Licencias, etc.) puede incorporarse usando el modelo existente como base. No se necesita rediseñar quién es quién cada vez que se agrega funcionalidad.
Validación: La incorporación de un nuevo módulo no requiere modificaciones al modelo organizacional. Solo requiere definir qué roles técnicos pueden operar en él y bajo qué condiciones.
---
Fin del documento organizational-model-v1.md  
Versión 1.0 — Aprobada como fuente de verdad organizacional para Muni Digital  
Próxima revisión: al incorporar módulo de Expedientes o HCD, lo que ocurra primero