import { forwardRef, useCallback, useEffect, useState } from "react";

import Image from "next/image";
import type { ImageProps } from "next/image";

import { shimmer, toBase64 } from "~/utils/image";

type ProgressiveImageProps = Omit<ImageProps, "alt"> & {
  onLoad?: () => void;
  onError?: (error: Error) => void;
  alt: string; // Make alt required
  fallback?: string; // Optional fallback image URL
};

export const ProgressiveImage = forwardRef<HTMLImageElement, ProgressiveImageProps>(
  function ProgressiveImage({ className, onLoad, onError, alt, fallback, ...props }, ref) {
    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [src, setSrc] = useState(props.src);

    // Reset loading state when src changes
    useEffect(() => {
      setLoading(true);
      setHasError(false);
      setSrc(props.src);
    }, [props.src]);

    const handleError = useCallback(() => {
      setHasError(true);
      setLoading(false);
      if (fallback) {
        setSrc(fallback);
      }
      onError?.(new Error(`Failed to load image: ${props.src}`));
    }, [fallback, onError, props.src]);

    const handleLoad = useCallback(() => {
      setLoading(false);
      setHasError(false);
      onLoad?.();
    }, [onLoad]);

    return (
      <Image
        ref={ref}
        alt={alt}
        {...props}
        src={src}
        className={`
          ${className || ""}
          ${isLoading ? "blur-sm scale-[1.02]" : "blur-0 scale-100"}
          ${hasError ? "opacity-50" : "opacity-100"}
          transition-all duration-300
        `}
        onLoad={handleLoad}
        onError={handleError}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(
            typeof props.width === "number" ? props.width : 1920,
            typeof props.height === "number" ? props.height : 1080
          )
        )}`}
      />
    );
  }
);

ProgressiveImage.displayName = "ProgressiveImage";
