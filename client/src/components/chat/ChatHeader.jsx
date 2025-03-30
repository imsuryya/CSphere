"use client"

import { ArrowLeft, Menu } from "lucide-react"

const ChatHeader = ({ agent, navigate, toggleSidebar }) => {
  return (
    <div className="border-b border-orange-100 p-3 sm:p-4 bg-white flex items-center shadow-sm">
      <button
        onClick={toggleSidebar}
        className="md:hidden mr-3 p-2 rounded-full hover:bg-orange-100 transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      <button
        onClick={() => navigate("/dashboard")}
        className="mr-3 p-2 rounded-full hover:bg-orange-100 transition-colors"
        aria-label="Back to dashboard"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="flex items-center overflow-hidden">
        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 overflow-hidden shadow-sm flex-shrink-0">
          <img
            src={agent.avatar || "/placeholder.svg"}
            alt={agent.name}
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>
        <div className="overflow-hidden">
          <h2 className="font-medium text-sm sm:text-base truncate">{agent.name}</h2>
          <p className="text-xs text-gray-500 truncate">{agent.shortDescription}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader

