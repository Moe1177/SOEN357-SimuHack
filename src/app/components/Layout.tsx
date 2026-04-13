import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { Shield, LayoutDashboard, FlaskConical, BookOpen, Home, Menu, X, ChevronRight, Terminal } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: false },
  { to: '/learn', label: 'Learn', icon: BookOpen, end: false },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050a12', color: '#e2e8f0' }}>
      {/* Top Nav */}
      <nav
        className="sticky top-0 z-50 border-b flex items-center justify-between px-4 md:px-8"
        style={{
          background: 'rgba(9, 14, 27, 0.95)',
          borderColor: 'rgba(34, 211, 238, 0.15)',
          backdropFilter: 'blur(12px)',
          height: '64px',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 group"
        >
          <div
            className="relative flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.4)' }}
          >
            <Shield size={18} style={{ color: '#22d3ee' }} />
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
              style={{ background: '#22d3ee', boxShadow: '0 0 6px #22d3ee' }}
            />
          </div>
          <span
            className="hidden sm:block"
            style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1.1rem', color: '#f1f5f9', letterSpacing: '0.05em' }}
          >
            Simu<span style={{ color: '#22d3ee' }}>Hack</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                    }
                  : { border: '1px solid transparent' }
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              color: '#fff',
              fontWeight: 600,
            }}
          >
            <Terminal size={14} />
            Run Scan
          </button>
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ border: '1px solid rgba(100,116,139,0.3)' }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden border-b px-4 py-3 flex flex-col gap-1"
          style={{ background: 'rgba(9, 14, 27, 0.98)', borderColor: 'rgba(34, 211, 238, 0.1)' }}
        >
          {navLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                  isActive ? 'text-cyan-300' : 'text-slate-400'
                }`
              }
              style={({ isActive }) =>
                isActive ? { background: 'rgba(6, 182, 212, 0.1)' } : {}
              }
            >
              <Icon size={16} />
              {label}
              <ChevronRight size={14} className="ml-auto opacity-50" />
            </NavLink>
          ))}
          <button
            onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm mt-1"
            style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.3)' }}
          >
            <Terminal size={16} />
            Run Scan
          </button>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="border-t px-6 py-8"
        style={{ borderColor: 'rgba(34, 211, 238, 0.1)', background: 'rgba(9, 14, 27, 0.8)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield size={16} style={{ color: '#22d3ee' }} />
            <span style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '0.875rem' }}>
              Simu<span style={{ color: '#22d3ee' }}>Hack</span> — Security Education Platform
            </span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.8rem' }}>
            For educational purposes only. Simulated scenarios. Not for production use.
          </p>
        </div>
      </footer>
    </div>
  );
}
