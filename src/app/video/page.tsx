'use client'

import { useSearchParams } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { YouTubePlayer } from '@/components/YouTubePlayer'

export default function VideoPage() {
  const searchParams = useSearchParams()
  const videoUrl = searchParams.get('url')

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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center p-8">
        <div className="max-w-5xl w-full mx-auto">
          <YouTubePlayer videoUrl={videoUrl} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
