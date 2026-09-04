import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, MapPin, Clock, CheckCircle, Phone, Video, MessageSquare, Calendar, Languages } from 'lucide-react'
import { doctors } from '../data/demo'
import Badge from '../components/ui/Badge'

const reviews = [
  { name: 'Amina M.', rating: 5, date: '2026-08-15', text: 'Excellent doctor, very thorough and explains everything clearly.' },
  { name: 'Tariq H.', rating: 5, date: '2026-08-10', text: 'Professional and caring. The consultation was very helpful.' },
  { name: 'Sara K.',  rating: 4, date: '2026-07-28', text: 'Good experience overall. Had to wait a bit but worth it.' },
]

const consultationIcons: Record<string, React.ReactNode> = {
  'In-Clinic': <Phone size={14} />,
  'Video':     <Video size={14} />,
  'Phone':     <Phone size={14} />,
}

export default function DoctorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const doctor = doctors.find(d => d.id === id)

  if (!doctor) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4">👨‍⚕️</span>
      <h2 className="text-xl font-bold text-slate-800 mb-2">Doctor Not Found</h2>
      <button onClick={() => navigate('/doctors')} className="btn-primary mt-4">Back to Doctors</button>
    </div>
  )

  return (
    <div className="space-y-6 max-w-4xl">
      <button onClick={() => navigate('/doctors')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 font-medium transition-colors">
        <ArrowLeft size={16} /> Back to Doctors
      </button>

      {/* Profile hero */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-black text-4xl flex-shrink-0">
            {doctor.name.split(' ').pop()!.charAt(0)}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {doctor.verified && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle size={11} /> Verified Doctor
                </span>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">{doctor.name}</h1>
            <p className="text-primary-600 font-semibold">{doctor.specialty}</p>
            <p className="text-sm text-slate-500 mt-1">{doctor.qualification}</p>

            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" />{doctor.location}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" />{doctor.timings}</span>
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <strong>{doctor.rating}</strong>
                <span className="text-slate-400">({doctor.reviewCount} reviews)</span>
              </span>
            </div>

            {/* Consultation types */}
            <div className="flex flex-wrap gap-2 mt-3">
              {doctor.consultationTypes.map(t => (
                <span key={t} className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
                  {consultationIcons[t] ?? <Phone size={12} />} {t}
                </span>
              ))}
            </div>
          </div>

          {/* Booking panel */}
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 w-full sm:w-56 flex-shrink-0">
            <p className="text-xs text-slate-500 font-medium mb-1">Consultation Fee</p>
            <p className="text-2xl font-extrabold text-primary-700">Rs. {doctor.consultationFee.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mb-4">Per consultation</p>
            <button onClick={() => navigate('/appointments')} className="btn-primary w-full text-sm py-2.5 mb-2">
              <Calendar size={14} /> Book Appointment
            </button>
            <button onClick={() => navigate('/messages')} className="btn-secondary w-full text-sm py-2">
              <MessageSquare size={14} /> Message
            </button>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* About */}
        <div className="card">
          <h2 className="font-bold text-slate-800 mb-3">About</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{doctor.about}</p>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2"><strong className="text-slate-700 w-28">Hospital:</strong> {doctor.hospital}</div>
            <div className="flex items-center gap-2"><strong className="text-slate-700 w-28">Experience:</strong> {doctor.experience} years</div>
            <div className="flex items-center gap-2"><strong className="text-slate-700 w-28">Availability:</strong> {doctor.availability}</div>
          </div>
        </div>

        {/* Languages + Consultation info */}
        <div className="card">
          <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Languages size={16} /> Languages
          </h2>
          <div className="flex flex-wrap gap-2 mb-5">
            {doctor.languages.map(l => <Badge key={l} variant="blue">{l}</Badge>)}
          </div>
          <h2 className="font-bold text-slate-800 mb-3">Consultation Options</h2>
          <div className="space-y-2">
            {doctor.consultationTypes.map(t => (
              <div key={t} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl text-sm text-slate-700">
                {consultationIcons[t]} {t} consultation available
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-emerald-50 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
            <Clock size={12} /> Timings: {doctor.timings}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800">Patient Reviews</h2>
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-amber-400 fill-amber-400" />
            <span className="font-bold text-slate-800">{doctor.rating}</span>
            <span className="text-sm text-slate-400">/ 5</span>
          </div>
        </div>
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center">
                    {r.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{r.name}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">{r.date}</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 pl-9">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate('/appointments')} className="btn-primary w-full sm:w-auto text-base py-3 px-8">
        Book an Appointment with {doctor.name}
      </button>
    </div>
  )
}
