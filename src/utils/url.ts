const youtubeFormat = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?.*?v=))([^?&]+)/

/**
 * Extract video ID from various YouTube URL formats
 */
export function extractYoutubeIdFromUrl(url: string) {
  try {
    const videoId = url.match(youtubeFormat)?.[1]
    return videoId || undefined
  } catch {
    return undefined
  }
}

/**
 * Check if URL is a valid YouTube video URL
 */
export function isYoutubeUrl(url: string): boolean {
  if (!url) return false
  try {
    return youtubeFormat.test(url)
  } catch {
    return false
  }
}

/**
 * Convert any YouTube URL format to standard watch URL
 */
export function cleanYouTubeUrl(url: string): string {
  const videoId = extractYoutubeIdFromUrl(url)
  return videoId ? `https://youtube.com/watch?v=${videoId}` : url
}

export function makeUrlfromYouTubeId(videoId: string): string {
  return `https://youtube.com/watch?v=${videoId}`;
}
