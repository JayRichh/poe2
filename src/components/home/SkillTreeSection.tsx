"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";
import { shimmer, toBase64 } from "~/utils/image";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Visual Pathfinding",
    description:
      "Intuitive node connections with real-time path visualization and optimization suggestions",
  },
  {
    title: "Stat Tracking",
    description: "Comprehensive real-time calculations of all character attributes and modifiers",
  },
  {
    title: "Build Sharing",
    description: "Generate and share your builds instantly with unique, permanent URLs",
  },
  {
    title: "Progress Planning",
    description: "Map out your character's development with level-by-level progression tracking",
  },
] as const;

export function SkillTreeSection() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-16 min-h-[600px] py-32 pt-12">
      <div className="flex-1 space-y-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <Text
              variant="h1"
              className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
            >
              Interactive Skill Tree
            </Text>
            <Text variant="body-lg" color="secondary" className="text-lg leading-relaxed max-w-xl">
              Explore and plan your character&apos;s progression with our, interactive skill tree
              visualization system.
            </Text>
          </div>
          <div className="h-px bg-gradient-to-r from-border via-accent/20 to-border" />
        </div>
        <div className="space-y-6">
          {features.map((feature, i) => (
            <div key={i} className="group">
              <div className="space-y-2">
                <Text className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {feature.title}
                </Text>
                <Text color="secondary" className="leading-relaxed">
                  {feature.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-10">
          <Link href="/skill-tree">
            <Button
              variant="secondary"
              size="lg"
              className="px-8 py-4 text-lg flex items-center gap-2 bg-background/80 backdrop-blur-sm hover:bg-background/60 transition-all group border-2 border-border/50 hover:border-accent/50"
            >
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent group-hover:text-foreground transition-colors">
                View Skill Tree
              </span>
              <ArrowUpRight className="w-5 h-5 group-hover:text-primary transition-colors" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 relative group/image">
        <div className="relative w-full h-[600px] max-w-xl mx-auto">
          <motion.div
            className="absolute inset-0 -m-2 rounded-full bg-gradient-to-br from-primary/15 via-accent/15 to-secondary/15 blur-xl opacity-40"
            animate={{
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20" />
          <div className="relative h-full rounded-full p-1 bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30 group-hover/image:from-primary/40 group-hover/image:via-accent/40 group-hover/image:to-secondary/40 transition-all duration-700">
            <div className="absolute inset-0 rounded-full backdrop-blur-sm" />
            <div className="relative h-full rounded-full overflow-hidden border border-border/30 group-hover/image:border-border/50 transition-colors duration-700">
              <div className="relative w-full h-full">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-background"
                  style={{
                    backgroundImage: `url('data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}')`,
                  }}
                />
                <div className="relative w-full h-full">
                  <Image
                    src="/skill-tree.png"
                    alt="POE2 Skill Tree Preview"
                    fill
                    quality={65}
                    loading="lazy"
                    sizes="(max-width: 768px) 500px, (max-width: 1200px) 700px, 900px"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                    className="object-cover object-center scale-[1.15] group-hover/image:scale-110 transition-all duration-700 contrast-[1.1] brightness-110"
                    onError={(event) => {
                      const target = event.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent backdrop-blur-[1px] mix-blend-soft-light after:absolute after:inset-0 after:bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.4))]"
                animate={{
                  opacity: [0.8, 0.9, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
