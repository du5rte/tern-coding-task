import { Link } from './Link'
import { useTheater } from '@/context/TheaterContext'

export interface FooterProps {
  className?: string
}

export function Footer(props: FooterProps) {
  const { className = '' } = props
  const { isTheaterMode } = useTheater()
  
  return (
    <footer className={`p-8 text-center transition-colors duration-700 ${isTheaterMode ? 'text-white' : ''} ${className}`}>
      <Link href="/giphy">
        Just Show Me a GIF Already!
      </Link>
    </footer>
  )
}
