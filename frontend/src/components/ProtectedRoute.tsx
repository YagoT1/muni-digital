import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { apiFetch, TOKEN_KEY } from '../services/api'

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const validate = async () => {
      try {
        const data = await apiFetch('/auth/me')
        setUser(data)
      } catch {
        localStorage.removeItem(TOKEN_KEY)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    validate()
  }, [])

  if (loading) return <div className="p-10 text-center">Validando sesión...</div>

  if (!user) return <Navigate to="/portal?tab=login" replace />

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}