'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, User, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { NextResponse } from 'next/server'
import axios from 'axios'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const req = await axios.post('/api/contact', form)
      if (req.status === 200) {
        toast.success('Message sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        toast.error('Failed to send message')
      }

    } catch (error: any) {
      return NextResponse.json({ error: 'Failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex items-center justify-center px-4 md:px-20 bg-background text-foreground mt-10">
      <div className="w-[95%] max-w-2xl bg-card shadow-lg rounded-2xl p-6 md:p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Contact Us</h1>
        <p className="text-muted-foreground text-center">We&apos;d love to hear your feedback or help with any issues.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div tabIndex={0} className="flex items-center bg-background group border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <input
              name='name'
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg bg-background outline-none"
              required
            />
            <User className="text-foreground mr-3" size={20} />
          </div>

          <div tabIndex={0} className="flex items-center bg-background group border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <input
              name='email'
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg bg-background outline-none"
              required
            />
            <Mail className="text-foreground mr-3" size={18} />
          </div>

          <div tabIndex={0} className="flex items-center bg-background group border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <Textarea
              name='message'
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              required
            />
            <MessageCircle className="text-foreground mr-3" size={18} />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </section>
  )
}