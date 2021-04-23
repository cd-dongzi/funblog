import React from 'react'
import classnames from 'classnames'
import { Icon } from '@/components'
import './style.less'

type Props = {
  value?: string
  onChange: (val: string) => void
  required?: boolean
  disabled?: boolean
  prefixIcon?: string
  placeholder?: string
  className?: string
  type?: string
}
interface InputLabel {
  (props: Props): JSX.Element | null
}

const InputLabel: InputLabel = ({ value, type, required = false, prefixIcon, placeholder, className, onChange, disabled }) => {
  const hasTip = placeholder && prefixIcon
  return (
    <div
      className={classnames('input-label', className, {
        has: !!value,
        disabled
      })}
    >
      <input value={value} type={type} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
      {hasTip && (
        <div className="input-label__tip">
          {prefixIcon && <Icon name={prefixIcon} />}
          {placeholder && <span>{placeholder}</span>}
        </div>
      )}
      {required && <div className="input-label__required">*</div>}
    </div>
  )
}

export default InputLabel
