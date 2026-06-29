import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function ModuleInDevelopmentPage() {
  return (
    <div className="container-modern py-10">
      <div className="mx-auto max-w-2xl rounded-xl border bg-white p-6 text-center shadow-soft">
        <h1 className="text-3xl font-bold text-slate-900">Módulo en desarrollo</h1>
        <p className="mt-4 whitespace-pre-line text-slate-600">
          {`Este módulo forma parte de la arquitectura aprobada de Muni Digital.

Su implementación se encuentra planificada para próximas versiones.`}
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
