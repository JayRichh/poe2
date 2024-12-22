import Image from 'next/image';
import { forwardRef, useState } from 'react';
import { shimmer, toBase64 } from '~/utils/image';

import type { ImageProps } from 'next/image';

type ProgressiveImageProps = Omit<ImageProps, 'alt'> & {
  onLoad?: () => void;
  alt: string; // Make alt required
};

export const ProgressiveImage = forwardRef<HTMLImageElement, ProgressiveImageProps>(
  function ProgressiveImage({
    className,
    onLoad,
    alt,
    ...props
  }, ref) {
    const [isLoading, setLoading] = useState(true);

    return (
      <Image
        ref={ref}
        alt={alt}
        {...props}
      className={`
        ${className || ''}
        ${isLoading ? 'blur-sm' : 'blur-0'}
        transition-all duration-300
      `}
      onLoad={() => {
        setLoading(false);
        onLoad?.();
      }}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(
        typeof props.width === 'number' ? props.width : 1920,
        typeof props.height === 'number' ? props.height : 1080
      ))}`}
      />
    );
  }
);

ProgressiveImage.displayName = 'ProgressiveImage';
