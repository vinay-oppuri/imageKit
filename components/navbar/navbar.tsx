'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import Image from 'next/image'
import MobileSidebar from '../navbar/mobileSidebar'
import BottomNav from '../navbar/bottomNavbar'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import ProfilePopover from './popOver'

const Navbar = () => {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50 px-4 py-5 flex items-center justify-between backdrop-blur-md bg-white/30 dark:bg-zinc-900/30 border-b border-white/20 dark:border-zinc-800/30">
        <Link href="/" className="text-lg font-semibold flex items-center">
          <Image
            className="w-25 sm:w-30 md:w-35 lg:w-40 dark:invert md:ml-40"
            src="/logo.svg"
            alt="Logo"
            width={180}
            height={38}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/upload">Upload</Link>
          <Link href="/community">Community</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="flex items-center gap-2 md:mr-40">
          {session ? (
            <ProfilePopover />
          ) : (
            <Button>
              <Link href="/auth/login">Get Started</Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>

          <div className="md:hidden">
            <MobileSidebar />
          </div>
        </div>
      </nav>

      <BottomNav />
    </>
  )
}

export default Navbar