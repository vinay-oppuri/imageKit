'use client'

import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ResetPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await axios.post('/api/auth/reset-request', { email })
      toast.success('Reset link sent!')
      router.push('/')
    } catch {
      toast.error('Something went wrong.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center min-h-[70vh] p-4"
    >
      <div className="w-full max-w-sm bg-muted/40 backdrop-blur-md border border-border p-6 rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">Reset Your Password</h1>
        <form onSubmit={handleRequest} className="space-y-4">
          <div className="flex items-center bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-background outline-none"
            />
            <Mail className="text-muted-foreground ml-2" size={18} />
          </div>

          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
      </div>
    </motion.div>
  )
}