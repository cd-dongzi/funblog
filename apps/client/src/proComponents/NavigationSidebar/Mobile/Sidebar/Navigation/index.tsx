import { Icon } from '@funblog/components';
import cls from 'classnames';
import { usePathname } from 'next/navigation';
import Link from '@/components/Link';
import { useStore } from '@/context';

function Navigation({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const { navigationList } = useStore();
  return (
    <nav>
      {navigationList?.map((item) => (
        <Link
          key={item.name}
          href={item.url || ''}
          className={cls('leading-12 flex items-center rounded-3xl pl-4 pr-7 leading-10 text-text hover:text-primary', {
            'button-primary-gradient !text-white shadow-primary transition-all duration-1000': pathname === item.url,
          })}
          onClick={onClose}
        >
          {item.icon && <Icon name={item.icon} className="mr-1.5 text-base" />}
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}

export default Navigation;
