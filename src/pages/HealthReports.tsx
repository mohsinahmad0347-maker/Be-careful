import { useState } from 'react'
import { Upload, Download, FileText, FlaskConical, Image, Folder, Plus, Search } from 'lucide-react'
import SearchBar from '../components/ui/SearchBar'

const reports = [
  { id: 'r1', name: 'Complete Blood Count',   category: 'Laboratory', date: '2026-08-15', size: '1.2 MB', status: 'normal' },
  { id: 'r2', name: 'Lipid Profile',          category: 'Laboratory', date: '2026-08-15', size: '0.8 MB', status: 'review' },
  { id: 'r3', name: 'Chest X-Ray',            category: 'Imaging',    date: '2026-06-25', size: '4.5 MB', status: 'normal' },
  { id: 'r4', name: 'ECG Report',             category: 'Specialist', date: '2026-07-01', size: '2.1 MB', status: 'normal' },
  { id: 'r5', name: 'HbA1c Test',             category: 'Laboratory', date: '2026-09-01', size: '0.5 MB', status: 'high' },
  { id: 'r6', name: 'Urine Routine Exam',     category: 'Laboratory', date: '2026-08-20', size: '0.4 MB', status: 'normal' },
]

const catIcons: Record<string, React.ReactNode> = {
  Laboratory: <FlaskConical size={16} />,
  Imaging:    <Image size={16} />,
  Specialist: <FileText size={16} />,
  General:    <Folder size={16} />,
}

const statusCfg = {
  normal: { label: 'Normal',       classes: 'bg-emerald-100 text-emerald-700' },
  review: { label: 'Needs Review', classes: 'bg-amber-100  text-amber-700' },
  high:   { label: 'High',         classes: 'bg-red-100    text-red-700' },
}

export default function HealthReports() {
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState('All')
  const [dragging, setDragging] = useState(false)

  const categories = ['All', ...new Set(reports.map(r => r.category))]
  const filtered   = reports.filter(r => {
    const mQ = !query || r.name.toLowerCase().includes(query.toLowerCase())
    const mC = category === 'All' || r.category === category
    return mQ && mC
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Health Reports</h1>
          <p className="section-subtitle">Upload, organize, and access your medical reports.</p>
        </div>
        <button className="btn-primary text-sm py-2"><Plus size={14} /> Upload Report</button>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false) }}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${
          dragging ? 'border-primary-400 bg-primary-50' : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
        }`}
      >
        <Upload size={32} className="text-slate-300 mx-auto mb-3" />
        <p className="font-semibold text-slate-600">Drag & drop reports here, or click to browse</p>
        <p className="text-xs text-slate-400 mt-1">Supports PDF, JPG, PNG · Max 20MB per file</p>
        <button className="btn-secondary text-sm mt-4 py-2">Browse Files</button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={query} onChange={setQuery} placeholder="Search reports…" className="flex-1" />
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                category === c ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300'
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Reports grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => {
          const statusCls = statusCfg[r.status as keyof typeof statusCfg] ?? statusCfg.normal
          return (
            <div key={r.id} className="card-hover">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  {catIcons[r.category] ?? <FileText size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 text-sm truncate">{r.name}</h3>
                  <p className="text-xs text-slate-400">{r.category}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span>{r.date}</span>
                <span className={`font-semibold px-2 py-0.5 rounded-full ${statusCls.classes}`}>{statusCls.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{r.size}</span>
                <button className="flex items-center gap-1.5 text-xs text-primary-600 font-medium hover:underline">
                  <Download size={12} /> Download
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
        <strong>Important:</strong> Health reports displayed here are illustrative demo data. Do not upload real personal health information in this demo version. Report interpretation requires a qualified healthcare professional.
      </div>
    </div>
  )
}
