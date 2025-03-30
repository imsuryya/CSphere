import { Send } from "lucide-react"

const ChatInput = ({ inputValue, setInputValue, handleSendMessage, isLoading, agent }) => {
  return (
    <div className="p-4 border-t border-orange-100 bg-white">
      <form onSubmit={handleSendMessage} className="flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Ask about ${agent?.language || 'coding'}...`}
          className="flex-1 p-3 rounded-l-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className={`p-3 rounded-r-lg ${
            !inputValue.trim() || isLoading
              ? "bg-gray-200 text-gray-500"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

export default ChatInput