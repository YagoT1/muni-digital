import { useState, useEffect } from 'react'
import { Search, Menu, X, User, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  {
    label: 'Pagos',
    href: '#pagos',
    children: [
      { label: 'Consulta de Deuda', href: '#consulta-deuda' },
      { label: 'Pago Online', href: '#pago-online' },
      { label: 'Planes de Pago', href: '#planes-pago' },
      { label: 'Factura Electrónica', href: '#factura-electronica' },
    ],
  },
  {
    label: 'Trámites',
    href: '#tramites',
    children: [
      { label: 'Guía de Trámites', href: '#guia-tramites' },
      { label: 'Turnos Online', href: '#turnos' },
      { label: 'Formularios', href: '#formularios' },
      { label: 'Seguimiento', href: '#seguimiento' },
    ],
  },
  {
    label: 'Servicios',
    href: '#servicios',
    children: [
      { label: 'Salud', href: '#salud' },
      { label: 'Educación', href: '#educacion' },
      { label: 'Obras', href: '#obras' },
      { label: 'Ambiente', href: '#ambiente' },
    ],
  },
  { label: 'Turismo', href: '#turismo' },
  { label: 'Transparencia', href: '#transparencia' },
  { label: 'Contacto', href: '#contacto' },
]

const searchSuggestions = [
  'Cómo pagar mis tasas',
  'Solicitar turno',
  'Habilitación comercial',
  'Licencia de conducir',
  'Consulta de deuda',
  'Calendario fiscal',
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredSuggestions = searchSuggestions.filter(s =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-soft'
          : 'bg-white'
      }`}
    >
      {/* Top Bar */}
      <div className="bg-muni-600 text-white">
        <div className="container-modern py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Sun className="h-4 w-4 text-muni-200" />
              <span>31°C</span>
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-white/80">Miércoles, 18 de febrero de 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:2227404205" className="hover:text-white/80 transition-colors hidden sm:inline">
              2227-404205
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                  <User className="h-4 w-4" />
                  <span>Portal Ciudadano</span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-display">Portal del Ciudadano</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" placeholder="••••••••" className="rounded-xl" />
                  </div>
                  <Button className="w-full bg-muni-500 hover:bg-muni-600 rounded-xl">
                    Ingresar
                  </Button>
                  <div className="text-center text-sm">
                    <a href="#" className="text-muni-600 hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <div className="border-t pt-4 text-center">
                    <p className="text-sm text-slate-500 mb-2">¿No tenés cuenta?</p>
                    <Button variant="outline" className="w-full rounded-xl">
                      Registrarse
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-modern py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-muni-500 to-muni-600 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:shadow-soft-md transition-shadow">
              RP
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Municipalidad de</p>
              <p className="text-base font-bold text-slate-900 leading-tight">Roque Pérez</p>
            </div>
          </a>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Buscar trámites, servicios, noticias..."
                className="pl-11 pr-4 py-2.5 w-full rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(e.target.value.length > 0)
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {showSuggestions && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-soft-lg border border-slate-100 z-50 overflow-hidden">
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm transition-colors"
                        onClick={() => {
                          setSearchQuery(suggestion)
                          setShowSuggestions(false)
                        }}
                      >
                        {suggestion}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-slate-400">
                      No se encontraron resultados
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-600" />
            ) : (
              <Menu className="h-6 w-6 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden md:block border-t border-slate-100">
        <div className="container-modern">
          <NavigationMenu className="max-w-none py-1">
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg px-4 py-2 text-sm font-medium">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-1 p-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={child.href}
                                  className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                                >
                                  <div className="text-sm font-medium">
                                    {child.label}
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="container-modern py-4">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-11 w-full rounded-xl bg-slate-50"
              />
            </div>
            
            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium"
                    onClick={() => !item.children && setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
