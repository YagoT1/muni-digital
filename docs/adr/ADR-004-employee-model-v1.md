# Employee Model v1 — Muni Digital

> Documento conceptual del modelo de empleado municipal.
> Basado en: PDA.md · ADR-001 · ADR-002 · Permissions Matrix v1
> Estado: Propuesta para revisión y aprobación.
> Restricción: Este documento NO define tablas, entidades, código, APIs ni implementación.

---

## Resumen Ejecutivo

El error más frecuente en sistemas municipales es modelar al empleado como un "usuario del sistema con datos adicionales". Esa decisión parece razonable al inicio y genera deuda estructural que se manifiesta cuando hay que registrar un empleado sin acceso al sistema, un contratista externo, un concejal o una persona que trabajó en el municipio antes de que existiera el sistema digital.

La decisión central de este documento es la siguiente:

**Un empleado es una persona con vínculo laboral activo o histórico con una institución municipal. Ese vínculo existe independientemente de si la persona tiene usuario en Muni Digital. El sistema registra empleados; no crea empleados.**

Este modelo separa completamente la identidad de la persona, el vínculo laboral con la institución y el acceso técnico al sistema. Los tres conceptos coexisten, se relacionan, pero ninguno implica al otro automáticamente.

El modelo es compatible con ADR-001 (modelo organizacional), ADR-002 (modelo de seguridad) y la Permissions Matrix v1. Sirve como fuente de verdad para los módulos de RRHH, Legajos y Personal.

---

## Tipos de Personas

Muni Digital interactúa con distintos tipos de personas. Confundirlos genera errores de modelado que afectan tanto la seguridad como la operación.

### Ciudadano

Es toda persona física que se relaciona con el municipio en calidad de habitante o contribuyente. El ciudadano no tiene vínculo laboral con ninguna institución municipal. Puede iniciar trámites, consultar el estado de sus solicitudes y recibir servicios municipales. En el modelo de seguridad tiene rol técnico CIUDADANO.

La relación del ciudadano con el municipio es de servicio, no de empleo.

### Empleado Municipal

Es toda persona física con vínculo laboral formal con una institución municipal, en cualquiera de sus modalidades. El empleado presta servicios a la institución bajo alguna forma de relación laboral reconocida: planta permanente, planta temporaria, contrato, pasantía u otra modalidad vigente en el marco normativo municipal.

El empleado puede o no tener acceso al sistema Muni Digital. Eso depende de su función. Un agente de limpieza es empleado municipal aunque no use el sistema.

### Funcionario Político

Es una persona designada por autoridad política para ejercer un cargo de conducción: Intendente, Secretario, Subsecretario, Director en algunos casos. Su vínculo con la institución no es un contrato de empleo en el sentido estricto sino una designación formal que dura mientras dure la gestión. Puede o no tener relación previa como empleado.

El funcionario político tiene responsabilidades institucionales y firma actos administrativos. Esto lo distingue del empleado de carrera.

### Concejal

Es una persona elegida por voto popular para integrar el Honorable Concejo Deliberante. No es empleado del municipio en sentido estricto. Ejerce un mandato electivo. Su vínculo con el HCD es institucional y temporal, determinado por el período legislativo.

El concejal requiere acceso a sistemas del HCD pero su naturaleza jurídica es distinta a la del empleado. No tiene cargo institucional en el sentido administrativo; tiene mandato.

### Personal HCD

Son los agentes que trabajan para el HCD en funciones administrativas y de apoyo: secretaría legislativa, archivo, administración. Son empleados en el sentido laboral, pero su institución es el HCD, no la Municipalidad. Tienen legajo, cargo institucional y área dentro del HCD.

Son conceptualmente idénticos a los empleados municipales, pero su contexto institucional es diferente y esa diferencia es estructural.

### Contratista Externo

Es una persona física o representante de una persona jurídica que presta servicios al municipio bajo un contrato comercial, no laboral. No tiene legajo de empleado. No tiene cargo institucional. Su relación con el municipio es contractual y acotada a un objeto específico.

El contratista puede necesitar acceso temporal a partes del sistema para cumplir su contrato, pero ese acceso no lo convierte en empleado.

### Usuario Técnico del Sistema

Es un actor del sistema que no corresponde a ninguna persona física específica: cuentas de servicio, integraciones automáticas, procesos batch. No tiene identidad personal ni vínculo laboral. Existe únicamente como actor técnico dentro de Muni Digital.

