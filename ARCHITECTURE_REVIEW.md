# Revisión técnica integral — monorepo `muni-digital`

Fecha: 2026-03-12
Alcance: `backend/` (NestJS + TypeORM + JWT) y `frontend/` (React + Vite + TS)

## 1) Diagnóstico general

El proyecto tiene una base funcional sólida (auth, roles, panel admin, portales por rol y home público), pero acumula **deuda de crecimiento rápido** en tres frentes:

1. **Arquitectura de frontend orientada a páginas sin capas intermedias** (estado y fetching mezclados con UI).
2. **Servicios backend con responsabilidades amplias** (especialmente `UsersService`).
3. **Inconsistencias residuales de rutas/flujo** que no siempre rompen build, pero sí mantenibilidad y riesgo de regresión.

Conclusión: **sí conviene una refactorización parcial e incremental** (no estructural completa).

---

## 2) Problemas detectados por severidad

## Crítico

- No se detectaron fallas críticas activas que rompan auth/roles/base funcional en el estado actual.

## Alto

1. **`UsersService` demasiado grande y acoplado**
   - Mezcla normalización, validaciones de negocio, persistencia y políticas de seguridad.
   - Impacto: alto costo de cambio, mayor probabilidad de regresiones en CRUD admin.

2. **Contrato de API tipado débil en frontend (`any` en fetch base / user de route guard)**
   - `apiFetch<T = any>` y `user: any` en `ProtectedRoute` reducen seguridad de tipos.
   - Impacto: errores silenciosos al cambiar contratos backend.

3. **Página de staff legacy (`EmployeePortal`) con lógica duplicada respecto de `/portal`**
   - Duplica login de staff fuera del flujo principal y agrega superficie de mantenimiento.
   - Impacto: deriva de comportamiento/UX y bugs de redirección.

## Medio

1. **Falta de capa de dominio/app services en backend**
   - Estructura actual controller->service->repo funciona, pero no separa bien reglas complejas.

2. **Falta de estandarización de errores de API**
   - Se usan `Error` genéricos en frontend y mensajes heterogéneos en backend.

3. **Rate limiting en memoria**
   - Válido para single-instance, limitado para horizontal scaling.

4. **Gran cantidad de páginas “base” sin estrategia de módulo homogénea**
   - Hay coherencia funcional, pero poca cohesión por dominio (turnos/pagos/trámites).

## Bajo

1. **Naming y mezcla de idiomas** (`EmployeePortal`, `CitizenPortalPage`, etc.).
2. **Documentación técnica distribuida** (falta índice único de arquitectura).

---

## 3) Oportunidades de mejora

- Introducir una **capa de casos de uso** en backend para usuarios admin (create/update/reset/stats).
- Introducir **hooks de datos** en frontend por dominio (`useAuthMe`, `useAdminUsers`, `usePublicServices`).
- Definir **contratos compartidos** (OpenAPI + generación de tipos o tipado manual centralizado).
- Estandarizar errores (`code`, `message`, `details`) y mapeo UI.

---

## 4) Refactorizaciones recomendadas (priorizadas)

### Fase 1 (alto impacto / bajo riesgo)

1. Extraer de `UsersService` helpers de normalización y validación a utilidades dedicadas.
2. Tipar `ProtectedRoute` y eliminar `any` de usuario autenticado.
3. Consolidar login: mantener `/portal` como única UX principal y dejar `EmployeePortal` sólo como fallback técnico o redirección.

### Fase 2 (impacto medio)

4. Crear carpetas frontend por dominio (`modules/admin`, `modules/public`, `modules/employee`, etc.).
5. Introducir hooks para estados loading/error y fetch repetido.
6. Estandarizar responses de error backend + helper frontend para traducción de errores.

### Fase 3 (evolución)

7. Mover rate limit a storage distribuido (Redis) si se escala horizontalmente.
8. Unificar naming y convención de idioma.

---

## 5) Refactorizaciones innecesarias por ahora

- Reescritura completa de routing.
- Migrar estado global a librería compleja (Redux/Zustand) sin necesidad comprobada.
- Separar microservicios: prematuro para el tamaño actual.

---

## 6) Propuesta de estructura ideal (incremental)

## Backend

- `src/modules/auth`
- `src/modules/users`
  - `controllers/`
  - `application/` (casos de uso)
  - `domain/` (reglas/validaciones)
  - `infrastructure/` (typeorm/repos)
  - `dto/`

## Frontend

- `src/modules/public`
- `src/modules/auth`
- `src/modules/admin`
- `src/modules/citizen`
- `src/modules/employee`
- `src/modules/operator`
- `src/shared` (ui, api core, utils, types)

---

## 7) Lista concreta de cambios recomendados

1. `backend/src/users/users.service.ts`
   - extraer validaciones y normalización.
2. `backend/src/users/*dto.ts`
   - centralizar reglas compartidas (email/dni/cuil/legajo).
3. `frontend/src/components/ProtectedRoute.tsx`
   - tipado estricto del usuario autenticado.
4. `frontend/src/services/api.ts`
   - eliminar default `any` en `apiFetch`.
5. `frontend/src/pages/EmployeePortal.tsx`
   - evitar deriva con flujo `/portal`.
6. `frontend/src/pages/*` (por dominio)
   - migración gradual a módulos y hooks.

---

## 8) Estrategia paso a paso

1. **Semana 1**: tipado y deuda de bajo riesgo (route guard + apiFetch + helpers usuarios).
2. **Semana 2**: extracción de lógica en backend users (sin cambiar contratos HTTP).
3. **Semana 3**: refactor frontend por dominio + hooks comunes de loading/error.
4. **Semana 4**: unificación de errores y documentación arquitectónica.

Cada paso debe ejecutar build/test existentes y smoke de login/register/admin.

---

## 9) Riesgos de cambios propuestos

- Riesgo de regresión en CRUD admin si se fragmenta `UsersService` sin tests adicionales.
- Riesgo de rutas/redirects al consolidar portales legacy.
- Riesgo de tipos incompatibles frontend-backend al endurecer typing sin revisar todos los consumidores.

Mitigación: PRs pequeños, feature flags de routing si aplica, pruebas unitarias de users/auth y build frontend por cada fase.
