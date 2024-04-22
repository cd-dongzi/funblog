import { useOutsideClick } from '@funblog/hooks';
import cls from 'classnames';
import { useMemo, useRef, useState } from 'react';
import { PanelLine } from '@/components/Panel';
import Tooltip from '@/components/Tooltip';
import { useStore } from '@/context';
import useAutoScrollList from '@/hooks/useAutoScrollList';
import { useCommentStore } from '../../store';
import styles from './styles.module.css';

function Popup({ onClose, onFocus }: { onClose: () => void; onFocus: () => void }) {
  const { onAddText } = useCommentStore();
  const { siteComment } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const emojiList = siteComment?.emojiList;
  // 点击外部关闭
  useOutsideClick(() => popupRef.current, onClose);
  const list = useMemo(() => {
    if (!emojiList) return [];
    return emojiList.map((item) => {
      return {
        name: item.name,
        emojiList: item.value.split(' '),
      };
    });
  }, [emojiList]);
  // 自动滚动
  const { activeIndex, onActive } = useAutoScrollList({
    debounce: true,
    getContainer: () => ref.current,
    gap: 15,
    list: list.map((item, index) => {
      return {
        name: item.name,
        getNode: () => ref.current?.querySelector(`.emoji-title-${index}`),
      };
    }),
  });
  const onAddEmoji = (emoji: string) => {
    onAddText(emoji);
    onClose();
    onFocus();
  };
  return (
    <>
      <div className="flex h-full w-full flex-col" ref={popupRef}>
        <div className={cls('flex-1 overflow-auto p-[1em]', styles.scroll)} ref={ref}>
          {list.map(({ name, emojiList }, index) => {
            return (
              <PanelLine
                key={name}
                title={name}
                className="!my-0 text-base text-title"
                titleClassName={`emoji-title-${index}`}
              >
                <div className="-ml-[10px] grid w-[calc(100%+20px)] grid-cols-7">
                  {emojiList.map((emoji, index) => (
                    <button
                      className="transition-all-3 h-10 w-10 text-xl hover:scale-150"
                      key={index}
                      onClick={() => onAddEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PanelLine>
            );
          })}
        </div>
        <div
          className="grid h-12 px-3 shadow-[0px_-5px_10px_0_theme(colors.gray/0.1)]"
          style={{
            gridTemplateColumns: `repeat(${list.length}, minmax(0, 1fr))`,
          }}
        >
          {list.map(({ name, emojiList }, i) => (
            <Tooltip key={`${name}-${i}`} content={name}>
              <button
                className={cls(
                  'transition-all-3 mx-1 text-xl opacity-40 grayscale hover:opacity-100 hover:grayscale-0',
                  {
                    '!opacity-100 !grayscale-0': activeIndex === i,
                  },
                )}
                onClick={() => onActive(name)}
              >
                {emojiList[0] || name}
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    </>
  );
}

function Emoji({
  children,
  onFocus,
}: {
  children: (data: { onShow: () => void }) => React.ReactNode;
  onFocus: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <Tooltip
      isOpen={isOpen}
      appendBody
      className={styles.emojiTooltip}
      placement="top-end"
      content={isOpen && <Popup onFocus={onFocus} onClose={onClose} />}
    >
      {children({ onShow: () => setIsOpen(true) })}
    </Tooltip>
  );
}

export default Emoji;
