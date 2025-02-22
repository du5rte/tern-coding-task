import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VideoEntry {
  timestamp: number
  lastUpdated: number
}

interface VideosState {
  videos: Map<string, VideoEntry>
  addVideo: (id: string) => void
  updateTimeStamp: (id: string, timestamp: number) => void
  getVideoTimestamp: (id: string) => number | null
  clearVideo: (id: string) => void
  getRecentVideos: () => VideoEntry[]
}

export const useVideoStore = create<VideosState>()(
  persist(
    (set, get) => ({
      videos: new Map(),
      
      addVideo: (id: string) => {
        set((state) => ({
          videos: new Map(state.videos).set(id, {
            timestamp: 0,
            lastUpdated: Date.now()
          })
        }))
      },
      
      updateTimeStamp: (id: string, timestamp: number) => {
        set((state) => {
          const updatedVideos = new Map(state.videos)
          const entry = updatedVideos.get(id)
          
          if (!entry) return state

          updatedVideos.set(id, {
            ...entry,
            timestamp,
            lastUpdated: Date.now()
          })

          return { videos: updatedVideos }
        })
      },
      
      getVideoTimestamp: (id: string) => {
          const entry = get().videos.get(id)
          return entry?.timestamp ?? null
      },
      
      clearVideo: (id: string) => {
        set((state) => {
          const updatedVideos = new Map(state.videos)
          updatedVideos.delete(id)

          return { videos: updatedVideos }
        })
      },
      
      getRecentVideos: () => {
        return Array.from(get().videos.values())
          .sort((a, b) => b.lastUpdated - a.lastUpdated)
      }
    }),
    {
      name: 'video-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          return {
            state: {
              videos: new Map(str ? JSON.parse(str).state.videos : []),
            },
          }
        },
        setItem: (name, newValue) => {
          const str = JSON.stringify({
            state: {
              ...newValue.state,
              videos: Array.from(newValue.state.videos.entries()),
            },
          })
          localStorage.setItem(name, str)
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)