import { Instance, Placement, createPopper } from '@popperjs/core';
import cls from 'classnames';
import { AnimatePresence, motion, useAnimate, useAnimation } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export interface PopupProps {
  isOpen: boolean;
  children: React.ReactNode;
  getAnchor: () => Element;
  arrowClassName?: string;
  wrapperClassName?: string;
  className?: string;
  placement?: Placement;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  appendBody?: boolean;
  positionFixed?: 'absolute' | 'fixed';
  handler?: Record<string, (...args: any) => void>;
  showArrow?: boolean;
}

const offsets = {
  top: { y: -10, x: 0 },
  right: { x: 10, y: 0 },
  bottom: { y: 10, x: 0 },
  left: { x: -10, y: 0 },
};
const getOffset = (placement?: Placement) => {
  if (!placement) return { x: 0, y: 0 };
  if (placement.includes('top')) return offsets.top;
  if (placement.includes('right')) return offsets.right;
  if (placement.includes('bottom')) return offsets.bottom;
  if (placement.includes('left')) return offsets.left;
  return { x: 0, y: 0 };
};

const getOffsetByPlacement = (placement?: Placement) => {
  const o = getOffset(placement);
  return {
    start: {
      transform: `translate(${o.x}px, ${o.y}px)`,
    },
    end: {
      transform: 'translate(0, 0)',
    },
  };
};
function PopupMain({
  isOpen,
  children,
  getAnchor,
  className,
  arrowClassName,
  wrapperClassName,
  style,
  wrapperStyle,
  positionFixed = 'absolute',
  placement = 'top',
  handler = {},
  onAnimationHide,
  showArrow = true,
}: PopupProps & {
  onAnimationHide?: () => void;
}) {
  const ref = useRef({
    getAnchor,
    isOpen,
    popper: null as Instance | null,
  });
  ref.current.getAnchor = getAnchor;
  ref.current.isOpen = isOpen;
  const controls = useAnimation();
  const [scope] = useAnimate();
  const arrowRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(getOffsetByPlacement(placement));

  const update = useCallback(() => {
    const anchor = ref.current.getAnchor?.();
    const popup = popupRef.current;
    if (!popup || !anchor) {
      return;
    }
    ref.current.popper = createPopper(anchor, popup, {
      placement,
      strategy: positionFixed,
      modifiers: [
        ...(showArrow
          ? [
              {
                name: 'arrow',
                options: {
                  element: arrowRef.current,
                },
              },
            ]
          : []),
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
        {
          name: 'flip',
        },
      ],
      onFirstUpdate: (params) => {
        const placement = params.placement;
        if (placement && scope.current) {
          const offset = getOffsetByPlacement(placement);
          setOffset(offset);
          scope.current.style.transform = offset.start.transform;
          controls.start({ ...offset.end, opacity: 1 });
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionFixed, placement, showArrow]);

  useEffect(() => {
    update();
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current.popper?.destroy();
    };
  }, [update]);

  return (
    <div ref={popupRef} {...handler} className={cls('z-l5', styles.popup, wrapperClassName)} style={wrapperStyle}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cls(styles.content, className)}
            style={style}
            ref={scope}
            initial={{ opacity: 0 }}
            animate={controls}
            exit={{ ...offset.start, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onAnimationComplete={() => {
              if (!ref.current.isOpen) {
                onAnimationHide?.();
              }
            }}
          >
            {children}
            {showArrow && <div ref={arrowRef} className={cls(styles.arrow, arrowClassName)} />}{' '}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PopupShow(props: PopupProps) {
  const [show, setShow] = useState(props.isOpen);
  useEffect(() => {
    if (props.isOpen) {
      setShow(props.isOpen);
    }
  }, [props.isOpen]);
  return (
    show && (
      <PopupMain
        {...props}
        onAnimationHide={() => {
          setShow(false);
        }}
      />
    )
  );
}

export default PopupShow;
