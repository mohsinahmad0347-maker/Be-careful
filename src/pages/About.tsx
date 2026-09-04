import { useNavigate } from 'react-router-dom'
import { Shield, Heart, Users, BookOpen, ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'

const values = [
  { icon: <Heart size={24} className="text-red-500" />, title: 'Patient-Centered', desc: 'Every feature is designed with the patient experience in mind.' },
  { icon: <Shield size={24} className="text-primary-600" />, title: 'Trustworthy', desc: 'We are committed to accuracy, safety, and transparency.' },
  { icon: <BookOpen size={24} className="text-emerald-600" />, title: 'Educational', desc: 'Empowering users with evidence-informed health knowledge.' },
  { icon: <Users size={24} className="text-purple-600" />, title: 'Collaborative', desc: 'Connecting patients and healthcare professionals effectively.' },
]

export default function About() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">About BE CAREFUL</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Your Health. Your Care. Your Information.
          </p>
        </div>

        {/* Mission */}
        <div className="card bg-gradient-to-br from-primary-50 to-cyan-50 border-primary-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            BE CAREFUL is a premium healthcare information and digital management platform designed to bridge the gap between
            patients and quality healthcare information. We provide a comprehensive ecosystem where patients can explore
            health conditions, find qualified doctors, book appointments, manage their health records, and access wellness resources.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            <strong>Important:</strong> BE CAREFUL is an educational and management platform. All health information provided
            is for educational purposes only and does not replace professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map(v => (
              <div key={v.title} className="card text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-3">{v.icon}</div>
                <h3 className="font-bold text-slate-800 mb-1">{v.title}</h3>
                <p className="text-xs text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform features */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">What BE CAREFUL Offers</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Educational disease information library', 'Medicine reference database',
              'Exercise and wellness guides', 'Doctor directory and profiles',
              'Appointment booking system', 'Digital patient queue management',
              'Personal medical records timeline', 'Prescription management',
              'Health reports organization', 'Patient-doctor messaging',
              'Symptom exploration tool', 'Patient & Doctor dashboards',
              'Admin management panel', 'Health articles library',
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" /> {f}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Get Started Today</h2>
          <p className="text-slate-500 mb-6">Join BE CAREFUL and take control of your healthcare journey.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('/register')} className="btn-primary">Create Account <ArrowRight size={16} /></button>
            <button onClick={() => navigate('/doctors')} className="btn-secondary">Find a Doctor</button>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700">
          <strong>Disclaimer:</strong> BE CAREFUL is a demonstration/educational platform. All doctor profiles, patient data, and medical records shown are entirely fictional. This platform does not provide medical diagnosis, treatment, or prescriptions. Always consult qualified healthcare professionals for medical concerns.
        </div>
      </div>
      <Footer />
    </div>
  )
}
