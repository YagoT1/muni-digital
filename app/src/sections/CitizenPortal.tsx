import { User, FileCheck, CreditCard, Bell, Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
  return (
    <section id="portal" className="section-modern bg-gradient-to-br from-muni-700 to-muni-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-muni-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container-modern relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Info */}
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

            {/* Features */}
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

            {/* Steps */}
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

          {/* Right Column - Login/Register Form */}
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
                    Ingresá con tu cuenta para acceder a los servicios
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-slate-700">Correo electrónico</Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      placeholder="tu@email.com" 
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-slate-700">Contraseña</Label>
                    <Input 
                      id="login-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600">
                      <input type="checkbox" className="rounded border-slate-300" />
                      <span>Recordarme</span>
                    </label>
                    <a href="#" className="text-muni-600 hover:text-muni-700 font-medium">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Button className="w-full bg-muni-500 hover:bg-muni-600 rounded-xl py-5">
                    Ingresar
                  </Button>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 text-slate-400">
                      O ingresá con
                    </span>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2 rounded-xl py-5 border-slate-200">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#4285F4"/>
                  </svg>
                  Mi Argentina
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 bg-emerald-50 rounded-2xl mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Crear cuenta</h3>
                  <p className="text-slate-500 text-sm">
                    Completá tus datos para registrarte
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name" className="text-slate-700">Nombre</Label>
                      <Input id="register-name" placeholder="Juan" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-lastname" className="text-slate-700">Apellido</Label>
                      <Input id="register-lastname" placeholder="Pérez" className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-dni" className="text-slate-700">DNI</Label>
                    <Input id="register-dni" placeholder="12345678" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-slate-700">Correo electrónico</Label>
                    <Input id="register-email" type="email" placeholder="tu@email.com" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-slate-700">Contraseña</Label>
                    <Input id="register-password" type="password" placeholder="••••••••" className="rounded-xl" />
                  </div>
                  <label className="flex items-start gap-2 text-sm">
                    <input type="checkbox" className="rounded border-slate-300 mt-0.5" />
                    <span className="text-slate-500">
                      Acepto los{' '}
                      <a href="#" className="text-muni-600 hover:underline">términos y condiciones</a>
                      {' '}y la{' '}
                      <a href="#" className="text-muni-600 hover:underline">política de privacidad</a>
                    </span>
                  </label>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-xl py-5">
                    Crear cuenta
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
