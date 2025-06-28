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
      <nav className="fixed m-auto md:w-[80%] top-2 left-2 right-2 z-50 px-4 py-5 flex items-center justify-between backdrop-blur-md bg-muted/30 drop-shadow-xl rounded-b-3xl md:rounded-4xl">
        <Link href="/" className="text-lg font-semibold flex items-center">
          <Image
            className="w-20 lg:w-28 dark:invert ml-2 md:ml-10"
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

        <div className="flex items-center gap-2 md:mr-10">
          {session ? (
            <ProfilePopover />
          ) : (
            <Button className='rounded-4xl p-4'>
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