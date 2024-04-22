import React, { useState } from 'react';
import Dialog from '@/components/Dialog';
import { NormalImage } from '@/components/Image';
import styles from './style.module.css';

type Props = {
  src: string;
  alt?: string;
  onClose?: () => void;
};

const PreviewImg = ({ src, alt = '', onClose }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog isOpen={isOpen} onClose={handleClose} onAfterClose={onClose}>
      <div className={styles.container}>
        <NormalImage className={styles.img} src={src} alt={alt} />
      </div>
    </Dialog>
  );
};

export default PreviewImg;
