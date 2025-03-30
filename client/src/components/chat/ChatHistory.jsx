const ChatHistory = ({ chatHistory, onChatSelect, activeChatId }) => {
  return (
    <div className="overflow-y-auto h-[calc(100%-73px)]">
      {chatHistory.map((chat) => (
        <div 
          key={chat.id} 
          className={`p-4 border-b border-orange-100 hover:bg-orange-50 cursor-pointer ${
            chat.id === activeChatId ? 'bg-orange-100' : ''
          }`}
          onClick={() => onChatSelect(chat.id)}
        >
          <div className="flex items-start">
            <span className="mr-3 mt-1 text-gray-400">💬</span>
            <div>
              <h3 className="font-medium text-sm">{chat.title}</h3>
              <p className="text-xs text-gray-500">{chat.timestamp}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatHistory