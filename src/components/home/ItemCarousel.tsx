"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ItemBase } from "~/types/itemTypes";

interface ItemCarouselProps {
  topItems: ItemBase[];
  bottomItems: ItemBase[];
}

const failedImageCache = new Set<string>();

function ScrollingRow({
  items,
  reverse = false,
  speed = 0.5,
  getLocalImageUrl,
}: {
  items: ItemBase[];
  reverse?: boolean;
  speed?: number;
  getLocalImageUrl: (url: string) => string;
}) {
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const direction = reverse ? 1 : -1;
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (items.length === 0) return;
    
    const itemWidth = 320;
    const gap = 32;
    const singleSetWidth = items.length * (itemWidth + gap);
    setContentWidth(singleSetWidth);

    const initialX = reverse ? -singleSetWidth * 2 : -singleSetWidth;
    x.set(initialX);
  }, [items, x, reverse]);

  useEffect(() => {
    const startAnimation = () => setPaused(false);
    const timer = setTimeout(startAnimation, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      if (!containerRef.current || contentWidth === 0) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const dt = time - lastTime;
      lastTime = time;

      if (!paused) {
        const currentX = x.get();
        const delta = direction * (speed * (dt / 16.6667));
        let newX = currentX + delta;

        if (reverse) {
          if (newX > -contentWidth) {
            newX = -contentWidth * 3;
          }
        } else {
          if (newX < -contentWidth * 3) {
            newX = -contentWidth;
          }
        }

        x.set(newX);
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [paused, reverse, contentWidth, speed, x, direction]);

  const handleImageError = (itemUrl: string) => {
    failedImageCache.add(itemUrl);
    setFailedImages(new Set(failedImageCache));
  };

  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <motion.div
      ref={containerRef}
      className="flex gap-8 absolute left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-[100vw] px-6"
      style={{
        x,
        transform: "translate3d(0,0,0)",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {displayItems.map((item, index) => (
        <div
          key={`${item.url}-${index}`}
          className="flex items-center gap-3 bg-card/95 backdrop-blur-sm border border-border/50 hover:border-primary/50 rounded-lg p-3 shadow-md min-w-[320px] transition-colors group"
        >
          <div className="w-20 h-20 relative flex-shrink-0 bg-background/30 rounded-lg p-1.5 group-hover:bg-background/50 transition-colors">
            {failedImages.has(item.icon) ? (
              <div className="w-full h-full flex items-center justify-center opacity-50">
                <Image 
                  src="/icon.svg" 
                  alt="Fallback Icon"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                  priority
                  unoptimized={true}
                />
              </div>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src={getLocalImageUrl(item.icon)}
                  alt={item.name}
                  width={80}
                  height={80}
                  className={`w-full h-full object-contain transition-opacity duration-200 ${failedImages.has(item.icon) ? 'opacity-0' : 'opacity-100'}`}
                  onError={() => handleImageError(item.icon)}
                  loading="eager"
                  unoptimized={true}
                />
                <div className={`absolute inset-0 flex items-center justify-center bg-background/30 transition-opacity duration-200 ${failedImages.has(item.icon) ? 'opacity-100' : 'opacity-0'}`}>
                  <Image 
                    src="/icon.svg" 
                    alt="Loading"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                    priority
                    unoptimized={true}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <p className="font-semibold truncate text-lg group-hover:text-primary transition-colors">
              {item.name}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {item.modifiers?.[0]?.replace(/\d+/g, "").trim() ||
                (item.description && !item.description.includes("Item /")
                  ? item.description.split(" ").slice(0, 4).join(" ")
                  : item.category)}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export function ItemCarousel({ topItems, bottomItems }: ItemCarouselProps) {
  const [imageUrlMapping, setImageUrlMapping] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadImageMapping = async () => {
      try {
        const response = await fetch('/data/item-image-mapping.json');
        if (response.ok) {
          const mapping = await response.json();
          setImageUrlMapping(mapping);
        }
      } catch (error) {
        console.error('Failed to load image mapping:', error);
      }
    };
    loadImageMapping();
  }, []);

  const getLocalImageUrl = (url: string): string => {
    if (url.includes('cdn.poe2db.tw')) {
      return imageUrlMapping[url] || url;
    }
    return url;
  };
  return (
    <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-gradient-to-br from-background/50 to-background/30 backdrop-blur py-12 border-y border-border/10">
      <div className="relative space-y-12">
        <div className="relative h-[120px] overflow-hidden">
          <ScrollingRow items={topItems} getLocalImageUrl={getLocalImageUrl} />
        </div>
        <div className="relative h-[120px] overflow-hidden">
          <ScrollingRow items={bottomItems} reverse getLocalImageUrl={getLocalImageUrl} />
        </div>
      </div>
    </div>
  );
}
