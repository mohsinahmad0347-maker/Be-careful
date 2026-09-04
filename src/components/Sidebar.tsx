import { useNavigate, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import {
  LayoutDashboard, Calendar, Stethoscope, Users, FlaskConical, Pill,
  Dumbbell, FileText, BarChart2, MessageSquare, Bell, BookOpen,
  HelpCircle, AlertTriangle, Settings, LogOut, UserCircle,
  ChevronLeft, ChevronRight, X, Info, Shield,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Logo from './Logo'

interface NavItem {
  label: string
  icon: React.ReactNode
  path: string
  badge?: number
}

interface NavSection {
  title: string
  items: NavItem[]
}

function useNavSections(): NavSection[] {
  const { notifications, messages, user } = useApp()

  const main: NavItem[] = [
    { label: 'Dashboard',       icon: <LayoutDashboard size={18} />, path: user?.role === 'doctor' ? '/doctor/dashboard' : user?.role === 'admin' ? '/admin/dashboard' : '/patient/dashboard' },
    { label: 'Appointments',    icon: <Calendar      size={18} />, path: '/appointments' },
    { label: 'Find Doctors',    icon: <Stethoscope   size={18} />, path: '/doctors' },
    { label: 'Patient Queue',   icon: <Users         size={18} />, path: '/queue' },
  ]

  const health: NavItem[] = [
    { label: 'Diseases',              icon: <FlaskConical size={18} />, path: '/diseases' },
    { label: 'Medicines',             icon: <Pill         size={18} />, path: '/medicines' },
    { label: 'Exercises & Wellness',  icon: <Dumbbell     size={18} />, path: '/exercises' },
    { label: 'Medical Records',       icon: <FileText     size={18} />, path: '/records' },
    { label: 'Health Reports',        icon: <BarChart2    size={18} />, path: '/reports' },
    { label: 'Symptom Explorer',      icon: <Info         size={18} />, path: '/symptoms' },
  ]

  const communication: NavItem[] = [
    { label: 'Messages',       icon: <MessageSquare size={18} />, path: '/messages',      badge: messages },
    { label: 'Notifications',  icon: <Bell          size={18} />, path: '/notifications', badge: notifications },
  ]

  const resources: NavItem[] = [
    { label: 'Health Articles',       icon: <BookOpen      size={18} />, path: '/articles' },
    { label: 'FAQ',                   icon: <HelpCircle    size={18} />, path: '/faq' },
    { label: 'Emergency Information', icon: <AlertTriangle size={18} />, path: '/emergency' },
  ]

  return [
    { title: 'MAIN',          items: main },
    { title: 'HEALTH',        items: health },
    { title: 'COMMUNICATION', items: communication },
    { title: 'RESOURCES',     items: resources },
  ]
}

function NavItemRow({ item, collapsed, onClick }: { item: NavItem; collapsed: boolean; onClick?: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/')

  return (
    <li>
      <button
        onClick={() => { navigate(item.path); onClick?.() }}
        title={collapsed ? item.label : undefined}
        className={clsx(
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 font-medium text-sm relative group',
          active
            ? 'bg-primary-50 text-primary-700 font-semibold'
            : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'
        )}
        aria-current={active ? 'page' : undefined}
      >
        <span className={clsx('flex-shrink-0', active ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-500')}>
          {item.icon}
        </span>
        {!collapsed && (
          <span className="flex-1 truncate">{item.label}</span>
        )}
        {!collapsed && item.badge && item.badge > 0 ? (
          <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {item.badge > 9 ? '9+' : item.badge}
          </span>
        ) : null}
        {/* Tooltip for collapsed */}
        {collapsed && (
          <span className="absolute left-14 z-50 bg-slate-800 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            {item.label}
            {item.badge && item.badge > 0 ? ` (${item.badge})` : ''}
          </span>
        )}
      </button>
    </li>
  )
}

interface SidebarProps {
  mobile?: boolean
  onClose?: () => void
}

export default function Sidebar({ mobile = false, onClose }: SidebarProps) {
  const { user, logout, sidebarCollapsed, setSidebarCollapsed } = useApp()
  const navigate = useNavigate()
  const sections = useNavSections()

  const handleLogout = () => {
    logout()
    navigate('/login')
    onClose?.()
  }

  return (
    <aside
      className={clsx(
        'flex flex-col h-full bg-white border-r border-slate-100 shadow-sidebar overflow-hidden sidebar-transition',
        mobile ? 'w-72' : sidebarCollapsed ? 'w-[76px]' : 'w-64'
      )}
      aria-label="Main navigation"
    >
      {/* Header */}
      <div className={clsx(
        'flex items-center border-b border-slate-100 flex-shrink-0',
        sidebarCollapsed && !mobile ? 'justify-center px-3 py-4' : 'justify-between px-4 py-4'
      )}>
        <Logo collapsed={sidebarCollapsed && !mobile} onClick={onClose} />
        {/* Close button on mobile */}
        {mobile && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" aria-label="Close menu">
            <X size={20} />
          </button>
        )}
        {/* Collapse toggle on desktop */}
        {!mobile && (
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2" aria-label="Site navigation">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            {!sidebarCollapsed || mobile ? (
              <p className="px-3 mb-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                {section.title}
              </p>
            ) : (
              <div className="my-2 border-t border-slate-100" />
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <NavItemRow
                  key={item.path}
                  item={item}
                  collapsed={sidebarCollapsed && !mobile}
                  onClick={mobile ? onClose : undefined}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom profile section */}
      <div className={clsx(
        'border-t border-slate-100 flex-shrink-0',
        sidebarCollapsed && !mobile ? 'px-2 py-3' : 'px-3 py-3'
      )}>
        {/* User info */}
        {(!sidebarCollapsed || mobile) && user && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-xl bg-slate-50">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
              <p className="text-xs text-slate-400 capitalize flex items-center gap-1">
                {user.role === 'doctor' && <Shield size={10} className="text-emerald-500" />}
                {user.role === 'doctor' ? 'Verified Doctor' : user.role === 'admin' ? 'Administrator' : 'Patient'}
              </p>
            </div>
          </div>
        )}

        <ul className="space-y-0.5">
          <NavItemRow
            item={{ label: 'Settings', icon: <Settings size={18} />, path: '/settings' }}
            collapsed={sidebarCollapsed && !mobile}
            onClick={mobile ? onClose : undefined}
          />
          <NavItemRow
            item={{ label: 'Profile', icon: <UserCircle size={18} />, path: '/profile' }}
            collapsed={sidebarCollapsed && !mobile}
            onClick={mobile ? onClose : undefined}
          />
          <li>
            <button
              onClick={handleLogout}
              title={sidebarCollapsed && !mobile ? 'Logout' : undefined}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 relative group"
            >
              <LogOut size={18} className="flex-shrink-0" />
              {(!sidebarCollapsed || mobile) && <span>Logout</span>}
              {sidebarCollapsed && !mobile && (
                <span className="absolute left-14 z-50 bg-slate-800 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  Logout
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}
