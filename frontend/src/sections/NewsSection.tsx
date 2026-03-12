import { Calendar, ArrowRight, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const news = [
  {
    id: 1,
    title: 'Comenzó la obra del nuevo SUM de la Comunidad',
    excerpt: 'Se iniciaron los trabajos de construcción del nuevo Salón de Usos Múltiples que beneficiará a más de 500 familias del barrio.',
    date: '13 de febrero, 2026',
    category: 'Obras',
    author: 'Prensa Municipal',
    featured: true,
  },
  {
    id: 2,
    title: 'Continúan las mejoras edilicias en escuelas primarias',
    excerpt: 'Se realizan trabajos de mantenimiento y refacción en establecimientos educativos de la zona urbana.',
    date: '10 de febrero, 2026',
    category: 'Educación',
    author: 'Secretaría de Educación',
    featured: false,
  },
  {
    id: 3,
    title: 'Más obras de infraestructura para educación',
    excerpt: 'Nuevas aulas y espacios recreativos para los alumnos de las escuelas municipales.',
    date: '5 de febrero, 2026',
    category: 'Educación',
    author: 'Prensa Municipal',
    featured: false,
  },
  {
    id: 4,
    title: 'Exitosas noches de carnaval en Carlos Beguerie',
    excerpt: 'Miles de vecinos disfrutaron de las tradicionales noches de carnaval en nuestra localidad.',
    date: '8 de febrero, 2026',
    category: 'Cultura',
    author: 'Secretaría de Cultura',
    featured: false,
  },
]

const categoryColors: Record<string, string> = {
  'Obras': 'bg-amber-100 text-amber-700',
  'Educación': 'bg-blue-100 text-blue-700',
  'Cultura': 'bg-violet-100 text-violet-700',
  'Salud': 'bg-emerald-100 text-emerald-700',
  'Turismo': 'bg-cyan-100 text-cyan-700',
}

export function NewsSection() {
  const featuredNews = news.find(n => n.featured)
  const otherNews = news.filter(n => !n.featured)

  return (
    <section id="noticias" className="section-modern bg-white">
      <div className="container-modern">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="badge-modern bg-slate-100 text-slate-700 mb-4">
              Novedades
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
              Últimas noticias
            </h2>
          </div>
          <a
            href="/noticias"
            className="inline-flex items-center gap-2 text-muni-600 hover:text-muni-700 font-medium transition-colors"
          >
            Ver todas
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured News */}
          {featuredNews && (
            <a
              href={`/noticias/${featuredNews.id}`}
              className="group relative overflow-hidden rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className="aspect-[16/10] bg-gradient-to-br from-muni-100 to-muni-50 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/50 flex items-center justify-center">
                    <svg className="w-10 h-10 text-muni-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-muni-500 text-white font-semibold border-0">
                    Destacada
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[featuredNews.category]}`}>
                    {featuredNews.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {featuredNews.date}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-muni-600 transition-colors line-clamp-2">
                  {featuredNews.title}
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-2">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <User className="h-4 w-4" />
                  <span>{featuredNews.author}</span>
                </div>
              </div>
            </a>
          )}

          {/* Other News List */}
          <div className="space-y-4">
            {otherNews.map((item) => (
              <a
                key={item.id}
                href={`/noticias/${item.id}`}
                className="group flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[item.category]}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-muni-600 transition-colors line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 line-clamp-1">
                    {item.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight 
                  className="h-5 w-5 text-slate-300 group-hover:text-muni-500 group-hover:translate-x-1 transition-all flex-shrink-0 self-center" 
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
