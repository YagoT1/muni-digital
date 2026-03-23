import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { Building2, Cross, HeartPulse, MapPin, Phone } from 'lucide-react'

export type HealthCardType = 'hospital' | 'caps' | 'cic' | 'sala' | 'program'

type HealthCardProps = {
  name: string
  type: HealthCardType
  address?: string
  phone?: string
  viewMoreTo?: string
}

const typeLabel: Record<HealthCardType, string> = {
  hospital: 'Hospital',
  caps: 'CAPS',
  cic: 'CIC',
  sala: 'Sala',
  program: 'Programa',
}

const typeIcon: Record<HealthCardType, typeof Cross> = {
  hospital: Cross,
  caps: HeartPulse,
  cic: Building2,
  sala: HeartPulse,
  program: HeartPulse,
}

function buildMapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, '')
}

export function HealthCard({ name, type, address, phone, viewMoreTo = '/salud' }: HealthCardProps) {
  const Icon = typeIcon[type]

  return (
    <Card className="h-full">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="outline">{typeLabel[type]}</Badge>
          <Icon className="h-5 w-5 text-muni-600" />
        </div>
        <CardTitle>{name}</CardTitle>

        {address ? (
          <CardDescription className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 mt-0.5" />
            <span>{address}</span>
          </CardDescription>
        ) : null}

        {phone ? (
          <CardDescription className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" />
            <span>{phone}</span>
          </CardDescription>
        ) : null}
      </CardHeader>

      <CardFooter className="flex flex-wrap gap-2">
        {address ? (
          <Button variant="outline" asChild>
            <a href={buildMapsLink(address)} target="_blank" rel="noopener noreferrer">
              Cómo llegar
            </a>
          </Button>
        ) : null}

        {phone ? (
          <Button variant="outline" asChild>
            <a href={`tel:${normalizePhone(phone)}`}>Llamar</a>
          </Button>
        ) : null}

        <Button asChild>
          <Link to={viewMoreTo}>Ver más</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
