import { useState } from 'react'
import { Search, Send, Paperclip, Phone, Video, MoreVertical } from 'lucide-react'
import { messagesData } from '../data/demo'
import { clsx } from 'clsx'

export default function Messages() {
  const [activeConv, setActiveConv] = useState(messagesData[0])
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(activeConv.messages)
  const [query, setQuery] = useState('')

  const filtered = messagesData.filter(c =>
    !query || c.contact.toLowerCase().includes(query.toLowerCase())
  )

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: prev.length + 1, sender: 'patient', text: input.trim(), time: 'Now' }])
    setInput('')
  }

  const handleConvSelect = (conv: typeof messagesData[0]) => {
    setActiveConv(conv)
    setMessages(conv.messages)
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="page-header flex-shrink-0 mb-4">
        <h1 className="section-title">Messages</h1>
      </div>

      <div className="flex flex-1 min-h-0 gap-4">
        {/* Conversation list */}
        <div className="w-72 flex-shrink-0 card flex flex-col p-0 overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={e => setQuery(e.target.value)}
                className="input pl-9 text-sm py-2" placeholder="Search conversations…" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(conv => (
              <button key={conv.id} onClick={() => handleConvSelect(conv)}
                className={clsx(
                  'w-full flex items-start gap-3 px-4 py-3.5 text-left border-b border-slate-50 transition-colors',
                  activeConv.id === conv.id ? 'bg-primary-50' : 'hover:bg-slate-50'
                )}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {conv.contact.split(' ').pop()!.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-semibold text-slate-800 truncate">{conv.contact}</p>
                    <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-1">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        <div className="flex-1 card flex flex-col p-0 overflow-hidden min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                {activeConv.contact.split(' ').pop()!.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{activeConv.contact}</p>
                <p className="text-xs text-slate-400">{activeConv.specialty}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[<Phone size={17} />, <Video size={17} />, <MoreVertical size={17} />].map((icon, i) => (
                <button key={i} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">{icon}</button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {messages.map(msg => {
              const isMe = msg.sender === 'patient'
              return (
                <div key={msg.id} className={clsx('flex', isMe ? 'justify-end' : 'justify-start')}>
                  {!isMe && (
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs mr-2 flex-shrink-0 mt-1">
                      {activeConv.contact.split(' ').pop()!.charAt(0)}
                    </div>
                  )}
                  <div className={clsx(
                    'max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                    isMe
                      ? 'bg-primary-600 text-white rounded-br-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                  )}>
                    <p>{msg.text}</p>
                    <p className={clsx('text-[10px] mt-1', isMe ? 'text-primary-200 text-right' : 'text-slate-400')}>{msg.time}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-slate-100 flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors" aria-label="Attach file">
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type a message…"
              className="flex-1 input py-2.5 text-sm"
              aria-label="Message input"
            />
            <button onClick={handleSend} disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center disabled:opacity-40 transition-colors"
              aria-label="Send message">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
