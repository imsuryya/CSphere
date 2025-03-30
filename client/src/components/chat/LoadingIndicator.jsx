const LoadingIndicator = ({ agent }) => {
  return (
    <div className="flex justify-start mb-6">
      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
        <img src={agent.avatar} alt={agent.name} className="rounded-full w-8 h-8 object-cover" />
      </div>
      <div className="bg-white border border-orange-100 rounded-lg p-4">
        Thinking...
      </div>
    </div>
  )
}

export default LoadingIndicator