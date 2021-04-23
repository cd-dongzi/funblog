import React from 'react'

type Props = {
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  className?: string
  onClick?: () => void
  children: any
}
interface ALink {
  (props: Props): JSX.Element | null
}

const ALink: ALink = ({ href, target, className, onClick, children }) => {
  return (
    <a className={className} href={href || '#!'} target={target} onClick={onClick}>
      {children}
    </a>
  )
}

export default ALink
