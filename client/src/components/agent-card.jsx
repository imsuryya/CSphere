"use client"
import { useNavigate } from "react-router-dom"

const AgentCard = ({ agent }) => {
  const navigate = useNavigate()

  const handleStartChat = () => {
    navigate(`/chat/${agent.id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <img
        src={agent.image || "/placeholder.svg"}
        alt={agent.name}
        className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
      />
      <h3 className="text-lg font-semibold text-center">{agent.name}</h3>
      <p className="text-sm text-gray-600 text-center mb-3">{agent.description}</p>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {agent.specialties.map((specialty) => (
          <span key={specialty} className="px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-xs">
            {specialty}
          </span>
        ))}
      </div>
      <button
        onClick={handleStartChat}
        className="w-full py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-orange-600 transition-colors"
      >
        Start Chat
      </button>
    </div>
  )
}

export default AgentCard

