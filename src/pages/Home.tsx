import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, Search, Star, MapPin, Clock,
  CheckCircle, ArrowRight, Shield, Activity, Users, Calendar,
  FileText, Stethoscope, AlertTriangle,
} from 'lucide-react'
import Footer from '../components/Footer'
import Accordion from '../components/ui/Accordion'
import { doctors, diseases } from '../data/demo'

// ─── Hero Carousel ───────────────────────────────────────────────────────────
const slides = [
  {
    title: 'Understand Your Health',
    desc: 'Explore our comprehensive library of diseases, symptoms, prevention tips, and healthy living guides.',
    icon: '🧬', color: 'from-primary-600 to-primary-800',
    cta: 'Explore Diseases', path: '/diseases',
  },
  {
    title: 'Find Qualified Doctors',
    desc: 'Browse verified specialists by specialty, location, and availability. Book your appointment in minutes.',
    icon: '👨‍⚕️', color: 'from-cyan-600 to-primary-700',
    cta: 'Find a Doctor', path: '/doctors',
  },
  {
    title: 'Track Your Health Journey',
    desc: 'Manage appointments, medical records, lab reports, and prescriptions — all in one place.',
    icon: '📋', color: 'from-indigo-600 to-primary-700',
    cta: 'View Dashboard', path: '/patient/dashboard',
  },
  {
    title: 'Manage Your Appointments',
    desc: 'Book consultations, check your queue position, and receive real-time status updates.',
    icon: '📅', color: 'from-primary-700 to-cyan-700',
    cta: 'Book Appointment', path: '/appointments',
  },
  {
    title: 'Stay Informed & Healthy',
    desc: 'Read trusted, educational health content written by qualified healthcare professionals.',
    icon: '📖', color: 'from-teal-600 to-primary-700',
    cta: 'Read Articles', path: '/articles',
  },
]

