import { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'

type MeResponse = {
  id: number
  dni: string
  email: string
  role: string
}

export default function OperatorDashboardPage() {
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
        <h2 className="text-2xl font-bold">Dashboard operador</h2>
        <p className="text-sm text-muted-foreground">Acceso operativo (no administración total).</p>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-5">Atención a ciudadanos</div>
        <div className="bg-white border rounded-xl p-5">Gestión de turnos</div>
        <div className="bg-white border rounded-xl p-5">Seguimiento de trámites</div>
      </div>
    </div>
  )
}
