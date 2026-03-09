import { NavLink, Outlet } from 'react-router-dom'
import { logout } from '../services/authService'
import { Button } from '@/components/ui/button'

export default function EmployeeLayout() {
  const links = [
    { to: '/empleado', label: 'Dashboard' },
    { to: '/empleado/perfil', label: 'Mi perfil' },
    { to: '/empleado/horas-extras', label: 'Horas extras' },
    { to: '/empleado/recibos', label: 'Recibos' },
  ]

  const handleLogout = () => {
    logout()
    window.location.replace('/portal?tab=login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Portal Empleado</h1>
            <p className="text-xs text-muted-foreground">Gestión interna por legajo</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar sesión
          </Button>
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
  )
}
