import { useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import { useApp } from '../context/AppContext'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useApp()
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close drawer on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) setSidebarOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [sidebarOpen, setSidebarOpen])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={clsx(
        'hidden lg:flex flex-col flex-shrink-0 sidebar-transition',
        sidebarCollapsed ? 'w-[76px]' : 'w-64'
      )}>
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 mobile-overlay animate-fade-in"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="lg:hidden fixed inset-y-0 left-0 z-50 flex flex-col w-72 animate-slide-in">
            <Sidebar mobile onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main
          className="flex-1 overflow-y-auto p-4 md:p-6"
          id="main-content"
          aria-label="Main content"
        >
          <div className="max-w-[1400px] mx-auto page-enter">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
