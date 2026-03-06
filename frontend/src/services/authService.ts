// src/services/authService.ts
import { apiFetch, TOKEN_KEY } from './api'

type JwtPayload = {
  sub?: number
  email?: string
  role?: string
  exp?: number
  iat?: number
}

function base64UrlDecode(input: string) {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = base64.length % 4
  const padded = pad ? base64 + '='.repeat(4 - pad) : base64

  return decodeURIComponent(
    atob(padded)
      .split('')
      .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join(''),
  )
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  // Importante: token debe ser string "eyJ..."
  localStorage.setItem(TOKEN_KEY, token)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    return JSON.parse(base64UrlDecode(payload))
  } catch {
    return null
  }
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false
  const payload = decodeToken(token)
  if (!payload?.exp) return true
  const now = Math.floor(Date.now() / 1000)
  return payload.exp > now
}

export function getRoleFromToken(token: string | null): string | null {
  if (!token) return null
  const payload = decodeToken(token)
  return payload?.role ?? null
}

export async function login(email: string, password: string) {
  const data = await apiFetch<{ access_token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    skipAuth: true,
  })

  setToken(data.access_token)
  return data
}

export async function register(payload: any) {
  // payload debería incluir TODO lo que tu backend exige
  const data = await apiFetch<{ access_token: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    skipAuth: true,
  })

  setToken(data.access_token)
  return data
}