Este tipo de actor no debe confundirse con ningún tipo de persona y debe gestionarse de forma completamente separada.

### Similitudes, diferencias y relaciones

Ciudadano, empleado, funcionario político, concejal y personal HCD comparten que son personas físicas reales con identidad verificable. Lo que los diferencia es el tipo de vínculo con la institución y la naturaleza de ese vínculo: habitante, laboral, designación política, mandato electivo.

Un ciudadano puede convertirse en empleado. Un empleado puede convertirse en funcionario político. Un funcionario político puede dejar el cargo y volver a ser solo ciudadano. Un concejal puede simultáneamente ser ciudadano y tener mandato electivo. Estas transiciones y superposiciones son frecuentes en la realidad municipal y el modelo debe soportarlas sin ambigüedad.

---

## Definición de Empleado

### Identidad

Un empleado en Muni Digital es una persona física identificada de manera unívoca, independientemente de los cargos que ocupe, las áreas en las que trabaje o las instituciones a las que pertenezca a lo largo del tiempo. La identidad del empleado no cambia. Lo que cambia es su vínculo laboral.

La identidad se establece a partir de documentación formal: número de documento, nombre completo, fecha de nacimiento. No depende del sistema. Existía antes de que el sistema existiera y persiste después de que el empleado se retire.

### Relación institucional

El empleado siempre pertenece a una institución. Esa pertenencia es el vínculo laboral. Sin institución no hay empleado; hay ciudadano. La relación institucional tiene fecha de inicio, puede tener fecha de fin, y tiene condiciones que la definen: modalidad de contratación, cargo, área.

Un empleado puede tener vínculo laboral con una sola institución a la vez en la mayoría de los casos. La excepción (doble empleo público) existe en la realidad y el modelo debe reconocerla sin negarla.

### Permanencia

La permanencia se refiere a la continuidad del vínculo laboral, no a la modalidad. Un empleado de planta permanente tiene expectativa de continuidad indefinida. Un contratado tiene vínculo acotado en el tiempo. Un pasante tiene vínculo temporal y formativo. Todos son empleados mientras el vínculo esté activo.

La permanencia no define si alguien es empleado o no; define las condiciones de su vínculo.

### Responsabilidades

Las responsabilidades del empleado derivan de su cargo institucional y su área, no de su modalidad laboral. Un agente de planta permanente y un contratado en la misma función tienen las mismas responsabilidades operativas, aunque sus condiciones laborales sean distintas.

---

## Relación Persona–Empleado

### ¿Todo empleado es una persona?

Sí, sin excepción. No existe el concepto de empleado institucional, empleado genérico o rol de empleado sin persona física detrás. Todo registro de empleado en Muni Digital corresponde a una persona física identificada.

### ¿Toda persona es empleado?

No. Un ciudadano que usa el portal de trámites es una persona en el sistema pero no es empleado. Un contratista externo es una persona que puede tener acceso al sistema pero no es empleado. Un concejal es una persona con mandato pero no es empleado en el sentido laboral.

La condición de empleado requiere vínculo laboral activo o histórico con una institución municipal. Sin ese vínculo, la persona puede existir en el sistema pero en otra categoría.

### ¿Un ciudadano puede convertirse en empleado?

Sí. Es una de las transiciones más frecuentes: una persona que era solo ciudadano ingresa al municipio. En ese momento, su identidad en el sistema se extiende: sigue siendo la misma persona, pero ahora tiene además un vínculo laboral. Su rol técnico puede cambiar de CIUDADANO a INTERNO si se le otorga acceso al sistema.

Lo crítico es que la identidad de la persona no se duplica. No se crea un nuevo registro de persona. Se registra el nuevo vínculo laboral sobre la identidad existente.

### ¿Un empleado puede dejar de ser empleado sin perder identidad?

Sí, y esto es fundamental. Cuando un empleado se jubila, renuncia, es dado de baja o finaliza su contrato, el vínculo laboral se cierra pero la persona no desaparece del sistema. Su legajo, su historia laboral y su identidad se conservan. Puede existir en el sistema como persona con historial, aunque ya no tenga vínculo laboral activo.

Si esa persona luego inicia trámites como ciudadano, su identidad ya existe. No se crea un duplicado.

---

## Situaciones Laborales

