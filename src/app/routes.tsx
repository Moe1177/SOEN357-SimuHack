import { createBrowserRouter, useNavigate } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Simulation } from './pages/Simulation';
import { Learn } from './pages/Learn';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#050a12', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'monospace', color: '#22d3ee' }}>404</div>
      <p style={{ color: '#64748b' }}>Page not found</p>
      <button
        onClick={() => navigate('/')}
        style={{ padding: '10px 24px', borderRadius: '10px', background: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.3)', cursor: 'pointer' }}
      >
        Go Home
      </button>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'dashboard', Component: Dashboard },
      { path: 'simulation/:vulnId', Component: Simulation },
      { path: 'learn', Component: Learn },
      { path: '*', Component: NotFound },
    ],
  },
]);
