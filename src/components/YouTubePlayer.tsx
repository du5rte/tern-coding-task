'use client'

import { useEffect, useRef, useState } from 'react'
import YouTube, { YouTubeProps, YouTubePlayer as YTPlayer } from 'react-youtube'

import { useTheater } from '@/context/TheaterContext'
import { useVideoStore } from '@/store/videoStore'
import { useInterval } from 'usehooks-ts'

const opts: YouTubeProps['opts'] = {
  height: '100%',
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    mute: 1, // As of Chrome 66, videos must be muted in order to play automatically
  },
}

const INTERVAL = 1000

export interface YouTubePlayerProps {
  videoId: string
  className?: string
}

export function YouTubePlayer(props: YouTubePlayerProps) {
  const { videoId, className = '' } = props
  
  const playerRef = useRef<YTPlayer | undefined>(undefined)

  const { enableTheaterMode, disableTheaterMode } = useTheater()
  const { addVideo, getVideoTimestamp, updateTimeStamp, clearVideoTimestamp } = useVideoStore()

  const [, setLoading] = useState<boolean>(true)
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [error,setError] = useState<Error>();

  useEffect(() => {
    console.log(playerRef.current) // TODO: delete
    const onStart = async () => {
      const timestamp = getVideoTimestamp(videoId)
  
      // Play last played timestamp if available
      if (timestamp !== null) {
        console.log(`restore video ${videoId}: ${timestamp}`)
        
        await playerRef.current?.internalPlayer.seekTo(timestamp, true) // seekTo(seconds, allowSeekAhead)
        await playerRef.current?.internalPlayer.playVideo()
      } 
      // Else register the video
      else {
        console.log('add video')
        addVideo(videoId)
      }
  }

    onStart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useInterval(
    async () => {
      const currentTime = await playerRef.current.internalPlayer.getCurrentTime()
      const seconds = Math.floor(currentTime)
      console.log('currentTime', seconds)
      updateTimeStamp(videoId, seconds)
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? INTERVAL : null,
  )

  // if (loading) {
  //   return (
  //     <div className={`aspect-video bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
  //     <p className="text-gray-500">Loading...</p>
  //   </div>
  //   )
  // }

  if (error) {
    return (
      <div className={`aspect-video bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Invalid YouTube URL 🤔</p>
      </div>
    )
  }

  const handleStateChange: YouTubeProps['onStateChange'] = (event) => {
    // YouTube.PlayerState.PLAYING = 1
    if (event.data === 1) {
      console.log('playing')
      setPlaying(true)
      enableTheaterMode()
    }

    // YouTube.PlayerState.PAUSED = 2
    if (event.data === 2) {
      console.log('paused')
      setPlaying(false)
      disableTheaterMode()
    }

    // YouTube.PlayerState.ENDED = 0
    if (event.data === 0) {
      console.log('ended')
      setPlaying(false)
      disableTheaterMode()

      // Clear timestamp when video ends
      clearVideoTimestamp(videoId)
    }
  }

  const handleReady: YouTubeProps['onReady'] = async () => {
    console.log('ready')
    setLoading(false)
  }

  const handlError: YouTubeProps['onError'] = (event) => {
    console.log('error')
    if (event.data === 2) {
      setError(new Error('Invalid YouTube URL'));
    }
  }

  return (
    <div className={`aspect-video bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      <YouTube
        ref={playerRef}
        videoId={videoId}
        opts={opts}
        className="w-full h-full"
        iframeClassName="w-full h-full"
        onStateChange={handleStateChange}
        onReady={handleReady}
        onError={handlError}
      />
    </div>
  )
}
