import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type DebtResult = { concept: string; amount: string; status: 'pendiente' | 'vencida' }

export default function DebtsPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<DebtResult[] | null>(null)

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setResults([{ concept: 'Tasa municipal', amount: '$12.500', status: 'pendiente' }])
  }

  return (
    <div className="container-modern py-10 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Pagar deudas</h1>
      <form onSubmit={onSearch} className="flex gap-3 max-w-xl">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ingresá DNI, partida o identificador" />
        <Button type="submit">Consultar</Button>
      </form>
      {!results && <p className="text-slate-600">Consultá tus deudas para continuar con el pago online.</p>}
      {results?.map((item) => (
        <div key={item.concept} className="rounded-xl border bg-white p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">{item.concept}</p>
            <p className="text-sm text-slate-500">Estado: {item.status}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{item.amount}</p>
            <Button size="sm" className="mt-2">Continuar pago</Button>
          </div>
        </div>
      ))}
      <p className="text-sm text-slate-500">Para ver historial y comprobantes ingresá al <Link className="text-muni-600 underline" to="/portal">Portal ciudadano</Link>.</p>
    </div>
  )
}
