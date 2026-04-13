import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  BookOpen, Play, Clock, CheckCircle, Lock, ChevronRight,
  Code2, Shield, Database, RefreshCw, FileWarning, Zap,
  GraduationCap, Search, Star, ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

interface Module {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
  icon: React.ElementType;
  color: string;
  locked: boolean;
  completed?: boolean;
}

const modules: Module[] = [
  {
    id: 'web-security-101',
    title: 'Web Security Fundamentals',
    subtitle: 'Start here — the building blocks of web application security',
    duration: '25 min',
    level: 'Beginner',
    topics: ['What is web security?', 'CIA Triad explained', 'Threat actors & attack vectors', 'Security by design'],
    icon: Shield,
    color: '#22d3ee',
    locked: false,
    completed: true,
  },
  {
    id: 'owasp-top10',
    title: 'OWASP Top 10 Overview',
    subtitle: 'The most critical web application security risks',
    duration: '35 min',
    level: 'Beginner',
    topics: ['Broken Access Control', 'Cryptographic Failures', 'Injection attacks', 'Security Misconfigurations'],
    icon: Zap,
    color: '#f59e0b',
    locked: false,
    completed: true,
  },
  {
    id: 'injection-attacks',
    title: 'Injection Attacks Deep Dive',
    subtitle: 'SQL, NoSQL, Command, and LDAP injection explained',
    duration: '40 min',
    level: 'Intermediate',
    topics: ['SQL injection mechanics', 'Parameterized queries', 'NoSQL injection', 'Input sanitization'],
    icon: Database,
    color: '#f87171',
    locked: false,
  },
  {
    id: 'xss-guide',
    title: 'Cross-Site Scripting (XSS)',
    subtitle: 'Reflected, Stored, and DOM-based XSS attacks',
    duration: '30 min',
    level: 'Intermediate',
    topics: ['Reflected vs Stored XSS', 'DOM manipulation', 'CSP headers', 'DOMPurify usage'],
    icon: Code2,
    color: '#a78bfa',
    locked: false,
  },
  {
    id: 'auth-best-practices',
    title: 'Authentication Best Practices',
    subtitle: 'Building secure login systems that withstand attacks',
    duration: '45 min',
    level: 'Intermediate',
    topics: ['Password hashing (bcrypt)', 'Rate limiting', 'MFA implementation', 'JWT security'],
    icon: Lock,
    color: '#34d399',
    locked: false,
  },
  {
    id: 'csrf-protection',
    title: 'CSRF & Session Management',
    subtitle: 'Protecting against cross-site request forgery',
    duration: '25 min',
    level: 'Intermediate',
    topics: ['CSRF mechanics', 'Token-based protection', 'SameSite cookies', 'Session hijacking'],
    icon: RefreshCw,
    color: '#fb923c',
    locked: false,
  },
  {
    id: 'data-security',
    title: 'Data Encryption & Privacy',
    subtitle: 'How to properly protect sensitive user data',
    duration: '40 min',
    level: 'Advanced',
    topics: ['AES-256 encryption', 'HTTPS/TLS', 'PCI-DSS compliance', 'GDPR considerations'],
    icon: FileWarning,
    color: '#38bdf8',
    locked: true,
  },
  {
    id: 'security-headers',
    title: 'Security Headers & CSP',
    subtitle: 'Browser security controls via HTTP headers',
    duration: '30 min',
    level: 'Advanced',
    topics: ['Content Security Policy', 'HSTS', 'X-Frame-Options', 'Permissions-Policy'],
    icon: Shield,
    color: '#818cf8',
    locked: true,
  },
];

