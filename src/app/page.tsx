'use client'


import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(videoUrl)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center p-8">
        <div className="max-w-5xl w-full mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold sm:text-6xl">
                <span className="block text-gray-300">Introducing</span>
                <span className="block text-red-600">YouTube</span>
                <span className="block">Time Capsule</span>
              </h1>
              <p className="mt-3 text-gray-400 sm:text-xl">Drop your YouTube URL below and watch the magic happen</p>
              
              <form className="mt-10" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    className="flex-1 rounded-md bg-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:bg-red-50 focus:text-red-600 focus:placeholder-red-400 focus:outline-none transition-colors"
                    value={videoUrl}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-500 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                  >
                    Watch
                  </button>
                </div>
              </form>
            </div>
            <div className="hidden lg:block">
              <Image src="/youtube.svg" width={0} height={0} alt="YouTube" style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </main>

      <footer className="p-8 text-center">
        <a className="text-gray-600 underline underline-offset-8 hover:underline-offset-4 cursor-pointer transition-all">
          Just Show Me a GIF Already!
        </a>
      </footer>
    </div>
  );
}
