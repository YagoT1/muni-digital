import type { ApiErrorPayload } from '../types/api'

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean
}

export async function apiFetch<T = unknown>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const url = `${API_URL}${path.startsWith('/') ? path : `/${path}`}`

  const headers = new Headers(options.headers || {})
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  })

  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const body = isJson
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null)

  if (!res.ok) {
    const payload = body as ApiErrorPayload | string | null
    const msg =
      (payload && typeof payload !== 'string' && payload.message) ||
      (payload && typeof payload !== 'string' && payload.error) ||
      (typeof payload === 'string' && payload) ||
      `Request failed (${res.status})`

    throw new Error(Array.isArray(msg) ? msg.join(', ') : msg)
  }

  return body as T
}
