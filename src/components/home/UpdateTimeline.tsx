"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import Link from "next/link";

import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

import { cn } from "~/utils/cn";

import {
  POE2_MILESTONES,
  POE2_VERSIONS,
  type Poe2Version,
} from "./poe2-timeline";

function TimelineEntry({
  entry,
  index,
  reduceMotion,
}: {
  entry: Poe2Version;
  index: number;
  reduceMotion: boolean;
}) {
  const isCurrent = Boolean(entry.current);

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
      className="relative pl-12 sm:pl-16"
    >
      {/* Node marker on the rail */}
      <span
        aria-hidden
        className={cn(
          "absolute left-[14px] sm:left-[18px] top-1.5 z-10 -translate-x-1/2 rounded-full ring-4 ring-background",
          isCurrent
            ? "h-4 w-4 bg-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.25),0_0_14px_2px_hsl(var(--primary)/0.55)]"
            : "h-3 w-3 bg-border-secondary"
        )}
      />

      <div
        className={cn(
          "rounded-xl border bg-background/80 p-5 backdrop-blur-sm transition-colors sm:p-6",
          isCurrent
            ? "border-primary/40 shadow-[0_0_24px_-12px_hsl(var(--primary)/0.6)]"
            : "border-border/50 hover:border-border"
        )}
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="numeric font-display text-2xl font-bold text-gilded">
            {entry.version}
          </span>
          <span className="text-sm font-medium text-foreground-secondary">{entry.date}</span>
          {isCurrent && (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" aria-hidden />
              Live now
            </span>
          )}
        </div>

        <Text className="mt-1 font-display text-lg font-semibold text-foreground">
          {entry.codename}
        </Text>
        {entry.league && entry.league !== entry.codename && (
          <Text className="text-sm text-accent/90">{entry.league} league</Text>
        )}

        <ul className="mt-3 space-y-2">
          {entry.headlines.map((headline) => (
            <li key={headline} className="flex gap-2.5 text-sm text-foreground-secondary">
              <span
                aria-hidden
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
              />
              <span className="leading-relaxed">{headline}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

export function UpdateTimeline() {
  const reduceMotion = useReducedMotion() ?? false;
  // Newest first — lead the showcase on the current patch.
  const entries = [...POE2_VERSIONS].reverse();

  return (
    <section className="w-full py-12 md:py-16" aria-labelledby="update-timeline-heading">
      <Container className="max-w-5xl px-6 md:px-8 lg:px-10">
        <div className="mb-3 flex items-center gap-3">
          <div className="rule-gold w-10 shrink-0" aria-hidden />
          <Text className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/90">
            Early Access · Data {POE2_MILESTONES.dataVersion}
          </Text>
        </div>

        <Text
          id="update-timeline-heading"
          variant="h2"
          className="font-display tracking-tight text-gilded"
        >
          Updates over the years
        </Text>
        <Text variant="body-lg" color="secondary" className="mt-3 max-w-2xl leading-relaxed">
          From the December 2024 Early Access launch to{" "}
          <span className="font-semibold text-foreground">
            0.5.0 &ldquo;Return of the Ancients&rdquo;
          </span>{" "}
          — every major patch that reshaped Path of Exile 2 on the road to its 1.0 launch.
        </Text>

        {/* The signature element: a single gilded rail threading the patches. */}
        <ol className="relative mt-10 space-y-6">
          <span
            aria-hidden
            className="absolute left-[14px] sm:left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/70 via-border-secondary/60 to-transparent"
          />
          {entries.map((entry, index) => (
            <TimelineEntry
              key={entry.version}
              entry={entry}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}

          {/* Forward-looking 1.0 cap on the rail. */}
          <li className="relative pl-12 sm:pl-16">
            <span
              aria-hidden
              className="absolute left-[14px] sm:left-[18px] top-1.5 z-10 -translate-x-1/2 rounded-full border-2 border-dashed border-primary/60 bg-background"
              style={{ height: 16, width: 16 }}
            />
            <div className="rounded-xl border border-dashed border-primary/30 bg-primary/[0.04] p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="numeric font-display text-2xl font-bold text-primary/80">1.0</span>
                <span className="text-sm font-medium text-foreground-secondary">
                  {POE2_MILESTONES.fullLaunchTarget}
                </span>
              </div>
              <Text className="mt-1 font-display text-lg font-semibold text-foreground">
                Full Launch
              </Text>
              <Text className="mt-2 text-sm text-foreground-secondary">
                6-act campaign, the largest balance pass yet. {POE2_MILESTONES.fullLaunchNote}{" "}
                <span className="text-foreground/80">{POE2_MILESTONES.exileCon}.</span>
              </Text>
            </div>
          </li>
        </ol>

        <div className="mt-8 flex justify-center">
          <Link
            href="/news/patch-notes"
            className="group inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/80 px-6 py-3 text-base font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Read the patch notes
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
