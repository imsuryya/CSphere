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
  const [activeChatId, setActiveChatId] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Check authentication status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
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
    currentUser
  } = useChat(agent)
  
  const {
    chatHistory,
    handleNewChat
  } = useChatHistory(messages, agent)

  useEffect(() => {
    if (!agent) {
      navigate("/dashboard")
      return
    }

    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [agent, navigate, messages, messagesEndRef])

  const handleChatSelect = (chatId) => {
    if (currentUser && agent) {
      // Set the active chat ID
      setActiveChatId(chatId)
      
      // Clear the current messages from state
      // This will trigger useChat's useEffect to load the selected chat
      // We're using a technique that forces the chat to reload
      localStorage.setItem(`current_chat_${currentUser.uid}`, chatId)
      
      // Force a reload of the component
      window.location.reload()
    }
  }

  const startNewChat = () => {
    if (currentUser && agent) {
      // Create a new chat and get its ID
      const newChatId = handleNewChat()
      
      // Set it as active
      if (newChatId) {
        setActiveChatId(newChatId)
        localStorage.setItem(`current_chat_${currentUser.uid}`, newChatId)
        
        // Force a reload of the component to clear messages
        window.location.reload()
      }
    }
  }

  if (!agent || !isAuthenticated) return null

  return (
    <div className="flex h-[calc(100vh-0px)]">
      {/* Sidebar with chat history */}
      <ChatSidebar 
        agent={agent}
        chatHistory={chatHistory}
        handleNewChat={startNewChat}
        onChatSelect={handleChatSelect}
        activeChatId={activeChatId}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader 
          agent={agent} 
          navigate={navigate} 
        />

        <ChatMessages 
          messages={messages}
          agent={agent}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />

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