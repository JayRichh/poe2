import { motion, useMotionValue } from "framer-motion";

import { useEffect, useRef, useState } from "react";

import type { ItemBase } from "~/types/itemTypes";

interface ItemCarouselProps {
  topItems: ItemBase[];
  bottomItems: ItemBase[];
}

// Individual row that manually animates via requestAnimationFrame
function ScrollingRow({
  items,
  reverse = false,
  scrollWidth = 4000,
  speed = 40,
}: {
  items: ItemBase[];
  reverse?: boolean;
  scrollWidth?: number;
  speed?: number;
}) {
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const direction = reverse ? 1 : -1;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    function animate(time: number) {
      const dt = time - lastTime;
      lastTime = time;

      if (!paused) {
        let newVal = x.get() + direction * (speed * (dt / 16.6667));
        // Loop back when scrolled past half of scrollWidth
        if (reverse && newVal > 0) {
          newVal = -scrollWidth / 2;
        } else if (!reverse && newVal < -scrollWidth / 2) {
          newVal = 0;
        }
        x.set(newVal);
      }
      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [paused, reverse, scrollWidth, speed, x, direction]);

  return (
    <motion.div
      ref={containerRef}
      className="flex gap-8 absolute left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-[100vw] px-6 will-change-transform"
      style={{
        x,
        transform: "translate3d(0,0,0)",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {[...items, ...items].map((item, index) => (
        <div
          key={`${item.url}-${index}`}
          className="flex items-center gap-3 bg-card/95 backdrop-blur-sm border border-border/50 hover:border-primary/50 rounded-lg p-3 shadow-md min-w-[320px] transition-colors group"
        >
          <div className="w-20 h-20 relative flex-shrink-0 bg-background/30 rounded-lg p-1.5 group-hover:bg-background/50 transition-colors">
            <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
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
          <ScrollingRow items={topItems} scrollWidth={4000} speed={1} />
        </div>
        <div className="relative h-[120px] overflow-hidden">
          <ScrollingRow items={bottomItems} reverse scrollWidth={4000} speed={1} />
        </div>
      </div>
    </div>
  );
}
