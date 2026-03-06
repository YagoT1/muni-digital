import { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../../services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type UserRole = 'admin' | 'operador' | 'ciudadano' | 'empleado' | 'moderador'

type SafeUser = {
  id: number
  firstName: string | null
  lastName: string | null
  dni: string | null
  email: string
  role: UserRole
  isActive: boolean
  isVerified: boolean
  country: string
  province: string
  city: string
  createdAt: string
  updatedAt: string
}

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'operador', label: 'Operador' },
  { value: 'empleado', label: 'Empleado' },
  { value: 'moderador', label: 'Moderador' },
  { value: 'ciudadano', label: 'Ciudadano' },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<SafeUser[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState('')

  // modal “simple” para mostrar temp password dev
  const [tempPassword, setTempPassword] = useState<{ email: string; value: string } | null>(null)

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return users
    return users.filter((u) => {
      const full = `${u.firstName ?? ''} ${u.lastName ?? ''}`.toLowerCase()
      return (
        u.email.toLowerCase().includes(query) ||
        (u.dni ?? '').includes(query) ||
        full.includes(query) ||
        u.role.toLowerCase().includes(query) ||
        `${u.city ?? ''}`.toLowerCase().includes(query)
      )
    })
  }, [users, q])

  const load = async () => {
    try {
      setError(null)
      setLoading(true)
      const data = await apiFetch<SafeUser[]>('/users')
      setUsers(data)
    } catch (e: any) {
      setError(e?.message ?? 'No se pudo cargar la lista de usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const updateRole = async (id: number, role: UserRole) => {
    try {
      setBusyId(id)
      setError(null)
      const updated = await apiFetch<SafeUser>(`/users/${id}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      })
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)))
    } catch (e: any) {
      setError(e?.message ?? 'No se pudo actualizar el rol')
    } finally {
      setBusyId(null)
    }
  }

  const updateActive = async (id: number, isActive: boolean) => {
    try {
      setBusyId(id)
      setError(null)
      const updated = await apiFetch<SafeUser>(`/users/${id}/active`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive }),
      })
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)))
    } catch (e: any) {
      setError(e?.message ?? 'No se pudo actualizar el estado')
    } finally {
      setBusyId(null)
    }
  }

  const resetPassword = async (id: number) => {
    try {
      setBusyId(id)
      setError(null)
      const res = await apiFetch<{ ok: boolean; tempPassword: string }>(`/users/${id}/reset-password`, {
        method: 'POST',
      })
      const u = users.find((x) => x.id === id)
      if (res?.tempPassword && u) {
        setTempPassword({ email: u.email, value: res.tempPassword })
      }
    } catch (e: any) {
      setError(e?.message ?? 'No se pudo resetear la contraseña')
    } finally {
      setBusyId(null)
    }
  }

  if (loading) return <div className="p-10">Cargando usuarios...</div>

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
            <p className="text-muted-foreground mt-1">
              Administración de roles, estado activo y reseteo de credenciales (DEV).
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={load}>
              Refrescar
            </Button>
            <Button onClick={() => (window.location.href = '/admin')}>
              Volver
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2">
              <Label htmlFor="q">Buscar</Label>
              <Input
                id="q"
                placeholder="Email, DNI, nombre, rol, ciudad…"
                className="rounded-xl"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Resultados: <span className="font-medium text-slate-900">{filtered.length}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Usuario</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Documento</th>
                  <th className="text-left p-3">Ubicación</th>
                  <th className="text-left p-3">Rol</th>
                  <th className="text-left p-3">Activo</th>
                  <th className="text-left p-3">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((u) => {
                  const name = `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() || '—'
                  const busy = busyId === u.id
                  return (
                    <tr key={u.id} className="border-t">
                      <td className="p-3">{u.id}</td>
                      <td className="p-3">{name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">{u.dni ?? '—'}</td>
                      <td className="p-3">
                        {u.city}, {u.province} ({u.country})
                      </td>

                      <td className="p-3">
                        <select
                          className="border rounded-lg px-2 py-1 bg-white"
                          value={u.role}
                          disabled={busy}
                          onChange={(e) => updateRole(u.id, e.target.value as UserRole)}
                        >
                          {ROLE_OPTIONS.map((r) => (
                            <option key={r.value} value={r.value}>
                              {r.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="p-3">
                        <Button
                          variant={u.isActive ? 'outline' : 'default'}
                          disabled={busy}
                          onClick={() => updateActive(u.id, !u.isActive)}
                        >
                          {u.isActive ? 'Activo' : 'Inactivo'}
                        </Button>
                      </td>

                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            disabled={busy}
                            onClick={() => resetPassword(u.id)}
                          >
                            Reset PW
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}

                {filtered.length === 0 && (
                  <tr className="border-t">
                    <td className="p-6 text-center text-muted-foreground" colSpan={8}>
                      Sin resultados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {tempPassword && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="font-semibold text-amber-900">Contraseña temporal (DEV)</p>
            <p className="text-sm text-amber-900 mt-1">
              Usuario: <strong>{tempPassword.email}</strong>
            </p>
            <div className="mt-3 flex items-center gap-3">
              <code className="px-3 py-2 bg-white border rounded-lg">
                {tempPassword.value}
              </code>
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(tempPassword.value)
                }}
              >
                Copiar
              </Button>
              <Button onClick={() => setTempPassword(null)}>
                Cerrar
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Recomendación: en producción esto debe ser un flujo de recuperación por email y auditoría.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}