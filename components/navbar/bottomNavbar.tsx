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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden rounded-t-xl shadow-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center text-xs transition-colors"
            >
              <div className={cn('w-10 h-10 flex items-center justify-center rounded-full', isActive ? 'bg-muted' : 'bg-transparent')}>
                <Icon
                  className={cn('h-5 w-5', isActive ? 'text-primary ' : 'text-muted-foreground')}
                />
              </div>

              <span className={cn('mt-1 text-[11px]', isActive ? 'text-primary font-medium' : 'text-muted-foreground')}>
                {label}
              </span>
              
            </Link>
          )
        })}
      </div>
    </nav>
  )
}