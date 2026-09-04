import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, MapPin, Clock, CheckCircle, Filter, SlidersHorizontal, X } from 'lucide-react'
import { doctors, doctorSpecialties } from '../data/demo'
import SearchBar from '../components/ui/SearchBar'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import { Stethoscope } from 'lucide-react'

export default function Doctors() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [minRating, setMinRating] = useState(0)

  const filtered = useMemo(() => {
    return doctors.filter(d => {
      const matchQ = !query || d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.specialty.toLowerCase().includes(query.toLowerCase()) ||
        d.hospital.toLowerCase().includes(query.toLowerCase())
      const matchS = specialty === 'All' || d.specialty === specialty
      const matchR = d.rating >= minRating
      return matchQ && matchS && matchR
    })
  }, [query, specialty, minRating])

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="section-title">Find a Doctor</h1>
        <p className="section-subtitle">Browse verified healthcare professionals. Use fictional demo profiles for demonstration purposes.</p>
      </div>

      {/* Search row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by name, specialty, hospital…" className="flex-1" />
        <button onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
            showFilters ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-slate-200 text-slate-600 hover:border-primary-300'
          }`}>
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="card border-primary-100 bg-primary-50/50 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Specialty</label>
              <select value={specialty} onChange={e => setSpecialty(e.target.value)} className="input">
                {doctorSpecialties.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Minimum Rating</label>
              <select value={minRating} onChange={e => setMinRating(Number(e.target.value))} className="input">
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.8}>4.8+ Stars</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={() => { setSpecialty('All'); setMinRating(0); setQuery('') }}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition-colors">
                <X size={14} /> Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Specialty pills */}
      <div className="flex flex-wrap gap-2">
        {doctorSpecialties.slice(0, 8).map(s => (
          <button key={s} onClick={() => setSpecialty(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              specialty === s ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-600'
            }`}>
            {s}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 flex items-center gap-1.5">
        <Filter size={13} /> {filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Doctor cards */}
      {filtered.length === 0 ? (
        <EmptyState icon={<Stethoscope size={28} />} title="No doctors found"
          action={<button onClick={() => { setQuery(''); setSpecialty('All') }} className="btn-secondary">Clear Filters</button>} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(d => (
            <div key={d.id} className="card-hover flex flex-col" role="article" aria-label={`Dr. ${d.name}`}>
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {d.name.split(' ').pop()!.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  {d.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 mb-0.5">
                      <CheckCircle size={10} /> Verified
                    </span>
                  )}
                  <h3 className="font-bold text-slate-800 text-sm leading-tight truncate">{d.name}</h3>
                  <p className="text-xs text-primary-600 font-medium">{d.specialty}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-1.5 flex-1">
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin size={11} className="text-slate-400" /> {d.location}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Clock size={11} className="text-slate-400" /> {d.availability}
                </p>
                <p className="text-xs text-slate-500">{d.experience} yrs experience</p>
              </div>

              {/* Rating + fee */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-slate-700">{d.rating}</span>
                  <span className="text-xs text-slate-400">({d.reviewCount})</span>
                </div>
                <span className="text-xs font-semibold text-slate-700">Rs. {d.consultationFee.toLocaleString()}</span>
              </div>

              {/* Languages */}
              <div className="flex flex-wrap gap-1 mt-2">
                {d.languages.map(lang => (
                  <Badge key={lang} variant="gray">{lang}</Badge>
                ))}
              </div>

              {/* CTA */}
              <button onClick={() => navigate(`/doctors/${d.id}`)}
                className="btn-primary w-full mt-3 text-xs py-2">
                View Profile & Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