Las situaciones laborales describen la modalidad del vínculo entre el empleado y la institución. Todas forman parte del mismo modelo conceptual de empleado, pero con características distintas.

### Planta Permanente

Es la modalidad de mayor estabilidad. El empleado tiene relación de empleo público con protección legal específica. No tiene fecha de finalización prevista. Los movimientos, licencias y cambios de cargo se gestionan dentro del marco normativo de la carrera administrativa municipal.

### Planta Temporaria

Es una modalidad con estabilidad menor. El vínculo tiene duración determinada o condicionada a disponibilidad presupuestaria. El empleado cumple funciones similares a la planta permanente pero sin la misma protección de estabilidad.

### Contratado

Es una modalidad por objeto o por tiempo determinado. El contrato define el alcance de las tareas y el período. No implica relación de dependencia en el sentido estricto de la planta. En la práctica municipal argentina, esta modalidad es frecuente y su gestión documental es relevante para el sistema.

### Pasante

Es una modalidad formativa y temporal. El pasante no tiene relación laboral plena sino un vínculo de práctica profesional supervisada. Tiene acceso acotado a funciones y su permanencia es siempre temporal. Puede necesitar acceso al sistema pero con permisos significativamente restringidos.

### Funcionario Político

No es técnicamente un empleado en el sentido de la carrera administrativa, pero ocupa un cargo institucional, firma actos administrativos y necesita legajo en el sistema. Su vínculo es por designación y dura mientras dure la función. El modelo lo incluye como tipo de vínculo laboral con sus particularidades, no como una categoría separada del empleado.

### Determinación sobre el modelo único

Todas las situaciones laborales comparten la misma estructura conceptual: una persona, un vínculo con una institución, una modalidad que describe las condiciones de ese vínculo. El modelo no diferencia tipos de empleados como entidades distintas; diferencia modalidades de vínculo dentro del mismo modelo de empleado. Esta decisión es la que permite escalar a nuevas modalidades laborales sin rediseño.

---

## Relación con Instituciones

Todo empleado pertenece a exactamente una institución en cada vínculo laboral activo. La institución es el contexto que da significado al cargo y al área del empleado.

La Municipalidad, el HCD y el Hospital son instituciones distintas con empleados distintos. Un empleado de la Municipalidad no es empleado del HCD aunque trabaje físicamente en el mismo edificio. Esta separación es conceptual, legal y operativa.

Cuando un empleado se traslada de una institución a otra, el vínculo con la institución de origen se cierra y se abre un vínculo nuevo con la institución de destino. No es una modificación del vínculo existente: es la finalización de uno y el inicio de otro. El historial de ambos vínculos se conserva bajo la misma identidad de persona.

Para instituciones futuras que se incorporen al sistema, el modelo no cambia. Se crea la institución, y los empleados que pertenecen a ella se vinculan bajo el mismo mecanismo existente. No hay rediseño.

---

## Relación con Áreas

### Una sola área como regla general

En condiciones normales, un empleado pertenece a una sola área dentro de su institución. El área define su ámbito funcional cotidiano y determina, junto con la institución, el contexto organizacional que gobierna sus permisos en el sistema (conforme a ADR-002 y Permissions Matrix v1).

### Múltiples áreas como excepción gestionada

En la realidad municipal existen situaciones donde una persona cumple funciones en más de un área: coordinaciones, funciones transversales, designaciones especiales. El modelo reconoce esta posibilidad como excepción, no como regla. Cuando ocurre, debe ser explícita, documentada y acotada en el tiempo o el alcance.

La excepción de múltiples áreas no puede convertirse en mecanismo para ampliar permisos de forma encubierta. Cada área adicional debe tener justificación documentada.

### Cambios de área

Cuando un empleado cambia de área, el área de origen se cierra en su historial y se registra la nueva asignación. El historial de áreas anteriores se conserva. Los permisos del área anterior se revocan. Los permisos del área nueva se activan conforme a la configuración de esa área.

Este mecanismo es coherente con el principio de no herencia implícita de la Permissions Matrix v1.

### Suplencias temporales

Una suplencia es la cobertura temporal de una función de otra área. No implica cambio de área formal. La persona mantiene su área de origen y recibe acceso temporal y acotado al ámbito de la suplencia. Este acceso temporal debe tener fecha de expiración y dejar registro de auditoría, conforme a ADR-002.

---

## Relación con Cargos

El cargo institucional describe la posición formal que ocupa un empleado en el organigrama. Es distinto del rol técnico (ADR-002), del área y de la situación laboral.

