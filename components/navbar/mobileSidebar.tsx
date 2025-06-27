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
  { name: "Contact", href: "/contact" },
  { name: "Settings", href: "/auth/profile" },
]

export default function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const { data: session } = useSession()

  const handleClick = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[250px] p-4 space-y-6">
        {/* Logo */}
        <Link href="/" onClick={handleClick} className="flex justify-center dark:invert">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={180}
            height={38}
            priority
          />
        </Link>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <Link href="/auth/profile" onClick={handleClick}>
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} alt="User Avatar" />
              ) : (
                <AvatarFallback><User /></AvatarFallback>
              )}
            </Link>
          </Avatar>
          <div>
            <p className="font-medium">
              {session?.user?.name || "Guest"}
            </p>
            <p className="text-sm text-muted-foreground">
              {session ? "Welcome to Clipo" : "Sign in to explore more"}
            </p>
          </div>
        </div>

        {/* Action Button */}
        {session ? (
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        ) : (
          <Link href="/auth/login" onClick={handleClick} className="w-full">
            <Button className="w-full">Sign In</Button>
          </Link>
        )}

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleClick}
              className="hover:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Upgrade CTA */}
        <Button variant="secondary" className="w-full mt-6">
          Upgrade to Pro
        </Button>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="font-semibold">Theme</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}