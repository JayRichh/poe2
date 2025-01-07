"use client";

import { ArrowRight, BookOpen, Calendar, Clock, Users, Video } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PatchNotesCarousel } from "~/components/news/PatchNotesCarousel";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";
import { NewsService } from "~/services/news-service";
import type { NewsPost, PatchNote } from "~/types/news";

export function PatchNotesSection() {
  const [patchNotes, setPatchNotes] = useState<PatchNote[]>([]);
  const [recentUpdates, setRecentUpdates] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [patchNotesResponse, recentUpdatesResponse] = await Promise.all([
          NewsService.getPatchNotes({ itemsPerPage: 5 }),
          NewsService.getLatestNews({ timeRange: '30d', itemsPerPage: 4 })
        ]);

        if (patchNotesResponse.items.length > 0) {
          setPatchNotes(patchNotesResponse.items);
        }
        if (recentUpdatesResponse.items.length > 0) {
          setRecentUpdates(recentUpdatesResponse.items);
        }
      } catch (error) {
        console.error("Failed to load updates:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (!patchNotes.length && !loading) {
    return (
      <div className="space-y-16">
        <div className="text-center space-y-4 flex flex-col pb-12">
          <Text
            variant="h1"
            className="text-4xl font-bold w-full tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
          >
            Latest Updates
          </Text>
          <Text variant="body-lg" color="secondary" className="text-lg leading-relaxed">
            No patch notes available at the moment. Check back soon for updates.
          </Text>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-16">
        <div className="text-center space-y-4 flex flex-col pb-12">
          <Text
            variant="h1"
            className="text-4xl font-bold w-full tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
          >
            Latest Updates
          </Text>
          <Text variant="body-lg" color="secondary" className="text-lg leading-relaxed">
            Stay informed about the latest Path of Exile 2 patch notes and updates.
          </Text>
        </div>
        <div className="w-full h-[400px] animate-pulse bg-card/50 rounded-xl" />
      </div>
    );
  }

  const getUpdateIcon = (type: NewsPost['type']) => {
    switch (type) {
      case "announcement":
        return Calendar;
      case "patch-note":
        return BookOpen;
      default:
        return Clock;
    }
  };

  const getTagStyle = (type: NewsPost['type']) => {
    switch (type) {
      case "announcement":
        return "bg-primary/10 text-primary border-primary/20";
      case "patch-note":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-secondary/10 text-secondary border-secondary/20";
    }
  };

  const getTagText = (type: NewsPost['type']) => {
    switch (type) {
      case "announcement":
        return "Announcement";
      case "patch-note":
        return "Patch Note";
      default:
        return "Update";
    }
  };

  return (
    <div className="space-y-12 py-16">
      <div className="text-center space-y-4 flex flex-col pb-12">
        <Text
          variant="h1"
          className="text-4xl font-bold w-full tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
        >
          Latest Updates
        </Text>
        <Text variant="body-lg" color="secondary" className="text-lg leading-relaxed">
          Stay informed about the latest Path of Exile 2 patch notes and updates.
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[450px]">
        <div className="lg:col-span-2 h-full">
          <div className="h-full">
            <PatchNotesCarousel patchNotes={patchNotes} />
          </div>
        </div>

        <div className="h-full">
          <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl p-6 space-y-6 shadow-lg h-full">
            <div className="flex items-center justify-between">
              <Text
                variant="h3"
                className="text-xl font-semibold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                Recent Updates
              </Text>
              <Clock className="w-5 h-5 text-muted-foreground/60" />
            </div>
            <div className="space-y-4">
              {recentUpdates.map((update) => {
                const Icon = getUpdateIcon(update.type);
                const tagStyle = getTagStyle(update.type);
                const tagText = getTagText(update.type);

                return (
                  <div key={update.id} className="group">
                    <Link href={NewsService.getNewsUrl(update)} className="block">
                      <div className="relative p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all border border-border/50 hover:border-border group-hover:shadow-md">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Icon className="w-5 h-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2 mb-2">
                              <Text className="font-medium group-hover:text-primary transition-colors truncate">
                                {update.title}
                              </Text>
                              <span
                                className={`shrink-0 px-2 py-1 text-xs rounded-full border ${tagStyle}`}
                              >
                                {tagText}
                              </span>
                            </div>
                            <Text color="secondary" className="text-sm line-clamp-2 mb-2">
                              {update.processedContent}
                            </Text>
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-border" />
                              <Text color="secondary" className="text-xs">
                                {(() => {
                                  const d = new Date(update.date);
                                  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
                                })()}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex justify-center">
        <Link href="/news">
          <Button variant="secondary" size="lg" className="px-8 py-4 flex items-center gap-2">
            View All Updates
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
