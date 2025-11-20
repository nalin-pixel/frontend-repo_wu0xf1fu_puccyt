import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  const statusRef = useRef(null)

  useEffect(() => {
    // Typewriter intro
    const el = statusRef.current
    if (!el) return
    const lines = [
      'vedant@portfolio:~$ whoami',
      'Vedant Patil',
      'vedant@portfolio:~$ echo "DevOps ➜ Edge Computing"',
      'System Status: Online'
    ]
    let idx = 0
    let buffer = ''
    let line = lines[idx]
    const type = () => {
      if (buffer.length < line.length) {
        buffer += line[buffer.length]
        el.textContent = buffer + (buffer.length % 2 === 0 ? '█' : ' ')
        setTimeout(type, 40)
      } else {
        el.textContent = line
        idx += 1
        if (idx < lines.length) {
          buffer = ''
          line = lines[idx]
          setTimeout(type, 400)
        }
      }
    }
    type()
  }, [])

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Liquid gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(107,70,193,0.35),transparent),radial-gradient(1000px_700px_at_90%_10%,rgba(14,165,233,0.35),transparent)] blur-2xl pointer-events-none" />

      {/* Spline 3D scene */}
      <div className="relative h-[70vh] w-full">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-6 md:px-12 max-w-6xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_0_28px_rgba(14,165,233,0.25)]"
          >
            Digital Infrastructure Architect
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-center text-lg md:text-2xl text-cyan-200/90"
          >
            DevOps Engineer ⟶ Edge Computing Specialist
          </motion.p>

          {/* Holographic metric cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { k: 'Uptime', v: '99.9%' },
              { k: 'Performance Boost', v: '68x' },
              { k: 'K8s Clusters Active', v: '12' },
            ].map((m) => (
              <motion.div
                key={m.k}
                data-magnetic
                whileHover={{ y: -6 }}
                className="relative rounded-2xl p-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(107,70,193,0.25)]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-purple-400/10 pointer-events-none" />
                <div className="relative">
                  <p className="text-sm uppercase tracking-wider text-cyan-200/70">{m.k}</p>
                  <p className="text-3xl font-bold text-white mt-1">{m.v}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Terminal-style intro line */}
          <div className="mt-10 mx-auto max-w-2xl">
            <div className="rounded-xl bg-black/50 border border-green-400/30 p-4 font-mono text-green-300 text-sm overflow-hidden shadow-inner">
              <p ref={statusRef} className="whitespace-pre-wrap leading-relaxed" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
