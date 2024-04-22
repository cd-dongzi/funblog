import { Portal } from '@funblog/components';
import cls from 'classnames';
import React, { useEffect } from 'react';
import Dialog, { DialogProps } from '@/components/Dialog';
import Normal from './Normal';
import styles from './style.module.css';

export type ModalProps = Omit<DialogProps, 'onAfterClose'> & {
  title?: string;
  content?: React.ReactNode;
  onConfirm?: (done?: () => void) => Promise<any> | void;
  contentClassName?: string;
  renderContent?: ({ onClose }: { onClose: () => void }) => React.ReactNode;
};

export interface IIModal {
  (props: ModalProps): JSX.Element | null | undefined;
}

const Modal: IIModal = ({
  isOpen,
  content,
  children,
  renderContent,
  title,
  onClose,
  onConfirm,
  className,
  contentClassName,
  ...props
}) => {
  const [show, setShow] = React.useState(isOpen);
  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
  };
  if (!isOpen) {
    return;
  }
  return (
    <Portal>
      <span>
        <Dialog
          isOpen={show}
          {...props}
          contentCloseable={false}
          onClose={handleClose}
          onAfterClose={onClose}
          className={cls(styles.content, contentClassName)}
        >
          {renderContent ? (
            renderContent({
              onClose: handleClose,
            })
          ) : (
            <Normal
              className={className}
              title={title}
              onCancel={handleClose}
              onClose={handleClose}
              onConfirm={onConfirm}
            >
              {content || children}
            </Normal>
          )}
        </Dialog>
      </span>
    </Portal>
  );
};

export default Modal;
