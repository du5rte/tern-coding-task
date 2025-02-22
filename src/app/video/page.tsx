"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/Footer";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { useTheater } from "@/context/TheaterContext";
import { useRouter } from "next/navigation";

export default function VideoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");

  const { isTheaterMode } = useTheater();

  const handleVideoIdChange = (videoId: string) => {
    router.push(`/video?id=${videoId}`);
  };

  if (!videoId) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">No video URL provided 🤔</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-700 ${
        isTheaterMode ? "bg-black" : "bg-white"
      }`}
    >
      <main className={`flex-1 flex items-center p-8`}>
        <div className="max-w-5xl w-full mx-auto">
          <Suspense
            fallback={
              <div
                className={'absolute w-full h-full bg-black rounded-lg flex items-center justify-center'}
              >
                <p className="text-gray-500">Invalid YouTube URL 🤔</p>
              </div>
            }
          >
            <YouTubePlayer
              videoId={videoId}
              onVideoIdChange={handleVideoIdChange}
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
