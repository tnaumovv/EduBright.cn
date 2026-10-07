import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/sections/Hero'
import Programs from './components/sections/Programs'
import Journey from './components/sections/Journey'
import ChinaGallery from './components/sections/ChinaGallery'
import FAQ from './components/sections/FAQ'
import Consultation from './components/sections/Consultation'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const section = document.getElementById(window.location.hash.slice(1))
    section?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="main-content">
        <Hero />
        <Programs />
        <ChinaGallery />
        <Journey />
        <FAQ />
        <Consultation />
      </main>
      <Footer />
    </MotionConfig>
  )
}
