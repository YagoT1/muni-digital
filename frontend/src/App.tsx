import { Suspense, lazy, useEffect, useState } from 'react'
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

const PortalPage = lazy(() => import('./pages/PortalPage'))
const DebtsPage = lazy(() => import('./pages/DebtsPage'))
const OnlineAppointmentsPage = lazy(() => import('./pages/OnlineAppointmentsPage'))
const ClaimsPage = lazy(() => import('./pages/ClaimsPage'))
const ProceduresPage = lazy(() => import('./pages/ProceduresPage'))
const TransparencyPage = lazy(() => import('./pages/TransparencyPage'))
const TourismPage = lazy(() => import('./pages/TourismPage'))
const NewsPage = lazy(() => import('./pages/NewsPage'))
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage'))
const EventsPage = lazy(() => import('./pages/EventsPage'))

const CitizenPortalPage = lazy(() => import('./pages/CitizenPortalPage'))
const CitizenProfilePage = lazy(() => import('./pages/CitizenProfilePage'))
const CitizenTurnsPage = lazy(() => import('./pages/CitizenTurnsPage'))
const CitizenPaymentsPage = lazy(() => import('./pages/CitizenPaymentsPage'))
const CitizenTramitesPage = lazy(() => import('./pages/CitizenTramitesPage'))

const EmployeeDashboardPage = lazy(() => import('./pages/EmployeeDashboardPage'))
const EmployeeProfilePage = lazy(() => import('./pages/EmployeeProfilePage'))
const EmployeeOvertimePage = lazy(() => import('./pages/employee/EmployeeOvertimePage'))
const EmployeePayslipsPage = lazy(() => import('./pages/employee/EmployeePayslipsPage'))

const OperatorDashboardPage = lazy(() => import('./pages/OperatorDashboardPage'))
const OperatorCitizensPage = lazy(() => import('./pages/operator/OperatorCitizensPage'))
const OperatorTurnsPage = lazy(() => import('./pages/operator/OperatorTurnsPage'))
const OperatorTramitesPage = lazy(() => import('./pages/operator/OperatorTramitesPage'))

const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'))
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'))
const AdminTurnsPage = lazy(() => import('./pages/admin/AdminTurnsPage'))
const AdminPaymentsPage = lazy(() => import('./pages/admin/AdminPaymentsPage'))
const AdminUserDetailPage = lazy(() => import('./pages/admin/AdminUserDetailPage'))
const AdminUserEditPage = lazy(() => import('./pages/admin/AdminUserEditPage'))
const AdminUserCreatePage = lazy(() => import('./pages/admin/AdminUserCreatePage'))

const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const CitizenLayout = lazy(() => import('./layouts/CitizenLayout'))
const EmployeeLayout = lazy(() => import('./layouts/EmployeeLayout'))
const OperatorLayout = lazy(() => import('./layouts/OperatorLayout'))

function RouteLoader() {
  return <div className="p-8 text-center text-muted-foreground">Cargando módulo...</div>
}

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
    <Suspense fallback={<RouteLoader />}>
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
        <Route path="/deudas" element={<DebtsPage />} />
        <Route path="/turnos" element={<OnlineAppointmentsPage />} />
        <Route path="/reclamos" element={<ClaimsPage />} />
        <Route path="/tramites" element={<ProceduresPage />} />
        <Route path="/transparencia" element={<TransparencyPage />} />
        <Route path="/turismo" element={<TourismPage />} />
        <Route path="/noticias" element={<NewsPage />} />
        <Route path="/noticias/:id" element={<NewsDetailPage />} />
        <Route path="/eventos" element={<EventsPage />} />

        <Route element={<ProtectedRoute allowedRoles={['ciudadano']} />}>
          <Route path="/ciudadano" element={<CitizenLayout />}>
            <Route index element={<CitizenPortalPage />} />
            <Route path="perfil" element={<CitizenProfilePage />} />
            <Route path="turnos" element={<CitizenTurnsPage />} />
            <Route path="pagos" element={<CitizenPaymentsPage />} />
            <Route path="tramites" element={<CitizenTramitesPage />} />
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

        <Route element={<ProtectedRoute allowedRoles={['operador', 'moderador']} />}>
          <Route path="/operador" element={<OperatorLayout />}>
            <Route index element={<OperatorDashboardPage />} />
            <Route path="ciudadanos" element={<OperatorCitizensPage />} />
            <Route path="turnos" element={<OperatorTurnsPage />} />
            <Route path="tramites" element={<OperatorTramitesPage />} />
          </Route>
          <Route path="/moderador" element={<Navigate to="/operador" replace />} />
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
    </Suspense>
  )
}

export default App
