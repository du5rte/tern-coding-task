'use client'

import { useRouter } from "next/navigation"
import Image from 'next/image'

import { YouTubeForm } from "@/components/YouTubeForm"
import { YouTubeHero } from "@/components/YouTubeHero"
import { Footer } from "@/components/Footer"

export default function Home() {
  const router = useRouter()

  const handleSubmit = (videoId: string) => {
    router.push(`/video?id=${videoId}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center p-8">
        <div className="max-w-5xl w-full mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <YouTubeHero />
              
              <YouTubeForm onSubmit={handleSubmit} />
            </div>
            <div className="hidden lg:block">
              <Image 
                src="/youtube.svg" 
                width={0} 
                height={0} 
                alt="YouTube" 
                style={{ width: '100%', height: 'auto' }} 
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
