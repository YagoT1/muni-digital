import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  const [tempPassword, setTempPassword] = useState<string | null>(null)

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      setUsers(await listUsers())
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

  const onResetPassword = async (id: number) => {
    try {
      setBusyId(id)
      const res = await resetUserPassword(id)
      const value =
        typeof res === 'object' && res && 'tempPassword' in res
          ? String((res as { tempPassword?: string }).tempPassword ?? '')
          : ''
      setTempPassword(value || 'Contraseña temporal no disponible')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo resetear password')
    } finally {
      setBusyId(null)
    }
  }

  if (loading) return <div className="p-6">Cargando usuarios...</div>

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
                      <Button size="sm" variant="outline" onClick={() => onResetPassword(u.id)} disabled={busy}>
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

      {tempPassword && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Contraseña temporal (DEV): <code className="font-semibold">{tempPassword}</code>
        </div>
      )}
    </div>
  )
}
