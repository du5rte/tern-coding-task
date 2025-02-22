'use client'

import { useForm, Controller } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from './Button'
import { cleanYouTubeUrl, extractYoutubeIdFromUrl, isYoutubeUrl } from '@/utils/url'
import { useIsTheaterMode } from '@/context/TheaterContext'
import { useEffect, useState } from 'react'
import { useVideoStore, VideoEntry } from '@/store/videoStore'
import { formatSeconds, formatDate } from '@/utils/format';

const EntryMessage = ({ entry }: { entry: VideoEntry }) => {
  const foundMessage = `Last played at ${formatSeconds(entry.timestamp)}, ${formatDate(entry.lastUpdated)}`
  return (
    <p className="text-sm text-gray-500">{foundMessage}</p>
  )
}

const formSchema = z.object({
  url: z
    .string()
    .url('Please enter a URL')
    .refine((value) => isYoutubeUrl(value), 'Please enter a valid YouTube URL'),
})

type FormValues = z.infer<typeof formSchema>

export interface YouTubeFormProps {
  onSubmit: (url: string) => void
  defaultValue?: string
  variant?: 'primary' | 'secondary'
}

export function YouTubeForm(props: YouTubeFormProps) {
  const { onSubmit, defaultValue = '', variant = 'primary' } = props
  const isTheaterMode = useIsTheaterMode()
  const { getVideo } = useVideoStore()


  const [entry,setEntry] = useState<VideoEntry| null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: defaultValue
    }
  })

  useEffect(() => {
    const subscription = form.watch(({ url }) => {
      // Reset entry if no URL or invalid YouTube URL
      if (!url || !isYoutubeUrl(url)) {
        setEntry(null)
        return
      }

      const videoId = extractYoutubeIdFromUrl(url)

      if (!videoId) {
        setEntry(null)
        return
      }

      const video = getVideo(videoId)
      // Only show entries that have been watched (timestamp > 0)
      setEntry(video && video.timestamp > 0 ? video : null)
    })

    return () => subscription.unsubscribe()
  }, [form, getVideo])

  const onSubmitForm = form.handleSubmit((data) => {
    // Extract and validate YouTube ID
    const videoId = extractYoutubeIdFromUrl(data.url)
    if (!videoId) return
    onSubmit(videoId)
  })

  const { errors, defaultValues } = form.formState

  const inputClasses = errors.url ?
    'bg-red-100 border-red-200 focus:ring-2 focus:ring-red-500 placeholder:text-red-700' : isTheaterMode
    ? 'bg-black border-neutral-800 text-neutral-400 focus:text-neutral-200 placeholder:text-neutral-700'
    : 'bg-white border-neutral-200 text-neutral-600 focus:text-neutral-800 placeholder:text-neutral-400'
    

  return (
    <form onSubmit={onSubmitForm} className="w-full max-w-xl">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <Controller
            name="url"
            control={form.control}
            defaultValue={defaultValues?.url || ''}
            render={({ field: { onChange, ...field } }) => (
              <input
                {...field}
                type="text"
                placeholder="https://youtube.com/watch?v=xXyzXxyz"
                className={`flex-1 px-4 py-2 rounded border outline-none transition-colors duration-700 ${inputClasses}`}

                onChange={(e) => onChange(cleanYouTubeUrl(e.target.value))}
              />
            )}
          />
          <Button type="submit" variant={variant} className="sm:w-auto w-full">
            {entry ? 'Resume' : 'Watch'}
          </Button>
        </div>
        {errors.url ? (
          <p className="text-sm text-red-700">{errors.url.message}</p>
        ) : entry ? (
          <EntryMessage entry={entry} />
        ) : <p className="text-sm text-gray-500">&nbsp;</p>}
      </div>
    </form>
  )
}