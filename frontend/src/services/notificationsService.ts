import { apiFetch } from './api'

export type NotificationItem = {
  id: number
  title: string
  message: string
  isActive: boolean
  createdAt: string
}

export type CreateNotificationPayload = {
  title: string
  message: string
  isActive?: boolean
}

export type UpdateNotificationPayload = Partial<CreateNotificationPayload>

function isNotificationItem(value: unknown): value is NotificationItem {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'number' &&
    typeof v.title === 'string' &&
    typeof v.message === 'string' &&
    typeof v.isActive === 'boolean'
  )
}

export async function getActiveNotifications(): Promise<NotificationItem[]> {
  const data = await apiFetch<unknown>('/notifications/active', { skipAuth: true })
  if (!Array.isArray(data) || !data.every(isNotificationItem)) {
    throw new Error('Invalid response')
  }
  return data
}

export async function listNotifications(): Promise<NotificationItem[]> {
  const data = await apiFetch<unknown>('/notifications')
  if (!Array.isArray(data) || !data.every(isNotificationItem)) {
    throw new Error('Invalid response')
  }
  return data
}

export async function createNotification(
  payload: CreateNotificationPayload,
): Promise<NotificationItem> {
  const data = await apiFetch<unknown>('/notifications', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (!isNotificationItem(data)) throw new Error('Invalid response')
  return data
}

export async function updateNotification(
  id: number,
  payload: UpdateNotificationPayload,
): Promise<NotificationItem> {
  const data = await apiFetch<unknown>(`/notifications/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  if (!isNotificationItem(data)) throw new Error('Invalid response')
  return data
}
