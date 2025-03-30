import { useState, useRef, useCallback, useEffect } from "react";
import { sendMessageToGemini } from "../services/geminiService";
import { fetchResources } from "../services/tavilyService";

const useChat = (agent) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [references, setReferences] = useState([]);
  const messagesEndRef = useRef(null);

  // Load chat from localStorage on mount
  useEffect(() => {
    if (agent) {
      const savedMessages = localStorage.getItem(`chat_${agent.id}`);
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {
          console.error("Error parsing saved messages:", e);
          // If parsing fails, start fresh
          setMessages([]);
        }
      }
    }
  }, [agent]);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (agent && messages.length > 0) {
      localStorage.setItem(`chat_${agent.id}`, JSON.stringify(messages));
    }
  }, [agent, messages]);

  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      
      if (!inputValue.trim() || isLoading || !agent) return;
      
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
    [inputValue, isLoading, agent, messages]
  );

  return {
    messages,
    inputValue,
    isLoading,
    references,
    setInputValue,
    handleSendMessage,
    messagesEndRef,
  };
};

export default useChat;