function HeroCarousel() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [])
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 4500)
    return () => clearInterval(t)
  }, [paused, next])

  const slide = slides[current]

  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${slide.color} p-8 md:p-12 text-white transition-all duration-500`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Healthcare feature carousel"
      aria-roledescription="carousel"
    >
      {/* Background decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4" aria-hidden="true" />

      <div className="relative flex flex-col sm:flex-row items-center gap-8">
        <div className="text-7xl flex-shrink-0 animate-float" aria-hidden="true">{slide.icon}</div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">{slide.title}</h2>
          <p className="text-white/80 mb-5 max-w-md text-sm md:text-base">{slide.desc}</p>
          <button onClick={() => navigate(slide.path)} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-lg">
            {slide.cta} <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-y-0 left-3 flex items-center">
        <button onClick={prev} className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors" aria-label="Previous slide">
          <ChevronLeft size={18} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-3 flex items-center">
        <button onClick={next} className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors" aria-label="Next slide">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5" role="tablist" aria-label="Carousel indicators">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} role="tab" aria-selected={i === current}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Features grid ────────────────────────────────────────────────────────────
const features = [
  { icon: <Stethoscope size={24} className="text-primary-600" />, title: 'Find Doctors', desc: 'Browse verified specialists and book appointments.', bg: 'bg-primary-50' },
  { icon: <Calendar     size={24} className="text-cyan-600"    />, title: 'Appointments',  desc: 'Schedule, track, and manage all your appointments.',  bg: 'bg-cyan-50' },
  { icon: <Users        size={24} className="text-emerald-600" />, title: 'Patient Queue', desc: 'Real-time digital queue tracking for clinics.',        bg: 'bg-emerald-50' },
  { icon: <FileText     size={24} className="text-purple-600"  />, title: 'Medical Records', desc: 'Securely view your health history and prescriptions.', bg: 'bg-purple-50' },
  { icon: <Activity     size={24} className="text-rose-600"    />, title: 'Health Reports', desc: 'Upload, organize, and access your lab reports.',       bg: 'bg-rose-50' },
  { icon: <Shield       size={24} className="text-amber-600"   />, title: 'Health Information', desc: 'Learn about diseases, medicines, and wellness.', bg: 'bg-amber-50' },
]

// ─── How it works ─────────────────────────────────────────────────────────────
const steps = [
  { n: '01', title: 'Create Your Account', desc: 'Sign up as a patient in seconds. Your data stays private and secure.' },
  { n: '02', title: 'Find & Book a Doctor', desc: 'Search by specialty or condition and book a convenient time slot.' },
  { n: '03', title: 'Attend Consultation', desc: 'Track your queue position and attend your appointment stress-free.' },
  { n: '04', title: 'Manage Your Health', desc: 'View prescriptions, records, and reports all in your personal dashboard.' },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  { question: 'How do I book an appointment?', answer: 'Navigate to "Find Doctors", select a specialist, choose your preferred date and time, enter your reason for visit, and confirm. You will receive a confirmation with your queue number.' },
  { question: 'Is BE CAREFUL a substitute for professional medical advice?', answer: 'No. BE CAREFUL is an educational and management platform. All health information is for educational purposes only. Always consult a qualified healthcare professional for diagnosis and treatment.' },
  { question: 'How does the patient queue system work?', answer: 'When your appointment is confirmed, you are assigned a queue number. You can track your real-time position in the queue from your dashboard or the Queue page.' },
  { question: 'Can I view my medical records and prescriptions?', answer: 'Yes. Once you have appointments on record, your medical records, prescriptions, and health reports are accessible in your personal patient dashboard.' },
  { question: 'How do doctors join BE CAREFUL?', answer: 'Doctors can register through the Doctor Registration page. Accounts undergo a verification process before being listed on the platform.' },
  { question: 'Is my health data private?', answer: 'BE CAREFUL is designed with privacy in mind. This is a demonstration platform — do not enter real personal health information in this demo version.' },
]

// ─── Popular Conditions ───────────────────────────────────────────────────────
const popularConditions = diseases.slice(0, 6)

export default function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState<typeof diseases>([])

  const handleSearch = (q: string) => {
    setSearchQuery(q)
    if (q.length > 1) {
      setSearchSuggestions(diseases.filter(d => d.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5))
    } else {
      setSearchSuggestions([])
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-cyan-50 pt-16 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div className="animate-fade-in">
              <span className="badge-blue mb-4 inline-flex">🏥 Trusted Healthcare Platform</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-5">
                Your Health Deserves{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-cyan-500">
                  Better Care
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                BE CAREFUL helps you discover healthcare information, find qualified doctors,
                book appointments, track your queue, and manage your health records — all in one place.
              </p>
              {/* Search bar */}
              <div className="relative max-w-md mb-6">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search diseases, medicines, doctors…"
                  value={searchQuery}
                  onChange={e => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm bg-white"
                  aria-label="Search health information"
                />
                {searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-20">
                    {searchSuggestions.map(d => (
                      <button key={d.id} onClick={() => navigate(`/diseases/${d.id}`)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-left text-sm">
                        <span className="text-xl">{d.icon}</span>
                        <span className="text-slate-700">{d.name}</span>
                        <span className="ml-auto text-xs text-slate-400">{d.category}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate('/doctors')} className="btn-primary text-base py-3 px-7">
                  Find a Doctor
                </button>
                <button onClick={() => navigate('/diseases')} className="btn-secondary text-base py-3 px-7">
                  Explore Health Info
                </button>
              </div>
              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 mt-8">
                {[{ n: '500+', l: 'Diseases' }, { n: '50+', l: 'Doctors' }, { n: '10K+', l: 'Resources' }].map(s => (
                  <div key={s.l} className="text-center">
                    <p className="text-2xl font-extrabold text-primary-700">{s.n}</p>
                    <p className="text-xs text-slate-500 font-medium">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating cards preview */}
            <div className="relative hidden lg:flex items-center justify-center animate-fade-in">
              {/* Main dashboard card */}
              <div className="w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">J</div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Good Morning, John 👋</p>
                    <p className="text-xs text-slate-400">Your health overview</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[{ l: 'Appointments', v: '3', c: 'bg-primary-50 text-primary-700' },
                    { l: 'Queue No.', v: 'A-024', c: 'bg-emerald-50 text-emerald-700' },
                    { l: 'Records', v: '12', c: 'bg-purple-50 text-purple-700' },
                    { l: 'Reports', v: '5', c: 'bg-amber-50 text-amber-700' }].map(s => (
                    <div key={s.l} className={`rounded-xl p-3 ${s.c}`}>
                      <p className="text-xs opacity-70">{s.l}</p>
                      <p className="font-bold text-lg">{s.v}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary-50 rounded-xl p-3">
                  <p className="text-xs text-primary-600 font-semibold mb-1">Next Appointment</p>
                  <p className="text-sm font-bold text-slate-800">Dr. Sarah Mitchell</p>
                  <p className="text-xs text-slate-500">Cardiology • Sep 10 at 10:00 AM</p>
                </div>
              </div>
              {/* Floating doctor card */}
              <div className="absolute -top-6 -right-4 bg-white rounded-2xl shadow-lg border border-slate-100 p-3 w-52 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-primary-500 flex items-center justify-center text-white font-bold text-sm">S</div>
                  <div>
                    <p className="font-semibold text-slate-800 text-xs">Dr. Sarah Mitchell</p>
                    <p className="text-[10px] text-slate-400">Cardiologist</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-semibold text-slate-700">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Queue status card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-slate-100 p-3 w-44 animate-float" style={{ animationDelay: '1.5s' }}>
                <p className="text-[10px] text-slate-400 font-medium">Your Queue</p>
                <p className="text-3xl font-black text-primary-700 leading-none">A-024</p>
                <p className="text-[10px] text-slate-500 mt-1">3 patients ahead</p>
                <div className="mt-2 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-primary-500 rounded-full w-3/4" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Carousel ── */}
      <section className="max-w-7xl mx-auto px-6 py-10" aria-labelledby="carousel-heading">
        <h2 id="carousel-heading" className="section-title mb-4">Everything You Need for Better Health</h2>
        <HeroCarousel />
      </section>

      {/* ── Features ── */}
      <section className="max-w-7xl mx-auto px-6 py-10" aria-labelledby="features-heading">
        <div className="text-center mb-10">
          <h2 id="features-heading" className="section-title">Complete Healthcare Ecosystem</h2>
          <p className="section-subtitle">Everything you need to manage your health, in one platform.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => (
            <div key={f.title} className="card-hover group">
              <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-1.5">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Popular Conditions ── */}
      <section className="bg-slate-50 py-14 px-6" aria-labelledby="conditions-heading">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 id="conditions-heading" className="section-title">Popular Health Conditions</h2>
              <p className="section-subtitle">Explore our educational disease information library.</p>
            </div>
            <button onClick={() => navigate('/diseases')} className="btn-ghost hidden sm:flex">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularConditions.map(d => (
              <button
                key={d.id}
                onClick={() => navigate(`/diseases/${d.id}`)}
                className="card-hover text-left flex items-start gap-4"
                aria-label={`Learn about ${d.name}`}
              >
                <span className="text-3xl flex-shrink-0">{d.icon}</span>
                <div>
                  <span className="badge-blue text-[10px] mb-1">{d.category}</span>
                  <h3 className="font-bold text-slate-800">{d.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{d.overview.slice(0, 80)}…</p>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <button onClick={() => navigate('/diseases')} className="btn-secondary">View All Conditions</button>
          </div>
        </div>
      </section>

      {/* ── Find a Doctor ── */}
      <section className="max-w-7xl mx-auto px-6 py-14" aria-labelledby="doctors-heading">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="doctors-heading" className="section-title">Featured Doctors</h2>
            <p className="section-subtitle">Verified healthcare professionals ready to help.</p>
          </div>
          <button onClick={() => navigate('/doctors')} className="btn-ghost hidden sm:flex">
            All Doctors <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {doctors.slice(0, 4).map(d => (
            <button
              key={d.id}
              onClick={() => navigate(`/doctors/${d.id}`)}
              className="card-hover text-left"
              aria-label={`View profile of ${d.name}`}
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-2xl mb-3">
                {d.name.split(' ').pop()!.charAt(0)}
              </div>
              {d.verified && (
                <span className="badge-green text-[10px] mb-1 flex items-center gap-1 w-fit">
                  <CheckCircle size={9} /> Verified
                </span>
              )}
              <h3 className="font-bold text-slate-800 text-sm">{d.name}</h3>
              <p className="text-xs text-primary-600 font-medium">{d.specialty}</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <MapPin size={10} /> {d.location}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-slate-700">{d.rating}</span>
                </div>
                <span className="text-xs text-slate-400">({d.reviewCount})</span>
                <span className="text-xs text-slate-400 ml-auto flex items-center gap-0.5">
                  <Clock size={10} /> {d.availability}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-14 px-6" aria-labelledby="how-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 id="how-heading" className="text-3xl font-extrabold text-white mb-2">How BE CAREFUL Works</h2>
            <p className="text-primary-200">Simple steps to better healthcare management.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-extrabold text-white/90">{s.n}</span>
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-primary-200">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-0 h-px bg-white/20" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => navigate('/register')} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-xl text-base">
              Get Started Free <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Medical Disclaimer ── */}
      <section className="max-w-7xl mx-auto px-6 py-10" aria-labelledby="disclaimer-heading">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
          <AlertTriangle size={24} className="text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2 id="disclaimer-heading" className="font-bold text-amber-800 mb-1">Important Medical Disclaimer</h2>
            <p className="text-sm text-amber-700 leading-relaxed">
              BE CAREFUL provides educational healthcare information and digital management tools.
              <strong> It does not replace professional medical diagnosis, treatment, prescription, or emergency care.</strong>
              {' '}All health information on this platform is for educational purposes only.
              Always consult a qualified and licensed healthcare professional for any medical concerns.
              In case of emergency, contact your local emergency services immediately.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-50 py-14 px-6" aria-labelledby="faq-home-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 id="faq-home-heading" className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Quick answers to common questions.</p>
          </div>
          <Accordion items={faqs} />
          <div className="text-center mt-6">
            <button onClick={() => navigate('/faq')} className="btn-ghost">
              View All FAQs <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-7xl mx-auto px-6 py-14 text-center" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          Join BE CAREFUL and access a complete healthcare management ecosystem designed for patients, doctors, and administrators.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => navigate('/register')} className="btn-primary text-base py-3.5 px-8">
            Create Patient Account
          </button>
          <button onClick={() => navigate('/doctor/register')} className="btn-secondary text-base py-3.5 px-8">
            Join as a Doctor
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
