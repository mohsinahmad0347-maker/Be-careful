import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, MapPin, User, RefreshCw, ArrowRight } from 'lucide-react'
import { queueData } from '../data/demo'

export default function Queue() {
  const navigate = useNavigate()
  const [ahead, setAhead] = useState(queueData.patientsAhead)
  const [currentNum, setCurrentNum] = useState(parseInt(queueData.currentNumber.split('-')[1]))
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate queue progressing every 30s for demo
  useEffect(() => {
    const t = setInterval(() => {
      // Don't auto-advance in this demo — just refresh timestamp
      setLastUpdated(new Date())
    }, 30000)
    return () => clearInterval(t)
  }, [])

  const refresh = () => {
    setLastUpdated(new Date())
  }

  const progressPct = Math.max(0, Math.min(100, ((12 - ahead) / 12) * 100))
  const yourNum = parseInt(queueData.yourNumber.split('-')[1])

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="page-header">
        <h1 className="section-title">Patient Queue</h1>
        <p className="section-subtitle">Track your real-time position in the clinic queue.</p>
      </div>

      {/* Main queue card */}
      <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white text-center py-10 relative overflow-hidden">
        {/* Background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          {[1, 2, 3].map(i => (
            <div key={i} className="absolute rounded-full border border-white/10"
              style={{ width: `${i * 120}px`, height: `${i * 120}px` }} />
          ))}
        </div>

        <div className="relative">
          <p className="text-primary-200 text-sm font-semibold uppercase tracking-widest mb-2">Your Queue Number</p>
          <div className="text-7xl font-black tracking-tight queue-number mb-6 text-white drop-shadow-lg">
            {queueData.yourNumber}
          </div>

          <div className="flex justify-center gap-10 mb-6">
            <div className="text-center">
              <p className="text-primary-200 text-xs font-medium uppercase tracking-wide mb-1">Now Serving</p>
              <p className="text-3xl font-extrabold queue-number">
                A-{String(currentNum).padStart(3, '0')}
              </p>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <p className="text-primary-200 text-xs font-medium uppercase tracking-wide mb-1">Ahead of You</p>
              <p className="text-3xl font-extrabold">{ahead}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mx-auto max-w-xs">
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }} />
            </div>
            <p className="text-xs text-primary-200">
              {ahead === 0 ? 'You are next!' : `~${Math.round(ahead * 5)} min estimated wait`}
            </p>
          </div>

          {/* Status badge */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/25 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
            Waiting
          </div>
        </div>
      </div>

      {/* Clinic info */}
      <div className="card">
        <h2 className="font-bold text-slate-800 mb-3">Clinic Details</h2>
        <div className="space-y-3">
          {[
            { icon: <User size={15} className="text-primary-600" />,  label: 'Doctor',   value: queueData.doctor },
            { icon: <MapPin size={15} className="text-slate-400" />,  label: 'Clinic',   value: queueData.clinic },
            { icon: <Clock size={15} className="text-slate-400" />,   label: 'Est. Wait', value: ahead === 0 ? 'You are next!' : `~${Math.round(ahead * 5)} minutes` },
          ].map(row => (
            <div key={row.label} className="flex items-center gap-3 text-sm">
              <span className="flex-shrink-0">{row.icon}</span>
              <span className="text-slate-500 w-20">{row.label}:</span>
              <span className="font-semibold text-slate-800">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Queue list */}
      <div className="card">
        <h2 className="font-bold text-slate-800 mb-4">Queue Status</h2>
        <div className="space-y-2">
          {Array.from({ length: Math.min(8, ahead + 2) }).map((_, i) => {
            const num = currentNum + i
            const isYours = num === yourNum
            const isCurrent = i === 0
            return (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                isYours ? 'bg-primary-50 border border-primary-200' : isCurrent ? 'bg-emerald-50' : 'bg-slate-50'
              }`}>
                <span className={`text-sm font-bold w-14 ${isYours ? 'text-primary-700' : isCurrent ? 'text-emerald-700' : 'text-slate-500'}`}>
                  A-{String(num).padStart(3, '0')}
                </span>
                <span className={`flex-1 text-sm ${isYours ? 'text-primary-800 font-semibold' : 'text-slate-600'}`}>
                  {isYours ? '👤 You' : isCurrent ? 'In Consultation' : 'Waiting'}
                </span>
                {isCurrent && <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Now</span>}
                {isYours && !isCurrent && <span className="text-xs font-semibold text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full">You</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Refresh + actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={refresh}
          className="flex items-center justify-center gap-2 btn-secondary flex-1 text-sm py-2.5">
          <RefreshCw size={14} /> Refresh
        </button>
        <button onClick={() => navigate('/appointments')}
          className="flex items-center justify-center gap-2 btn-primary flex-1 text-sm py-2.5">
          My Appointments <ArrowRight size={14} />
        </button>
      </div>

      <p className="text-center text-xs text-slate-400">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </p>

      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
        Queue positions are illustrative demo data. Actual queue management requires backend integration.
      </div>
    </div>
  )
}
