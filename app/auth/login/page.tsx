'use client'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { User, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session?.user) {
      router.replace('/auth/profile')
    }
  }, [router, session])

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      if (res.error === 'CredentialsSignin') {
        toast.error('Invalid Email ID or Password')
      }
    } else {
      toast.success('Login Successful')
      router.replace('/auth/profile')
    }
  }

  if (status === 'loading') return <p className="text-center py-10">Loading...</p>

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center px-4 bg-background text-foreground mt-32 md:mt-38"
    >
      <div className="w-full max-w-sm backdrop-blur-md bg-muted/40 border border-border p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <form onSubmit={onLogin} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex items-center bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-background outline-none"
              required
            />
            <User className="text-muted-foreground ml-2" size={20} />
          </div>

          {/* Password */}
          <div className="flex items-center bg-background border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-background outline-none"
              required
            />
            <Lock className="text-muted-foreground ml-2" size={18} />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm text-primary">
            <Link href="/auth/reset">Forgot Password?</Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="p-2 bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        {/* Signup CTA */}
        <div className="text-center text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 underline">
            Sign Up
          </Link>
        </div>

        {/* Third Party Logins */}
        <div className="flex items-center justify-center mt-6 gap-3 flex-wrap">
          <button
            onClick={() => signIn('google', { callbackUrl: '/auth/profile' })}
            className="hover:scale-105 transition p-2 rounded-lg bg-muted"
          >
            <img
              src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
              alt="Google"
              className="w-7 h-7"
            />
          </button>

          <button
            onClick={() => signIn('github', { callbackUrl: '/auth/profile' })}
            className="hover:scale-105 transition p-2 rounded-lg bg-muted"
          >
            <img
              src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
              alt="GitHub"
              className="w-7 h-7 dark:invert"
            />
          </button>
        </div>
      </div>
    </motion.div>
  )
}