import { useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import Logo from './Logo'

const links = {
  Platform: [
    { label: 'About', path: '/about' },
    { label: 'Find Doctors', path: '/doctors' },
    { label: 'Diseases', path: '/diseases' },
    { label: 'Medicines', path: '/medicines' },
    { label: 'Exercises', path: '/exercises' },
  ],
  Resources: [
    { label: 'Health Articles', path: '/articles' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Symptom Explorer', path: '/symptoms' },
    { label: 'Emergency Info', path: '/emergency' },
  ],
  Account: [
    { label: 'Patient Login', path: '/login' },
    { label: 'Doctor Login', path: '/doctor/login' },
    { label: 'Register', path: '/register' },
    { label: 'Contact Us', path: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms & Conditions', path: '/terms' },
  ],
}

export default function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-medical-navy text-slate-300 mt-20">
      {/* Medical disclaimer bar */}
      <div className="bg-amber-900/40 border-b border-amber-800/30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-start gap-3">
          <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-amber-200/80 leading-relaxed">
            <strong className="text-amber-300">Important Medical Disclaimer:</strong> BE CAREFUL provides educational healthcare information and digital management tools.
            It does not replace professional medical diagnosis, treatment, prescription, or emergency care.
            Always consult a qualified healthcare professional for medical concerns.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo className="mb-4" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Your Health. Your Care. Your Information.
              A premium healthcare information and management platform designed to help
              patients, doctors, and healthcare providers work better together.
            </p>
            {/* Social icons (decorative) */}
            <div className="flex gap-3 mt-5">
              {['f', 'in', 'tw', 'yt'].map(s => (
                <div key={s} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold text-slate-300 cursor-pointer transition-colors">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-sm font-bold text-white mb-4 tracking-wider uppercase">{section}</h3>
              <ul className="space-y-2.5">
                {items.map(link => (
                  <li key={link.path}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {year} BE CAREFUL Healthcare Platform. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Demo/Educational platform. All data is fictional.
          </p>
        </div>
      </div>
    </footer>
  )
}
