import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import Doodle3D from './Doodle3D'

function useProgressBar() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? (window.scrollY / max) * 100 : 0
      el.style.width = p + '%'
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return ref
}

function useNodes(count = 20) {
  const nodes = useMemo(() => Array.from({ length: count }).map(() => ({
    x: Math.random(),
    y: Math.random(),
  })), [count])
  return nodes
}

export default function MinimalHero() {
  const barRef = useProgressBar()
  const canvasRef = useRef(null)
  const nodes = useNodes(28)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight

    let mx = -9999, my = -9999

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }

    const dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = '#000'
      ctx.globalAlpha = 0.15
      ctx.lineWidth = 1

      const px = mx / w, py = my / h

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        const ax = a.x * w
        const ay = a.y * h

        // Node point
        ctx.globalAlpha = 0.2
        ctx.beginPath()
        ctx.arc(ax, ay, 1.2, 0, Math.PI * 2)
        ctx.fill()

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const bx = b.x * w
          const by = b.y * h
          const d = dist(ax, ay, bx, by)
          const mda = dist(ax, ay, px * w, py * h)
          const mdb = dist(bx, by, px * w, py * h)
          const within = mda < 140 || mdb < 140
          if (d < 140 && within) {
            ctx.globalAlpha = 0.12 * (1 - d / 140)
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx, by)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    canvas.addEventListener('mousemove', onMove)
    draw()

    return () => {
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
    }
  }, [nodes])

  // Animated role text
  const roles = ['DevOps Engineer', 'Edge Computing Specialist']
  const roleRef = useRef(null)
  useEffect(() => {
    const el = roleRef.current
    let i = 0
    let idx = 0
    let deleting = false

    const tick = () => {
      const word = roles[i]
      const current = el.textContent || ''
      if (!deleting) {
        el.textContent = word.slice(0, idx + 1)
        idx++
        if (idx === word.length) {
          deleting = true
          setTimeout(tick, 1200)
          return
        }
      } else {
        el.textContent = word.slice(0, idx - 1)
        idx--
        if (idx === 0) {
          deleting = false
          i = (i + 1) % roles.length
        }
      }
      setTimeout(tick, deleting ? 40 : 60)
    }
    tick()
  }, [])

  // Wave-in letters for name
  const name = 'VEDANT PATIL'

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-white">
      <div ref={barRef} className="progress-bar" />

      {/* Background layers: dotted grid + subtle gradient motion */}
      <div className="absolute inset-0 bg-dotted-grid" aria-hidden="true" />
      <div className="absolute inset-0 gradient-motion opacity-[0.6]" aria-hidden="true" />

      {/* Interactive nodes canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Top nav + logo */}
      <div className="absolute top-0 left-0 right-0">
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <div className="flex items-center justify-between">
            <a href="#home" className="font-header text-xl tracking-widest font-bold select-none">
              <span className="inline-block">V</span>
              <span className="inline-block ml-0.5">P</span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              {['HOME','ABOUT','WORK','PROJECTS','CONTACT'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="link-underline hover:font-semibold">
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-4 w-full h-px bg-black/10" />
        </div>
      </div>

      {/* Hero copy */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col items-start justify-center">
        <h1 className="font-header text-[56px] md:text-[72px] leading-none tracking-[0.05em] font-bold reveal">
          {name.split('').map((ch, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <div className="mt-4 flex items-center gap-3 text-[14px] tracking-[0.2em]">
          <span ref={roleRef} className="uppercase" />
          <span className="opacity-50">·</span>
          <span className="uppercase">Edge ↔ Cloud</span>
        </div>

        <p className="mt-3 italic text-[16px] text-[#666] font-header">
          "Architecting the bridge between edge and cloud"
        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-4">
          <a href="#projects" className="hoverable magnetic px-5 py-3 rounded-[4px] border border-black text-sm font-medium hover:text-white hover:bg-black">
            View My Work
          </a>
          <a href="#contact" className="hoverable magnetic px-5 py-3 rounded-[4px] border border-black text-sm font-medium hover:text-white hover:bg-black">
            Download Resume
          </a>
        </div>

        {/* 3D Doodle area */}
        <div className="mt-12">
          <Doodle3D />
        </div>
      </div>

      {/* Floating minimal line-art icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-20 top-28 opacity-10 hover:opacity-80" style={{transform: 'translateY(0px)', animation: 'float1 6s ease-in-out infinite'}}>
          <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 22h32a6 6 0 0 0 0-12h-1.5a10 10 0 0 0-19.3-3.7A8 8 0 0 0 6 22Z" stroke="#000" strokeWidth="1"/>
          </svg>
        </div>
        <div className="absolute left-24 bottom-24 opacity-10 hover:opacity-80" style={{animation: 'float2 7s ease-in-out infinite'}}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="8" width="28" height="20" rx="2" stroke="#000" />
            <rect x="10" y="12" width="8" height="12" rx="1" stroke="#000" />
            <rect x="22" y="12" width="8" height="12" rx="1" stroke="#000" />
          </svg>
        </div>
        <div className="absolute left-1/2 top-1/3 opacity-10 hover:opacity-80" style={{animation: 'float3 8s ease-in-out infinite'}}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="10" height="10" stroke="#000" />
            <rect x="16" y="8" width="14" height="10" stroke="#000" />
            <rect x="4" y="20" width="26" height="8" stroke="#000" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes float1 { 0%{ transform: translateY(0) } 50%{ transform: translateY(-3px) } 100%{ transform: translateY(0) } }
        @keyframes float2 { 0%{ transform: translateY(0) } 50%{ transform: translateY(2px) } 100%{ transform: translateY(0) } }
        @keyframes float3 { 0%{ transform: translateY(0) } 50%{ transform: translateY(-2px) } 100%{ transform: translateY(0) } }
      `}</style>
    </section>
  )
}
