'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { User, Mail, Lock, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function SignUpPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      router.replace('/auth/profile')
    }
  }, [session, router])

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post('/api/auth/signup', {
        username,
        email,
        password,
      })

      toast.success(res.data.message || 'Registered successfully')
      router.replace('/auth/login')
    } catch {
      toast.error('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[95%] flex items-center justify-center px-4 mt-32 md:mt-38 mx-auto"
    >
      <div className="w-full max-w-md backdrop-blur-md bg-muted/40 border border-border p-6 sm:p-8 rounded-xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>

        <form onSubmit={onSignUp} className="space-y-4">
          <div className="flex items-center bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 bg-background outline-none"
            />
            <User className="text-muted-foreground" size={20} />
          </div>

          <div className="flex items-center bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-background outline-none"
            />
            <Mail className="text-muted-foreground" size={18} />
          </div>

          <div className="flex items-center bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-background outline-none"
            />
            <Lock className="text-muted-foreground" size={18} />
          </div>

          <div className="flex items-center bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-2.5 bg-background outline-none"
            />
            <Check className="text-muted-foreground" size={18} />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-90 transition p-2">
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="underline text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </motion.main>
  )
}