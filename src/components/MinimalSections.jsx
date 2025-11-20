import { useEffect, useRef } from 'react'

export function FullSection({ id, children, title }) {
  return (
    <section id={id} className="relative h-screen flex items-center">
      <div className="absolute inset-0 bg-dotted-grid" aria-hidden="true" />
      <div className="absolute inset-0 gradient-motion opacity-[0.5]" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {title && (
          <div className="mb-10">
            <h2 className="font-header text-3xl tracking-[0.05em]">{title}</h2>
            <div className="mt-4 h-px bg-black/10" />
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export function AboutMinimal() {
  return (
    <FullSection id="about" title="About">
      <div className="grid md:grid-cols-2 gap-10">
        <p className="text-[18px] leading-relaxed">
          I design resilient systems that connect edge and cloud. My focus: reproducible infrastructure, low-latency data paths, and observability-first operations.
        </p>
        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-black" /> Kubernetes · Terraform · ArgoCD · GitHub Actions</div>
          <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-black" /> Go · Rust · Python · TypeScript</div>
          <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-black" /> Prometheus · Grafana · OpenTelemetry</div>
        </div>
      </div>
    </FullSection>
  )
}

function Stat({ big, small, label }) {
  return (
    <div className="text-center">
      <div className="font-header text-4xl md:text-5xl">{big}</div>
      <div className="mt-1 text-sm tracking-widest">{small}</div>
      <div className="mt-1 text-xs opacity-70">{label}</div>
    </div>
  )
}

export function StatsStrip() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('[data-anim]')?.forEach((n, i) => {
            n.animate([
              { opacity: 0, transform: 'translateY(12px)' },
              { opacity: 1, transform: 'translateY(0px)' }
            ], { duration: 500, delay: 120 * i, easing: 'cubic-bezier(0.4,0,0.2,1)', fill: 'both' })
          })
        }
      })
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0 bg-dotted-grid" aria-hidden="true" />
      <div className="absolute inset-0 gradient-motion opacity-[0.5]" aria-hidden="true" />
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div data-anim><Stat big="68×" small="FASTER" label="Performance" /></div>
          <div data-anim><Stat big="99.9%" small="UPTIME" label="Achieved" /></div>
          <div data-anim><Stat big="50+" small="SYSTEMS" label="Managed" /></div>
          <div data-anim><Stat big="2025" small="PRESENT" label="Working" /></div>
        </div>
      </div>
    </section>
  )
}

export function WorkMinimal() {
  return (
    <FullSection id="work" title="Work">
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="w-2 h-2 bg-black mt-2" />
          <div>
            <div className="font-semibold">DevOps Engineer · Cloud Orchestration</div>
            <div className="text-sm opacity-70">Automated delivery pipelines, standardized IaC, improved MTTR.</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-2 h-2 bg-black mt-2" />
          <div>
            <div className="font-semibold">Edge Computing · Low Latency</div>
            <div className="text-sm opacity-70">Distributed inference at the edge with robust rollout strategies.</div>
          </div>
        </div>
      </div>
    </FullSection>
  )
}

export function ProjectsMinimal() {
  return (
    <FullSection id="projects" title="Projects">
      <div className="grid md:grid-cols-2 gap-8">
        {[{n:'Edge Vision',d:'Distributed analytics at the edge'},{n:'InfraHub',d:'Composable Terraform modules'}].map((p) => (
          <a key={p.n} href="#contact" className="block border border-black p-6 rounded hover:bg-black hover:text-white">
            <div className="font-semibold">{p.n}</div>
            <div className="text-sm opacity-70">{p.d}</div>
            <div className="mt-2 text-xs font-mono opacity-60">{'</>'} {'{ }'} {'[ ]'}</div>
          </a>
        ))}
      </div>
    </FullSection>
  )
}

export function ContactMinimal() {
  return (
    <FullSection id="contact" title="Contact">
      <form className="grid md:grid-cols-2 gap-4 max-w-2xl">
        <input placeholder="Name" className="px-4 py-3 rounded border border-black/30 focus:outline-none" />
        <input placeholder="Email" className="px-4 py-3 rounded border border-black/30 focus:outline-none" />
        <textarea placeholder="Message" rows={5} className="md:col-span-2 px-4 py-3 rounded border border-black/30 focus:outline-none" />
        <div className="flex gap-4 md:col-span-2">
          <button type="button" className="hoverable magnetic px-5 py-3 rounded-[4px] border border-black text-sm font-medium hover:text-white hover:bg-black">Send</button>
          <a href="#projects" className="hoverable magnetic px-5 py-3 rounded-[4px] border border-black text-sm font-medium hover:text-white hover:bg-black">View My Work</a>
        </div>
      </form>
    </FullSection>
  )
}
