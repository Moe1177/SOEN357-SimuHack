import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ChevronLeft, AlertTriangle, CheckCircle, XCircle, ShieldCheck,
  Terminal, Code2, Zap, Eye, EyeOff, AlertCircle, Shield,
  ArrowRight, Lock, Database, RefreshCw, FileWarning,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { vulnerabilities, severityConfig } from '../data/vulnerabilities';

/* ─── Shared Helpers ─── */
function TabBar({ tabs, active, onChange }: { tabs: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => onChange(i)}
          className="flex-1 py-2 px-3 rounded-lg text-sm transition-all duration-200"
          style={
            active === i
              ? { background: 'rgba(6,182,212,0.15)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.3)', fontWeight: 600 }
              : { color: '#64748b', border: '1px solid transparent' }
          }
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function CodeBlock({ code, highlight }: { code: string; highlight?: boolean }) {
  return (
    <pre
      className="p-4 rounded-lg overflow-x-auto text-xs"
      style={{
        background: highlight ? 'rgba(239,68,68,0.08)' : 'rgba(0,0,0,0.4)',
        border: `1px solid ${highlight ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.06)'}`,
        fontFamily: 'monospace',
        color: highlight ? '#fca5a5' : '#94a3b8',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {code}
    </pre>
  );
}

function VulnBadge({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}
    >
      <AlertTriangle size={11} />
      {text}
    </span>
  );
}

function FixBadge({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
      style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399' }}
    >
      <CheckCircle size={11} />
      {text}
    </span>
  );
}

function InfoBox({ type, title, children }: { type: 'danger' | 'warning' | 'fix'; title: string; children: React.ReactNode }) {
  const styles = {
    danger: { bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.25)', icon: <XCircle size={16} style={{ color: '#f87171' }} />, titleColor: '#f87171' },
    warning: { bg: 'rgba(234,179,8,0.06)', border: 'rgba(234,179,8,0.25)', icon: <AlertTriangle size={16} style={{ color: '#facc15' }} />, titleColor: '#facc15' },
    fix: { bg: 'rgba(52,211,153,0.06)', border: 'rgba(52,211,153,0.25)', icon: <ShieldCheck size={16} style={{ color: '#34d399' }} />, titleColor: '#34d399' },
  };
  const s = styles[type];
  return (
    <div className="p-4 rounded-xl" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      <div className="flex items-center gap-2 mb-2" style={{ color: s.titleColor, fontWeight: 600, fontSize: '0.9rem' }}>
        {s.icon}
        {title}
      </div>
      <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

/* ─── SQL Injection Simulation ─── */
function SQLInjectionSim() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<null | 'success_attack' | 'success_legit' | 'failed'>(null);
  const [showQuery, setShowQuery] = useState(false);
  const [tab, setTab] = useState(0);

  const queryPreview = `SELECT * FROM users
WHERE username = '${username || 'input'}'
AND password = '${password || 'input'}';`;

  const isInjection = username.includes("'") || username.toLowerCase().includes(' or ') || username.includes('--') || username.includes('/*');

  const handleLogin = () => {
    setShowQuery(true);
    if (isInjection) {
      setResult('success_attack');
    } else if (username === 'admin' && password === 'password123') {
      setResult('success_legit');
    } else {
      setResult('failed');
    }
  };

  const injectPayload = () => {
    setUsername("admin' --");
    setPassword('anything');
    setResult(null);
    setShowQuery(false);
  };

  const reset = () => { setUsername(''); setPassword(''); setResult(null); setShowQuery(false); };

  return (
    <div>
      <TabBar tabs={['Live Demo', 'How to Fix']} active={tab} onChange={setTab} />

      {tab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="p-6 rounded-xl" style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#f1f5f9', fontWeight: 600 }}>Login Form</h3>
              <VulnBadge text="Vulnerable" />
            </div>

            {/* Mock browser bar */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-5" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#f87171', opacity: 0.7 }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#facc15', opacity: 0.7 }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#4ade80', opacity: 0.7 }} />
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#475569' }}>http://example-app.dev/login</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#94a3b8' }}>Username</label>
                <input
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setResult(null); setShowQuery(false); }}
                  placeholder="Enter username..."
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: `1px solid ${isInjection && username ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    color: isInjection && username ? '#fca5a5' : '#f1f5f9',
                    fontFamily: isInjection ? 'monospace' : undefined,
                  }}
                />
                {isInjection && username && (
                  <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: '#f87171' }}>
                    <AlertTriangle size={11} /> Injection payload detected!
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#94a3b8' }}>Password</label>
                <input
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setResult(null); setShowQuery(false); }}
                  type="password"
                  placeholder="Enter password..."
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                  style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9' }}
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full py-3 rounded-lg transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#06b6d4,#0284c7)', color: '#fff', fontWeight: 600 }}
              >
                Sign In
              </button>
            </div>

            <div className="mt-4 pt-4 border-t flex gap-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <button onClick={injectPayload}
                className="flex-1 py-2.5 rounded-lg text-sm transition-all hover:opacity-90"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', fontWeight: 600 }}>
                <Zap size={13} style={{ display: 'inline', marginRight: '6px' }} /> Try Attack
              </button>
              <button onClick={reset}
                className="py-2.5 px-4 rounded-lg text-sm"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b', border: '1px solid rgba(255,255,255,0.08)' }}>
                Reset
              </button>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 p-4 rounded-xl"
                  style={{
                    background: result === 'failed' ? 'rgba(100,116,139,0.1)' : result === 'success_attack' ? 'rgba(239,68,68,0.1)' : 'rgba(52,211,153,0.1)',
                    border: `1px solid ${result === 'failed' ? 'rgba(100,116,139,0.3)' : result === 'success_attack' ? 'rgba(239,68,68,0.4)' : 'rgba(52,211,153,0.4)'}`,
                  }}>
                  {result === 'success_attack' && (
                    <>
                      <div className="flex items-center gap-2 mb-1" style={{ color: '#f87171', fontWeight: 700 }}>
                        <AlertCircle size={16} /> ATTACK SUCCESSFUL
                      </div>
                      <p style={{ color: '#fca5a5', fontSize: '0.85rem' }}>Authentication bypassed! Logged in as <strong>admin</strong> without a valid password. All user data is now accessible.</p>
                    </>
                  )}
                  {result === 'success_legit' && (
                    <>
                      <div className="flex items-center gap-2 mb-1" style={{ color: '#34d399', fontWeight: 700 }}>
                        <CheckCircle size={16} /> Login Successful
                      </div>
                      <p style={{ color: '#6ee7b7', fontSize: '0.85rem' }}>Welcome back, admin! (But this form is still vulnerable to SQL injection.)</p>
                    </>
                  )}
                  {result === 'failed' && (
                    <div className="flex items-center gap-2" style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      <XCircle size={14} /> Invalid credentials. Try the attack payload instead!
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: SQL Query */}
          <div className="p-6 rounded-xl" style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
            <h3 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: '16px' }}>SQL Query Preview</h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '16px' }}>
              This is the raw SQL query being sent to the database. Watch it change as you type.
            </p>
            <CodeBlock code={queryPreview} highlight={isInjection && username.length > 0} />

            {showQuery && isInjection && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
                <div className="p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', fontFamily: 'monospace', fontSize: '0.8rem', color: '#fca5a5' }}>
                  ⚡ Interpreted as: SELECT * FROM users WHERE username = 'admin' -- AND password = 'anything'
                  <br /><span style={{ color: '#64748b' }}>// Everything after -- is commented out! Password check is skipped.</span>
                </div>
                <InfoBox type="danger" title="Why This Works">
                  The <code style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '3px' }}>--</code> sequence in SQL starts a comment, disabling the rest of the query. The attacker never needs a valid password.
                </InfoBox>
              </motion.div>
            )}

            <div className="mt-5 space-y-3">
              <InfoBox type="warning" title="Root Cause">
                User input is directly concatenated into the SQL string without sanitization or parameterization.
              </InfoBox>
            </div>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3"><VulnBadge text="Vulnerable Code" /></div>
            <CodeBlock highlight code={`// ❌ VULNERABLE: String concatenation
const query = "SELECT * FROM users 
  WHERE username = '" + username + "'
  AND password = '" + password + "'";

db.query(query);`} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3"><FixBadge text="Secure Code" /></div>
            <CodeBlock code={`// ✅ SECURE: Parameterized queries
const query = \`SELECT * FROM users 
  WHERE username = ? 
  AND password = ?\`;

db.query(query, [username, password]);
// Parameters are escaped automatically`} />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <InfoBox type="fix" title="How to Fix SQL Injection">
              Always use <strong>parameterized queries</strong> (also called prepared statements). The database driver
              separates data from code, so user input can never be interpreted as SQL syntax. Also use an ORM
              like Sequelize or Prisma which handles this automatically.
            </InfoBox>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Use parameterized queries / prepared statements', 'Apply input validation & allowlisting', 'Use an ORM or query builder'].map((tip) => (
                <div key={tip} className="p-3 rounded-lg flex items-start gap-2.5" style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
                  <CheckCircle size={14} style={{ color: '#34d399', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── XSS Simulation ─── */
function XSSSim() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>(['Great tutorial, really helpful!', 'I learned a lot from this.']);
  const [alertVisible, setAlertVisible] = useState(false);
  const [tab, setTab] = useState(0);

  const hasScript = comment.toLowerCase().includes('<script') || comment.toLowerCase().includes('onerror') || comment.toLowerCase().includes('onload') || comment.toLowerCase().includes('javascript:');

  const submitComment = () => {
    if (!comment.trim()) return;
    if (hasScript) {
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    }
    setComments((prev) => [...prev, comment]);
    setComment('');
  };

  const injectXSS = () => {
    setComment(`<img src="x" onerror="alert('XSS! Cookies: ' + document.cookie)">`);
  };

  return (
    <div>
      <TabBar tabs={['Live Demo', 'How to Fix']} active={tab} onChange={setTab} />
      {tab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl" style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#f1f5f9', fontWeight: 600 }}>Comment Section</h3>
              <VulnBadge text="Vulnerable" />
            </div>

            <AnimatePresence>
              {alertVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-4 p-4 rounded-xl text-center"
                  style={{ background: 'rgba(239,68,68,0.15)', border: '2px solid rgba(239,68,68,0.5)', boxShadow: '0 0 30px rgba(239,68,68,0.2)' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⚠️</div>
                  <div style={{ fontFamily: 'monospace', color: '#fca5a5', fontWeight: 700 }}>SIMULATED BROWSER ALERT</div>
                  <div style={{ color: '#fca5a5', fontSize: '0.85rem', marginTop: '4px', fontFamily: 'monospace' }}>
                    XSS! Cookies stolen: session=abc123xyz...
                  </div>
                  <div style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '8px' }}>
                    In a real attack, your session cookie would be sent to the attacker's server.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none mb-3"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: `1px solid ${hasScript ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
                color: hasScript ? '#fca5a5' : '#f1f5f9',
                fontFamily: hasScript ? 'monospace' : undefined,
              }}
            />
            {hasScript && (
              <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: '#f87171' }}>
                <AlertTriangle size={11} /> Malicious script detected in input!
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={submitComment}
                className="flex-1 py-2.5 rounded-lg text-sm transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#06b6d4,#0284c7)', color: '#fff', fontWeight: 600 }}>
                Post Comment
              </button>
              <button
                onClick={injectXSS}
                className="py-2.5 px-4 rounded-lg text-sm transition-all hover:opacity-90"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', fontWeight: 600 }}>
                <Zap size={13} style={{ display: 'inline', marginRight: '4px' }} /> Attack
              </button>
            </div>
          </div>

          <div className="p-6 rounded-xl" style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
            <h3 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: '16px' }}>Rendered Comments (Vulnerable)</h3>
            <div className="space-y-3">
              {comments.map((c, i) => (
                <div key={i} className="p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'rgba(6,182,212,0.2)', color: '#22d3ee' }}>U</div>
                    <span style={{ color: '#64748b', fontSize: '0.75rem' }}>User_{i + 1}</span>
                  </div>
                  {c.startsWith('<') ? (
                    <div style={{ color: '#fca5a5', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      ⚠️ INJECTED: {c}
                    </div>
                  ) : (
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{c}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              <InfoBox type="danger" title="What Just Happened?">
                The comment was rendered as raw HTML. An <code style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '3px' }}>onerror</code> attribute on an image tag executes JavaScript — stealing cookies, redirecting users, or performing actions on their behalf.
              </InfoBox>
            </div>
          </div>
        </div>
      )}
      {tab === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-3"><VulnBadge text="Vulnerable Code" /></div>
            <CodeBlock highlight code={`// ❌ VULNERABLE: Rendering raw HTML
<div dangerouslySetInnerHTML={{ 
  __html: userComment 
}} />`} />
          </div>
          <div>
            <div className="mb-3"><FixBadge text="Secure Code" /></div>
            <CodeBlock code={`// ✅ SECURE: Escape & sanitize
import DOMPurify from 'dompurify';

// Option 1: Use text content only (no HTML)
<p>{userComment}</p>

// Option 2: Sanitize if HTML is needed
<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userComment)
}} />`} />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <InfoBox type="fix" title="How to Fix XSS">
              Never render user input as raw HTML. Use React's default text rendering which automatically escapes content.
              If HTML is required, use a sanitization library like <strong>DOMPurify</strong>. Also implement a
              Content Security Policy (CSP) header to restrict script sources.
            </InfoBox>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["Always escape user-generated content", "Use DOMPurify for HTML sanitization", "Set Content-Security-Policy headers"].map((tip) => (
                <div key={tip} className="p-3 rounded-lg flex items-start gap-2.5" style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
                  <CheckCircle size={14} style={{ color: '#34d399', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── CSRF Simulation ─── */
function CSRFSim() {
  const [tab, setTab] = useState(0);
  const [attackFired, setAttackFired] = useState(false);
  const [amount, setAmount] = useState('500');
  const [recipient, setRecipient] = useState('alice@bank.com');

  const fireAttack = () => {
    setAttackFired(true);
    setTimeout(() => setAttackFired(false), 4000);
  };

  return (
    <div>
      <TabBar tabs={['Live Demo', 'How to Fix']} active={tab} onChange={setTab} />
      {tab === 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Legitimate page */}
            <div className="p-6 rounded-xl" style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ color: '#f1f5f9', fontWeight: 600 }}>Your Bank App</h3>
                <VulnBadge text="No CSRF Token" />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded mb-5" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Lock size={11} style={{ color: '#4ade80' }} />
                <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#475569' }}>https://mybank.com/transfer</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: '#94a3b8' }}>Transfer To</label>
                  <input value={recipient} onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9' }} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: '#94a3b8' }}>Amount ($)</label>
                  <input value={amount} onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9' }} />
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.06)', border: '1px dashed rgba(239,68,68,0.3)' }}>
                  <p style={{ color: '#f87171', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    ⚠️ Missing: &lt;input type="hidden" name="_csrf" value="..."&gt;
                  </p>
                </div>
                <button className="w-full py-2.5 rounded-lg" style={{ background: 'linear-gradient(135deg,#06b6d4,#0284c7)', color: '#fff', fontWeight: 600 }}>
                  Send Transfer
                </button>
              </div>
            </div>

            {/* Malicious page */}
            <div className="p-6 rounded-xl" style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ color: '#f87171', fontWeight: 600 }}>Attacker's Website</h3>
                <span className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>MALICIOUS</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded mb-5" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#f87171' }}>⚠️ http://evil-site.com/free-prize</span>
              </div>
              <div className="p-4 rounded-lg mb-4 text-center" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎉</div>
                <p style={{ color: '#f1f5f9', fontWeight: 600 }}>You Won a Free Prize!</p>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>Click below to claim your reward</p>
              </div>
              <CodeBlock highlight code={`<!-- Hidden form auto-submits! -->
<form action="https://mybank.com/transfer"
  method="POST" id="csrf-attack">
  <input name="to" value="attacker@evil.com"/>
  <input name="amount" value="9999"/>
</form>
<script>
  document.getElementById('csrf-attack').submit();
</script>`} />
              <button onClick={fireAttack}
                className="w-full mt-4 py-2.5 rounded-lg transition-all hover:opacity-90"
                style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)', fontWeight: 700 }}>
                <Zap size={13} style={{ display: 'inline', marginRight: '6px' }} /> Simulate CSRF Attack
              </button>
            </div>
          </div>

          <AnimatePresence>
            {attackFired && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="p-5 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.4)', boxShadow: '0 0 30px rgba(239,68,68,0.15)' }}>
                <div className="flex items-center gap-2 mb-2" style={{ color: '#f87171', fontWeight: 700 }}>
                  <AlertCircle size={18} /> CSRF ATTACK EXECUTED
                </div>
                <p style={{ color: '#fca5a5', fontSize: '0.9rem' }}>
                  The victim's browser sent a POST request to <code style={{ fontFamily: 'monospace' }}>mybank.com/transfer</code> with <strong>to=attacker@evil.com&amp;amount=9999</strong>.
                  Because the user was already logged in, the bank accepted the request. $9,999 transferred without the user's consent!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <InfoBox type="danger" title="Why CSRF Works">
            The browser automatically includes session cookies with every request to a domain, even if the request originates from a different website. Without a secret CSRF token, the server cannot distinguish a legitimate request from a forged one.
          </InfoBox>
        </div>
      )}
      {tab === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-3"><VulnBadge text="Vulnerable (No Token)" /></div>
            <CodeBlock highlight code={`<!-- ❌ VULNERABLE: No CSRF protection -->
<form action="/transfer" method="POST">
  <input name="to" value="alice@bank.com"/>
  <input name="amount" value="500"/>
  <button type="submit">Transfer</button>
</form>`} />
          </div>
          <div>
            <div className="mb-3"><FixBadge text="Secure (With Token)" /></div>
            <CodeBlock code={`<!-- ✅ SECURE: CSRF token included -->
<form action="/transfer" method="POST">
  <input type="hidden" 
    name="_csrf" 
    value="{{ csrfToken }}" />
  <input name="to" value="alice@bank.com"/>
  <input name="amount" value="500"/>
  <button type="submit">Transfer</button>
</form>

// Server validates token on every 
// state-changing request`} />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <InfoBox type="fix" title="How to Fix CSRF">
              Use <strong>CSRF tokens</strong> — unique, secret, per-session values included in every state-changing request.
              The server validates this token; since the malicious site can't read the token (due to Same-Origin Policy), it can't forge a valid request.
              Also use <strong>SameSite cookies</strong> (<code style={{ fontFamily: 'monospace', fontSize: '0.8em' }}>SameSite=Strict</code> or <code style={{ fontFamily: 'monospace', fontSize: '0.8em' }}>Lax</code>).
            </InfoBox>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Use synchronizer CSRF tokens in all forms', 'Set SameSite=Strict on session cookies', 'Validate Origin/Referer headers server-side'].map((tip) => (
                <div key={tip} className="p-3 rounded-lg flex items-start gap-2.5" style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
                  <CheckCircle size={14} style={{ color: '#34d399', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Insecure Auth Simulation ─── */
function InsecureAuthSim() {
  const [tab, setTab] = useState(0);
  const [showPass, setShowPass] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [bruteForcing, setBruteForcing] = useState(false);
  const [bruteResult, setBruteResult] = useState<string | null>(null);
  const [password, setPassword] = useState('pass');

  const weaknesses = [
    { label: 'Password visible in URL', active: true },
    { label: 'No rate limiting', active: attempts > 5 },
    { label: 'Weak password accepted', active: password.length < 8 },
    { label: 'No MFA available', active: true },
    { label: 'Session token is predictable', active: true },
  ];

  const startBruteForce = () => {
    setBruteForcing(true);
    setBruteResult(null);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setAttempts((a) => a + 1);
      if (count >= 12) {
        clearInterval(interval);
        setBruteForcing(false);
        setBruteResult('Access granted after 12 attempts! Password was: "pass"');
      }
    }, 250);
  };

  return (
    <div>
      <TabBar tabs={['Live Demo', 'How to Fix']} active={tab} onChange={setTab} />
      {tab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl" style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#f1f5f9', fontWeight: 600 }}>Insecure Login Form</h3>
              <VulnBadge text="Multiple Flaws" />
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#fca5a5', wordBreak: 'break-all' }}>
                http://app.dev/login?user=admin&amp;<span style={{ background: 'rgba(239,68,68,0.3)', padding: '0 2px', borderRadius: '2px' }}>password={password}</span>
              </span>
            </div>
            <p style={{ color: '#f87171', fontSize: '0.75rem', marginBottom: '16px' }}>
              ⚠️ Password exposed in URL — visible in browser history, server logs, and referrer headers!
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: '#94a3b8' }}>Password</label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPass ? 'text' : 'password'}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none pr-10"
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      border: `1px solid ${password.length < 8 ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      color: '#f1f5f9',
                    }}
                  />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5" style={{ color: '#64748b' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {password.length < 8 && (
                  <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '4px' }}>
                    ⚠️ Password too short — accepted anyway!
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs" style={{ color: '#64748b' }}>
                <span>Login attempts: <span style={{ color: attempts > 5 ? '#f87171' : '#94a3b8', fontWeight: 700 }}>{attempts}</span></span>
                {attempts > 5 && <span style={{ color: '#f87171' }}>⚠️ No lockout!</span>}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setAttempts((a) => a + 1)}
                  className="flex-1 py-2.5 rounded-lg transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg,#06b6d4,#0284c7)', color: '#fff', fontWeight: 600 }}>
                  Login Attempt
                </button>
                <button
                  onClick={startBruteForce}
                  disabled={bruteForcing}
                  className="py-2.5 px-4 rounded-lg text-sm flex items-center gap-1.5 transition-all hover:opacity-90"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', fontWeight: 600 }}>
                  <Zap size={13} /> {bruteForcing ? 'Forcing...' : 'Brute Force'}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {bruteResult && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mt-4 p-4 rounded-xl"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)' }}>
                  <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.875rem' }}>⚡ {bruteResult}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 rounded-xl" style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
            <h3 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: '16px' }}>Detected Weaknesses</h3>
            <div className="space-y-3">
              {weaknesses.map((w) => (
                <div key={w.label} className="flex items-center gap-3 p-3 rounded-lg"
                  style={{
                    background: w.active ? 'rgba(239,68,68,0.06)' : 'rgba(52,211,153,0.04)',
                    border: `1px solid ${w.active ? 'rgba(239,68,68,0.2)' : 'rgba(52,211,153,0.15)'}`,
                  }}>
                  {w.active
                    ? <XCircle size={15} style={{ color: '#f87171', flexShrink: 0 }} />
                    : <CheckCircle size={15} style={{ color: '#34d399', flexShrink: 0 }} />
                  }
                  <span style={{ color: w.active ? '#fca5a5' : '#6ee7b7', fontSize: '0.85rem' }}>{w.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              <InfoBox type="danger" title="Brute Force Attack">
                Without rate limiting or account lockout, an attacker can try thousands of password combinations per second until they find the correct one.
              </InfoBox>
            </div>
          </div>
        </div>
      )}
      {tab === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-3"><VulnBadge text="Vulnerable Practices" /></div>
            <CodeBlock highlight code={`// ❌ GET request exposes password in URL
app.get('/login', (req, res) => {
  const { username, password } = req.query;
  // password now in server logs, history!
  
  // ❌ Plaintext password comparison
  if (password === storedPassword) { ... }
  
  // ❌ No rate limiting
  // ❌ No account lockout
  // ❌ No MFA support
});`} />
          </div>
          <div>
            <div className="mb-3"><FixBadge text="Secure Practices" /></div>
            <CodeBlock code={`// ✅ POST + HTTPS only, bcrypt hashing
app.post('/login', rateLimiter, async (req, res) => {
  const { username, password } = req.body;
  
  // ✅ Compare hashed passwords
  const valid = await bcrypt.compare(
    password, 
    user.hashedPassword
  );
  
  // ✅ Rate limiting via middleware
  // ✅ TOTP-based MFA on sensitive accounts
  // ✅ Secure session tokens (UUID/crypto)
});`} />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <InfoBox type="fix" title="How to Fix Insecure Authentication">
              Use <strong>POST over HTTPS</strong> for login forms, <strong>bcrypt/argon2</strong> for password hashing,
              implement <strong>rate limiting</strong> and <strong>account lockout</strong> to prevent brute force,
              and require <strong>MFA</strong> for sensitive accounts.
            </InfoBox>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Always use HTTPS & POST', 'Hash with bcrypt/argon2', 'Rate limit + lockout', 'Enforce MFA'].map((tip) => (
                <div key={tip} className="p-3 rounded-lg flex items-start gap-2" style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
                  <CheckCircle size={14} style={{ color: '#34d399', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Sensitive Data Exposure Simulation ─── */
function SensitiveDataSim() {
  const [tab, setTab] = useState(0);
  const [showRaw, setShowRaw] = useState(true);
  const [intercepting, setIntercepting] = useState(false);
  const [intercepted, setIntercepted] = useState(false);

  const rawResponse = `{
  "user": {
    "id": 1042,
    "name": "Jane Smith",
    "email": "jane.smith@email.com",
    "password": "sunshine123",
    "credit_card": "4532-1234-5678-9012",
    "cvv": "372",
    "ssn": "123-45-6789",
    "dob": "1990-04-15",
    "address": "123 Main St, Austin TX",
    "balance": "$12,450.00"
  }
}`;

  const secureResponse = `{
  "user": {
    "id": 1042,
    "name": "Jane Smith",
    "email": "ja****@email.com",
    "credit_card": "**** **** **** 9012",
    "balance": "$12,450.00"
    // Sensitive fields omitted:
    // password: [HASHED, never returned]
    // ssn: [ENCRYPTED, never in API]
    // cvv: [Never stored]
  }
}`;

  const startIntercept = () => {
    setIntercepting(true);
    setTimeout(() => {
      setIntercepting(false);
      setIntercepted(true);
    }, 2000);
  };

  return (
    <div>
      <TabBar tabs={['Live Demo', 'How to Fix']} active={tab} onChange={setTab} />
      {tab === 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl" style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ color: '#f1f5f9', fontWeight: 600 }}>API Response</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowRaw(!showRaw)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
                    style={{ background: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.2)' }}>
                    <Code2 size={11} /> {showRaw ? 'Vulnerable' : 'Secure'} View
                  </button>
                  {showRaw ? <VulnBadge text="Exposed" /> : <FixBadge text="Protected" />}
                </div>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '12px', fontFamily: 'monospace' }}>
                GET /api/user/profile
              </p>
              <CodeBlock code={showRaw ? rawResponse : secureResponse} highlight={showRaw} />
            </div>

            <div className="p-6 rounded-xl" style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
              <h3 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: '16px' }}>Network Interceptor</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '16px' }}>
                An attacker on an unsecured network (e.g., public WiFi) can intercept API traffic sent over HTTP instead of HTTPS.
              </p>

              <div className="p-4 rounded-lg mb-4" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                <div style={{ color: '#64748b', marginBottom: '6px' }}>NETWORK TRAFFIC</div>
                <div style={{ color: '#f87171' }}>Protocol: <span style={{ color: '#fca5a5' }}>HTTP (unencrypted)</span></div>
                <div style={{ color: '#f87171' }}>Endpoint: <span style={{ color: '#fca5a5' }}>http://app.dev/api/user</span></div>
                <div style={{ color: '#94a3b8' }}>
                  Status:{' '}
                  {intercepting
                    ? <span style={{ color: '#facc15' }}>INTERCEPTING...</span>
                    : intercepted
                      ? <span style={{ color: '#f87171' }}>DATA CAPTURED</span>
                      : 'Waiting...'
                  }
                </div>
              </div>

              <button
                onClick={startIntercept}
                disabled={intercepting}
                className="w-full py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', fontWeight: 600 }}>
                <Zap size={13} /> {intercepting ? 'Intercepting...' : 'Intercept Traffic'}
              </button>

              <AnimatePresence>
                {intercepted && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <div style={{ color: '#f87171', fontWeight: 700, marginBottom: '6px' }}>
                      ⚡ Data Intercepted!
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#fca5a5', lineHeight: 1.6 }}>
                      password: "sunshine123"<br />
                      credit_card: "4532-1234-5678-9012"<br />
                      ssn: "123-45-6789"<br />
                      cvv: "372"
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🔑', label: 'Plaintext Password', desc: 'Password stored and returned in plain text. Any data breach exposes all accounts.' },
              { icon: '💳', label: 'Full Card Number', desc: 'PCI-DSS prohibits storing full card numbers. CVV must never be stored.' },
              { icon: '🪪', label: 'SSN Exposed', desc: 'Social security numbers should be encrypted at rest and never returned via API.' },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ color: '#f87171', fontWeight: 600, fontSize: '0.875rem', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-3"><VulnBadge text="Vulnerable" /></div>
            <CodeBlock highlight code={`// ❌ Returning raw sensitive data
app.get('/api/user/:id', async (req, res) => {
  const user = await db.findUser(req.params.id);
  
  // Returns EVERYTHING including:
  // passwords, card numbers, SSN, etc.
  res.json(user);
});

// ❌ HTTP not HTTPS
// ❌ No field filtering
// ❌ No encryption at rest`} />
          </div>
          <div>
            <div className="mb-3"><FixBadge text="Secure" /></div>
            <CodeBlock code={`// ✅ Return only necessary fields
app.get('/api/user/:id', auth, async (req, res) => {
  const user = await db.findUser(req.params.id);
  
  // Only expose safe fields
  res.json({
    id: user.id,
    name: user.name,
    email: maskEmail(user.email),
    card_last4: user.card.slice(-4),
    // Never return: password, CVV, SSN
  });
});

// ✅ Force HTTPS with HSTS headers
// ✅ Encrypt sensitive DB columns
// ✅ Hash passwords with bcrypt`} />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <InfoBox type="fix" title="How to Fix Sensitive Data Exposure">
              Apply the <strong>principle of least exposure</strong>: only return data that the client actually needs.
              Encrypt sensitive fields at rest using AES-256, always use <strong>HTTPS/TLS</strong>,
              hash passwords with bcrypt/argon2, and mask data in API responses (e.g., show only last 4 digits of card).
            </InfoBox>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Use HTTPS everywhere', 'Hash all passwords', 'Encrypt sensitive DB fields', 'Mask data in API responses'].map((tip) => (
                <div key={tip} className="p-3 rounded-lg flex items-start gap-2" style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
                  <CheckCircle size={14} style={{ color: '#34d399', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Simulation Router ─── */
const simComponents: Record<string, React.FC> = {
  'sql-injection': SQLInjectionSim,
  xss: XSSSim,
  csrf: CSRFSim,
  'insecure-auth': InsecureAuthSim,
  'sensitive-data': SensitiveDataSim,
};

const simIcons: Record<string, React.ElementType> = {
  'sql-injection': Database,
  xss: Code2,
  csrf: RefreshCw,
  'insecure-auth': Lock,
  'sensitive-data': FileWarning,
};

export function Simulation() {
  const { vulnId } = useParams<{ vulnId: string }>();
  const navigate = useNavigate();
  const vuln = vulnerabilities.find((v) => v.id === vulnId);
  const SimComponent = vulnId ? simComponents[vulnId] : null;

  if (!vuln || !SimComponent) {
    return (
      <div className="flex flex-col items-center justify-center py-32" style={{ background: '#050a12' }}>
        <Shield size={40} style={{ color: '#22d3ee', marginBottom: '16px' }} />
        <h1 style={{ color: '#f1f5f9', marginBottom: '8px' }}>Simulation not found</h1>
        <button onClick={() => navigate('/dashboard')} className="mt-4 px-6 py-2.5 rounded-lg"
          style={{ background: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.3)' }}>
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const cfg = severityConfig[vuln.severity];
  const Icon = simIcons[vuln.id] || Shield;

  return (
    <div className="px-4 md:px-8 py-10" style={{ background: '#050a12', minHeight: '100%' }}>
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-sm mb-8 transition-colors hover:opacity-80"
          style={{ color: '#64748b' }}>
          <ChevronLeft size={16} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="p-6 rounded-xl mb-8" style={{ background: 'rgba(13,22,38,0.8)', border: '1px solid rgba(30,58,95,0.6)' }}>
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
              <Icon size={26} style={{ color: cfg.hex }} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 style={{ color: '#f1f5f9', fontSize: '1.5rem', fontWeight: 700 }}>{vuln.name}</h1>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold"
                  style={{ background: cfg.bg, color: cfg.hex, border: `1px solid ${cfg.border}` }}>
                  {vuln.severity}
                </span>
                <span className="px-2 py-1 rounded text-xs"
                  style={{ background: 'rgba(100,116,139,0.1)', color: '#64748b', border: '1px solid rgba(100,116,139,0.2)', fontFamily: 'monospace' }}>
                  OWASP {vuln.owasp}
                </span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{vuln.description}</p>
            </div>
            <div className="text-center flex-shrink-0 px-6 py-4 rounded-xl"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'monospace', color: cfg.hex }}>{vuln.instances}</div>
              <div style={{ color: '#475569', fontSize: '0.75rem' }}>instances found</div>
            </div>
          </div>
        </div>

        {/* Sim Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', color: '#22d3ee', fontSize: '0.8rem' }}>
            <Terminal size={13} />
            Interactive Simulation
          </div>
          <ArrowRight size={14} style={{ color: '#475569' }} />
          <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Interact with the vulnerable component below</span>
        </div>

        {/* Simulation */}
        <SimComponent />

        {/* Navigation */}
        <div className="mt-10 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(30,58,95,0.5)' }}>
          <button onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all hover:opacity-80"
            style={{ color: '#64748b', border: '1px solid rgba(100,116,139,0.2)', background: 'rgba(255,255,255,0.03)' }}>
            <ChevronLeft size={14} /> All Vulnerabilities
          </button>
          <div className="flex gap-2 flex-wrap justify-center">
            {vulnerabilities.filter((v) => v.id !== vulnId).slice(0, 3).map((v) => {
              const c = severityConfig[v.severity];
              return (
                <button key={v.id} onClick={() => navigate(`/simulation/${v.id}`)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all hover:opacity-80"
                  style={{ background: c.bg, color: c.hex, border: `1px solid ${c.border}` }}>
                  {v.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
