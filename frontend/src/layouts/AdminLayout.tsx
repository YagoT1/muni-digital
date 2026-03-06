import { Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../services/authService'
import { Button } from '@/components/ui/button'

export default function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    window.location.replace('/')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Panel Administrativo</h1>
        <Button variant="outline" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      <div className="p-8">
        <Outlet />
      </div>
    </div>
  )
}