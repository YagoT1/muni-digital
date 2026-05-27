import type { ApiErrorPayload } from '../types/api'
import * as Sentry from '@sentry/react'

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean
}

const UX_ERROR_BY_STATUS: Record<number, string> = {
  400: 'Revisá los datos ingresados e intentá nuevamente.',
  401: 'Tu sesión expiró o no es válida. Iniciá sesión nuevamente.',
  403: 'No tenés permisos para realizar esta acción.',
  404: 'No se encontró el recurso solicitado.',
  429: 'Demasiadas solicitudes. Intentá nuevamente en unos minutos.',
  500: 'Ocurrió un error interno. Intentá nuevamente.',
}

function sanitizeForUser(status: number, rawMessage: string) {
  if (status >= 500) return UX_ERROR_BY_STATUS[500]
  if (UX_ERROR_BY_STATUS[status]) return UX_ERROR_BY_STATUS[status]
  return rawMessage || 'No se pudo completar la solicitud.'
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
    const rawMsg =
      (payload && typeof payload !== 'string' && payload.message) ||
      (payload && typeof payload !== 'string' && payload.error) ||
      (typeof payload === 'string' && payload) ||
      `Request failed (${res.status})`

    const rawText = Array.isArray(rawMsg) ? rawMsg.join(', ') : rawMsg
    const userMessage = sanitizeForUser(res.status, rawText)
    const err = new Error(userMessage)

    if (res.status >= 500) {
      Sentry.captureException(new Error(`API ${res.status} ${path}: ${rawText}`))
    }

    throw err
  }

  return body as T
}
