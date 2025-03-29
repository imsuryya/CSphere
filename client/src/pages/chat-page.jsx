"use client"
import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Send, ExternalLink, Youtube, User, Plus } from "lucide-react"
import { getAgentById } from "../data/agents"
import { sendMessageToGemini } from "../services/geminiService"
import { fetchResources, processYouTubeVideos } from "../services/tavilyService"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ErrorBoundary } from 'react-error-boundary'

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="p-4 bg-red-50 border border-red-300 rounded-lg">
      <h3 className="text-red-700 font-medium">Something went wrong:</h3>
      <p className="text-sm text-red-600">{error.message}</p>
      <button 
        onClick={resetErrorBoundary} 
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  )
}

const ChatPage = () => {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const agent = getAgentById(Number.parseInt(agentId))
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  // State to manage chat history
  const [chatHistory, setChatHistory] = useState([
    { id: "1", title: "New conversation", timestamp: "less than a minute ago" },
  ])

  // Initial messages
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content: agent ? `Hi there! I'm the ${agent.name}. How can I help you with ${agent.language} today?` : "Welcome! How can I help you?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])

  useEffect(() => {
    if (!agent) {
      navigate("/dashboard")
      return
    }

    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [agent, navigate, messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    setIsLoading(true)

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    }

    // Create a copy of current messages for history
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages)
    setInputValue("")

    try {
      // Get AI response from Gemini
      const geminiResponse = await sendMessageToGemini(
        agent.id, 
        inputValue, 
        updatedMessages.map(msg => ({ role: msg.role, content: msg.content }))
      );

      // Update chat history with first message if this is the first user message
      if (messages.length === 1 && messages[0].role === "assistant") {
        // Extract a title from the user's first message (limited to 30 chars)
        const title = inputValue.length > 30 
          ? inputValue.substring(0, 30) + "..." 
          : inputValue;
          
        setChatHistory(prev => [{
          id: Date.now().toString(),
          title,
          timestamp: new Date().toLocaleTimeString()
        }, ...prev]);
      }

      // Fetch relevant resources from Tavily
      const resources = await fetchResources(inputValue);
      
      // Process YouTube videos for embedding
      const processedVideos = resources && resources.videos ? 
        processYouTubeVideos(resources.videos) : [];

      // Add assistant response
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: geminiResponse.text,
        timestamp: new Date().toLocaleTimeString(),
        references: [
          ...(resources && resources.blogs ? resources.blogs.map(blog => ({
            id: blog.id.toString(),
            title: blog.title,
            type: "article",
            source: blog.source,
            url: blog.url
          })) : []),
          ...processedVideos.map(video => ({
            id: video.id.toString(),
            title: video.title,
            type: "youtube",
            url: video.url,
            embedUrl: video.embedUrl,
            thumbnailUrl: video.thumbnailUrl
          }))
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error handling message:", error);
      
      // Add error message
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, but I encountered an error while processing your request. Please try again.",
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

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

    // Reset messages to initial state
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: agent ? `Hi there! I'm the ${agent.name}. How can I help you with ${agent.language} today?` : "Welcome! How can I help you?",
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }

  // Custom renderer for code blocks - fixed to avoid className issues
  const renderers = {
    code({inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code {...props}>
          {children}
        </code>
      )
    },
    // Ensure no className is passed to html elements that might not accept it
    p: ({children}) => <p>{children}</p>,
    h1: ({children}) => <h1>{children}</h1>,
    h2: ({children}) => <h2>{children}</h2>,
    h3: ({children}) => <h3>{children}</h3>,
    h4: ({children}) => <h4>{children}</h4>,
    h5: ({children}) => <h5>{children}</h5>,
    h6: ({children}) => <h6>{children}</h6>,
    ul: ({children}) => <ul>{children}</ul>,
    ol: ({children}) => <ol>{children}</ol>,
    li: ({children}) => <li>{children}</li>,
    blockquote: ({children}) => <blockquote>{children}</blockquote>
  }

  if (!agent) return null

  return (
    <div className="flex h-[calc(100vh-0px)]">
      {/* Sidebar with chat history */}
      <div className="w-80 border-r border-orange-100 bg-white hidden md:block">
        <div className="p-4 border-b border-orange-100 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <img src={agent.avatar} alt={agent.name} className="rounded-full w-10 h-10 object-cover" />
            </div>
            <div>
              <h2 className="font-medium">{agent.name}</h2>
              <p className="text-xs text-gray-500 truncate max-w-[200px]">{agent.shortDescription}</p>
            </div>
          </div>
          <button 
            onClick={handleNewChat} 
            className="p-2 rounded-full hover:bg-orange-100 transition-colors"
            title="Start New Chat"
          >
            <Plus size={20} className="text-orange-500" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-73px)]">
          {chatHistory.map((chat) => (
            <div key={chat.id} className="p-4 border-b border-orange-100 hover:bg-orange-50 cursor-pointer">
              <div className="flex items-start">
                <span className="mr-3 mt-1 text-gray-400">💬</span>
                <div>
                  <h3 className="font-medium text-sm">{chat.title}</h3>
                  <p className="text-xs text-gray-500">{chat.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-orange-100 p-4 bg-white flex items-center">
          <button onClick={() => navigate("/dashboard")} className="mr-4 p-2 rounded-full hover:bg-orange-100">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <img src={agent.avatar} alt={agent.name} className="rounded-full w-8 h-8 object-cover" />
            </div>
            <div>
              <h2 className="font-medium text-sm">{agent.name}</h2>
              <p className="text-xs text-gray-500">{agent.shortDescription}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-white to-orange-50">
          {messages.map((message) => (
            <div key={message.id} className="mb-6">
              <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && (
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <img src={agent.avatar} alt={agent.name} className="rounded-full w-8 h-8 object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-4 rounded-lg ${
                    message.role === "user" ? "bg-orange-500 text-white ml-3" : "bg-white border border-orange-100"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <ErrorBoundary
                      FallbackComponent={ErrorFallback}
                      onReset={() => {
                        // Reset the component state here if needed
                      }}
                    >
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown components={renderers}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </ErrorBoundary>
                  ) : (
                    message.content
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                    <User size={16} />
                  </div>
                )}
              </div>

              <div className={`text-xs text-gray-500 mt-1 ${message.role === "user" ? "text-right mr-14" : "ml-14"}`}>
                {message.timestamp}
              </div>

              {/* References - Show only if they exist and not empty */}
              {message.references && message.references.length > 0 && (
                <div className="ml-14 mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Related Resources</p>
                  <div className="space-y-2">
                    {message.references.map((reference) => (
                      <a
                        key={reference.id}
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start p-3 bg-white border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          {reference.type === "youtube" ? (
                            reference.thumbnailUrl ? (
                              <img 
                                src={reference.thumbnailUrl} 
                                alt={reference.title} 
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            ) : (
                              <Youtube size={24} className="text-orange-500" />
                            )
                          ) : (
                            <ExternalLink size={24} className="text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{reference.title}</h3>
                          <p className="text-xs text-gray-500 flex items-center">
                            {reference.type === "youtube" ? "YouTube" : reference.source}
                            <ExternalLink size={12} className="ml-1" />
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* YouTube Embeds - Limited to max 2 */}
                  {message.references.filter(ref => ref.type === "youtube" && ref.embedUrl).length > 0 && (
                    <div className="mt-4 space-y-4">
                      {message.references
                        .filter(ref => ref.type === "youtube" && ref.embedUrl)
                        .slice(0, 2) // Limit to max 2 videos
                        .map(video => (
                          <div key={`embed-${video.id}`} className="rounded-lg overflow-hidden border border-orange-100">
                            <iframe
                              width="100%"
                              height="200"
                              src={video.embedUrl}
                              title={video.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {/* Loading indicator - Simple version */}
          {isLoading && (
            <div className="flex justify-start mb-6">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <img src={agent.avatar} alt={agent.name} className="rounded-full w-8 h-8 object-cover" />
              </div>
              <div className="bg-white border border-orange-100 rounded-lg p-4">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-orange-100 bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask about ${agent?.language || 'coding'}...`}
              className="flex-1 p-3 rounded-l-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={`p-3 rounded-r-lg ${
                !inputValue.trim() || isLoading
                  ? "bg-gray-200 text-gray-500"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatPage