'use client'

import { useSearchParams } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { YouTubePlayer } from '@/components/YouTubePlayer'
import { TheaterProvider, useTheater } from '@/context/TheaterContext'

function VideoPageContent() {
  const searchParams = useSearchParams()
  const videoUrl = searchParams.get('url')
  const { isTheaterMode } = useTheater()

  if (!videoUrl) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">No video URL provided 🤔</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${isTheaterMode ? 'bg-black' : 'bg-white'}`}>
      <main className={`flex-1 flex items-center p-8 transition-colors duration-700 ${isTheaterMode ? 'bg-black' : ''}`}>
        <div className="max-w-5xl w-full mx-auto">
          <YouTubePlayer videoUrl={videoUrl} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function VideoPage() {
  return (
    <TheaterProvider>
      <VideoPageContent />
    </TheaterProvider>
  )
}
