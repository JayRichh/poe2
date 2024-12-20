"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Layout,
  Calculator,
  Newspaper,
  ArrowRight,
  ArrowUpRight,
  ScrollIcon,
  ChevronsDown,
  ArrowUp
} from "lucide-react";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { Button } from "~/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { NewsService } from "~/services/news-service";
import { NewsCard } from "~/components/news/NewsCard";
import { Skeleton } from "~/components/ui/Skeleton";
import type { NewsItem } from "~/types/news";

function FeaturedNewsSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card h-full p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="w-32 h-5" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-7" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-2/3 h-5" />
      </div>
      <div className="pt-4">
        <Skeleton className="w-24 h-5" />
      </div>
    </div>
  );
}

function CompactNewsSkeleton() {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-32 h-5" />
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-grow space-y-1 min-w-0">
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-2/3 h-5" />
          </div>
          <div className="w-5 h-5 flex-shrink-0 mt-1">
            <Skeleton variant="rectangular" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || 0;
      setShowScrollTop(scrollPos > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const scrollToContent = () => {
  //   const offsetTop = containerRef.current?.scrollHeight || 0;
  //   window.scrollTo({ top: offsetTop - window.innerHeight + 50, behavior: "smooth" });
  // };

  useEffect(() => {
    const loadNews = async () => {
      try {
        const latestNews = await NewsService.getLatestNews();
        setNews(latestNews);
      } catch (error) {
        console.error("Failed to load news:", error);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full relative">
      <section className="w-full pt-12 sm:pt-24 flex justify-center">
        <Container className="px-6 md:px-8 lg:px-10 flex flex-col items-center text-center max-w-5xl">
          <motion.div
            style={{ opacity, scale, y }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="relative mx-auto pointer-events-none select-none">
              <Image
                src="/poe2logonobg.png"
                alt="POE2 Logo"
                className="
                  scale-150
                  -mb-[120px]
                  pr-[6px]
                  filter
                  dark:invert
                  dark:brightness-125
                  dark:contrast-125
                  drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]
                  dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]
                  [mask-image:radial-gradient(circle,white_70%,transparent_100%)]
                  [mask-size:cover]
                "
                height="200"
                width="400"
                priority
              />
            </div>
            <Text variant="body-lg" color="secondary" className="text-xl max-w-2xl mx-auto text-center leading-relaxed pb-2">
              Community-driven tools for Path of Exile 2 players. Plan builds, calculate DPS, and optimize gameplay.
            </Text>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
  <Link href="/build-planner">
    <motion.button
      whileHover={{ scale: 1.03, opacity: 0.95 }}
      className="px-8 py-4 text-lg flex items-center gap-2 rounded-lg transition-all duration-300 
                 bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-primary"
    >
      Build Planner
      <motion.div
        variants={{
          initial: { rotate: 0 },
          hover: { rotate: -45 },
        }}
        initial="initial"
        whileHover="hover"
        className="transition-transform duration-300"
      >
        <ArrowRight className="w-5 h-5" />
      </motion.div>
    </motion.button>
  </Link>

  <Link href="/dps-calc">
    <motion.button
      whileHover={{ scale: 1.03, opacity: 0.95 }}
      className="px-8 py-4 text-lg flex items-center gap-2 rounded-lg transition-all duration-300 
                 bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-secondary"
    >
      DPS Calculator
      <motion.div
        variants={{
          initial: { rotate: 0 },
          hover: { rotate: -45 },
        }}
        initial="initial"
        whileHover="hover"
        className="transition-transform duration-300"
      >
        <ArrowRight className="w-5 h-5" />
      </motion.div>
    </motion.button>
  </Link>
</div>

          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center gap-2 mt-20 md:mt-32"
          >
            {/* <Text color="secondary" className="text-xs uppercase tracking-widest">
              Scroll
            </Text> */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ScrollIcon className="w-6 h-6 text-secondary" />
            </motion.div>
            <ChevronsDown className="w-5 h-5 text-secondary mt-2" />
          </motion.div>
        </Container>
      </section>

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <motion.div
        initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1, duration: 1 }}
        >
        <Button
          onClick={scrollToTop}
          variant="secondary"
          className="fixed bottom-10 right-10 flex items-center gap-2 opacity-50 hover:opacity-90 hover:border hover:border-primary"
          >
          <ArrowUp className="w-4 h-4" />
          Top
        </Button>
          </motion.div>
      )}

      {/* Features */}
      <section className="w-full py-32 flex justify-center">
        <Container className="px-6 md:px-8 lg:px-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
          >
            <Link href="/build-planner">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="group border border-border/50 rounded-3xl p-10 bg-card hover:bg-card/90 transition-colors"
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-8">
                  <Layout className="w-10 h-10 text-primary" />
                </div>
                <Text variant="h3" className="text-2xl font-semibold mb-6 group-hover:text-primary transition-colors">
                  Build Planner
                </Text>
                <ul className="space-y-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Plan skill trees
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Manage gear & skills
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Track character stats
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Import/Export builds
                  </li>
                </ul>
              </motion.div>
            </Link>

            <Link href="/dps-calc">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="group border border-border/50 rounded-3xl p-10 bg-card hover:bg-card/90 transition-colors"
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary/10 mb-8">
                  <Calculator className="w-10 h-10 text-secondary" />
                </div>
                <Text variant="h3" className="text-2xl font-semibold mb-6 group-hover:text-secondary transition-colors">
                  DPS Calculator
                </Text>
                <ul className="space-y-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Calculate weapon DPS
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Compare weapons
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Account for modifiers
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Optimize damage output
                  </li>
                </ul>
              </motion.div>
            </Link>

            <Link href="/news">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="group border border-border/50 rounded-3xl p-10 bg-card hover:bg-card/90 transition-colors"
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-500/10 mb-8">
                  <Newspaper className="w-10 h-10 text-blue-500" />
                </div>
                <Text variant="h3" className="text-2xl font-semibold mb-6 group-hover:text-blue-500 transition-colors">
                  Game Utils
                </Text>
                <ul className="space-y-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Latest updates
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Community announcements
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Event schedules
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Marketplace pricing
                  </li>
                </ul>
              </motion.div>
            </Link>
          </motion.div>
        </Container>
      </section>

      <section className="w-full py-32 ">
        <Container className="px-6 md:px-8 lg:px-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8"
            >
              <div className="space-y-4">
                <Text variant="h2" className="text-4xl font-bold tracking-tight">
                  Interactive Skill Tree
                </Text>
                <Text variant="body-lg" color="secondary" className="text-lg leading-relaxed">
                  Explore and plan your character&apos;s progression with our interactive skill tree.
                </Text>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  Visual node connections and pathfinding
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  Real-time stat calculations
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  Sharable build URLs
                </li>
                
              </ul>
              <div className="pt-4">
                <Link href="/skill-tree">
                  <Button variant="ghost" size="lg" className="px-8 py-4 text-lg flex items-center gap-2">
                    View Skill Tree
                    <ArrowUpRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative"
            >
              <div className="relative w-full aspect-square max-w-xl mx-auto">
                <Image
                  src="/skill-tree.png"
                  alt="POE2 Skill Tree Preview"
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-lg" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="w-full py-32 flex justify-center">
        <Container className="px-6 md:px-8 lg:px-10 max-w-7xl space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 flex flex-col pb-12"
          >
            <Text
              variant="h1"
              className="text-4xl font-bold w-full tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
            >
              Latest Updates
            </Text>
            <Text variant="body-lg" color="secondary" className="text-lg leading-relaxed mr-auto">
              Stay informed about the latest Path of Exile 2 news, events, and community updates.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-16 pt-12"
          >
            <div className="space-y-8">
              <Text variant="h3" className="text-2xl font-semibold">
                Featured
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {loading ? (
                  <>
                    <FeaturedNewsSkeleton />
                    <FeaturedNewsSkeleton />
                  </>
                ) : (
                  news.slice(0, 2).map((item) => (
                    <NewsCard key={item.id} news={item} variant="featured" />
                  ))
                )}
              </div>
            </div>

            <div className="space-y-8">
              <Text variant="h3" className="text-2xl font-semibold">
                Recent Updates
              </Text>
              <div className="space-y-4">
                {loading ? (
                  <>
                    <CompactNewsSkeleton />
                    <CompactNewsSkeleton />
                    <CompactNewsSkeleton />
                  </>
                ) : (
                  news.slice(2).map((item) => (
                    <NewsCard key={item.id} news={item} variant="compact" />
                  ))
                )}
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
          </motion.div>
        </Container>
      </section>

      <section className="w-full py-40 mb-64">
        <Container className="px-6 md:px-8 lg:px-10 max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 text-center flex flex-col align-center"
          >
            <Text variant="h3" color="secondary" className="text-3xl font-bold">
              More Coming Soon..
            </Text>
            <Text variant="body" color="secondary" className="text-lg leading-relaxed ">
              We&apos;re continuously working on new tools.
              Stay tuned for future updates.
            </Text>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
