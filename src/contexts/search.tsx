"use client";

import { createContext, useContext, useState, useEffect, type ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import type { SearchSection } from "~/services/search-service";
import { sectionLabels } from "~/lib/shared/constants";

type SearchMode = "all" | "section";

interface SearchContextType {
  query: string;
  currentSection: SearchSection | "home";
  setQuery: (query: string) => void;
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
  searchMode: SearchMode;
  setSearchMode: (mode: SearchMode) => void;
  resetSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchMode>("section");
  const pathname = usePathname();

  // Reset search state
  const resetSearch = () => {
    setQuery("");
    setIsSearching(false);
    setSearchMode("section");
  };

  // Reset search mode when changing sections
  useEffect(() => {
    setSearchMode("section");
  }, [pathname]);

  // Determine current section from pathname
  const currentSection = useMemo(() => {
    const section = pathname.split("/")[1];
    if (!section || section === "") return "home";
    
    // Handle nested routes
    if (section === "news" && pathname.includes("patch-notes")) {
      return "patch-notes" as SearchSection;
    }
    
    // Validate section is a valid SearchSection
    return (Object.keys(sectionLabels).includes(section) ? section : "home") as SearchSection | "home";
  }, [pathname]);

  const contextValue = useMemo<SearchContextType>(() => ({
    query,
    setQuery,
    currentSection,
    isSearching,
    setIsSearching,
    searchMode,
    setSearchMode,
    resetSearch
  }), [query, currentSection, isSearching, searchMode]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
