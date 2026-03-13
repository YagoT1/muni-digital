# Auditoría técnica integral — Monorepo `muni-digital`

Fecha: 2026-03-13
Perfiles de revisión: Arquitectura, AppSec, Performance, UX/UI, Full-stack.

## 1) Diagnóstico general

El proyecto está en una etapa funcional avanzada: auth JWT, `/auth/me`, panel admin, usuarios, portales por rol y home público ya operan. La base técnica es **válida para continuar creciendo**, pero presenta deuda de madurez en cuatro ejes:

1. **Arquitectura y mantenibilidad**: hay módulos/páginas con responsabilidades amplias y acoplamiento alto.
2. **Seguridad aplicada**: hay controles buenos (DTO + guards + hashing), pero aún hay decisiones de seguridad “mínimas” para escala real (token en localStorage, rate limit in-memory).
3. **Rendimiento**: el bundle frontend ya cruza el warning de tamaño y hay cargas “todo o nada” en algunos endpoints admin.
4. **UX operacional**: buena cobertura de rutas, pero estados y flujos de error aún son dispares entre módulos.

Conclusión: **no hace falta reescribir**; sí conviene una refactorización incremental por etapas.

---

## 2) Hallazgos por severidad

## Críticos

1. **Ninguno bloqueante identificado** en la ejecución actual (auth/roles/admin siguen funcionales).

## Altos

1. **`UsersService` concentra demasiadas responsabilidades**
   - Normalización, validación, reglas de negocio, persistencia y seguridad en una sola clase.
   - Riesgo: regresiones en cambios de CRUD/roles, baja testabilidad por unidad.

2. **Control de acceso de frontend depende de `any` en route guard**
   - `ProtectedRoute` usa `user: any`, reduciendo garantías del contrato `/auth/me`.
   - Riesgo: errores silenciosos ante cambios de payload.

3. **Manejo de sesión del frontend en `localStorage`**
   - Diseño funcional pero vulnerable ante XSS (exfiltración de JWT).
   - Riesgo: impacto alto si aparece vulnerabilidad de inyección en UI.

## Medios

1. **Rate limiting in-memory**
   - Correcto para instancia única, no consistente en despliegue horizontal.

2. **`/users/stats` y listados admin cargan dataset completo en memoria de app**
   - Puede degradar rendimiento al crecer volumen de usuarios.

3. **`apiFetch<T = any>` mantiene default laxo**
   - Facilita integración rápida, pero erosiona tipado estricto en el tiempo.

4. **Portal de empleados legacy coexistiendo con `/portal`**
   - Duplica flujo de login de staff y eleva deuda de mantenimiento.

5. **UX de reset password en admin con `window.prompt`**
   - Funciona, pero pobre experiencia y propenso a errores de entrada.

## Bajos

1. **Naming mixto ES/EN** en páginas, layouts y servicios.
2. **Falta de guía única de arquitectura viva** (hay documentos, pero no “source of truth” operativo).

---

## 3) Auditoría 1 — Arquitectura

### Estado actual

- Monorepo bien separado (`backend/`, `frontend/`) y con módulos principales claros.
- Backend Nest con módulos (`auth`, `users`, `claims`) correcto para el tamaño actual.
- Frontend concentra mucho en `App.tsx` (routing + carga inicial + shell público).

### Problemas detectados

- Servicio `users` demasiado grande para seguir escalando sin fragmentación por casos de uso.
- Coexistencia de flujos de autenticación (`/portal` y `EmployeePortal`) con lógica parcialmente duplicada.
- Contratos FE/BE mayormente alineados, pero con tipado aún inconsistente en capas base.

### Estructura recomendada (incremental)

- **Backend**: `modules/users/{application,domain,infrastructure,dto}`.
- **Frontend**: `modules/{auth,public,admin,citizen,employee,operator}` + `shared/{api,types,ui}`.

---

## 4) Auditoría 2 — Seguridad (OWASP orientado)

### Fortalezas actuales

- JWT con secret obligatorio y expiración configurable.
- Guards por rol en backend para endpoints de administración.
- Validación de DTO + `ValidationPipe` global.
- Hash de contraseñas con bcrypt y reset sin retorno de password temporal.

### Riesgos y mitigación

- **Broken Access Control (medio-alto)**: reforzar tipado y tests de rutas protegidas en frontend.
- **Sensitive Data Exposure (medio)**: migrar JWT a cookie `HttpOnly` + CSRF token para backoffice.
- **Security Misconfiguration (medio)**: rate limiting distribuido + checklist de headers/cors por entorno.
- **Authentication Flaws (bajo-medio)**: eliminar flujos auth legacy duplicados.

