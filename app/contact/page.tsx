'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, User, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission
    setTimeout(() => {
      toast.success('Message sent!')
      setForm({ name: '', email: '', message: '' })
      setLoading(false)
    }, 1500)
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 md:px-20 bg-background text-foreground">
      <div className="w-full max-w-2xl bg-card shadow-lg rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Contact Us</h1>
        <p className="text-muted-foreground text-center">We’d love to hear your feedback or help with any issues.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-2">
            <User className="text-muted-foreground" />
            <Input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Mail className="text-muted-foreground" />
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-start gap-2">
            <MessageCircle className="mt-2 text-muted-foreground" />
            <Textarea
              name="message"
              placeholder="Your message..."
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </section>
  )
}