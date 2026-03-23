import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, GraduationCap, MapPin, TreePine } from 'lucide-react'
import { Link } from 'react-router-dom'

type EducationCardType =
  | 'inicial'
  | 'primario'
  | 'secundario'
  | 'tecnico'
  | 'especial'
  | 'adultos'
  | 'complementario'

type EducationCardProps = {
  name: string
  type: EducationCardType
  address?: string
  isRural?: boolean
  viewMoreTo?: string
}

const typeLabel: Record<EducationCardType, string> = {
  inicial: 'Inicial',
  primario: 'Primario',
  secundario: 'Secundario',
  tecnico: 'Técnico',
  especial: 'Especial',
  adultos: 'Adultos',
  complementario: 'Complementario',
}

function openMaps(address: string) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  window.open(mapsUrl, '_blank', 'noopener,noreferrer')
}

export function EducationCard({
  name,
  type,
  address,
  isRural = false,
  viewMoreTo = '/educacion',
}: EducationCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="outline">{typeLabel[type]}</Badge>
          {isRural ? (
            <TreePine className="h-5 w-5 text-emerald-600" />
          ) : (
            <Building2 className="h-5 w-5 text-muni-600" />
          )}
        </div>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          <span>{isRural ? 'Institución rural' : 'Institución urbana'}</span>
        </CardDescription>
        {address ? (
          <CardDescription className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 mt-0.5" />
            <span>{address}</span>
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2">
        {address ? (
          <Button type="button" variant="outline" onClick={() => openMaps(address)}>
            Cómo llegar
          </Button>
        ) : null}
        <Button asChild>
          <Link to={viewMoreTo}>Ver más</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
