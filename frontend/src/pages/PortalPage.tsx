import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { login, register, getRoleFromToken, getToken } from '../services/authService'
import { apiFetch } from '../services/api'

function routeByRole(role?: string | null) {
  switch (role) {
    case 'admin':
      return '/admin'
    case 'ciudadano':
      return '/ciudadano'
    case 'operador':
      return '/operador'
    case 'empleado':
      return '/empleado'
    case 'moderador':
      return '/moderador'
    default:
      return '/'
  }
}

export default function PortalPage() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const tabFromUrl = (params.get('tab') ?? 'login') as 'login' | 'register'

  const [tab, setTab] = useState<'login' | 'register'>(tabFromUrl)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [rFirstName, setRFirstName] = useState('')
  const [rLastName, setRLastName] = useState('')
  const [rDni, setRDni] = useState('')
  const [rBirthDate, setRBirthDate] = useState('')
  const [rEmail, setREmail] = useState('')
  const [rPassword, setRPassword] = useState('')
  const [rCountry, setRCountry] = useState('AR')
  const [rProvince, setRProvince] = useState('Buenos Aires')
  const [rCity, setRCity] = useState('Roque Pérez')

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setTab(tabFromUrl)
  }, [tabFromUrl])

  const subtitle = useMemo(
    () =>
      tab === 'login'
        ? 'Accedé a tus trámites y servicios municipales.'
        : 'Creá tu cuenta para operar en el Portal Municipal.',
    [tab],
  )

  const onTabChange = (value: string) => {
    const next = (value === 'register' ? 'register' : 'login') as
      | 'login'
      | 'register'
    setTab(next)
    setParams({ tab: next })
    setError(null)
  }

  const postAuthRedirect = async () => {
    const token = getToken()
    const role = getRoleFromToken(token)
    const fastRoute = routeByRole(role)
    navigate(fastRoute, { replace: true })

    try {
      const me = await apiFetch<{ role?: string }>('/auth/me')
      const finalRoute = routeByRole(me?.role)
      if (finalRoute !== fastRoute) navigate(finalRoute, { replace: true })
    } catch {
      navigate('/portal?tab=login', { replace: true })
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)

    try {
      await login(email.trim(), password)
      await postAuthRedirect()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión')
    } finally {
      setBusy(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)

    try {
      await register({
        firstName: rFirstName.trim(),
        lastName: rLastName.trim(),
        dni: rDni.trim(),
        birthDate: rBirthDate.trim(),
        email: rEmail.trim(),
        password: rPassword,
        country: rCountry.trim(),
        province: rProvince.trim(),
        city: rCity.trim(),
      })
      await postAuthRedirect()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'No se pudo registrar el usuario')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-muni-900 via-muni-800 to-muni-600" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.18),transparent_42%)]" />

      <div className="absolute inset-0 opacity-30">
        <div className="mx-auto mt-28 grid max-w-5xl grid-cols-2 gap-5 px-8 blur-[1px]">
          {['Pagar Deudas', 'Turnos Online', 'Reclamos', 'Trámites'].map((item) => (
            <div key={item} className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white/70">
              <p className="text-xl font-semibold">{item}</p>
              <p className="mt-2 text-sm text-white/55">Acceso rápido al servicio municipal.</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]" />

      <main className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-[450px] rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-center text-4xl font-semibold tracking-tight text-slate-900 sm:text-[2.1rem]">
                Portal del Ciudadano
              </h1>
              <p className="mt-2 text-center text-sm text-slate-500">{subtitle}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="-mr-2 -mt-2 h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100"
              onClick={() => navigate('/', { replace: true })}
              aria-label="Cerrar portal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Tabs value={tab} onValueChange={onTabChange} className="w-full">
            <TabsList className="mb-5 grid h-11 w-full grid-cols-2 rounded-xl border border-slate-200 bg-slate-100 p-1">
              <TabsTrigger
                value="login"
                className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow"
              >
                Ingresar
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow"
              >
                Registrarse
              </TabsTrigger>
            </TabsList>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <TabsContent value="login" className="mt-0">
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[1rem] text-slate-700">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="h-11 rounded-xl border-slate-300 bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-[1rem] text-slate-700">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-11 rounded-xl border-slate-300 bg-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-blue-700 text-base font-semibold hover:bg-blue-800"
                  disabled={busy}
                >
                  {busy ? 'Ingresando...' : 'Ingresar'}
                </Button>

                <div className="text-center text-[0.95rem]">
                  <button type="button" className="text-blue-700 hover:text-blue-800 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <div className="pt-2">
                  <div className="mb-2 border-t border-slate-200" />
                  <p className="mb-3 text-center text-[0.95rem] text-slate-500">¿No tenés cuenta?</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onTabChange('register')}
                    className="h-11 w-full rounded-xl border-slate-300 text-base font-medium"
                  >
                    Registrarse
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-0">
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-slate-700">Nombre</Label>
                    <Input id="firstName" className="h-10 rounded-xl" value={rFirstName} onChange={(e) => setRFirstName(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-slate-700">Apellido</Label>
                    <Input id="lastName" className="h-10 rounded-xl" value={rLastName} onChange={(e) => setRLastName(e.target.value)} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="dni" className="text-slate-700">DNI</Label>
                    <Input id="dni" className="h-10 rounded-xl" value={rDni} onChange={(e) => setRDni(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="birthDate" className="text-slate-700">Nacimiento</Label>
                    <Input id="birthDate" type="date" className="h-10 rounded-xl" value={rBirthDate} onChange={(e) => setRBirthDate(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rEmail" className="text-slate-700">Correo electrónico</Label>
                  <Input id="rEmail" type="email" className="h-10 rounded-xl" value={rEmail} onChange={(e) => setREmail(e.target.value)} required />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rPassword" className="text-slate-700">Contraseña</Label>
                  <Input id="rPassword" type="password" className="h-10 rounded-xl" value={rPassword} onChange={(e) => setRPassword(e.target.value)} required />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Input aria-label="País" className="h-10 rounded-xl" value={rCountry} onChange={(e) => setRCountry(e.target.value)} required />
                  <Input aria-label="Provincia" className="h-10 rounded-xl" value={rProvince} onChange={(e) => setRProvince(e.target.value)} required />
                  <Input aria-label="Ciudad" className="h-10 rounded-xl" value={rCity} onChange={(e) => setRCity(e.target.value)} required />
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-blue-700 text-base font-semibold hover:bg-blue-800"
                  disabled={busy}
                >
                  {busy ? 'Registrando...' : 'Crear cuenta'}
                </Button>

                <p className="text-center text-sm text-slate-500">
                  ¿Ya tenés cuenta?{' '}
                  <button type="button" onClick={() => onTabChange('login')} className="font-medium text-blue-700 hover:underline">
                    Ingresar
                  </button>
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-4 text-center text-xs text-slate-400">
            Al continuar aceptás los <Link to="/" className="underline">términos de uso</Link> del portal.
          </p>
        </div>
      </main>
    </div>
  )
}
