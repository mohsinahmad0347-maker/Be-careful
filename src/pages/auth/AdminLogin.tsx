import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { showToast } from '../../components/ui/Toast'
import Logo from '../../components/Logo'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { setUser } = useApp()
  const [email, setEmail] = useState('admin@demo.com')
  const [password, setPassword] = useState('admin1234')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setUser({ id: 'admin1', name: 'Admin User', email, role: 'admin' })
    showToast('Welcome to Admin Panel', 'success')
    navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8"><Logo /></div>
        <div className="card shadow-xl border-slate-200">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck size={28} className="text-slate-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Administrator Login</h1>
            <p className="text-slate-500 text-sm mt-1">Restricted access — authorized personnel only</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-5 text-xs text-slate-600">
            <strong>Demo:</strong> admin@demo.com / admin1234
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Admin Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="admin@domain.com" />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="input pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 bg-slate-800 hover:bg-slate-900 disabled:opacity-60">
              {loading ? 'Authenticating…' : <span className="flex items-center justify-center gap-2"><LogIn size={16} /> Admin Sign In</span>}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-slate-400 space-y-1">
            <p><Link to="/login" className="hover:text-primary-600">← Patient Login</Link></p>
            <p><Link to="/doctor/login" className="hover:text-primary-600">Doctor Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
