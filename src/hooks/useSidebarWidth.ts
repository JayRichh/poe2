import { useEffect, useState } from "react";

import { useHeaderScroll } from "./useHeaderScroll";

export function useSidebarWidth() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(320); // 20rem = 320px
  const headerVisible = useHeaderScroll();

  useEffect(() => {
    function updateWidth() {
      const width = window.innerWidth;
      if (width < 768) {
        // mobile
        setSidebarWidth(0);
      } else {
        // desktop
        setSidebarWidth(isCollapsed ? 44 : 320); // 44px when collapsed (2.75rem)
      }
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isCollapsed]);

  return {
    width: `${sidebarWidth}px`,
    className: `${sidebarWidth === 0 ? "hidden md:block" : ""} transition-all duration-300`,
    isCollapsed,
    toggleCollapse: () => setIsCollapsed((prev) => !prev),
    // Add top offset based on header visibility, accounting for subnav
    topOffset: headerVisible ? "top-[104px] sm:top-[112px]" : "top-12",
    // Add container classes to match navigation
    containerClasses: "px-4 sm:px-6 lg:px-8",
    // Add specific padding for collapsed state
    headerPadding: isCollapsed ? "px-1.5" : "px-4",
  };
}
