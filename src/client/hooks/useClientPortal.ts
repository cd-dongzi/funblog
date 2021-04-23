import { useEffect, useRef, useState } from 'react'

export const useClientPortal = (selector: string) => {
  const [container, setContainer] = useState<any>()
  useEffect(() => {
    const node = document.querySelector(selector)
    setContainer(node)
  }, [selector])
  return [container]
}
