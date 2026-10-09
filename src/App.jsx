import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Pricing } from './components/sections/Pricing'
import { Process } from './components/sections/Process'
import { Projects } from './components/sections/Projects'
import { Services } from './components/sections/Services'
import { useReveal } from './hooks/useReveal'

// Narrativa: impacto → confianza → capacidades → evidencia → proceso → precio → acción.
export default function App() {
  useReveal()

  return (
    <>
      <div id="top-sentinel" aria-hidden="true" className="pointer-events-none absolute top-0 h-px w-px" />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
