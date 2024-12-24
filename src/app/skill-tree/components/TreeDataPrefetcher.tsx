"use client";

import { useEffect, useRef } from "react";

import { useTreeDataOperations } from "../hooks/useTreeData";

export function TreeDataPrefetcher() {
  const { prefetchTreeData } = useTreeDataOperations();
  const hasPrefetched = useRef(false);

  useEffect(() => {
    if (hasPrefetched.current) return;

    hasPrefetched.current = true;
    prefetchTreeData().catch((error) => {
      console.error("Failed to prefetch tree data:", error);
      hasPrefetched.current = false;
    });
  }, [prefetchTreeData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      hasPrefetched.current = false;
    };
  }, []);

  return null;
}
