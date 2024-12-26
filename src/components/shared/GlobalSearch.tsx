"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import { ChevronDown, ChevronUp, Loader2, Search as SearchIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { useSearch } from "~/contexts/search";
import { cn } from "~/utils/cn";
import { Button } from "~/components/ui/Button";
import { searchContent, type SearchResult, type SearchSection } from "~/services/search-service";
import { sectionLabels } from "~/lib/shared/constants";

const dropdownVariants = {
  hidden: { opacity: 0, y: -5, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: { 
    opacity: 0, 
    y: -5, 
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

export function GlobalSearch() {
  const router = useRouter();
  const { 
    query, 
    setQuery, 
    currentSection,
    searchMode,
    setSearchMode,
    isSearching: contextIsSearching,
    setIsSearching: setContextIsSearching
  } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Handle keyboard shortcut and navigation
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
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
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

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchResults]);

  // Handle search
  useEffect(() => {
    const doSearch = async () => {
      if (!query) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      setContextIsSearching(true);
      try {
        // Only search if we're in "all" mode or if current section is a valid SearchSection
        const results = await searchContent(query, {
          section: searchMode === "section" && currentSection !== "home" 
            ? currentSection as SearchResult["section"] 
            : undefined,
          limit: 10,
        });
        setSearchResults(results);
      } catch (error) {
        console.error("Search failed:", error);
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

  const handleSelect = useCallback(
    (url: string) => {
      // Navigate first, then close with a small delay
      router.push(url);
      setTimeout(handleClose, 100);
    },
    [router, handleClose]
  );

  // Handle focus events
  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const componentRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (componentRef.current && !componentRef.current.contains(target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen, handleClose]);

  const handleBlur = useCallback((e: React.FocusEvent) => {
    // Only handle blur if it's not from clicking inside the component
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || !componentRef.current?.contains(relatedTarget)) {
      handleClose();
    }
  }, [handleClose]);


  return (
    <div className="relative z-50" ref={componentRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-[2px]"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          scale: isOpen ? 1.02 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <Command 
          className={cn(
            "relative w-full group",
            "transition-all duration-200 ease-in-out"
          )} 
          role="search" 
          aria-label="Global search"
        >
          <div
            className={cn(
              "w-full rounded-md border",
              "ring-offset-background",
              "transition-shadow duration-200",
              isOpen && "ring-2 ring-primary/20 ring-offset-2 shadow-lg",
                  isOpen ? "bg-background border-primary/20" : "bg-background/80 border-border/30"
            )}
          >
            <div className="flex items-center px-3 py-2">
              <div className="flex items-center gap-2 flex-1">
                <SearchIcon 
                  className={cn(
                    "h-4 w-4 shrink-0",
                    "text-muted-foreground transition-colors",
                    "group-focus-within:text-primary"
                  )} 
                  aria-hidden="true"
                />
                <div className="flex items-center gap-2 flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchMode(searchMode === "all" ? "section" : "all")}
                    className={cn(
                      "h-6 px-2 text-xs",
                      "hover:bg-primary/10",
                      "transition-colors duration-200",
                      searchMode === "all" ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {searchMode === "all" || !sectionLabels[currentSection as SearchSection] ? "All" : sectionLabels[currentSection as SearchSection]}
                  </Button>
                  <Command.Input
                    ref={inputRef}
                    className={cn(
                      "flex h-7 w-full bg-transparent text-sm outline-none",
                      "placeholder:text-muted-foreground",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      "pl-2 pr-4"
                    )}
                    placeholder={`Search ${searchMode === "all" || !sectionLabels[currentSection as SearchSection] ? "everything" : sectionLabels[currentSection as SearchSection]}... (⌘K)`}
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
                  <Loader2 
                    className="h-4 w-4 animate-spin text-muted-foreground" 
                    aria-hidden="true"
                  />
                ) : query ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    className={cn(
                      "h-6 w-6 hover:bg-primary/10",
                      "transition-colors duration-200"
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
            {isOpen && query && !isSearching && (
              <Command.List 
                id="search-results"
                className={cn(
                  "absolute top-full left-0 right-0 z-50",
                  "max-h-[60vh] overflow-y-auto scrollbar-thin",
                  "p-1.5 mt-1",
                  "bg-background shadow-xl",
                  "border border-border/30 rounded-md",
                  "shadow-lg shadow-black/10",
                  "divide-y divide-border/30"
                )}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
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
                            "flex flex-col gap-0.5 p-2 -mx-1 first:mt-0",
                            "rounded-md cursor-pointer",
                            "transition-colors duration-150",
                            "hover:bg-primary/5",
                            selectedIndex === index && "bg-primary/10",
                            "focus:outline-none focus:bg-primary/10"
                          )}
                          aria-selected={selectedIndex === index}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-medium truncate">
                              {result.title}
                            </span>
                            <span className={cn(
                              "text-xs px-1.5 py-0.5 rounded-full",
                              "bg-primary/10 text-primary-foreground",
                              "whitespace-nowrap"
                            )}>
                              {sectionLabels[result.section]}
                            </span>
                          </div>
                          {result.matches.map((match, matchIndex) => (
                            <div 
                              key={matchIndex}
                              className="text-sm text-muted-foreground"
                            >
                              {match.context && (
                                <span className="text-xs text-primary/60 mr-1">
                                  {match.context}:
                                </span>
                              )}
                              <span className="line-clamp-1">
                                {match.text}
                              </span>
                            </div>
                          )).slice(0, 2) /* Show first 2 matches */}
                          {result.matches.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{result.matches.length - 2} more matches
                            </span>
                          )}
                        </Command.Item>
                      ))
                    ) : (
                      <div 
                        className="p-4 text-center text-sm text-muted-foreground"
                        role="status"
                      >
                        No results found
                      </div>
                    )}
                  </Command.Group>
                </motion.div>
              </Command.List>
            )}
          </AnimatePresence>
        </Command>
      </motion.div>
    </div>
  );
}
