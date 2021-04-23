import React, { useEffect, useState } from 'react'
import Editor from 'react-markdown-editor-lite'
import classnames from 'classnames'
import { formartMd } from '@root/src/shared/utils'
import 'react-markdown-editor-lite/lib/index.css'
import './style.less'

type Props = {
  value?: string
  onChange?: (val: string) => void
  className?: string
}
interface MdEditor {
  (props: Props): JSX.Element | null
}

const MdEditor: MdEditor = ({ value, onChange, className }) => {
  const [val, setValue] = useState(value)
  const handleEditorChange = (it: { html: string; text: string }) => {
    setValue(it.text)
    onChange && onChange(it.text)
  }
  useEffect(() => {
    setValue(value)
  }, [value])
  return (
    <div className={classnames('md-editor', className)}>
      <Editor value={val} renderHTML={formartMd} onChange={handleEditorChange} />
    </div>
  )
}

export default MdEditor
