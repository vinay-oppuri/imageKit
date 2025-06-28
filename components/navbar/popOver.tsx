'use client'

import Link from "next/link"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { ChevronDown, LogOut, User } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function ProfilePopover() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  const user = session?.user
  const name = user?.name || "Guest"
  const avatarSrc = user?.image || ""

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="cursor-pointer"
        aria-label="Profile menu"
      >
        <div className="flex items-center rounded-4xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2">
          <span>Hi, {name}</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="w-50 border border-white/20 dark:border-zinc-800/30 bg-white/10 dark:bg-zinc-900/40 backdrop-blur-md shadow-xl rounded-xl p-4"
      >
        <div className="space-y-3">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-12 h-12">
              {session?.user?.image ? (
                <AvatarImage src={session?.user?.image} alt="User Avatar" />
              ) : (
                <AvatarFallback><User /></AvatarFallback>
              )}
            </Avatar>
            <h4 className="text-lg font-semibold">{session?.user?.name}</h4>
            <div className="text-blue-600 text-sm">
              <Link href='/auth/profile' onClick={() => setOpen(false)}>My Profile</Link>
            </div>
          </div>

          <Button variant='destructive' className='w-full rounded-4xl' onClick={() => signOut()}>
            <LogOut/> Logout
          </Button>
        </div>
      </PopoverContent>

    </Popover>
  )
}