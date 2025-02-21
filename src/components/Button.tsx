'use client'

import { ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  const { className = '', ...rest } = props

  return (
    <button 
      className={`rounded-md px-6 py-3 font-medium bg-red-600 text-white hover:bg-red-500 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-colors ${className}`}
      {...rest}
    />
  )
}
