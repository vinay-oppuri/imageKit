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
        <div className="flex items-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2">
          <span>Hi, {name}</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="w-56 p-4"
      >
        <div className="space-y-4 text-center">
          <Avatar className="w-12 h-12 mx-auto">
            {avatarSrc ? (
              <AvatarImage src={avatarSrc} alt="User Avatar" />
            ) : (
              <AvatarFallback><User size={20} /></AvatarFallback>
            )}
          </Avatar>

          <div>
            <h4 className="text-lg font-semibold">{name}</h4>
            <Link
              href="/auth/profile"
              onClick={() => setOpen(false)}
              className="text-blue-600 text-sm hover:underline"
            >
              My Profile
            </Link>
          </div>

          <Button
            variant="destructive"
            className="w-full flex gap-2 justify-center items-center"
            onClick={() => signOut()}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}