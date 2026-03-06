export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
export const TOKEN_KEY = 'md_access_token'

type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean
}

export async function apiFetch<T = any>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const url = `${API_URL}${path.startsWith('/') ? path : `/${path}`}`

  const headers = new Headers(options.headers || {})
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (!options.skipAuth) {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(url, { ...options, headers })

  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const body = isJson
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null)

  if (!res.ok) {
    const msg =
      (body && (body.message || body.error)) ||
      (typeof body === 'string' && body) ||
      `Request failed (${res.status})`
    throw new Error(msg)
  }

  return body as T
}