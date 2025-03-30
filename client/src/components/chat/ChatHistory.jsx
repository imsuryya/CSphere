"use client"

const ChatHistory = ({ chatHistory, onChatSelect, activeChatId }) => {
  return (
    <div className="overflow-y-auto h-[calc(100%-73px)] scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
      {chatHistory.length === 0 ? (
        <div className="p-4 text-center text-gray-500 text-sm">No chat history yet</div>
      ) : (
        chatHistory.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 border-b border-orange-100 hover:bg-orange-50 cursor-pointer transition-colors ${
              chat.id === activeChatId ? "bg-orange-100" : ""
            }`}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="flex items-start">
              <span className="mr-3 mt-1 text-gray-400 flex-shrink-0">💬</span>
              <div className="overflow-hidden">
                <h3 className="font-medium text-sm truncate">{chat.title}</h3>
                <p className="text-xs text-gray-500">{chat.timestamp}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ChatHistory

