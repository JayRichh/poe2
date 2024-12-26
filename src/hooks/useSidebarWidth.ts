import { useEffect, useState } from "react";

import { useHeaderScroll } from "./useHeaderScroll";

export function useSidebarWidth() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isMounted, setIsMounted] = useState(false);
  const headerVisible = useHeaderScroll();
  const COLLAPSED_WIDTH = 44; // 2.75rem
  const EXPANDED_WIDTH = 320; // 20rem
  const MOBILE_BREAKPOINT = 768;

  // Only run after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const updateWidth = () => {
      const width = window.innerWidth;
      const newWidth = width < MOBILE_BREAKPOINT 
        ? 0 
        : isCollapsed 
          ? COLLAPSED_WIDTH 
          : EXPANDED_WIDTH;
      
      if (newWidth !== sidebarWidth) {
        setSidebarWidth(newWidth);
      }
    };

    // Initial update
    updateWidth();

    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateWidth, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isCollapsed, sidebarWidth, isMounted]);

  // Default values for SSR
  if (!isMounted) {
    return {
      width: `${EXPANDED_WIDTH}px`,
      className: "transition-all duration-300 ease-in-out",
      isCollapsed: false,
      toggleCollapse: () => setIsCollapsed((prev) => !prev),
      topOffset: "top-12 transition-all duration-300 ease-in-out",
      containerClasses: "px-4 sm:px-6 lg:px-8",
      headerPadding: "px-4",
      isMobile: false
    };
  }

  return {
    width: `${sidebarWidth}px`,
    className: `${sidebarWidth === 0 ? "hidden md:block" : ""} transition-all duration-300 ease-in-out`,
    isCollapsed,
    toggleCollapse: () => setIsCollapsed((prev) => !prev),
    topOffset: headerVisible 
      ? "top-[104px] sm:top-[112px] transition-all duration-300 ease-in-out" 
      : "top-12 transition-all duration-300 ease-in-out",
    containerClasses: "px-4 sm:px-6 lg:px-8",
    headerPadding: isCollapsed ? "px-1.5" : "px-4",
    isMobile: typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  };
}
