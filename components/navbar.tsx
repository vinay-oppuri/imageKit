'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { useTheme } from "next-themes"
import { Home, Mail, Menu, Moon, Sun, User, X } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Navbar = () => {
  const { setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <>
      {/* Top Navbar */}
      <nav className='bg-background text-foreground sticky top-0 left-0 right-0 flex items-center justify-between p-5 z-50 shadow-sm border-b border-border'>
        <Link
          href="/"
          className="text-lg font-semibold px-2 sm:px-8 md:px-20 flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <Image
            className="w-30 sm:w-36 md:w-44 lg:w-48 dark:invert"
            src="/logo.svg"
            alt="Logo"
            width={180}
            height={38}
            priority
          />
        </Link>

      {/* Desktop Links */}
      <div className='hidden md:flex items-center gap-4'>
        <Link href='/'>Home</Link>
        <Link href='/explore'>Explore</Link>
        <Link href='/upload'>Upload</Link>
        <Link href='/community'>Community</Link>
        <Link href='/contact'>Contact</Link>
      </div>

      <div className='hidden md:flex items-center gap-4 px-20'>
        <Link href='/auth/login'>
          <Button>
            {session?.user?.name ?? 'Get Started'}
          </Button>
        </Link>

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-40 flex items-center gap-2">
        <Link href='/auth/login'>
          <Button onClick={() => setIsOpen(false)}>
            {session?.user?.name ? `Hi, ${session?.user?.name}!` : 'Get Started'}
          </Button>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav >

      {/* Mobile Slide-Over Menu */ }
  {
    isOpen && (
      <div className="fixed inset-0 bg-background text-foreground z-30 flex flex-col items-start gap-4 p-10 pt-20 transition-all">
        <Select onValueChange={(value) => setTheme(value)}>
          <SelectTrigger className="mt-8 w-[130px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <div className='flex flex-col px-3 gap-4'>
          <Link href='/' onClick={() => setIsOpen(false)}>Home</Link>
          <Link href='/explore' onClick={() => setIsOpen(false)}>Explore</Link>
          <Link href='/upload' onClick={() => setIsOpen(false)}>Upload</Link>
          <Link href='/community' onClick={() => setIsOpen(false)}>Community</Link>
          <Link href='/contact' onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
        {!session && (
          <Link href='/auth/login' onClick={() => setIsOpen(false)}>
            <Button>Sign In</Button>
          </Link>
        )}
        {session && (
          <Button variant='destructive' onClick={() => signOut()}>Logout</Button>
        )}
      </div>
    )
  }

  {/* Mobile Bottom Nav */ }
  <nav className="fixed bottom-0 left-0 right-0 md:hidden border-t border-border z-20 bg-background text-foreground">
    <div className="flex justify-around py-3">
      <Link href="/" className="flex flex-col items-center hover:text-muted-foreground">
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link href="/auth/profile" className="flex flex-col items-center hover:text-muted-foreground">
        <User className="w-6 h-6" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
      <Link href="/contact" className="flex flex-col items-center hover:text-muted-foreground">
        <Mail className="w-6 h-6" />
        <span className="text-xs mt-1">Contact</span>
      </Link>
    </div>
  </nav>
    </>
  )
}

export default Navbar