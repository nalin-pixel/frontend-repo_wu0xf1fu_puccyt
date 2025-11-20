import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { About, Skills, Experience, Projects, Contact } from './components/Sections'

function App() {
  return (
    <div id="home" className="relative min-h-screen bg-slate-950 text-white selection:bg-cyan-400/30 selection:text-white">
      {/* Background mesh gradients */}
      <div className="absolute inset-0">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_15%_-10%,rgba(107,70,193,0.25),transparent),radial-gradient(700px_500px_at_90%_10%,rgba(14,165,233,0.25),transparent)]" />
      </div>

      <Navbar />
      <Hero />

      <main className="relative z-10">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <footer className="relative z-10 py-10 text-center text-cyan-200/70">
        © {new Date().getFullYear()} Vedant Patil — Built with love for DevOps & Edge
      </footer>

      <CustomCursor />
    </div>
  )
}

export default App
