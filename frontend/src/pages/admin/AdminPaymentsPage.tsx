// src/pages/admin/AdminTurnsPage.tsx
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function AdminTurnsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Turnos</h1>
            <p className="text-muted-foreground mt-1">
              Agenda, cupos, estados, cancelaciones y auditoría.
            </p>
          </div>

          <Button variant="outline" onClick={() => navigate('/admin')}>
            Volver
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="font-medium">Módulo en construcción</p>
          <p className="text-sm text-muted-foreground mt-2">
            Próximo paso: definimos el modelo de turnos (servicio, dependencia, cupos, fecha/hora,
            estado, observaciones) y endpoints admin/ciudadano.
          </p>
        </div>
      </div>
    </div>
  )
}