'use client'

import { AnchorHTMLAttributes } from 'react'

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export function Link(props: LinkProps) {
  const { className = '', ...rest } = props

  return (
    <a 
      className={`text-gray-600 underline underline-offset-8 hover:underline-offset-4 cursor-pointer transition-all ${className}`}
      {...rest}
    />
  )
}
