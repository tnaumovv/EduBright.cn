import { MotionConfig } from 'motion/react'
import Header from './components/Header'
import Hero from './components/sections/Hero'
import Programs from './components/sections/Programs'
import Journey from './components/sections/Journey'
import Consultation from './components/sections/Consultation'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="main-content">
        <Hero />
        <Programs />
        <Journey />
        <Consultation />
      </main>
      <Footer />
    </MotionConfig>
  )
}
