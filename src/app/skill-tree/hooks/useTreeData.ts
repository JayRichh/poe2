"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TreeData } from "../components/TreeViewer/data";
import { loadTreeData } from "../utils/loadTreeData";

const TREE_DATA_KEY = "skill-tree-data";

export function useTreeData() {
  return useQuery({
    queryKey: [TREE_DATA_KEY],
    queryFn: loadTreeData,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export function useTreeDataOperations() {
  const queryClient = useQueryClient();

  return {
    prefetchTreeData: () => {
      return queryClient.prefetchQuery({
        queryKey: [TREE_DATA_KEY],
        queryFn: loadTreeData,
        staleTime: 24 * 60 * 60 * 1000,
      });
    },
    getTreeDataFromCache: (): TreeData | undefined => {
      return queryClient.getQueryData([TREE_DATA_KEY]);
    }
  };
}
