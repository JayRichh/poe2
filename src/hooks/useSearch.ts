import { useQuery } from "@tanstack/react-query";
import { searchContent, type SearchOptions, type SearchResult } from "~/services/search-service";

export function useSearchQuery(query: string, options?: SearchOptions) {
  return useQuery<SearchResult[]>({
    queryKey: ["search", query, options?.section],
    queryFn: () => searchContent(query, options),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep unused data for 10 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
}
