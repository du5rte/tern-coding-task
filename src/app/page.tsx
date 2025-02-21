'use client'

import { useState } from "react"
import { YouTubeForm } from "@/components/YouTubeForm"
import { YouTubeHero } from "@/components/YouTubeHero"
import { Footer } from "@/components/Footer"

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("")

  const handleSubmit = (url: string) => {
    setVideoUrl(url)
    console.log(url)
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
