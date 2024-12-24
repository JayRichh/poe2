import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useEffect, useState } from "react";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import type { PatchNote } from "~/types/news";

interface PatchNotesCarouselProps {
  patchNotes: PatchNote[];
}

export function PatchNotesCarousel({ patchNotes }: PatchNotesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = patchNotes.length - 1;
      if (nextIndex >= patchNotes.length) nextIndex = 0;
      return nextIndex;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentNote = patchNotes[currentIndex];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg flex flex-col">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-background/60 backdrop-blur px-3 py-1.5 rounded-full border border-border/20">
        <Text color="secondary" className="text-sm">
          {currentIndex + 1} / {patchNotes.length}
        </Text>
      </div>

      <div className="relative flex-1">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 p-8 lg:p-10 flex flex-col"
          >
            <div className="flex-1 flex flex-col">
              <div className="space-y-4 pb-6">
                <div className="flex items-center justify-between">
                  <Text
                    variant="h3"
                    className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  >
                    {currentNote.version}
                  </Text>
                  <Text
                    color="secondary"
                    className="text-sm bg-background/40 px-3 py-1 rounded-full"
                  >
                    {new Date(currentNote.date).toLocaleDateString()}
                  </Text>
                </div>
                <div className="border-t border-border/50" />
              </div>

              <div className="flex-1 overflow-y-auto space-y-5 pr-4 scrollbar-thin">
                {currentNote.content?.slice(0, 5).map((change, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-start gap-3 group"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary/60 mt-2 flex-shrink-0 group-hover:bg-primary transition-colors" />
                    <Text className="text-muted-foreground/90 group-hover:text-foreground transition-colors">
                      {change}
                    </Text>
                  </motion.div>
                ))}
                {currentNote.content && currentNote.content.length > 5 && (
                  <div className="pt-2">
                    <Text
                      color="secondary"
                      className="text-sm bg-background/30 px-3 py-1.5 rounded-full inline-block"
                    >
                      +{currentNote.content.length - 5} more changes...
                    </Text>
                  </div>
                )}
              </div>

              {currentNote.url && (
                <div className="pt-6 border-t border-border/50 mt-4">
                  <a
                    href={currentNote.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button variant="secondary" size="sm">
                      View Full Patch Notes
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/40 hover:bg-background/60 backdrop-blur-sm"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/40 hover:bg-background/60 backdrop-blur-sm"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
