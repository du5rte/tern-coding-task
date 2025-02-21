import { Link } from './Link'

export interface FooterProps {
  className?: string
}

export function Footer(props: FooterProps) {
  const { className = '' } = props
  
  return (
    <footer className={`p-8 text-center ${className}`}>
      <Link>
        Just Show Me a GIF Already!
      </Link>
    </footer>
  )
}
