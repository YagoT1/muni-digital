import { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'

type MeResponse = {
  dni?: string | null
  email: string
  role: string
  legajo?: string | null
  isActive?: boolean
}

export default function EmployeeProfilePage() {
  const [user, setUser] = useState<MeResponse | null>(null)

  useEffect(() => {
    apiFetch<MeResponse>('/auth/me').then(setUser)
  }, [])

  if (!user) return <div>Cargando perfil...</div>

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Perfil de empleado</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>
      <p><strong>DNI:</strong> {user.dni ?? '—'}</p>
      <p><strong>Legajo:</strong> {user.legajo ?? '—'}</p>
      <p><strong>Activo:</strong> {user.isActive ? 'Sí' : 'No'}</p>
    </div>
  )
}