### Dependencias

- `npm audit` backend/frontend no pudo ejecutarse por `403` del registry en este entorno; se requiere corrida en CI con acceso a advisories.

---

## 5) Auditoría 3 — Rendimiento

### Backend

- `getAdminStats()` en memoria puede volverse cuello de botella con grandes volúmenes.
- `findAllSafe()` para panel admin sin paginación ni filtros server-side incrementa carga y latencia.

### Frontend

- Bundle principal supera warning de 500KB minificado.
- `App.tsx` con muchas rutas importadas eager; conviene lazy-loading por dominios.
- Flujos con recarga completa de lista tras mutaciones en admin (`load()` luego de cada acción).

### Impacto estimado de mejoras

- Lazy loading por dominio: mejora TTI inicial del home/portal.
- Paginación + stats agregadas en DB: menor latencia admin y menor consumo de memoria backend.

---

## 6) Auditoría 4 — UX/UI

### Hallazgos

- Home y portales cubren navegación funcional, pero hay diferencias de madurez visual entre módulos.
- Portal principal mejorado, aunque subsiste portal staff legacy con UI básica.
- Mensajes de error/loading no totalmente homogéneos entre páginas.
- Reset password admin via prompt no es UX de nivel producción.

### Mejoras concretas

1. Unificar experiencia auth en `/portal` y dejar legacy como redirect.
2. Reemplazar prompt de reset por modal validado (policy visible + confirmación).
3. Definir patrón único de estados (`loading`, `empty`, `error`, `success`) reusable.

---

## 7) Auditoría 5 — Calidad de código

### Hallazgos

- Uso de `any` en puntos críticos de infraestructura FE.
- Funciones y componentes largos (especialmente páginas de formularios/portales).
- Lógica de negocio dispersa entre servicio backend + páginas frontend.

### Recomendaciones

- Endurecer TypeScript en servicios core (sin `any` por defecto).
- Extraer hooks de dominio (`useAdminUsers`, `useAuthSession`, etc.).
- Dividir `UsersService` por casos de uso para reducir complejidad ciclomática.

---

## 8) Refactorizaciones sugeridas (priorizadas)

### ETAPA 1 — Seguridad y contratos (alto impacto / bajo riesgo)

1. Tipar `ProtectedRoute` y contrato `/auth/me` sin `any`.
2. Mantener una sola UX de auth (`/portal`), redireccionando legacy.
3. Ejecutar `npm audit` en CI y bloquear CVEs altos/críticos.

### ETAPA 2 — Arquitectura backend

1. Partir `UsersService` en casos de uso:
   - `create-admin-user`
   - `update-admin-user`
   - `reset-admin-password`
   - `get-admin-stats`
2. Introducir paginación y filtros server-side para `/users`.

### ETAPA 3 — Rendimiento frontend

1. Lazy loading de rutas por dominio.
2. Separar bundles de admin y portales internos.
3. Reducir recargas globales de tabla en admin con actualización optimista o patch local.

### ETAPA 4 — UX y consistencia

1. Sistema uniforme de feedback y errores.
2. Modal de reset password con validación local.
3. Revisión de accesibilidad básica (labels, foco, navegación por teclado).

---

## 9) Refactorizaciones que NO valen la pena ahora

1. Reescribir el monorepo completo o migrar a microservicios.
2. Cambiar framework de estado global sin necesidad real.
3. Rehacer todo el routing: basta modularizarlo gradualmente.

---

## 10) Lista concreta de archivos candidatos a cambios

- `backend/src/users/users.service.ts`
- `backend/src/users/users.controller.ts` (paginación/filtros)
- `backend/src/users/*dto.ts`
- `frontend/src/components/ProtectedRoute.tsx`
- `frontend/src/services/api.ts`
- `frontend/src/pages/PortalPage.tsx`
- `frontend/src/pages/EmployeePortal.tsx`
- `frontend/src/pages/admin/AdminUsersPage.tsx`
- `frontend/src/App.tsx` (lazy routes)

---

## 11) Riesgos de implementación y mitigación

- **Riesgo**: romper auth/redirecciones por consolidación de portales.
  - **Mitigación**: pruebas de smoke por rol en cada PR.

- **Riesgo**: regresión de admin users al partir `UsersService`.
  - **Mitigación**: mantener contrato HTTP estable + tests unitarios por caso de uso.

- **Riesgo**: aumento de complejidad por refactor prematuro.
  - **Mitigación**: aplicar sólo cambios con ROI alto y medir resultados por etapa.
