import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dumbbell, Clock, ArrowRight, Filter } from 'lucide-react'
import { exercises, exerciseCategories } from '../data/demo'
import SearchBar from '../components/ui/SearchBar'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'

const difficultyColor: Record<string, 'green' | 'orange' | 'red'> = {
  Easy: 'green', Moderate: 'orange', Advanced: 'red',
}

export default function Exercises() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')

  const filtered = useMemo(() => {
    return exercises.filter(e => {
      const matchQ = !query || e.name.toLowerCase().includes(query.toLowerCase()) || e.description.toLowerCase().includes(query.toLowerCase())
      const matchC = category === 'All' || e.category === category
      const matchD = difficulty === 'All' || e.difficulty === difficulty
      return matchQ && matchC && matchD
    })
  }, [query, category, difficulty])

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="section-title">Exercises & Wellness Library</h1>
        <p className="section-subtitle">Educational wellness and exercise information. Consult a professional before starting any exercise program.</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-xs text-blue-700 flex items-start gap-2">
        <Dumbbell size={14} className="shrink-0 mt-0.5" />
        <span><strong>Wellness Notice:</strong> Exercise information is general educational content only. It does not replace professional physiotherapy or medical guidance. Stop any exercise if you feel pain and consult a healthcare professional. No exercise can cure a medical condition.</span>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={query} onChange={setQuery} placeholder="Search exercises…" className="flex-1" />
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
          className="input w-auto min-w-[140px]" aria-label="Filter by difficulty">
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <div className="flex items-center gap-2 text-sm text-slate-500"><Filter size={14} />{filtered.length} results</div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {exerciseCategories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              category === cat ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-600'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon={<Dumbbell size={28} />} title="No exercises found"
          action={<button onClick={() => { setQuery(''); setCategory('All'); setDifficulty('All') }} className="btn-secondary">Clear Filters</button>} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(ex => (
            <button key={ex.id} onClick={() => navigate(`/exercises/${ex.id}`)}
              className="card-hover text-left group" aria-label={`View ${ex.name} exercise`}>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">{ex.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    <Badge variant="blue">{ex.category}</Badge>
                    <Badge variant={difficultyColor[ex.difficulty]}>{ex.difficulty}</Badge>
                  </div>
                  <h3 className="font-bold text-slate-800">{ex.name}</h3>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">{ex.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Clock size={11} /> {ex.duration}</span>
                <span className="flex items-center gap-1 text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ArrowRight size={11} />
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
