import { useNavigate } from 'react-router-dom'
import { MapPin, Phone, Mail, Calendar, Droplet, Edit2, Shield, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { appointments, medicalRecords } from '../data/demo'
import { StatusBadge } from '../components/ui/Badge'

export default function Profile() {
  const navigate = useNavigate()
  const { user } = useApp()

  const info = {
    dob: '1992-05-15', gender: 'Male', bloodGroup: 'O+', phone: '0300-1234567',
    location: 'Karachi, Pakistan', memberSince: '2026-01-01',
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="page-header">
        <h1 className="section-title">My Profile</h1>
        <p className="section-subtitle">Your personal health profile.</p>
      </div>

      {/* Profile hero card */}
      <div className="card bg-gradient-to-br from-primary-50 to-cyan-50 border-primary-100">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-black text-4xl shadow-lg">
              {user?.name?.charAt(0).toUpperCase() ?? 'P'}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors">
              <Edit2 size={14} />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-2xl font-extrabold text-slate-900">{user?.name ?? 'John Doe'}</h2>
              {user?.role === 'doctor' && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <Shield size={10} /> Verified Doctor
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm capitalize">{user?.role ?? 'Patient'}</p>
            <p className="text-slate-400 text-xs mt-0.5">{user?.email}</p>
            <div className="flex flex-wrap gap-3 mt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Mail size={11} />{user?.email}</span>
              <span className="flex items-center gap-1"><Phone size={11} />{info.phone}</span>
              <span className="flex items-center gap-1"><MapPin size={11} />{info.location}</span>
            </div>
          </div>
          <button onClick={() => navigate('/settings')} className="btn-secondary text-sm py-2">
            <Edit2 size={14} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Calendar size={16} className="text-primary-600" />, label: 'Date of Birth', value: info.dob, bg: 'bg-primary-50' },
          { icon: <Droplet size={16} className="text-red-500" />,       label: 'Blood Group',    value: info.bloodGroup, bg: 'bg-red-50' },
          { icon: <Shield size={16} className="text-emerald-600" />,   label: 'Member Since',   value: info.memberSince, bg: 'bg-emerald-50' },
          { icon: <Star size={16} className="text-amber-500" />,       label: 'Total Visits',   value: appointments.filter(a => a.status === 'completed').length, bg: 'bg-amber-50' },
        ].map(card => (
          <div key={card.label} className="card">
            <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>{card.icon}</div>
            <p className="text-xs text-slate-500">{card.label}</p>
            <p className="font-bold text-slate-800 text-lg">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent appointments */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800">Recent Appointments</h2>
          <button onClick={() => navigate('/appointments')} className="text-xs text-primary-600 hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {appointments.slice(0, 3).map(a => (
            <div key={a.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                <Calendar size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{a.doctorName}</p>
                <p className="text-xs text-slate-400">{a.date} · {a.specialty}</p>
              </div>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Recent records */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800">Medical Records</h2>
          <button onClick={() => navigate('/records')} className="text-xs text-primary-600 hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {medicalRecords.slice(0, 3).map(r => (
            <div key={r.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                {r.type.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{r.title}</p>
                <p className="text-xs text-slate-400">{r.date} · {r.doctor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
