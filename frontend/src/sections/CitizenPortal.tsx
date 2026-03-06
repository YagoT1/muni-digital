import { User, FileCheck, CreditCard, Bell, Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'

const portalFeatures = [
  {
    icon: FileCheck,
    title: 'Seguimiento de trámites',
    description: 'Consultá el estado de tus trámites en tiempo real.',
  },
  {
    icon: CreditCard,
    title: 'Pagos y deudas',
    description: 'Pagá tus tasas y consultá tu estado de cuenta.',
  },
  {
    icon: Bell,
    title: 'Notificaciones',
    description: 'Recibí alertas por email o WhatsApp.',
  },
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'Tus datos protegidos con encriptación.',
  },
]

const steps = [
  'Registrate con tu DNI y email',
  'Verificá tu cuenta',
  'Accedé a todos los servicios',
]

export function CitizenPortal() {
  const navigate = useNavigate()

  return (
    <section id="portal" className="section-modern bg-gradient-to-br from-muni-700 to-muni-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-muni-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-modern relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="text-white">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Portal del Ciudadano
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Accedé a todos los servicios en un solo lugar
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Registrate en el Portal del Ciudadano y gestioná tus trámites,
              pagos y turnos de forma rápida y segura.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {portalFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-xl flex-shrink-0">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="text-sm text-white/60">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="font-semibold mb-4">¿Cómo empezar?</h3>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm text-white/80">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-3xl p-8 shadow-soft-xl">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-slate-100 rounded-xl">
                <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Ingresar
                </TabsTrigger>
                <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Registrarse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-5">
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 bg-muni-50 rounded-2xl mb-4">
                    <User className="h-8 w-8 text-muni-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Bienvenido</h3>
                  <p className="text-slate-500 text-sm">
                    Accedé al portal para continuar
                  </p>
                </div>

                <Button
                  className="w-full bg-muni-500 hover:bg-muni-600 rounded-xl py-5"
                  onClick={() => navigate('/portal?tab=login')}
                >
                  Ingresar
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 bg-emerald-50 rounded-2xl mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Crear cuenta</h3>
                  <p className="text-slate-500 text-sm">
                    Registrate para acceder al portal
                  </p>
                </div>

                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-xl py-5"
                  onClick={() => navigate('/portal?tab=register')}
                >
                  Registrarse
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}