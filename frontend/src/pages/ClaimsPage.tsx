import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { apiFetch } from '@/services/api'

export default function ClaimsPage() {
  const [form, setForm] = useState({ type: '', description: '', contact: '', location: '' })
  const [message, setMessage] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      await apiFetch('/claims', { method: 'POST', body: JSON.stringify(form), skipAuth: true })
      setMessage('Reclamo enviado correctamente.')
      setForm({ type: '', description: '', contact: '', location: '' })
    } catch (error: any) {
      setMessage(error?.message ?? 'No se pudo enviar el reclamo.')
    }
  }

  return (
    <div className="container-modern py-10 space-y-6">
      <h1 className="text-3xl font-bold">Reclamos</h1>
      <form className="grid gap-3 max-w-2xl" onSubmit={submit}>
        <Input required placeholder="Tipo de reclamo" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} />
        <textarea required className="min-h-28 rounded-md border p-3" placeholder="Descripción" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
        <Input required placeholder="Contacto (email o teléfono)" value={form.contact} onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))} />
        <Input placeholder="Ubicación" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
        <Button type="submit" className="w-fit">Enviar reclamo</Button>
      </form>
      {message && <p className="text-sm text-slate-700">{message}</p>}
    </div>
  )
}
