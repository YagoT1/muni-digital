import { useEffect, useState } from 'react'
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
import { AccessibilityProvider } from './context/AccessibilityContext'

function App() {
  const [showAlert, setShowAlert] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading for smooth entrance
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
    <AccessibilityProvider>
      <div className="min-h-screen bg-background">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Ir al contenido principal
        </a>
        
        {/* Alert Banner */}
        {showAlert && (
          <AlertBanner 
            message="Corte de agua programado - Martes 18/02 de 08:00 a 12:00 hs. en zona centro." 
            onClose={() => setShowAlert(false)}
          />
        )}
        
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main id="main-content">
          {/* Hero Section */}
          <Hero />
          
          {/* Quick Services */}
          <QuickServices />
          
          {/* News Section */}
          <NewsSection />
          
          {/* Events Calendar */}
          <EventsCalendar />
          
          {/* Transparency Section */}
          <TransparencySection />
          
          {/* Tourism Section */}
          <TourismSection />
          
          {/* Citizen Portal */}
          <CitizenPortal />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </AccessibilityProvider>
  )
}

export default App
