import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, AlertCircle, ArrowRight, X, CheckCircle } from 'lucide-react'
import { symptoms, diseases } from '../data/demo'

export default function SymptomExplorer() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>([])
  const [query, setQuery]       = useState('')
  const [results, setResults]   = useState<typeof diseases>([])
  const [searched, setSearched] = useState(false)

  const filteredSymptoms = symptoms.filter(s =>
    !query || s.toLowerCase().includes(query.toLowerCase())
  )

  const toggle = (s: string) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
    setSearched(false)
  }

  const explore = () => {
    if (selected.length === 0) return
    // Find diseases that have any of the selected symptoms in their symptom list
    const found = diseases.filter(d =>
      selected.some(sel =>
        d.symptoms.some(sym => sym.toLowerCase().includes(sel.toLowerCase()))
      )
    )
    setResults(found)
    setSearched(true)
  }

  const reset = () => { setSelected([]); setResults([]); setSearched(false) }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="page-header">
        <h1 className="section-title">Symptom Explorer</h1>
        <p className="section-subtitle">Educational tool to explore general health information based on symptoms.</p>
      </div>

      {/* Disclaimer — prominent */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 flex gap-4">
        <AlertCircle size={24} className="text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-bold text-amber-800 mb-1">This tool is educational and cannot diagnose medical conditions.</p>
          <p className="text-sm text-amber-700 leading-relaxed">
            Symptom information is general educational content only. Do not use it as a substitute for professional medical advice, diagnosis, or treatment.
            If you are experiencing symptoms, please consult a qualified healthcare professional.
          </p>
        </div>
      </div>

      {/* Symptom search */}
      <div className="card">
        <h2 className="font-bold text-slate-800 mb-4">Select Your Symptoms</h2>
        <div className="relative mb-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            className="input pl-9" placeholder="Search symptoms…" />
        </div>

        {/* Selected chips */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 p-3 bg-primary-50 rounded-xl">
            <p className="w-full text-xs text-primary-600 font-semibold mb-1">Selected ({selected.length})</p>
            {selected.map(s => (
              <button key={s} onClick={() => toggle(s)}
                className="flex items-center gap-1.5 px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium hover:bg-primary-700 transition-colors">
                {s} <X size={11} />
              </button>
            ))}
          </div>
        )}

        {/* Symptom grid */}
        <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
          {filteredSymptoms.map(s => (
            <button key={s} onClick={() => toggle(s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selected.includes(s)
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              aria-pressed={selected.includes(s)}>
              {selected.includes(s) && <CheckCircle size={10} />}
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-3 mt-5">
          <button onClick={explore} disabled={selected.length === 0}
            className="btn-primary flex-1 py-3 disabled:opacity-40">
            Explore Health Information
          </button>
          {selected.length > 0 && (
            <button onClick={reset} className="btn-secondary px-4">Reset</button>
          )}
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-800">
              General Health Information ({results.length} condition{results.length !== 1 ? 's' : ''})
            </h2>
          </div>

          {results.length === 0 ? (
            <div className="card text-center py-10">
              <p className="text-slate-500 font-medium">No specific information found for your symptom selection.</p>
              <p className="text-sm text-slate-400 mt-1">Please consult a healthcare professional for proper evaluation.</p>
              <button onClick={() => navigate('/doctors')} className="btn-primary mt-4 text-sm py-2">
                Find a Doctor
              </button>
            </div>
          ) : (
            results.map(d => (
              <div key={d.id} className="card-hover">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{d.icon}</span>
                  <div className="flex-1">
                    <span className="badge-blue text-[10px]">{d.category}</span>
                    <h3 className="font-bold text-slate-800 mt-1">{d.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{d.overview.slice(0, 120)}…</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {d.symptoms.filter(sym => selected.some(sel => sym.toLowerCase().includes(sel.toLowerCase()))).slice(0, 4).map((sym, i) => (
                        <span key={i} className="badge-blue text-[10px]">✓ {sym}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => navigate(`/diseases/${d.id}`)} className="flex items-center gap-1 text-xs text-primary-600 font-medium flex-shrink-0">
                    Learn More <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="card bg-blue-50 border-blue-100 text-center">
            <p className="font-semibold text-slate-800 mb-1">Need Professional Guidance?</p>
            <p className="text-sm text-slate-500 mb-3">These results are educational only. Consult a doctor for proper evaluation and diagnosis.</p>
            <button onClick={() => navigate('/doctors')} className="btn-primary text-sm py-2.5">
              Find a Doctor
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
