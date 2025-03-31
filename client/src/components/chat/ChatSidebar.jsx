"use client"

import { Plus } from "lucide-react"
import ChatHistory from "./ChatHistory"

const ChatSidebar = ({ agent, chatHistory, handleNewChat, onChatSelect, activeChatId }) => {
  return (
    <div className="w-full h-full border-r border-orange-100 bg-white flex flex-col">
      <div className="p-4 border-b border-orange-100 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src={agent.avatar || "/placeholder.svg"}
              alt={agent.name}
              className="rounded-full w-10 h-10 object-cover"
            />
          </div>
          <div className="overflow-hidden">
            <h2 className="font-medium truncate">{agent.name}</h2>
            <p className="text-xs text-gray-500 truncate max-w-[180px]">{agent.shortDescription}</p>
          </div>
        </div>
        <button
          onClick={handleNewChat}
          className="p-2 rounded-full hover:bg-orange-100 transition-colors"
          title="Start New Chat"
          aria-label="Start new chat"
        >
          <Plus size={20} className="text-orange-500" />
        </button>
      </div>

      <ChatHistory 
        chatHistory={chatHistory} 
        onChatSelect={onChatSelect} 
        activeChatId={activeChatId} 
      />
    </div>
  )
}

export default ChatSidebar