import { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    apiFetch('/users/profile')
      .then(setUser)
      .catch((e: any) => setError(e?.message || 'Error'))
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