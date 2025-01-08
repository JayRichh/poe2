"use client";

import { ArrowUpRight } from "lucide-react";

import { useEffect, useState } from "react";

import { cn } from "~/utils/cn";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-4 right-4 p-2 rounded-lg bg-accent/5 backdrop-blur-sm border border-accent/20",
        "hover:border-accent/40 text-foreground/70 hover:text-foreground/90 transition-all",
        "hover:shadow-accent/10 z-50 flex items-center gap-1",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <ArrowUpRight className="w-4 h-4" />
      <span className="text-sm">Top</span>
    </button>
  );
}
