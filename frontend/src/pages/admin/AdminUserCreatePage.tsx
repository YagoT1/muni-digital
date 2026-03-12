import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AdminUserForm } from './AdminUserForm'
import { createUser } from '../../services/adminUsersService'
import type { UserFormPayload } from '../../services/adminUsersService'

export default function AdminUserCreatePage() {
  const navigate = useNavigate()

  const onSubmit = async (payload: UserFormPayload) => {
    await createUser(payload)
    navigate('/admin/usuarios')
  }

  return (
    <div className="bg-white rounded-xl border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Alta de usuario</h2>
        <Button asChild variant="outline"><Link to="/admin/usuarios">Cancelar</Link></Button>
      </div>
      <AdminUserForm mode="create" submitLabel="Crear usuario" onSubmit={onSubmit} />
    </div>
  )
}
