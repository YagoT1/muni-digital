# UI Guidelines

## 1) Reglas de navegación
- Usar `Link` para navegación declarativa entre rutas.
- Usar `navigate()` para navegación imperativa posterior a acciones (submit, logout, etc.).
- Reservar anchors `#seccion` para navegación dentro de Home.
- Para anchors a secciones desde otras rutas, usar `goToSection()` (`frontend/src/lib/navigation.ts`) para fallback automático a `/#seccion`.

## 2) Uso de layouts
- `MainLayout`: layout público base (Header + NotificationBanner + Outlet + Footer).
- `PortalLayout`: layout interno reutilizable para ciudadano/empleado/operador.
- `AdminLayout`: layout interno para administración con acceso explícito a `Inicio`.
- No duplicar Header/Footer de Home dentro de páginas individuales.

## 3) Estados UX
- Toda pantalla con fetch debe contemplar:
  - `LoadingState`
  - `ErrorState`
  - `EmptyState` (cuando corresponda)
- Evitar placeholders ad-hoc tipo `Cargando...` o errores en texto plano.

## 4) Componentes permitidos
- Confirmaciones/acciones críticas: `ActionDialog`.
- Botones y campos: componentes UI compartidos en `frontend/src/components/ui`.
- Validación de respuestas de API: guards explícitos en services + helpers compartidos (`frontend/src/lib/validators.ts`).

## 5) Compatibilidad e incrementalidad
- Mantener rutas existentes y contratos backend.
- Aplicar cambios de UI/UX de forma incremental.
- Evitar refactors masivos en una sola PR.
