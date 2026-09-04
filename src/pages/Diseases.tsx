import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Filter } from 'lucide-react'
import { diseases, diseaseCategories } from '../data/demo'
import SearchBar from '../components/ui/SearchBar'
import Pagination from '../components/ui/Pagination'
import EmptyState from '../components/ui/EmptyState'
import { FlaskConical } from 'lucide-react'

const PER_PAGE = 9

export default function Diseases() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return diseases.filter(d => {
      const matchQ = !query || d.name.toLowerCase().includes(query.toLowerCase()) || d.overview.toLowerCase().includes(query.toLowerCase())
      const matchC = category === 'All' || d.category === category
      return matchQ && matchC
    })
  }, [query, category])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleFilter = (cat: string) => { setCategory(cat); setPage(1) }
  const handleSearch = (q: string) => { setQuery(q); setPage(1) }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="page-header">
        <h1 className="section-title">Disease Information Library</h1>
        <p className="section-subtitle">Educational information about health conditions. Always consult a healthcare professional for diagnosis.</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 flex items-start gap-2">
        <span className="font-semibold shrink-0">⚠ Disclaimer:</span>
        <span>All information is educational only. This platform does not provide medical diagnosis or treatment advice.</span>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={query} onChange={handleSearch} placeholder="Search diseases…" className="flex-1" />
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Filter size={14} />
          <span>{filtered.length} results</span>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {diseaseCategories.slice(0, 12).map(cat => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
              category === cat
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <EmptyState
          icon={<FlaskConical size={28} />}
          title="No diseases found"
          description="Try a different search term or category."
          action={<button onClick={() => { setQuery(''); setCategory('All') }} className="btn-secondary">Clear Filters</button>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map(d => (
            <button
              key={d.id}
              onClick={() => navigate(`/diseases/${d.id}`)}
              className="card-hover text-left group"
              aria-label={`Learn about ${d.name}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">{d.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="badge-blue text-[10px] mb-1">{d.category}</span>
                  <h3 className="font-bold text-slate-800 text-base mb-1">{d.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{d.overview.slice(0, 100)}…</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                <span>{d.symptoms.length} Symptoms</span>
                <span>{d.treatments.length} Treatments</span>
                <span className="ml-auto flex items-center gap-1 text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={12} />
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center pt-4">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  )
}
