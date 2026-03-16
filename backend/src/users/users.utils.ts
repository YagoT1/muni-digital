import { BadRequestException } from '@nestjs/common'

export function normalizeEmail(email: string): string {
  return (email ?? '').trim().toLowerCase()
}

export function normalizeText(value?: string | null): string | undefined {
  if (value === null || value === undefined) return undefined
  const v = String(value).trim()
  return v.length ? v : undefined
}

export function normalizeDocumentNumber(value: string): string {
  return (value ?? '').replace(/\D/g, '').trim()
}

export function normalizeCuil(value?: string | null): string | undefined {
  if (!value) return undefined
  const onlyDigits = value.replace(/\D/g, '').trim()
  return onlyDigits.length ? onlyDigits : undefined
}

export function assertPasswordPolicy(password: string) {
  if (password.length < 8) {
    throw new BadRequestException('Password must be at least 8 characters long')
  }

  const hasLetter = /[A-Za-z]/.test(password)
  const hasNumber = /\d/.test(password)

  if (!hasLetter || !hasNumber) {
    throw new BadRequestException(
      'Password must contain at least one letter and one number',
    )
  }
}
