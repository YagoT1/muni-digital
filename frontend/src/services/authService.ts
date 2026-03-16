import { apiFetch } from './api'

type JwtPayload = {
  sub?: number
  email?: string
  role?: string
  exp?: number
  iat?: number
}

export type RegisterPayload = {
  firstName?: string
  lastName?: string
  dni?: string
  birthDate?: string
  email: string
  password: string
  country?: string
  province?: string
  city?: string
  legajo?: string
}

export function getToken(): string | null {
  return null
}

export function setToken(_token: string) {
  // No-op: authentication now relies on HttpOnly cookie set by backend.
}

export async function logout() {
  await apiFetch('/auth/logout', { method: 'POST' })
}

export function decodeToken(_token: string): JwtPayload | null {
  return null
}

export function isTokenValid(_token: string | null): boolean {
  return false
}

export function getRoleFromToken(_token: string | null): string | null {
  return null
}

export async function login(email: string, password: string) {
  return apiFetch<{ access_token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    skipAuth: true,
  })
}

function toRegisterPayload(
  payloadOrDni: RegisterPayload | string,
  email?: string,
  password?: string,
  legajo?: string,
): RegisterPayload {
  if (typeof payloadOrDni !== 'string') return payloadOrDni

  return {
    dni: payloadOrDni.trim(),
    email: (email ?? '').trim(),
    password: password ?? '',
    legajo,
    firstName: 'Usuario',
    lastName: 'Portal',
    birthDate: '1990-01-01',
    country: 'AR',
    province: 'Buenos Aires',
    city: 'Roque Pérez',
  }
}

export async function register(
  payloadOrDni: RegisterPayload | string,
  email?: string,
  password?: string,
  legajo?: string,
) {
  const payload = toRegisterPayload(payloadOrDni, email, password, legajo)

  return apiFetch<{ access_token: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    skipAuth: true,
  })
}
