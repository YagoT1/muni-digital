import { 
  Hospital, 
  GraduationCap, 
  HardHat, 
  Recycle, 
  Palette, 
  Building2,
  ArrowRight
} from 'lucide-react'

const services = [
  {
    icon: Hospital,
    title: 'Salud',
    description: 'Centros de salud, vacunación y programas de bienestar para todos los vecinos.',
    href: '/tramites',
    color: 'bg-rose-50 text-rose-600',
    gradient: 'from-rose-500 to-rose-600',
  },
  {
    icon: GraduationCap,
    title: 'Educación',
    description: 'Escuelas municipales, bibliotecas, becas y programas educativos.',
    href: '/tramites',
    color: 'bg-blue-50 text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: HardHat,
    title: 'Obras',
    description: 'Obras públicas, pavimentación, iluminación y mantenimiento urbano.',
    href: '/tramites',
    color: 'bg-amber-50 text-amber-600',
    gradient: 'from-amber-500 to-amber-600',
  },
  {
    icon: Recycle,
    title: 'Ambiente',
    description: 'Recolección de residuos, reciclaje, espacios verdes y cuidado ambiental.',
    href: '/tramites',
    color: 'bg-emerald-50 text-emerald-600',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Palette,
    title: 'Cultura',
    description: 'Eventos culturales, talleres, bibliotecas y patrimonio histórico.',
    href: '/tramites',
    color: 'bg-violet-50 text-violet-600',
    gradient: 'from-violet-500 to-violet-600',
  },
  {
    icon: Building2,
    title: 'Desarrollo',
    description: 'Habilitaciones comerciales, empleo y fomento productivo local.',
    href: '/tramites',
    color: 'bg-cyan-50 text-cyan-600',
    gradient: 'from-cyan-500 to-cyan-600',
  },
]

export function QuickServices() {
  return (
    <section id="servicios" className="section-modern bg-slate-50">
      <div className="container-modern">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="badge-modern bg-muni-100 text-muni-700 mb-4">
            Servicios Municipales
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Todo lo que necesitás
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Gestiona tus trámites y accede a los servicios municipales de forma rápida y sencilla.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <a
              key={service.title}
              href={service.href}
              className="group relative bg-white rounded-2xl p-6 transition-all duration-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${service.color} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-muni-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-muni-600 group-hover:text-muni-700">
                    Ver más
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/tramites"
            className="inline-flex items-center gap-2 text-muni-600 hover:text-muni-700 font-medium transition-colors"
          >
            Ver todos los servicios
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
