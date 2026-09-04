import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, UserPlus, Clock } from 'lucide-react'
import { showToast } from '../../components/ui/Toast'
import Logo from '../../components/Logo'
import { doctorSpecialties } from '../../data/demo'

export default function DoctorRegister() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({
    name: '', specialty: '', qualifications: '', experience: '',
    license: '', hospital: '', email: '', phone: '', password: '', confirm: '', consent: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const update = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name)           e.name           = 'Required'
    if (!form.specialty)      e.specialty      = 'Required'
    if (!form.qualifications) e.qualifications = 'Required'
    if (!form.email)          e.email          = 'Required'
    if (!form.password || form.password.length < 6) e.password = 'Min 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    if (!form.consent) e.consent = 'Required'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitted(true)
    showToast('Registration submitted. Verification pending.', 'info')
  }

  if (submitted) return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="card max-w-md text-center shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <Clock size={32} className="text-amber-500" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 mb-2">Verification Pending</h2>
        <p className="text-slate-500 text-sm mb-6">
          Thank you, <strong>{form.name}</strong>. Your registration has been submitted.
          Our team will review your credentials and credentials. You will be notified once your account is verified.
        </p>
        <div className="badge-orange inline-flex mb-6">⏳ Under Review</div>
        <div className="flex flex-col gap-2">
          <button onClick={() => navigate('/doctor/login')} className="btn-primary">Back to Doctor Login</button>
          <button onClick={() => navigate('/')} className="btn-ghost text-sm">Go to Home</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8"><Logo /></div>
        <div className="card shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-slate-900">Join as a Doctor</h1>
            <p className="text-slate-500 text-sm mt-1">Create your verified professional profile</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name</label>
                <input value={form.name} onChange={e => update('name', e.target.value)} className={`input ${errors.name ? 'border-red-400' : ''}`} placeholder="Dr. Jane Smith" />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="label">Specialty</label>
                <select value={form.specialty} onChange={e => update('specialty', e.target.value)} className={`input ${errors.specialty ? 'border-red-400' : ''}`}>
                  <option value="">Select specialty</option>
                  {doctorSpecialties.slice(1).map(s => <option key={s}>{s}</option>)}
                </select>
                {errors.specialty && <p className="text-xs text-red-500 mt-1">{errors.specialty}</p>}
              </div>
            </div>

            <div>
              <label className="label">Qualifications</label>
              <input value={form.qualifications} onChange={e => update('qualifications', e.target.value)} className={`input ${errors.qualifications ? 'border-red-400' : ''}`} placeholder="MBBS, MD (Cardiology)" />
              {errors.qualifications && <p className="text-xs text-red-500 mt-1">{errors.qualifications}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Years of Experience</label>
                <input type="number" min="0" value={form.experience} onChange={e => update('experience', e.target.value)} className="input" placeholder="e.g. 10" />
              </div>
              <div>
                <label className="label">License / PMC Number</label>
                <input value={form.license} onChange={e => update('license', e.target.value)} className="input" placeholder="PMC-XXXXX" />
              </div>
            </div>

            <div>
              <label className="label">Hospital / Clinic</label>
              <input value={form.hospital} onChange={e => update('hospital', e.target.value)} className="input" placeholder="City General Hospital" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Email</label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className={`input ${errors.email ? 'border-red-400' : ''}`} placeholder="doctor@hospital.com" />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="label">Phone</label>
                <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="input" placeholder="0300-0000000" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)}
                    className={`input pr-10 ${errors.password ? 'border-red-400' : ''}`} placeholder="Min 6 characters" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="label">Confirm Password</label>
                <input type="password" value={form.confirm} onChange={e => update('confirm', e.target.value)}
                  className={`input ${errors.confirm ? 'border-red-400' : ''}`} placeholder="Repeat password" />
                {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={form.consent} onChange={e => update('consent', e.target.checked)}
                className="mt-0.5 w-4 h-4 text-primary-600 rounded" />
              <span className="text-xs text-slate-600">
                I certify that the information provided is accurate and I agree to the{' '}
                <Link to="/terms" className="text-primary-600 underline">Terms of Service</Link>
              </span>
            </label>
            {errors.consent && <p className="text-xs text-red-500">{errors.consent}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
              {loading ? 'Submitting…' : <span className="flex items-center justify-center gap-2"><UserPlus size={16} /> Submit for Verification</span>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already registered?{' '}
            <Link to="/doctor/login" className="text-primary-600 font-semibold hover:underline">Doctor Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
