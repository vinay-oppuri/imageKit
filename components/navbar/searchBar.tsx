'use client'

import { Search, X, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (search.trim() === '') {
        setResults([])
        return
      }

      setLoading(true)

      try {
        const res = await fetch(`/api/search?q=${search}`)
        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const delayDebounce = setTimeout(fetchResults, 300)
    return () => clearTimeout(delayDebounce)
  }, [search])

  const renderResults = () => (
    <ul className="absolute top-full left-0 right-0 bg-background border border-border mt-1 rounded-xl shadow-md z-50 max-h-60 overflow-y-auto">
      {loading ? (
        <li className="flex justify-center p-3 text-muted-foreground">
          <Loader2 className="animate-spin" size={20} />
        </li>
      ) : results.length > 0 ? (
        results.map((community: any) => (
          <li key={community._id}>
            <Link
              href={`/community/${community._id}`}
              className="block px-4 py-2 hover:bg-muted text-sm"
            >
              {community.name}
            </Link>
          </li>
        ))
      ) : (
        <li className="px-4 py-2 text-muted-foreground text-sm">
          No results found.
        </li>
      )}
    </ul>
  )

  return (
    <>
      {/* Desktop Search Bar */}
      <div className="relative hidden md:flex w-[60%] items-center bg-background border border-border rounded-full px-3 focus-within:ring-2 focus-within:ring-primary">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-1.5 bg-background rounded-full outline-none"
        />
        <Search className="text-muted-foreground mr-2" size={20} />
        {search && renderResults()}
      </div>

      {/* Mobile Icon */}
      <button
        onClick={() => setExpanded(true)}
        className="md:hidden p-2"
        aria-label="Open search"
      >
        <Search size={20} />
      </button>

      {/* Mobile Expanded */}
      {expanded && (
        <div className="fixed inset-0 z-50 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-full shadow-lg">
            <input
              type="text"
              placeholder="Search"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 px-4 bg-background border border-border rounded-full outline-none"
            />
            <button
              onClick={() => setExpanded(false)}
              className="p-2"
              aria-label="Close search"
            >
              <X className='bg-background' size={24} />
            </button>
          </div>
          {search && <div className="mt-4 relative">{renderResults()}</div>}
        </div>
      )}
    </>
  )
}

export default SearchBar