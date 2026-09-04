import { useState } from 'react'
import { Stethoscope, FlaskConical, Pill, Image, FileText, Download, Plus } from 'lucide-react'
import { medicalRecords } from '../data/demo'
import SearchBar from '../components/ui/SearchBar'

const typeConfig: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
  'Doctor Visit':  { icon: <Stethoscope size={16} />, bg: 'bg-primary-50',  color: 'text-primary-600' },
  'Lab Report':    { icon: <FlaskConical size={16} />, bg: 'bg-emerald-50', color: 'text-emerald-600' },
  'Prescription':  { icon: <Pill size={16} />,         bg: 'bg-purple-50',  color: 'text-purple-600' },
  'Imaging':       { icon: <Image size={16} />,        bg: 'bg-cyan-50',    color: 'text-cyan-600' },
  'General':       { icon: <FileText size={16} />,     bg: 'bg-slate-50',   color: 'text-slate-600' },
}

export default function MedicalRecords() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const types = ['All', ...new Set(medicalRecords.map(r => r.type))]
  const filtered = medicalRecords.filter(r => {
    const matchQ = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.doctor.toLowerCase().includes(query.toLowerCase())
    const matchF = filter === 'All' || r.type === filter
    return matchQ && matchF
  })

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Medical Records</h1>
          <p className="section-subtitle">Your complete health history timeline.</p>
        </div>
        <button className="btn-primary text-sm py-2">
          <Plus size={14} /> Add Record
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={query} onChange={setQuery} placeholder="Search records…" className="flex-1" />
        <div className="flex flex-wrap gap-2">
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === t ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300'
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200" aria-hidden="true" />

        <div className="space-y-4">
          {filtered.map((record, i) => {
            const cfg = typeConfig[record.type] ?? typeConfig.General
            return (
              <div key={record.id} className="relative flex gap-5 animate-fade-in">
                {/* Timeline dot */}
                <div className={`w-10 h-10 rounded-xl ${cfg.bg} ${cfg.color} flex items-center justify-center flex-shrink-0 z-10 shadow-sm border border-white`}>
                  {cfg.icon}
                </div>
                {/* Card */}
                <div className="flex-1 card hover:shadow-card-hover transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{record.type}</span>
                      <h3 className="font-bold text-slate-800 mt-1">{record.title}</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-semibold text-slate-500">{record.date}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{record.doctor}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{record.notes}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                    <span className="text-xs text-slate-400">
                      {record.attachments > 0 ? `${record.attachments} attachment${record.attachments > 1 ? 's' : ''}` : 'No attachments'}
                    </span>
                    {record.attachments > 0 && (
                      <button className="flex items-center gap-1.5 text-xs text-primary-600 font-medium hover:underline">
                        <Download size={12} /> Download
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <FileText size={32} className="mx-auto mb-3 opacity-50" />
            <p className="font-medium">No records found</p>
          </div>
        )}
      </div>
    </div>
  )
}
