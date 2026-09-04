import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setOpen(prev => {
      const next = new Set(prev)
      if (next.has(i)) { next.delete(i) }
      else {
        if (!allowMultiple) next.clear()
        next.add(i)
      }
      return next
    })
  }

  return (
    <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 overflow-hidden bg-white">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
            aria-expanded={open.has(i)}
          >
            <span className="font-semibold text-slate-800 text-sm sm:text-base">{item.question}</span>
            <ChevronDown
              size={18}
              className={clsx('flex-shrink-0 text-slate-400 transition-transform duration-200', open.has(i) && 'rotate-180')}
            />
          </button>
          <div className={clsx(
            'overflow-hidden transition-all duration-300',
            open.has(i) ? 'max-h-96' : 'max-h-0'
          )}>
            <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
