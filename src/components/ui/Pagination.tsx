import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1
    if (page <= 3) return i + 1
    if (page >= totalPages - 2) return totalPages - 4 + i
    return page - 2 + i
  })

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={clsx(
            'min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors',
            p === page
              ? 'bg-primary-600 text-white'
              : 'hover:bg-slate-100 text-slate-600'
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}
