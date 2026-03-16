import { 
  Facebook, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ExternalLink,
  Sun,
  Moon,
  Type,
  Accessibility
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAccessibility } from '@/context/AccessibilityContext'

const footerLinks = {
  servicios: [
    { label: 'Pagos y Deudas', href: '/deudas' },
    { label: 'Guía de Trámites', href: '/tramites' },
    { label: 'Turnos Online', href: '/turnos' },
    { label: 'Salud', href: '#salud' },
    { label: 'Educación', href: '#educacion' },
    { label: 'Obras', href: '#obras' },
  ],
  municipalidad: [
    { label: 'Autoridades', href: '#autoridades' },
    { label: 'Organigrama', href: '#organigrama' },
    { label: 'Transparencia', href: '/transparencia' },
    { label: 'Datos Abiertos', href: '#datos-abiertos' },
    { label: 'Normativas', href: '#normativas' },
    { label: 'Licitaciones', href: '#licitaciones' },
  ],
  comunidad: [
    { label: 'Turismo', href: '/turismo' },
    { label: 'Agenda Cultural', href: '/eventos' },
    { label: 'Deportes', href: '#deportes' },
    { label: 'Participación', href: '#participacion' },
    { label: 'Voluntariado', href: '#voluntariado' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-blue-500' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-pink-500' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-red-500' },
]

export function Footer() {
  const { highContrast, toggleHighContrast, largeText, toggleLargeText } = useAccessibility()

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Accessibility Bar */}
      <div className="bg-slate-800/50 border-b border-slate-700/50">
        <div className="container-modern py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Accessibility className="h-4 w-4 text-slate-400" />
              <span className="text-slate-400">Opciones de accesibilidad:</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleHighContrast}
                className={`gap-2 rounded-lg ${highContrast ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                {highContrast ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {highContrast ? 'Modo normal' : 'Alto contraste'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLargeText}
                className={`gap-2 rounded-lg ${largeText ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                <Type className="h-4 w-4" />
                {largeText ? 'Texto normal' : 'Texto grande'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-modern py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-muni-500 to-muni-600 rounded-xl flex items-center justify-center text-white font-bold">
                RP
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Municipalidad de</p>
                <p className="text-base font-bold text-white">Roque Pérez</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-sm leading-relaxed">
              Trabajamos para mejorar la calidad de vida de todos los vecinos, 
              con servicios eficientes y transparentes.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muni-400 flex-shrink-0 mt-0.5" />
                <span>Bartolomé Mitre 1310, Roque Pérez<br />Provincia de Buenos Aires, Argentina</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muni-400 flex-shrink-0" />
                <a href="tel:2227404205" className="hover:text-white transition-colors">
                  2227-404205
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muni-400 flex-shrink-0" />
                <a href="mailto:info@roqueperez.gob.ar" className="hover:text-white transition-colors">
                  info@roqueperez.gob.ar
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muni-400 flex-shrink-0" />
                <span>Lun a Vie: 08:00 - 14:00 hs.</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Servicios</h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Municipalidad</h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.municipalidad.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Comunidad</h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.comunidad.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 border-t border-slate-800">
        <div className="container-modern py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
              <span>© 2026 Municipalidad de Roque Pérez</span>
              <span className="hidden md:inline">|</span>
              <a href="#terminos" className="hover:text-slate-300 transition-colors">
                Términos
              </a>
              <a href="#privacidad" className="hover:text-slate-300 transition-colors">
                Privacidad
              </a>
              <a href="#accesibilidad" className="hover:text-slate-300 transition-colors">
                Accesibilidad
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl bg-slate-800 ${social.color} transition-all`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Government Links */}
          <div className="mt-4 pt-4 border-t border-slate-800/50 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
            <span>Enlaces de interés:</span>
            <a href="https://www.argentina.gob.ar" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 flex items-center gap-1 transition-colors">
              Argentina.gob.ar
              <ExternalLink className="h-3 w-3" />
            </a>
            <a href="https://www.gba.gob.ar" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 flex items-center gap-1 transition-colors">
              Provincia de Buenos Aires
              <ExternalLink className="h-3 w-3" />
            </a>
            <a href="https://www.miargentina.gob.ar" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 flex items-center gap-1 transition-colors">
              Mi Argentina
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
