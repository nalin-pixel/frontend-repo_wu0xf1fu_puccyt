import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Custom cursor with glowing orb, trailing particles, and hover highlight box
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [trail, setTrail] = useState([])
  const rafRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX
      const y = e.clientY
      setPos({ x, y })
      setTrail((t) => {
        const next = [...t, { x, y, id: crypto.randomUUID() }]
        return next.slice(-16) // keep last N for breadcrumb effect
      })
    }

    const onMouseOver = (e) => {
      const target = e.target
      if (!target) return
      const isInteractive = target.closest('a, button, [data-magnetic], input, textarea, select, [role="button"]')
      setHovering(Boolean(isInteractive))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onMouseOver)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Magnetic effect for elements with data-magnetic
  useEffect(() => {
    const elems = Array.from(document.querySelectorAll('[data-magnetic]'))
    const strength = 0.25

    const handleMove = (e) => {
      elems.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const relX = e.clientX - (rect.left + rect.width / 2)
        const relY = e.clientY - (rect.top + rect.height / 2)
        const dist = Math.hypot(relX, relY)
        const damp = Math.min(1, 120 / (dist + 1))
        el.style.transform = `translate(${relX * strength * damp}px, ${relY * strength * damp}px)`
      })
    }

    const reset = () => {
      elems.forEach((el) => {
        el.style.transform = 'translate(0, 0)'
      })
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', reset)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', reset)
    }
  }, [])

  return (
    <>
      {/* Trailing breadcrumbs */}
      {trail.map((t, i) => (
        <motion.span
          key={t.id}
          className="pointer-events-none fixed w-1.5 h-1.5 rounded-full bg-cyan-300/70 shadow-[0_0_12px_2px_rgba(34,211,238,0.6)] mix-blend-screen"
          animate={{ opacity: [0.8, 0.4, 0], scale: [1, 0.9, 0.6] }}
          transition={{ duration: 0.6 + i * 0.02 }}
          style={{ left: t.x - 3, top: t.y - 3, zIndex: 9999 }}
        />
      ))}

      {/* Main cursor orb */}
      <motion.div
        className="pointer-events-none fixed rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.9),rgba(107,70,193,0.85)_60%,rgba(0,0,0,0))] shadow-[0_0_35px_12px_rgba(14,165,233,0.35)] backdrop-blur-sm mix-blend-screen"
        animate={{
          width: hovering ? 44 : 22,
          height: hovering ? 44 : 22,
          opacity: 0.9,
          boxShadow: hovering
            ? '0 0 60px 22px rgba(107,70,193,0.45)'
            : '0 0 35px 12px rgba(14,165,233,0.35)'
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        style={{ left: pos.x - (hovering ? 22 : 11), top: pos.y - (hovering ? 22 : 11), zIndex: 9999 }}
      />

      {/* Highlighting box on text hover */}
      {hovering && (
        <motion.div
          className="pointer-events-none fixed rounded-xl border border-cyan-300/40 bg-cyan-200/5 shadow-[0_0_24px_rgba(34,211,238,0.35)_inset]"
          animate={{
            width: 72,
            height: 48,
            opacity: 0.35
          }}
          transition={{ duration: 0.18 }}
          style={{ left: pos.x - 36, top: pos.y - 24, zIndex: 9998 }}
        />
      )}
    </>
  )
}
