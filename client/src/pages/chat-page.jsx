"use client"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getAgentById } from "../data/agents"
import ChatSidebar from "../components/chat/ChatSidebar"
import ChatHeader from "../components/chat/ChatHeader"
import ChatMessages from "../components/chat/ChatMessage" // Fixed import
import ChatInput from "../components/chat/ChatInput"
import useChat from "../hooks/useChat"
import useChatHistory from "../hooks/useChatHistory"

const ChatPage = () => {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const agent = getAgentById(Number.parseInt(agentId))
  
  const { 
    messages, 
    inputValue, 
    isLoading,
    setInputValue,
    handleSendMessage,
    messagesEndRef
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

  if (!agent) return null

  return (
    <div className="flex h-[calc(100vh-0px)]">
      {/* Sidebar with chat history */}
      <ChatSidebar 
        agent={agent}
        chatHistory={chatHistory}
        handleNewChat={handleNewChat}
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