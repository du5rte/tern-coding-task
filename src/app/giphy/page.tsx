"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GiphyPage() {
  const router = useRouter();
  return (
    <div className="container mx-auto p-4">
      <Link
        href="/"
        onClick={(e) => {
          e.preventDefault()
          router.back()
        }}
        className="inline-flex items-center mb-4 text-gray-400 hover:text-gray-300 transition-colors"
      >
        Back
      </Link>

      {/* Chat conversation style */}
      <div className="max-w-2xl mx-auto space-y-6">
        {/* First response */}
        <div className="flex justify-start">
          <div className="bg-gray-200 rounded-lg p-4 max-w-md">
            <p className="text-gray-900">
              After debugging for hours why <strong>autoPlay</strong> won&apos;t work...
            </p>
          </div>
        </div>

        {/* Chrome documentation quote */}
        <div className="flex justify-start">
          <div className="bg-gray-200 rounded-lg p-4 max-w-md">
            <div className="text-gray-900 space-y-3">
              <p className="italic border-l-4 border-gray-400 pl-3">
                As of Chrome 66, videos must be <strong>muted</strong> in order
                to <strong>play automatically</strong>. Please set{" "}
                <code className="bg-gray-300 text-black px-2 py-0.5 rounded font-mono text-sm">
                  muted={"{true}"}
                </code>
              </p>
            </div>
          </div>
        </div>

        {/* GIF Message */}
        <div className="flex justify-end">
          <div className="bg-red-600 rounded-lg p-2">
            <iframe
              src="https://giphy.com/embed/11tTNkNy1SdXGg"
              width="300"
              height="168"
              frameBorder="0"
              className="giphy-embed rounded"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Final reaction */}
        <div className="flex justify-start">
          <div className="bg-gray-200 rounded-lg p-4 max-w-md">
            <p className="text-gray-900">
            2 hours of my life I&apos;ll never get back...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
