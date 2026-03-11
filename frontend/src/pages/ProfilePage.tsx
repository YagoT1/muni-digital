import { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'

type Profile = {
  id: number
  email: string
  role: string
  dni?: string | null
  legajo?: string | null
  isActive?: boolean
}

export default function ProfilePage() {
  const [user, setUser] = useState<Profile | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    apiFetch<Profile>('/auth/me')
      .then(setUser)
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : 'Error'
        setError(message)
      })
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h2>Profile</h2>

      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      {!error && !user && <p>Cargando...</p>}
    </div>
  )
}
