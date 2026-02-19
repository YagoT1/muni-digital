import { 
  TrendingUp, 
  FileText, 
  Building, 
  Users, 
  ArrowRight, 
  Download,
  ExternalLink,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const transparencyData = [
  {
    icon: TrendingUp,
    title: 'Presupuesto 2026',
    value: '45%',
    description: 'Ejecutado del presupuesto anual',
    progress: 45,
    detail: '$1.250M / $2.800M',
    link: '#presupuesto',
  },
  {
    icon: Building,
    title: 'Obras en Ejecución',
    value: '12',
    description: 'Proyectos activos actualmente',
    progress: 68,
    detail: '8 en ejecución, 4 en licitación',
    link: '#obras',
  },
  {
    icon: Users,
    title: 'Personal Municipal',
    value: '487',
    description: 'Empleados en planta',
    progress: 100,
    detail: 'Ver organigrama completo',
    link: '#personal',
  },
  {
    icon: FileText,
    title: 'Normativas',
    value: '234',
    description: 'Ordenanzas y resoluciones',
    progress: 100,
    detail: 'Acceso al digesto completo',
    link: '#normativas',
  },
]

const openDataLinks = [
  { label: 'Presupuesto y Ejecución', href: '#datos-presupuesto' },
  { label: 'Contrataciones', href: '#datos-contrataciones' },
  { label: 'Obras Públicas', href: '#datos-obras' },
  { label: 'Personal y Salarios', href: '#datos-personal' },
  { label: 'Estadísticas', href: '#datos-estadisticas' },
  { label: 'API de Datos', href: '#api' },
]

export function TransparencySection() {
  return (
    <section id="transparencia" className="section-modern bg-white">
      <div className="container-modern">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="badge-modern bg-emerald-100 text-emerald-700 mb-4">
            Gobierno Abierto
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Transparencia y datos abiertos
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Accedé a la información pública municipal. Consultá el estado del presupuesto, 
            obras en ejecución y todas las normativas vigentes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {transparencyData.map((item) => (
            <a
              key={item.title}
              href={item.link}
              className="group bg-slate-50 rounded-2xl p-6 hover:bg-slate-100 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white rounded-xl shadow-soft">
                  <item.icon className="h-6 w-6 text-muni-500" />
                </div>
                <span className="text-3xl font-bold text-slate-900">{item.value}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500 mb-3">{item.description}</p>
              <Progress value={item.progress} className="h-1.5 mb-2" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{item.detail}</span>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-muni-500 group-hover:translate-x-1 transition-all" />
              </div>
            </a>
          ))}
        </div>

        {/* Open Data Section */}
        <div className="bg-gradient-to-br from-muni-600 to-muni-800 rounded-3xl p-8 md:p-10 text-white overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Portal de Datos Abiertos</h3>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Accedé a los datos municipales en formatos abiertos. Descargá información 
                sobre presupuesto, obras, contrataciones y más en CSV, JSON o Excel.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-white text-muni-700 hover:bg-white/90 gap-2">
                  <Download className="h-4 w-4" />
                  Descargar datos
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Ver API
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {openDataLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 p-3 bg-white/10 rounded-xl hover:bg-white/15 transition-colors text-sm backdrop-blur-sm"
                >
                  <Download className="h-4 w-4 flex-shrink-0 opacity-70" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Documents CTA */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { icon: FileText, title: 'Ordenanzas', desc: 'Digesto completo', color: 'bg-orange-50 text-orange-600' },
            { icon: FileText, title: 'Resoluciones', desc: 'Actas y decretos', color: 'bg-blue-50 text-blue-600' },
            { icon: FileText, title: 'Licitaciones', desc: 'Procesos activos', color: 'bg-emerald-50 text-emerald-600' },
          ].map((doc) => (
            <a
              key={doc.title}
              href={`#${doc.title.toLowerCase()}`}
              className="group flex items-center gap-4 p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all duration-300"
            >
              <div className={`p-3 rounded-xl ${doc.color}`}>
                <doc.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">{doc.title}</h4>
                <p className="text-sm text-slate-500">{doc.desc}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-muni-500 group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
