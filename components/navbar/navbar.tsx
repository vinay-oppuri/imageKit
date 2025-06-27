'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import MobileSidebar from '@/components/navbar/mobileSidebar'
import BottomNav from '@/components/navbar/bottomNavbar'
import ProfilePopover from './popOver'

export default function Navbar() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <>
      <nav className="bg-background sticky top-0 inset-x-0 z-50 shadow-sm border-b border-border px-4 sm:px-8 md:px-20 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={180}
            height={38}
            priority
            className="dark:invert"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/upload">Upload</Link>
          <Link href="/community">Community</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {session ? (
            <ProfilePopover />
          ) : (
            <Button>
              <Link href="/auth/login">Get Started</Link>
            </Button>
          )}

          {/* Theme toggle - only visible on desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileSidebar />
          </div>
        </div>
      </nav>

      {/* Bottom navigation for mobile */}
      <BottomNav />
    </>
  )
}