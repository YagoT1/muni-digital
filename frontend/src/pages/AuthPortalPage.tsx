import { Navigate, useSearchParams } from 'react-router-dom'

export default function AuthPortalPage() {
  const [params] = useSearchParams()
  const tab = params.get('tab')
  const to = tab === 'register' ? '/portal?tab=register' : '/portal?tab=login'

  return <Navigate to={to} replace />
}
