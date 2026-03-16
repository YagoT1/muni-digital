# Auditoría técnica integral del repositorio (web platform)

Fecha: 2026-03-16  
Stack auditado: NestJS + TypeORM + JWT (backend), React + Vite + TS + Tailwind/shadcn (frontend).

---

## 1) Análisis de arquitectura general

### Diagnóstico
- El monorepo está correctamente separado en `backend/` y `frontend/`, con límites físicos claros entre API y UI.
- La arquitectura base es coherente para un producto en crecimiento: módulos Nest en backend y routing por dominios/roles en frontend.
- El punto más frágil hoy no es la separación FE/BE, sino la **concentración de responsabilidades** en algunas piezas (especialmente `UsersService` y `App.tsx` del frontend).

### Hallazgos
- **Acoplamiento medio-alto en backend users**: validación + normalización + reglas de negocio + persistencia en un único servicio.
- **Acoplamiento medio en frontend routing**: `App.tsx` centraliza demasiadas importaciones/rutas en eager loading.
- **Inconsistencia de madurez por módulo**: hay módulos “cerrados” (auth/admin users) y otros aún “base” (turnos/pagos/trámites públicos) con distinta profundidad.

### Riesgo arquitectónico
- Si se incorporan más features sin modularizar por dominio/casos de uso, aumentará el costo de cambio y la tasa de regresiones.

---

## 2) Análisis backend (NestJS)

### Lo que está bien
- Configuración global de validación (`ValidationPipe`) con `whitelist`, `forbidNonWhitelisted`, `transform`.
- Guards y roles aplicados sobre endpoints sensibles de usuarios admin.
- DTOs extensos y reglas condicionales en `RegisterDto`.
- CORS parametrizado por entorno y validación de variables críticas.

### Problemas detectados
1. **`UsersService` demasiado grande** (alto): más de un conjunto de responsabilidades, complejidad elevada para mantenimiento.
2. **Rate limit in-memory** (medio): correcto para 1 instancia, insuficiente para escalar horizontalmente.
3. **Agregaciones admin en memoria** (medio): `getAdminStats()` y listados completos pueden impactar con volúmenes altos.
4. **Señales de mezcla de estilos TS** (bajo): archivos con punto y coma y sin punto y coma; no rompe, pero reduce consistencia.

### Escalabilidad backend
- Falta paginación/filtros server-side en usuarios admin para reducir payload y costos de consulta.
- Recomendable mover métricas a consultas agregadas SQL (COUNT por rol/estado) en vez de fetch full + reduce en memoria.

---

## 3) Sistema de autenticación

### Fortalezas
- JWT secret obligatorio al iniciar.
- Expiración de JWT configurable y validada (`JWT_EXPIRES_IN > 0`).
- `/auth/me` protegido por strategy y control de exposición de `id` solo para admin.
- Register fuerza `role=ciudadano` en backend, mitigando elevación por payload frontend.

### Riesgos
1. **Token en `localStorage`** (alto): expuesto a XSS exfiltration.
2. **`ProtectedRoute` usa `any` para el usuario autenticado** (medio): debilita garantías de autorización en frontend.
3. **Flujo legacy de login staff adicional** (medio): duplicación de rutas/flujo puede derivar en inconsistencias si no se consolida.

---

## 4) Análisis frontend (React)

### Lo que está bien
- Routing por rol con layouts dedicados.
- Servicio API central (`apiFetch`) y helper de auth (`authService`) unificados.
- Cobertura de rutas públicas clave (deudas, turnos, reclamos, trámites, turismo, transparencia, noticias, eventos).

### Problemas detectados
1. **`App.tsx` con carga eager de muchas páginas** (medio): escala mal en tamaño y tiempo de carga.
2. **`apiFetch<T = any>` y `ProtectedRoute` con `any`** (alto/medio): deuda de tipado en capa crítica.
3. **Lógica de mutaciones admin acoplada a UI** (medio): recargas completas tras cada acción (`load()`), sin capa de hooks.
4. **UX inconsistente de errores/feedback** (medio): reset password aún con prompt del navegador.

---

## 5) Análisis de seguridad

### Evaluación por categorías
- **Input validation**: buena cobertura con DTOs y class-validator.
- **Autenticación/autorización**: sólida base de guards y roles.
- **Exposición de datos sensibles**: mejorada en `/auth/me` no-admin y reset password sin plaintext.
- **Misconfiguration**: parcialmente mitigada (env validation, headers, CORS), pero con margen en despliegue multi-instancia.

