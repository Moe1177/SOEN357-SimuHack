import { useNavigate } from 'react-router';
import {
  Shield, Zap, Eye, BookOpen, ArrowRight, CheckCircle,
  Terminal, Lock, AlertTriangle, Search, Code2, GraduationCap,
  ChevronRight, Play
} from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Eye,
    title: 'Visualize Vulnerabilities',
    description: 'See security flaws highlighted in real-time as they appear in actual code components.',
    color: '#22d3ee',
  },
  {
    icon: Zap,
    title: 'Interactive Simulations',
    description: 'Run live attack scenarios and observe exactly how exploits work — safely, in a controlled environment.',
    color: '#f59e0b',
  },
  {
    icon: BookOpen,
    title: 'Learn to Mitigate',
    description: 'Every vulnerability comes with clear, actionable steps to fix the issue in your own projects.',
    color: '#a78bfa',
  },
  {
    icon: Code2,
    title: 'Real Code Examples',
    description: 'Compare vulnerable and secure code side by side so you know exactly what to change.',
    color: '#34d399',
  },
];

const steps = [
  {
    step: '01',
    title: 'Explore the Dashboard',
    description: 'Get an overview of all detected vulnerability categories with severity ratings and affected component counts.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Launch a Simulation',
    description: 'Select a vulnerability and open its dedicated interactive demo environment.',
    icon: Play,
  },
  {
    step: '03',
    title: 'Try the Attack',
    description: 'Interact with the vulnerable component. Enter payloads, trigger attacks, and see what breaks.',
    icon: Terminal,
  },
  {
    step: '04',
    title: 'Learn the Fix',
    description: 'Read the explanation, see the secure code alternative, and understand how to prevent it.',
    icon: Lock,
  },
];

const stats = [
  { label: 'Vulnerability Scenarios', value: '5+' },
  { label: 'Interactive Simulations', value: '15+' },
  { label: 'OWASP Categories', value: '5' },
  { label: 'Mitigation Guides', value: '20+' },
];

export function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#050a12' }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 md:px-8 py-20 md:py-32">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8"
              style={{
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: '#22d3ee',
                fontFamily: 'monospace',
              }}
            >
              <AlertTriangle size={13} />
              Interactive Cybersecurity Education Platform
            </div>

            <h1
              className="mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: '#f1f5f9',
                letterSpacing: '-0.02em',
              }}
            >
              Learn Security by{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #22d3ee 0%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Simulating Attacks
              </span>
            </h1>

            <p
              className="max-w-2xl mx-auto mb-10"
              style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7 }}
            >
              SimuHack transforms confusing cybersecurity concepts into hands-on interactive
              experiences. Visualize vulnerabilities, run real attack simulations, and learn
              exactly how to protect your applications.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
                }}
              >
                <Terminal size={18} />
                Start Scanning
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/learn')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl transition-all duration-200 hover:opacity-80"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: '#cbd5e1',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: '1px solid rgba(100,116,139,0.3)',
                }}
              >
                <GraduationCap size={18} />
                Learn First
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        className="border-y py-8 px-4"
        style={{ borderColor: 'rgba(34,211,238,0.1)', background: 'rgba(9, 14, 27, 0.6)' }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#22d3ee',
                  fontFamily: 'monospace',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 md:px-8 py-20" style={{ background: '#050a12' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              style={{ fontSize: '2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '12px' }}
            >
              Why SimuHack?
            </h2>
            <p style={{ color: '#64748b', maxWidth: '560px', margin: '0 auto' }}>
              Security documentation is boring. We built an interactive playground that makes
              understanding vulnerabilities intuitive and unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(13, 22, 38, 0.8)',
                  border: '1px solid rgba(30, 58, 95, 0.6)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}40` }}
                >
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <h3 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: '8px' }}>
                  {f.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="px-4 md:px-8 py-20"
        style={{ background: 'rgba(9, 14, 27, 0.6)', borderTop: '1px solid rgba(34,211,238,0.08)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '12px' }}>
              How It Works
            </h2>
            <p style={{ color: '#64748b', maxWidth: '520px', margin: '0 auto' }}>
              Four simple steps from knowing nothing to confidently fixing vulnerabilities in your own applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-xl"
                style={{
                  background: 'rgba(13, 22, 38, 0.7)',
                  border: '1px solid rgba(30, 58, 95, 0.5)',
                }}
              >
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'rgba(6, 182, 212, 0.08)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                    }}
                  >
                    <s.icon size={20} style={{ color: '#22d3ee' }} />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      color: '#22d3ee',
                      fontWeight: 700,
                      marginBottom: '4px',
                    }}
                  >
                    STEP {s.step}
                  </div>
                  <h3 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: '6px' }}>
                    {s.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {s.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 md:px-8 py-20" style={{ background: '#050a12' }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl p-10 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(2,132,199,0.08) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, rgba(6,182,212,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(2,132,199,0.1) 0%, transparent 50%)',
              }}
            />
            <div className="relative">
              <Shield
                size={40}
                style={{ color: '#22d3ee', margin: '0 auto 16px', display: 'block' }}
              />
              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#f1f5f9',
                  marginBottom: '12px',
                }}
              >
                Ready to hack (safely)?
              </h2>
              <p style={{ color: '#94a3b8', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>
                Jump into the dashboard and start exploring the 5 pre-built vulnerability
                scenarios. No setup required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl transition-all hover:opacity-90 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #0284c7)',
                    color: '#fff',
                    fontWeight: 700,
                    boxShadow: '0 0 30px rgba(6,182,212,0.3)',
                  }}
                >
                  <Terminal size={18} />
                  Open Dashboard
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => navigate('/learn')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl transition-all hover:opacity-80"
                  style={{
                    color: '#22d3ee',
                    border: '1px solid rgba(6,182,212,0.4)',
                    background: 'rgba(6,182,212,0.05)',
                    fontWeight: 600,
                  }}
                >
                  <BookOpen size={18} />
                  Browse Learn
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
