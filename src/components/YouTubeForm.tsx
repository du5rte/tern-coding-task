'use client'

import { FormEvent } from 'react'
import { Button } from './Button'

export interface YouTubeFormProps {
  onSubmit: (url: string) => void
}

export function YouTubeForm(props: YouTubeFormProps) {
  const { onSubmit } = props

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const url = formData.get('url') as string
    onSubmit(url)
  }

  return (
    <form className="mt-10" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          name="url"
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          className="flex-1 rounded-md bg-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:bg-red-50 focus:text-red-600 focus:placeholder-red-400 focus:outline-none transition-colors"
          required
        />
        <Button type="submit">
          Watch
        </Button>
      </div>
    </form>
  )
}
