"use client";

import { ArrowRight, BookOpen, Calendar, Clock, Users, Video } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PatchNotesCarousel } from "~/components/news/PatchNotesCarousel";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";
import { NewsService } from "~/services/news-service";
import type { PatchNote } from "~/types/news";

export function PatchNotesSection() {
  const [patchNotes, setPatchNotes] = useState<PatchNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatchNotes = async () => {
      try {
        const notes = await NewsService.getPatchNotes();
        console.log("Loaded patch notes:", notes); // Debug log
        if (Array.isArray(notes) && notes.length > 0) {
          setPatchNotes(notes);
        } else {
          console.warn("No patch notes found or invalid format");
        }
      } catch (error) {
        console.error("Failed to load patch notes:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPatchNotes();
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

  interface Update {
    type: "event" | "community" | "guide" | "stream";
    title: string;
    date: string;
    description: string;
    tag: string;
  }

  const getUpdateIcon = (type: Update["type"]) => {
    switch (type) {
      case "event":
        return Calendar;
      case "community":
        return Users;
      case "guide":
        return BookOpen;
      case "stream":
        return Video;
    }
  };

  const getTagStyle = (type: Update["type"]) => {
    switch (type) {
      case "event":
        return "bg-primary/10 text-primary border-primary/20";
      case "community":
        return "bg-accent/10 text-accent border-accent/20";
      case "guide":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "stream":
        return "bg-damage-chaos-light/10 text-damage-chaos-light border-damage-chaos-light/20";
    }
  };

  const recentUpdates: Update[] = [
    {
      type: "event",
      title: "Season Launch Event",
      date: "2024-03-15",
      description: "Join us for the launch of the new season with exclusive rewards",
      tag: "Upcoming",
    },
    {
      type: "community",
      title: "Community Challenge",
      date: "2024-03-10",
      description: "Complete special objectives to unlock community rewards",
      tag: "Active",
    },
    {
      type: "guide",
      title: "New Player Guide",
      date: "2024-03-08",
      description: "Essential tips and tricks for new players",
      tag: "Guide",
    },
    {
      type: "stream",
      title: "Developer Stream",
      date: "2024-03-05",
      description: "Q&A session with the development team",
      tag: "VOD",
    },
  ];

  return (
    <div className="space-y-16 py-24">
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
              {recentUpdates.map((update, index) => {
                const Icon = getUpdateIcon(update.type);
                const tagStyle = getTagStyle(update.type);

                return (
                  <div key={index} className="group">
                    <Link href="#" className="block">
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
                                {update.tag}
                              </span>
                            </div>
                            <Text color="secondary" className="text-sm line-clamp-2 mb-2">
                              {update.description}
                            </Text>
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-border" />
                              <Text color="secondary" className="text-xs">
                                {new Date(update.date).toLocaleDateString()}
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
