import { apiFetch } from './api'

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
  // Flujo canónico: cookie httpOnly gestionada por backend.
  return null
}

export function setToken(_token: string) {
  // Compat legacy intencional: no persistimos JWT en localStorage.
}

export async function logout() {
  await apiFetch('/auth/logout', { method: 'POST' })
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

  const data = await apiFetch<{ access_token: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    skipAuth: true,
  })

  return data
}