### OWASP Top 10 (resumen)
- **Broken Access Control**: riesgo medio (frontend typing/route checks mejorables).
- **Cryptographic Failures / Sensitive Data Exposure**: riesgo medio por localStorage JWT.
- **Injection**: bajo-medio (TypeORM + DTO ayuda, no se observaron concatenaciones SQL manuales en lo auditado).
- **Security Misconfiguration**: medio (rate limiting in-memory, falta validar advisories npm por entorno).

### Dependencias
- `npm audit` no ejecutable en este entorno por `403` del endpoint advisories de npm; requiere ejecutarlo en CI con acceso al registry.

---

## 6) Análisis de performance

### Frontend
- Build actual reporta bundle principal minificado por encima de 500 KB (warning de Vite).
- No se observa estrategia de code splitting por rutas de dominio en `App.tsx`.

### Backend
- `findAllSafe()` y `getAdminStats()` basados en cargas completas en memoria.
- Sin evidencias de caching de métricas o paginación de usuarios.

### Cuellos de botella potenciales
- Home/admin crecerán en costo de render/carga si se suman módulos sin lazy loading.
- Backend users puede degradar con base de usuarios grande al usar fetch completo para stats/listado.

---

## 7) Análisis de escalabilidad

### Capacidad de crecimiento actual
- **Usuarios**: media (falta paginación server-side + métricas SQL agregadas).
- **Módulos**: media-alta (estructura modular existe, pero falta normalizar patrón por dominio).
- **Complejidad**: media-baja si no se desacopla `UsersService` y no se tipa mejor FE core.

### Puntos que dificultarán crecimiento
1. Servicio users monolítico.
2. Routing frontend monolítico (imports eager).
3. Estrategia de sesión localStorage para entornos de alto riesgo.

---

## 8) Problemas detectados (priorizados)

### Críticos
- No se identificaron críticos bloqueantes en el estado actual.

### Importantes (altos)
1. Token JWT en localStorage (riesgo XSS).
2. Acoplamiento excesivo en `UsersService`.
3. Tipado laxo en capa core FE (`any` en route guard / fetch default).

### Menores (medios/bajos)
1. Rate limit in-memory no distribuido.
2. Bundle frontend elevado sin lazy routes.
3. UX de reset password con prompt.
4. Naming/estilo de código no totalmente homogéneo.

---

## 9) Recomendaciones de mejora

### Arquitectura
1. Dividir `UsersService` por casos de uso (create/update/reset/stats).
2. Introducir repositorio/query service para métricas y listados paginados.
3. Modularizar frontend por dominios (`modules/*`) y mover fetching a hooks.

### Seguridad
1. Migrar JWT de localStorage a cookie `HttpOnly` (al menos para backoffice).
2. Tipar estrictamente `/auth/me` en frontend y eliminar `any`.
3. Llevar rate limit a almacenamiento distribuido (Redis) si hay múltiples réplicas.

### Performance
1. Lazy loading en rutas por dominio (admin/portales internos).
2. Paginación y filtros server-side en `/users`.
3. Evitar reload completo de tabla ante mutaciones puntuales (update optimista o patch local).

### Calidad de código
1. Endurecer TypeScript en servicios core (`apiFetch` sin default `any`).
2. Estandarizar manejo de errores de API (`code`, `message`, `details`).
3. Consolidar UX de feedback (modales/forms en lugar de prompt nativo).

---

## 10) Evaluación general del proyecto

| Dimensión | Calificación | Observación |
|---|---:|---|
| Arquitectura | 7.5 / 10 | Base sólida, necesita desacoplar servicios y modularizar rutas/hooks. |
| Seguridad | 7.0 / 10 | Buen baseline (DTO/guards/headers), deuda clave en storage de token y rate limit distribuido. |
| Escalabilidad | 6.8 / 10 | Correcta para etapa actual; requiere paginación, métricas SQL y reducción de acoplamiento. |
| Calidad de código | 7.2 / 10 | Funcional y consistente en gran parte; persisten `any` y componentes/servicios muy grandes. |
| Mantenibilidad | 7.0 / 10 | Aceptable hoy, pero puede degradar rápido sin estrategia incremental de refactor. |

### Conclusión final
El proyecto está **bien encaminado y funcionalmente maduro**, con una base suficiente para evolucionar sin reescritura. El siguiente salto de calidad debe enfocarse en tres frentes concretos: **seguridad de sesión**, **desacoplamiento del dominio users**, y **optimización de carga frontend/backend**. Con un plan por etapas (4-6 PRs pequeños), se puede reducir deuda técnica de manera segura sin romper login/register, `/auth/me`, panel admin ni portales por rol.
