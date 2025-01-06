"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Loader2, Search as SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/Button";
import { searchContent, type SearchResult, type SearchSection } from "~/services/search-service";
import { sectionLabels } from "~/lib/shared/constants";
import { useSearch } from "~/contexts/search";
import { cn } from "~/utils/cn";

const dropdownVariants = {
  hidden: { opacity: 0, y: -4, scaleY: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.15, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -4,
    scaleY: 0.98,
    transition: { duration: 0.1, ease: "easeIn" }
  }
};

export function GlobalSearch() {
  const router = useRouter();
  const { query, setQuery, currentSection, searchMode, setSearchMode, setIsSearching: setContextIsSearching } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
      }
      if (isOpen && searchResults.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex(prev => prev < searchResults.length - 1 ? prev + 1 : 0);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : searchResults.length - 1);
        }
        if (e.key === "Enter" && selectedIndex >= 0) {
          e.preventDefault();
          handleSelect(searchResults[selectedIndex].url);
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, searchResults, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchResults]);

  useEffect(() => {
    const doSearch = async () => {
      if (!query) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      setContextIsSearching(true);
      try {
        const results = await searchContent(query, {
          section: searchMode === "section" && currentSection !== "home" 
            ? currentSection as SearchResult["section"] 
            : undefined,
          limit: 10
        });
        setSearchResults(results);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
        setContextIsSearching(false);
      }
    };
    const timeoutId = setTimeout(doSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [query, currentSection, searchMode, setContextIsSearching]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(-1);
    inputRef.current?.blur();
  }, [setQuery]);

  const handleSelect = useCallback((url: string) => {
    router.push(url);
    setTimeout(handleClose, 100);
  }, [router, handleClose]);

  const handleFocus = useCallback(() => setIsOpen(true), []);

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isOpen, handleClose]);

  const handleBlur = useCallback((e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || !componentRef.current?.contains(relatedTarget)) {
      handleClose();
    }
  }, [handleClose]);

  return (
    <div className="relative" ref={componentRef}>
      <Command className="relative w-full" role="search" aria-label="Global search">
        <div
          className={cn(
            "w-full rounded-md border transition-colors duration-150",
            "bg-background",
            isOpen ? "border-primary/50 shadow-sm" : "border-border/50"
          )}
        >
          <div className="flex items-center px-3 py-2">
            <div className="flex items-center gap-2 flex-1">
              <SearchIcon 
                className={cn(
                  "h-4 w-4 shrink-0",
                  isOpen ? "text-primary" : "text-muted-foreground"
                )}
                aria-hidden="true"
              />
              <div className="flex items-center gap-2 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchMode(searchMode === "all" ? "section" : "all")}
                  className={cn(
                    "h-6 px-2 text-xs rounded-md",
                    "hover:bg-primary/5 active:bg-primary/10",
                    "transition-colors duration-150",
                    searchMode === "all" ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {searchMode === "all" || !sectionLabels[currentSection as SearchSection] 
                    ? "All" 
                    : sectionLabels[currentSection as SearchSection]
                  }
                </Button>
                <Command.Input
                  ref={inputRef}
                  className={cn(
                    "flex h-7 w-full",
                    "bg-transparent text-sm outline-none",
                    "placeholder:text-muted-foreground/60",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "pl-2 pr-4"
                  )}
                  placeholder={`Search ${
                    searchMode === "all" || !sectionLabels[currentSection as SearchSection]
                      ? "everything"
                      : sectionLabels[currentSection as SearchSection]
                  }... (⌘K)`}
                  value={query}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onValueChange={setQuery}
                  aria-expanded={isOpen}
                  aria-controls="search-results"
                  aria-activedescendant={selectedIndex >= 0 ? `result-${searchResults[selectedIndex].id}` : undefined}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden="true" />
              ) : query ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className={cn(
                    "h-6 w-6 rounded-md",
                    "hover:bg-primary/5 active:bg-primary/10",
                    "transition-colors duration-150"
                  )}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              {!query && (
                <Command.List
                  className={cn(
                    "absolute top-full left-0 right-0 z-[30]",
                    "mt-1 overflow-hidden",
                    "rounded-md border border-border/50",
                    "bg-background shadow-sm"
                  )}
                >
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="py-1"
                  >
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                      Quick Search
                    </div>
                    <Command.Item
                      className={cn(
                        "flex items-center gap-2 px-2 py-1.5",
                        "text-sm cursor-pointer",
                        "hover:bg-primary/5 active:bg-primary/10",
                        "transition-colors duration-150"
                      )}
                      onSelect={() => setSearchMode("all")}
                    >
                      <SearchIcon className="h-4 w-4" />
                      Search all content
                    </Command.Item>
                    <Command.Item
                      className={cn(
                        "flex items-center gap-2 px-2 py-1.5",
                        "text-sm cursor-pointer",
                        "hover:bg-primary/5 active:bg-primary/10",
                        "transition-colors duration-150"
                      )}
                      onSelect={() => setSearchMode("section")}
                    >
                      <SearchIcon className="h-4 w-4" />
                      Search current section
                    </Command.Item>
                  </motion.div>
                </Command.List>
              )}

              {query && !isSearching && (
                <Command.List
                  id="search-results"
                  className={cn(
                    "absolute top-full left-0 right-0 z-[30]",
                    "mt-1 max-h-[60vh] overflow-y-auto",
                    "rounded-md border border-border/50",
                    "bg-background shadow-sm",
                    "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/50"
                  )}
                >
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="p-1"
                  >
                    <Command.Group>
                      {searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                          <Command.Item
                            key={`${result.section}-${result.id}`}
                            id={`result-${result.section}-${result.id}`}
                            value={result.title}
                            onSelect={() => handleSelect(result.url)}
                            className={cn(
                              "flex flex-col gap-1 px-2 py-2",
                              "rounded-md cursor-pointer",
                              "transition-colors duration-150",
                              "hover:bg-primary/5 active:bg-primary/10",
                              selectedIndex === index && "bg-primary/10"
                            )}
                            aria-selected={selectedIndex === index}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <span className="font-medium truncate">{result.title}</span>
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                "bg-primary/5 text-primary",
                                "whitespace-nowrap"
                              )}>
                                {sectionLabels[result.section]}
                              </span>
                            </div>
                            {result.matches.slice(0, 2).map((match, matchIndex) => (
                              <div key={matchIndex} className="text-sm text-muted-foreground">
                                {match.context && (
                                  <span className="text-xs text-primary/70 mr-1">
                                    {match.context}:
                                  </span>
                                )}
                                <span className="line-clamp-1">{match.text}</span>
                              </div>
                            ))}
                            {result.matches.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{result.matches.length - 2} more matches
                              </span>
                            )}
                          </Command.Item>
                        ))
                      ) : (
                        <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                          No results found
                        </div>
                      )}
                    </Command.Group>
                  </motion.div>
                </Command.List>
              )}
            </>
          )}
        </AnimatePresence>
      </Command>
    </div>
  );
}
