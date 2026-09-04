import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar, Users, CheckCircle, Clock, MessageSquare,
  Activity, ArrowRight,
  PhoneCall, SkipForward, RotateCcw, Stethoscope,
} from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { useApp } from '../../context/AppContext'
import StatCard from '../../components/ui/StatCard'
import { StatusBadge } from '../../components/ui/Badge'
import { showToast } from '../../components/ui/Toast'
import { appointments, patients, messagesData, monthlyAppointmentsData } from '../../data/demo'

const patientDistData = [
  { name: 'New',      value: 12, color: '#2578ea' },
  { name: 'Follow-up', value: 24, color: '#10b981' },
  { name: 'Referral',  value: 6,  color: '#f59e0b' },
]

const weeklyData = [
  { day: 'Mon', patients: 8 },
  { day: 'Tue', patients: 12 },
  { day: 'Wed', patients: 7 },
  { day: 'Thu', patients: 15 },
  { day: 'Fri', patients: 10 },
  { day: 'Sat', patients: 5 },
]

const queuePatients = [
  { number: 'A-021', name: 'Amina Malik',  status: 'In Consultation', age: 28 },
  { number: 'A-022', name: 'Tariq Hassan', status: 'Waiting',         age: 52 },
  { number: 'A-023', name: 'Sara Ahmed',   status: 'Waiting',         age: 22 },
  { number: 'A-024', name: 'John Doe',     status: 'Waiting',         age: 34 },
  { number: 'A-025', name: 'Hina Qureshi', status: 'Waiting',         age: 38 },
]

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

