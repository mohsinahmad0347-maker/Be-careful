import { clsx } from 'clsx'

interface Tab { id: string; label: string; icon?: React.ReactNode }

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
  variant?: 'underline' | 'pills'
}

export default function Tabs({ tabs, active, onChange, variant = 'underline' }: TabsProps) {
  if (variant === 'pills') {
    return (
      <div className="flex flex-wrap gap-2" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150',
              active === tab.id
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-1 border-b border-slate-200 overflow-x-auto" role="tablist">
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-150 -mb-px',
            active === tab.id
              ? 'border-primary-600 text-primary-700'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
