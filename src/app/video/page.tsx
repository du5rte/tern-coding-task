"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/Footer";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { useTheater } from "@/context/TheaterContext";
import { useRouter } from "next/navigation";

function VideoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");

  const handleVideoIdChange = (videoId: string) => {
    router.push(`/video?id=${videoId}`);
  };

  if (!videoId) {
    return (
      <p className="text-gray-500">No video URL provided 🤔</p>
    );
  }

  return (
    <div className="max-w-5xl w-full mx-auto">
      <Suspense
        fallback={
          <div className="absolute w-full h-full bg-black rounded-lg flex items-center justify-center">
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
  );
}

export default function VideoPage() {
  const { isTheaterMode } = useTheater();

  return (
    <div
      className={`h-[100dvh] flex flex-col transition-colors duration-700 ${
        isTheaterMode ? "bg-black" : "bg-white"
      }`}
    >
      <main className="flex-1 flex items-center justify-center p-8">
        <Suspense
          fallback={
            <div className="absolute w-full h-full bg-black rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Missing YouTube URL 🤔</p>
          </div>
          }
        >
          <VideoContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
