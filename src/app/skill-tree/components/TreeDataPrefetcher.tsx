"use client";

import { useEffect } from "react";
import { useTreeDataOperations } from "../hooks/useTreeData";

export function TreeDataPrefetcher() {
  const { prefetchTreeData } = useTreeDataOperations();

  useEffect(() => {
    prefetchTreeData();
  }, [prefetchTreeData]);

  return null;
}
