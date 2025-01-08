import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { EquipmentSlot } from "~/lib/supabase/types";
import { itemsService } from "~/services/items-service";
import type { ItemBase, ItemModifier } from "~/types/itemTypes";

const ITEMS_QUERY_KEY = ["items"] as const;

async function initializeItemsData() {
  await itemsService.initialize();
  return true;
}

export function useItems() {
  return useQuery({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: initializeItemsData,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
  });
}

export function useItemsForSlot(slot: EquipmentSlot) {
  const { data: isInitialized } = useItems();

  return useQuery({
    queryKey: [...ITEMS_QUERY_KEY, "slot", slot],
    queryFn: () => itemsService.getItemsForSlot(slot),
    enabled: !!isInitialized,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useItemSearch(query: string) {
  const { data: isInitialized } = useItems();

  return useQuery({
    queryKey: [...ITEMS_QUERY_KEY, "search", query],
    queryFn: () => itemsService.searchItems(query),
    enabled: !!isInitialized && !!query.trim(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useModifiersForCategory(category: string) {
  const { data: isInitialized } = useItems();

  return useQuery({
    queryKey: [...ITEMS_QUERY_KEY, "modifiers", category],
    queryFn: () => itemsService.getModifiersForCategory(category),
    enabled: !!isInitialized && !!category,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useItemsOperations() {
  const queryClient = useQueryClient();

  return {
    prefetchItems: async () => {
      const cachedData = queryClient.getQueryData(ITEMS_QUERY_KEY);
      if (cachedData) return;

      await queryClient.prefetchQuery({
        queryKey: ITEMS_QUERY_KEY,
        queryFn: initializeItemsData,
        staleTime: Infinity,
        gcTime: Infinity,
      });
    },
    invalidateItems: () => {
      return queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  };
}
