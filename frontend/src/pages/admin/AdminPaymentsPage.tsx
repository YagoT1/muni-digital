import { Button } from '@/components/ui/button'

const milestones = [
  'Definir entidades: comprobante, medio de pago, estado, conciliación',
  'Implementar API admin para consulta y conciliación',
  'Agregar reportes por período y trazabilidad operativa',
]

export default function AdminPaymentsPage() {
  return (
    <div className="bg-white rounded-xl border p-6 space-y-5">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Pagos</h2>
          <p className="text-sm text-muted-foreground">
            Módulo estructurado para evolución incremental del circuito de pagos.
          </p>
        </div>
        <Button variant="outline" disabled>
          Próxima iteración
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <InfoCard title="Estado actual" value="Base operativa" />
        <InfoCard title="Conciliación" value="Pendiente" />
        <InfoCard title="Integración" value="Recaudación + reportes" />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Roadmap inmediato</h3>
        <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
          {milestones.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="font-semibold mt-1">{value}</p>
    </div>
  )
}
