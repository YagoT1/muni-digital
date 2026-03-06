import { useState } from 'react'
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const events = [
  {
    id: 1,
    title: 'Carnavales 2026',
    date: '15 de febrero',
    time: '21:00 hs.',
    location: 'Plaza Central',
    category: 'Cultura',
    description: 'Las tradicionales noches de carnaval con comparsas y música en vivo.',
  },
  {
    id: 2,
    title: 'Reunión Vecinal Barrio Centro',
    date: '18 de febrero',
    time: '19:00 hs.',
    location: 'Sede Vecinal',
    category: 'Comunidad',
    description: 'Espacio de diálogo entre vecinos y autoridades municipales.',
  },
  {
    id: 3,
    title: 'Misa Criolla',
    date: '21 de febrero',
    time: '20:00 hs.',
    location: 'Iglesia San Roque',
    category: 'Cultura',
    description: 'Tradicional Misa Criolla con coros locales.',
  },
  {
    id: 4,
    title: 'Vencimiento Tasa Cloacas - Cuota 2',
    date: '10 de febrero',
    time: 'Todo el día',
    location: 'Online',
    category: 'Fiscal',
    description: 'Último día para el pago de la segunda cuota de cloacas sin recargo.',
  },
]

const fiscalDates = [
  { date: '10 Feb', description: 'Cloacas - Cuota 2', type: 'vencimiento' },
  { date: '17 Feb', description: 'Conservación Vial - Cuota 1', type: 'vencimiento' },
  { date: '20 Feb', description: 'Seguridad e Higiene - DDJJ', type: 'tramite' },
  { date: '28 Feb', description: 'Hogar Adultos Mayores - Cuota 1', type: 'vencimiento' },
]

const categoryColors: Record<string, string> = {
  'Cultura': 'bg-violet-100 text-violet-700',
  'Comunidad': 'bg-blue-100 text-blue-700',
  'Fiscal': 'bg-amber-100 text-amber-700',
  'Salud': 'bg-emerald-100 text-emerald-700',
}

export function EventsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <section id="calendario" className="section-modern bg-slate-50">
      <div className="container-modern">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="badge-modern bg-muni-100 text-muni-700 mb-4">
            Agenda Municipal
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Calendario de eventos
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Mantenete informado sobre eventos culturales, reuniones vecinales y fechas de vencimiento.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2 text-slate-900">
                  <CalendarIcon className="h-5 w-5 text-muni-500" />
                  Calendario
                </h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-muni-600">
                      Ver completo
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl border-0"
              />
              
              {/* Fiscal Dates */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="font-semibold text-sm mb-4 flex items-center gap-2 text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Próximos vencimientos
                </h4>
                <div className="space-y-3">
                  {fiscalDates.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <span className="font-semibold text-amber-600 w-14 flex-shrink-0 bg-amber-50 px-2 py-1 rounded-lg text-center">
                        {item.date}
                      </span>
                      <span className="text-slate-600 truncate">{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg text-slate-900">Próximos eventos</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                Suscribirse
              </Button>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl p-5 shadow-soft hover:shadow-soft-md transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Date Badge */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-muni-500 to-muni-600 text-white rounded-xl flex flex-col items-center justify-center">
                      <span className="text-xs font-medium opacity-80">{event.date.split(' ')[1]}</span>
                      <span className="text-2xl font-bold">{event.date.split(' ')[0]}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[event.category]}`}>
                          {event.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-muni-600 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-slate-600 text-sm mb-3">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-shrink-0 text-muni-600 hover:text-muni-700 hover:bg-muni-50"
                    >
                      Ver más
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
