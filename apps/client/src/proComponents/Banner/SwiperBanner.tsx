'use client';
import { Icon } from '@funblog/components';
import { Post } from '@funblog/types';
import cls from 'classnames';
import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import Link from '@/components/Link';
import { getResourceUrl } from '@/utils';
import * as styles from './classNames';
import Bubble from './components/Bubble';
import Card from './components/Card';
import Cover from './components/Cover';
import Swiper from './components/Swiper';
import useSlider from './hooks/useSlider';
import useTouch from './hooks/useTouch';

const SLIDE_SIZE = 7;
enum SliderDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

function CoverBanner<T extends Post>({ posts, className }: { posts: T[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // 轮播图填充
  const _posts = useMemo(() => {
    if (!posts.length) return posts;
    if (posts.length >= SLIDE_SIZE) return posts;
    const n = Math.ceil(SLIDE_SIZE / posts.length);
    return new Array(n).fill(1).reduce((arr) => [...arr, ...posts], []) as Post[];
  }, [posts]);
  // 轮播图逻辑
  const { current, sliding, onPrev, onNext } = useSlider(_posts);
  const post = useMemo(() => _posts[current], [current, _posts]);
  useTouch(ref, {
    onPanLeft: onNext,
    onPanRight: onPrev,
  });
  // 动画
  const motionItem = {
    hidden: sliding ? { opacity: 0, x: `${sliding === SliderDirection.RIGHT ? '-' : ''}5em` } : {},
    show: { opacity: 1, x: '0', transition: { duration: 1, type: 'spring' } },
  };
  if (!post) return null;
  return (
    <Card ref={ref} className={cls(className, 'mobile:pt-[theme(spacing.headerH)]')}>
      <Cover image={getResourceUrl(post.cover)} />
      <Bubble className={styles.bubble} />
      <div
        className={cls(
          styles.content,
          'pc:[--sw:370px] pc:md:[--sw:400px] pc:lg:[--sw:550px] pc:xl:[--sw:650px] pc:xxxl:[-sw:800px]',
        )}
      >
        <motion.div
          className={styles.info}
          key={current}
          initial={'hidden'}
          animate={'show'}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={motionItem} className={styles.tags}>
            {post?.tags.map((tag, index) => (
              <span key={tag.name}>
                {tag.name}
                {index < post.tags.length - 1 && <i className={styles.i}>·</i>}
              </span>
            ))}
          </motion.div>
          <motion.div variants={motionItem} className={styles.title}>
            {post?.title}
          </motion.div>
          <motion.div variants={motionItem}>
            <Link href={`/post/${post.id}`} className={styles.button}>
              <Icon name="right-arrow" className={styles.buttonIcon} />
              阅读全文
            </Link>
          </motion.div>
        </motion.div>
        <Swiper posts={_posts} current={current} onPrev={onPrev} onNext={onNext} className="w-[--sw]" />
      </div>
    </Card>
  );
}

export default CoverBanner;
