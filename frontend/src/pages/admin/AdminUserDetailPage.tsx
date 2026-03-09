import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { getUserById } from '../../services/adminUsersService'
import type { UserSafe } from '../../services/adminUsersService'

export default function AdminUserDetailPage() {
  const { id } = useParams()
  const [user, setUser] = useState<UserSafe | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      try {
        setUser(await getUserById(Number(id)))
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'No se pudo cargar usuario')
      }
    }
    load()
  }, [id])

  if (error) return <div className="text-red-600">{error}</div>
  if (!user) return <div>Cargando...</div>

  return (
    <div className="bg-white rounded-xl border p-6 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Detalle de usuario #{user.id}</h2>
        <div className="flex gap-2">
          <Button asChild variant="outline"><Link to="/admin/usuarios">Volver</Link></Button>
          <Button asChild><Link to={`/admin/usuarios/${user.id}/editar`}>Editar</Link></Button>
        </div>
      </div>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Nombre:</strong> {`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || '—'}</p>
      <p><strong>DNI:</strong> {user.dni ?? '—'}</p>
      <p><strong>Rol:</strong> {user.role}</p>
      <p><strong>Estado:</strong> {user.isActive ? 'Activo' : 'Inactivo'}</p>
      <p><strong>Ubicación:</strong> {user.city ?? '-'} / {user.province ?? '-'} / {user.country ?? '-'}</p>
    </div>
  )
}
