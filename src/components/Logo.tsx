import { useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'

interface LogoProps {
  collapsed?: boolean
  className?: string
  onClick?: () => void
}

export default function Logo({ collapsed = false, className, onClick }: LogoProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    onClick?.()
    navigate('/')
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl p-1 -m-1',
        className
      )}
      aria-label="BE CAREFUL – Go to home"
    >
      {/* Medical Cross Icon */}
      <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-md flex items-center justify-center">
        <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" aria-hidden="true">
          {/* Cross */}
          <rect x="13" y="5" width="6" height="22" rx="2" fill="white" />
          <rect x="5"  y="13" width="22" height="6" rx="2" fill="white" />
          {/* Small heart */}
          <circle cx="16" cy="16" r="2.5" fill="rgba(255,255,255,0.25)" />
        </svg>
        {/* Pulse dot */}
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse-slow" />
      </div>

      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <span className="font-extrabold text-primary-700 tracking-tight text-base leading-none">
            BE CAREFUL
          </span>
          <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase mt-0.5">
            Healthcare Platform
          </span>
        </div>
      )}
    </button>
  )
}
