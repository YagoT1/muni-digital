import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingState } from '@/components/ui/LoadingState'
import { EducationCard } from './EducationCard'
import { EducationFilter, type EducationFilterValue } from './EducationFilter'

type EducationCenter = {
  id: string
  name: string
  type: 'inicial' | 'primario' | 'secundario' | 'tecnico' | 'especial' | 'adultos' | 'complementario'
  category: 'formal' | 'inclusivo' | 'complementario'
  address?: string
  phone?: string
  isRural?: boolean
}

const educationCenters: EducationCenter[] = [
  { id: 'eem-1', name: 'EEM Nº1', type: 'secundario', category: 'formal' },
  {
    id: 'eest-1',
    name: 'EEST Nº1 “René Favaloro”',
    type: 'tecnico',
    category: 'formal',
  },
  {
    id: 'ep-20',
    name: 'Escuela Primaria Nº20 Bernardino Rivadavia',
    type: 'primario',
    category: 'formal',
  },
  { id: 'ep-24', name: 'Escuela Primaria Nº24', type: 'primario', category: 'formal' },
  { id: 'ep-1', name: 'Escuela Nº1 Sarmiento', type: 'primario', category: 'formal' },
  { id: 'ep-3', name: 'Escuela Nº3 Juan Bautista Alberdi', type: 'primario', category: 'formal' },
  {
    id: 'ep-22',
    name: 'Escuela Nº22 Fray Luis Beltrán',
    type: 'primario',
    category: 'formal',
    isRural: true,
  },
  { id: 'la-paz', name: 'Escuela La Paz', type: 'inicial', category: 'formal', isRural: true },
  {
    id: 'especial-rp',
    name: 'Escuela Especial de Roque Pérez',
    type: 'especial',
    category: 'inclusivo',
  },
  {
    id: 'cec-1',
    name: 'Centro Educativo Complementario Nº1',
    type: 'complementario',
    category: 'complementario',
  },
  {
    id: 'adultos-velazco',
    name: 'Escuela de Adultos María de Velazco',
    type: 'adultos',
    category: 'complementario',
  },
  { id: 'cef-118', name: 'CEF Nº118', type: 'complementario', category: 'complementario' },
]

function matchesFilter(center: EducationCenter, filter: EducationFilterValue) {
  if (filter === 'all') return true

  if (filter === 'especial') {
    return center.type === 'especial'
  }

  if (filter === 'adultos') {
    return center.type === 'adultos'
  }

  return center.type === filter
}

export function EducationSection() {
  const [filter, setFilter] = useState<EducationFilterValue>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 200)
    return () => window.clearTimeout(timer)
  }, [])

  const filtered = educationCenters.filter((center) => matchesFilter(center, filter))

  const initialAndPrimary = filtered.filter(
    (item) => item.type === 'inicial' || item.type === 'primario',
  )

  const secondaryAndTechnical = filtered.filter(
    (item) => item.type === 'secundario' || item.type === 'tecnico',
  )

  const technicalFeatured = secondaryAndTechnical.find((item) => item.id === 'eest-1')
  const secondaryRegular = secondaryAndTechnical.filter((item) => item.id !== 'eest-1')

  const inclusiveAndComplementary = filtered.filter(
    (item) => item.category === 'inclusivo' || item.category === 'complementario',
  )

  if (loading) return <LoadingState text="Cargando oferta educativa..." />

  if (filtered.length === 0) {
    return <EmptyState message="No hay instituciones para el filtro seleccionado." />
  }

  return (
    <section className="section-modern bg-slate-50">
      <div className="container-modern space-y-10">
        <header className="text-center space-y-4">
          <span className="badge-modern bg-blue-100 text-blue-700">Educación en Roque Pérez</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
            Oferta educativa local
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Conocé instituciones de nivel inicial, primario, secundario, técnico, inclusivo y
            complementario.
          </p>
        </header>

        <EducationFilter value={filter} onChange={setFilter} />

        {initialAndPrimary.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Educación Inicial y Primaria</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {initialAndPrimary.map((center) => (
                <EducationCard
                  key={center.id}
                  name={center.name}
                  type={center.type}
                  address={center.address}
                  isRural={center.isRural}
                />
              ))}
            </div>
          </div>
        ) : null}

        {secondaryAndTechnical.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Educación Secundaria y Técnica</h2>

            {technicalFeatured ? (
              <Card className="border-muni-200 shadow-soft-md">
                <CardHeader>
                  <CardTitle className="text-xl">Institución técnica destacada</CardTitle>
                  <CardDescription>Formación técnica orientada a la inserción laboral local.</CardDescription>
                </CardHeader>
                <CardContent>
                  <EducationCard
                    name={technicalFeatured.name}
                    type={technicalFeatured.type}
                    address={technicalFeatured.address}
                    isRural={technicalFeatured.isRural}
                  />
                </CardContent>
              </Card>
            ) : null}

            {secondaryRegular.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {secondaryRegular.map((center) => (
                  <EducationCard
                    key={center.id}
                    name={center.name}
                    type={center.type}
                    address={center.address}
                    isRural={center.isRural}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {inclusiveAndComplementary.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Educación Inclusiva y Complementaria</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {inclusiveAndComplementary.map((center) => (
                <EducationCard
                  key={center.id}
                  name={center.name}
                  type={center.type}
                  address={center.address}
                  isRural={center.isRural}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="pt-2">
          <Button asChild>
            <Link to="/">Volver al Inicio</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
