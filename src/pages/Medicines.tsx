import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pill, ArrowRight, Lock, Filter } from 'lucide-react'
import { medicines, medicineCategories } from '../data/demo'
import SearchBar from '../components/ui/SearchBar'
import Pagination from '../components/ui/Pagination'
import EmptyState from '../components/ui/EmptyState'
import Badge from '../components/ui/Badge'

const PER_PAGE = 9

export default function Medicines() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return medicines.filter(m => {
      const matchQ = !query ||
        m.genericName.toLowerCase().includes(query.toLowerCase()) ||
        m.brandNames.some(b => b.toLowerCase().includes(query.toLowerCase())) ||
        m.category.toLowerCase().includes(query.toLowerCase())
      const matchC = category === 'All' || m.category.includes(category.replace('All', ''))
      return matchQ && matchC
    })
  }, [query, category])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="section-title">Medicine Information Library</h1>
        <p className="section-subtitle">Educational reference for medicines. Always consult a healthcare professional before taking any medication.</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 flex items-start gap-2">
        <Pill size={14} className="shrink-0 mt-0.5" />
        <span><strong>Important Medical Notice:</strong> Medicine information on this platform is for educational purposes only. Never self-medicate. Always consult a qualified healthcare professional before starting, stopping, or changing any medication.</span>
      </div>

      {/* Search + count */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={query} onChange={q => { setQuery(q); setPage(1) }} placeholder="Search medicines…" className="flex-1" />
        <div className="flex items-center gap-2 text-sm text-slate-500"><Filter size={14} />{filtered.length} results</div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {medicineCategories.slice(0, 10).map(cat => (
          <button key={cat} onClick={() => { setCategory(cat); setPage(1) }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              category === cat ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-600'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <EmptyState icon={<Pill size={28} />} title="No medicines found" description="Try a different search or category."
          action={<button onClick={() => { setQuery(''); setCategory('All') }} className="btn-secondary">Clear Filters</button>} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map(m => (
            <button key={m.id} onClick={() => navigate(`/medicines/${m.id}`)}
              className="card-hover text-left group" aria-label={`Learn about ${m.genericName}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant="blue">{m.category.split('(')[0].trim()}</Badge>
                    {m.prescriptionRequired && (
                      <span className="flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        <Lock size={9} /> Rx Required
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800">{m.genericName}</h3>
                  <p className="text-xs text-slate-400">{m.brandNames.slice(0, 2).join(', ')}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{m.uses}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>{m.sideEffects.length} known side effects</span>
                <span className="text-primary-600 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Details <ArrowRight size={12} />
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-center pt-4">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  )
}
