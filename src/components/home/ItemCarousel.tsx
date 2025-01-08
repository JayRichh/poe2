import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ItemBase } from "~/types/itemTypes";

// Global cache for failed image URLs
const failedImageCache = new Set<string>();

interface ItemCarouselProps {
  topItems: ItemBase[];
  bottomItems: ItemBase[];
}

function ScrollingRow({
  items,
  reverse = false,
  speed = 0.5,
}: {
  items: ItemBase[];
  reverse?: boolean;
  speed?: number;
}) {
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(true); // Start paused
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const direction = reverse ? 1 : -1;
  const resetRef = useRef(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // Calculate content width on mount and item changes
  useEffect(() => {
    if (containerRef.current) {
      const itemWidth = 320; // min-w-[320px]
      const gap = 32; // gap-8 (2rem = 32px)
      const totalWidth = items.length * (itemWidth + gap);
      setContentWidth(totalWidth);
    }
  }, [items]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPaused(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    function animate(time: number) {
      if (!containerRef.current || contentWidth === 0) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const dt = time - lastTime;
      lastTime = time;

      if (!paused) {
        let newVal = x.get() + direction * (speed * (dt / 16.6667));
        const resetThreshold = contentWidth;

        if (reverse) {
          // For reverse direction (bottom row)
          if (newVal >= 0 && !resetRef.current) {
            newVal = -resetThreshold;
            resetRef.current = true;
          } else if (newVal < -resetThreshold) {
            newVal = 0;
            resetRef.current = false;
          }
        } else {
          // For forward direction (top row)
          if (newVal <= -resetThreshold && !resetRef.current) {
            newVal = 0;
            resetRef.current = true;
          } else if (newVal > 0) {
            newVal = -resetThreshold;
            resetRef.current = false;
          }
        }

        x.set(newVal);
      }
      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [paused, reverse, contentWidth, speed, x, direction]);

  const handleImageError = (itemUrl: string) => {
    failedImageCache.add(itemUrl);
    setFailedImages(new Set(failedImageCache));
  };

  // Filter out items with failed images and create four sets for smoother scrolling
  const validItems = items.filter(item => !failedImageCache.has(item.icon));
  const displayItems = [...validItems, ...validItems, ...validItems, ...validItems];

  return (
    <motion.div
      ref={containerRef}
      className="flex gap-8 absolute left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-[100vw] px-6"
      style={{
        x,
        transform: "translate3d(0,0,0)",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
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
                <img 
                  src="/icon.svg" 
                  alt="Fallback Icon" 
                  className="w-12 h-12"
                />
              </div>
            ) : (
              <img 
                src={item.icon} 
                alt={item.name} 
                className="w-full h-full object-contain"
                onError={() => handleImageError(item.icon)}
              />
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
  return (
    <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-gradient-to-br from-background/50 to-background/30 backdrop-blur py-12 border-y border-border/10">
      <div className="relative space-y-12">
        <div className="relative h-[120px] overflow-hidden">
          <ScrollingRow items={topItems} />
        </div>
        <div className="relative h-[120px] overflow-hidden">
          <ScrollingRow items={bottomItems} reverse />
        </div>
      </div>
    </div>
  );
}
