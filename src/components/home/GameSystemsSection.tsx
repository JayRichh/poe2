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
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Mechanics Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <Text
              variant="h2"
              className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Game Mechanics
            </Text>
            <Text color="secondary" className="text-lg leading-relaxed">
              Master Path of Exile 2's deep gameplay systems and mechanics
            </Text>
          </div>

          <div className="space-y-6">
            {mechanicsFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex gap-4 p-4 rounded-xl bg-card/30 border border-border/50 hover:bg-card/50 hover:border-border transition-all"
              >
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <Text className="font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </Text>
                  <Text color="secondary" className="text-sm">
                    {feature.description}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>

          <Link href="/mechanics">
            <Button
              variant="secondary"
              size="lg"
              className="px-6 py-3 text-base flex items-center gap-2 bg-background/80 backdrop-blur-sm hover:bg-background/60 transition-all group"
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:text-foreground transition-colors">
                Explore Mechanics
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:text-primary transition-colors" />
            </Button>
          </Link>
        </motion.div>

        {/* Ascendancy Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <Text
              variant="h2"
              className="text-4xl font-bold tracking-tight bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"
            >
              Ascendancy Classes
            </Text>
            <Text color="secondary" className="text-lg leading-relaxed">
              Discover unique class specializations and master their powers
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
                <motion.div
                  key={className}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="aspect-square relative rounded-lg overflow-hidden group"
                >
                  <Image
                    src={`/ascendancies/${className}.webp`}
                    alt={className}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {ascendancyFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex gap-4 p-4 rounded-xl bg-card/30 border border-border/50 hover:bg-card/50 hover:border-border transition-all"
              >
                <div className="shrink-0 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <div className="space-y-1">
                  <Text className="font-semibold group-hover:text-secondary transition-colors">
                    {feature.title}
                  </Text>
                  <Text color="secondary" className="text-sm">
                    {feature.description}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>

          <Link href="/ascendancies">
            <Button
              variant="secondary"
              size="lg"
              className="px-6 py-3 text-base flex items-center gap-2 bg-background/80 backdrop-blur-sm hover:bg-background/60 transition-all group"
            >
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent group-hover:text-foreground transition-colors">
                View Classes
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:text-secondary transition-colors" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
