'use client'

import { Compass, Users, UploadCloud, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/community', icon: Users, label: 'Community' },
  { href: '/upload', icon: UploadCloud, label: 'Upload' }
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-1 left-1 right-1 z-50 md:hidden rounded-full not-md:border backdrop-blur-md bg-muted/30 shadow-xl py-2 px-4">
      <div className="flex justify-between items-center">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center text-xs transition-all duration-200 hover:opacity-90"
            >
              <div
                className={cn(
                  'w-13 h-13 flex items-center justify-center rounded-full transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'bg-transparent text-muted-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              {/* <span
                className={cn(
                  'mt-1 text-[11px] transition-colors',
                  isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                )}
              >
                {label}
              </span> */}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}