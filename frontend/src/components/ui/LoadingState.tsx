import { Spinner } from './spinner'

export function LoadingState({ text = 'Cargando...' }: { text?: string }) {
  return (
    <div className="flex min-h-[140px] items-center justify-center gap-3 rounded-xl border bg-white p-6 text-sm text-slate-600">
      <Spinner className="size-4 text-muni-600" />
      <span>{text}</span>
    </div>
  )
}
