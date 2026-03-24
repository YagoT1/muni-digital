import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../services/authService'
import { Button } from '@/components/ui/button'

const links = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/usuarios', label: 'Usuarios' },
  { to: '/admin/turnos', label: 'Turnos' },
  { to: '/admin/pagos', label: 'Pagos' },
  { to: '/admin/notifications', label: 'Notificaciones' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const currentModule = links.find((link) => pathname === link.to || pathname.startsWith(`${link.to}/`))?.label ?? 'Panel'

  const handleLogout = () => {
    logout()
    navigate('/portal?tab=login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Panel Administrativo</h1>
            <p className="text-xs text-muted-foreground">Módulo actual: {currentModule}</p>
            <div className="mt-1 text-xs text-slate-400">Inicio / Admin / {currentModule}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link to="/">Inicio</Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-[220px,1fr] gap-6">
        <aside className="bg-white rounded-xl border p-3 h-fit">
          <h2 className="px-3 pb-2 text-xs uppercase tracking-wide text-slate-400">Navegación</h2>
          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/admin'}
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
