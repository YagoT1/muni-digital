import { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'
import { LoadingState } from '@/components/ui/LoadingState'
import { ErrorState } from '@/components/ui/ErrorState'

type MeResponse = {
  id: number
  dni: string
  email: string
  role: string
}

export default function OperatorDashboardPage() {
  const [user, setUser] = useState<MeResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const me = await apiFetch<MeResponse>('/auth/me')
        setUser(me)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'No se pudo cargar el panel de operador.')
      }
    }
    load()
  }, [])

  if (error) return <ErrorState message={error} />
  if (!user) return <LoadingState text="Cargando panel de operador..." />

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard operador</h2>
        <p className="text-sm text-muted-foreground">Acceso operativo (no administración total).</p>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-5">Atención a ciudadanos</div>
        <div className="bg-white border rounded-xl p-5">Gestión de turnos</div>
        <div className="bg-white border rounded-xl p-5">Seguimiento de trámites</div>
      </div>
    </div>
  )
}
