import { useState, useRef, useCallback, useEffect } from "react";
import { sendMessageToGemini } from "../services/geminiService";
import { fetchResources } from "../services/tavilyService";
import { auth } from "../firebase/config";

const useChat = (agent) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [references, setReferences] = useState([]);
  const messagesEndRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Set current user from auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    
    return () => unsubscribe();
  }, []);

  // Load chat from localStorage on mount
  useEffect(() => {
    if (agent && currentUser) {
      const chatKey = `chat_${currentUser.uid}_${agent.id}`;
      const savedMessages = localStorage.getItem(chatKey);
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {
          console.error("Error parsing saved messages:", e);
          // If parsing fails, start fresh
          setMessages([]);
        }
      } else {
        // Clear messages if we're loading a new chat
        setMessages([]);
      }
    }
  }, [agent, currentUser]);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (agent && currentUser && messages.length > 0) {
      const chatKey = `chat_${currentUser.uid}_${agent.id}`;
      localStorage.setItem(chatKey, JSON.stringify(messages));
    }
  }, [agent, messages, currentUser]);

  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      
      if (!inputValue.trim() || isLoading || !agent || !currentUser) return;
      
      const userMessage = {
        role: "user",
        content: inputValue.trim(),
      };
      
      // Update UI immediately with user message
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);
      
      try {
        // Fetch related resources in parallel with AI response
        const resourcesPromise = fetchResources(userMessage.content);
        
        // Get AI response
        const aiResponse = await sendMessageToGemini(
          agent.id,
          userMessage.content,
          messages
        );
        
        // Get related resources
        const resources = await resourcesPromise;
        
        // Combine videos and blogs into references
        const combinedReferences = [
          ...resources.videos,
          ...resources.blogs,
        ].slice(0, 6); // Limit to 6 total references
        
        // Update references
        setReferences(combinedReferences);
        
        // Add AI response to messages
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: aiResponse.text,
            references: combinedReferences,
          },
        ]);
      } catch (error) {
        console.error("Error in chat:", error);
        
        // Add error message
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm sorry, but I encountered an error. Please try again later.",
            references: [],
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, agent, messages, currentUser]
  );

  return {
    messages,
    inputValue,
    isLoading,
    references,
    setInputValue,
    handleSendMessage,
    messagesEndRef,
    currentUser
  };
};

export default useChat;