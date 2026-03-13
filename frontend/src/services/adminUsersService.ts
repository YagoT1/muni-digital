// src/services/adminUsersService.ts
import { apiFetch } from './api'

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

export async function listUsers(): Promise<UserSafe[]> {
  return apiFetch<UserSafe[]>('/users')
}

export async function getAdminStats(): Promise<AdminStats> {
  return apiFetch<AdminStats>('/users/stats')
}

export async function getUserById(id: number): Promise<UserSafe> {
  return apiFetch<UserSafe>(`/users/${id}`)
}

export async function createUser(payload: UserFormPayload): Promise<UserSafe> {
  return apiFetch<UserSafe>('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateUser(
  id: number,
  payload: Partial<UserFormPayload>,
): Promise<UserSafe> {
  return apiFetch<UserSafe>(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
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
