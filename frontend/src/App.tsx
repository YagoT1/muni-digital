// src/App.tsx
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { QuickServices } from './sections/QuickServices'
import { NewsSection } from './sections/NewsSection'
import { EventsCalendar } from './sections/EventsCalendar'
import { TransparencySection } from './sections/TransparencySection'
import { TourismSection } from './sections/TourismSection'
import { CitizenPortal } from './sections/CitizenPortal'
import { Footer } from './sections/Footer'
import { AlertBanner } from './components/AlertBanner'

import ProtectedRoute from './components/ProtectedRoute'
import PortalPage from './pages/PortalPage'
import CitizenPortalPage from './pages/CitizenPortalPage'

import AdminDashboardPage from './pages/AdminDashboardPage'

import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminTurnsPage from './pages/admin/AdminTurnsPage'
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage'

function App() {
  const [showAlert, setShowAlert] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muni-blue animate-pulse-soft" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Landing */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-background">
            <a href="#main-content" className="skip-to-content">
              Ir al contenido principal
            </a>

            {showAlert && (
              <AlertBanner
                message="Corte de agua programado - Martes 18/02 de 08:00 a 12:00 hs. en zona centro."
                onClose={() => setShowAlert(false)}
              />
            )}

            <Header />

            <main id="main-content">
              <Hero />
              <QuickServices />
              <NewsSection />
              <EventsCalendar />
              <TransparencySection />
              <TourismSection />
              <CitizenPortal />
            </main>

            <Footer />
          </div>
        }
      />

      {/* Portal dedicado */}
      <Route path="/portal" element={<PortalPage />} />

      {/* Ciudadano */}
      <Route element={<ProtectedRoute allowedRoles={['ciudadano']} />}>
        <Route path="/ciudadano" element={<CitizenPortalPage />} />
      </Route>

      {/* Admin */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/usuarios" element={<AdminUsersPage />} />
        <Route path="/admin/turnos" element={<AdminTurnsPage />} />
        <Route path="/admin/pagos" element={<AdminPaymentsPage />} />
      </Route>
    </Routes>
  )
}

export default App