export default function DoctorDashboard() {
  const navigate = useNavigate()
  const { user } = useApp()
  const [currentQueue, setCurrentQueue] = useState(0)
  const [consultStatus, setConsultStatus] = useState<'idle' | 'called' | 'consulting'>('idle')
  const firstName = user?.name?.split(' ')[0] ?? 'Doctor'

  const callNext = () => {
    setConsultStatus('called')
    showToast(`Patient ${queuePatients[currentQueue]?.number} called.`, 'info')
  }
  const startConsult = () => {
    setConsultStatus('consulting')
    showToast('Consultation started.', 'success')
  }
  const complete = () => {
    setCurrentQueue(q => Math.min(q + 1, queuePatients.length - 1))
    setConsultStatus('idle')
    showToast('Consultation completed.', 'success')
  }
  const skipPatient = () => {
    setCurrentQueue(q => Math.min(q + 1, queuePatients.length - 1))
    setConsultStatus('idle')
    showToast('Patient skipped.', 'warning')
  }
  const recall = () => {
    setConsultStatus('called')
    showToast('Patient recalled.', 'info')
  }

  const current = queuePatients[currentQueue]

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary-700 to-cyan-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-primary-200 text-sm">{now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <h1 className="text-2xl font-extrabold mt-1">{greeting}, {firstName} 👋</h1>
            <p className="text-primary-100 text-sm mt-1">You have <strong>{appointments.filter(a => a.status === 'upcoming' || a.status === 'confirmed').length}</strong> appointments today.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => navigate('/appointments')} className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-sm font-medium transition-colors">
              <Calendar size={15} /> Today's Schedule
            </button>
            <button onClick={() => navigate('/messages')} className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-sm font-medium transition-colors">
              <MessageSquare size={15} /> Messages
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Today's Appointments" value="8"  icon={<Calendar  size={20} className="text-primary-600" />} iconBg="bg-primary-50"  change={10} changeLabel="vs yesterday" />
        <StatCard title="Waiting Patients"      value={queuePatients.filter(p => p.status === 'Waiting').length}    icon={<Clock      size={20} className="text-amber-600" />}   iconBg="bg-amber-50" />
        <StatCard title="Completed Today"       value="3"  icon={<CheckCircle size={20} className="text-emerald-600" />} iconBg="bg-emerald-50" change={20} changeLabel="vs yesterday" />
        <StatCard title="Pending Requests"      value="5"  icon={<Activity  size={20} className="text-rose-600" />}    iconBg="bg-rose-50"    subtitle="awaiting review" />
        <StatCard title="Total Patients"        value={patients.length} icon={<Users size={20} className="text-purple-600" />} iconBg="bg-purple-50" change={8} changeLabel="this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Queue Management */}
        <div className="card lg:col-span-1">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users size={16} className="text-primary-600" /> Patient Queue
          </h2>
          {/* Current patient */}
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-4">
            <p className="text-xs text-slate-500 font-medium mb-1">Current Patient</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {current?.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800">{current?.name}</p>
                <p className="text-xs text-slate-500">{current?.number} · Age {current?.age}</p>
              </div>
              <span className={`ml-auto text-xs font-semibold px-2 py-1 rounded-full ${
                consultStatus === 'consulting' ? 'bg-emerald-100 text-emerald-700'
                : consultStatus === 'called' ? 'bg-amber-100 text-amber-700'
                : 'bg-slate-100 text-slate-600'
              }`}>
                {consultStatus === 'consulting' ? 'In Session' : consultStatus === 'called' ? 'Called' : 'Waiting'}
              </span>
            </div>
          </div>
          {/* Queue controls */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button onClick={callNext} disabled={consultStatus === 'consulting'}
              className="flex items-center justify-center gap-1.5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors">
              <PhoneCall size={14} /> Call Patient
            </button>
            <button onClick={startConsult} disabled={consultStatus !== 'called'}
              className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors">
              <Stethoscope size={14} /> Start Consult
            </button>
            <button onClick={complete} disabled={consultStatus !== 'consulting'}
              className="flex items-center justify-center gap-1.5 py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors">
              <CheckCircle size={14} /> Complete
            </button>
            <button onClick={skipPatient}
              className="flex items-center justify-center gap-1.5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold transition-colors">
              <SkipForward size={14} /> Skip
            </button>
          </div>
          <button onClick={recall} className="w-full flex items-center justify-center gap-1.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-medium transition-colors">
            <RotateCcw size={13} /> Recall Patient
          </button>

          {/* Queue list */}
          <div className="mt-4 space-y-1.5">
            {queuePatients.map((p, i) => (
              <div key={p.number} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${i === currentQueue ? 'bg-primary-50' : 'bg-slate-50'}`}>
                <span className={`font-bold text-xs w-12 ${i === currentQueue ? 'text-primary-700' : 'text-slate-500'}`}>{p.number}</span>
                <span className={`flex-1 font-medium ${i === currentQueue ? 'text-primary-800' : 'text-slate-700'}`}>{p.name}</span>
                <StatusBadge status={i === currentQueue && consultStatus === 'consulting' ? 'active' : p.status.toLowerCase().replace(' ', '_') === 'in_consultation' ? 'active' : 'waiting'} />
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-4 lg:col-span-2">
          {/* Weekly patients bar */}
          <div className="card">
            <h2 className="font-bold text-slate-800 mb-4">This Week's Patients</h2>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weeklyData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="patients" fill="#2578ea" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Patient distribution donut */}
          <div className="card">
            <h2 className="font-bold text-slate-800 mb-4">Patient Distribution</h2>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={patientDistData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                    {patientDistData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {patientDistData.map(d => (
                  <div key={d.name} className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-600">{d.name}</span>
                    <span className="font-bold text-slate-800 ml-auto">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's schedule + recent patients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Today's Schedule</h2>
            <button onClick={() => navigate('/appointments')} className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              Full Schedule <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {appointments.slice(0, 4).map(apt => (
              <div key={apt.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="text-center w-14 flex-shrink-0">
                  <p className="text-xs font-bold text-primary-700">{apt.time}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{apt.patientName}</p>
                  <p className="text-xs text-slate-500">{apt.reason}</p>
                </div>
                <StatusBadge status={apt.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Recent Messages</h2>
            <button onClick={() => navigate('/messages')} className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              All Messages <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {messagesData.map(conv => (
              <button key={conv.id} onClick={() => navigate('/messages')}
                className="w-full flex items-start gap-3 p-3 bg-slate-50 hover:bg-primary-50 rounded-xl text-left transition-colors">
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
                  {conv.contact.split(' ').pop()!.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">{conv.contact}</p>
                    <span className="text-xs text-slate-400">{conv.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly trend */}
      <div className="card">
        <h2 className="font-bold text-slate-800 mb-4">Monthly Appointment Trend</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlyAppointmentsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="appointments" stroke="#2578ea" strokeWidth={2.5} dot={{ r: 4, fill: '#2578ea' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
