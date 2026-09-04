import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { showToast } from '../../components/ui/Toast'
import Logo from '../../components/Logo'

export default function PatientRegister() {
  const navigate = useNavigate()
  const { setUser } = useApp()
  const [form, setForm] = useState({ name: '', email: '', phone: '', dob: '', gender: '', password: '', confirm: '', consent: false })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (field: string, value: string | boolean) =>
    setForm(f => ({ ...f, [field]: value }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name)     e.name     = 'Full name is required'
    if (!form.email)    e.email    = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone)    e.phone    = 'Phone is required'
    if (!form.password) e.password = 'Password is required'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    if (!form.consent)  e.consent  = 'You must agree to the Privacy Policy'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setUser({ id: 'p_new', name: form.name, email: form.email, role: 'patient' })
    showToast('Account created! Welcome to BE CAREFUL.', 'success')
    navigate('/patient/dashboard')
  }

  const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) => (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8"><Logo /></div>
        <div className="card shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-slate-900">Create Patient Account</h1>
            <p className="text-slate-500 text-sm mt-1">Join BE CAREFUL to manage your healthcare journey</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field id="name" label="Full Name" error={errors.name}>
                <input id="name" type="text" value={form.name} onChange={e => update('name', e.target.value)}
                  className={`input ${errors.name ? 'border-red-400' : ''}`} placeholder="John Doe" autoComplete="name" />
              </Field>
              <Field id="phone" label="Phone Number" error={errors.phone}>
                <input id="phone" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                  className={`input ${errors.phone ? 'border-red-400' : ''}`} placeholder="0300-1234567" autoComplete="tel" />
              </Field>
            </div>

            <Field id="email" label="Email Address" error={errors.email}>
              <input id="email" type="email" value={form.email} onChange={e => update('email', e.target.value)}
                className={`input ${errors.email ? 'border-red-400' : ''}`} placeholder="you@email.com" autoComplete="email" />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field id="dob" label="Date of Birth">
                <input id="dob" type="date" value={form.dob} onChange={e => update('dob', e.target.value)} className="input" />
              </Field>
              <Field id="gender" label="Gender">
                <select id="gender" value={form.gender} onChange={e => update('gender', e.target.value)} className="input">
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Prefer not to say</option>
                </select>
              </Field>
            </div>

            <Field id="password" label="Password" error={errors.password}>
              <div className="relative">
                <input id="password" type={showPw ? 'text' : 'password'} value={form.password}
                  onChange={e => update('password', e.target.value)}
                  className={`input pr-10 ${errors.password ? 'border-red-400' : ''}`}
                  placeholder="Minimum 6 characters" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            <Field id="confirm" label="Confirm Password" error={errors.confirm}>
              <input id="confirm" type="password" value={form.confirm} onChange={e => update('confirm', e.target.value)}
                className={`input ${errors.confirm ? 'border-red-400' : ''}`} placeholder="Repeat your password" autoComplete="new-password" />
            </Field>

            <div className="space-y-1">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={form.consent} onChange={e => update('consent', e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" />
                <span className="text-sm text-slate-600">
                  I agree to the{' '}
                  <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link> and{' '}
                  <Link to="/terms" className="text-primary-600 hover:underline">Terms & Conditions</Link>
                </span>
              </label>
              {errors.consent && <p className="text-xs text-red-500 pl-6">{errors.consent}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
              {loading ? 'Creating Account…' : <span className="flex items-center justify-center gap-2"><UserPlus size={16} /> Create Account</span>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
