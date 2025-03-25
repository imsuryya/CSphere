"use client"

import { useState } from "react"
import { Search } from "lucide-react"

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  return (
    <div className="relative flex items-center w-full max-w-md">
      <input
        type="text"
        placeholder="Search agents..."
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <Search className="absolute left-3 text-gray-400 cursor-pointer" size={20} onClick={handleSearch} />
    </div>
  )
}

export default SearchBar