export default function TourismPage() {
  return (
    <div className="container-modern py-10 space-y-6">
      <h1 className="text-3xl font-bold">Turismo</h1>
      <p className="text-slate-600">Guía de atractivos, agenda cultural y recomendaciones para visitantes.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {['Qué visitar', 'Dónde alojarse', 'Gastronomía'].map((item) => (
          <div key={item} className="rounded-xl border bg-white p-4">
            <p className="font-semibold">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
