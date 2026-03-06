import React, { createContext, useContext, useMemo, useState } from 'react'

type AccessibilityState = {
  reducedMotion: boolean
  setReducedMotion: (v: boolean) => void
  highContrast: boolean
  setHighContrast: (v: boolean) => void
  fontScale: number
  setFontScale: (v: number) => void
}

const AccessibilityContext = createContext<AccessibilityState | undefined>(
  undefined,
)

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [fontScale, setFontScale] = useState(1)

  const value = useMemo(
    () => ({
      reducedMotion,
      setReducedMotion,
      highContrast,
      setHighContrast,
      fontScale,
      setFontScale,
    }),
    [reducedMotion, highContrast, fontScale],
  )

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return ctx
}