"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Users, Swords, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

interface SystemFeature {
  icon: typeof Zap;
  title: string;
  description: string;
}

const mechanicsFeatures: SystemFeature[] = [
  {
    icon: Swords,
    title: "Combat System",
    description: "Master intricate combat mechanics and damage calculations",
  },
  {
    icon: Activity,
    title: "Status Effects",
    description: "Learn about ailments and their impact on gameplay",
  },
  {
    icon: Zap,
    title: "Character Stats",
    description: "Understand core attributes and defensive mechanics",
  },
];

const ascendancyFeatures: SystemFeature[] = [
  {
    icon: Users,
    title: "12 Unique Classes",
    description: "Each with distinct playstyles and abilities",
  },
  {
    icon: Swords,
    title: "Build Diversity",
    description: "Multiple viable builds for each ascendancy",
  },
  {
    icon: Activity,
    title: "Class Mechanics",
    description: "Specialized mechanics for each ascendancy",
  },
];

export function GameSystemsSection() {
  return (
    <div className="relative py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[50vw] max-w-96 h-[50vw] max-h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[50vw] max-w-96 h-[50vw] max-h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mechanics Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Text
              variant="h2"
              className="text-4xl font-bold tracking-tight text-foreground"
            >
              Game Mechanics
            </Text>
            <Text className="text-lg leading-relaxed max-w-xl text-foreground/90">
              Master Path of Exile 2's deep gameplay systems and mechanics to create powerful builds and dominate the endgame.
            </Text>
          </div>

          <div className="grid gap-4">
            {mechanicsFeatures.map((feature, i) => (
              <div
                key={i}
                className="group flex gap-4 p-6 rounded-xl bg-card/30 border border-border/50 hover:bg-card/50 hover:border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="space-y-2">
                  <Text className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </Text>
                  <Text className="text-sm text-foreground/80">
                    {feature.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Link href="/mechanics">
              <Button
                variant="secondary"
                size="lg"
                className="px-6 py-3 text-base flex items-center gap-2 bg-background/80 backdrop-blur-sm hover:bg-background/60 transition-all group"
                aria-label="Explore game mechanics section"
              >
                <span className="text-primary font-medium group-hover:text-foreground transition-colors">
                  Explore Mechanics
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-primary transition-colors" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Ascendancy Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Text
              variant="h2"
              className="text-4xl font-bold tracking-tight text-foreground"
            >
              Ascendancy Classes
            </Text>
            <Text className="text-lg leading-relaxed max-w-xl text-foreground/90">
              Discover and master 12 unique class specializations, each with their own powerful abilities and playstyles.
            </Text>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-xl blur-xl" />
            <div className="relative grid grid-cols-3 gap-2 p-2 rounded-xl bg-card/30 border border-border/50">
              {[
                "acolyte",
                "bloodmage",
                "chronomancer",
                "deadeye",
                "infernalist",
                "titan",
              ].map((className, i) => (
                <div
                  key={className}
                  className="aspect-square relative rounded-lg overflow-hidden group"
                >
                  <Image
                    src={`/ascendancies/${className}.webp`}
                    alt={`${className.charAt(0).toUpperCase() + className.slice(1)} class preview`}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 1200px) 200px, 300px"
                    quality={65}
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {ascendancyFeatures.map((feature, i) => (
              <div
                key={i}
                className="group flex gap-4 p-6 rounded-xl bg-card/30 border border-border/50 hover:bg-card/50 hover:border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-foreground/80" />
                </div>
                <div className="space-y-2">
                  <Text className="text-lg font-semibold group-hover:text-foreground transition-colors">
                    {feature.title}
                  </Text>
                  <Text className="text-sm text-foreground/80">
                    {feature.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Link href="/ascendancies">
              <Button
                variant="secondary"
                size="lg"
                className="px-6 py-3 text-base flex items-center gap-2 bg-background/80 backdrop-blur-sm hover:bg-background/60 transition-all group"
                aria-label="View ascendancy classes section"
              >
                <span className="text-primary font-medium group-hover:text-foreground transition-colors">
                  View Classes
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-foreground transition-colors" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
