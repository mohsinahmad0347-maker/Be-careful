import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  footer?: React.ReactNode
}

const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' }

export default function Modal({ open, onClose, title, children, size = 'md', footer }: ModalProps) {
  const firstFocusRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      firstFocusRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={onClose} aria-hidden="true" />
      {/* Panel */}
      <div className={clsx('relative bg-white rounded-2xl shadow-2xl w-full animate-slide-up flex flex-col max-h-[90vh]', sizes[size])}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
            <h2 className="text-lg font-bold text-slate-800">{title}</h2>
            <button ref={firstFocusRef} onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" aria-label="Close">
              <X size={18} />
            </button>
          </div>
        )}
        {!title && (
          <button ref={firstFocusRef} onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors z-10" aria-label="Close">
            <X size={18} />
          </button>
        )}
        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 flex-shrink-0 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
