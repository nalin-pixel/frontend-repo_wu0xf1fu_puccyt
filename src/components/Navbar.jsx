import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Menu } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        alert('Command palette coming soon: jump to sections, search projects, run actions')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const items = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <div className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'backdrop-blur-md bg-slate-900/50 border-b border-white/10' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Animated monogram */}
        <motion.a href="#home" className="text-white font-extrabold text-xl tracking-wider" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-cyan-400">&lt;</span>VP<span className="text-cyan-400">/&gt;</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-6">
          {items.map((i) => (
            <a key={i.href} href={i.href} data-magnetic className="relative text-cyan-100/90 hover:text-white transition">
              {i.label}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button aria-label="Search" data-magnetic className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-100 hover:bg-white/10">
            <Search className="w-5 h-5" />
          </button>
          <button aria-label="Menu" onClick={() => setOpen((o) => !o)} className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-100 hover:bg-white/10">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/70 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-3">
            {items.map((i) => (
              <a key={i.href} href={i.href} className="text-cyan-100/90 hover:text-white" onClick={() => setOpen(false)}>
                {i.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