### Lo que representa un cargo

El cargo representa autoridad institucional, nivel jerárquico y responsabilidad formal dentro de la estructura organizacional. No determina permisos en el sistema. Determina quién firma, quién aprueba, quién responde institucionalmente por una decisión.

### Análisis de los cargos relevantes

Un **agente** es el nivel base de la carrera administrativa. No tiene funciones de conducción. Ejecuta tareas operativas en su área.

Un **encargado** tiene responsabilidad sobre un equipo o proceso dentro de un área, sin tener necesariamente un cargo formal de conducción en el organigrama. En muchos municipios es una función asignada informalmente.

Un **director** conduce una dirección, que es una unidad organizacional subordinada a una secretaría. Tiene responsabilidad sobre los procesos y el personal de esa dirección. Firma actos administrativos dentro de su competencia.

Un **secretario** conduce una secretaría municipal, que es la unidad organizacional de mayor jerarquía en el ejecutivo municipal bajo el intendente. Tiene competencia política y administrativa amplia. Es siempre un funcionario político.

El **intendente** es la máxima autoridad del ejecutivo municipal. Es electo por voto popular. Su vínculo con la institución no es laboral en el sentido de la carrera administrativa: es un mandato. Requiere registro en el sistema para la gestión de actos administrativos pero no tiene legajo de empleado en el sentido convencional.

Un **concejal** ejerce mandato en el HCD. No es empleado del municipio. Forma parte del modelo de personas con vínculo institucional pero fuera del modelo de empleado laboral. El sistema debe reconocer su existencia y su acceso al contexto HCD sin tratarlo como empleado.

### El cargo no determina permisos

Conforme a ADR-002, el cargo institucional no determina el acceso técnico al sistema. Un Director puede tener exactamente los mismos permisos técnicos que un agente de su misma área, o puede tener permisos adicionales configurados explícitamente por el ADMIN. El cargo informa la jerarquía institucional; los permisos son una decisión de configuración separada.

---

## Ciclo de Vida

El ciclo de vida del empleado en Muni Digital describe las transiciones que atraviesa el vínculo laboral a lo largo del tiempo.

### Ingreso

El ingreso es el momento en que se establece el vínculo laboral entre una persona y una institución. Si la persona ya existe en el sistema (como ciudadano o con historial anterior), el ingreso registra un nuevo vínculo sobre la identidad existente. Si la persona no existe, se crea primero la identidad y luego el vínculo.

El ingreso registra: la institución de pertenencia, el área inicial, el cargo asignado, la modalidad laboral, la fecha de inicio y la documentación respaldatoria del alta.

### Movimiento

Un movimiento es cualquier cambio en las condiciones del vínculo laboral sin que el vínculo se cierre: cambio de área, cambio de cargo, cambio de modalidad. Cada movimiento queda registrado con fecha, motivo y referencia al acto administrativo que lo respaldó. El historial de movimientos es parte del legajo del empleado.

### Licencia

Una licencia es la suspensión temporal de la prestación de servicios con conservación del vínculo laboral. Puede ser por razones de salud, maternidad o paternidad, estudio, razones personales u otras contempladas en el marco normativo. La licencia tiene fecha de inicio, duración estimada o determinada, y tipo. El empleado en licencia sigue siendo empleado.

El acceso técnico al sistema durante una licencia es una decisión de política institucional que el ADMIN configura. No es consecuencia automática de la licencia.

### Cambio de área

Ya definido en la sección de relación con áreas. Se registra como movimiento con fecha, área de origen y área de destino. El historial del área anterior se conserva.

### Cambio de cargo

El cambio de cargo registra la transición entre posiciones en el organigrama. Puede ser ascenso, descenso (en situaciones disciplinarias o reestructuración) o movimiento lateral. Siempre requiere respaldo en un acto administrativo formal.

### Baja

La baja es el cierre del vínculo laboral. Puede ser por jubilación, renuncia voluntaria, vencimiento de contrato, finalización de mandato, baja disciplinaria u otras causales. La baja no elimina la identidad de la persona ni su historial. Cierra el vínculo activo y lo pasa a estado histórico.

El acceso técnico al sistema se revoca en el momento de la baja. El legajo y el historial se conservan permanentemente conforme a los plazos de retención documental del marco normativo municipal.

---

## Riesgos

### CRÍTICO

