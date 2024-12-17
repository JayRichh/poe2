"use client";

import { motion } from "framer-motion";
import { Layout, Calculator, Newspaper, ArrowRight } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { Button } from "~/components/ui/Button";
import Link from "next/link";
import WavyGradient from "~/components/ui/WavyGradient";
import { FeatureCard } from "~/components/ui/FeatureCard";

export default function HomePage() {
  const features = [
    {
      href: "/build-planner",
      icon: Layout,
      title: "Build Planner",
      features: [
        "Plan your passive skill tree",
        "Manage equipment and skills",
        "Import/Export builds"
      ],
      gradientFrom: "primary",
      gradientTo: "accent",
      iconColor: "primary"
    },
    {
      href: "/dps-calc",
      icon: Calculator,
      title: "DPS Calculator",
      features: [
        "Calculate weapon DPS",
        "Compare different weapons",
        "Optimize your damage output"
      ],
      gradientFrom: "secondary",
      gradientTo: "primary",
      iconColor: "secondary"
    },
    {
      href: "/news",
      icon: Newspaper,
      title: "Game Utils",
      features: [
        "Latest game updates",
        "Community announcements",
        "Event schedules"
      ],
      gradientFrom: "blue-500",
      gradientTo: "purple-500",
      iconColor: "blue-500"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Container className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-12"
        >
          <div className="space-y-6">
            <Text variant="h1" gradient="amber" align="center" className="text-6xl md:text-7xl lg:text-8xl">
              POE2 Tools
            </Text>
            <Text variant="body-lg" color="secondary" align="center" className="max-w-xl mx-auto">
              Community-driven tools for Path of Exile 2 players. Plan your builds, calculate DPS, and stay updated with the latest news.
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
      </Container>

      {/* Features Section */}
      <div className="relative w-full h-screen -my-8 overflow-hidden">
        <div className="absolute inset-0">
          <WavyGradient />
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="w-full px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[2000px] mx-auto"
            >
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <Container className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-4 max-w-2xl"
        >
          <Text variant="h3" color="secondary" align="center">
            More Tools Coming Soon
          </Text>
          <Text variant="body" color="secondary" align="center">
            We&apos;re continuously working on new tools to help you optimize your Path of Exile 2 experience.
            Stay tuned for updates.
          </Text>
        </motion.div>
      </Container>
    </div>
  );
}
