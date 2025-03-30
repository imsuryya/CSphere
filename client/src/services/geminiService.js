// Gemini API service for AI chat functionality
import { languagePrompts } from "../data/agents";

// Access environment variables correctly
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com";
const MODEL = "gemini-1.5-pro";

/**
 * Sends a message to the Gemini API and gets a response
 * @param {number} agentId - The ID of the agent to use
 * @param {string} userMessage - The user's message
 * @param {array} chatHistory - Previous messages in the conversation
 * @returns {Promise<{text: string, references: array}>} - The AI response and references
 */
export const sendMessageToGemini = async (agentId, userMessage, chatHistory = []) => {
  try {
    // Get the agent from the agents data to determine language
    const agent = await import("../data/agents").then(module => module.getAgentById(agentId));
    
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is missing. Please check your environment variables.");
    }
    
    // Create system prompt based on agent's programming language
    const systemPrompt = agent && agent.language && languagePrompts[agent.language]
      ? languagePrompts[agent.language]
      : "You are a helpful programming AI assistant. You provide clear, concise, and accurate information with clean code examples.";
    
    // Add constraints for staying within agent's expertise and code formatting
    const constraintPrompt = `
You are specialized in ${agent?.language || 'programming'} programming. If a user asks about a different programming language or a topic unrelated to programming, politely inform them that you're specialized in ${agent?.language || 'programming'} and can't help with that specific request.

VERY IMPORTANT: When showing code examples, you MUST format them with proper syntax highlighting following these rules:
1. Always wrap code blocks in triple backticks with the language specified
2. Format code like \`\`\`${(agent?.language || 'javascript').toLowerCase()}\n// Your code here\n\`\`\`
3. The code must be clean, well-indented, and include helpful comments
4. Use proper markdown formatting for all your responses
5. Format your response as if you're writing for a programming documentation

Keep your explanations concise but complete, with code examples that demonstrate best practices.
`;
    
    // Format chat history for Gemini API (convert to array of messages)
    const formattedHistory = chatHistory.filter(msg => msg.role && msg.content).map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));
    
    // Prepare the request body
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt + "\n\n" + constraintPrompt + "\n\n" + userMessage }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    };
    
    // If we have chat history, add it
    if (formattedHistory.length > 0) {
      requestBody.contents = [...formattedHistory, requestBody.contents[0]];
    }
    
    console.log("Sending request to Gemini API:", JSON.stringify(requestBody, null, 2));
    
    // Build request to Gemini API
    const response = await fetch(
      `${GEMINI_API_URL}/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error response:", errorData);
      throw new Error(errorData.error?.message || `Gemini API error: ${response.status}`);
    }
    
    // Parse the response
    const data = await response.json();
    
    // Validate response structure
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("Unexpected Gemini API response format:", data);
      throw new Error("Invalid response format from Gemini API");
    }

    // Extract the response text
    const aiResponseText = data.candidates[0].content.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
    
    return {
      text: aiResponseText,
      references: [] // Tavily service will provide references separately
    };
  } catch (error) {
    console.error("Error with Gemini API:", error);
    
    return {
      text: "I'm sorry, but I encountered an error processing your request. Please try again later.",
      references: []
    };
  }
};