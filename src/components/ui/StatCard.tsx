import { clsx } from 'clsx'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  iconBg?: string
  change?: number
  changeLabel?: string
  subtitle?: string
}

export default function StatCard({ title, value, icon, iconBg = 'bg-primary-50', change, changeLabel, subtitle }: StatCardProps) {
  const positive = change !== undefined && change >= 0

  return (
    <div className="stat-card">
      <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-extrabold text-slate-800 mt-0.5 leading-none">{value}</p>
        {(change !== undefined || subtitle) && (
          <div className="flex items-center gap-1.5 mt-1.5">
            {change !== undefined && (
              <span className={clsx('flex items-center gap-0.5 text-xs font-semibold', positive ? 'text-emerald-600' : 'text-red-500')}>
                {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {positive ? '+' : ''}{change}%
              </span>
            )}
            {changeLabel && <span className="text-xs text-slate-400">{changeLabel}</span>}
            {subtitle && !changeLabel && <span className="text-xs text-slate-400">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
