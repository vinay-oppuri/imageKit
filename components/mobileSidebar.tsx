'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Moon, Sun, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useSession } from 'next-auth/react'

const navItems = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Upload", href: "/upload" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "contact" },
    { name: "Settings", href: "/auth/profile" },
]

export default function MobileSidebar() {

    const { setTheme, theme } = useTheme()
    const { data: session } = useSession()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[250px] p-4">
                <div className="flex flex-col gap-6">
                    {session && (
                        <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                                <AvatarFallback>{session?.user?.image ? `${session?.user?.image}` : <User/>}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{session?.user?.name}</p>
                                <p className="text-sm text-muted-foreground">Welcome to Clipo</p>
                            </div>
                        </div>
                    )}

                    {!session && (
                        <>
                            <div className="flex items-center gap-3">
                                <Avatar className="w-12 h-12">
                                    <AvatarFallback><User className='' /></AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-base">Welcome Guest</p>
                                    <p className="text-sm text-muted-foreground">Sign in to explore more</p>
                                </div>

                            </div>
                            <Link href="/auth/login">
                                <Button className="w-full">Sign In</Button>
                            </Link>
                        </>
                    )}


                    <nav className="flex flex-col gap-2">
                        {navItems.map((item, key) => (
                            <Link
                                key={key}
                                href={item.href}
                                className="hover:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto">
                        <Button className="w-full" variant="secondary" >
                            Upgrade to Pro
                        </Button>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <span className="font-semibold">Theme</span>
                        <Button variant="ghost" size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>

                            {theme === "dark" ? <Sun /> : <Moon />}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}