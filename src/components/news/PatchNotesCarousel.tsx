import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import type { PatchNote } from "~/types/news";

interface PatchNotesCarouselProps {
  patchNotes: PatchNote[];
}

export function PatchNotesCarousel({ patchNotes }: PatchNotesCarouselProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Format date in a stable way
  const formatDate = (date: string) => {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
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

  // Only start auto-advance after hydration
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      if (mounted) {
        paginate(1);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [mounted]);

  const currentNote = patchNotes[currentIndex];

  // Extract first section of content for preview
  const previewContent = currentNote?.content?.split("<br><br>")[0]?.replace(/<h3>.*?<\/h3>/, '');

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
            className="absolute inset-0 p-4 sm:p-6 lg:p-10 flex flex-col"
          >
            <div className="flex-1 flex flex-col">
              <div className="space-y-3 sm:space-y-4 pb-4 sm:pb-6">
                <div className="flex items-center justify-between">
                  <Text
                    variant="h3"
                    className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  >
                    {currentNote.title}
                  </Text>
                  <Text
                    color="secondary"
                    className="text-sm bg-background/40 px-3 py-1 rounded-full"
                  >
                    {formatDate(currentNote.date)}
                  </Text>
                </div>
                <div className="border-t border-border/50" />
              </div>

              <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin">
                {mounted ? (
                  <div 
                    className="prose prose-invert max-w-none prose-sm"
                    dangerouslySetInnerHTML={{ __html: previewContent || '' }} 
                  />
                ) : (
                  <div className="prose prose-invert max-w-none prose-sm">
                    {previewContent?.replace(/<[^>]*>/g, '') || ''}
                  </div>
                )}
                {currentNote.url && (
                  <div className="pt-4">
                    <Link
                      href={currentNote.url}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium bg-background/30 px-3 py-1.5 rounded-full"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
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
