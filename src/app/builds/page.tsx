"use client";

import { motion } from "framer-motion";
import { BuildStats } from "~/components/builds/BuildStats";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function BuildsPage() {
  return (
    <main>
      <Container className="px-6 md:px-8 lg:px-10 max-w-7xl py-8 mt-4">
        <div className="space-y-8">
          <motion.header 
            className="space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Text 
              variant="h2" 
              className="tracking-tight mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
            >
              POE2 Meta Builds & Class Statistics
            </Text>
            <Text variant="body-lg" className="text-xl text-muted-foreground leading-relaxed">
              Discover the most powerful and popular Path of Exile 2 builds based on real-time analysis of top 1000 players.
              Updated daily with latest meta trends and performance statistics.
            </Text>
            <div className="flex flex-wrap gap-2 text-sm">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="px-2 py-1 bg-background/95 border border-border/50 rounded"
              >
                Updated {new Date().toLocaleDateString()}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="px-2 py-1 bg-background/95 border border-border/50 rounded"
              >
                Live Ladder Data
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="px-2 py-1 bg-background/95 border border-border/50 rounded"
              >
                All Leagues
              </motion.span>
            </div>
          </motion.header>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-lg bg-background/95 border border-border/50"
          >
            <Text variant="h3" className="mb-4">Current Meta Overview</Text>
            <Text variant="body" className="text-muted-foreground">
              The Path of Exile 2 meta continues to evolve, with certain builds emerging as top performers across all leagues.
              Our analysis shows strong preferences for Lightning-based Stormweaver builds, Minion-focused Infernalist setups,
              and high-sustain Bleed Witchhunter configurations.
            </Text>
          </motion.section>

          <BuildStats />

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-lg bg-background/95 border border-border/50"
          >
            <Text variant="h3" className="mb-4">Build Performance Analysis</Text>
            <Text variant="body" className="text-muted-foreground">
              Our statistics are derived from the top 1000 players across Standard, Hardcore, SSF, and HC SSF leagues,
              providing comprehensive insights into the most effective builds in the current meta.
            </Text>
          </motion.section>
        </div>
      </Container>
    </main>
  );
}
