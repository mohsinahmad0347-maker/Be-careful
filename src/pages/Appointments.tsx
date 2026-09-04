import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Calendar, Clock, User, ChevronRight, ChevronLeft, Star, MapPin } from 'lucide-react'
import { doctors, appointments, doctorSpecialties } from '../data/demo'
import { StatusBadge } from '../components/ui/Badge'
import { showToast } from '../components/ui/Toast'
import Tabs from '../components/ui/Tabs'

// ─── Time slots ───────────────────────────────────────────────────────────────
const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
]

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepIndicator({ step, total }: { step: number; total: number }) {
  const labels = ['Specialty', 'Doctor', 'Date & Time', 'Details', 'Review', 'Confirm']
  return (
    <div className="flex items-center gap-0 mb-6 overflow-x-auto pb-2">
      {labels.slice(0, total).map((label, i) => (
        <div key={i} className="flex items-center flex-shrink-0">
          <div className={`flex flex-col items-center ${i < total - 1 ? 'mr-0' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              i + 1 < step ? 'bg-emerald-500 text-white'
              : i + 1 === step ? 'bg-primary-600 text-white ring-4 ring-primary-100'
              : 'bg-slate-100 text-slate-400'
            }`}>
              {i + 1 < step ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span className={`text-[10px] mt-1 font-medium whitespace-nowrap ${i + 1 === step ? 'text-primary-600' : 'text-slate-400'}`}>
              {label}
            </span>
          </div>
          {i < total - 1 && (
            <div className={`h-0.5 w-8 sm:w-12 mb-4 mx-1 flex-shrink-0 transition-colors ${i + 1 < step ? 'bg-emerald-400' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Booking flow ─────────────────────────────────────────────────────────────
function BookingFlow({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(1)
  const [specialty, setSpecialty] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctors)[0] | null>(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const filteredDoctors = specialty ? doctors.filter(d => d.specialty === specialty) : doctors

  // Min date = today
  const today = new Date().toISOString().split('T')[0]

  const handleConfirm = () => {
    setConfirmed(true)
    showToast('Appointment booked! Queue number A-025 assigned.', 'success')
    setTimeout(onDone, 3000)
  }

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Appointment Confirmed!</h2>
        <p className="text-slate-500 mb-6">Your appointment has been successfully booked.</p>
        <div className="card bg-emerald-50 border-emerald-200 w-full max-w-sm text-left">
          <p className="text-sm text-slate-600"><strong>Doctor:</strong> {selectedDoctor?.name}</p>
          <p className="text-sm text-slate-600 mt-1"><strong>Date:</strong> {date}</p>
          <p className="text-sm text-slate-600 mt-1"><strong>Time:</strong> {time}</p>
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">Your Queue Number</p>
            <p className="text-4xl font-black text-primary-700 mt-1">A-025</p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4">Redirecting to your dashboard…</p>
      </div>
    )
  }

  return (
    <div>
      <StepIndicator step={step} total={5} />

      {/* Step 1 — Specialty */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Select a Specialty</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {doctorSpecialties.slice(1).map(s => (
              <button key={s} onClick={() => { setSpecialty(s); setStep(2) }}
                className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                  specialty === s ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-200 bg-white text-slate-700 hover:border-primary-300'
                }`}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="btn-ghost mt-4 text-sm">Skip — Browse all doctors</button>
        </div>
      )}

      {/* Step 2 — Doctor */}
      {step === 2 && (
        <div className="animate-fade-in">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            {specialty ? `${specialty} Doctors` : 'Select a Doctor'}
          </h2>
          <div className="space-y-3">
            {filteredDoctors.map(d => (
              <button key={d.id} onClick={() => { setSelectedDoctor(d); setStep(3) }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                  selectedDoctor?.id === d.id ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white hover:border-primary-300'
                }`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {d.name.split(' ').pop()!.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-slate-800 text-sm">{d.name}</p>
                    {d.verified && <span className="text-[10px] text-emerald-600 font-semibold">✓ Verified</span>}
                  </div>
                  <p className="text-xs text-primary-600 font-medium">{d.specialty}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-0.5"><Star size={10} className="text-amber-400 fill-amber-400" /> {d.rating}</span>
                    <span className="flex items-center gap-0.5"><MapPin size={10} /> {d.location}</span>
                    <span>{d.experience}y exp</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-primary-700 flex-shrink-0">Rs. {d.consultationFee.toLocaleString()}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 — Date & Time */}
      {step === 3 && (
        <div className="animate-fade-in space-y-5">
          <h2 className="text-lg font-bold text-slate-800">Select Date & Time</h2>
          <div>
            <label className="label">Preferred Date</label>
            <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)} className="input max-w-xs" />
          </div>
          <div>
            <label className="label">Available Time Slots</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map(t => (
                <button key={t} onClick={() => setTime(t)}
                  className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                    time === t ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-slate-200 text-slate-700 hover:border-primary-300'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4 — Reason */}
      {step === 4 && (
        <div className="animate-fade-in space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Appointment Details</h2>
          <div>
            <label className="label">Reason for Visit</label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={4}
              className="input resize-none"
              placeholder="Briefly describe your symptoms or reason for the consultation…"
            />
          </div>
          <p className="text-xs text-slate-400">Note: This information helps the doctor prepare for your consultation. Do not include sensitive personal information.</p>
        </div>
      )}

      {/* Step 5 — Review */}
      {step === 5 && (
        <div className="animate-fade-in space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Review Your Appointment</h2>
          <div className="card bg-slate-50 border-slate-200 space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl">
                {selectedDoctor?.name.split(' ').pop()!.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800">{selectedDoctor?.name}</p>
                <p className="text-sm text-primary-600">{selectedDoctor?.specialty}</p>
              </div>
            </div>
            {[
              { icon: <Calendar size={14} />, label: 'Date', value: date },
              { icon: <Clock size={14} />,    label: 'Time', value: time },
              { icon: <User size={14} />,     label: 'Reason', value: reason || 'Not specified' },
              { icon: <MapPin size={14} />,   label: 'Location', value: selectedDoctor?.hospital ?? '' },
            ].map(row => (
              <div key={row.label} className="flex items-start gap-3 text-sm">
                <span className="text-slate-400 mt-0.5 flex-shrink-0">{row.icon}</span>
                <span className="text-slate-500 w-16 flex-shrink-0">{row.label}:</span>
                <span className="text-slate-800 font-medium">{row.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <span className="text-sm text-slate-500">Consultation Fee</span>
              <span className="font-bold text-primary-700">Rs. {selectedDoctor?.consultationFee.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
        <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
          className="flex items-center gap-2 btn-secondary disabled:opacity-40 disabled:cursor-not-allowed text-sm py-2">
          <ChevronLeft size={16} /> Back
        </button>
        {step < 5 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={(step === 2 && !selectedDoctor) || (step === 3 && (!date || !time))}
            className="flex items-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2">
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={handleConfirm} className="flex items-center gap-2 btn-primary bg-emerald-600 hover:bg-emerald-700 text-sm py-2">
            <CheckCircle size={16} /> Confirm Appointment
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Main Appointments page ────────────────────────────────────────────────────
export default function Appointments() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('list')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="section-title">Appointments</h1>
          <p className="section-subtitle">Manage and book your healthcare appointments.</p>
        </div>
        <button onClick={() => setTab('book')} className="btn-primary">
          <Calendar size={16} /> Book New Appointment
        </button>
      </div>

      <Tabs
        tabs={[{ id: 'list', label: 'My Appointments' }, { id: 'book', label: 'Book Appointment' }]}
        active={tab}
        onChange={setTab}
      />

      {tab === 'list' && (
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="card text-center py-12">
              <Calendar size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="font-semibold text-slate-600">No appointments yet</p>
              <button onClick={() => setTab('book')} className="btn-primary mt-4 text-sm">Book Your First Appointment</button>
            </div>
          ) : (
            appointments.map(apt => (
              <div key={apt.id} className="card flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <Calendar size={20} className="text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-bold text-slate-800">{apt.doctorName}</p>
                    <StatusBadge status={apt.status} />
                  </div>
                  <p className="text-sm text-primary-600">{apt.specialty}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><Calendar size={11} />{apt.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{apt.time}</span>
                    <span className="flex items-center gap-1"><User size={11} />Queue: <strong>{apt.queueNumber}</strong></span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Reason: {apt.reason}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {apt.status === 'pending' || apt.status === 'confirmed' ? (
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                      Cancel
                    </button>
                  ) : null}
                  <button onClick={() => navigate('/queue')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 font-medium hover:bg-primary-100 transition-colors">
                    Track Queue
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'book' && (
        <div className="card">
          <BookingFlow onDone={() => setTab('list')} />
        </div>
      )}
    </div>
  )
}
