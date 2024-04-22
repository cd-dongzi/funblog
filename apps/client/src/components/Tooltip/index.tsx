'use client';
import { bindClickOutSide, delay } from '@funblog/utils';
import cls from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { isFragment } from 'react-is';
import Popup, { PopupProps } from '@/components/Popup';
import { enhanceProps, enhanceElement, EnhanceFuncProps } from './enhanceElement';
import styles from './style.module.css';
export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  triggerType?: 'hover' | 'click';
  followHide?: boolean;
  hoverRemainTime?: number;
  hoverDelayTime?: number;
} & EnhanceFuncProps &
  Partial<Omit<PopupProps, 'children' | 'getAnchor' | 'handler'>>;

function Tooltip({
  content,
  children,
  isOpen: isOpenProp,
  hoverDelayTime = 200,
  hoverRemainTime = 200,
  triggerType = 'hover',
  ...props
}: TooltipProps) {
  const ref = useRef({
    child: null as HTMLElement | null,
    isEnter: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  if (!React.isValidElement(children) || isFragment(children)) {
    children = <span>{children}</span>;
  }

  useEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const showTooltip = () => {
    setIsOpen(true);
  };
  const hideTooltip = () => {
    setIsOpen(false);
  };
  const onMouseEnter = () => {
    if (triggerType !== 'hover' || isOpenProp !== undefined) {
      return;
    }
    ref.current.isEnter = true;
    delay(hoverDelayTime).then(showTooltip);
  };

  const onMouseLeave = () => {
    if (triggerType !== 'hover' || isOpenProp !== undefined) {
      return;
    }
    ref.current.isEnter = false;
    delay(hoverRemainTime).then(() => {
      if (ref.current.isEnter) {
        return;
      }
      hideTooltip();
    });
  };

  const onClick = () => {
    if (triggerType !== 'click' || isOpenProp !== undefined) {
      return;
    }
    showTooltip();
  };

  useEffect(() => {
    if (triggerType === 'click') {
      bindClickOutSide(() => ref.current.child, hideTooltip);
    }
  }, [triggerType]);

  const handler = enhanceProps(
    {
      onMouseEnter,
      onMouseLeave,
      onClick,
    },
    {
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave,
      onClick: props.onClick,
    },
  );
  const child = enhanceElement(children, {
    ...handler,
    ref: (node: HTMLElement) => {
      ref.current.child = node;
    },
  });
  return (
    <>
      {child}
      <Popup
        handler={handler}
        getAnchor={() => ref.current.child!}
        {...props}
        isOpen={isOpen}
        className={cls(styles.tooltip, props.className)}
        wrapperClassName={props.wrapperClassName}
        arrowClassName={props.arrowClassName}
      >
        {content}
      </Popup>
    </>
  );
}

export default Tooltip;
