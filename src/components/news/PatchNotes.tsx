"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useState } from "react";

import Link from "next/link";

import { cn } from "~/utils/cn";

import type { PatchNote, PatchNoteHotfix, PatchNoteSection } from "~/types/news";

import { Text } from "../ui/Text";

interface PatchNotesProps {
  patchNotes: PatchNote[];
}

function PatchNoteChanges({ changes }: { changes: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const previewLimit = 5;
  const hasMore = changes.length > previewLimit;
  const visibleChanges = expanded ? changes : changes.slice(0, previewLimit);

  return (
    <div className="space-y-3">
      <ul className="space-y-1.5 list-disc list-inside text-sm text-foreground/80">
        {visibleChanges.map((change, i) => (
          <li key={i} className="leading-relaxed">
            {change}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          {expanded ? "Show Less" : `Show ${changes.length - previewLimit} More Changes`}
        </button>
      )}
    </div>
  );
}

function PatchNoteSection({ section }: { section: PatchNoteSection }) {
  return (
    <div className="space-y-2">
      <Text className="text-sm font-medium text-primary">{section.title}</Text>
      <PatchNoteChanges changes={section.changes} />
    </div>
  );
}

function PatchNoteHotfix({ hotfix }: { hotfix: PatchNoteHotfix }) {
  return (
    <div className="space-y-2 pl-4 border-l-2 border-primary/20">
      <div className="flex items-center justify-between">
        <Text className="text-sm font-medium text-primary/80">Hotfix {hotfix.version}</Text>
        <Text className="text-sm text-foreground/60">
          {new Date(hotfix.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </Text>
      </div>
      <PatchNoteChanges changes={hotfix.changes} />
    </div>
  );
}

export function PatchNotes({ patchNotes }: PatchNotesProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(patchNotes.length / itemsPerPage);

  const visibleNotes = patchNotes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="space-y-8">
      {visibleNotes.map((note, index) => (
        <div
          key={`${note.version}-${note.date}`}
          className={cn("space-y-6", index !== 0 && "pt-8 border-t border-border/30")}
        >
          <Link
            href={`/news/${note.url?.split("/").pop() || note.version}`}
            className="group block"
          >
            <div className="flex items-center justify-between">
              <Text variant="h4" className="font-medium group-hover:text-primary transition-colors">
                Version {note.version}
              </Text>
              <Text className="text-sm text-foreground/60">
                {new Date(note.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </div>
          </Link>

          {/* Content (new format) */}
          {note.content && (
            <div className="space-y-4">
              <PatchNoteChanges changes={note.content} />
            </div>
          )}

          {/* Main Sections (legacy format) */}
          {note.sections && note.sections.length > 0 && (
            <div className="space-y-4">
              {note.sections.map((section, idx) => (
                <PatchNoteSection key={`${section.title}-${idx}`} section={section} />
              ))}
            </div>
          )}

          {/* Hotfixes (legacy format) */}
          {note.hotfixes && note.hotfixes.length > 0 && (
            <div className="space-y-4 mt-4">
              <Text className="text-sm font-medium text-foreground/70">Hotfixes</Text>
              {note.hotfixes.map((hotfix, idx) => (
                <PatchNoteHotfix key={`${hotfix.version}-${idx}`} hotfix={hotfix} />
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border/30 pt-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={cn(
              "flex items-center gap-1 px-3 py-2 text-sm rounded-md",
              "hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <div className="text-sm text-foreground/60">
            Page {page} of {totalPages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={cn(
              "flex items-center gap-1 px-3 py-2 text-sm rounded-md",
              "hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
