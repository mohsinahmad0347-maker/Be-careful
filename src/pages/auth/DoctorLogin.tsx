import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { showToast } from '../../components/ui/Toast'
import Logo from '../../components/Logo'

export default function DoctorLogin() {
  const navigate = useNavigate()
  const { setUser } = useApp()
  const [email, setEmail] = useState('doctor@demo.com')
  const [password, setPassword] = useState('demo1234')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setUser({ id: 'd1', name: 'Dr. Sarah Mitchell', email, role: 'doctor', specialty: 'Cardiologist', verified: true })
    showToast('Welcome, Dr. Mitchell!', 'success')
    navigate('/doctor/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8"><Logo /></div>
        <div className="card shadow-xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-3">
              <Shield size={28} className="text-primary-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Doctor Portal</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to your professional dashboard</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-5 text-xs text-emerald-700">
            <strong>Demo:</strong> doctor@demo.com / demo1234
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl p-3 mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="doc-email" className="label">Email Address</label>
              <input id="doc-email" type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }}
                className="input" placeholder="doctor@hospital.com" autoComplete="email" />
            </div>
            <div>
              <label htmlFor="doc-password" className="label">Password</label>
              <div className="relative">
                <input id="doc-password" type={showPw ? 'text' : 'password'} value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  className="input pr-10" placeholder="Your password" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
              {loading ? 'Signing in…' : <span className="flex items-center justify-center gap-2"><LogIn size={16} /> Doctor Sign In</span>}
            </button>
          </form>

          <div className="mt-6 space-y-2 text-center text-sm">
            <p className="text-slate-500">
              New doctor?{' '}
              <Link to="/doctor/register" className="text-primary-600 font-semibold hover:underline">Join as Doctor</Link>
            </p>
            <p className="text-slate-400 text-xs">
              Are you a patient?{' '}
              <Link to="/login" className="text-primary-600 hover:underline">Patient Login →</Link>
            </p>
            <p className="text-slate-400 text-xs">
              Admin?{' '}
              <Link to="/admin/login" className="text-primary-600 hover:underline">Admin Login →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
