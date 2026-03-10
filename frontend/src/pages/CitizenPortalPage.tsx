import { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'

type Me = {
  id: number
  email: string
  role: string
  dni?: string | null
  isActive?: boolean
}

export default function CitizenPortalPage() {
  const [user, setUser] = useState<Me | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const data = await apiFetch<Me>('/auth/me')
      setUser(data)
    }
    loadUser()
  }, [])

  if (!user) return <div className="p-6">Cargando...</div>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard ciudadano</h2>
        <p className="text-sm text-muted-foreground">Bienvenido al portal de autogestión.</p>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <p><strong>DNI:</strong> {user.dni ?? '-'}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-5">Mis Trámites</div>
        <div className="bg-white border rounded-xl p-5">Mis Pagos</div>
        <div className="bg-white border rounded-xl p-5">Mis Turnos</div>
      </div>
    </div>
  )
}
