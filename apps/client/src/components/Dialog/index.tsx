import { useDisabledScrollByMask } from '@funblog/hooks';
import cls from 'classnames';
import { motion, AnimationProps } from 'framer-motion';
import React, { useImperativeHandle, useRef } from 'react';
import styles from './style.module.css';

export type DialogProps = {
  isOpen: boolean;
  maskClosable?: boolean;
  contentCloseable?: boolean;
  children?: any;
  className?: string;
  onClose?: () => void;
  onAfterClose?: () => void;
  contentMotionProps?: Partial<AnimationProps>;
};

type DialogRef = {
  onClose?: () => void;
};
const Dialog = React.forwardRef<DialogRef, DialogProps>(
  (
    {
      isOpen,
      maskClosable = true,
      contentCloseable = true,
      children,
      className,
      onClose,
      onAfterClose,
      contentMotionProps,
    },
    cRef,
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    useDisabledScrollByMask({
      show: isOpen,
      maskEl: ref.current,
      contentEl: contentRef.current,
    });
    useImperativeHandle(cRef, () => ({
      onClose,
    }));

    const onMaskClick = () => {
      if (maskClosable) {
        onClose?.();
      }
    };
    // 点击遮罩层
    const onContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (contentRef.current?.contains(e.target as Node)) {
        // 点到自己也算点击mask
        if (contentRef.current === e.target) {
          return onMaskClick();
        }
        if (contentCloseable) {
          return onClose?.();
        }
      }
    };

    const maskAnimate = isOpen ? { opacity: 1 } : { opacity: 0 };
    const contentAnimate = isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 };
    return (
      <>
        <motion.div
          className={styles.mask}
          initial={{ opacity: 0 }}
          animate={maskAnimate}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => {
            if (!isOpen) {
              onAfterClose?.();
            }
          }}
          onClick={onMaskClick}
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={contentAnimate}
          ref={contentRef}
          {...contentMotionProps}
          onClick={onContentClick}
          className={cls(styles.content, className)}
        >
          {children}
        </motion.div>
      </>
    );
  },
);
Dialog.displayName = 'Dialog';
export default Dialog;
