import { Link, useParams } from 'react-router-dom'
import { publicNews } from '@/data/publicContent'

export default function NewsDetailPage() {
  const { id } = useParams()
  const item = publicNews.find((n) => String(n.id) === id)
  if (!item) return <div className="container-modern py-10">Noticia no encontrada.</div>
  return (
    <div className="container-modern py-10 space-y-4">
      <Link to="/noticias" className="text-sm text-muni-600 underline">← Volver a noticias</Link>
      <h1 className="text-3xl font-bold">{item.title}</h1>
      <p className="text-sm text-slate-500">{item.date} · {item.author}</p>
      <p className="text-slate-700">{item.content}</p>
    </div>
  )
}
