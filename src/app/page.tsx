'use client'

import { useRouter } from "next/navigation"
import { YouTubeForm } from "@/components/YouTubeForm"
import { YouTubeHero } from "@/components/YouTubeHero"
import { Footer } from "@/components/Footer"

export default function Home() {
  const router = useRouter()

  const handleSubmit = (url: string) => {
    // Encode the URL to make it safe for the query parameter
    const encodedUrl = encodeURIComponent(url)
    router.push(`/video?url=${encodedUrl}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center p-8">
        <div className="max-w-5xl w-full mx-auto">
          <YouTubeHero />
          <YouTubeForm onSubmit={handleSubmit} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
