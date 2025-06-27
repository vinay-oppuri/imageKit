'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User, LogOut, Mail, Settings, UserCircle2 } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function ProfileClient() {
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
      <div className="w-full max-w-md backdrop-blur-md bg-muted/40 border border-border rounded-2xl shadow-xl p-6 text-center space-y-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <Avatar className="w-20 h-20 ring-2 ring-primary">
            {session?.user?.image ? (
              <AvatarImage src={session.user.image} alt="User Avatar" />
            ) : (
              <AvatarFallback>
                <User size={28} />
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold">
          Welcome, {session?.user?.name || 'User'}!
        </h1>

        {/* User Info */}
        <div className="text-muted-foreground space-y-1 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Mail size={16} />
            {session?.user?.email}
          </div>
          <div className="flex items-center justify-center gap-2">
            <UserCircle2 size={16} />
            Member since: <span className="font-medium">2025</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push('/settings')}
          >
            <Settings size={16} /> Account Settings
          </Button>

          <Button
            variant="destructive"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => signOut()}
          >
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </div>
    </div>
  )
}