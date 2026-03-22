// src/App.tsx
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'


import ProtectedRoute from './components/ProtectedRoute'
import PortalPage from './pages/PortalPage'
import DebtsPage from './pages/DebtsPage'
import OnlineAppointmentsPage from './pages/OnlineAppointmentsPage'
import ClaimsPage from './pages/ClaimsPage'
import ProceduresPage from './pages/ProceduresPage'
import TransparencyPage from './pages/TransparencyPage'
import TourismPage from './pages/TourismPage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import EventsPage from './pages/EventsPage'
import CitizenPortalPage from './pages/CitizenPortalPage'
import CitizenProfilePage from './pages/CitizenProfilePage'
import CitizenTurnsPage from './pages/CitizenTurnsPage'
import CitizenPaymentsPage from './pages/CitizenPaymentsPage'
import CitizenTramitesPage from './pages/CitizenTramitesPage'
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
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage'

import AdminLayout from './layouts/AdminLayout'
import CitizenLayout from './layouts/CitizenLayout'
import EmployeeLayout from './layouts/EmployeeLayout'
import MainLayout from './layouts/MainLayout'
import OperatorLayout from './layouts/OperatorLayout'
import HomePage from './pages/HomePage'

function App() {
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
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="portal" element={<PortalPage />} />
        <Route path="deudas" element={<DebtsPage />} />
        <Route path="turnos" element={<OnlineAppointmentsPage />} />
        <Route path="reclamos" element={<ClaimsPage />} />
        <Route path="tramites" element={<ProceduresPage />} />
        <Route path="transparencia" element={<TransparencyPage />} />
        <Route path="turismo" element={<TourismPage />} />
        <Route path="noticias" element={<NewsPage />} />
        <Route path="noticias/:id" element={<NewsDetailPage />} />
        <Route path="eventos" element={<EventsPage />} />
      </Route>

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
          <Route path="notifications" element={<AdminNotificationsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
