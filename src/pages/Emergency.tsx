import { AlertTriangle, Phone, Heart, Activity, Zap, Wind, Brain, Thermometer } from 'lucide-react'

const emergencySigns = [
  { icon: <Heart size={18} />, title: 'Chest Pain or Pressure', desc: 'Sudden severe chest pain, pressure, tightness, or discomfort — especially spreading to arm, jaw, or back.' },
  { icon: <Brain size={18} />, title: 'Stroke Symptoms', desc: 'Sudden face drooping, arm weakness, speech difficulty. Remember FAST: Face, Arms, Speech, Time.' },
  { icon: <Wind size={18} />, title: 'Severe Difficulty Breathing', desc: 'Sudden shortness of breath, choking, or inability to speak due to difficulty breathing.' },
  { icon: <Activity size={18} />, title: 'Severe Bleeding', desc: 'Uncontrolled heavy bleeding from any injury or wound that does not stop with direct pressure.' },
  { icon: <Zap size={18} />, title: 'Loss of Consciousness', desc: 'Person is unresponsive, unconscious, or cannot be awakened.' },
  { icon: <Thermometer size={18} />, title: 'Severe Allergic Reaction', desc: 'Throat swelling, difficulty breathing, severe skin reactions following exposure to an allergen.' },
]

const emergencyNumbers = [
  { service: 'Edhi Foundation (Ambulance)', number: '115' },
  { service: 'Rescue 1122',                number: '1122' },
  { service: 'Police',                     number: '15' },
  { service: 'Fire Brigade',               number: '16' },
  { service: 'Chhipa Ambulance',           number: '1020' },
]

export default function Emergency() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Critical alert banner */}
      <div className="bg-red-600 text-white rounded-2xl p-6 text-center animate-fade-in">
        <AlertTriangle size={40} className="mx-auto mb-3" aria-hidden="true" />
        <h1 className="text-2xl font-extrabold mb-2">Medical Emergency?</h1>
        <p className="text-red-100 mb-5 text-base">
          If you or someone is experiencing a life-threatening emergency, <strong>call emergency services immediately</strong>. Do not wait.
        </p>
        <a href="tel:115" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 font-bold rounded-xl text-lg hover:bg-red-50 transition-colors shadow-lg">
          <Phone size={22} /> Call 115 Now
        </a>
      </div>

      {/* Emergency numbers */}
      <div className="card">
        <h2 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <Phone size={18} className="text-red-500" /> Emergency Contact Numbers (Pakistan)
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {emergencyNumbers.map(e => (
            <a key={e.service} href={`tel:${e.number}`}
              className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors group">
              <span className="font-medium text-slate-800 text-sm">{e.service}</span>
              <span className="text-xl font-black text-red-600 group-hover:scale-110 transition-transform">{e.number}</span>
            </a>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3">Contact numbers are for Pakistan. International users should contact their local emergency services.</p>
      </div>

      {/* Warning signs */}
      <div className="card">
        <h2 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-500" /> Warning Signs — Call Emergency Services
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {emergencySigns.map(s => (
            <div key={s.title} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <span className="text-red-500 flex-shrink-0 mt-0.5">{s.icon}</span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General guidance */}
      <div className="card">
        <h2 className="font-bold text-slate-800 mb-4">General Emergency Guidance</h2>
        <ul className="space-y-3">
          {[
            'Stay calm — panicking can make the situation worse.',
            'Call emergency services immediately and give your exact location.',
            'Do not move an injured person unless they are in immediate danger.',
            'Stay on the line with emergency services and follow their instructions.',
            'If trained, begin CPR for an unresponsive person who is not breathing normally.',
            'For severe bleeding, apply firm direct pressure with a clean cloth.',
            'Do not give food or water to an unconscious or semi-conscious person.',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Important disclaimer */}
      <div className="bg-slate-800 text-white rounded-2xl p-5">
        <h3 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle size={16} className="text-amber-400" /> Important Notice</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          BE CAREFUL is an educational and management platform and <strong>cannot replace emergency medical services</strong>.
          In any life-threatening situation, immediately contact your local emergency services.
          The information on this page is for general awareness only and does not replace professional emergency medical training.
        </p>
      </div>
    </div>
  )
}