**Modelar el empleado como usuario del sistema.** Si el empleado se define a partir de su cuenta de usuario, el sistema no puede representar empleados sin acceso, historia laboral previa al sistema ni personas en baja. Este error es estructural y costoso de corregir.

**Duplicar la identidad de la persona.** Si cuando un ciudadano se convierte en empleado se crea un nuevo registro en lugar de registrar el nuevo vínculo sobre la identidad existente, el sistema tiene dos registros de la misma persona. Esto produce inconsistencias en trámites, legajos y auditoría que son prácticamente irrecuperables sin migración de datos.

**Usar el cargo como determinante de permisos.** Ya identificado en ADR-002. Su manifestación en el módulo de empleados es particularmente peligrosa porque los cargos cambian frecuentemente y los cambios no siempre se procesan a tiempo.

**No conservar el historial laboral tras la baja.** La eliminación o inactivación total del registro de un empleado dado de baja viola los requisitos de trazabilidad administrativa y los plazos de retención documental. Los legajos tienen valor legal después de la baja.

### ALTO

**Modelar las situaciones laborales como tipos distintos de empleado.** Si planta permanente, contratado y pasante son entidades distintas en el modelo, agregar una nueva modalidad laboral requiere rediseño. El modelo correcto es uno solo con modalidad como atributo del vínculo.

**No registrar los movimientos como historial.** Si cada cambio de área o cargo sobreescribe el anterior, el legajo pierde trazabilidad. Es imposible reconstruir la historia laboral de un empleado, lo que invalida el sistema como registro oficial.

**Confundir la suplencia temporal con el cambio de área.** Si una suplencia se procesa como cambio formal de área, los permisos del área de origen se revocan incorrectamente y el regreso requiere re-configuración manual. Esto sobrecarga al ADMIN y genera errores operativos.

**No separar institución de origen e institución de destino en traslados.** Si un traslado entre instituciones se procesa como cambio de área, los datos del empleado quedan en el contexto institucional incorrecto.

### MEDIO

**Registrar el cargo político con el mismo modelo que el cargo de carrera.** Los funcionarios políticos y los concejales tienen vínculos de naturaleza distinta. No representarlos correctamente dificulta la gestión de altas y bajas asociadas a cambios de gestión o fin de mandato.

**No modelar la licencia como estado del vínculo.** Si la licencia se gestiona fuera del sistema de legajos, la información está fragmentada y no es posible calcular correctamente antigüedad, beneficios ni historial.

**Falta de respaldo documental en los movimientos.** Si el sistema permite registrar movimientos sin referencia al acto administrativo que los respalda, el legajo carece de validez formal como registro oficial.

### BAJO

**Nomenclatura inconsistente de cargos entre instituciones.** El mismo cargo puede llamarse de formas distintas en la Municipalidad y en el Hospital. No es un riesgo de modelado pero dificulta reportes agregados y comparaciones.

**Campos de legajo excesivos desde el inicio.** Modelar todos los posibles atributos del legajo antes de conocer los requisitos reales de cada institución genera complejidad innecesaria. El modelo conceptual debe ser mínimo y extensible.

---

## Employee Model v1 Recomendado

El modelo conceptual del empleado en Muni Digital se define de la siguiente manera:

### Persona como base

Toda entidad que interactúa con Muni Digital es primero una **persona** con identidad única y verificable. La persona puede tener distintos tipos de relación con el sistema: ciudadano, empleado, funcionario, concejal. Esas relaciones coexisten bajo la misma identidad y se gestionan de forma independiente.

### Empleado como vínculo, no como tipo

Un **empleado** no es un tipo de persona distinto. Es una persona que tiene o tuvo un **vínculo laboral** con una institución municipal. El vínculo tiene modalidad (planta permanente, temporaria, contratado, pasante, funcionario político), tiene historia (ingreso, movimientos, licencias, baja) y tiene contexto (institución, área, cargo).

El vínculo es el objeto central del modelo de empleado. La persona lo precede y lo trasciende.

### Modalidad como atributo del vínculo

Todas las situaciones laborales (planta permanente, temporaria, contratado, pasante, funcionario político) son modalidades del mismo tipo de vínculo. El modelo no diferencia tipos de empleado; diferencia modalidades. Esto permite incorporar nuevas modalidades sin rediseño.

### Cargo como posición en el organigrama

