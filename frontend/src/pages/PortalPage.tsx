import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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

  // login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // register
  const [rFirstName, setRFirstName] = useState('')
  const [rLastName, setRLastName] = useState('')
  const [rDni, setRDni] = useState('')
  const [rBirthDate, setRBirthDate] = useState('')
  const [rEmail, setREmail] = useState('')
  const [rPassword, setRPassword] = useState('')

  // backend hoy exige estos campos
  const [rCountry, setRCountry] = useState('AR')
  const [rProvince, setRProvince] = useState('Buenos Aires')
  const [rCity, setRCity] = useState('Roque Pérez')

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setTab(tabFromUrl)
  }, [tabFromUrl])

  const onTabChange = (v: string) => {
    const next = (v === 'register' ? 'register' : 'login') as 'login' | 'register'
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
      const me = await apiFetch<any>('/auth/me')
      const finalRoute = routeByRole(me?.role)
      if (finalRoute !== fastRoute) {
        navigate(finalRoute, { replace: true })
      }
    } catch {
      navigate('/portal?tab=login', { replace: true })
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)

    try {
      await login(email, password)
      await postAuthRedirect()
    } catch (err: any) {
      setError(err?.message ?? 'No se pudo iniciar sesión')
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
    } catch (err: any) {
      setError(err?.message ?? 'No se pudo registrar el usuario')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-soft-xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Portal Municipal</h1>
          <p className="text-slate-500 text-sm">Acceso seguro por usuario y contraseña</p>
        </div>

        <Tabs value={tab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-slate-100 rounded-xl">
            <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Ingresar
            </TabsTrigger>
            <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Registrarse
            </TabsTrigger>
          </TabsList>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <TabsContent value="login">
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-muni-500 hover:bg-muni-600 rounded-xl py-5"
                disabled={busy}
              >
                {busy ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    placeholder="Juan"
                    className="rounded-xl"
                    value={rFirstName}
                    onChange={(e) => setRFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    placeholder="Pérez"
                    className="rounded-xl"
                    value={rLastName}
                    onChange={(e) => setRLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dni">DNI</Label>
                <Input
                  id="dni"
                  placeholder="12345678"
                  className="rounded-xl"
                  value={rDni}
                  onChange={(e) => setRDni(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  className="rounded-xl"
                  value={rBirthDate}
                  onChange={(e) => setRBirthDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rEmail">Correo electrónico</Label>
                <Input
                  id="rEmail"
                  type="email"
                  placeholder="tu@email.com"
                  className="rounded-xl"
                  value={rEmail}
                  onChange={(e) => setREmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rPassword">Contraseña</Label>
                <Input
                  id="rPassword"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-xl"
                  value={rPassword}
                  onChange={(e) => setRPassword(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Input
                    id="country"
                    className="rounded-xl"
                    value={rCountry}
                    onChange={(e) => setRCountry(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="province">Provincia</Label>
                  <Input
                    id="province"
                    className="rounded-xl"
                    value={rProvince}
                    onChange={(e) => setRProvince(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Localidad</Label>
                  <Input
                    id="city"
                    className="rounded-xl"
                    value={rCity}
                    onChange={(e) => setRCity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-xl py-5"
                disabled={busy}
              >
                {busy ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}