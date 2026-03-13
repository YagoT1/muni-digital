import { CreditCard, Calendar, FileText, MessageSquare, ArrowRight, MapPin } from 'lucide-react'

const quickActions = [
  {
    icon: CreditCard,
    label: 'Pagar Deudas',
    description: 'Consultá y pagá tus tasas',
    href: '/deudas',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Calendar,
    label: 'Turnos Online',
    description: 'Reservá tu turno',
    href: '/turnos',
    color: 'from-muni-500 to-muni-600',
  },
  {
    icon: MessageSquare,
    label: 'Reclamos',
    description: 'Hacé tu reclamo',
    href: '/reclamos',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: FileText,
    label: 'Trámites',
    description: 'Guía y requisitos',
    href: '/tramites',
    color: 'from-violet-500 to-violet-600',
  },
]

const stats = [
  { value: '15+', label: 'Servicios digitales' },
  { value: '24hs', label: 'Atención online' },
  { value: '100%', label: 'Transparente' },
]

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient and subtle pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-muni-900 via-muni-700 to-muni-500" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Subtle blur orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-muni-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-modern py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div className="text-white space-y-8">
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm animate-fade-in">
              <MapPin className="h-4 w-4 text-muni-200" />
              <span className="text-white/90">Provincia de Buenos Aires, Argentina</span>
            </div>
            
            {/* Main heading */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Roque Pérez
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-lg">
                Una comunidad que crece con vos. Servicios digitales faciles, rápidos y seguros.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <a 
                href="#servicios"
                className="btn-primary"
              >
                Explorar servicios
                <ArrowRight className="h-5 w-5" />
              </a>
              <a 
                href="/portal"
                className="btn-secondary"
              >
                Portal Ciudadano
              </a>
            </div>
            
            {/* Stats - Minimalist */}
            <div className="flex flex-wrap gap-8 pt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="stat-card items-start">
                  <span className="text-3xl md:text-4xl font-bold text-white">{stat.value}</span>
                  <span className="text-sm text-white/60 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {quickActions.map((action, index) => (
              <a
                key={action.label}
                href={action.href}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] hover:shadow-soft-xl"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${action.color}`} />
                
                <div className="flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{action.label}</h3>
                  <p className="text-sm text-white/60">{action.description}</p>
                  
                  <ArrowRight 
                    className="h-5 w-5 mt-auto pt-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" 
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  )
}
