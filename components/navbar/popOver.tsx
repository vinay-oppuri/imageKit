'use client'

import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { ChevronDown, LogOut, User } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback } from "../ui/avatar"

export default function ProfilePopover() {
    const [open, setOpen] = useState(false)
    const { data: session } = useSession()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                // onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer"
            >
                {session?.user?.name ? (
                    <div className="flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2">
                        <span>Hi, {session.user.name}</span>
                        <ChevronDown className="w-4 h-4" />
                    </div>

                ) : (
                    <span>Get Started</span>
                )}

            </PopoverTrigger>

            <PopoverContent
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className="w-50"
            >
                <div className="space-y-3">
                    <div className="flex flex-col items-center">
                        <Avatar className="w-12 h-12">
                            <AvatarFallback>
                                {session?.user?.image ?? <User />}
                            </AvatarFallback>
                        </Avatar>
                        <h4 className="text-lg font-semibold">{session?.user?.name}</h4>
                        <div className="text-blue-600 text-sm">
                            <Link href='/auth/profile'>My Profile</Link>
                        </div>
                    </div>

                    <Button variant='destructive' className='w-full' onClick={() => signOut()}><LogOut/> Logout</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}