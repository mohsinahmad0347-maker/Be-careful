import { useState } from 'react'
import { User, Bell, Shield, Eye, EyeOff, Save, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Tabs from '../components/ui/Tabs'
import { showToast } from '../components/ui/Toast'

const tabs = [
  { id: 'account',     label: 'Account',     icon: <User size={15} /> },
  { id: 'preferences', label: 'Preferences', icon: <Bell size={15} /> },
  { id: 'security',    label: 'Security',    icon: <Shield size={15} /> },
]

export default function Settings() {
  const { user } = useApp()
  const [tab, setTab] = useState('account')
  const [showPw, setShowPw] = useState(false)
  const [name, setName]   = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState('0300-1234567')
  const [saved, setSaved] = useState(false)

  const [notifs, setNotifs] = useState({
    appointments: true, queue: true, messages: true,
    reports: true, reminders: true, announcements: false,
  })

  const handleSave = () => {
    setSaved(true)
    showToast('Settings saved successfully!', 'success')
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="page-header">
        <h1 className="section-title">Settings</h1>
        <p className="section-subtitle">Manage your account preferences and security settings.</p>
      </div>

      <Tabs tabs={tabs} active={tab} onChange={setTab} variant="pills" />

      {tab === 'account' && (
        <div className="card space-y-5">
          <h2 className="font-bold text-slate-800">Account Information</h2>
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-2xl">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{name}</p>
              <p className="text-sm text-slate-400 capitalize">{user?.role}</p>
              <button className="text-xs text-primary-600 mt-1 hover:underline">Change photo</button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="input" />
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} className="input" type="tel" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Email Address</label>
              <input value={email} onChange={e => setEmail(e.target.value)} className="input" type="email" />
            </div>
          </div>
          <button onClick={handleSave} className="btn-primary">
            {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
          </button>
        </div>
      )}

      {tab === 'preferences' && (
        <div className="card space-y-5">
          <h2 className="font-bold text-slate-800">Notification Preferences</h2>
          <div className="space-y-3">
            {Object.entries(notifs).map(([key, value]) => {
              const labels: Record<string, string> = {
                appointments: 'Appointment Reminders',
                queue:        'Queue Position Updates',
                messages:     'New Messages',
                reports:      'Report Availability',
                reminders:    'Medication Reminders',
                announcements:'Platform Announcements',
              }
              return (
                <label key={key} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0 cursor-pointer group">
                  <span className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors">{labels[key]}</span>
                  <div
                    onClick={() => setNotifs(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-primary-600' : 'bg-slate-200'}`}
                    role="switch" aria-checked={value}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-5.5' : 'translate-x-1'}`}
                      style={{ transform: value ? 'translateX(22px)' : 'translateX(4px)' }} />
                  </div>
                </label>
              )
            })}
          </div>
          <div>
            <label className="label">Language</label>
            <select className="input max-w-xs">
              <option value="en">English</option>
              <option value="ur">اردو (Urdu)</option>
            </select>
          </div>
          <button onClick={handleSave} className="btn-primary">
            {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Preferences</>}
          </button>
        </div>
      )}

      {tab === 'security' && (
        <div className="card space-y-5">
          <h2 className="font-bold text-slate-800">Security Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Current Password</label>
              <input type="password" className="input" placeholder="Enter current password" />
            </div>
            <div>
              <label className="label">New Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} className="input pr-10" placeholder="New password (min 6 characters)" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="label">Confirm New Password</label>
              <input type="password" className="input" placeholder="Repeat new password" />
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-3">Active Sessions</h3>
            <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600 flex items-center justify-between">
              <div>
                <p className="font-medium">Current Session</p>
                <p className="text-xs text-slate-400">Chrome on Windows · {new Date().toLocaleDateString()}</p>
              </div>
              <span className="badge-green">Active</span>
            </div>
          </div>
          <button onClick={handleSave} className="btn-primary">
            {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Update Password</>}
          </button>
        </div>
      )}
    </div>
  )
}
