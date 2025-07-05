'use client'

import axios from 'axios'
import { Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [results, setResults] = useState([])

  const fetchResults = async () => {
    if (search.trim() === '') {
      setResults([])
      return
    }

    try {
      const res = await axios.get(`/api/search?q=${search}`)
      setResults(res.data)
    } catch (error: any) {
      console.log('Error fetching Results.')
    }
  }

  useEffect(() => {
    fetchResults()
    const delayDebounce = setTimeout(fetchResults, 300)
    return () => clearTimeout(delayDebounce)
  }, [search])

  const renderResults = () => (
    <ul className="absolute top-full left-0 right-0 bg-background border border-border mt-1 rounded-xl shadow-md z-50">
      {results.map((community: any) => (
        <li
          key={community._id}
          className="px-4 py-2 hover:bg-muted cursor-pointer"
        >
          {community.name}
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <div className="hidden md:flex w-[60%] items-center bg-background border border-border rounded-full px-3 focus-within:ring-2 focus-within:ring-primary">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-1.5 bg-background rounded-full outline-none"
        />
        <Search className="text-muted-foreground mr-2" size={20} />
        {search && results.length > 0 && renderResults()}
      </div>

      <button
        onClick={() => setExpanded(true)}
        className="md:hidden p-2"
        aria-label="Open search"
      >
        <Search size={20} />
      </button>

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
          {search && results.length > 0 && renderResults()}
        </div>
      )}
    </>
  )
}

export default SearchBar