"use client";

import { motion } from "framer-motion";
import { Layout, Calculator, ArrowRight } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { Button } from "~/components/ui/Button";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container>
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-24 px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-12 max-w-3xl mx-auto"
        >
          <div className="space-y-6">
            <Text variant="h1" gradient="amber" align="center">
              POE2 Tools
            </Text>
            <Text variant="body-lg" color="secondary" align="center" className="max-w-2xl mx-auto">
              Community-driven tools for Path of Exile 2 players. Plan your builds, calculate DPS, and optimize your gameplay.
            </Text>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/build-planner" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="gap-2 text-lg w-full sm:min-w-[200px] group"
              >
                Build Planner
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/dps-calc" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="gap-2 text-lg w-full sm:min-w-[200px] group"
              >
                DPS Calculator
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full"
        >
          {/* Build Planner Feature */}
          <Link href="/build-planner">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative space-y-6 p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors duration-300">
                  <Layout className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-4">
                  <Text variant="h3">Build Planner</Text>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                      Plan your passive skill tree
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                      Manage equipment and skills
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                      Track character stats
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                      Import/Export builds
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* DPS Calculator Feature */}
          <Link href="/dps-calc">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative space-y-6 p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-primary/30 transition-colors duration-300">
                  <Calculator className="w-6 h-6 text-secondary" />
                </div>
                <div className="space-y-4">
                  <Text variant="h3">DPS Calculator</Text>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-secondary to-primary" />
                      Calculate weapon DPS
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-secondary to-primary" />
                      Compare different weapons
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-secondary to-primary" />
                      Account for global modifiers
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-secondary to-primary" />
                      Optimize your damage output
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <Text variant="h3" color="secondary" align="center">
            More Tools Coming Soon
          </Text>
          <Text variant="body" color="secondary" align="center">
            We&apos;re continuously working on new tools to help you optimize your Path of Exile 2 experience.
            Stay tuned for updates.
          </Text>
        </motion.div>
      </div>
    </Container>
  );
}
