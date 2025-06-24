'use client'

import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const ProfileClient = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/login')
    }
  }, [status, router])

  const onLogout = async () => {
    try {
      await signOut()
      router.replace('/auth/login')
    } catch {
      toast.error('Logout failed')
    }
  }

  if (status === 'loading') return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="flex items-center justify-center bg-background text-foreground p-4 mt-20 md:mt-25">
      <div className="w-full max-w-md p-6 rounded-xl border border-border bg-card shadow-md space-y-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome, {session?.user?.name || 'User'}!</h1>
        <p className="text-muted-foreground">
          You are logged in as{' '}
          <span className="font-medium text-primary">{session?.user?.email}</span>
        </p>

        <div className="mt-6">
          <Button variant="destructive" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileClient