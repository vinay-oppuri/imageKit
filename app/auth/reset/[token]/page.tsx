'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Lock, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ResetTokenPage() {
  const { token } = useParams() as { token: string }
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post('/api/auth/reset-password', {
        token,
        password,
      })

      toast.success(res.data.message || 'Password updated!')
      router.replace('/auth/login')
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || 'Reset failed or token expired'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center min-h-[70vh] p-4"
    >
      <div className="w-full max-w-sm backdrop-blur-md bg-muted/40 border border-border p-6 rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">Set New Password</h1>

        <form onSubmit={handleReset} className="space-y-4">
          <div className="flex items-center bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
              type="password"
              placeholder="New password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-background outline-none"
            />
            <Lock className="text-muted-foreground ml-2" size={18} />
          </div>

          <div className="flex items-center bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              required
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-2.5 bg-background outline-none"
            />
            <Check className="text-muted-foreground ml-2" size={18} />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </div>
    </motion.div>
  )
}