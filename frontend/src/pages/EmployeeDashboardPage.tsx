import { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'

type MeResponse = {
  id: number
  dni: string
  email: string
  role: string
  legajo?: string | null
}

export default function EmployeeDashboardPage() {
  const [user, setUser] = useState<MeResponse | null>(null)

  useEffect(() => {
    const load = async () => {
      const me = await apiFetch<MeResponse>('/auth/me')
      setUser(me)
    }
    load()
  }, [])

  if (!user) return <div className="p-6">Cargando...</div>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard empleado</h2>
        <p className="text-sm text-muted-foreground">Gestión interna según legajo y permisos.</p>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <p><strong>Legajo:</strong> {user.legajo ?? '—'}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-5">Bandeja de Trámites</div>
        <div className="bg-white border rounded-xl p-5">Turnos del Área</div>
        <div className="bg-white border rounded-xl p-5">Reportes Operativos</div>
      </div>
    </div>
  )
}
