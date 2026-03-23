import PortalLayout from './PortalLayout'

export default function CitizenLayout() {
  return (
    <PortalLayout
      title="Portal Ciudadano"
      subtitle="Servicios y autogestión"
      navItems={[
        { to: '/ciudadano', label: 'Dashboard', end: true },
        { to: '/ciudadano/perfil', label: 'Mi perfil' },
        { to: '/ciudadano/turnos', label: 'Turnos' },
        { to: '/ciudadano/pagos', label: 'Pagos' },
        { to: '/ciudadano/tramites', label: 'Trámites' },
      ]}
    />
  )
}
