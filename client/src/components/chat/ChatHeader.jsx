import { ArrowLeft } from "lucide-react"

const ChatHeader = ({ agent, navigate }) => {
  return (
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
  )
}

export default ChatHeader