import { Post } from '@funblog/types';
import cls from 'classnames';
import Link from '@/components/Link';
import { getResourceUrl } from '@/utils';
import Button from './Button';
import Size from '../Size';
import styles from './styles.module.css';

function checkSlider(max: number) {
  return (current: number, n: number) => {
    const _n = current + n;
    if (_n < 0) {
      return max + _n;
    }
    if (_n >= max) {
      return _n - max;
    }
    return _n;
  };
}

function Swiper({
  posts,
  className,
  current,
  onPrev,
  onNext,
}: {
  posts: Post[];
  className?: string;
  current: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className={cls(className, 'flex justify-center')}>
      <Size className="relative h-[--h] w-[--w] pc:-translate-x-4">
        {posts.map((post, index) => {
          const curr = current === index;
          const _checkSlider = checkSlider(posts.length);
          const after0 = _checkSlider(current, 1) === index;
          const after1 = _checkSlider(current, 2) === index;
          const after2 = _checkSlider(current, 3) === index;
          const before0 = _checkSlider(current, -1) === index;
          const before1 = _checkSlider(current, -2) === index;
          const before2 = _checkSlider(current, -3) === index;
          return (
            <Link
              href={`/post/${post.id}`}
              key={index}
              className={cls(styles.card, 'shadow-banner-card bg-image h-[--h] w-[--w] rounded-[0.7em] bg-center', {
                [styles.current]: curr,
                [styles.after0]: after0,
                [styles.after1]: after1,
                [styles.after2]: after2,
                [styles.before0]: before0,
                [styles.before1]: before1,
                [styles.before2]: before2,
                hidden: !(curr || after0 || after1 || after2 || before0 || before1 || before2),
              })}
              style={{
                backgroundImage: `url(${getResourceUrl(post.cover)})`,
              }}
            ></Link>
          );
        })}
      </Size>
      <Button className={styles.prev} onClick={onPrev} />
      <Button className={styles.next} onClick={onNext} />
    </div>
  );
}

export default Swiper;
