"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Coffee, Github } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BUILD_LINKS,
  CALCULATOR_LINKS,
  CONTENT_LINKS,
  EXTERNAL_LINKS,
  type NavLink,
} from "~/config/nav";

const contributors = [{ username: "jayrichh", avatar: "https://github.com/jayrichh.png" }];

// Primary footer column: the headline tools, drawn from the shared config.
const mainLinks: NavLink[] = [...BUILD_LINKS, ...CONTENT_LINKS.filter((l) => l.id !== "ascendancies")];

const calculatorLinks: NavLink[] = CALCULATOR_LINKS;

const featureLinks: NavLink[] = CONTENT_LINKS.filter((l) =>
  ["mechanics", "ascendancies"].includes(l.id)
);

export function Footer() {
  const pathname = usePathname();

  const isVisible = pathname === "/" || pathname.startsWith("/build-planner");

  if (!isVisible) return null;

  return (
    <footer className="mt-auto border-t border-border/10 z-10 bg-gradient-to-b from-background to-background/95">
      <style jsx>{`
        @keyframes steam {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) scale(0.5) rotate(0deg);
          }
          30% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
            transform: translateY(-6px) translateX(-2px) scale(1) rotate(5deg);
          }
          70% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: translateY(-12px) translateX(-4px) scale(1.2) rotate(-5deg);
          }
        }
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-2deg);
          }
          75% {
            transform: rotate(2deg);
          }
        }
        .coffee-icon {
          position: relative;
          transition: transform 0.3s ease;
        }
        .group:hover .coffee-icon {
          animation: wiggle 1s ease-in-out infinite;
        }
        .coffee-icon::before,
        .coffee-icon::after {
          content: "";
          position: absolute;
          top: -2px;
          width: 3px;
          height: 3px;
          background: hsl(var(--primary));
          border-radius: 50%;
          opacity: 0;
          filter: blur(0.5px);
        }
        .coffee-icon::before {
          left: 45%;
          animation: steam 2.5s ease-out infinite;
        }
        .coffee-icon::after {
          left: 55%;
          animation: steam 2.5s ease-out infinite 0.7s;
        }
        .group:hover .coffee-icon::before,
        .group:hover .coffee-icon::after {
          background: hsl(var(--primary));
          filter: blur(0);
        }
      `}</style>
      <div className="min-w-10xl mx-auto px-8 sm:px-10 lg:px-12 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Main Links */}
          <div className="space-y-16">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-12">POE2 Tools</h2>
              <div className="grid gap-8">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-start gap-6 p-4 rounded-xl hover:bg-accent/5 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-accent/5 text-accent">
                      <link.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
                        {link.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contributors */}
            <div>
              <h2 className="text-2xl font-semibold tracking-tight mb-8">Contributors</h2>
              <div className="flex flex-wrap gap-4">
                {contributors.map((contributor) => (
                  <motion.a
                    key={contributor.username}
                    href={`https://github.com/${contributor.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary to-accent blur"
                      initial={false}
                      animate={{ opacity: 0 }}
                      whileHover={{ opacity: 0.5 }}
                    />
                    <Image
                      src={contributor.avatar}
                      alt={contributor.username}
                      width={40}
                      height={40}
                      className="rounded-full relative"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Support & Community */}
          <div className="space-y-16 lg:text-right">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold tracking-tight">Support the Project</h3>
              <p className="text-lg text-muted-foreground max-w-md ml-auto">
                Help keep POE2 Tools running and support future development of new features.
              </p>
              <div className="flex lg:justify-end gap-4">
                <a
                  href={EXTERNAL_LINKS.kofi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/5 backdrop-blur-sm border border-accent/20 hover:border-accent/40 text-foreground/70 hover:text-foreground/90 transition-all hover:shadow-accent/10 group"
                >
                  <span className="coffee-icon">
                    <Coffee className="w-5 h-5 text-accent/70 group-hover:text-accent/90 transition-colors" />
                  </span>
                  Buy us a coffee
                </a>
                <a
                  href={EXTERNAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 text-foreground/70 hover:text-foreground/90 transition-all group"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-semibold tracking-tight">Calculators</h3>
              <div className="flex flex-col lg:items-end gap-4">
                {calculatorLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-semibold tracking-tight">Reference</h3>
              <div className="flex flex-col lg:items-end gap-4">
                {featureLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-semibold tracking-tight">Data Sources</h3>
              <div className="flex flex-col lg:items-end gap-4">
                {EXTERNAL_LINKS.dataSources.map((source) => (
                  <a
                    key={source.id}
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {source.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/5 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} POE2 Tools - Community Build Planning & Analysis
                Toolkit
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                This is a fan-made toolkit and is not affiliated with or endorsed by Grinding Gear
                Games.
              </p>
            </div>
            <div className="flex md:justify-end gap-4">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
