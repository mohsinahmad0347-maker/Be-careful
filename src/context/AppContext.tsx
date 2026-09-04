import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'patient' | 'doctor' | 'admin' | null

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  specialty?: string
  verified?: boolean
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  setIsLoading: (v: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
  notifications: number
  messages: number
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    // Restore session from localStorage
    const saved = localStorage.getItem('bc_user')
    if (saved) {
      try { setUser(JSON.parse(saved)) } catch {}
    }
  }, [])

  const handleSetUser = (u: User | null) => {
    setUser(u)
    if (u) localStorage.setItem('bc_user', JSON.stringify(u))
    else localStorage.removeItem('bc_user')
  }

  const logout = () => {
    handleSetUser(null)
    setSidebarOpen(false)
  }

  return (
    <AppContext.Provider value={{
      user, setUser: handleSetUser,
      isLoading, setIsLoading,
      sidebarOpen, setSidebarOpen,
      sidebarCollapsed, setSidebarCollapsed,
      notifications: 5, messages: 3,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
