import React, { createContext, useContext, useState, useEffect } from 'react'

interface AccessibilityContextType {
  highContrast: boolean
  toggleHighContrast: () => void
  largeText: boolean
  toggleLargeText: () => void
  reduceMotion: boolean
  toggleReduceMotion: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('highContrast') === 'true'
  })
  const [largeText, setLargeText] = useState(() => {
    return localStorage.getItem('largeText') === 'true'
  })
  const [reduceMotion, setReduceMotion] = useState(() => {
    return localStorage.getItem('reduceMotion') === 'true' || 
           window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    localStorage.setItem('highContrast', highContrast.toString())
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [highContrast])

  useEffect(() => {
    localStorage.setItem('largeText', largeText.toString())
    if (largeText) {
      document.documentElement.style.fontSize = '120%'
    } else {
      document.documentElement.style.fontSize = '100%'
    }
  }, [largeText])

  useEffect(() => {
    localStorage.setItem('reduceMotion', reduceMotion.toString())
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }, [reduceMotion])

  const toggleHighContrast = () => setHighContrast(prev => !prev)
  const toggleLargeText = () => setLargeText(prev => !prev)
  const toggleReduceMotion = () => setReduceMotion(prev => !prev)

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      toggleHighContrast,
      largeText,
      toggleLargeText,
      reduceMotion,
      toggleReduceMotion
    }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
