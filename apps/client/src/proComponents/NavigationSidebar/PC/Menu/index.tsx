import { Icon } from '@funblog/components';
import cls from 'classnames';
import Tooltip from '@/components/Tooltip';

export interface MenuItem {
  tip: string;
  icon: string;
}
interface Props {
  list: MenuItem[];
  menuIndex: number;
  onChange: (menuIndex: number) => void;
  className?: string;
}
function Menu({ list, menuIndex, onChange, className }: Props) {
  return (
    <div
      className={cls(
        'relative inline-block h-[--s] whitespace-nowrap rounded-[calc(var(--s)/2)] bg-gray8 [--s:40px]',
        className,
      )}
    >
      {list.map((item, index) => (
        <Tooltip appendBody key={item.icon} content={item.tip}>
          <div className="inline-block">
            <div
              className={cls(
                'relative z-[1] flex h-[--s] w-[--s] cursor-pointer items-center justify-center [transition:color_0.5s]',
                {
                  'text-primary': index === menuIndex,
                },
              )}
              onClick={() => onChange(index)}
            >
              <Icon name={item.icon} className="text-base" />
            </div>
          </div>
        </Tooltip>
      ))}
      <div
        className="shadow-menu-anchor absolute top-0 z-0 h-[--s] w-[--s] rounded-[50%] bg-white transition-[left] duration-500"
        style={{
          left: `calc(var(--s) * ${menuIndex})`,
        }}
      ></div>
    </div>
  );
}

export default Menu;
