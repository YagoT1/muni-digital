import { CitizenPortal } from '@/sections/CitizenPortal'
import { EventsCalendar } from '@/sections/EventsCalendar'
import { Hero } from '@/sections/Hero'
import { NewsSection } from '@/sections/NewsSection'
import { QuickServices } from '@/sections/QuickServices'
import { TourismSection } from '@/sections/TourismSection'
import { TransparencySection } from '@/sections/TransparencySection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickServices />
      <NewsSection />
      <EventsCalendar />
      <TransparencySection />
      <TourismSection />
      <CitizenPortal />
    </>
  )
}
