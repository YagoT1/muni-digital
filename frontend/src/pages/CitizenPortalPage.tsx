import { useEffect, useState } from 'react'
import { apiFetch, TOKEN_KEY } from '../services/api'
import { Button } from '@/components/ui/button'

export default function CitizenPortalPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const loadUser = async () => {
      const data = await apiFetch('/auth/me')
      setUser(data)
    }
    loadUser()
  }, [])

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    window.location.href = '/portal?tab=login'
  }

  if (!user) return <div className="p-10">Cargando...</div>

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-3xl font-bold mb-6">Portal del Ciudadano</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <p><strong>DNI:</strong> {user.dni ?? '-'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">Mis Trámites</div>
        <div className="bg-white p-6 rounded-xl shadow">Mis Pagos</div>
        <div className="bg-white p-6 rounded-xl shadow">Mis Turnos</div>
      </div>

      <Button onClick={logout}>Cerrar sesión</Button>
    </div>
  )
}