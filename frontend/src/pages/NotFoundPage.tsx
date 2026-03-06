import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">404</h1>
        <p className="text-slate-500 mb-6">La ruta solicitada no existe.</p>
        <Button asChild className="rounded-xl">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}