import type { NavigateFunction } from 'react-router-dom'

export function goToSection(
  hash: string,
  navigate: NavigateFunction,
  pathname: string,
  options?: { homePath?: string },
) {
  const normalizedHash = hash.startsWith('#') ? hash : `#${hash}`
  const homePath = options?.homePath ?? '/'

  if (pathname !== homePath) {
    navigate(`${homePath}${normalizedHash}`)
    return
  }

  const element = document.querySelector(normalizedHash)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
