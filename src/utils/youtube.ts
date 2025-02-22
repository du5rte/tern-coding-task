const youtubeFormats = [
  /youtu(.)?be/,
  /youtu\.be\/([^/?&]+)/,
  /youtube\.com\/watch\?v=([^&]+)/,
  /youtube\.com\/embed\/([^/?&]+)/,
];

export function extractYoutubeIdFromUrl(url: string) {
  for (const re of youtubeFormats) {
    const match = url.match(re)?.[1];
    if (match) {
      return match;
    }
  }
  return undefined;
}

export function makeUrlfromYouTubeId(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}