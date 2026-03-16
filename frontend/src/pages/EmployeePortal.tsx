import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../services/api'
import { logout, setToken } from '../services/authService'

type MeProfile = { email: string; role: string; id?: number; legajo?: string | null }

function routeByRole(role?: string | null) {
  switch ((role ?? '').toLowerCase()) {
    case 'admin':
      return '/admin'
    case 'operador':
      return '/operador'
    case 'moderador':
      return '/moderador'
    case 'empleado':
      return '/empleado'
    default:
      return null
  }
}

export default function EmployeePortal() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')
    try {
      const data = await apiFetch<{ access_token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        skipAuth: true,
      })

      setToken(data.access_token)

      const me = await apiFetch<MeProfile>('/auth/me')

      const destination = routeByRole(me.role)
      if (!destination) {
        logout()
        setError('Acceso denegado: no pertenece al staff.')
        return
      }

      navigate(destination)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error'
      setError(message)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Portal de Empleados</h2>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <div style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
        <button onClick={handleLogin}>Ingresar</button>
      </div>
    </div>
  )
}
