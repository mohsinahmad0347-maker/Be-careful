import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Pill, AlertCircle, CheckCircle, Lock, Thermometer } from 'lucide-react'
import { medicines } from '../data/demo'
import Badge from '../components/ui/Badge'
import Tabs from '../components/ui/Tabs'
import { useState } from 'react'

const tabs = [
  { id: 'overview',      label: 'Overview' },
  { id: 'precautions',   label: 'Precautions' },
  { id: 'side-effects',  label: 'Side Effects' },
  { id: 'interactions',  label: 'Interactions' },
  { id: 'storage',       label: 'Storage' },
]

export default function MedicineDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const med = medicines.find(m => m.id === id)

  if (!med) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4">💊</span>
      <h2 className="text-xl font-bold text-slate-800 mb-2">Medicine Not Found</h2>
      <button onClick={() => navigate('/medicines')} className="btn-primary mt-4">Back to Medicines</button>
    </div>
  )

  return (
    <div className="space-y-6 max-w-3xl">
      <button onClick={() => navigate('/medicines')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 font-medium transition-colors">
        <ArrowLeft size={16} /> Back to Medicines
      </button>

      {/* Hero */}
      <div className="card bg-gradient-to-br from-primary-50 to-slate-50 border-primary-100">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-4xl flex-shrink-0">
            {med.icon}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="blue">{med.category.split('(')[0].trim()}</Badge>
              {med.prescriptionRequired
                ? <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full"><Lock size={11} /> Prescription Required</span>
                : <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full"><CheckCircle size={11} /> OTC Available</span>
              }
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">{med.genericName}</h1>
            <p className="text-sm text-slate-500 mt-1">Brand names: {med.brandNames.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Safety notice */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-sm text-red-800">
        <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
        <p><strong>Safety Notice:</strong> This information is for educational purposes only. Do not self-medicate. Dosage, suitability, and safety must be assessed by a qualified healthcare professional. This page does not constitute medical advice.</p>
      </div>

      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      <div className="card">
        {tab === 'overview' && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-800 text-lg">General Uses</h2>
            <p className="text-slate-600 leading-relaxed text-sm">{med.uses}</p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Category</h3>
                <p className="text-sm text-slate-600">{med.category}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Prescription Status</h3>
                <p className="text-sm text-slate-600">{med.prescriptionRequired ? 'Prescription required from a licensed healthcare provider' : 'Available over the counter (OTC) in many regions'}</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'precautions' && (
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">General Precautions</h2>
            <p className="text-xs text-slate-500 mb-4">Always inform your healthcare provider of all medications you are taking and any existing health conditions.</p>
            <ul className="space-y-2">
              {med.precautions.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" /> {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'side-effects' && (
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Possible Side Effects</h2>
            <p className="text-xs text-slate-500 mb-4">Not everyone experiences side effects. If you experience severe or unusual symptoms, contact a healthcare professional immediately.</p>
            <ul className="space-y-2">
              {med.sideEffects.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" /> {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'interactions' && (
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Known Interactions</h2>
            <p className="text-xs text-slate-500 mb-4">Always inform your doctor and pharmacist of all medications, supplements, and herbal products you use.</p>
            <ul className="space-y-2">
              {med.interactions.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'storage' && (
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-3">Storage Information</h2>
            <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
              <Thermometer size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">{med.storage}</p>
            </div>
            <p className="text-xs text-slate-400 mt-3">Store medicines safely out of reach of children. Dispose of expired medications responsibly — consult your pharmacist for proper disposal methods.</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => navigate('/doctors')} className="btn-primary">Consult a Doctor</button>
        <button onClick={() => navigate('/medicines')} className="btn-secondary">Browse Medicines</button>
      </div>
    </div>
  )
}
