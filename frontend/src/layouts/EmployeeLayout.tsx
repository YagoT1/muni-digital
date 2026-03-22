import PortalLayout from './PortalLayout'

export default function EmployeeLayout() {
  return (
    <PortalLayout
      title="Portal Empleado"
      subtitle="Gestión interna por legajo"
      navItems={[
        { to: '/empleado', label: 'Dashboard', end: true },
        { to: '/empleado/perfil', label: 'Mi perfil' },
        { to: '/empleado/horas-extras', label: 'Horas extras' },
        { to: '/empleado/recibos', label: 'Recibos' },
      ]}
    />
  )
}
