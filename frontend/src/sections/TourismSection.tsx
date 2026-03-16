import { MapPin, Camera, Utensils, Bed, ArrowRight, Compass } from 'lucide-react'

const tourismCategories = [
  { icon: Camera, title: 'Qué visitar', description: 'Atractivos turísticos, lugares históricos y puntos de interés.', href: '/turismo', color: 'bg-violet-50 text-violet-600' },
  { icon: Bed, title: 'Dónde alojarse', description: 'Hoteles, hosterías y opciones de alojamiento en la zona.', href: '/turismo', color: 'bg-blue-50 text-blue-600' },
  { icon: Utensils, title: 'Gastronomía', description: 'Restaurantes, bodegones y especialidades locales.', href: '/turismo', color: 'bg-orange-50 text-orange-600' },
  { icon: Compass, title: 'Circuitos', description: 'Rutas turísticas y excursiones recomendadas.', href: '/turismo', color: 'bg-emerald-50 text-emerald-600' },
]

export function TourismSection() {
  return (
    <section id="turismo" className="section-modern bg-slate-50">
      <div className="container-modern">
        <div className="text-center mb-12">
          <span className="badge-modern bg-emerald-100 text-emerald-700 mb-4">Descubrí Roque Pérez</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">Turismo y cultura local</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {tourismCategories.map((category) => (
            <a key={category.title} href={category.href} className="group text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-soft-md transition-all duration-300">
              <div className={`inline-flex p-4 rounded-2xl ${category.color} mb-4`}><category.icon className="h-7 w-7" /></div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">{category.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{category.description}</p>
              <span className="inline-flex items-center text-sm font-medium text-muni-600">Explorar<ArrowRight className="ml-1.5 h-4 w-4" /></span>
            </a>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600">Conocé atractivos, agenda cultural y cómo llegar en la nueva sección de turismo.</p>
          <div className="flex gap-3">
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium"><MapPin className="h-4 w-4" />Google Maps</a>
            <a href="/turismo" className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white"><Compass className="h-4 w-4" />Planificar viaje</a>
          </div>
        </div>
      </div>
    </section>
  )
}
