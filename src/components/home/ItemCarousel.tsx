import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ItemBase } from "~/types/itemTypes";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const direction = reverse ? 1 : -1;
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const validItems = items.filter(item => !failedImageCache.has(item.icon));
  const displayItems = [...validItems, ...validItems];

  // Measure total width once rendered
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContentWidth(containerRef.current.scrollWidth);
      }
    };
    measure();

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [displayItems]);

  // Manual loop animation via requestAnimationFrame
  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      if (!paused && contentWidth > 0) {
        const currentX = x.get();
        // px/frame, scaled by dt (about 16.67ms @60fps)
        const distance = direction * speed * (dt / 16.6667);
        let newVal = currentX + distance;

        // Single set width is half of the total (because we duplicated items)
        const singleSetWidth = contentWidth / 2;

        // If reversed row (scrolling right), wrap from >= 0 back to -singleSetWidth
        if (reverse) {
          if (newVal >= 0) {
            newVal = newVal - singleSetWidth;
          }
        } else {
          // If normal row (scrolling left), wrap from <= -singleSetWidth back to 0
          if (newVal <= -singleSetWidth) {
            newVal = newVal + singleSetWidth;
          }
        }
        x.set(newVal);
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [paused, reverse, speed, x, contentWidth, direction]);

  // On hover, pause scrolling
  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  // Mark image as failed
  const handleImageError = (iconUrl: string) => {
    failedImageCache.add(iconUrl);
    setFailedImages(new Set(failedImageCache));
  };

  return (
    <div
      className="relative overflow-hidden w-full h-[120px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={containerRef}
        className="flex gap-8 absolute"
        style={{ x }}
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
                  (item.description &&
                  !item.description.includes("Item /")
                    ? item.description.split(" ").slice(0, 4).join(" ")
                    : item.category)}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function ItemCarousel({ topItems, bottomItems }: ItemCarouselProps) {
  return (
    <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-gradient-to-br from-background/50 to-background/30 backdrop-blur py-12 border-y border-border/10">
      <div className="space-y-12">
        <ScrollingRow items={topItems} reverse={false} speed={0.5} />
        <ScrollingRow items={bottomItems} reverse={true} speed={0.5} />
      </div>
    </div>
  );
}
