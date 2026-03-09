import { Button } from '@/components/ui/button'

export default function AdminPaymentsPage() {
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex items-start justify-between gap-6 mb-4">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Pagos</h2>
          <p className="text-sm text-muted-foreground">
            Módulo en preparación. Estructura lista para integrar medios de pago y conciliación.
          </p>
        </div>
        <Button variant="outline" disabled>
          Próximamente
        </Button>
      </div>

      <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
        <li>Comprobantes y estados (pendiente/aprobado/rechazado)</li>
        <li>Conciliación y reportes administrativos</li>
        <li>Trazabilidad de operaciones</li>
      </ul>
    </div>
  )
}
