import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HealthCard, type HealthCardType } from './HealthCard'
import { HealthFilter, type HealthFilterValue } from './HealthFilter'

type HealthCenter = {
  name: string
  type: 'hospital' | 'caps' | 'cic' | 'sala' | 'program'
  address?: string
  phone?: string
}

const hospital: HealthCenter = {
  name: 'Hospital Municipal Dr. Ramón Carrillo',
  type: 'hospital',
  address: 'Rawson y Presidente Perón',
  phone: '(02227) 49-1054',
}

const centers: HealthCenter[] = [
  { name: 'CAPS Barrio Federal', type: 'caps', address: 'Paulino Lanz 447' },
  { name: 'CIC Evita', type: 'cic', address: 'Dardo Rocha entre Sarmiento y Rivadavia' },
  { name: 'CAPS Dr. Bozzano', type: 'caps', address: 'Carlos Beguerie' },
  { name: 'Sala Dr. Jorge Ceballos', type: 'sala', address: 'Zona rural' },
  { name: 'CAPS Floreal Ferrara', type: 'caps' },
]

const programs: HealthCenter[] = [
  { name: 'Vacunación', type: 'program' },
  { name: 'Salud materno infantil', type: 'program' },
  { name: 'Prevención (diabetes, hipertensión, cáncer)', type: 'program' },
  { name: 'Salud mental', type: 'program' },
]

function matchesFilter(value: HealthFilterValue, type: HealthCardType) {
  if (value === 'all') return true
  if (value === 'hospital') return type === 'hospital'
  if (value === 'aps') return type === 'caps' || type === 'cic' || type === 'sala'
  return type === 'program'
}

export function HealthSection() {
  const [filter, setFilter] = useState<HealthFilterValue>('all')

  const showHospital = matchesFilter(filter, 'hospital')
  const visibleCenters = centers.filter((center) => matchesFilter(filter, center.type))
  const visiblePrograms = programs.filter((program) => matchesFilter(filter, program.type))

  return (
    <section className="section-modern bg-slate-50">
      <div className="container-modern space-y-10">
        <header className="space-y-4 text-center">
          <span className="badge-modern bg-rose-100 text-rose-700">Salud en Roque Pérez</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
            Red pública de salud municipal
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Encontrá información del hospital, centros de atención primaria y programas de prevención.
          </p>
        </header>

        <HealthFilter value={filter} onChange={setFilter} />

        {showHospital ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Hospital · Emergencias</h2>
            <Card className="border-muni-200 shadow-soft-md">
              <CardHeader>
                <CardTitle className="text-2xl">{hospital.name}</CardTitle>
                <CardDescription className="text-base">Referencia principal para guardia y emergencias.</CardDescription>
              </CardHeader>
              <CardContent>
                <HealthCard
                  name={hospital.name}
                  type={hospital.type}
                  address={hospital.address}
                  phone={hospital.phone}
                  viewMoreTo="/salud"
                />
              </CardContent>
            </Card>
          </div>
        ) : null}

        {visibleCenters.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Atención Primaria (CAPS / CIC / Sala)</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleCenters.map((center) => (
                <HealthCard
                  key={center.name}
                  name={center.name}
                  type={center.type}
                  address={center.address}
                  phone={center.phone}
                  viewMoreTo="/salud"
                />
              ))}
            </div>
          </div>
        ) : null}

        {visiblePrograms.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Programas de prevención</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visiblePrograms.map((program) => (
                <HealthCard
                  key={program.name}
                  name={program.name}
                  type={program.type}
                  viewMoreTo="/salud"
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="pt-4">
          <Button asChild>
            <Link to="/">Volver al Inicio</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
