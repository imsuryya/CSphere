import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  doc,
  updateDoc,
  serverTimestamp 
} from "firebase/firestore";

const useChatHistory = (agent) => {
  // State to manage chat history
  const [chatHistory, setChatHistory] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);

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
  
  const loadUserChatHistory = async (userId) => {
    if (!userId) return;
    
    try {
      const chatsRef = collection(db, "chatHistory");
      const q = query(
        chatsRef,
        where("userId", "==", userId),
        orderBy("updatedAt", "desc")  // Sort by last updated
      );
      
      const querySnapshot = await getDocs(q);
      const chats = [];
      
      querySnapshot.forEach((doc) => {
        chats.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().updatedAt?.toDate()?.toLocaleTimeString() || new Date().toLocaleTimeString()
        });
      });
      
      setChatHistory(chats);
      
      // Set the most recent chat as active
      if (chats.length > 0) {
        setActiveChatId(chats[0].id);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      setChatHistory([]);
    }
  };

  const onChatSelect = (chatId) => {
    setActiveChatId(chatId);
  };

  // Filter chat history to only show chats for the current agent
  const filteredChatHistory = chatHistory.filter(
    chat => chat.agentId === agent?.id
  );

  return {
    chatHistory: filteredChatHistory,
    activeChatId,
    onChatSelect,
    currentUser
  };
};

export default useChatHistory;