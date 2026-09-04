import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import { exercises } from '../data/demo'
import Badge from '../components/ui/Badge'

const difficultyColor: Record<string, 'green' | 'orange' | 'red'> = {
  Easy: 'green', Moderate: 'orange', Advanced: 'red',
}

export default function ExerciseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ex = exercises.find(e => e.id === id)

  if (!ex) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4">🏋️</span>
      <h2 className="text-xl font-bold text-slate-800 mb-2">Exercise Not Found</h2>
      <button onClick={() => navigate('/exercises')} className="btn-primary mt-4">Back to Exercises</button>
    </div>
  )

  return (
    <div className="space-y-6 max-w-3xl">
      <button onClick={() => navigate('/exercises')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 font-medium transition-colors">
        <ArrowLeft size={16} /> Back to Exercises
      </button>

      {/* Hero */}
      <div className="card bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-100">
        <div className="flex items-start gap-5">
          <span className="text-6xl">{ex.icon}</span>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="blue">{ex.category}</Badge>
              <Badge variant={difficultyColor[ex.difficulty]}>{ex.difficulty}</Badge>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">{ex.name}</h1>
            <p className="text-slate-600 text-sm">{ex.description}</p>
            <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
              <Clock size={14} /> {ex.duration}
            </div>
          </div>
        </div>
      </div>

      {/* Wellness disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-sm text-amber-800">
        <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p><strong>Important:</strong> This exercise information is for general wellness education only. It does not replace advice from a qualified healthcare professional, physiotherapist, or fitness trainer. Stop immediately if you experience pain, dizziness, or breathing difficulty and seek medical attention.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Benefits */}
        <div className="card">
          <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-500" /> General Benefits
          </h2>
          <ul className="space-y-2">
            {ex.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" /> {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Safety precautions */}
        <div className="card">
          <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" /> Safety Precautions
          </h2>
          <ul className="space-y-2">
            {ex.precautions.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Steps */}
      <div className="card">
        <h2 className="font-bold text-slate-800 mb-4">How to Perform</h2>
        <ol className="space-y-3">
          {ex.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-700 leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <button onClick={() => navigate('/doctors')} className="btn-primary">
        Consult a Healthcare Professional
      </button>
    </div>
  )
}
