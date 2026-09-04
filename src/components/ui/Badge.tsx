import { clsx } from 'clsx'

type BadgeVariant = 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'purple'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  blue:   'bg-primary-100 text-primary-700',
  green:  'bg-emerald-100 text-emerald-700',
  orange: 'bg-amber-100 text-amber-700',
  red:    'bg-red-100 text-red-700',
  gray:   'bg-slate-100 text-slate-600',
  purple: 'bg-purple-100 text-purple-700',
}

export default function Badge({ children, variant = 'gray', className }: BadgeProps) {
  return (
    <span className={clsx('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    pending:   { variant: 'orange', label: 'Pending' },
    confirmed: { variant: 'blue',   label: 'Confirmed' },
    upcoming:  { variant: 'blue',   label: 'Upcoming' },
    completed: { variant: 'green',  label: 'Completed' },
    cancelled: { variant: 'red',    label: 'Cancelled' },
    waiting:   { variant: 'orange', label: 'Waiting' },
    active:    { variant: 'green',  label: 'Active' },
  }
  const cfg = map[status.toLowerCase()] ?? { variant: 'gray' as BadgeVariant, label: status }
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>
}
