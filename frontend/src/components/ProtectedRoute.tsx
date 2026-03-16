import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { apiFetch } from '../services/api'
import type { AuthUser } from '../types/auth'

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const validate = async () => {
      try {
        const data = await apiFetch<AuthUser>('/auth/me')
        setUser(data)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    validate()
  }, [])

  if (loading) return <div className="p-10 text-center">Validando sesión...</div>

  if (!user) return <Navigate to="/portal?tab=login" replace />

  if (allowedRoles && (!user.role || !allowedRoles.includes(user.role))) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
