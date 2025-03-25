"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Send, ExternalLink, Youtube, User } from "lucide-react"
import { getAgentById } from "../data/agents"

const ChatPage = () => {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const agent = getAgentById(Number.parseInt(agentId))
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef(null)

  // Initial messages
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content: `Hi there! I'm the ${agent?.name}. How can I help you today?`,
      timestamp: "less than a minute ago",
    },
  ])

  // Sample chat history
  const chatHistory = [
    { id: "1", title: "hi", timestamp: "less than a minute ago" },
    { id: "2", title: agent?.chatHistoryTitle || "Previous chat", timestamp: "2 days ago" },
    { id: "3", title: "Market trend analysis", timestamp: "1 day ago" },
    { id: "4", title: "Customer segmentation", timestamp: "about 12 hours ago" },
  ]

  // Sample references
  const references = [
    {
      id: "1",
      title: `Understanding ${agent?.name.split(" ")[0]} Fundamentals`,
      type: "youtube",
      url: "https://youtube.com/watch?v=example1",
    },
    {
      id: "2",
      title: `10 Best Practices for ${agent?.name.split(" ")[0]} Visualization`,
      type: "article",
      source: `${agent?.name.split(" ")[0]} Science Journal`,
      url: "https://example.com/best-practices",
    },
    {
      id: "3",
      title: `Advanced ${agent?.name.split(" ")[0]} Techniques`,
      type: "youtube",
      url: "https://youtube.com/watch?v=example2",
    },
  ]

  useEffect(() => {
    if (!agent) {
      navigate("/dashboard")
      return
    }

    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [agent, navigate, messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: "less than a minute ago",
    }

    setMessages([...messages, userMessage])
    setInputValue("")

    // Simulate agent response after a short delay
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `As a ${agent.name}, I can help with that. Here's my analysis based on your request about "${inputValue}".`,
        timestamp: "less than a minute ago",
        references: references,
      }

      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  if (!agent) return null

  return (
    <div className="flex h-[calc(100vh-0px)]">
      {/* Sidebar with chat history */}
      <div className="w-80 border-r border-orange-100 bg-white hidden md:block">
        <div className="p-4 border-b border-orange-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="rounded-full w-8 h-8" />
            </div>
            <div>
              <h2 className="font-medium">{agent.name}</h2>
              <p className="text-xs text-gray-500 truncate max-w-[200px]">{agent.description}</p>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-73px)]">
          {chatHistory.map((chat) => (
            <div key={chat.id} className="p-4 border-b border-orange-100 hover:bg-orange-50 cursor-pointer">
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
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-orange-100 p-4 bg-white flex items-center">
          <button onClick={() => navigate("/dashboard")} className="mr-4 p-2 rounded-full hover:bg-orange-100">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="rounded-full w-6 h-6" />
            </div>
            <div>
              <h2 className="font-medium text-sm">{agent.name}</h2>
              <p className="text-xs text-gray-500">{agent.shortDescription}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-white to-orange-50">
          {messages.map((message) => (
            <div key={message.id} className="mb-6">
              <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && (
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="rounded-full w-6 h-6" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-4 rounded-lg ${
                    message.role === "user" ? "bg-orange-500 text-white ml-3" : "bg-white border border-orange-100"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                    <User size={16} />
                  </div>
                )}
              </div>

              <div className={`text-xs text-gray-500 mt-1 ${message.role === "user" ? "text-right mr-14" : "ml-14"}`}>
                {message.timestamp}
              </div>

              {/* References */}
              {message.references && (
                <div className="ml-14 mt-4">
                  <p className="text-sm text-gray-600 mb-2">References</p>
                  <div className="space-y-2">
                    {message.references.map((reference) => (
                      <a
                        key={reference.id}
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start p-3 bg-white border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          {reference.type === "youtube" ? (
                            <Youtube size={24} className="text-orange-500" />
                          ) : (
                            <ExternalLink size={24} className="text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{reference.title}</h3>
                          <p className="text-xs text-gray-500 flex items-center">
                            {reference.type === "youtube" ? "YouTube" : reference.source}
                            <ExternalLink size={12} className="ml-1" />
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-orange-100 bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask ${agent.name} something...`}
              className="flex-1 p-3 rounded-l-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <button
              type="submit"
              className="p-3 rounded-r-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              disabled={!inputValue.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatPage

