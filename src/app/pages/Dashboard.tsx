import { useNavigate } from 'react-router';
import {
  Shield, AlertTriangle, AlertCircle, CheckCircle, Play,
  TrendingUp, Activity, Clock, Target, ChevronRight,
  Database, Code2, RefreshCw, Lock, FileWarning,
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { vulnerabilities, severityConfig } from '../data/vulnerabilities';

const metrics = [
  {
    label: 'Total Issues',
    value: 20,
    icon: Activity,
    color: '#f1f5f9',
    bg: 'rgba(241,245,249,0.06)',
    border: 'rgba(241,245,249,0.15)',
    sub: 'Across 5 categories',
  },
  {
    label: 'Critical Issues',
    value: 7,
    icon: AlertCircle,
    color: '#f87171',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.3)',
    sub: '2 categories affected',
  },
  {
    label: 'High Issues',
    value: 11,
    icon: AlertTriangle,
    color: '#fb923c',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.3)',
    sub: '2 categories affected',
  },
  {
    label: 'Medium Issues',
    value: 2,
    icon: Clock,
    color: '#facc15',
    bg: 'rgba(234,179,8,0.08)',
    border: 'rgba(234,179,8,0.3)',
    sub: '1 category affected',
  },
];

const radarData = [
  { subject: 'Injection', score: 20 },
  { subject: 'Auth', score: 35 },
  { subject: 'Data Security', score: 40 },
  { subject: 'Access Control', score: 55 },
  { subject: 'Config', score: 70 },
  { subject: 'Logging', score: 65 },
];

const vulnIcons: Record<string, React.ElementType> = {
  'sql-injection': Database,
  xss: Code2,
  csrf: RefreshCw,
  'insecure-auth': Lock,
  'sensitive-data': FileWarning,
};

const securityScore = 32;

function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const progress = circ - (score / 100) * circ;
  const color = score < 40 ? '#f87171' : score < 70 ? '#facc15' : '#34d399';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circ}
          strokeDashoffset={progress}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute text-center">
        <div style={{ fontSize: '2rem', fontWeight: 800, color, fontFamily: 'monospace', lineHeight: 1 }}>
          {score}
        </div>
        <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>SCORE</div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-8 py-10" style={{ background: '#050a12', minHeight: '100%' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-3"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#f87171',
                fontFamily: 'monospace',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              LIVE SCAN RESULTS
            </div>
            <h1 style={{ color: '#f1f5f9', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.2 }}>
              Security Dashboard
            </h1>
            <p style={{ color: '#64748b', marginTop: '6px', fontSize: '0.9rem' }}>
              Simulated scan of <span style={{ color: '#22d3ee', fontFamily: 'monospace' }}>example-app.dev</span> — 5 vulnerability categories detected
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm"
            style={{
              background: 'rgba(13, 22, 38, 0.8)',
              border: '1px solid rgba(30, 58, 95, 0.6)',
              color: '#64748b',
              fontFamily: 'monospace',
            }}
          >
            <Target size={14} style={{ color: '#22d3ee' }} />
            Last scanned: <span style={{ color: '#94a3b8' }}>just now</span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl"
              style={{ background: m.bg, border: `1px solid ${m.border}` }}
            >
              <div className="flex items-center justify-between mb-3">
                <m.icon size={18} style={{ color: m.color }} />
                <TrendingUp size={13} style={{ color: m.color, opacity: 0.5 }} />
              </div>
              <div
                style={{
                  fontSize: '2.25rem',
                  fontWeight: 800,
                  color: m.color,
                  fontFamily: 'monospace',
                  lineHeight: 1,
                }}
              >
                {m.value}
              </div>
              <div style={{ color: '#f1f5f9', fontWeight: 600, marginTop: '6px', fontSize: '0.875rem' }}>
                {m.label}
              </div>
              <div style={{ color: '#475569', fontSize: '0.75rem', marginTop: '2px' }}>{m.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Radar + Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Radar Chart */}
          <div
            className="lg:col-span-2 p-6 rounded-xl"
            style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}
          >
            <h2 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: '4px' }}>
              Security Posture Radar
            </h2>
            <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: '16px' }}>
              Coverage scores across OWASP security domains
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData} cx="50%" cy="50%">
                <PolarGrid stroke="rgba(34,211,238,0.08)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0d1626',
                    border: '1px solid rgba(34,211,238,0.2)',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                    fontSize: '0.8rem',
                  }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#22d3ee"
                  fill="rgba(34,211,238,0.1)"
                  strokeWidth={2}
                  dot={{ fill: '#22d3ee', r: 3 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Score Card */}
          <div
            className="p-6 rounded-xl flex flex-col items-center justify-center gap-4"
            style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}
          >
            <div>
              <h2 style={{ color: '#f1f5f9', fontWeight: 600, textAlign: 'center', marginBottom: '2px' }}>
                Security Score
              </h2>
              <p style={{ color: '#475569', fontSize: '0.8rem', textAlign: 'center' }}>
                Overall posture rating
              </p>
            </div>
            <ScoreRing score={securityScore} />
            <div
              className="w-full px-4 py-3 rounded-lg text-center"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <div style={{ color: '#f87171', fontWeight: 700, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                POOR — Immediate Action Required
              </div>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '2px' }}>
                Multiple critical vulnerabilities found
              </div>
            </div>
          </div>
        </div>

        {/* Vulnerability List */}
        <div>
          <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px' }}>
            Detected Vulnerabilities
          </h2>
          <div className="flex flex-col gap-4">
            {vulnerabilities.map((vuln, i) => {
              const cfg = severityConfig[vuln.severity];
              const Icon = vulnIcons[vuln.id] || Shield;

              return (
                <motion.div
                  key={vuln.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="p-5 rounded-xl flex flex-col md:flex-row md:items-center gap-4"
                  style={{
                    background: 'rgba(13,22,38,0.8)',
                    border: `1px solid rgba(30,58,95,0.6)`,
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = cfg.border;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(30,58,95,0.6)';
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                  >
                    <Icon size={20} style={{ color: cfg.hex }} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{vuln.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${cfg.color}`}
                        style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                      >
                        {vuln.severity}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          background: 'rgba(100,116,139,0.1)',
                          color: '#64748b',
                          border: '1px solid rgba(100,116,139,0.2)',
                          fontFamily: 'monospace',
                        }}
                      >
                        OWASP {vuln.owasp}
                      </span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5 }}>
                      {vuln.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {vuln.affectedComponents.map((c) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{
                            background: 'rgba(34,211,238,0.05)',
                            color: '#64748b',
                            border: '1px solid rgba(34,211,238,0.1)',
                            fontFamily: 'monospace',
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Instances */}
                  <div className="text-center flex-shrink-0">
                    <div
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        fontFamily: 'monospace',
                        color: cfg.hex,
                      }}
                    >
                      {vuln.instances}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.75rem' }}>instances</div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigate(`/simulation/${vuln.id}`)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm flex-shrink-0 transition-all hover:opacity-90 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  >
                    <Play size={14} />
                    Simulate
                    <ChevronRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}