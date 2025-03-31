import { useState, useRef, useCallback, useEffect } from "react";
import { sendMessageToGemini } from "../services/geminiService";
import { fetchResources } from "../services/tavilyService";
import { auth, db } from "../firebase/config";
import { 
  collection, 
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp 
} from "firebase/firestore";

const useChat = (agent) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [references, setReferences] = useState([]);
  const messagesEndRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);

  // Set current user from auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser && activeChatId) {
      loadChat(activeChatId);
    }
  }, [currentUser, activeChatId]);

  // This function will be called when a chat is selected
  const handleChatSelect = async (chatId) => {
    setActiveChatId(chatId);
    await loadChat(chatId);
  };

  // Load a specific chat by ID
  const loadChat = async (chatId) => {
    if (!chatId || !currentUser) return;
    
    setIsLoading(true);
    try {
      const chatDocRef = doc(db, "chatHistory", chatId);
      const chatDoc = await getDoc(chatDocRef);
      
      if (chatDoc.exists()) {
        const chatData = chatDoc.data();
        // Load the conversation messages array
        const conversationMessages = chatData.messages || [];
        setMessages(conversationMessages);
      } else {
        // Chat doesn't exist or is empty
        setMessages([]);
      }
    } catch (error) {
      console.error("Error loading chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update chat document with new messages
  const updateChatMessages = async (newMessages) => {
    if (!currentUser || !activeChatId) return;
    
    try {
      const chatDocRef = doc(db, "chatHistory", activeChatId);
      await updateDoc(chatDocRef, {
        messages: newMessages,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating chat messages:", error);
    }
  };

  // Handle sending a message
  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      
      if (!inputValue.trim() || isLoading || !agent || !currentUser) return;
      
      // If no active chat, we need to create one
      let chatId = activeChatId;
      if (!chatId) {
        try {
          // Create a new chat with an empty messages array
          const chatData = {
            userId: currentUser.uid,
            agentId: agent.id,
            title: "New conversation",
            messages: [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };
          
          const chatRef = doc(collection(db, "chatHistory"));
          await setDoc(chatRef, chatData);
          chatId = chatRef.id;
          setActiveChatId(chatId);
        } catch (error) {
          console.error("Error creating new chat:", error);
          return;
        }
      }
      
      const userMessage = {
        role: "user",
        content: inputValue.trim(),
        timestamp: new Date().toISOString()
      };
      
      // Update UI immediately with user message
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputValue("");
      setIsLoading(true);
      
      try {
        // Update the chat document with the new message
        await updateChatMessages(updatedMessages);
        
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
        
        // Create assistant message
        const assistantMessage = {
          role: "assistant",
          content: aiResponse.text,
          references: combinedReferences,
          timestamp: new Date().toISOString()
        };
        
        // Update messages array with both user and assistant messages
        const finalMessages = [...updatedMessages, assistantMessage];
        setMessages(finalMessages);
        
        // Update the chat document with the complete conversation
        await updateChatMessages(finalMessages);
        
        // If this is the first message exchange, update chat title
        if (messages.length === 0) {
          updateChatTitle(chatId, userMessage.content);
        }
      } catch (error) {
        console.error("Error in chat:", error);
        
        // Create error message
        const errorMessage = {
          role: "assistant",
          content: "I'm sorry, but I encountered an error. Please try again later.",
          references: [],
          timestamp: new Date().toISOString()
        };
        
        // Add error message
        const errorMessages = [...updatedMessages, errorMessage];
        setMessages(errorMessages);
        
        // Update chat with error included
        await updateChatMessages(errorMessages);
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, agent, messages, currentUser, activeChatId]
  );

  // Update chat title
  const updateChatTitle = async (chatId, content) => {
    if (!chatId) return;
    
    try {
      // Extract a title from the user's first message (limited to 30 chars)
      const title = content.length > 30 
        ? content.substring(0, 30) + "..." 
        : content;
        
      const chatRef = doc(db, "chatHistory", chatId);
      await updateDoc(chatRef, {
        title,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating chat title:", error);
    }
  };

  // Handle creating a new chat
  const handleNewChat = async () => {
    if (!currentUser || !agent) return;
    
    try {
      // Create a new chat in Firestore with empty messages array
      const chatData = {
        userId: currentUser.uid,
        agentId: agent.id,
        title: "New conversation",
        messages: [], // Initialize with empty array
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const chatRef = doc(collection(db, "chatHistory"));
      await setDoc(chatRef, chatData);
      setActiveChatId(chatRef.id);
      
      // Clear messages
      setMessages([]);
      
      return chatRef.id;
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  return {
    messages,
    inputValue,
    isLoading,
    references,
    setInputValue,
    handleSendMessage,
    messagesEndRef,
    currentUser,
    handleChatSelect,
    handleNewChat,
    activeChatId
  };
};

export default useChat;