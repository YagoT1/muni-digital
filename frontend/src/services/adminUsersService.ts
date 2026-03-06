// src/services/adminUsersService.ts
import { apiFetch } from './api'

export type UserRole = 'admin' | 'operador' | 'moderador' | 'empleado' | 'ciudadano'

export type UserSafe = {
  id: number
  email: string
  role: UserRole
  firstName?: string | null
  lastName?: string | null
  dni?: string | null
  country?: string | null
  province?: string | null
  city?: string | null
  isActive: boolean
  isVerified: boolean
}

export async function listUsers(): Promise<UserSafe[]> {
  return apiFetch<UserSafe[]>('/users')
}

export async function setUserRole(id: number, role: UserRole): Promise<void> {
  await apiFetch(`/users/${id}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  })
}

export async function setUserActive(id: number, isActive: boolean): Promise<void> {
  await apiFetch(`/users/${id}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  })
}

export async function resetUserPassword(
  id: number,
): Promise<{ tempPassword?: string; message?: string } | unknown> {
  return apiFetch<{ tempPassword?: string; message?: string } | unknown>(`/users/${id}/reset-password`, {
    method: 'POST',
  })
}

