// Agent data and related functions
export const agents = [
  {
    id: 1,
    name: "JavaScript Expert",
    shortDescription: "Frontend & Node.js specialist",
    description: "Specializes in JavaScript, React, Node.js, and modern web development",
    avatar: "/agent-profile/JavaScript.png",
    chatHistoryTitle: "React component optimization",
    language: "JavaScript"
  },
  {
    id: 2,
    name: "Python Developer",
    shortDescription: "Data science & backend",
    description: "Expert in Python for data science, machine learning, and backend development",
    avatar: "/agent-profile/python.jpg",
    chatHistoryTitle: "Data analysis script",
    language: "Python"
  },
  {
    id: 3,
    name: "C Engineer",
    shortDescription: "Performance-critical systems",
    description: "Expert in C for systems programming and performance-critical applications",
    avatar: "/agent-profile/C.jpg",
    chatHistoryTitle: "Memory optimization",
    language: "C"
  },
  {
    id: 4,
    name: "C++ Engineer",
    shortDescription: "Performance-critical systems",
    description: "Expert in C++ for systems programming and performance-critical applications",
    avatar: "/agent-profile/CPP.jpg",
    chatHistoryTitle: "Memory optimization",
    language: "C++"
  },
  {
    id: 5,
    name: "Go Developer",
    shortDescription: "Microservices & concurrency",
    description: "Specializes in Go for microservices, APIs, and concurrent programming",
    avatar: "/agent-profile/GO.jpg",
    chatHistoryTitle: "Concurrency pattern",
    language: "Go"
  },
  {
    id: 6,
    name: "Ruby on Rails Expert",
    shortDescription: "Rapid web development",
    description: "Expert in Ruby and Rails for rapid web application development",
    avatar: "/agent-profile/Ruby.png",
    chatHistoryTitle: "Rails ActiveRecord query",
    language: "Ruby"
  },
]

// Function to filter agents based on search term
export const filterAgents = (term) => {
  return agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(term.toLowerCase()) ||
      agent.description.toLowerCase().includes(term.toLowerCase()) ||
      agent.language.toLowerCase().includes(term.toLowerCase()),
  )
}

// Function to get agent by ID
export const getAgentById = (id) => {
  return agents.find((agent) => agent.id === Number.parseInt(id))
}

// Programming language specialization prompts
export const languagePrompts = {
  "JavaScript": `You are a JavaScript expert assistant. You specialize in modern JavaScript, TypeScript, React, Node.js, and the entire JavaScript ecosystem. Provide clear, idiomatic code examples that follow best practices. When answering questions, consider both frontend and backend contexts, and explain concepts in a way that helps the user improve their understanding of JavaScript patterns and techniques.`,
  
  "Python": `You are a Python expert assistant. You specialize in Python for data science, machine learning, web development with frameworks like Django and Flask, and general-purpose programming. Provide Pythonic code examples that follow PEP 8 style guidelines. When answering questions, emphasize readability, simplicity, and the Python philosophy of "there should be one obvious way to do it."`,
  
  "Java": `You are a Java expert assistant. You specialize in Java for enterprise applications, Spring framework, microservices, and object-oriented design. Provide clean, maintainable code examples that follow Java conventions. When answering questions, emphasize best practices for Java development, design patterns, and enterprise architecture considerations.`,
  
  "C++": `You are a C/C++ expert assistant. You specialize in systems programming, performance optimization, memory management, and modern C++ features. Provide efficient, safe code examples that follow modern C++ idioms. When answering questions, consider performance implications and memory safety, and explain low-level concepts clearly.`,
  
  "Go": `You are a Go expert assistant. You specialize in Go for microservices, concurrent programming, APIs, and systems software. Provide idiomatic Go code examples that follow the principle of "clear is better than clever." When answering questions, emphasize Go's simplicity, efficiency, and built-in concurrency features.`,
  
  "Ruby": `You are a Ruby expert assistant. You specialize in Ruby and Ruby on Rails for web development, metaprogramming, and elegant code design. Provide expressive, maintainable code examples that showcase Ruby's flexibility. When answering questions, emphasize Ruby's philosophy of developer happiness and convention over configuration.`
};

// Default references (will be replaced by real Tavily data)
export const referenceData = {
  blogs: [],
  videos: []
};

