import React from 'react'

type Props = {
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  className?: string
  style?: any
  onClick?: () => void
  children: any
}
interface ALink {
  (props: Props): JSX.Element | null
}

const ALink: ALink = ({ href = 'javascript:;', target = '_self', className, style, onClick, children }) => {
  return (
    <a className={className} href={href} target={target} onClick={onClick} style={style}>
      {children}
    </a>
  )
}

export default ALink
