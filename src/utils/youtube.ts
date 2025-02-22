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

export function isYoutubeUrl(url: string): boolean {
  return youtubeFormats.some((re) => re.test(url));
}


export function makeUrlfromYouTubeId(videoId: string): string {
  return `https://youtube.com/watch?v=${videoId}`;
}

export function cleanYouTubeUrl(url: string): string {
  const id = extractYoutubeIdFromUrl(url);
  if (id) {
    return makeUrlfromYouTubeId(id);
  }
  return url;
}
