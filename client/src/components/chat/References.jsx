import { ExternalLink, Youtube } from "lucide-react"
import YouTubeEmbed from "./YouTubeEmbed"

const References = ({ references }) => {
  return (
    <div className="ml-10 sm:ml-14 mt-4 space-y-4">
      <p className="text-sm font-medium text-gray-600 mb-2">Related Resources</p>
      <div className="grid gap-2">
        {references.map((reference) => (
          <a
            key={reference.id}
            href={reference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start p-3 bg-white border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden">
              {reference.type === "youtube" ? (
                reference.thumbnailUrl ? (
                  <img
                    src={reference.thumbnailUrl || "/placeholder.svg"}
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
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{reference.title}</h3>
              <p className="text-xs text-gray-500 flex items-center">
                {reference.type === "youtube" ? "YouTube" : reference.source}
                <ExternalLink size={12} className="ml-1 flex-shrink-0" />
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* YouTube Embeds - Limited to max 2 */}
      {references.filter((ref) => ref.type === "youtube" && ref.embedUrl).length > 0 && (
        <div className="mt-4 space-y-4">
          {references
            .filter((ref) => ref.type === "youtube" && ref.embedUrl)
            .slice(0, 2) // Limit to max 2 videos
            .map((video) => (
              <YouTubeEmbed key={`embed-${video.id}`} video={video} />
            ))}
        </div>
      )}
    </div>
  )
}

export default References

