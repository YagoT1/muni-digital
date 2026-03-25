import { Button } from '@/components/ui/button'
import { logout } from '@/services/authService'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

type NavItem = {
  to: string
  label: string
  end?: boolean
}

type PortalLayoutProps = {
  title: string
  subtitle: string
  navItems: NavItem[]
}

export default function PortalLayout({ title, subtitle, navItems }: PortalLayoutProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const activeModule = navItems.find((item) => pathname === item.to || pathname.startsWith(`${item.to}/`))?.label

  const handleLogout = () => {
    logout()
    navigate('/portal?tab=login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-xs text-muted-foreground">
              {subtitle}
              {activeModule ? ` · Módulo actual: ${activeModule}` : ''}
            </p>
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
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end ?? false}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
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
