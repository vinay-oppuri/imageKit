'use client'

import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

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
    <div className="flex flex-col justify-center items-center gap-6 p-4">
      <h1 className="text-2xl font-bold">Reset Your Password</h1>
      <form onSubmit={handleRequest} className="flex flex-col gap-4 w-full max-w-sm">
        <div tabIndex={0} className="flex items-center bg-background group border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-background outline-none"
          />
          <Mail className="text-foreground mr-3" size={20} />
        </div>

        <Button>Send Reset Link</Button>
      </form>
    </div>
  )
}

export default ResetPage