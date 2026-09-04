import { useNavigate } from 'react-router-dom'
import {
  Calendar, Users, FileText, Pill, BarChart2, Bell,
  ArrowRight, Clock, CheckCircle, AlertCircle, Activity,
  Stethoscope, MessageSquare, Plus,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { useApp } from '../../context/AppContext'
import StatCard from '../../components/ui/StatCard'
import { StatusBadge } from '../../components/ui/Badge'
import {
  appointments, medicalRecords, notificationsData,
  monthlyAppointmentsData, appointmentStatusData, queueData,
} from '../../data/demo'

const healthTrendData = [
  { week: 'W1', bp: 142, glucose: 110, weight: 82 },
  { week: 'W2', bp: 138, glucose: 105, weight: 81 },
  { week: 'W3', bp: 135, glucose: 108, weight: 81 },
  { week: 'W4', bp: 132, glucose: 102, weight: 80 },
  { week: 'W5', bp: 130, glucose: 99,  weight: 80 },
  { week: 'W6', bp: 128, glucose: 96,  weight: 79 },
]

const COLORS = ['#10b981', '#2578ea', '#f59e0b', '#ef4444']

const quickActions = [
  { icon: <Calendar size={20} />,     label: 'Book Appointment', path: '/appointments',       bg: 'bg-primary-50',  text: 'text-primary-600' },
  { icon: <Stethoscope size={20} />,  label: 'Find Doctor',      path: '/doctors',             bg: 'bg-cyan-50',     text: 'text-cyan-600' },
  { icon: <FileText size={20} />,     label: 'View Records',     path: '/records',             bg: 'bg-purple-50',   text: 'text-purple-600' },
  { icon: <Pill size={20} />,         label: 'Prescriptions',    path: '/prescriptions',       bg: 'bg-amber-50',    text: 'text-amber-600' },
  { icon: <Users size={20} />,        label: 'Check Queue',      path: '/queue',               bg: 'bg-emerald-50',  text: 'text-emerald-600' },
  { icon: <BarChart2 size={20} />,    label: 'Health Reports',   path: '/reports',             bg: 'bg-rose-50',     text: 'text-rose-600' },
  { icon: <MessageSquare size={20} />,label: 'Messages',         path: '/messages',            bg: 'bg-indigo-50',   text: 'text-indigo-600' },
  { icon: <Plus size={20} />,         label: 'Upload Report',    path: '/reports',             bg: 'bg-teal-50',     text: 'text-teal-600' },
]

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

export default function PatientDashboard() {
  const navigate = useNavigate()
  const { user } = useApp()
  const firstName = user?.name?.split(' ')[0] ?? 'Patient'

  const upcomingApts = appointments.filter(a => a.status === 'upcoming' || a.status === 'confirmed')
  const nextApt      = upcomingApts[0]

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary-600 to-cyan-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-primary-100 text-sm font-medium">
              {now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="text-2xl font-extrabold mt-1">{greeting}, {firstName} 👋</h1>
            <p className="text-primary-100 text-sm mt-1">Here's your healthcare overview for today.</p>
          </div>
          {nextApt && (
            <div className="bg-white/15 border border-white/25 rounded-xl p-4 backdrop-blur-sm min-w-[200px]">
              <p className="text-xs text-primary-100 font-medium mb-1">Next Appointment</p>
              <p className="font-bold text-sm">{nextApt.doctorName}</p>
              <p className="text-xs text-primary-200 flex items-center gap-1 mt-0.5">
                <Clock size={10} /> {nextApt.date} · {nextApt.time}
              </p>
              <p className="text-xs font-bold mt-1.5">Queue: {nextApt.queueNumber}</p>
            </div>
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Upcoming Appointments" value={upcomingApts.length}
          icon={<Calendar size={22} className="text-primary-600" />} iconBg="bg-primary-50"
          change={12} changeLabel="this month" />
        <StatCard title="Queue Number" value={queueData.yourNumber}
          icon={<Users size={22} className="text-emerald-600" />} iconBg="bg-emerald-50"
          subtitle={`${queueData.patientsAhead} ahead`} />
        <StatCard title="Medical Records" value={medicalRecords.length}
          icon={<FileText size={22} className="text-purple-600" />} iconBg="bg-purple-50"
          change={5} changeLabel="new this month" />
        <StatCard title="Notifications" value={notificationsData.filter(n => !n.read).length}
          icon={<Bell size={22} className="text-amber-600" />} iconBg="bg-amber-50"
          subtitle="unread" />
      </div>

      {/* Quick actions */}
      <div className="card">
        <h2 className="font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map(q => (
            <button key={q.label} onClick={() => navigate(q.path)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl ${q.bg} hover:opacity-80 transition-opacity text-center group`}>
              <span className={`${q.text} group-hover:scale-110 transition-transform duration-200`}>{q.icon}</span>
              <span className={`text-xs font-semibold ${q.text}`}>{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Appointment status donut */}
        <div className="card">
          <h2 className="font-bold text-slate-800 mb-4">Appointment Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={appointmentStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                paddingAngle={3} dataKey="value">
                {appointmentStatusData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(val, name) => [val, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {appointmentStatusData.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                {s.name} ({s.value})
              </div>
            ))}
          </div>
        </div>

        {/* Monthly appointments bar */}
        <div className="card lg:col-span-2">
          <h2 className="font-bold text-slate-800 mb-4">Monthly Appointments</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyAppointmentsData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="appointments" fill="#2578ea" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Health trend area chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-slate-800">Health Trend (Demo Data)</h2>
            <p className="text-xs text-slate-400 mt-0.5">Illustrative data — not real health measurements</p>
          </div>
          <Activity size={18} className="text-primary-500" />
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={healthTrendData}>
            <defs>
              <linearGradient id="bpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="glucGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2578ea" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2578ea" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="bp" name="Blood Pressure" stroke="#ef4444" fill="url(#bpGrad)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="glucose" name="Glucose" stroke="#2578ea" fill="url(#glucGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row — recent records + appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent appointments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Recent Appointments</h2>
            <button onClick={() => navigate('/appointments')} className="text-xs text-primary-600 font-medium flex items-center gap-1 hover:underline">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {appointments.slice(0, 4).map(apt => (
              <div key={apt.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <Calendar size={16} className="text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{apt.doctorName}</p>
                  <p className="text-xs text-slate-400">{apt.date} · {apt.time}</p>
                </div>
                <StatusBadge status={apt.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent records */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Recent Medical Records</h2>
            <button onClick={() => navigate('/records')} className="text-xs text-primary-600 font-medium flex items-center gap-1 hover:underline">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {medicalRecords.slice(0, 4).map(r => {
              const icon = r.type === 'Doctor Visit' ? <Stethoscope size={15} /> : r.type === 'Lab Report' ? <Activity size={15} /> : <Pill size={15} />
              const bg   = r.type === 'Doctor Visit' ? 'bg-primary-50 text-primary-600' : r.type === 'Lab Report' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
              return (
                <div key={r.id} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>{icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{r.title}</p>
                    <p className="text-xs text-slate-400">{r.date} · {r.doctor}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Notifications panel */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800">Recent Notifications</h2>
          <button onClick={() => navigate('/notifications')} className="text-xs text-primary-600 font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {notificationsData.slice(0, 4).map(n => {
            const icon = n.type === 'appointment' ? <Calendar size={14} className="text-primary-600" />
              : n.type === 'message' ? <MessageSquare size={14} className="text-cyan-600" />
              : n.type === 'report'  ? <FileText size={14} className="text-purple-600" />
              : <Bell size={14} className="text-amber-600" />
            return (
              <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${n.read ? 'bg-white' : 'bg-primary-50/60'}`}>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>{n.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{n.message}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-slate-400 whitespace-nowrap">{n.time}</span>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Health reminders */}
      <div className="card">
        <h2 className="font-bold text-slate-800 mb-4">Health Reminders</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: <CheckCircle size={16} className="text-emerald-500" />, text: 'Take Amlodipine 5mg — Morning', sub: 'Daily medication' },
            { icon: <AlertCircle size={16} className="text-amber-500" />,   text: 'Blood pressure check due', sub: 'Recommended weekly' },
            { icon: <Calendar size={16} className="text-primary-500" />,    text: 'Follow-up with Dr. Mitchell', sub: 'Sep 10, 2026' },
            { icon: <Activity size={16} className="text-cyan-500" />,       text: '30 min walk today', sub: 'Wellness goal' },
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
              <span className="flex-shrink-0 mt-0.5">{r.icon}</span>
              <div>
                <p className="text-sm font-medium text-slate-800">{r.text}</p>
                <p className="text-xs text-slate-400">{r.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
