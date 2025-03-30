const LoadingIndicator = ({ agent }) => {
  return (
    <div className="flex justify-start mb-6">
      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden shadow-sm">
        <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="rounded-full w-8 h-8 object-cover" />
      </div>
      <div className="bg-white border border-orange-100 rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingIndicator

