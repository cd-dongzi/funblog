'use client';
import NextImage, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import { imagePlaceholder } from './image-loading';

function Image({
  src,
  alt = src as string,
  placeholder,
  onError,
  ...props
}: Omit<ImageProps, 'alt'> & {
  alt?: string;
}) {
  const [_src, _setSrc] = useState(src);
  useEffect(() => {
    _setSrc(src);
  }, [src]);

  const _onError =
    onError ||
    function () {
      _setSrc('/image-fail.png');
    };

  return (
    <NextImage
      {...props}
      alt={alt}
      sizes="100%"
      src={_src}
      placeholder={placeholder || imagePlaceholder}
      onError={_onError}
    />
  );
}

export default Image;
