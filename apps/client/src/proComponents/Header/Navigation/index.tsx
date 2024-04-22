import { Icon } from '@funblog/components';
import { usePrevious } from '@funblog/hooks';
import cls from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import Link from '@/components/Link';
import { useStore } from '@/context';

function Navigation() {
  const pathname = usePathname();
  const ref = useRef({
    id: undefined as undefined | string,
  });
  const [changing, setChanging] = useState(false);
  const [id, setId] = useState<string>();
  const { navigationList } = useStore();
  const prevId = usePrevious(id);
  const old = navigationList?.find((item) => item.url === pathname)?.id;

  useEffect(() => {
    setId(navigationList?.find((item) => item.url === pathname)?.id);
  }, [navigationList, pathname]);
  const onMouseEnter = (id?: string) => {
    ref.current.id = id;
    setId(id);
  };
  const onMouseLeave = () => {
    setId(old);
  };
  useEffect(() => {
    setChanging(false);
  }, [pathname]);
  const AnimateWrap = (dom: ReactNode) => (!old ? <AnimatePresence>{dom}</AnimatePresence> : dom);
  return (
    <nav className="flex h-full flex-1 justify-end overflow-x-clip">
      <div className="flex">
        {navigationList?.map((item, i) => {
          const isSelected = id === item.id;
          const matchRouter = pathname === item.url;
          const node = (
            <motion.div
              key={`${item.name}_${i}`}
              className="relative flex h-full flex-shrink-0 px-4"
              onMouseEnter={() => onMouseEnter(item.id)}
              onMouseLeave={onMouseLeave}
            >
              <Link
                href={item.url || ''}
                target={item.open ? '_blank' : ''}
                className={cls(
                  'flex cursor-pointer items-center text-text transition-[color] duration-300 hover:text-primary',
                  {
                    '!text-primary': isSelected || matchRouter,
                  },
                )}
                onClick={() => {
                  setChanging(true);
                }}
              >
                {item.icon && <Icon name={item.icon} className="mr-1.5 text-base" />}
                <span>{item.name}</span>
              </Link>
              {AnimateWrap(
                isSelected && (
                  <>
                    {changing ? (
                      <div className="line-tick" />
                    ) : (
                      <motion.div
                        layoutId="navigation-underline"
                        {...(!prevId
                          ? {
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              exit: { opacity: 0 },
                            }
                          : {})}
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                        className="line-tick"
                      ></motion.div>
                    )}
                  </>
                ),
              )}
            </motion.div>
          );
          if (item.children && item.children.length > 0) {
            return (
              <Dropdown
                key={`${item.name}_${i}`}
                menu={item.children.map((item) => {
                  return {
                    key: item.id,
                    label: item.name,
                    href: item.url,
                    target: item.open ? '_blank' : '',
                  };
                })}
                placement="bottom"
                appendBody
                onMouseEnter={() => onMouseEnter(ref.current.id)}
                onMouseLeave={onMouseLeave}
              >
                {node}
              </Dropdown>
            );
          }
          return node;
        })}
        {/* <motion.div
          // layoutId="navigation-underline"
          // transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
          className="line-tick"
        ></motion.div> */}
      </div>
    </nav>
  );
}

export default Navigation;
