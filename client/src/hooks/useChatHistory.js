import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

const HISTORY_KEY_PREFIX = "chat_history_";

const useChatHistory = (messages, agent) => {
  // State to manage chat history
  const [chatHistory, setChatHistory] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Set current user from auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        // Load user's chat history
        loadUserChatHistory(user.uid);
      } else {
        // Clear chat history if no user
        setChatHistory([]);
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  const loadUserChatHistory = (userId) => {
    if (!userId) return;
    
    const historyKey = `${HISTORY_KEY_PREFIX}${userId}`;
    const savedHistory = localStorage.getItem(historyKey);
    
    if (savedHistory) {
      try {
        setChatHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error parsing saved chat history:", e);
        setChatHistory([{ 
          id: "default", 
          agentId: agent?.id, 
          title: "New conversation", 
          timestamp: new Date().toLocaleTimeString() 
        }]);
      }
    } else {
      // Initialize with a default chat if none exists
      setChatHistory([{ 
        id: "default", 
        agentId: agent?.id, 
        title: "New conversation", 
        timestamp: new Date().toLocaleTimeString() 
      }]);
    }
  };
  
  const saveUserChatHistory = () => {
    if (!currentUser) return;
    
    const historyKey = `${HISTORY_KEY_PREFIX}${currentUser.uid}`;
    localStorage.setItem(historyKey, JSON.stringify(chatHistory));
  };

  // Save chat history whenever it changes
  useEffect(() => {
    if (currentUser && chatHistory.length > 0) {
      saveUserChatHistory();
    }
  }, [chatHistory, currentUser]);

  useEffect(() => {
    // Update chat history with first message if this is the first user message
    if (
      currentUser &&
      agent &&
      messages.length >= 2 && 
      messages[0].role === "assistant" && 
      messages[1].role === "user"
    ) {
      const userMessage = messages[1];
      
      // Extract a title from the user's first message (limited to 30 chars)
      const title = userMessage.content.length > 30 
        ? userMessage.content.substring(0, 30) + "..." 
        : userMessage.content;
      
      // Check if this chat already exists in history
      const existingChatIndex = chatHistory.findIndex(
        chat => chat.id === `${currentUser.uid}_${agent.id}`
      );
      
      if (existingChatIndex === -1) {
        // Add new chat to history
        const newChat = {
          id: `${currentUser.uid}_${agent.id}`,
          agentId: agent.id,
          title,
          timestamp: new Date().toLocaleTimeString()
        };
        
        setChatHistory(prev => [newChat, ...prev]);
      }
    }
  }, [messages, agent, currentUser, chatHistory]);

  const handleNewChat = () => {
    if (!currentUser || !agent) return;
    
    // Create a new chat history entry with a unique ID
    const newChatId = `${currentUser.uid}_${agent.id}_${Date.now()}`;
    const newChatEntry = {
      id: newChatId,
      agentId: agent.id,
      title: "New conversation",
      timestamp: new Date().toLocaleTimeString()
    };

    // Add new chat to history
    setChatHistory(prev => [newChatEntry, ...prev]);
    
    // Clear current messages (this should trigger a new chat load)
    localStorage.removeItem(`chat_${currentUser.uid}_${agent.id}`);
    
    // Return the new chat ID so the parent component can use it
    return newChatId;
  };

  // Filter chat history to only show chats for the current agent
  const filteredChatHistory = chatHistory.filter(
    chat => chat.agentId === agent?.id
  );

  return {
    chatHistory: filteredChatHistory,
    setChatHistory,
    handleNewChat,
    currentUser
  };
};

export default useChatHistory;