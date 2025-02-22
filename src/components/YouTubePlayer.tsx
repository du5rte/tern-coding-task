"use client";

import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import YouTube, {
  YouTubePlayer as YTPlayer,
  YouTubeEvent,
} from "react-youtube";
import { useInterval } from "usehooks-ts";

import { useTheater } from "@/context/TheaterContext";
import { useVideoStore } from "@/store/videoStore";

import { Button } from "./Button";
import { YouTubeForm } from "./YouTubeForm";

const { PlayerState } = YouTube;

const INTERVAL = 1000;

export interface YouTubePlayerProps {
  videoId: string;
  onVideoIdChange: (videoId: string) => void;
  className?: string;
}

export function YouTubePlayer(props: YouTubePlayerProps) {
  const { videoId, onVideoIdChange, className = "" } = props;

  const playerRef = useRef<YTPlayer | undefined>(undefined);

  const { enableTheaterMode, disableTheaterMode, isTheaterMode } = useTheater();
  const { addVideo, getVideoTimestamp, updateTimeStamp, clearVideo } =
    useVideoStore();

  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const startingTimestamp = useMemo(
    () => getVideoTimestamp(videoId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [videoId]
  );

  useEffect(() => {
    if (isPlaying) {
      enableTheaterMode();
    } else {
      disableTheaterMode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    if (isEditing) {
      playerRef.current?.internalPlayer.pauseVideo();
    } else {
      playerRef.current?.internalPlayer.playVideo();
    }
  }, [isEditing]);

  const handleReady = useCallback(() => {
    console.log("ready");

    if (startingTimestamp !== null) {
      console.log(`restore video ${videoId}: ${startingTimestamp}`);
    }
    // Else register the video
    else {
      console.log("add video");
      addVideo(videoId);
    }
  }, [startingTimestamp, videoId, addVideo]);

  const updateVideoTimestamp = useCallback(async () => {
    const currentTime =
      await playerRef.current?.internalPlayer.getCurrentTime();
    if (!currentTime) return;

    const seconds = Math.floor(currentTime);
    console.log("currentTime", seconds);

    updateTimeStamp(videoId, seconds);
  }, [videoId, updateTimeStamp]);

  // Using an interval as a workaround to using onSeek to update the timestamp
  useInterval(
    updateVideoTimestamp,
    // Would be more efficient to stop the interval when not playing (isPlaying ? INTERVAL : null)
    // But the user can still seek while the video is paused, so we keep the interval running
    INTERVAL
  );

  const handleStateChange = useCallback(
    (event: YouTubeEvent) => {
      // There's a high change someone can play and pause video to test without elapsing 1s
      updateVideoTimestamp();

      if (event.data === PlayerState.PLAYING) {
        console.log("playing");
        setPlaying(true);
      }

      if (event.data === PlayerState.PAUSED) {
        console.log("paused");
        setPlaying(false);
      }

      if (event.data === PlayerState.ENDED) {
        console.log("ended");
        setPlaying(false);

        // Clear video when it reaches the end
        clearVideo(videoId);
      }
    },
    [updateVideoTimestamp, clearVideo, videoId]
  );

  const handleError = useCallback((event: YouTubeEvent) => {
    console.log("error");
    if (event.data === 2) {
      setError(new Error("Invalid YouTube URL"));
    }
  }, []);

  const handleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const handleVideoIdChange = useCallback(
    (newVideoId: string) => {
      setError(null);
      onVideoIdChange(newVideoId);
      setIsEditing(false);
    },
    [onVideoIdChange]
  );

  const bgColor = isTheaterMode ? "bg-neutral-900" : "bg-neutral-100";

  return (
    <div className={`relative ${bgColor} aspect-video rounded-lg ${className}`}>
      {error && (
        <div
          className={`absolute w-full h-full bg-black rounded-lg flex items-center justify-center ${className}`}
        >
          <p className="text-gray-500">Invalid YouTube URL 🤔</p>
        </div>
      )}

      {/* Form */}
      {isEditing && (
        <div className="absolute w-full h-full flex items-center justify-center p-8 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-black">
          <YouTubeForm variant="secondary" onSubmit={handleVideoIdChange} />
        </div>
      )}

      {/* Player */}
      <div className="rounded-lg w-full h-full overflow-hidden">
        <YouTube
          ref={playerRef}
          videoId={videoId}
          opts={{
            height: "100%",
            width: "100%",
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
              mute: 1, // As of Chrome 66, videos must be muted in order to play automatically
              start: startingTimestamp || 0,
            },
          }}
          className="w-full h-full"
          iframeClassName="w-full h-full"
          onStateChange={handleStateChange}
          onReady={handleReady}
          onError={handleError}
        />
      </div>

      {/* Controls */}
      <div className="absolute -bottom-14 left-0 right-0 flex justify-center">
        <Button variant="secondary" onClick={handleEdit}>
          {isEditing ? "Close" : "Change Video"}
        </Button>
      </div>
    </div>
  );
}
