import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  createNotification,
  listNotifications,
  updateNotification,
  type NotificationItem,
} from '../../services/notificationsService'

export default function AdminNotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await listNotifications()
      setItems(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar notificaciones')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onCreate = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      setError(null)
      await createNotification({ title, message, isActive: true })
      setTitle('')
      setMessage('')
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo crear notificación')
    } finally {
      setSaving(false)
    }
  }

  const onToggleActive = async (item: NotificationItem) => {
    try {
      setEditingId(item.id)
      await updateNotification(item.id, { isActive: !item.isActive })
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo actualizar estado')
    } finally {
      setEditingId(null)
    }
  }

  const onEditMessage = async (item: NotificationItem) => {
    const nextTitle = window.prompt('Editar título', item.title)
    if (nextTitle === null) return

    const nextMessage = window.prompt('Editar mensaje', item.message)
    if (nextMessage === null) return

    try {
      setEditingId(item.id)
      await updateNotification(item.id, { title: nextTitle, message: nextMessage })
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo editar notificación')
    } finally {
      setEditingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Notificaciones</h2>
          <p className="text-sm text-muted-foreground">Gestión de banners visibles en Home.</p>
        </div>
        <Button variant="outline" onClick={load}>Refrescar</Button>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700 text-sm">{error}</div>}

      <Card className="space-y-3">
        <h3 className="text-base font-semibold">Nueva notificación</h3>
        <form onSubmit={onCreate} className="space-y-3">
          <Input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
          />
          <Button type="submit" disabled={saving}>
            {saving ? 'Guardando...' : 'Crear notificación'}
          </Button>
        </form>
      </Card>

      <Card className="overflow-auto p-0">
        {loading ? (
          <div className="p-4 text-sm text-muted-foreground">Cargando notificaciones...</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Título</th>
                <th className="text-left p-3">Mensaje</th>
                <th className="text-left p-3">Estado</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const busy = editingId === item.id
                return (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.id}</td>
                    <td className="p-3 font-medium">{item.title}</td>
                    <td className="p-3">{item.message}</td>
                    <td className="p-3">{item.isActive ? 'Activa' : 'Inactiva'}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" disabled={busy} onClick={() => onEditMessage(item)}>
                          Editar
                        </Button>
                        <Button size="sm" variant={item.isActive ? 'destructive' : 'default'} disabled={busy} onClick={() => onToggleActive(item)}>
                          {item.isActive ? 'Desactivar' : 'Activar'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}
