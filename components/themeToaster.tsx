'use client'

import { Toaster } from 'react-hot-toast'
import { useTheme } from 'next-themes'

export default function ThemeToaster() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: isDark ? '#1a202c' : '#ffffff',
          color: isDark ? '#fefefe' : '#1a202c',
          fontSize: '14px',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        },
      }}
    />
  )
}
