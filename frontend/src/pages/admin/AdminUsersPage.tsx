import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUsersAdmin } from '../../hooks/useUsersAdmin'
import type { UserRole } from '../../services/adminUsersService'

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'operador', label: 'Operador' },
  { value: 'empleado', label: 'Empleado' },
  { value: 'moderador', label: 'Moderador' },
  { value: 'ciudadano', label: 'Ciudadano' },
]

export default function AdminUsersPage() {
  const [q, setQ] = useState('')
  const {
    users,
    loading,
    busyId,
    error,
    resetMessage,
    pagination,
    load,
    onToggleActive,
    onChangeRole,
    onResetPassword
  } = useUsersAdmin()

  useEffect(() => {
    load(1)
  }, [load])

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

  const askReset = async (id: number) => {
    const input = window.prompt('Ingresá la nueva contraseña (mínimo 8 caracteres, incluir letras y números):')
    if (!input) return
    await onResetPassword(id, input)
  }

  if (loading) return <div className="p-6">Cargando usuarios...</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
          <p className="text-sm text-muted-foreground">Listado paginado, estado, rol y acciones administrativas.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => load(pagination.page)}>Refrescar</Button>
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
                      <Button size="sm" variant="outline" onClick={() => askReset(u.id)} disabled={busy}>
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

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => load(Math.max(1, pagination.page - 1))}
          disabled={pagination.page <= 1}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {pagination.page} de {pagination.totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => load(Math.min(pagination.totalPages, pagination.page + 1))}
          disabled={pagination.page >= pagination.totalPages}
        >
          Siguiente
        </Button>
      </div>

      {resetMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
          {resetMessage}
        </div>
      )}
    </div>
  )
}
