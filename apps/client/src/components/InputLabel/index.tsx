import { Icon } from '@funblog/components';
import cls from 'classnames';
import React from 'react';
import styles from './style.module.css';

type Props = {
  value?: string;
  onChange: (val: string) => void;
  required?: boolean;
  disabled?: boolean;
  prefixIcon?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  maxLength?: number;
  showRequiredLabel?: boolean;
};

const InputLabel = ({
  value = '',
  type,
  required = false,
  prefixIcon,
  placeholder,
  className,
  onChange,
  disabled,
  maxLength,
  showRequiredLabel = true,
}: Props) => {
  const hasTip = placeholder || prefixIcon;
  return (
    <div
      className={cls(styles.input, className, {
        [styles.has]: !!value,
        [styles.disabled]: disabled,
      })}
    >
      <input
        value={value}
        type={type}
        className="background-input"
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        maxLength={maxLength}
      />
      {hasTip && (
        <div className={styles.tip}>
          {prefixIcon && <Icon className={styles.icon} name={prefixIcon} />}
          {placeholder && <span>{placeholder}</span>}
        </div>
      )}
      {required && showRequiredLabel && <div className={styles.required}>*</div>}
    </div>
  );
};

export default InputLabel;
