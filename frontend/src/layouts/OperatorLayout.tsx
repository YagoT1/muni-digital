import PortalLayout from './PortalLayout'

export default function OperatorLayout() {
  return (
    <PortalLayout
      title="Portal Operador / Moderador"
      subtitle="Operación diaria sin privilegios admin"
      navItems={[
        { to: '/operador', label: 'Dashboard', end: true },
        { to: '/operador/ciudadanos', label: 'Ciudadanos' },
        { to: '/operador/turnos', label: 'Turnos' },
        { to: '/operador/tramites', label: 'Trámites' },
      ]}
    />
  )
}
