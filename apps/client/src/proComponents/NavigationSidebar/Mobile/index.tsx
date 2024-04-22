'use client';
import { useDisabledScrollByMask } from '@funblog/hooks';
import cls from 'classnames';
import { useStore } from '@/context';
// import useScrollValue from '@/hooks/useScrollValue';
import Sidebar from './Sidebar';

export interface ChildrenParams {
  onShow?: () => void;
  headerClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}

function MNavigationSidebar({ children }: { children: (data: ChildrenParams) => React.ReactNode }) {
  const { showMSidebar, toggleMSidebar } = useStore();
  useDisabledScrollByMask({
    show: showMSidebar,
  });
  // const scrollTop = useScrollValue({ debounce: true, delay: 100 });
  const onClose = () => toggleMSidebar(false);
  const _onShow = () => toggleMSidebar(true);
  return (
    <>
      {children({
        onShow: _onShow,
        headerClassName: cls({
          '-translate-y-full': showMSidebar,
        }),
        /* 当数据dom足够多的时候 执行此动画效果会导致性能问题 */
        // style: {
        //   transformOrigin: `left ${scrollTop + 450}px`,
        // },
        // className: cls('transition-transform duration-500', {
        //   '![transform:translateX(250px)_perspective(600px)_rotateY(10deg)]': showMSidebar,
        // }),
      })}
      <div
        className={cls(
          'pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-l3  bg-[theme(colors.gray/0.5)] opacity-0 transition-opacity duration-500',
          {
            'pointer-events-auto opacity-100': showMSidebar,
          },
        )}
        onClick={onClose}
      />
      <section
        className={cls(
          'test',
          '[--w:250px]',
          'pb-safe fixed bottom-0 left-0 top-0 z-l3 h-screen w-[--w] overflow-y-auto overflow-x-hidden bg-[theme(colors.gray9)] px-2 py-4 transition-all duration-500',
          'origin-right [transform:translateX(calc(0px-var(--w)))_translateZ(100px)_perspective(300px)_rotateY(-55deg)]',
          {
            '![transform:_translateX(0)_translateZ(100px)_perspective(300px)_rotateY(0deg)]': showMSidebar,
          },
        )}
      >
        <Sidebar onClose={onClose} />
      </section>
    </>
  );
}

export default MNavigationSidebar;
