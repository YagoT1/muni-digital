<<<<<<< HEAD
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
=======
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../services/authService'
import { Button } from '@/components/ui/button'

export default function EmployeeLayout() {
  const navigate = useNavigate()
  const links = [
    { to: '/empleado', label: 'Dashboard' },
    { to: '/empleado/perfil', label: 'Mi perfil' },
    { to: '/empleado/horas-extras', label: 'Horas extras' },
    { to: '/empleado/recibos', label: 'Recibos' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/portal?tab=login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Portal Empleado</h1>
            <p className="text-xs text-muted-foreground">Gestión interna por legajo</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/', { replace: true })}>
              Inicio público
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-[220px,1fr] gap-6">
        <aside className="bg-white rounded-xl border p-3 h-fit">
          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/empleado'}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
>>>>>>> d2d0fe3277fb2ea398994fc02c04b7be2255cd19
  )
}
