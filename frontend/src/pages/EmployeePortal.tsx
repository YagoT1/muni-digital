import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../services/api'

type Profile = { email: string; role: string; userId?: number; legajo?: string }

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
      })

      localStorage.setItem('access_token', data.access_token)

      const p = await apiFetch<Profile>('/users/profile')

      const allowed = ['admin', 'operador', 'empleado', 'moderador']
      if (!allowed.includes((p.role || '').toLowerCase())) {
        localStorage.removeItem('access_token')
        setError('Acceso denegado: no pertenece al staff.')
        return
      }

      navigate('/empleados/dashboard')
    } catch (e: any) {
      setError(e?.message || 'Error')
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