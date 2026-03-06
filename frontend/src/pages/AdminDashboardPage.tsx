import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch, TOKEN_KEY } from '../services/api'
import { Button } from '@/components/ui/button'

type MeUser = {
  id: number
  email: string
  role: string
  firstName?: string | null
  lastName?: string | null
}

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<MeUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const displayName = useMemo(() => {
    if (!user) return ''
    const fn = (user.firstName ?? '').trim()
    const ln = (user.lastName ?? '').trim()
    return `${fn} ${ln}`.trim()
  }, [user])

  useEffect(() => {
    const load = async () => {
      try {
        setError(null)
        const data = await apiFetch<MeUser>('/auth/me')
        setUser(data)
      } catch (e: any) {
        setUser(null)
        setError(e?.message ?? 'No se pudo validar la sesión')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    window.location.href = '/portal?tab=login'
  }

  const go = (path: string) => navigate(path)

  if (loading) return <div className="p-10">Cargando...</div>

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 p-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">Panel Administrativo</h1>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-red-600 font-medium">Sesión inválida</p>
            <p className="text-sm text-muted-foreground mt-2">
              {error ?? 'Iniciá sesión nuevamente.'}
            </p>
            <div className="mt-4">
              <Button onClick={() => (window.location.href = '/portal?tab=login')}>
                Ir al portal
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Panel Administrativo</h1>
            <p className="text-muted-foreground mt-1">
              Gestión operativa, control y monitoreo.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => go('/')}>
              Ver sitio público
            </Button>
            <Button onClick={logout}>Cerrar sesión</Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
          {displayName ? <p><strong>Usuario:</strong> {displayName}</p> : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-muted-foreground">Usuarios registrados</p>
            <p className="text-2xl font-bold mt-2">—</p>
            <p className="text-xs text-muted-foreground mt-2">
              Próximo paso: consumir endpoint /users (admin) para métricas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-muted-foreground">Turnos activos</p>
            <p className="text-2xl font-bold mt-2">—</p>
            <p className="text-xs text-muted-foreground mt-2">
              Próximo paso: módulo de turnos + calendario.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-muted-foreground">Pagos / Comprobantes</p>
            <p className="text-2xl font-bold mt-2">—</p>
            <p className="text-xs text-muted-foreground mt-2">
              Próximo paso: historial, estados y conciliación.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => go('/admin/usuarios')}
            className="bg-white p-6 rounded-xl shadow text-left hover:shadow-md transition"
          >
            <p className="font-semibold">Gestión de Usuarios</p>
            <p className="text-sm text-muted-foreground mt-1">
              Roles, activación, reinicio de contraseña.
            </p>
          </button>

          <button
            onClick={() => go('/admin/turnos')}
            className="bg-white p-6 rounded-xl shadow text-left hover:shadow-md transition"
          >
            <p className="font-semibold">Gestión de Turnos</p>
            <p className="text-sm text-muted-foreground mt-1">
              Agenda, cupos, estados y auditoría.
            </p>
          </button>

          <button
            onClick={() => go('/admin/pagos')}
            className="bg-white p-6 rounded-xl shadow text-left hover:shadow-md transition"
          >
            <p className="font-semibold">Gestión de Pagos</p>
            <p className="text-sm text-muted-foreground mt-1">
              Historial, estados y reportes.
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}