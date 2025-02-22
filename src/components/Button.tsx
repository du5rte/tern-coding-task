'use client'

import { ButtonHTMLAttributes } from 'react'
import { useTheater } from '@/context/TheaterContext'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export function Button(props: ButtonProps) {
  const { className = '', variant = 'primary', ...rest } = props

  const { isTheaterMode } = useTheater()

  const variantClasses = {
    primary: 'bg-red-600 text-white hover:bg-red-500',
    secondary: isTheaterMode 
      ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200' 
      : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-600 hover:text-neutral-800',
    ghost: 'text-neutral-600 hover:text-neutral-800'
  }

  return (
    <button 
      className={`rounded-md px-6 py-3 font-medium focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-colors ${variantClasses[variant]} duration-700 ${className}`}
      {...rest}
    />
  )
}
