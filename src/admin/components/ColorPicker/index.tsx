import React from 'react'
import { SketchPicker } from 'react-color'

type Props = {
  value?: string
  onChange?: (value: string) => void
}
interface ColorPicker {
  (props: Props): JSX.Element | null
}

const ColorPicker: ColorPicker = ({ value, onChange }) => {
  const handleColorChange = ({ hex }: any) => {
    onChange && onChange(hex)
  }
  return <SketchPicker color={value} onChangeComplete={handleColorChange} />
}

export default ColorPicker
