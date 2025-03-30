const YouTubeEmbed = ({ video }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-orange-100">
      <iframe
        width="100%"
        height="200"
        src={video.embedUrl}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default YouTubeEmbed