const videos = [
  {
    id: 'v1',
    title: 'SQL Injection Explained in 5 Minutes',
    channel: 'SimuHack Academy',
    duration: '5:24',
    thumbnail: 'database',
    color: '#f87171',
    views: '12.4K',
  },
  {
    id: 'v2',
    title: 'How XSS Attacks Work (Live Demo)',
    channel: 'SimuHack Academy',
    duration: '8:47',
    thumbnail: 'code',
    color: '#a78bfa',
    views: '9.8K',
  },
  {
    id: 'v3',
    title: 'OWASP Top 10 — Complete Walkthrough',
    channel: 'SimuHack Academy',
    duration: '24:15',
    thumbnail: 'shield',
    color: '#22d3ee',
    views: '31.2K',
  },
  {
    id: 'v4',
    title: 'Setting Up Authentication Securely',
    channel: 'SimuHack Academy',
    duration: '18:03',
    thumbnail: 'lock',
    color: '#34d399',
    views: '7.6K',
  },
];

const levelConfig: Record<string, { color: string; bg: string; border: string }> = {
  Beginner: { color: 'text-emerald-400', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.25)' },
  Intermediate: { color: 'text-amber-400', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.25)' },
  Advanced: { color: 'text-red-400', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
};

function VideoThumbnail({ color, icon }: { color: string; icon: string }) {
  const icons: Record<string, React.ElementType> = { database: Database, code: Code2, shield: Shield, lock: Lock };
  const Icon = icons[icon] || Shield;
  return (
    <div className="relative w-full aspect-video rounded-xl flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${color}18 0%, rgba(5,10,18,0.8) 100%)`, border: `1px solid ${color}30` }}>
      <Icon size={32} style={{ color, opacity: 0.4 }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
          style={{ background: 'rgba(0,0,0,0.6)', border: `2px solid ${color}`, boxShadow: `0 0 20px ${color}40` }}>
          <Play size={18} style={{ color, marginLeft: '2px' }} />
        </div>
      </div>
      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-xs" style={{ background: 'rgba(0,0,0,0.7)', color: '#f1f5f9', fontFamily: 'monospace' }}>
        SIMULATED
      </div>
    </div>
  );
}

export function Learn() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('All');

  const completedCount = modules.filter((m) => m.completed).length;
  const progress = Math.round((completedCount / modules.length) * 100);

  const filteredModules = modules.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchLevel = filterLevel === 'All' || m.level === filterLevel;
    return matchSearch && matchLevel;
  });

  return (
    <div className="px-4 md:px-8 py-10" style={{ background: '#050a12', minHeight: '100%' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4"
            style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa' }}>
            <GraduationCap size={12} />
            Learning Center
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 style={{ color: '#f1f5f9', fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px' }}>
                Security Learning Path
              </h1>
              <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '520px' }}>
                Build your cybersecurity knowledge from the ground up. Each module prepares you for the next,
                combining theory with hands-on simulations.
              </p>
            </div>

            {/* Progress */}
            <div className="p-5 rounded-xl flex-shrink-0"
              style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)', minWidth: '200px' }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Your Progress</span>
                <span style={{ color: '#22d3ee', fontWeight: 700, fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {completedCount}/{modules.length}
                </span>
              </div>
              <div className="w-full h-2 rounded-full mb-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', boxShadow: '0 0 10px rgba(6,182,212,0.4)' }} />
              </div>
              <p style={{ color: '#475569', fontSize: '0.75rem' }}>{progress}% complete</p>
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search modules..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)', color: '#f1f5f9' }}
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button key={level} onClick={() => setFilterLevel(level)}
                className="px-3 py-2.5 rounded-xl text-sm transition-all"
                style={filterLevel === level
                  ? { background: 'rgba(6,182,212,0.15)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.3)', fontWeight: 600 }
                  : { background: 'rgba(13,22,38,0.8)', color: '#64748b', border: '1px solid rgba(30,58,95,0.5)' }}>
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <section className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredModules.map((mod, i) => {
              const lc = levelConfig[mod.level];
              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-6 rounded-xl relative overflow-hidden group cursor-pointer transition-all duration-200"
                  style={{
                    background: 'rgba(13,22,38,0.8)',
                    border: mod.completed ? '1px solid rgba(52,211,153,0.2)' : '1px solid rgba(30,58,95,0.6)',
                    opacity: mod.locked ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!mod.locked) (e.currentTarget as HTMLElement).style.borderColor = `${mod.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = mod.completed ? 'rgba(52,211,153,0.2)' : 'rgba(30,58,95,0.6)';
                  }}
                >
                  {mod.completed && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle size={18} style={{ color: '#34d399' }} />
                    </div>
                  )}
                  {mod.locked && (
                    <div className="absolute top-4 right-4">
                      <Lock size={16} style={{ color: '#475569' }} />
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${mod.color}18`, border: `1px solid ${mod.color}40` }}>
                      <mod.icon size={20} style={{ color: mod.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: '4px', paddingRight: '24px' }}>
                        {mod.title}
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.5 }}>{mod.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mod.topics.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs"
                        style={{ background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'monospace' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${lc.color}`}
                        style={{ background: lc.bg, border: `1px solid ${lc.border}` }}>
                        {mod.level}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: '#475569' }}>
                        <Clock size={11} /> {mod.duration}
                      </span>
                    </div>

                    {!mod.locked && (
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-90"
                        style={{ background: mod.completed ? 'rgba(52,211,153,0.1)' : `${mod.color}18`, color: mod.completed ? '#34d399' : mod.color, border: `1px solid ${mod.completed ? 'rgba(52,211,153,0.25)' : `${mod.color}35`}`, fontWeight: 600 }}>
                        {mod.completed ? <><CheckCircle size={11} /> Review</> : <><Play size={11} /> Start</>}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem', marginBottom: '4px' }}>
                Video Tutorials
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Watch and learn — visual breakdowns of key security concepts
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {videos.map((v, i) => (
              <motion.div key={v.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl overflow-hidden"
                style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
                <VideoThumbnail color={v.color} icon={v.thumbnail} />
                <div className="p-4">
                  <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.875rem', marginBottom: '6px', lineHeight: 1.4 }}>
                    {v.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#475569', fontSize: '0.75rem' }}>{v.views} views</span>
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b', fontFamily: 'monospace' }}>
                      <Clock size={10} /> {v.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick References */}
        <section>
          <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem', marginBottom: '6px' }}>
            Quick Reference Guides
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '20px' }}>
            Cheat sheets and key resources to bookmark
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🗂️', title: 'OWASP Top 10 Cheat Sheet', desc: 'Quick reference for the 10 most critical risks', badge: 'PDF' },
              { icon: '🔐', title: 'Password Security Checklist', desc: 'Everything you need to implement secure auth', badge: 'Checklist' },
              { icon: '🛡️', title: 'Security Headers Guide', desc: 'Every HTTP security header and when to use it', badge: 'Reference' },
            ].map((r) => (
              <div key={r.title}
                className="p-5 rounded-xl cursor-pointer transition-all group hover:border-cyan-500/30"
                style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
                <div className="text-2xl mb-3">{r.icon}</div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.9rem' }}>{r.title}</h3>
                  <span className="px-1.5 py-0.5 rounded text-xs"
                    style={{ background: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.2)', fontFamily: 'monospace' }}>
                    {r.badge}
                  </span>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>{r.desc}</p>
                <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: '#22d3ee' }}>
                  <BookOpen size={12} /> View Resource <ArrowRight size={11} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA to Dashboard */}
        <div className="mt-14 p-8 rounded-2xl text-center"
          style={{ background: 'linear-gradient(135deg,rgba(6,182,212,0.08),rgba(2,132,199,0.05))', border: '1px solid rgba(6,182,212,0.2)' }}>
          <GraduationCap size={32} style={{ color: '#22d3ee', margin: '0 auto 12px' }} />
          <h2 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: '8px' }}>
            Ready to test your knowledge?
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
            Head to the dashboard and launch an interactive simulation to see vulnerabilities in action.
          </p>
          <button onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#06b6d4,#0284c7)', color: '#fff', fontWeight: 700 }}>
            <Zap size={16} /> Go to Dashboard <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
