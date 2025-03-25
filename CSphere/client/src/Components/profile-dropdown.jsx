"use client"

import { useState, useRef, useEffect } from "react"
import { User, LogOut, Settings, HelpCircle } from "lucide-react"

const ProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-orange-100 transition-colors">
        <User size={24} className="text-orange-600" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
          <div className="p-3 border-b">
            <p className="font-medium">User Name</p>
            <p className="text-sm text-gray-500">user@example.com</p>
          </div>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
            <Settings className="mr-2" size={16} /> Settings
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
            <HelpCircle className="mr-2" size={16} /> Help
          </button>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-red-500"
          >
            <LogOut className="mr-2" size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown

