"use client";

import { ArrowUp, Book, Box, Coins, Crosshair, Map, Shield, Sword, User } from "lucide-react";

import React from "react";

import Link from "next/link";

import { Text } from "~/components/ui/Text";

import { cn } from "~/utils/cn";

import type { GuideIcon } from "~/lib/guides/data";

interface GuidePreviewCardProps {
  title: string;
  description: string;
  icon: GuideIcon;
  href: string;
  featured?: boolean;
}

// Icon map
const IconMap: Record<GuideIcon, React.ComponentType<{ className?: string }>> = {
  Book,
  Coins,
  Sword,
  Shield,
  User,
  Box,
  Crosshair,
  ArrowUp,
  Map,
};

export function GuidePreviewCard({
  title,
  description,
  icon,
  href,
  featured,
}: GuidePreviewCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block group relative overflow-hidden",
        "bg-card hover:bg-card/80 transition-colors",
        "border border-border/50 hover:border-border",
        "rounded-lg",
        featured ? "p-6" : "p-4"
      )}
    >
      <div className="relative z-10 flex gap-4">
        <div
          className={cn(
            "shrink-0 rounded-full bg-primary/10 flex items-center justify-center",
            featured ? "w-12 h-12" : "w-10 h-10"
          )}
        >
          {React.createElement(IconMap[icon], {
            className: cn("text-primary", featured ? "w-6 h-6" : "w-5 h-5"),
          })}
        </div>
        <div className="space-y-2">
          <Text className={cn("font-semibold tracking-tight", featured ? "text-xl" : "text-lg")}>
            {title}
          </Text>
          <Text className="text-foreground/70 line-clamp-2">{description}</Text>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
