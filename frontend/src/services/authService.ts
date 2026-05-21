import { apiFetch } from './api'

<<<<<<< HEAD
const TOKEN_KEY = 'access_token'
=======
const TOKEN_KEY = 'md_access_token'
>>>>>>> d2d0fe3277fb2ea398994fc02c04b7be2255cd19

type JwtPayload = {
  sub?: number
  email?: string
  role?: string
  exp?: number
  iat?: number
}

function assertAccessTokenResponse(
  data: unknown,
): asserts data is { access_token: string } {
  if (!data || typeof data !== 'object' || typeof (data as { access_token?: unknown }).access_token !== 'string') {
    throw new Error('Invalid response')
  }
}

export type RegisterPayload = {
  firstName: string
  lastName: string
  dni: string
  birthDate: string
  email: string
  password: string
  country: string
  province: string
  city: string
}

// =========================
// FIX: función faltante
// =========================
function toRegisterPayload(
  payloadOrDni: RegisterPayload | string,
  email?: string,
  password?: string,
  legajo?: string,
): RegisterPayload {
  // Caso moderno (objeto completo)
  if (typeof payloadOrDni === 'object') {
    return payloadOrDni
  }

  void email
  void password
  void legajo

  throw new Error(
    'Formato de registro legacy no soportado. Enviar objeto RegisterPayload completo.',
  )
}

// =========================
// UTILS JWT
// =========================

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
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export async function logout() {
  try {
    await apiFetch('/auth/logout', { method: 'POST' })
  } finally {
    localStorage.removeItem(TOKEN_KEY)
  }
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

export function isTokenValid(token: string | null): boolean {
  if (!token) return false

  const payload = decodeToken(token)
  if (!payload?.exp) return false

  const nowInSeconds = Math.floor(Date.now() / 1000)
  return payload.exp > nowInSeconds
}

export function getRoleFromToken(token: string | null): string | null {
  if (!token) return null
  const payload = decodeToken(token)
  return payload?.role ?? null
}

// =========================
// AUTH
// =========================

export async function login(email: string, password: string) {
  const data = await apiFetch<unknown>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    skipAuth: true,
  })

<<<<<<< HEAD
  assertAccessTokenResponse(data)
  setToken(data.access_token)
  return data
}
=======
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

>>>>>>> d2d0fe3277fb2ea398994fc02c04b7be2255cd19

export async function register(
  payloadOrDni: RegisterPayload | string,
  email?: string,
  password?: string,
  legajo?: string,
) {
  const payload = toRegisterPayload(payloadOrDni, email, password, legajo)

  const data = await apiFetch<unknown>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    skipAuth: true,
  })

  assertAccessTokenResponse(data)
  setToken(data.access_token)
  return data
}
