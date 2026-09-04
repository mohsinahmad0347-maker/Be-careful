import { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'
import { clsx } from 'clsx'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

const configs = {
  success: { icon: CheckCircle, classes: 'bg-emerald-50 border-emerald-200 text-emerald-800', iconClass: 'text-emerald-500' },
  error:   { icon: AlertCircle,   classes: 'bg-red-50 border-red-200 text-red-800',           iconClass: 'text-red-500'     },
  info:    { icon: Info,           classes: 'bg-blue-50 border-blue-200 text-blue-800',         iconClass: 'text-blue-500'    },
  warning: { icon: AlertTriangle,  classes: 'bg-amber-50 border-amber-200 text-amber-800',     iconClass: 'text-amber-500'   },
}

export default function Toast({ message, type = 'info', duration = 4000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)
  const cfg = configs[type]
  const Icon = cfg.icon

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 300) }, duration)
    return () => clearTimeout(t)
  }, [duration, onClose])

  return (
    <div className={clsx(
      'flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm transition-all duration-300',
      cfg.classes,
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    )} role="alert" aria-live="assertive">
      <Icon size={18} className={clsx('flex-shrink-0 mt-0.5', cfg.iconClass)} />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300) }} className="flex-shrink-0 opacity-60 hover:opacity-100" aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  )
}

// Toast container & hook
interface ToastItem { id: number; message: string; type: ToastType }

let toastListeners: ((items: ToastItem[]) => void)[] = []
let toastItems: ToastItem[] = []
let nextId = 1

export function showToast(message: string, type: ToastType = 'info') {
  const item: ToastItem = { id: nextId++, message, type }
  toastItems = [...toastItems, item]
  toastListeners.forEach(l => l(toastItems))
}

export function ToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([])

  useEffect(() => {
    const listener = (newItems: ToastItem[]) => setItems([...newItems])
    toastListeners.push(listener)
    return () => { toastListeners = toastListeners.filter(l => l !== listener) }
  }, [])

  const remove = (id: number) => {
    toastItems = toastItems.filter(i => i.id !== id)
    setItems([...toastItems])
  }

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2" aria-live="polite">
      {items.map(item => (
        <Toast key={item.id} message={item.message} type={item.type} onClose={() => remove(item.id)} />
      ))}
    </div>
  )
}
