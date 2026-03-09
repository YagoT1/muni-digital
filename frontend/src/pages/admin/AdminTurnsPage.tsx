import { Button } from '@/components/ui/button'

export default function AdminTurnsPage() {
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex items-start justify-between gap-6 mb-4">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Turnos</h2>
          <p className="text-sm text-muted-foreground">
            Módulo en preparación. Se reservaron rutas y UX para mantener coherencia del panel.
          </p>
        </div>
        <Button variant="outline" disabled>
          Próximamente
        </Button>
      </div>

      <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
        <li>Agenda por dependencia y servicio</li>
        <li>Cupos, estados y reprogramaciones</li>
        <li>Historial y auditoría de cambios</li>
      </ul>
    </div>
  )
}
