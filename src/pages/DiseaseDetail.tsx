import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, AlertCircle, Pill, Dumbbell } from 'lucide-react'
import { diseases } from '../data/demo'
import Tabs from '../components/ui/Tabs'
import Accordion from '../components/ui/Accordion'
import Badge from '../components/ui/Badge'

const tabs = [
  { id: 'overview',    label: 'Overview' },
  { id: 'symptoms',    label: 'Symptoms' },
  { id: 'causes',      label: 'Causes & Risk' },
  { id: 'diagnosis',   label: 'Diagnosis' },
  { id: 'treatment',   label: 'Treatment' },
  { id: 'medicines',   label: 'Medicines' },
  { id: 'exercise',    label: 'Exercise' },
  { id: 'prevention',  label: 'Prevention' },
  { id: 'faq',         label: 'FAQ' },
]

function ListSection({ items, icon }: { items: string[]; icon?: React.ReactNode }) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
          <span className="text-primary-500 mt-0.5 flex-shrink-0">{icon ?? <CheckCircle size={15} />}</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-sm text-amber-800">
      <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
      <p><strong>Educational Information Only.</strong> This content is for general educational purposes. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional.</p>
    </div>
  )
}

export default function DiseaseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const disease = diseases.find(d => d.id === id)

  if (!disease) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-6xl mb-4">🔍</span>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Disease Not Found</h2>
        <p className="text-slate-500 mb-6">The condition you're looking for doesn't exist in our database.</p>
        <button onClick={() => navigate('/diseases')} className="btn-primary">Back to Diseases</button>
      </div>
    )
  }

  const faqs = [
    { question: `Is ${disease.name} curable?`, answer: `The management of ${disease.name} depends on the type, severity, and individual factors. Many cases can be well-controlled with appropriate medical treatment and lifestyle changes. Please consult a healthcare professional for personalized guidance.` },
    { question: `When should I see a doctor for ${disease.name}?`, answer: `You should consult a healthcare professional if you experience symptoms associated with ${disease.name}, especially if they are persistent, worsening, or affecting your daily life.` },
    { question: `Can lifestyle changes help with ${disease.name}?`, answer: `Lifestyle modifications such as diet, exercise, and stress management often play an important role in managing ${disease.name}. A healthcare professional can advise on appropriate changes for your situation.` },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back */}
      <button onClick={() => navigate('/diseases')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors font-medium">
        <ArrowLeft size={16} /> Back to Diseases
      </button>

      {/* Hero card */}
      <div className="card bg-gradient-to-br from-primary-50 to-cyan-50 border-primary-100">
        <div className="flex items-start gap-5">
          <span className="text-5xl sm:text-6xl flex-shrink-0">{disease.icon}</span>
          <div className="flex-1 min-w-0">
            <Badge variant="blue">{disease.category}</Badge>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2 mb-3">{disease.name}</h1>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{disease.overview}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <button onClick={() => navigate('/appointments')} className="btn-primary text-sm py-2">
                Book a Consultation
              </button>
              <button onClick={() => navigate('/doctors')} className="btn-secondary text-sm py-2">
                Find a Doctor
              </button>
            </div>
          </div>
        </div>
      </div>

      <DisclaimerBanner />

      {/* Tabs */}
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {/* Tab content */}
      <div className="card">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-800 text-lg">Overview</h2>
            <p className="text-slate-600 leading-relaxed">{disease.overview}</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-semibold text-slate-700 mb-2 text-sm">Common Symptoms</h3>
                <ul className="space-y-1">{disease.symptoms.slice(0, 4).map((s, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />{s}</li>
                ))}</ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-semibold text-slate-700 mb-2 text-sm">Key Prevention</h3>
                <ul className="space-y-1">{disease.prevention.slice(0, 4).map((p, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />{p}</li>
                ))}</ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'symptoms' && (
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Symptoms</h2>
            <p className="text-sm text-slate-500 mb-4">The following symptoms are commonly associated with {disease.name}. Presence of these symptoms does not confirm the diagnosis.</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {disease.symptoms.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-primary-400 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'causes' && (
          <div className="space-y-5">
            <div>
              <h2 className="font-bold text-slate-800 text-lg mb-2">Causes</h2>
              <ListSection items={disease.causes} />
            </div>
            <div className="border-t border-slate-100 pt-5">
              <h2 className="font-bold text-slate-800 text-lg mb-2">Risk Factors</h2>
              <ListSection items={disease.riskFactors} icon={<AlertCircle size={15} className="text-amber-500" />} />
            </div>
            {disease.complications.length > 0 && (
              <div className="border-t border-slate-100 pt-5">
                <h2 className="font-bold text-slate-800 text-lg mb-2">Possible Complications</h2>
                <p className="text-xs text-slate-500 mb-3">Complications may occur if the condition is left untreated or poorly managed. Consult a healthcare professional.</p>
                <ListSection items={disease.complications} icon={<AlertCircle size={15} className="text-red-400" />} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'diagnosis' && (
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Diagnosis Methods</h2>
            <p className="text-sm text-slate-500 mb-4">These are general diagnostic approaches. Actual diagnosis must be performed by a qualified healthcare professional.</p>
            <ListSection items={disease.diagnosis} />
          </div>
        )}

        {activeTab === 'treatment' && (
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Treatment Approaches</h2>
            <p className="text-sm text-slate-500 mb-4">Treatment strategies are general educational information only. Treatment must be determined by a qualified healthcare professional based on individual assessment.</p>
            <ListSection items={disease.treatments} />
          </div>
        )}

        {activeTab === 'medicines' && (
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Commonly Associated Medicines</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 mb-4 flex gap-2">
              <Pill size={14} className="shrink-0 mt-0.5" />
              <span><strong>Important:</strong> Never take medication without consulting a qualified healthcare professional. Dosage and suitability must be assessed by a doctor.</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {disease.relatedMedicines.map((m, i) => (
                <button key={i} onClick={() => navigate('/medicines')}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-xl text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors">
                  <Pill size={14} /> {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'exercise' && (
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Exercises & Wellness</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 mb-4 flex gap-2">
              <Dumbbell size={14} className="shrink-0 mt-0.5" />
              <span><strong>Note:</strong> Exercise recommendations are general wellness information only. Consult a healthcare professional or physiotherapist before starting any exercise program, especially if you have a medical condition.</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {disease.exercises.map((e, i) => (
                <button key={i} onClick={() => navigate('/exercises')}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors">
                  <Dumbbell size={14} /> {e}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prevention' && (
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Prevention</h2>
            <p className="text-sm text-slate-500 mb-4">General preventive measures. Individual guidance should come from a qualified healthcare professional.</p>
            <ListSection items={disease.prevention} icon={<CheckCircle size={15} className="text-emerald-500" />} />
          </div>
        )}

        {activeTab === 'faq' && (
          <div>
            <h2 className="font-bold text-slate-800 text-lg mb-4">Frequently Asked Questions</h2>
            <Accordion items={faqs} />
          </div>
        )}
      </div>

      {/* Related actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <button onClick={() => navigate('/appointments')} className="card-hover flex flex-col items-center text-center gap-2 py-6">
          <span className="text-3xl">📅</span>
          <span className="font-semibold text-slate-800 text-sm">Book Appointment</span>
          <span className="text-xs text-slate-500">See a specialist</span>
        </button>
        <button onClick={() => navigate('/doctors')} className="card-hover flex flex-col items-center text-center gap-2 py-6">
          <span className="text-3xl">👨‍⚕️</span>
          <span className="font-semibold text-slate-800 text-sm">Find a Doctor</span>
          <span className="text-xs text-slate-500">Browse specialists</span>
        </button>
        <button onClick={() => navigate('/symptoms')} className="card-hover flex flex-col items-center text-center gap-2 py-6">
          <span className="text-3xl">🔍</span>
          <span className="font-semibold text-slate-800 text-sm">Symptom Explorer</span>
          <span className="text-xs text-slate-500">Educational tool</span>
        </button>
      </div>
    </div>
  )
}
