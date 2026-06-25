"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

interface ClassDistribution {
  className: string;
  count: number;
  percentage: number;
}

interface LadderStats {
  timestamp?: string;
  overall?: { total: number; distribution: ClassDistribution[] };
}

function formatAsOf(timestamp?: string): string | null {
  if (!timestamp) return null;
  const d = new Date(timestamp);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function BuildsPreviewSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const [stats, setStats] = useState<LadderStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/data/ladder-stats.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ladder stats (${res.status})`);
        return res.json();
      })
      .then((data: LadderStats) => {
        if (active) setStats(data);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const distribution = stats?.overall?.distribution ?? [];
  const top = distribution.slice(0, 6);
  const max = top.length ? Math.max(...top.map((d) => d.percentage)) : 0;
  const asOf = formatAsOf(stats?.timestamp);

  const Heading = (
    <>
      <div className="mb-3 flex items-center gap-3">
        <div className="rule-gold w-10 shrink-0" aria-hidden />
        <Text className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/90">
          Ladder snapshot
        </Text>
      </div>
      <Text variant="h2" className="font-display tracking-tight text-gilded">
        What the ladder is playing
      </Text>
      <Text variant="body-lg" color="secondary" className="mt-3 max-w-2xl leading-relaxed">
        Ascendancy distribution across the tracked top ladders.
        {asOf ? (
          <>
            {" "}
            <span className="text-foreground-secondary">Snapshot as of {asOf}.</span>
          </>
        ) : null}
      </Text>
    </>
  );

  return (
    <div className="w-full overflow-hidden py-16 md:py-24">
      <Container className="max-w-7xl px-6 md:px-8 lg:px-10">
        {Heading}

        {error ? (
          <div className="mt-10 rounded-xl border border-border/50 bg-background/80 p-8 text-center">
            <Text className="font-medium text-foreground">Ladder data is unavailable right now.</Text>
            <Text color="secondary" className="mt-1 text-sm">
              View the full statistics page for class distribution and trends.
            </Text>
          </div>
        ) : !stats ? (
          <div className="mt-10 space-y-3" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-9 animate-pulse rounded-lg bg-card/50" />
            ))}
          </div>
        ) : top.length === 0 ? (
          <div className="mt-10 rounded-xl border border-border/50 bg-background/80 p-8 text-center">
            <Text className="font-medium text-foreground">No ladder distribution recorded.</Text>
            <Text color="secondary" className="mt-1 text-sm">
              Check the statistics page for the latest snapshot.
            </Text>
          </div>
        ) : (
          <div className="mt-10 space-y-3">
            {top.map((entry, index) => {
              const width = max > 0 ? (entry.percentage / max) * 100 : 0;
              const isLeader = index === 0;
              return (
                <div key={entry.className} className="flex items-center gap-4">
                  <div className="w-40 shrink-0 truncate text-sm font-medium text-foreground/90 sm:w-48">
                    {isLeader && (
                      <span className="mr-2 rounded-sm bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                        Top
                      </span>
                    )}
                    {entry.className}
                  </div>
                  <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-background-secondary/60">
                    <motion.div
                      initial={reduceMotion ? false : { width: 0 }}
                      whileInView={reduceMotion ? undefined : { width: `${width}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3) }}
                      style={reduceMotion ? { width: `${width}%` } : undefined}
                      className={
                        isLeader
                          ? "h-full rounded-md bg-gradient-to-r from-primary/80 to-primary"
                          : "h-full rounded-md bg-border-secondary/80"
                      }
                    />
                  </div>
                  <div className="numeric w-14 shrink-0 text-right text-sm font-semibold text-foreground">
                    {entry.percentage.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/builds"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary/10 px-6 py-3 transition-colors hover:bg-primary/20"
          >
            <span className="text-lg font-medium text-primary">View full statistics</span>
            <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
