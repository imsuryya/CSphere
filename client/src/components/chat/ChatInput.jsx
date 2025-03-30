"use client"

import { Send } from "lucide-react"
import { useState, useEffect } from "react"

const ChatInput = ({ inputValue, setInputValue, handleSendMessage, isLoading, agent }) => {
  const [rows, setRows] = useState(1)

  // Adjust textarea height based on content
  useEffect(() => {
    if (inputValue.length > 100) {
      setRows(2)
    } else {
      setRows(1)
    }
  }, [inputValue])

  return (
    <div className="p-3 sm:p-4 border-t border-orange-100 bg-white shadow-sm">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-3xl mx-auto">
        <textarea
          rows={rows}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Ask about ${agent?.language || "coding"}...`}
          className="flex-1 p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none transition-all"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              if (inputValue.trim()) handleSendMessage(e)
            }
          }}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className={`p-3 rounded-lg transition-colors ${
            !inputValue.trim() || isLoading
              ? "bg-gray-200 text-gray-500"
              : "bg-orange-500 text-white hover:bg-orange-600 shadow-sm"
          }`}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </form>
      <p className="text-xs text-center text-gray-500 mt-2 max-w-3xl mx-auto">
        Press Enter to send, Shift+Enter for a new line
      </p>
    </div>
  )
}

export default ChatInput