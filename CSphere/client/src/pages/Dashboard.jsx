"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, User } from "lucide-react"
import { agents, filterAgents } from "../data/agents"

const Dashboard = () => {
  const [filteredAgents, setFilteredAgents] = useState(agents)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    setFilteredAgents(filterAgents(searchTerm))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }


  const handleSelectAgent = (agentId) => {
    navigate(`/chat/${agentId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50">
      <header className="border-b border-orange-100 bg-white/80 backdrop-blur-sm flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          CSphere
        </h1>

        <div className="relative max-w-md w-full mx-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search agents..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-orange-100">
            <User size={20} className="text-gray-700" />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">AI Agents</h2>
          <p className="text-gray-600">Select an agent to start a conversation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden transition-all hover:shadow-md"
            >
              <div className="p-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="rounded-full w-20 h-20" />
                </div>

                <h3 className="text-xl font-semibold text-center mb-1">{agent.name}</h3>
                <p className="text-gray-600 text-center text-sm mb-6 h-12">{agent.description}</p>

                <button
                  onClick={() => handleSelectAgent(agent.id)}
                  className="w-full py-2 bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
                >
                  Use Agent
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Dashboard

