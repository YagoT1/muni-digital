import { useEffect, useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import {
  getActiveNotifications,
  type NotificationItem,
} from '../../services/notificationsService'

export function NotificationBanner() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [hiddenIds, setHiddenIds] = useState<number[]>([])

  useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        const data = await getActiveNotifications()
        if (mounted) setNotifications(data)
      } catch {
        if (mounted) setNotifications([])
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  const visible = notifications.filter((item) => !hiddenIds.includes(item.id))
  if (visible.length === 0) return null

  return (
    <div role="alert" className="bg-amber-500 text-white relative">
      <div className="container-modern py-2.5 flex flex-col gap-2">
        {visible.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 opacity-90" aria-hidden="true" />
              <p className="text-sm font-medium">
                <span className="font-semibold">{item.title}: </span>
                {item.message}
              </p>
            </div>
            <button
              onClick={() => setHiddenIds((prev) => [...prev, item.id])}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              aria-label={`Cerrar notificación ${item.title}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
