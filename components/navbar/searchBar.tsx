'use client'

import { Search } from 'lucide-react'
import React, { useState } from 'react'

const SearchBar = () => {
    const [search, setSearch] = useState('')

    return (
        <div className="w-[70%] md:w-[30%] flex items-center m-auto bg-background border border-border rounded-full px-3 focus-within:ring-2 focus-within:ring-primary">
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2.5 bg-background rounded-full outline-none"
                required
            />
            <Search className="text-muted-foreground mr-2" size={20} />
        </div>
    )
}

export default SearchBar