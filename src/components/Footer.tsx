import { Link } from './Link'
import { useIsTheaterMode } from '@/context/TheaterContext'

export interface FooterProps {
  className?: string
}

export function Footer(props: FooterProps) {
  const { className = '' } = props
  const isTheaterMode = useIsTheaterMode()
  
  return (
    <footer className={`p-8 text-center transition-colors duration-700 ${isTheaterMode ? 'text-white' : ''} ${className}`}>
      <Link href="/giphy">
        Just Show Me a GIF Already!
      </Link>
    </footer>
  )
}
