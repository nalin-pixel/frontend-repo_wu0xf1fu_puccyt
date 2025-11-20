import { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'

// Minimalist 3D doodle using Spline. Reactive to cursor with subtle tilt and hover intensity.
export default function Doodle3D() {
  const wrapRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Gentle parallax tilt with hover scale
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let tx = 0, ty = 0, rx = 0, ry = 0
    let hover = false

    const onMove = (e) => {
      if (prefersReduced) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      tx = (e.clientX - cx) / rect.width
      ty = (e.clientY - cy) / rect.height
    }

    const onEnter = () => { hover = true }
    const onLeave = () => { hover = false }

    const loop = () => {
      if (!prefersReduced) {
        // ease towards target
        rx += (ty * 8 - rx) * 0.08
        ry += (tx * -10 - ry) * 0.08
      }
      const scale = hover ? 1.02 : 1
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    loop()
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="relative select-none" style={{ filter: 'grayscale(100%) contrast(110%)' }} aria-label="Interactive 3D doodle: Cloud, Edge and DevOps">
      <div ref={wrapRef} className="[transform-style:preserve-3d] will-change-transform">
        <div className="relative w-[min(640px,90vw)] h-[min(520px,60vh)] rounded-xl overflow-hidden border border-black/10 bg-[#FAFAFA]">
          {!error && (
            <Spline
              scene={'https://prod.spline.design/o8tX6Vg7k35n1c2Z/scene.splinecode'}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              aria-label="Spline scene"
            />
          )}

          {(error || !loaded) && (
            <div className="absolute inset-0 grid place-items-center pointer-events-none" aria-hidden={loaded && !error ? 'true' : 'false'}>
              <div className="flex items-center gap-6 opacity-50">
                <svg width="54" height="36" viewBox="0 0 54 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 26h36a7 7 0 0 0 0-14h-1.6A11 11 0 0 0 29 5c-6.1 0-11 4.9-11 11H18A8 8 0 0 0 8 26Z" stroke="#000" strokeWidth="1.2"/>
                </svg>
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="10" width="30" height="22" rx="2" stroke="#000" strokeWidth="1.2"/>
                  <rect x="10" y="14" width="9" height="14" rx="1" stroke="#000" strokeWidth="1.2"/>
                  <rect x="23" y="14" width="9" height="14" rx="1" stroke="#000" strokeWidth="1.2"/>
                </svg>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 28h26M9 24h22M12 20h16M15 16h10" stroke="#000" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute -bottom-8 left-1 text-[10px] tracking-[0.2em] uppercase text-black/50">
        Cloud · Edge · DevOps
      </div>
    </div>
  )
}
