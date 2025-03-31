"use client"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getAgentById } from "../data/agents"
import ChatSidebar from "../components/chat/ChatSidebar"
import ChatHeader from "../components/chat/ChatHeader"
import ChatMessages from "../components/chat/ChatMessage"
import ChatInput from "../components/chat/ChatInput"
import useChat from "../hooks/useChat"
import useChatHistory from "../hooks/useChatHistory"
import { auth } from "../firebase/config"

const ChatPage = () => {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const agent = getAgentById(Number.parseInt(agentId))
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check authentication status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        navigate("/login")
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const {
    messages,
    inputValue,
    isLoading,
    setInputValue,
    handleSendMessage,
    messagesEndRef,
    handleChatSelect,
    handleNewChat,
    activeChatId
  } = useChat(agent);

  const { chatHistory } = useChatHistory(agent);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only handle clicks when sidebar is open and on mobile
      if (sidebarOpen && window.innerWidth < 768) {
        const sidebar = document.getElementById("chat-sidebar")
        // If click is outside sidebar, close it
        if (sidebar && !sidebar.contains(event.target)) {
          setSidebarOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [sidebarOpen])

  // Close sidebar on window resize if screen becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!agent) {
      navigate("/dashboard")
      return
    }

    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [agent, navigate, messages, messagesEndRef])

  const startNewChat = async () => {
    const newChatId = await handleNewChat();
    if (newChatId && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (!agent || !isAuthenticated) return null

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar with chat history */}
      <div
        id="chat-sidebar"
        className={`fixed md:relative z-30 w-[280px] h-full transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <ChatSidebar
          agent={agent}
          chatHistory={chatHistory}
          handleNewChat={startNewChat}
          onChatSelect={handleChatSelect}
          activeChatId={activeChatId}
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col w-full md:w-[calc(100%-280px)] h-full">
        <ChatHeader agent={agent} navigate={navigate} toggleSidebar={toggleSidebar} />

        <ChatMessages messages={messages} agent={agent} isLoading={isLoading} messagesEndRef={messagesEndRef} />

        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
          agent={agent}
        />
      </div>
    </div>
  )
}

export default ChatPage