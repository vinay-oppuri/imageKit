'use client'

import { useState } from 'react'
import { Mail, User, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'

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
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center px-4 md:px-20 bg-background text-foreground mt-10"
    >
      <div className="w-full max-w-2xl backdrop-blur-md bg-muted/40 border border-border shadow-lg rounded-2xl p-6 md:p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Contact Us</h1>
        <p className="text-muted-foreground text-center">We&apos;d love to hear your feedback or help with any issues.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg bg-background outline-none"
              required
            />
            <User className="text-muted-foreground ml-2" size={20} />
          </div>

          <div className="flex items-center bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg bg-background outline-none"
              required
            />
            <Mail className="text-muted-foreground ml-2" size={18} />
          </div>

          <div className="flex bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <Textarea
              name="message"
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-background outline-none p-2.5"
            />
            <MessageCircle className="text-muted-foreground ml-2" size={18} />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full shadow-md"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </motion.section>
  )
}