El cargo describe la posición institucional del empleado dentro de la jerarquía de su institución. No determina permisos técnicos. No define el área. Es un atributo del vínculo que cambia a lo largo de la historia laboral del empleado y cada cambio queda registrado.

### Área como contexto funcional del vínculo

El área define el ámbito funcional donde el empleado presta servicios. Junto con la institución, forma el contexto organizacional que determina los permisos técnicos conforme a ADR-002. El área puede cambiar; cada cambio es un movimiento registrado en el historial.

### Historial como condición del modelo

Todo cambio en el vínculo laboral (ingreso, movimiento, licencia, baja) es un evento registrado con fecha y respaldo documental. El sistema nunca sobreescribe el estado anterior: lo cierra y registra el nuevo. El historial completo del vínculo laboral es el legajo del empleado.

### Acceso técnico como consecuencia independiente

El hecho de que un empleado exista en el sistema no implica que tenga acceso a Muni Digital. El acceso técnico (rol técnico, permisos) es una decisión de configuración separada, gestionada por el ADMIN conforme a ADR-002. Un empleado puede estar dado de alta en RRHH sin tener usuario activo en el sistema, y eso es un estado válido y frecuente.

---

## Roadmap Conceptual

### P0 — Aprobación del modelo conceptual

**Objetivo:** Validar y aprobar este documento como fuente de verdad para todos los módulos relacionados con personal.

Dependencias: ADR-001, ADR-002 y Permissions Matrix v1 aprobados. Este documento revisado por RRHH, el equipo técnico y los referentes institucionales.

Criterio de cierre: El equipo puede responder sin ambigüedad qué es una persona, qué es un empleado, qué es un vínculo, qué es un movimiento y cómo se relacionan con el modelo de seguridad aprobado.

Riesgo: CRÍTICO si se inicia el diseño técnico sin este cierre. Las decisiones de estructura de datos tomadas sobre un modelo conceptual incorrecto son las más costosas de revertir.

---

### P1 — Diseño técnico del modelo de persona y empleado

**Objetivo:** Traducir el modelo conceptual en decisiones de diseño técnico: cómo se representa la persona, el vínculo laboral, la modalidad, el historial de movimientos y el legajo.

Dependencias: P0 cerrado.

Criterio de cierre: El diseño técnico implementa la separación persona–vínculo–acceso técnico. No existe una entidad "usuario-empleado" combinada. El historial de movimientos es parte del diseño desde el inicio, no un agregado posterior.

Archivos afectados conceptualmente: modelo de datos de persona, modelo de datos de vínculo laboral, modelo de historial de movimientos, integración con el contexto organizacional de ADR-001.

Riesgo: ALTO. Es el momento donde la presión por simplicidad técnica lleva a colapsar persona y usuario en una sola entidad.

---

### P2 — Implementación del núcleo de legajos

**Objetivo:** El sistema puede registrar personas, crear vínculos laborales, registrar movimientos y gestionar licencias. El historial es inmutable: los registros se cierran, no se sobreescriben.

Dependencias: P1 cerrado.

Criterio de cierre: Es posible registrar un empleado sin que tenga usuario activo en el sistema. Es posible dar de baja un vínculo laboral sin eliminar el historial. Es posible convertir un ciudadano en empleado sin duplicar la identidad.

Rollback: Si P2 falla las validaciones, revertir a estado sin vínculos laborales activos hasta corregir. El módulo de legajos no debe liberar a producción con historial no trazable.

---

### P3 — Integración con RRHH, permisos y auditoría

**Objetivo:** El módulo de RRHH opera sobre el modelo de empleado. Los cambios de área y cargo se reflejan en los permisos del sistema conforme a la Permissions Matrix v1. La auditoría de acciones sobre legajos está activa.

Dependencias: P2 cerrado. Permissions Matrix v1 implementada.

Criterio de cierre: Un movimiento de área procesado por RRHH revoca los permisos del área anterior y activa los del área nueva. Una baja procesada por RRHH revoca el acceso técnico del empleado. El historial del legajo es accesible para auditoría con trazabilidad completa.

---

> Este documento define el modelo conceptual del empleado en Muni Digital v1.
> No debe modificarse sin revisión del equipo de arquitectura y aprobación formal.
> Extiende ADR-001, ADR-002 y Permissions Matrix v1 sin contradecirlos.
> Próximo documento requerido: Diseño Técnico del Modelo de Persona y Empleado (P1).
