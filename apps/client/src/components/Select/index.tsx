import cls from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Dropdown from '@/components/Dropdown';

type SelectValue = string | number;

interface SelectOption {
  label: string;
  value: SelectValue;
}
interface SelectProps<T extends SelectOption> {
  options: T[];
  value?: SelectValue;
  onChange: (value: T['value']) => void;
  required?: boolean;
  showRequiredLabel?: boolean;
  className?: string;
}
function Select<T extends SelectOption>({
  options,
  value,
  onChange,
  required = false,
  showRequiredLabel = true,
  className,
}: SelectProps<T>) {
  const [width, setWidth] = useState<number | string>('100%');
  const ref = useRef({
    id: 'select-' + Date.now(),
  });
  const valueNode = options.find((option) => option.value === value)?.label;
  useEffect(() => {
    const w = document.querySelector('.' + ref.current.id)?.clientWidth;
    if (w) {
      setWidth(w);
    }
  }, []);
  return (
    <Dropdown
      triggerType="click"
      showArrow={false}
      wrapperStyle={{
        width,
      }}
      className="!max-w-full"
      appendBody
      menu={options.map((option) => ({
        key: option.label,
        label: option.label,
        active: option.value === value,
        onClick: () => onChange(option.value),
      }))}
    >
      <div className={cls('relative', ref.current.id, className)}>
        {required && showRequiredLabel && (
          <div className="absolute right-[calc(100%+5px)] top-1/2 translate-y-[-50%] text-gray6">*</div>
        )}
        <div
          className={cls(
            'background-input h-10 w-full rounded-[20px] px-5 text-base leading-10 [border:1px_solid_#c0ccda] [box-shadow:0_1px_1px_theme(colors.white/0.8)]',
            {
              'text-gray6': !valueNode,
            },
          )}
        >
          {valueNode || '请选择'}
        </div>
      </div>
    </Dropdown>
  );
}

export default Select;
