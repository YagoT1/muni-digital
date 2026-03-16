import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function OnlineAppointmentsPage() {
  const [service, setService] = useState('Licencias')
  const [date, setDate] = useState('')
  const [done, setDone] = useState(false)

  return (
    <div className="container-modern py-10 space-y-6">
      <h1 className="text-3xl font-bold">Turnos online</h1>
      <form className="grid gap-4 max-w-xl" onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
        <Input value={service} onChange={(e) => setService(e.target.value)} placeholder="Servicio o dependencia" />
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <Button type="submit">Buscar disponibilidad</Button>
      </form>
      {done && <div className="rounded-xl border bg-emerald-50 p-4 text-emerald-800">Flujo base listo. Próximo paso: integración de agenda y confirmación de turno.</div>}
    </div>
  )
}
