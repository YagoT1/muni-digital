import { apiFetch } from './api'
import type { PaginatedResponse } from '../types/api'
import { isPaginated } from '@/lib/validators'

export type UserRole =
  | 'admin'
  | 'operador'
  | 'moderador'
  | 'empleado'
  | 'ciudadano'

export type UserSafe = {
  id: number
  email: string
  role: UserRole
  firstName?: string | null
  lastName?: string | null
  dni?: string | null
  birthDate?: string
  country?: string | null
  province?: string | null
  city?: string | null
  phone?: string | null
  isActive: boolean
  isVerified: boolean
  createdAt?: string
  updatedAt?: string
}

export type AdminStats = {
  total: number
  active: number
  inactive: number
  byRole: Record<string, number>
}

export type UserFormPayload = {
  firstName?: string
  lastName?: string
  dni?: string
  birthDate?: string
  email: string
  password?: string
  country: string
  province: string
  city: string
  phone?: string
  legajo?: string
  role?: UserRole
  isActive?: boolean
  isVerified?: boolean
}

<<<<<<< HEAD
function isUserSafe(value: unknown): value is UserSafe {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'number' &&
    typeof v.email === 'string' &&
    typeof v.role === 'string' &&
    typeof v.isActive === 'boolean' &&
    typeof v.isVerified === 'boolean'
  )
}

function isAdminStats(value: unknown): value is AdminStats {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.total === 'number' &&
    typeof v.active === 'number' &&
    typeof v.inactive === 'number' &&
    !!v.byRole &&
    typeof v.byRole === 'object'
  )
}
=======
>>>>>>> d2d0fe3277fb2ea398994fc02c04b7be2255cd19

export async function listUsers(params?: {
  page?: number
  limit?: number
}): Promise<UserSafe[] | PaginatedResponse<UserSafe>> {
  if (params?.page || params?.limit) {
    const q = new URLSearchParams()
    if (params.page) q.set('page', String(params.page))
    if (params.limit) q.set('limit', String(params.limit))
    const data = await apiFetch<unknown>(`/users?${q.toString()}`)
    if (!isPaginated(data, isUserSafe)) throw new Error('Invalid response')
    return data
  }

  const data = await apiFetch<unknown>('/users')
  if (!Array.isArray(data) || !data.every(isUserSafe)) throw new Error('Invalid response')
  return data
}

export async function getAdminStats(): Promise<AdminStats> {
  const data = await apiFetch<unknown>('/users/stats')
  if (!isAdminStats(data)) throw new Error('Invalid response')
  return data
}

export async function getUserById(id: number): Promise<UserSafe> {
  const data = await apiFetch<unknown>(`/users/${id}`)
  if (!isUserSafe(data)) throw new Error('Invalid response')
  return data
}

export async function createUser(payload: UserFormPayload): Promise<UserSafe> {
  const data = await apiFetch<unknown>('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (!isUserSafe(data)) throw new Error('Invalid response')
  return data
}

export async function updateUser(
  id: number,
  payload: Partial<UserFormPayload>,
): Promise<UserSafe> {
  const data = await apiFetch<unknown>(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  if (!isUserSafe(data)) throw new Error('Invalid response')
  return data
}

export async function setUserRole(id: number, role: UserRole): Promise<void> {
  await apiFetch<void>(`/users/${id}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  })
}

export async function setUserActive(id: number, isActive: boolean): Promise<void> {
  await apiFetch<void>(`/users/${id}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  })
}

export async function resetUserPassword(
  id: number,
  newPassword: string,
): Promise<{ ok: boolean; message: string }> {
  return apiFetch<{ ok: boolean; message: string }>(`/users/${id}/reset-password`, {
    method: 'POST',
    body: JSON.stringify({ newPassword }),
  })
}
