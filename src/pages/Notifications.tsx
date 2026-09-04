import { useState } from 'react'
import { Bell, Calendar, MessageSquare, FileText, Activity, CheckCheck, Trash2 } from 'lucide-react'
import { notificationsData } from '../data/demo'
import { clsx } from 'clsx'

const iconMap: Record<string, React.ReactNode> = {
  appointment: <Calendar size={16} className="text-primary-600" />,
  queue:       <Activity size={16} className="text-emerald-600" />,
  message:     <MessageSquare size={16} className="text-cyan-600" />,
  report:      <FileText size={16} className="text-purple-600" />,
  reminder:    <Bell size={16} className="text-amber-600" />,
}

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })))
  const clearAll    = () => setNotifications([])
  const markRead    = (id: string) => setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x))
  const remove      = (id: string) => setNotifications(n => n.filter(x => x.id !== id))

  const displayed = filter === 'unread' ? notifications.filter(n => !n.read) : notifications
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="section-title">Notifications</h1>
          <p className="section-subtitle">{unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={markAllRead} className="flex items-center gap-1.5 btn-ghost text-sm py-2">
            <CheckCheck size={14} /> Mark all read
          </button>
          <button onClick={clearAll} className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium">
            <Trash2 size={13} /> Clear all
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'unread'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={clsx('px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize', filter === f ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300')}>
            {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
          </button>
        ))}
      </div>

      {/* List */}
      {displayed.length === 0 ? (
        <div className="card text-center py-16">
          <Bell size={40} className="text-slate-200 mx-auto mb-3" />
          <p className="font-semibold text-slate-500">{filter === 'unread' ? 'No unread notifications' : 'No notifications'}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {displayed.map(n => (
            <div key={n.id}
              className={clsx('flex items-start gap-4 p-4 rounded-2xl border transition-colors', n.read ? 'bg-white border-slate-100' : 'bg-primary-50/60 border-primary-100')}
              role="article">
              <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', n.read ? 'bg-slate-100' : 'bg-white border border-slate-200 shadow-sm')}>
                {iconMap[n.type] ?? <Bell size={16} className="text-slate-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={clsx('text-sm font-semibold', n.read ? 'text-slate-700' : 'text-slate-900')}>{n.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                <p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {!n.read && (
                  <button onClick={() => markRead(n.id)} title="Mark as read"
                    className="p-1.5 rounded-lg hover:bg-white text-primary-500 transition-colors">
                    <CheckCheck size={14} />
                  </button>
                )}
                <button onClick={() => remove(n.id)} title="Remove"
                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
                {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500 ml-1" aria-label="Unread" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
