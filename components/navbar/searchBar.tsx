'use client'

import { Search, X } from 'lucide-react'
import React, { useState } from 'react'
import { cn } from '@/lib/utils' // Optional: Tailwind class merge helper if you're using it

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      {/* 🔍 Desktop SearchBar */}
      <div className="hidden md:flex w-[60%] items-center bg-background border border-border rounded-full px-3 focus-within:ring-2 focus-within:ring-primary">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-1.5 bg-background rounded-full outline-none"
        />
        <Search className="text-muted-foreground mr-2" size={20} />
      </div>

      {/* 🔍 Mobile Icon */}
      <button
        onClick={() => setExpanded(true)}
        className="md:hidden p-2"
        aria-label="Open search"
      >
        <Search size={20} />
      </button>

      {/* 🔍 Mobile Fullscreen Search Overlay */}
      {expanded && (
        <div className="fixed inset-0 z-50 bg-background p-4 flex items-center gap-2 border-b border-border rounded-full shadow-lg">
          <input
            type="text"
            placeholder="Search"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[80%] py-2 px-4 bg-background border border-border rounded-full outline-none"
          />
          <button
            onClick={() => setExpanded(false)}
            className="p-2"
            aria-label="Close search"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </>
  )
}

export default SearchBar