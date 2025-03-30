const YouTubeEmbed = ({ video }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-orange-100 shadow-sm transition-transform hover:shadow-md">
      <div className="relative pb-[56.25%] h-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={video.embedUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default YouTubeEmbed

