import { Link } from 'react-router-dom'

const procedures = [
  { name: 'Habilitación comercial', category: 'Comercio' },
  { name: 'Licencia de conducir', category: 'Tránsito' },
  { name: 'Certificado de domicilio', category: 'Ciudadanía' },
]

export default function ProceduresPage() {
  return (
    <div className="container-modern py-10 space-y-6">
      <h1 className="text-3xl font-bold">Trámites</h1>
      <p className="text-slate-600">Catálogo inicial de trámites municipales, preparado para integración por etapas.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {procedures.map((p) => (
          <div key={p.name} className="rounded-xl border bg-white p-4">
            <p className="text-xs text-slate-500">{p.category}</p>
            <p className="font-semibold">{p.name}</p>
            <Link to="/portal" className="text-sm text-muni-600 underline">Iniciar trámite desde portal</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
