"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TreeData } from "../components/TreeViewer/data";
import { loadTreeData } from "../utils/loadTreeData";

const TREE_DATA_KEY = ["skill-tree", "data"] as const;

export function useTreeData() {
  return useQuery({
    queryKey: TREE_DATA_KEY,
    queryFn: loadTreeData,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
    enabled: true,
  });
}

export function useTreeDataOperations() {
  const queryClient = useQueryClient();

  return {
    prefetchTreeData: async () => {
      const cachedData = queryClient.getQueryData(TREE_DATA_KEY);
      if (cachedData) return;

      await queryClient.prefetchQuery({
        queryKey: TREE_DATA_KEY,
        queryFn: loadTreeData,
        staleTime: Infinity,
        gcTime: Infinity,
      });
    },
    getTreeDataFromCache: (): TreeData | undefined => {
      return queryClient.getQueryData(TREE_DATA_KEY);
    },
    invalidateTreeData: () => {
      return queryClient.invalidateQueries({ queryKey: TREE_DATA_KEY });
    }
  };
}
