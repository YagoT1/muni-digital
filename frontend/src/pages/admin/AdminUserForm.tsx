import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { UserFormPayload, UserRole } from '../../services/adminUsersService'

const defaultData: UserFormPayload = {
  email: '',
  country: 'AR',
  province: 'Buenos Aires',
  city: 'Roque Pérez',
}

export function AdminUserForm({
  initial,
  submitLabel,
  mode,
  onSubmit,
}: {
  initial?: Partial<UserFormPayload>
  submitLabel: string
  mode: 'create' | 'edit'
  onSubmit: (payload: UserFormPayload) => Promise<void>
}) {
  const [form, setForm] = useState<UserFormPayload>({ ...defaultData, ...initial })
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await onSubmit(form)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="space-y-3" onSubmit={submit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          placeholder="Nombre"
          value={form.firstName ?? ''}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <Input
          placeholder="Apellido"
          value={form.lastName ?? ''}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <Input
          placeholder="DNI"
          value={form.dni ?? ''}
          onChange={(e) => setForm({ ...form, dni: e.target.value })}
        />
        <Input
          type="date"
          value={form.birthDate ?? ''}
          onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          required={mode === 'create'}
        />
        <Input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder={mode === 'create' ? 'Contraseña (obligatoria)' : 'Contraseña (opcional)'}
          value={form.password ?? ''}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required={mode === 'create'}
        />
        <Input
          placeholder="País"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          required
        />
        <Input
          placeholder="Provincia"
          value={form.province}
          onChange={(e) => setForm({ ...form, province: e.target.value })}
          required
        />
        <Input
          placeholder="Ciudad"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />
        <Input
          placeholder="Teléfono"
          value={form.phone ?? ''}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm mr-2">Rol</label>
        <select
          className="border rounded px-2 py-1"
          value={form.role ?? 'ciudadano'}
          onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
        >
          <option value="admin">Admin</option>
          <option value="operador">Operador</option>
          <option value="empleado">Empleado</option>
          <option value="moderador">Moderador</option>
          <option value="ciudadano">Ciudadano</option>
        </select>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      <Button type="submit" disabled={busy}>
        {busy ? 'Guardando...' : submitLabel}
      </Button>
    </form>
  )
}
