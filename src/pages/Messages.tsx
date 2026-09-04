import { useState, useRef, useEffect } from 'react'
import { Search, Send, Paperclip, Phone, Video, MoreVertical, ArrowLeft, X, MessageSquare, CheckCheck } from 'lucide-react'
import { messagesData } from '../data/demo'
import { clsx } from 'clsx'

export default function Messages() {
  const [conversations, setConversations] = useState(messagesData)
  const [activeConvId, setActiveConvId] = useState<string>(messagesData[0]?.id || '')
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')
  const [showMobileChat, setShowMobileChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0]

  const filtered = conversations.filter(c =>
    !query ||
    c.contact.toLowerCase().includes(query.toLowerCase()) ||
    c.specialty.toLowerCase().includes(query.toLowerCase())
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (showMobileChat || activeConvId) {
      scrollToBottom()
    }
  }, [activeConvId, conversations, showMobileChat])

  const handleSend = () => {
    if (!input.trim() || !activeConv) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newMsg = {
      id: Date.now(),
      sender: 'patient',
      text: input.trim(),
      time: now
    }

    setConversations(prev =>
      prev.map(c => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            lastMessage: newMsg.text,
            time: 'Just now',
            messages: [...c.messages, newMsg]
          }
        }
        return c
      })
    )
    setInput('')
  }

  const handleConvSelect = (convId: string) => {
    setActiveConvId(convId)
    setShowMobileChat(true)
    // Mark conversation as read
    setConversations(prev =>
      prev.map(c => (c.id === convId ? { ...c, unread: 0 } : c))
    )
  }

  return (
    <div className="h-[calc(100vh-6.5rem)] md:h-[calc(100vh-8rem)] flex flex-col max-w-7xl mx-auto">
      {/* Page Header - Hidden on mobile when inside an active chat */}
      <div className={clsx(
        "page-header flex-shrink-0 mb-3 md:mb-4 transition-all duration-200",
        showMobileChat ? "hidden md:block" : "block"
      )}>
        <h1 className="section-title text-xl md:text-2xl">Messages</h1>
        <p className="text-xs md:text-sm text-slate-500 mt-0.5">Communicate directly with your doctors and healthcare providers</p>
      </div>

      {/* Main Messages Layout Container */}
      <div className="flex flex-1 min-h-0 gap-0 md:gap-4 relative overflow-hidden">
        
        {/* Conversation List Sidebar */}
        <div className={clsx(
          'w-full md:w-80 flex-shrink-0 card flex flex-col p-0 overflow-hidden bg-white border border-slate-200/80 shadow-sm transition-all duration-200',
          showMobileChat ? 'hidden md:flex' : 'flex'
        )}>
          {/* Sidebar Search Bar */}
          <div className="p-3 md:p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="input pl-9 pr-8 text-sm py-2 bg-white"
                placeholder="Search conversations…"
                aria-label="Search conversations"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-slate-400 flex flex-col items-center">
                <MessageSquare size={32} className="mb-2 opacity-50" />
                <p className="text-sm font-medium">No conversations found</p>
              </div>
            ) : (
              filtered.map(conv => {
                const isActive = activeConv?.id === conv.id
                return (
                  <button
                    key={conv.id}
                    onClick={() => handleConvSelect(conv.id)}
                    className={clsx(
                      'w-full flex items-start gap-3 px-4 py-3.5 text-left transition-all duration-150 relative',
                      isActive ? 'bg-primary-50/80 border-l-4 border-l-primary-600' : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                    )}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                        {conv.contact.split(' ').pop()!.charAt(0)}
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" title="Online" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={clsx("text-sm font-semibold truncate", isActive ? "text-primary-950" : "text-slate-800")}>
                          {conv.contact}
                        </p>
                        <span className="text-[11px] text-slate-400 flex-shrink-0 ml-2 font-medium">{conv.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate leading-relaxed">{conv.lastMessage}</p>
                      <span className="text-[10px] text-primary-600 font-medium">{conv.specialty}</span>
                    </div>

                    {conv.unread > 0 && (
                      <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Chat Panel */}
        <div className={clsx(
          'flex-1 card flex flex-col p-0 overflow-hidden min-w-0 bg-white border border-slate-200/80 shadow-sm transition-all duration-200',
          !showMobileChat ? 'hidden md:flex' : 'flex'
        )}>
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-3 md:px-5 py-3 md:py-3.5 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setShowMobileChat(false)}
                    className="md:hidden p-2 -ml-1 rounded-xl text-slate-600 hover:bg-slate-200/70 transition-colors flex-shrink-0"
                    aria-label="Back to conversations list"
                  >
                    <ArrowLeft size={20} />
                  </button>

                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                      {activeConv.contact.split(' ').pop()!.charAt(0)}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-bold text-slate-800 text-sm md:text-base leading-tight truncate">{activeConv.contact}</h2>
                    <p className="text-xs text-slate-500 truncate flex items-center gap-1.5">
                      <span>{activeConv.specialty}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-emerald-600 font-medium">Online</span>
                    </p>
                  </div>
                </div>

                {/* Call / Option Actions */}
                <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
                  <button className="p-2 md:p-2.5 rounded-xl hover:bg-slate-200/60 text-slate-600 transition-colors" aria-label="Audio call">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 md:p-2.5 rounded-xl hover:bg-slate-200/60 text-slate-600 transition-colors" aria-label="Video call">
                    <Video size={18} />
                  </button>
                  <button className="p-2 md:p-2.5 rounded-xl hover:bg-slate-200/60 text-slate-600 transition-colors" aria-label="More options">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 space-y-3 bg-slate-50/30">
                <div className="text-center my-2">
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    Encrypted Healthcare Communication
                  </span>
                </div>

                {activeConv.messages.map(msg => {
                  const isMe = msg.sender === 'patient'
                  return (
                    <div key={msg.id} className={clsx('flex items-end gap-2', isMe ? 'justify-end' : 'justify-start')}>
                      {!isMe && (
                        <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mb-1">
                          {activeConv.contact.split(' ').pop()!.charAt(0)}
                        </div>
                      )}
                      <div className={clsx(
                        'max-w-[85%] sm:max-w-[75%] md:max-w-[70%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs',
                        isMe
                          ? 'bg-primary-600 text-white rounded-br-xs'
                          : 'bg-white border border-slate-100 text-slate-800 rounded-bl-xs'
                      )}>
                        <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                        <div className={clsx('flex items-center gap-1 mt-1 justify-end text-[10px]', isMe ? 'text-primary-200' : 'text-slate-400')}>
                          <span>{msg.time}</span>
                          {isMe && <CheckCheck size={13} className="text-primary-200" />}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Footer */}
              <div className="p-2.5 sm:p-3 border-t border-slate-100 bg-white flex items-center gap-2 flex-shrink-0">
                <button
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors flex-shrink-0"
                  aria-label="Attach file"
                >
                  <Paperclip size={18} />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message…"
                  className="flex-1 input py-2 text-xs sm:text-sm border-slate-200 bg-slate-50 focus:bg-white"
                  aria-label="Message input"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center disabled:opacity-40 transition-colors flex-shrink-0 shadow-xs active:scale-95"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <MessageSquare size={48} className="mb-3 opacity-40 text-primary-500" />
              <p className="text-base font-semibold text-slate-700">Select a conversation</p>
              <p className="text-xs text-slate-400 max-w-xs mt-1">Choose a doctor or specialist from the list to start messaging.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
