import { Plus } from "lucide-react"
import ChatHistory from "./ChatHistory"

const ChatSidebar = ({ agent, chatHistory, handleNewChat }) => {
  return (
    <div className="w-80 border-r border-orange-100 bg-white hidden md:block">
      <div className="p-4 border-b border-orange-100 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <img src={agent.avatar} alt={agent.name} className="rounded-full w-10 h-10 object-cover" />
          </div>
          <div>
            <h2 className="font-medium">{agent.name}</h2>
            <p className="text-xs text-gray-500 truncate max-w-[200px]">{agent.shortDescription}</p>
          </div>
        </div>
        <button 
          onClick={handleNewChat} 
          className="p-2 rounded-full hover:bg-orange-100 transition-colors"
          title="Start New Chat"
        >
          <Plus size={20} className="text-orange-500" />
        </button>
      </div>

      <ChatHistory chatHistory={chatHistory} />
    </div>
  )
}

export default ChatSidebar