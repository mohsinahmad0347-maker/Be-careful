import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { showToast } from '../../components/ui/Toast'
import Logo from '../../components/Logo'

export default function PatientLogin() {
  const navigate = useNavigate()
  const { setUser } = useApp()
  const [email, setEmail] = useState('patient@demo.com')
  const [password, setPassword] = useState('demo1234')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!email)    e.email    = 'Email is required'
    if (!password) e.password = 'Password is required'
    if (email && !/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address'
    return e
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setUser({ id: 'p1', name: 'John Doe', email, role: 'patient' })
    showToast('Welcome back, John!', 'success')
    navigate('/patient/dashboard')
  }

  const demoLogin = () => {
    setEmail('patient@demo.com')
    setPassword('demo1234')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="card shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-slate-900">Patient Login</h1>
            <p className="text-slate-500 text-sm mt-1">Access your personal health dashboard</p>
          </div>

          {/* Demo notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-5 text-xs text-blue-700 flex items-start gap-2">
            <Shield size={14} className="shrink-0 mt-0.5" />
            <span>
              <strong>Demo Mode:</strong> Use <code>patient@demo.com</code> / <code>demo1234</code> or{' '}
              <button onClick={demoLogin} className="font-semibold underline">click here to fill</button>.
            </span>
          </div>

          <form onSubmit={handleLogin} noValidate className="space-y-4">
            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <input
                id="email" type="email" autoComplete="email"
                value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
                className={`input ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                placeholder="you@email.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <p id="email-error" className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="label mb-0">Password</label>
                <button type="button" className="text-xs text-primary-600 hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  id="password" type={showPw ? 'text' : 'password'} autoComplete="current-password"
                  value={password} onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })) }}
                  className={`input pr-10 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="Your password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center gap-2">
              <input id="remember" type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" />
              <label htmlFor="remember" className="text-sm text-slate-600">Remember me</label>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2"><LogIn size={16} /> Sign In</span>
              )}
            </button>
          </form>

          <div className="mt-6 space-y-3 text-center text-sm">
            <p className="text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 font-semibold hover:underline">Create Account</Link>
            </p>
            <p className="text-slate-400 text-xs">
              Are you a doctor?{' '}
              <Link to="/doctor/login" className="text-primary-600 hover:underline">Doctor Login →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
