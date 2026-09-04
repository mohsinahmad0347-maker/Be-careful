import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react'
import { articles } from '../data/demo'
import SearchBar from '../components/ui/SearchBar'
import Badge from '../components/ui/Badge'

const categories = ['All', 'Prevention', 'Nutrition', 'Fitness', 'General Health', "Women's Health", "Men's Health", "Children's Health", 'Mental Wellness', 'Medical Education']

const catColors: Record<string, 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'purple'> = {
  Prevention:          'green',
  Nutrition:           'orange',
  Fitness:             'blue',
  'General Health':    'blue',
  "Women's Health":    'purple',
  "Men's Health":      'blue',
  "Children's Health": 'green',
  'Mental Wellness':   'purple',
  'Medical Education': 'gray',
}

// Article gradient backgrounds
const gradients = [
  'from-blue-500 to-primary-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-indigo-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-primary-600',
]

export default function Articles() {
  const navigate = useNavigate()
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return articles.filter(a => {
      const mQ = !query || a.title.toLowerCase().includes(query.toLowerCase()) || a.excerpt.toLowerCase().includes(query.toLowerCase())
      const mC = category === 'All' || a.category === category
      return mQ && mC
    })
  }, [query, category])

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="section-title">Health Articles</h1>
        <p className="section-subtitle">Trusted educational healthcare content from our medical team.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={query} onChange={setQuery} placeholder="Search articles…" className="flex-1" />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              category === c ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-600'
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* Featured article */}
      {category === 'All' && !query && (
        <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${gradients[0]} p-8 text-white cursor-pointer hover:opacity-95 transition-opacity`}
          onClick={() => navigate(`/articles/${articles[0].id}`)}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/4 translate-x-1/4" />
          <Badge variant="green">Featured</Badge>
          <h2 className="text-2xl font-extrabold mt-3 mb-2 max-w-lg">{articles[0].title}</h2>
          <p className="text-white/80 text-sm max-w-lg mb-4">{articles[0].excerpt}</p>
          <div className="flex items-center gap-4 text-white/60 text-xs">
            <span className="flex items-center gap-1.5"><User size={12} /> {articles[0].author}</span>
            <span className="flex items-center gap-1.5"><Clock size={12} /> {articles[0].readTime}</span>
          </div>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="card text-center py-16">
          <BookOpen size={40} className="text-slate-200 mx-auto mb-3" />
          <p className="font-semibold text-slate-500">No articles found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(category === 'All' && !query ? filtered.slice(1) : filtered).map((a, i) => (
            <button key={a.id} onClick={() => navigate(`/articles/${a.id}`)}
              className="card-hover text-left group flex flex-col overflow-hidden p-0">
              {/* Colorful top bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${gradients[i % gradients.length]}`} />
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={catColors[a.category] ?? 'gray'}>{a.category}</Badge>
                  <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto"><Clock size={10} /> {a.readTime}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">{a.title}</h3>
                <p className="text-xs text-slate-500 flex-1 line-clamp-3 leading-relaxed">{a.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400 flex items-center gap-1"><User size={10} /> {a.author}</span>
                  <span className="text-xs text-primary-600 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
