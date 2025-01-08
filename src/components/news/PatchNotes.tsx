"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "~/utils/cn";
import type { NewsPost } from "~/types/news";
import { NewsService } from "~/services/news-service";
import { Text } from "../ui/Text";
import { useRouter, useSearchParams } from "next/navigation";

interface PatchNotesProps {
  patchNotes: NewsPost[];
}

function formatDate(date: string) {
  const d = new Date(date);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function PatchNoteContent({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const previewLimit = 1000;
  
  // Enable client-side features after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Find a suitable breakpoint for the preview that doesn't cut HTML tags
  const findBreakpoint = (text: string, limit: number) => {
    const breakpoints = ['</p>', '</li>', '</ul>', '</ol>', '<br>', '<br/>', '<br />'];
    let cutoff = limit;
    
    for (const bp of breakpoints) {
      const pos = text.indexOf(bp, limit - 100);
      if (pos !== -1 && pos < limit + 100) {
        cutoff = pos + bp.length;
        break;
      }
    }
    return cutoff;
  };

  const cutoff = findBreakpoint(content, previewLimit);
  const hasMore = content.length > cutoff;
  const initialContent = hasMore ? content.slice(0, cutoff) + "..." : content;

  return (
    <div className="space-y-3">
      <div 
        className="prose prose-sm max-w-none prose-invert prose-headings:mt-6 prose-headings:mb-4 prose-p:my-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-2 [&_br]:content-[''] [&_br]:block [&_br]:my-4"
        dangerouslySetInnerHTML={{ 
          __html: (isClient && expanded ? content : initialContent)
            .replace(/\n/g, '<br/>')
            .replace(/<br\/?>\s*<br\/?>/g, '</p><p>')
            .replace(/<br\/?>\s*<(h[1-6]|ul|ol|li)/g, '<$1')
            .replace(/<\/(h[1-6]|ul|ol|li)>\s*<br\/?>/g, '</$1>')
        }}
      />
      {hasMore && isClient && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export function PatchNotes({ patchNotes }: PatchNotesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/news/patch-notes?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      {patchNotes.map((note, index) => (
        <div
          key={note.id}
          className={cn("space-y-6", index !== 0 && "pt-8 border-t border-border/30")}
        >
          <Link
            href={NewsService.getNewsUrl(note)}
            className="group block"
          >
            <div className="flex items-center justify-between">
              <Text variant="h4" className="font-medium group-hover:text-primary transition-colors">
                {note.title}
              </Text>
              <Text className="text-sm text-foreground/60">
                {formatDate(note.date)}
              </Text>
            </div>
          </Link>

          {note.imageUrl && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={note.imageUrl}
                alt={note.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <PatchNoteContent content={note.content} />

          <div className="flex items-center justify-between text-sm text-foreground/60">
            <div>Posted by {note.author}</div>
            {note.replies ? (
              <div>{note.replies} replies</div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
