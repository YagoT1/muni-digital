// src/App.tsx
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import CitizenProfilePage from './pages/CitizenProfilePage'
import EmployeeDashboardPage from './pages/EmployeeDashboardPage'
import EmployeeProfilePage from './pages/EmployeeProfilePage'
import OperatorDashboardPage from './pages/OperatorDashboardPage'
import EmployeeOvertimePage from './pages/employee/EmployeeOvertimePage'
import EmployeePayslipsPage from './pages/employee/EmployeePayslipsPage'
import OperatorCitizensPage from './pages/operator/OperatorCitizensPage'
import OperatorTurnsPage from './pages/operator/OperatorTurnsPage'
import OperatorTramitesPage from './pages/operator/OperatorTramitesPage'

import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminTurnsPage from './pages/admin/AdminTurnsPage'
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage'
import AdminUserDetailPage from './pages/admin/AdminUserDetailPage'
import AdminUserEditPage from './pages/admin/AdminUserEditPage'
import AdminUserCreatePage from './pages/admin/AdminUserCreatePage'

import AdminLayout from './layouts/AdminLayout'
import CitizenLayout from './layouts/CitizenLayout'
import EmployeeLayout from './layouts/EmployeeLayout'
import OperatorLayout from './layouts/OperatorLayout'

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

      <Route path="/portal" element={<PortalPage />} />

      <Route element={<ProtectedRoute allowedRoles={['ciudadano']} />}>
        <Route path="/ciudadano" element={<CitizenLayout />}>
          <Route index element={<CitizenPortalPage />} />
          <Route path="perfil" element={<CitizenProfilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['empleado']} />}>
        <Route path="/empleado" element={<EmployeeLayout />}>
          <Route index element={<EmployeeDashboardPage />} />
          <Route path="perfil" element={<EmployeeProfilePage />} />
          <Route path="horas-extras" element={<EmployeeOvertimePage />} />
          <Route path="recibos" element={<EmployeePayslipsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['operador']} />}>
        <Route path="/operador" element={<OperatorLayout />}>
          <Route index element={<OperatorDashboardPage />} />
          <Route path="ciudadanos" element={<OperatorCitizensPage />} />
          <Route path="turnos" element={<OperatorTurnsPage />} />
          <Route path="tramites" element={<OperatorTramitesPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="usuarios" element={<AdminUsersPage />} />
          <Route path="usuarios/nuevo" element={<AdminUserCreatePage />} />
          <Route path="usuarios/:id" element={<AdminUserDetailPage />} />
          <Route path="usuarios/:id/editar" element={<AdminUserEditPage />} />
          <Route path="turnos" element={<AdminTurnsPage />} />
          <Route path="pagos" element={<AdminPaymentsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
