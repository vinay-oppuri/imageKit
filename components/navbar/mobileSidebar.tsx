'use client'

import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Moon, Sun, User, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { signOut, useSession } from 'next-auth/react'
import { useState } from "react"
import Image from "next/image"

const navItems = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Upload", href: "/upload" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "contact" },
    { name: "Settings", href: "/auth/profile" },
]

export default function MobileSidebar() {

    const [open, setOpen] = useState(false)
    const { setTheme, theme } = useTheme()
    const { data: session } = useSession()

    const handleClick = () => {
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[250px] p-4">
                <div className="flex flex-col gap-6">
                    <Link href='/' className="flex items-center justify-center dark:invert p-4" onClick={handleClick}>
                        <Image
                            className="w-25"
                            src="/logo.svg"
                            alt="Logo"
                            width={180}
                            height={38}
                            priority
                        />
                    </Link>
                    {session && (
                        <>
                            <div className="flex items-center gap-4">

                                <Avatar className="w-12 h-12">
                                    {session?.user?.image ? (
                                        <AvatarImage src={session?.user?.image} alt="User Avatar" />
                                    ) : (
                                        <AvatarFallback><User/></AvatarFallback>
                                    )}
                                </Avatar>

                                <div>
                                    <p className="font-medium">{session?.user?.name}</p>
                                    <p className="text-sm text-muted-foreground">Welcome to Clipo</p>
                                </div>
                            </div>
                            <Button variant='destructive' className="w-full" onClick={() => signOut()}><LogOut />Logout</Button>
                        </>
                    )}

                    {!session && (
                        <>
                            <div className="flex items-center gap-3">
                                <Avatar className="w-12 h-12">
                                    <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-base">Welcome Guest</p>
                                    <p className="text-sm text-muted-foreground">Sign in to explore more</p>
                                </div>

                            </div>
                            <Link href="/auth/login" onClick={handleClick}>
                                <Button className="w-full">Sign In</Button>
                            </Link>
                        </>
                    )}


                    <nav className="flex flex-col gap-2">
                        {navItems.map((item, key) => (
                            <Link
                                key={key}
                                href={item.href}
                                onClick={handleClick}
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