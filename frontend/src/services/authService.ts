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

function base64UrlDecode(input: string) {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = base64.length % 4
  const padded = pad ? base64 + '='.repeat(4 - pad) : base64

  return decodeURIComponent(
    atob(padded)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  )
}

export function getToken(): string | null {
  return null
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export async function logout() {
  await apiFetch('/auth/logout', { method: 'POST' })
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    return JSON.parse(base64UrlDecode(payload)) as JwtPayload
  } catch {
    return null
  }
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

  setToken(data.access_token)
  return data
}
