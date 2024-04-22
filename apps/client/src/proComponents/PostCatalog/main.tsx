import cls from 'classnames';
import { useRef } from 'react';
import ALink from '@/components/ALink';
import { PostCatalogItem } from './types';
import { useSidebarScroll } from '.';
import styles from './style.module.css';

export interface ChangeEventData {
  i: number;
  event: React.MouseEvent;
  anchorId: string;
}
type Props = {
  list: PostCatalogItem[];
  onChange?: (data: ChangeEventData) => void;
  activeIndex: number;
  getSideBarContainer?: () => HTMLElement;
};

interface PostCatalogProps {
  (props: Props): JSX.Element | null;
}

export const PostCatalog: PostCatalogProps = ({ list, onChange, activeIndex, getSideBarContainer }) => {
  const liRef = useRef<HTMLElement>(null);
  const onClick = (data: ChangeEventData) => {
    onChange && onChange(data);
  };
  useSidebarScroll({ activeIndex, containerRef: liRef, list, getSideBarContainer });
  return (
    <section className={styles.catalog} ref={liRef}>
      {!!list.length && (
        <ul>
          {list.map((item, i) => (
            <li
              key={item.title + i}
              className={cls(styles.item, {
                [styles.sub]: !!item.gap,
                [styles.parent]: !item.gap,
                [styles.active]: i === activeIndex,
              })}
            >
              <ALink
                href={`#${item.node.id}`}
                onClick={(event) =>
                  onClick({
                    i,
                    event,
                    anchorId: item.node.id,
                  })
                }
              >
                <div
                  className={styles.wrapper}
                  style={item.gap ? { paddingLeft: `calc(var(--c-gap)*${item.gap})` } : {}}
                >
                  <span className={styles.text}>{item.title}</span>
                </div>
              </ALink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
