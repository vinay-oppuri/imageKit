'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import Image from 'next/image'
import MobileSidebar from '../navbar/mobileSidebar'
import BottomNav from '../navbar/bottomNavbar'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import ProfilePopover from './popOver'
import SearchBar from './searchBar'

const Navbar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const showSearchBar = ['/community']

  return (
    <>
      <nav className="fixed m-auto md:w-[80%] top-2 left-2 right-2 z-50 px-4 py-4 flex items-center justify-between backdrop-blur-md bg-background/70 rounded-full border">
        <Link href="/" className="text-lg font-semibold flex items-center">
          <Image
            className="w-18 lg:w-28 dark:invert ml-2 md:ml-10"
            src="/logo.svg"
            alt="Logo"
            width={180}
            height={38}
            priority
          />
        </Link>
        {!showSearchBar.includes(pathname) && (
          <div className="hidden md:flex items-center gap-4">
            <Link href="/">Home</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/upload">Upload</Link>
            <Link href="/community">Community</Link>
            <Link href="/contact">Contact</Link>
          </div>
        )}

        <div className="flex items-center gap-2 md:mr-10">
          {showSearchBar.includes(pathname) ? (
            <SearchBar />
          ) : session ? (
            <ProfilePopover />
          ) : (
            <Button className="rounded-full p-4">
              <Link href="/auth/login">Get Started</Link>
            </Button>
          )}

          {showSearchBar.includes(pathname) && (
            <div className="hidden md:flex">
              <MobileSidebar />
            </div>
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
      </nav >

      <BottomNav />
    </>
  )
}

export default Navbar