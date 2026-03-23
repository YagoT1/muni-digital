import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingState } from '@/components/ui/LoadingState'
import { AdminUserForm } from './AdminUserForm'
import {
  getUserById,
  updateUser,
} from '../../services/adminUsersService'
import type { UserFormPayload } from '../../services/adminUsersService'

export default function AdminUserEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initial, setInitial] = useState<Partial<UserFormPayload> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      try {
        const user = await getUserById(Number(id))
        setInitial({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        dni: user.dni ?? '',
        email: user.email,
        role: user.role,
        country: user.country ?? 'AR',
        province: user.province ?? '',
        city: user.city ?? '',
        phone: user.phone ?? '',
        isActive: user.isActive,
        isVerified: user.isVerified,
        })
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'No se pudo cargar usuario')
      }
    }
    load()
  }, [id])

  const onSubmit = async (payload: UserFormPayload) => {
    if (!id) return
    const updatePayload = { ...payload }
    if (!updatePayload.password) delete updatePayload.password
    await updateUser(Number(id), updatePayload)
    navigate(`/admin/usuarios/${id}`)
  }

  if (error) return <ErrorState message={error} />
  if (!initial) return <LoadingState text="Cargando usuario..." />

  return (
    <div className="bg-white rounded-xl border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Editar usuario #{id}</h2>
        <Button asChild variant="outline"><Link to={`/admin/usuarios/${id}`}>Cancelar</Link></Button>
      </div>
      <AdminUserForm
        initial={initial}
        mode="edit"
        submitLabel="Guardar cambios"
        onSubmit={onSubmit}
      />
    </div>
  )
}
