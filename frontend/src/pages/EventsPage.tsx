import { publicEvents } from '@/data/publicContent'

export default function EventsPage() {
  return (
    <div className="container-modern py-10 space-y-6">
      <h1 className="text-3xl font-bold">Eventos y calendario</h1>
      <div className="grid gap-4">
        {publicEvents.map((e) => (
          <div key={e.id} className="rounded-xl border bg-white p-4">
            <p className="font-semibold">{e.title}</p>
            <p className="text-sm text-slate-600">{e.date} · {e.time} · {e.location}</p>
            <p className="text-sm text-slate-500">{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
