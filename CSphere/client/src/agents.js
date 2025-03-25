// Agent data and related functions
export const agentData = [
  {
    id: 1,
    name: "Claude",
    description: "Advanced conversational AI assistant",
    image: "/placeholder.svg?height=200&width=200",
    specialties: ["Writing", "Analysis", "Coding"],
    chatHistory: [
      { id: 1, date: "2023-10-15", title: "JavaScript Help" },
      { id: 2, date: "2023-10-20", title: "React Component Design" },
    ],
  },
  {
    id: 2,
    name: "GPT",
    description: "Powerful language model",
    image: "/placeholder.svg?height=200&width=200",
    specialties: ["Text Generation", "Translation"],
    chatHistory: [
      { id: 1, date: "2023-10-18", title: "Content Creation" },
      { id: 2, date: "2023-10-22", title: "Code Review" },
    ],
  },
  {
    id: 3,
    name: "Gemini",
    description: "Multimodal AI assistant",
    image: "/placeholder.svg?height=200&width=200",
    specialties: ["Image Analysis", "Research", "Problem Solving"],
    chatHistory: [
      { id: 1, date: "2023-10-17", title: "Data Visualization" },
      { id: 2, date: "2023-10-21", title: "Research Summary" },
    ],
  },
  {
    id: 4,
    name: "Llama",
    description: "Open-source language model",
    image: "/placeholder.svg?height=200&width=200",
    specialties: ["Document Analysis", "Summarization"],
    chatHistory: [
      { id: 1, date: "2023-10-19", title: "Document Review" },
      { id: 2, date: "2023-10-23", title: "Text Summarization" },
    ],
  },
]

// Function to filter agents based on search term
export const filterAgents = (term) => {
  return agentData.filter(
    (agent) =>
      agent.name.toLowerCase().includes(term.toLowerCase()) ||
      agent.description.toLowerCase().includes(term.toLowerCase()),
  )
}

// Function to get agent by ID
export const getAgentById = (id) => {
  return agentData.find((agent) => agent.id === Number.parseInt(id))
}

// References data for chat page
export const referenceData = {
  blogs: [
    { id: 1, title: "Understanding AI Assistants", url: "https://example.com/blog1" },
    { id: 2, title: "Best Practices for AI Prompting", url: "https://example.com/blog2" },
    { id: 3, title: "The Future of Conversational AI", url: "https://example.com/blog3" },
  ],
  videos: [
    { id: 1, title: "AI Assistant Tutorial", url: "https://youtube.com/watch?v=example1" },
    { id: 2, title: "Advanced Prompting Techniques", url: "https://youtube.com/watch?v=example2" },
    { id: 3, title: "Building AI-powered Applications", url: "https://youtube.com/watch?v=example3" },
  ],
}

