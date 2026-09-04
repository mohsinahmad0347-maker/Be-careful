import { Pill, Calendar, User, Download, Printer } from 'lucide-react'

const prescriptions = [
  { id: 'rx1', medicine: 'Amlodipine 5mg', doctor: 'Dr. Sarah Mitchell', date: '2026-08-20', instructions: 'Once daily in the morning with or without food.', duration: '30 days', refills: 2, status: 'active' },
  { id: 'rx2', medicine: 'Atorvastatin 10mg', doctor: 'Dr. Sarah Mitchell', date: '2026-08-20', instructions: 'Once daily at bedtime.', duration: '90 days', refills: 3, status: 'active' },
  { id: 'rx3', medicine: 'Sumatriptan 50mg', doctor: 'Dr. Ahmed Raza', date: '2026-07-10', instructions: 'Take at onset of migraine. Max 2 doses in 24 hours.', duration: 'As needed', refills: 1, status: 'active' },
  { id: 'rx4', medicine: 'Amoxicillin 500mg', doctor: 'Dr. Omar Sheikh', date: '2026-06-01', instructions: 'Three times daily with food for 7 days.', duration: '7 days', refills: 0, status: 'expired' },
]

export default function Prescriptions() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="section-title">Prescriptions</h1>
        <p className="section-subtitle">View prescriptions issued by your doctors. Always follow medical advice and do not alter dosages without consulting a healthcare professional.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
        <strong>Safety Notice:</strong> These prescriptions are managed by your healthcare provider. Never adjust medication dosage or timing without consulting your doctor or pharmacist.
      </div>

      <div className="space-y-4">
        {prescriptions.map(rx => (
          <div key={rx.id} className={`card border-l-4 ${rx.status === 'active' ? 'border-l-emerald-500' : 'border-l-slate-300'}`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${rx.status === 'active' ? 'bg-emerald-50' : 'bg-slate-100'}`}>
                  <Pill size={18} className={rx.status === 'active' ? 'text-emerald-600' : 'text-slate-400'} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{rx.medicine}</h3>
                  <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                    <User size={12} /> {rx.doctor}
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Calendar size={11} /> Prescribed: {rx.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${rx.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {rx.status === 'active' ? '✓ Active' : 'Expired'}
                </span>
              </div>
            </div>

            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">Instructions</p>
                <p className="text-sm text-slate-700 font-medium">{rx.instructions}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">Duration</p>
                <p className="text-sm text-slate-700 font-medium">{rx.duration}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">Refills Remaining</p>
                <p className="text-sm text-slate-700 font-medium">{rx.refills}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors font-medium">
                <Download size={12} /> Download
              </button>
              <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                <Printer size={12} /> Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
