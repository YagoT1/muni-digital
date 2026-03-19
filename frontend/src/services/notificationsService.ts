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

export async function getActiveNotifications(): Promise<NotificationItem[]> {
  return apiFetch<NotificationItem[]>('/notifications/active', { skipAuth: true })
}

export async function listNotifications(): Promise<NotificationItem[]> {
  return apiFetch<NotificationItem[]>('/notifications')
}

export async function createNotification(
  payload: CreateNotificationPayload,
): Promise<NotificationItem> {
  return apiFetch<NotificationItem>('/notifications', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateNotification(
  id: number,
  payload: UpdateNotificationPayload,
): Promise<NotificationItem> {
  return apiFetch<NotificationItem>(`/notifications/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}
