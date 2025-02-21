'use client'

import YouTube, { YouTubeProps } from 'react-youtube'

// Extract video ID from URL
const getVideoId = (url: string) => {
  const urlParams = new URL(url).searchParams
  return urlParams.get('v')
}

const opts: YouTubeProps['opts'] = {
  height: '100%',
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    modestbranding: 1,
    rel: 0,
  },
}

export interface YouTubePlayerProps {
  videoUrl: string
  className?: string
}

export function YouTubePlayer(props: YouTubePlayerProps) {
  const { videoUrl, className = '' } = props

  const videoId = getVideoId(videoUrl)

  if (!videoId) {
    return (
      <div className={`aspect-video bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Invalid YouTube URL 🤔</p>
      </div>
    )
  }

  return (
    <div className={`aspect-video bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      <YouTube
        videoId={videoId}
        opts={opts}
        className="w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  )
}
