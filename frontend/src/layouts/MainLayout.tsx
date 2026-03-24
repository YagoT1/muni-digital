import { Outlet } from 'react-router-dom'
import { NotificationBanner } from '@/components/ui/NotificationBanner'
import { Footer } from '@/sections/Footer'
import { Header } from '@/sections/Header'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content">
        Ir al contenido principal
      </a>

      <NotificationBanner />
      <Header />

      <main id="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
