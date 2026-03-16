import { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'

type Me = {
  email: string
  role: string
  dni?: string | null
  isActive?: boolean
}

export default function CitizenProfilePage() {
  const [user, setUser] = useState<Me | null>(null)

  useEffect(() => {
    apiFetch<Me>('/auth/me').then(setUser)
  }, [])

  if (!user) return <div>Cargando perfil...</div>

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Mi perfil</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>
      <p><strong>DNI:</strong> {user.dni ?? '-'}</p>
      <p><strong>Activo:</strong> {user.isActive ? 'Sí' : 'No'}</p>
    </div>
  )
}
