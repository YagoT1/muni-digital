export default function TransparencyPage() {
  const sections = ['Presupuesto', 'Licitaciones', 'Compras', 'Documentos y descargas']
  return (
    <div className="container-modern py-10 space-y-6">
      <h1 className="text-3xl font-bold">Transparencia</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((s) => (
          <div key={s} className="rounded-xl border bg-white p-4">
            <h2 className="font-semibold">{s}</h2>
            <p className="text-sm text-slate-600 mt-1">Sección disponible con estructura base para publicación periódica.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
