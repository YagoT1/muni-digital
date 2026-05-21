import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingState } from '@/components/ui/LoadingState'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { ActionDialog } from '@/components/ui/ActionDialog'
import {
  listUsers,
  resetUserPassword,
  setUserActive,
  setUserRole,
} from '../../services/adminUsersService'
import type { UserRole, UserSafe } from '../../services/adminUsersService'

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'operador', label: 'Operador' },
  { value: 'empleado', label: 'Empleado' },
  { value: 'moderador', label: 'Moderador' },
  { value: 'ciudadano', label: 'Ciudadano' },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserSafe[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [resetMessage, setResetMessage] = useState<string | null>(null)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [resetTargetId, setResetTargetId] = useState<number | null>(null)
  const [newPassword, setNewPassword] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await listUsers()
<<<<<<< HEAD
      if (Array.isArray(response)) {
        setUsers(response)
      } else {
        setUsers(response.items)
      }
=======
      setUsers(Array.isArray(response) ? response : response.items)
>>>>>>> d2d0fe3277fb2ea398994fc02c04b7be2255cd19
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo cargar la lista')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return users
    return users.filter((u) => {
      const full = `${u.firstName ?? ''} ${u.lastName ?? ''}`.toLowerCase()
      return (
        u.email.toLowerCase().includes(query) ||
        (u.dni ?? '').includes(query) ||
        full.includes(query) ||
        u.role.includes(query)
      )
    })
  }, [users, q])

  const onToggleActive = async (u: UserSafe) => {
    try {
      setBusyId(u.id)
      await setUserActive(u.id, !u.isActive)
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo actualizar estado')
    } finally {
      setBusyId(null)
    }
  }

  const onChangeRole = async (id: number, role: UserRole) => {
    try {
      setBusyId(id)
      await setUserRole(id, role)
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo actualizar rol')
    } finally {
      setBusyId(null)
    }
  }

  const openResetDialog = (id: number) => {
    setResetTargetId(id)
    setNewPassword('')
    setResetDialogOpen(true)
  }

  const onResetPassword = async () => {
    if (!resetTargetId) return
    try {
      setBusyId(resetTargetId)
      const value = newPassword.trim()
      if (value.length < 8) {
        setError('La nueva contraseña debe tener al menos 8 caracteres.')
        return
      }

      const res = await resetUserPassword(resetTargetId, value)
      setResetMessage(res.message)
      setResetDialogOpen(false)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo resetear password')
    } finally {
      setBusyId(null)
    }
  }

  if (loading) return <LoadingState text="Cargando usuarios..." />

  if (error && users.length === 0) {
    return <ErrorState message={error} />
  }

  if (!loading && users.length === 0) {
    return <EmptyState message="No hay usuarios para mostrar." />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
          <p className="text-sm text-muted-foreground">Listado, estado, rol y acciones administrativas.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}>Refrescar</Button>
          <Button asChild><Link to="/admin/usuarios/nuevo">Nuevo usuario</Link></Button>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700 text-sm">{error}</div>}

      <Input
        placeholder="Buscar por email, DNI, nombre o rol"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="bg-white rounded-xl border overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Nombre</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Rol</th>
              <th className="text-left p-3">Estado</th>
              <th className="text-left p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => {
              const busy = busyId === u.id
              const name = `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() || '—'
              return (
                <tr key={u.id} className="border-t">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      disabled={busy}
                      onChange={(e) => onChangeRole(u.id, e.target.value as UserRole)}
                      className="border rounded px-2 py-1"
                    >
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <Button size="sm" variant={u.isActive ? 'outline' : 'default'} onClick={() => onToggleActive(u)} disabled={busy}>
                      {u.isActive ? 'Activo' : 'Inactivo'}
                    </Button>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/admin/usuarios/${u.id}`}>Detalle</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/admin/usuarios/${u.id}/editar`}>Editar</Link>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => openResetDialog(u.id)} disabled={busy}>
                        Reset PW
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {resetMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
          {resetMessage}
        </div>
      )}

      <ActionDialog
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
        title="Resetear contraseña"
        description="Ingresá una nueva contraseña para el usuario seleccionado."
        confirmLabel="Resetear"
        loading={busyId === resetTargetId && resetTargetId !== null}
        onConfirm={onResetPassword}
      >
        <Input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </ActionDialog>
    </div>
  )
}
