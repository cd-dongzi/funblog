import { useRef } from 'react'
import ReactDom from 'react-dom'
import { canUseDom } from '@/utils/app'

type Props = {
  children: any
  container?: any
}
interface Portal {
  (props: Props): JSX.Element | null
}

const Portal: Portal = ({ children, container }) => {
  const containerRef = useRef<HTMLElement>()
  if (canUseDom()) {
    if (!container) {
      containerRef.current = document.body
    } else {
      containerRef.current = container
    }
  }
  return containerRef.current ? ReactDom.createPortal(children, containerRef.current) : null
}

export default Portal
