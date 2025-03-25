// Tavily API service for retrieving real-time resources
const TAVILY_API_KEY = import.meta.env.VITE_TAVILY_API_KEY;
const TAVILY_API_URL = "https://api.tavily.com";

/**
 * Fetches relevant articles and videos based on the query
 * @param {string} query - The search query
 * @param {boolean} includeVideos - Whether to include videos in the results
 * @returns {Promise<{blogs: array, videos: array}>} - The search results
 */
export const fetchResources = async (query, includeVideos = true) => {
  try {
    // Enhance query with "programming" context to get more relevant results
    const enhancedQuery = `${query} programming resources`;
    
    const requestBody = {
      query: enhancedQuery,
      search_depth: "advanced",
      include_domains: includeVideos ? ["youtube.com"] : [],
      max_results: 6,
      include_answer: false,
      include_images: false
    };
    
    const response = await fetch(`${TAVILY_API_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": TAVILY_API_KEY
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status}`);
    }

    // Get response text and parse
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    
    // Process and categorize results
    const blogs = [];
    const videos = [];

    data.results?.forEach((result, index) => {
      const isVideo = result.url.includes("youtube.com");
      const resource = {
        id: index + 1,
        title: result.title || "Resource",
        url: result.url,
        source: result.domain || (isVideo ? "YouTube" : "Web"),
        type: isVideo ? "youtube" : "article",
        snippet: result.content?.substring(0, 120) + "..." || ""
      };

      if (isVideo) {
        videos.push(resource);
      } else {
        blogs.push(resource);
      }
    });

    return {
      blogs,
      videos
    };
  } catch (error) {
    console.error("Error fetching resources from Tavily:", error);
    // Return empty arrays instead of mock data
    return {
      blogs: [],
      videos: []
    };
  }
};

/**
 * Processes YouTube URLs to extract video IDs and generate embedded versions
 * @param {array} videos - Array of video objects
 * @returns {array} - Processed video objects with embed URLs
 */
export const processYouTubeVideos = (videos) => {
  return videos.map(video => {
    // Extract video ID from YouTube URL
    const videoId = extractYouTubeId(video.url);
    
    return {
      ...video,
      videoId,
      embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : video.url,
      thumbnailUrl: videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null
    };
  });
};

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null if not found
 */
function extractYouTubeId(url) {
  if (!url) return null;
  
  // Handle youtu.be format
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1];
    return id.split('?')[0];
  }
  
  // Handle youtube.com/watch?v= format
  if (url.includes('youtube.com/watch')) {
    try {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      return urlParams.get('v');
    } catch {
      return null;
    }
  }
  
  return null;
} 