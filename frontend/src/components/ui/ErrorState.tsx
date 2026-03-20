import { AlertTriangle } from 'lucide-react'

export function ErrorState({ message = 'Error al cargar datos' }: { message?: string }) {
  return (
    <div className="flex min-h-[120px] items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <AlertTriangle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  )
}
