'use client'

import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const ResetPage = () => {
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
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 p-4">
      <h1 className="text-2xl font-bold">Reset Your Password</h1>
      <form onSubmit={handleRequest} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button>Send Reset Link</Button>
      </form>
    </div>
  )
}

export default ResetPage