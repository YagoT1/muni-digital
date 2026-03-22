import type { PaginatedResponse } from '@/types/api'

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object'
}

export function isPaginated<T>(
  value: unknown,
  itemGuard: (item: unknown) => item is T,
): value is PaginatedResponse<T> {
  if (!isObjectRecord(value)) return false

  return (
    Array.isArray(value.items) &&
    value.items.every(itemGuard) &&
    typeof value.total === 'number' &&
    typeof value.page === 'number' &&
    typeof value.totalPages === 'number'
  )
}
