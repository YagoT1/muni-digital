import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAdminStats } from '../services/adminUsersService'
import type { AdminStats } from '../services/adminUsersService'
import { Button } from '@/components/ui/button'

const roleOrder = ['admin', 'operador', 'moderador', 'empleado', 'ciudadano'] as const

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setError(null)
        const data = await getAdminStats()
        setStats(data)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'No se pudieron cargar métricas')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const roleStats = useMemo(() => {
    return roleOrder.map((role) => ({
      role,
      count: stats?.byRole?.[role] ?? 0,
    }))
  }, [stats])

  if (loading) return <div className="p-6">Cargando dashboard...</div>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard Admin</h2>
        <p className="text-sm text-muted-foreground">Resumen operativo en tiempo real.</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="Usuarios totales" value={stats?.total ?? 0} />
        <MetricCard label="Activos" value={stats?.active ?? 0} />
        <MetricCard label="Inactivos" value={stats?.inactive ?? 0} />
      </div>

      <div className="bg-white rounded-xl border p-5">
        <h3 className="font-semibold mb-3">Usuarios por rol</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 text-sm">
          {roleStats.map((r) => (
            <div key={r.role} className="rounded-lg border p-3">
              <p className="text-muted-foreground capitalize">{r.role}</p>
              <p className="text-xl font-bold">{r.count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border p-5">
        <h3 className="font-semibold mb-3">Accesos rápidos</h3>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/admin/usuarios">Gestionar usuarios</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/usuarios/nuevo">Alta de usuario</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/turnos">Turnos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/pagos">Pagos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl border p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}
