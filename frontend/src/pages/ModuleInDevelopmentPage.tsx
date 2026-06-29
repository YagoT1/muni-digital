import { Link } from 'react-router-dom'
import { Landmark } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function ModuleInDevelopmentPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="container-modern flex min-h-[calc(100vh-80px)] items-center justify-center py-10">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">

          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <Landmark className="h-10 w-10 text-slate-700" />
            </div>
          </div>

          <span className="inline-flex rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700">
            Próximamente
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            Módulo en desarrollo
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Este apartado forma parte de la plataforma <strong>Municipio Digital</strong>.
          </p>

          <p className="mt-2 text-base leading-7 text-slate-600">
            Actualmente se encuentra en desarrollo y estará disponible en una
            próxima actualización.
          </p>

          <p className="mt-2 text-base leading-7 text-slate-600">
            Agradecemos su comprensión.
          </p>

          <div className="mt-10">
            <Button asChild size="lg">
              <Link to="/">
                Volver al inicio
              </Link>
            </Button>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6">
            <p className="text-sm font-semibold text-slate-700">
              Muni Digital
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Plataforma Integral de Gestión Municipal
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}