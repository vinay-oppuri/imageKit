'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User, LogOut, Mail, Settings, UserCircle2 } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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

  if (status === 'loading') return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="flex items-center justify-center bg-background text-foreground p-4 mt-20 md:mt-24">
      <div className="w-full max-w-md p-6 rounded-xl border border-border bg-card shadow-md space-y-4 text-center">
        <div className="flex justify-center">
          <Avatar className="w-20 h-20">
            {session?.user?.image ? (
              <AvatarImage src={session?.user?.image} alt="User Avatar" />
            ) : (
              <AvatarFallback><User size={30}/></AvatarFallback>
            )}
          </Avatar>
        </div>

        <h1 className="text-2xl font-bold">Welcome, {session?.user?.name || 'User'}!</h1>

        <div className="flex flex-col text-muted-foreground gap-2">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Mail size={16}/> {session?.user?.email}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <UserCircle2 size={16} /> Member since: <span className="font-medium">2025</span>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Button
            variant="outline"
            className="w-full flex gap-2 justify-center"
            onClick={() => router.push('/settings')}
          >
            <Settings size={16} /> Account Settings
          </Button>
          <Button
            variant="destructive"
            className="w-full flex gap-2 justify-center"
            onClick={() => signOut()}
          >
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileClient