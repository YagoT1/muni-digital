import { Inbox } from 'lucide-react'

export function EmptyState({ message = 'No hay datos disponibles' }: { message?: string }) {
  return (
    <div className="flex min-h-[120px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
      <Inbox className="h-4 w-4" />
      <span>{message}</span>
    </div>
  )
}
