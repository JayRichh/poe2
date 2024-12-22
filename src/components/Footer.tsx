"use client";

import { Coffee, Github } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const contributors = [
  {
    name: "Jay",
    url: "https://github.com/jayrichh",
    avatar: "https://avatars.githubusercontent.com/jayrichh",
  },
];

const navLinks = [
  { href: "/build-planner", label: "Build Planner" },
  { href: "/skill-tree", label: "Skill Tree" },
  { href: "/dps-calc", label: "DPS Calculator" },
];

const externalResources = [
  { href: "https://www.pathofexile2.com/", label: "Path of Exile 2" },
];

export function Footer() {
  const pathname = usePathname();
  const isVisible =
    pathname === "/" ||
    pathname === "/analytics" ||
    pathname === "/gifts" ||
    pathname.startsWith("/build-planner");

  if (!isVisible) return null;

  return (
    <footer className="mt-auto border-t border-border/10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground">POE2 Tools</h3>
              <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                POE2 tools and utilities - Featuring build planning, 
                damage calculator, skill tree planner, character optimization tools, and build analysis utilities.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Follow & Contribute</h4>
              <a
                href="https://github.com/jayrichh/poe2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Contributors</h4>
              <div className="flex flex-wrap gap-2">
                {contributors.map((contributor) => (
                  <a
                    key={contributor.name}
                    href={contributor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <Image
                      src={contributor.avatar}
                      alt={contributor.name}
                      width={32}
                      height={32}
                      className="rounded-full hover:opacity-80 transition-opacity"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>

           {/* Middle Column */}
           <div className="space-y-8">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Support the Project</h4>
              <p className="text-sm text-foreground/60 mb-4">
                Help keep POE2 Tools running and support future development.
              </p>
              <a
                href="https://ko-fi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Coffee className="w-4 h-4" />
                Buy us a coffee
              </a>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Features</h4>
              <p className="text-sm text-foreground/60">
                Build planner, DPS calculator, skill tree optimizer, character analyzer, 
                and other essential POE2 planning tools.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Tools & Utilities</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Resources</h4>
              <ul className="space-y-2">
                {externalResources.map((resource) => (
                  <li key={resource.href}>
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {resource.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-border/5">
          <p className="text-xs text-center text-foreground/50">
            © {new Date().getFullYear()} POE2 Tools - Community Build Planning & Analysis Toolkit
          </p>
          <p className="mt-2 text-xs text-center text-foreground/50">
            This is a fan-made toolkit and is not affiliated with or endorsed by Grinding Gear Games.
            Path of Exile 2 is a trademark of Grinding Gear Games.
          </p>
        </div>
      </div>
    </footer>
  );
}
