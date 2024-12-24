"use client";

import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "~/utils/cn";

export interface Section {
  id: string;
  name: string;
  content: string;
  isExpanded?: boolean;
  lastSaved?: string;
}

interface NotesSectionsProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sections: Section[]) => void;
  onActiveChange: (sectionId: string) => void;
  onToggleExpand: (sectionId: string) => void;
}

export function NotesSections({
  sections,
  activeSection,
  onSectionChange,
  onActiveChange,
  onToggleExpand,
}: NotesSectionsProps) {
  return (
    <div className="space-y-1">
      {sections.map((section) => (
        <div key={section.id} className="border-b border-border/30 last:border-0">
          <button
            onClick={() => onToggleExpand(section.id)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors group",
              section.isExpanded ? "text-foreground" : "text-foreground/70 hover:text-foreground"
            )}
          >
            <span className="truncate">{section.name}</span>
            <div className="flex items-center gap-2">
              {section.lastSaved && (
                <span className="text-xs text-foreground/40 group-hover:text-foreground/60">
                  {new Date(section.lastSaved).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
              {section.isExpanded ? (
                <ChevronDown className="w-4 h-4 opacity-70" />
              ) : (
                <ChevronRight className="w-4 h-4 opacity-70" />
              )}
            </div>
          </button>

          {section.isExpanded && (
            <div className="pb-2">
              <button
                onClick={() => onActiveChange(section.id)}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm rounded-lg transition-colors mx-2",
                  activeSection === section.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                )}
              >
                Edit Section
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
