import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Menu, Search, Bell, MessageSquare, ChevronDown,
  Settings, LogOut, X, User, Shield,
} from 'lucide-react'
import { clsx } from 'clsx'
import { useApp } from '../context/AppContext'
import { doctors, diseases, medicines, exercises, articles } from '../data/demo'

// Page title map
const pageTitles: Record<string, string> = {
  '/':                      'Home',
  '/patient/dashboard':     'Patient Dashboard',
  '/doctor/dashboard':      'Doctor Dashboard',
  '/admin/dashboard':       'Admin Dashboard',
  '/appointments':          'Appointments',
  '/doctors':               'Find Doctors',
  '/queue':                 'Patient Queue',
  '/diseases':              'Disease Database',
  '/medicines':             'Medicine Database',
  '/exercises':             'Exercises & Wellness',
  '/records':               'Medical Records',
  '/reports':               'Health Reports',
  '/symptoms':              'Symptom Explorer',
  '/messages':              'Messages',
  '/notifications':         'Notifications',
  '/articles':              'Health Articles',
  '/faq':                   'FAQ',
  '/emergency':             'Emergency Information',
  '/settings':              'Settings',
  '/profile':               'My Profile',
  '/about':                 'About',
  '/contact':               'Contact Us',
  '/privacy':               'Privacy Policy',
  '/terms':                 'Terms & Conditions',
  '/prescriptions':         'Prescriptions',
}

function usePageTitle() {
  const location = useLocation()
  for (const [path, title] of Object.entries(pageTitles)) {
    if (location.pathname === path || (path !== '/' && location.pathname.startsWith(path + '/'))) {
      return title
    }
  }
  return 'BE CAREFUL'
}

interface SearchResult {
  type: string
  label: string
  path: string
}

function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (q: string) => {
    setQuery(q)
    if (q.length < 2) { setResults([]); setOpen(false); return }
    const lq = q.toLowerCase()
    const r: SearchResult[] = []
    doctors.filter(d => d.name.toLowerCase().includes(lq) || d.specialty.toLowerCase().includes(lq))
      .slice(0, 3).forEach(d => r.push({ type: 'Doctor', label: `${d.name} — ${d.specialty}`, path: `/doctors/${d.id}` }))
    diseases.filter(d => d.name.toLowerCase().includes(lq))
      .slice(0, 3).forEach(d => r.push({ type: 'Disease', label: d.name, path: `/diseases/${d.id}` }))
    medicines.filter(m => m.genericName.toLowerCase().includes(lq))
      .slice(0, 2).forEach(m => r.push({ type: 'Medicine', label: m.genericName, path: `/medicines/${m.id}` }))
    exercises.filter(e => e.name.toLowerCase().includes(lq))
      .slice(0, 2).forEach(e => r.push({ type: 'Exercise', label: e.name, path: `/exercises/${e.id}` }))
    articles.filter(a => a.title.toLowerCase().includes(lq))
      .slice(0, 2).forEach(a => r.push({ type: 'Article', label: a.title, path: `/articles/${a.id}` }))
    setResults(r)
    setOpen(r.length > 0)
  }

  const handleSelect = (path: string) => {
    navigate(path)
    setQuery('')
    setResults([])
    setOpen(false)
  }

  const typeColor: Record<string, string> = {
    Doctor: 'badge-blue', Disease: 'badge-orange', Medicine: 'badge-green',
    Exercise: 'badge-gray', Article: 'badge-gray',
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search doctors, diseases, medicines…"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          className="pl-9 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 focus:bg-white border border-transparent focus:border-primary-300 rounded-xl w-48 md:w-64 lg:w-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
          aria-label="Global search"
          aria-expanded={open}
          aria-autocomplete="list"
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); setOpen(false) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Clear search">
            <X size={14} />
          </button>
        )}
      </div>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in">
          <ul role="listbox">
            {results.map((r, i) => (
              <li key={i}>
                <button
                  onClick={() => handleSelect(r.path)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-left transition-colors"
                  role="option"
                >
                  <span className={clsx('badge text-xs', typeColor[r.type] || 'badge-gray')}>{r.type}</span>
                  <span className="text-sm text-slate-700 truncate">{r.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function ProfileDropdown() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => { logout(); navigate('/login') }

  if (!user) {
    return (
      <button onClick={() => navigate('/login')} className="btn-primary text-sm py-2 px-4">
        Sign In
      </button>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-slate-800 leading-none">{user.name.split(' ')[0]}</p>
          <p className="text-xs text-slate-400 capitalize mt-0.5">{user.role}</p>
        </div>
        <ChevronDown size={14} className={clsx('text-slate-400 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="font-semibold text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            <span className={clsx('badge mt-1.5', user.role === 'doctor' ? 'badge-green' : user.role === 'admin' ? 'badge-blue' : 'badge-gray')}>
              {user.role === 'doctor' ? '✓ Verified Doctor' : user.role === 'admin' ? 'Administrator' : 'Patient'}
            </span>
          </div>
          <ul className="py-1">
            <li>
              <button onClick={() => { navigate('/profile'); setOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <User size={15} className="text-slate-400" /> My Profile
              </button>
            </li>
            <li>
              <button onClick={() => { navigate('/settings'); setOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <Settings size={15} className="text-slate-400" /> Settings
              </button>
            </li>
            {user.role === 'admin' && (
              <li>
                <button onClick={() => { navigate('/admin/dashboard'); setOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <Shield size={15} className="text-slate-400" /> Admin Panel
                </button>
              </li>
            )}
            <li className="border-t border-slate-100 mt-1 pt-1">
              <button onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={15} /> Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

interface NavbarProps {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { notifications, messages, user } = useApp()
  const navigate = useNavigate()
  const pageTitle = usePageTitle()

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 h-16 px-4 md:px-6 bg-white/90 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* Page Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-slate-800 truncate">{pageTitle}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Search — hidden on very small screens */}
        <div className="hidden sm:block">
          <GlobalSearch />
        </div>

        {/* Notifications */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-primary-600 transition-colors"
          aria-label={`Notifications${notifications > 0 ? `, ${notifications} unread` : ''}`}
        >
          <Bell size={20} />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
              {notifications > 9 ? '9+' : notifications}
            </span>
          )}
        </button>

        {/* Messages */}
        <button
          onClick={() => navigate('/messages')}
          className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-primary-600 transition-colors"
          aria-label={`Messages${messages > 0 ? `, ${messages} unread` : ''}`}
        >
          <MessageSquare size={20} />
          {messages > 0 && (
            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
              {messages}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 mx-1" aria-hidden="true" />

        {/* Profile dropdown */}
        <ProfileDropdown />

        {/* Guest: login button for non-authenticated */}
        {!user && (
          <button
            onClick={() => navigate('/login')}
            className="hidden sm:inline-flex btn-primary text-sm py-2 px-4"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  )
}
