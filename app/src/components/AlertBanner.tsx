import { AlertTriangle, X } from 'lucide-react'

interface AlertBannerProps {
  message: string
  onClose: () => void
}

export function AlertBanner({ message, onClose }: AlertBannerProps) {
  return (
    <div 
      role="alert"
      className="bg-amber-500 text-white relative"
    >
      <div className="container-modern py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 opacity-90" aria-hidden="true" />
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
          aria-label="Cerrar alerta"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
