// Tavily API service for retrieving real-time resources - Browser compatible version

/**
 * Fetches relevant articles and videos based on the query
 * @param {string} query - The search query
 * @param {boolean} includeVideos - Whether to include videos in the results
 * @returns {Promise<{blogs: array, videos: array}>} - The search results
 */
export const fetchResources = async (query, includeVideos = true) => {
  try {
    const TAVILY_API_KEY = import.meta.env.VITE_TAVILY_API_KEY;
    const TAVILY_API_URL = "https://api.tavily.com/search";
    
    if (!TAVILY_API_KEY) {
      console.error("Tavily API key is missing. Please check your environment variables.");
      return { blogs: [], videos: [] };
    }
    
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
    
    console.log("Sending request to Tavily API with query:", enhancedQuery);
    
    const response = await fetch(TAVILY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TAVILY_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Tavily API error (${response.status}):`, errorText);
      return { blogs: [], videos: [] };
    }

    // Parse JSON response
    const data = await response.json();
    console.log("Tavily API response:", data);
    
    if (!data || !data.results) {
      console.error("Unexpected Tavily API response format:", data);
      return { blogs: [], videos: [] };
    }
    
    // Process and categorize results
    const blogs = [];
    const videos = [];

    data.results.forEach((result, index) => {
      if (!result.url) return; // Skip invalid results
      
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

    // Process YouTube videos to add embed URLs and thumbnails
    const processedVideos = processYouTubeVideos(videos);

    return {
      blogs,
      videos: processedVideos
    };
  } catch (error) {
    console.error("Error fetching resources from Tavily:", error);
    // Return empty arrays on error
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
      embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : null,
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
  
  try {
    // Handle youtu.be format
    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/');
      if (parts.length < 2) return null;
      const id = parts[1].split('?')[0].split('&')[0];
      return id || null;
    }
    
    // Handle youtube.com/watch?v= format
    if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('v');
    }
    
    // Handle youtube.com/v/ format
    if (url.includes('youtube.com/v/')) {
      const parts = url.split('youtube.com/v/');
      if (parts.length < 2) return null;
      return parts[1].split('?')[0].split('&')[0];
    }
    
    // Handle youtube.com/embed/ format
    if (url.includes('youtube.com/embed/')) {
      const parts = url.split('youtube.com/embed/');
      if (parts.length < 2) return null;
      return parts[1].split('?')[0].split('&')[0];
    }
  } catch (error) {
    console.error("Error extracting YouTube ID:", error);
    return null;
  }
  
  return null;
}