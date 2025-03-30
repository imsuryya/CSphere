import { useState, useEffect } from "react"

const useChatHistory = (messages, agent) => {
  // State to manage chat history
  const [chatHistory, setChatHistory] = useState([
    { id: "1", title: "New conversation", timestamp: "less than a minute ago" },
  ])

  useEffect(() => {
    // Update chat history with first message if this is the first user message
    if (
      messages.length === 2 && 
      messages[0].role === "assistant" && 
      messages[1].role === "user"
    ) {
      const userMessage = messages[1];
      
      // Extract a title from the user's first message (limited to 30 chars)
      const title = userMessage.content.length > 30 
        ? userMessage.content.substring(0, 30) + "..." 
        : userMessage.content;
        
      setChatHistory(prev => [{
        id: Date.now().toString(),
        title,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev]);
    }
  }, [messages]);

  const handleNewChat = () => {
    // Create a new chat history entry
    const newChatId = Date.now().toString();
    const newChatEntry = {
      id: newChatId,
      title: "New conversation",
      timestamp: new Date().toLocaleTimeString()
    };

    // Add new chat to history
    setChatHistory([newChatEntry, ...chatHistory])
  }

  return {
    chatHistory,
    setChatHistory,
    handleNewChat
  }
}

export default useChatHistory