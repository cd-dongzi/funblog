import { useEffect } from 'react';
import PreviewImage from '@/components/PreviewImage';

export default function usePreviewImage() {
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      const target = e.target as HTMLImageElement;
      if (target.className === 'preview-image') {
        const src = target.src;
        PreviewImage.show({
          src,
        });
      }
    });
  }, []);
}
