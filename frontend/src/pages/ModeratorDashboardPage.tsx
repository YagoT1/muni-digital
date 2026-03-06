import { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'
import { logout } from '../services/authService'
import { Button } from '@/components/ui/button'

type MeResponse = {
  id: number
  dni: string
  email: string
  role: string
}

export default function ModeratorDashboardPage() {
  const [user, setUser] = useState<MeResponse | null>(null)

  useEffect(() => {
    const load = async () => {
      const me = await apiFetch<MeResponse>('/auth/me')
      setUser(me)
    }
    load()
  }, [])

  const handleLogout = () => {
    logout()
    window.location.replace('/')
  }

  if (!user) return <div className="p-10">Cargando...</div>

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Panel de Moderación</h1>
          <p className="text-slate-500 text-sm">Supervisión de actividad y cumplimiento operativo.</p>
        </div>
        <Button onClick={handleLogout} variant="outline">Cerrar sesión</Button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">Actividad de Operadores</div>
        <div className="bg-white p-6 rounded-xl shadow">Auditoría de Accesos</div>
        <div className="bg-white p-6 rounded-xl shadow">Alertas y Reportes</div>
      </div>
    </div>
  )
}