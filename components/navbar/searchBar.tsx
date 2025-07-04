'use client'

import { Search } from 'lucide-react'
import React, { useState } from 'react'

const SearchBar = () => {
    const [search, setSearch] = useState('')

    return (
        <div className="not-md:ml-12 w-[80%] md:w-full flex items-center bg-background border border-border rounded-full px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[80%] md:w-full py-2.5 bg-background rounded-full outline-none"
                required
            />
            <Search className="text-muted-foreground" size={20} />
        </div>
    )
}

export default SearchBar