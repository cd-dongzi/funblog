'use client';
import { Icon } from '@funblog/components';
import { PageMenuButton } from '@funblog/types';
import cls from 'classnames';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import Link from '@/components/Link';
import ScrollView, { ScrollViewRef } from '@/components/ScrollView';
import { getPaginationPageUrl } from '@/utils';

function ScrollTags({ list }: { list: PageMenuButton[] }) {
  const pathname = usePathname();
  const url = getPaginationPageUrl(pathname!);
  let current = list.findIndex((v) => v.url === url);
  current = current > -1 ? current : 0;
  const [tagIndex, setTagIndex] = useState(current);
  const ref = useRef<ScrollViewRef>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  if (list.length === 0) return null;
  return (
    <ScrollView className="px-2 py-4" hasScroll={false} ref={ref}>
      <div className="relative inline-flex px-1" ref={contentRef}>
        {list.map((item, i) => {
          const node = (
            <Link
              href={item.url || ''}
              key={`${item.name}_${i}`}
              className="relative"
              onMouseEnter={() => setTagIndex(i)}
              onMouseLeave={() => setTagIndex(current)}
            >
              {tagIndex === i && (
                <motion.div
                  layoutId="scroll-tag"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                  className="absolute left-0 top-0 h-full w-full rounded-[theme(spacing.5)] bg-primary/10"
                ></motion.div>
              )}
              {
                <button
                  className={cls(
                    'btn-clear inline-flex h-10 items-center justify-center rounded-[theme(spacing.5)] px-4 leading-5',
                    {
                      'shadow-primary-md bg-primary text-white': current === i,
                    },
                  )}
                >
                  {item.icon && <Icon name={item.icon} className="mr-2.5" />}
                  <span className="whitespace-nowrap">{item.name}</span>
                </button>
              }
            </Link>
          );
          if (item.children && item.children.length > 0) {
            return (
              <Dropdown
                appendBody
                placement="bottom"
                key={`${item.name}_${i}`}
                menu={item.children.map((v) => {
                  return {
                    key: v.id,
                    label: v.name,
                    href: v.url,
                    target: v.open ? '_blank' : '',
                  };
                })}
              >
                {node}
              </Dropdown>
            );
          }
          return node;
        })}
      </div>
    </ScrollView>
  );
}

export default ScrollTags;
