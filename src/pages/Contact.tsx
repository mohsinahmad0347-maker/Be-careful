import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react'
import { showToast } from '../components/ui/Toast'
import Footer from '../components/Footer'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setSent(true)
    showToast('Message sent! We will get back to you soon.', 'success')
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="section-title text-3xl">Contact Us</h1>
          <p className="section-subtitle mt-2">Have a question? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: <Mail size={20} className="text-primary-600" />, label: 'Email', value: 'support@becareful.health', bg: 'bg-primary-50' },
              { icon: <Phone size={20} className="text-emerald-600" />, label: 'Phone', value: '+92-21-0000000', bg: 'bg-emerald-50' },
              { icon: <MapPin size={20} className="text-amber-600" />, label: 'Location', value: 'Karachi, Pakistan', bg: 'bg-amber-50' },
            ].map(c => (
              <div key={c.label} className="card flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>{c.icon}</div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{c.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{c.value}</p>
                </div>
              </div>
            ))}
            <div className="card bg-primary-50 border-primary-100">
              <p className="text-sm font-semibold text-primary-800 mb-1">Demo Platform Notice</p>
              <p className="text-xs text-primary-700">This contact form is for demonstration purposes. In a production environment, messages would be routed to the appropriate support team.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 card">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-slate-500 text-sm">Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-bold text-slate-800 text-lg mb-2">Send a Message</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Name</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input" placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input" placeholder="you@email.com" required />
                  </div>
                </div>
                <div>
                  <label className="label">Subject</label>
                  <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="input" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="label">Message</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} className="input resize-none" placeholder="Describe your question or feedback…" required />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
                  {loading ? 'Sending…' : <span className="flex items-center justify-center gap-2"><Send size={16} /> Send Message</span>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
