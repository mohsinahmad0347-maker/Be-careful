import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, UserCheck, Calendar, Activity, ShieldCheck,
  FileText, TrendingUp, BarChart2, ArrowRight, Eye,
  CheckCircle, AlertCircle,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import StatCard from '../../components/ui/StatCard'
import { StatusBadge } from '../../components/ui/Badge'
import {
  adminUserGrowthData, specialtiesData, appointmentStatusData,
  doctors, patients, appointments,
} from '../../data/demo'

const COLORS = ['#2578ea', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316']

const platformActivity = [
  { hour: '8am',  views: 45,  bookings: 5 },
  { hour: '10am', views: 120, bookings: 18 },
  { hour: '12pm', views: 90,  bookings: 12 },
  { hour: '2pm',  views: 140, bookings: 22 },
  { hour: '4pm',  views: 110, bookings: 16 },
  { hour: '6pm',  views: 60,  bookings: 8 },
]

const pendingVerifications = [
  { name: 'Dr. Zain Ul Abideen', specialty: 'Ophthalmologist', submitted: '2026-09-02' },
  { name: 'Dr. Farrukh Siddiqui', specialty: 'Urologist',      submitted: '2026-09-01' },
  { name: 'Dr. Mariam Baig',      specialty: 'Neurologist',    submitted: '2026-08-31' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTable, setActiveTable] = useState<'patients' | 'doctors' | 'appointments'>('patients')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-slate-400 text-sm">Administrator Panel</p>
            <h1 className="text-2xl font-extrabold mt-1">Platform Overview</h1>
            <p className="text-slate-400 text-sm mt-1">Monitor and manage the entire BE CAREFUL platform.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[{ label: 'Manage Doctors', path: '/doctors' }, { label: 'Manage Patients', path: '/admin/dashboard' }].map(b => (
              <button key={b.label} onClick={() => navigate(b.path)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium transition-colors">
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients"         value={patients.length}    icon={<Users       size={20} className="text-primary-600" />} iconBg="bg-primary-50"  change={15} changeLabel="this month" />
        <StatCard title="Registered Doctors"     value={doctors.length}     icon={<UserCheck   size={20} className="text-emerald-600" />} iconBg="bg-emerald-50" change={8}  changeLabel="this month" />
        <StatCard title="Total Appointments"     value={appointments.length} icon={<Calendar   size={20} className="text-amber-600" />}   iconBg="bg-amber-50"   change={22} changeLabel="this month" />
        <StatCard title="Pending Verifications"  value={pendingVerifications.length} icon={<ShieldCheck size={20} className="text-rose-600" />} iconBg="bg-rose-50" subtitle="require action" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Users Today"     value="248"  icon={<Activity    size={20} className="text-cyan-600" />}    iconBg="bg-cyan-50"   change={5}  changeLabel="vs yesterday" />
        <StatCard title="Platform Views"         value="1.2K" icon={<Eye         size={20} className="text-purple-600" />}  iconBg="bg-purple-50" change={12} changeLabel="today" />
        <StatCard title="Reports Uploaded"       value="89"   icon={<FileText    size={20} className="text-teal-600" />}    iconBg="bg-teal-50"   change={3}  changeLabel="this week" />
        <StatCard title="Queue Sessions Today"   value="34"   icon={<BarChart2   size={20} className="text-indigo-600" />}  iconBg="bg-indigo-50" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* User growth area chart */}
        <div className="card">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary-600" /> User Growth (2026)
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={adminUserGrowthData}>
              <defs>
                <linearGradient id="patGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2578ea" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2578ea" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="patients" name="Patients" stroke="#2578ea" fill="url(#patGrad)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="doctors"  name="Doctors"  stroke="#10b981" fill="url(#docGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Platform activity */}
        <div className="card">
          <h2 className="font-bold text-slate-800 mb-4">Today's Platform Activity</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={platformActivity} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="views"    name="Page Views" fill="#2578ea" radius={[4, 4, 0, 0]} />
              <Bar dataKey="bookings" name="Bookings"   fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Doctor specialties bar */}
        <div className="card lg:col-span-2">
          <h2 className="font-bold text-slate-800 mb-4">Doctor Specialties Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={specialtiesData} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="specialty" width={90} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2578ea" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Appointment status donut */}
        <div className="card">
          <h2 className="font-bold text-slate-800 mb-4">Appointment Status</h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={appointmentStatusData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {appointmentStatusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {appointmentStatusData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                <span className="flex-1">{d.name}</span>
                <span className="font-bold text-slate-800">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending verifications */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-500" /> Pending Doctor Verifications
          </h2>
          <span className="badge-orange">{pendingVerifications.length} pending</span>
        </div>
        <div className="space-y-3">
          {pendingVerifications.map((v, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-amber-50 border border-amber-100 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center flex-shrink-0">
                {v.name.split(' ')[1]?.charAt(0) ?? 'D'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm">{v.name}</p>
                <p className="text-xs text-slate-500">{v.specialty} · Submitted {v.submitted}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1">
                  <CheckCircle size={11} /> Approve
                </button>
                <button className="text-xs px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin tables */}
      <div className="card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <h2 className="font-bold text-slate-800">Platform Management</h2>
          <div className="flex gap-2">
            {(['patients', 'doctors', 'appointments'] as const).map(t => (
              <button key={t} onClick={() => setActiveTable(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  activeTable === t ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {activeTable === 'patients' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {['Name', 'Age', 'Gender', 'Blood', 'Condition', 'Last Visit', 'Actions'].map(h => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id} className="table-row">
                    <td className="table-cell font-medium text-slate-800">{p.name}</td>
                    <td className="table-cell">{p.age}</td>
                    <td className="table-cell">{p.gender}</td>
                    <td className="table-cell"><span className="badge-red">{p.bloodGroup}</span></td>
                    <td className="table-cell">{p.condition}</td>
                    <td className="table-cell text-slate-400">{p.lastVisit}</td>
                    <td className="table-cell">
                      <button className="text-xs text-primary-600 hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTable === 'doctors' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {['Name', 'Specialty', 'Hospital', 'Experience', 'Rating', 'Status', 'Actions'].map(h => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {doctors.map(d => (
                  <tr key={d.id} className="table-row">
                    <td className="table-cell font-medium text-slate-800">{d.name}</td>
                    <td className="table-cell">{d.specialty}</td>
                    <td className="table-cell text-slate-500 text-xs">{d.hospital}</td>
                    <td className="table-cell">{d.experience}y</td>
                    <td className="table-cell">{d.rating} ⭐</td>
                    <td className="table-cell"><StatusBadge status={d.verified ? 'confirmed' : 'pending'} /></td>
                    <td className="table-cell">
                      <button className="text-xs text-primary-600 hover:underline">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTable === 'appointments' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {['Patient', 'Doctor', 'Date', 'Time', 'Specialty', 'Status', 'Queue'].map(h => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.id} className="table-row">
                    <td className="table-cell font-medium text-slate-800">{a.patientName}</td>
                    <td className="table-cell">{a.doctorName}</td>
                    <td className="table-cell">{a.date}</td>
                    <td className="table-cell">{a.time}</td>
                    <td className="table-cell text-xs text-slate-500">{a.specialty}</td>
                    <td className="table-cell"><StatusBadge status={a.status} /></td>
                    <td className="table-cell font-bold text-primary-600">{a.queueNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
