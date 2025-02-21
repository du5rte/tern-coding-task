'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface TheaterContextType {
  isTheaterMode: boolean
  enableTheaterMode: () => void
  disableTheaterMode: () => void
}

const TheaterContext = createContext<TheaterContextType | undefined>(undefined)

interface TheaterProviderProps {
  children: ReactNode
}

export function TheaterProvider({ children }: TheaterProviderProps) {
  const [isTheaterMode, setIsTheaterMode] = useState(false)

  const enableTheaterMode = () => setIsTheaterMode(true)
  const disableTheaterMode = () => setIsTheaterMode(false)

  return (
    <TheaterContext.Provider
      value={{
        isTheaterMode,
        enableTheaterMode,
        disableTheaterMode,
      }}
    >
      {children}
    </TheaterContext.Provider>
  )
}

export function useTheater() {
  const context = useContext(TheaterContext)
  if (context === undefined) {
    throw new Error('useTheater must be used within a TheaterProvider')
  }
  return context
}
