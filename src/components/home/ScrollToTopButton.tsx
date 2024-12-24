"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "~/components/ui/Button";

const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.body) : null;
};

export function ScrollToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || 0;
      setShowScrollTop(scrollPos > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showScrollTop && (
        <Portal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-10 right-10 z-50"
          >
            <Button
              onClick={scrollToTop}
              variant="secondary"
              className="flex items-center gap-2 bg-background/50 hover:bg-background/80 border-border/50 hover:border-accent/50 shadow-lg backdrop-blur-sm transition-all"
            >
              <ArrowUp className="w-4 h-4" />
              Top
            </Button>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
}
