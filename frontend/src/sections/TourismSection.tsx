import { MapPin, Camera, Utensils, Bed, ArrowRight, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

const tourismCategories = [
  {
    icon: Camera,
    title: 'Qué visitar',
    description: 'Atractivos turísticos, lugares históricos y puntos de interés.',
    href: '#atractivos',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Bed,
    title: 'Dónde alojarse',
    description: 'Hoteles, hosterías y opciones de alojamiento en la zona.',
    href: '#alojamiento',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Utensils,
    title: 'Gastronomía',
    description: 'Restaurantes, bodegones y especialidades locales.',
    href: '#gastronomia',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Compass,
    title: 'Circuitos',
    description: 'Rutas turísticas y excursiones recomendadas.',
    href: '#circuitos',
    color: 'bg-emerald-50 text-emerald-600',
  },
]

const attractions = [
  {
    name: 'Plaza San Martín',
    type: 'Patrimonio Histórico',
    description: 'La plaza principal de la ciudad, rodeada de edificios históricos.',
  },
  {
    name: 'Museo Histórico Municipal',
    type: 'Cultura',
    description: 'Colección de objetos y documentos de la historia local.',
  },
  {
    name: 'Reserva Natural',
    type: 'Naturaleza',
    description: 'Espacio protegido con fauna y flora autóctona.',
  },
]

export function TourismSection() {
  return (
    <section id="turismo" className="section-modern bg-slate-50">
      <div className="container-modern">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="badge-modern bg-emerald-100 text-emerald-700 mb-4">
            Descubrí Roque Pérez
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Turismo y cultura local
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Conocé los atractivos turísticos de nuestra ciudad. Historia, naturaleza 
            y gastronomía te esperan.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {tourismCategories.map((category) => (
            <a
              key={category.title}
              href={category.href}
              className="group text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-soft-md transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-2xl ${category.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <category.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">{category.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{category.description}</p>
              <span className="inline-flex items-center text-sm font-medium text-muni-600 group-hover:text-muni-700">
                Explorar
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>

        {/* Map and Attractions */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden h-[400px] relative shadow-soft">
              {/* Map Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-muni-50 to-emerald-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-soft flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-10 w-10 text-muni-500" />
                  </div>
                  <p className="text-xl font-semibold text-slate-900 mb-2">Mapa Interactivo</p>
                  <p className="text-slate-500 mb-4">Explorá los puntos de interés de la ciudad</p>
                  <Button className="bg-muni-500 hover:bg-muni-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    Abrir mapa completo
                  </Button>
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <Button variant="secondary" size="icon" className="h-10 w-10 rounded-xl shadow-soft">
                  <span className="text-lg font-bold">+</span>
                </Button>
                <Button variant="secondary" size="icon" className="h-10 w-10 rounded-xl shadow-soft">
                  <span className="text-lg font-bold">−</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Attractions List */}
          <div>
            <h3 className="font-semibold text-lg text-slate-900 mb-4">Lugares destacados</h3>
            <div className="space-y-4">
              {attractions.map((attraction) => (
                <div
                  key={attraction.name}
                  className="p-5 bg-white rounded-2xl shadow-soft hover:shadow-soft-md transition-all duration-300 cursor-pointer"
                >
                  <span className="inline-block px-2.5 py-1 bg-muni-50 text-muni-600 text-xs font-medium rounded-full mb-2">
                    {attraction.type}
                  </span>
                  <h4 className="font-semibold text-slate-900 mb-1">{attraction.name}</h4>
                  <p className="text-sm text-slate-500">{attraction.description}</p>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4 gap-2 rounded-xl">
              Ver todos los atractivos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* How to Get Here */}
        <div className="mt-12 bg-gradient-to-r from-emerald-500/10 to-muni-500/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">¿Cómo llegar?</h3>
              <p className="text-slate-600 max-w-xl">
                Roque Pérez se encuentra a 180 km de la Ciudad de Buenos Aires, 
                accesible por la Ruta Nacional 205.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 rounded-xl">
                <MapPin className="h-4 w-4" />
                Google Maps
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600 gap-2 rounded-xl">
                <Compass className="h-4 w-4" />
                Planificar viaje
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
