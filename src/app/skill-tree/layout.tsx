"use client";

import { HydrationBoundary, dehydrate, useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";

import { TreeDataPrefetcher } from "./components/TreeDataPrefetcher";
import "./styles/skill-tree.css";

export default function SkillTreeLayout({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  // Handle mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      // Update viewport height for mobile browsers
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TreeDataPrefetcher />
      <div
        className="flex flex-col w-full overflow-hidden bg-background"
        style={{
          height: "calc((var(--vh, 0vh) * 100) - 4rem)",
        }}
      >
        <div className="flex-1 relative">{children}</div>
      </div>
    </HydrationBoundary>
  );
}
