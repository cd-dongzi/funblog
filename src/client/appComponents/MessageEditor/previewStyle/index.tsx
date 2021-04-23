import React, { useEffect, useState } from 'react'
import { formatEmoji, filterMint } from '@/utils/html'
import { formartMd } from '@root/src/shared/utils'
import './style.less'

type Props = {
  text: string
}

interface PreviewStyle {
  (props: Props): JSX.Element | null
}

const PreviewStyle: PreviewStyle = ({ text }) => {
  const [html, setHtml] = useState('')
  useEffect(() => {
    setHtml(formatEmoji(filterMint(formartMd(text))))
  }, [text])
  return (
    <div
      className="preview-style md-container"
      dangerouslySetInnerHTML={{
        __html: html
      }}
    ></div>
  )
}

export default PreviewStyle
