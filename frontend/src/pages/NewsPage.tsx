import { Link } from 'react-router-dom'
import { publicNews } from '@/data/publicContent'

export default function NewsPage() {
  return (
    <div className="container-modern py-10 space-y-6">
      <h1 className="text-3xl font-bold">Noticias</h1>
      <div className="grid gap-4">
        {publicNews.map((n) => (
          <Link key={n.id} to={`/noticias/${n.id}`} className="rounded-xl border bg-white p-4 block hover:bg-slate-50">
            <p className="text-xs text-slate-500">{n.date} · {n.category}</p>
            <p className="font-semibold">{n.title}</p>
            <p className="text-sm text-slate-600">{n.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
