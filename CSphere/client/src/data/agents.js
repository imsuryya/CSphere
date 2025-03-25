// Agent data and related functions
export const agents = [
  {
    id: 1,
    name: "Data Analyst",
    shortDescription: "Analyzes complex datasets",
    description: "Analyzes complex datasets and provides actionable insights",
    avatar: "/placeholder.svg?height=80&width=80",
    chatHistoryTitle: "Data analysis for Q1 sales",
  },
  {
    id: 2,
    name: "Content Writer",
    shortDescription: "Creates engaging content",
    description: "Creates engaging content optimized for your audience",
    avatar: "/placeholder.svg?height=80&width=80",
    chatHistoryTitle: "Blog post outline",
  },
  {
    id: 3,
    name: "Code Assistant",
    shortDescription: "Helps with coding tasks",
    description: "Helps write, debug, and optimize code across languages",
    avatar: "/placeholder.svg?height=80&width=80",
    chatHistoryTitle: "React component help",
  },
  {
    id: 4,
    name: "Research Agent",
    shortDescription: "Gathers information",
    description: "Gathers and summarizes information from various sources",
    avatar: "/placeholder.svg?height=80&width=80",
    chatHistoryTitle: "Market research",
  },
  {
    id: 5,
    name: "Design Helper",
    shortDescription: "Assists with UI/UX design",
    description: "Assists with UI/UX design decisions and implementations",
    avatar: "/placeholder.svg?height=80&width=80",
    chatHistoryTitle: "Landing page design",
  },
  {
    id: 6,
    name: "Task Manager",
    shortDescription: "Organizes workflows",
    description: "Organizes workflows and helps prioritize tasks",
    avatar: "/placeholder.svg?height=80&width=80",
    chatHistoryTitle: "Project timeline",
  },
]

// Function to filter agents based on search term
export const filterAgents = (term) => {
  return agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(term.toLowerCase()) ||
      agent.description.toLowerCase().includes(term.toLowerCase()),
  )
}

// Function to get agent by ID
export const getAgentById = (id) => {
  return agents.find((agent) => agent.id === Number.parseInt(id))
}

// References data for chat page
export const referenceData = {
  blogs: [
    { id: 1, title: "Understanding Data Analysis Fundamentals", url: "https://example.com/blog1" },
    { id: 2, title: "Best Practices for Data Visualization", url: "https://example.com/blog2" },
    { id: 3, title: "The Future of AI in Data Analysis", url: "https://example.com/blog3" },
  ],
  videos: [
    { id: 1, title: "Data Analysis Tutorial", url: "https://youtube.com/watch?v=example1" },
    { id: 2, title: "Advanced Data Analysis Techniques", url: "https://youtube.com/watch?v=example2" },
    { id: 3, title: "Building Data-driven Applications", url: "https://youtube.com/watch?v=example3" },
  ],
}

