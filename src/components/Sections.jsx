import { motion } from 'framer-motion'

export function Section({ id, title, children }) {
  return (
    <section id={id} className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          {title}
        </motion.h2>
        <div>
          {children}
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid md:grid-cols-2 gap-8 text-cyan-100/90">
        <p>
          I architect resilient edge-to-cloud platforms, automate delivery pipelines, and design observability-first systems. Passionate about bringing compute closer to where data is born.
        </p>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 font-mono text-sm">
          <p>$ cat skills.txt</p>
          <p>• Kubernetes • Terraform • GitHub Actions • ArgoCD • Prometheus • Grafana</p>
          <p>• Rust • Go • Python • Bash • MQTT • WebRTC</p>
        </div>
      </div>
    </Section>
  )
}

export function Skills() {
  const categories = {
    'Cloud Platforms': ['AWS', 'GCP', 'Azure', 'Cloudflare'],
    'Orchestration': ['Kubernetes', 'Docker', 'Nomad', 'ArgoCD'],
    'Languages': ['Go', 'Rust', 'Python', 'TypeScript'],
    'Tools': ['Terraform', 'Helm', 'Ansible', 'Prometheus']
  }
  return (
    <Section id="skills" title="Skills">
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-white font-semibold mb-3">{k}</h3>
            <div className="flex flex-wrap gap-2">
              {v.map((s) => (
                <span key={s} className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-100 border border-white/10">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Experience() {
  const roles = [
    { role: 'DevOps Engineer', company: 'Acme Cloud', time: '2022 — Present', desc: 'Led K8s multi-cluster rollout with GitOps and progressive delivery.' },
    { role: 'Edge Computing Researcher', company: 'Open Lab', time: '2020 — 2022', desc: 'Built low-latency inference at the edge with Rust microservices.' }
  ]
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-4">
        {roles.map((r) => (
          <motion.div key={r.role} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold">{r.role} — <span className="text-cyan-300">{r.company}</span></p>
              <p className="text-cyan-200/70 text-sm">{r.time}</p>
            </div>
            <p className="text-cyan-100/90 mt-2">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export function Projects() {
  const projects = [
    { name: 'Edge Vision', desc: 'Distributed video analytics pipeline using K8s at the edge.', tech: ['K8s', 'gRPC', 'Rust'] },
    { name: 'InfraHub', desc: 'IaC platform with Terraform modules and policy as code.', tech: ['Terraform', 'OPA', 'Go'] },
  ]
  return (
    <Section id="projects" title="Projects">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.name} className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/40 to-slate-800/40 p-5">
            <p className="text-white font-semibold">{p.name}</p>
            <p className="text-cyan-100/90 mt-2">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-cyan-100 text-sm">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <form className="grid md:grid-cols-2 gap-4">
          <input data-magnetic placeholder="Name" className="px-4 py-3 rounded border border-white/10 bg-slate-900/50 text-white placeholder:text-cyan-200/60" />
          <input data-magnetic placeholder="Email" className="px-4 py-3 rounded border border-white/10 bg-slate-900/50 text-white placeholder:text-cyan-200/60" />
          <textarea data-magnetic placeholder="Message" rows={5} className="md:col-span-2 px-4 py-3 rounded border border-white/10 bg-slate-900/50 text-white placeholder:text-cyan-200/60" />
          <button data-magnetic type="button" className="md:col-span-2 px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold">
            Deploy Message
          </button>
        </form>
      </div>
    </Section>
  )
}
