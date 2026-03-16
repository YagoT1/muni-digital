import { useCallback, useMemo, useState } from 'react'
import {
  listUsers,
  resetUserPassword,
  setUserActive,
  setUserRole,
  type UserRole,
  type UserSafe,
} from '../services/adminUsersService'
import type { PaginatedResponse } from '../types/api'

const DEFAULT_LIMIT = 20

export function useUsersAdmin() {
  const [users, setUsers] = useState<UserSafe[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [resetMessage, setResetMessage] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const load = useCallback(async (nextPage = page) => {
    try {
      setLoading(true)
      setError(null)
      const result = await listUsers({ page: nextPage, limit: DEFAULT_LIMIT })
      const data = result as PaginatedResponse<UserSafe>
      setUsers(data.items)
      setPage(data.page)
      setTotalPages(data.totalPages)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo cargar la lista')
    } finally {
      setLoading(false)
    }
  }, [page])

  const onToggleActive = useCallback(async (u: UserSafe) => {
    try {
      setBusyId(u.id)
      await setUserActive(u.id, !u.isActive)
      await load(page)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo actualizar estado')
    } finally {
      setBusyId(null)
    }
  }, [load, page])

  const onChangeRole = useCallback(async (id: number, role: UserRole) => {
    try {
      setBusyId(id)
      await setUserRole(id, role)
      await load(page)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo actualizar rol')
    } finally {
      setBusyId(null)
    }
  }, [load, page])

  const onResetPassword = useCallback(async (id: number, newPassword: string) => {
    try {
      setBusyId(id)
      const res = await resetUserPassword(id, newPassword)
      setResetMessage(res.message)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo resetear password')
    } finally {
      setBusyId(null)
    }
  }, [])

  const pagination = useMemo(() => ({ page, totalPages }), [page, totalPages])

  return {
    users,
    loading,
    busyId,
    error,
    resetMessage,
    pagination,
    load,
    onToggleActive,
    onChangeRole,
    onResetPassword,
    setError,
  }
}
