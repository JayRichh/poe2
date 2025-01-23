"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Calculator,
  Cog,
  Coins,
  FileText,
  GitBranch,
  Layout,
  LogIn,
  LogOut,
  Monitor,
  Moon,
  Newspaper,
  Settings,
  Sun,
  Timer,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";

import * as React from "react";
import { createPortal } from "react-dom";

import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "~/contexts/auth";

import { cn } from "../../utils/cn";
import { Button } from "./Button";
import { Text } from "./Text";

type Feature = {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type MainLink = {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  features: Feature[];
};

type QuickLink = {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

const mainLinks: MainLink[] = [
  {
    id: "build-planner",
    label: "Build Planner",
    path: "/build-planner",
    icon: Layout,
    description:
      "Plan and optimize your POE2 character builds with our comprehensive build planner",
    features: [
      { id: "build-equipment", label: "Equipment", path: "/build-planner" },
      { id: "build-gems", label: "Skill Gems", path: "/build-planner" },
      { id: "build-stats", label: "Build Stats", path: "/build-planner" },
      { id: "build-share", label: "Share Builds", path: "/build-planner" },
      { id: "build-ladder", label: "Ladder Stats", path: "/builds" },
    ],
  },
  {
    id: "mechanics",
    label: "Game Mechanics",
    path: "/mechanics",
    icon: Cog,
    description: "Master POE2's core systems with detailed mechanics guides and explanations",
    features: [
      { id: "mechanics-combat", label: "Combat", path: "/mechanics" },
      { id: "mechanics-character", label: "Character", path: "/mechanics" },
      { id: "mechanics-status", label: "Status Effects", path: "/mechanics" },
      { id: "mechanics-damage", label: "Damage Types", path: "/mechanics" },
    ],
  },
  {
    id: "ascendancies",
    label: "Ascendancies",
    path: "/ascendancies",
    icon: Users,
    description: "Discover and master POE2's unique ascendancy classes and their abilities",
    features: [
      { id: "ascendancies-guides", label: "Class Guides", path: "/ascendancies" },
      { id: "ascendancies-builds", label: "Build Paths", path: "/ascendancies" },
      { id: "ascendancies-abilities", label: "Abilities", path: "/ascendancies" },
      { id: "ascendancies-playstyles", label: "Playstyles", path: "/ascendancies" },
    ],
  },
  {
    id: "skill-tree",
    label: "Skill Tree",
    path: "/skill-tree",
    icon: GitBranch,
    description: "Plan your character's passive skill tree with our interactive planner",
    features: [
      { id: "tree-explorer", label: "Tree Explorer", path: "/skill-tree" },
      { id: "tree-planner", label: "Path Planner", path: "/skill-tree" },
      { id: "tree-search", label: "Node Search", path: "/skill-tree" },
      { id: "tree-export", label: "Build Export", path: "/skill-tree" },
    ],
  },
  {
    id: "calculators",
    label: "Calculators",
    path: "/calculators",
    icon: Calculator,
    description: "Optimize your build with our suite of specialized POE2 calculators",
    features: [
      { id: "calc-dps", label: "DPS Calculator", path: "/calculators/dps", icon: Zap },
      { id: "calc-speed", label: "Speed Calculator", path: "/calculators/speed", icon: Timer },
      {
        id: "calc-currency",
        label: "Currency Calculator",
        path: "/calculators/currency",
        icon: Coins,
      },
    ],
  },
];

const quickLinks: QuickLink[] = [
  { id: "quick-news", label: "Latest News", path: "/news", icon: Newspaper },
  { id: "quick-guides", label: "Guides", path: "/guides", icon: FileText },
  { id: "quick-builds", label: "Community Builds", path: "/build-planner", icon: Users },
  { id: "quick-ladder", label: "Ladder Stats", path: "/builds", icon: GitBranch },
  { id: "quick-patch-notes", label: "Patch Notes", path: "/news/patch-notes", icon: FileText },
  { id: "quick-ascendancies", label: "Ascendancy Classes", path: "/ascendancies", icon: Users },
];

const themeOptions = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Monitor },
];

const animations = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  container: {
    hidden: { clipPath: "circle(0% at 95% 5%)" },
    visible: {
      clipPath: "circle(150% at 95% 5%)",
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      clipPath: "circle(0% at 95% 5%)",
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  },
  content: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.2 },
    },
  },
};

function SignInSection({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <motion.div
      variants={animations.item}
      initial="hidden"
      animate="visible"
      className="p-4 rounded-xl border border-border/50 bg-background/95"
    >
      <div className="flex items-center justify-between">
        <Text className="text-sm text-foreground/60">Continue where you left off</Text>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("/auth/login")}
          className="flex items-center gap-2 text-foreground/70 hover:text-foreground"
        >
          <LogIn className="h-4 w-4" />
          <span className="text-sm">Sign in</span>
        </Button>
      </div>
    </motion.div>
  );
}

function UserProfile({
  user,
  onSignOut,
  onNavigate,
}: {
  user: any;
  onSignOut: () => void;
  onNavigate: (path: string) => void;
}) {
  return (
    <motion.div
      variants={animations.item}
      initial="hidden"
      animate="visible"
      className="p-4 rounded-xl border border-border/50 bg-background/95"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-foreground/70" />
          <Text className="text-sm text-foreground/70">{user.email}</Text>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("/profile")}
            className="text-foreground/70 hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSignOut}
            className="text-foreground/70 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function NavigationSection({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: (path: string) => void;
}) {
  return (
    <div className="space-y-6">
      <Text className="text-lg font-medium">Tools & Features</Text>
      <div className="grid gap-6">
        {mainLinks.map((item, index) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.path}
              custom={index}
              variants={animations.item}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-border/50 bg-background/95 hover:border-primary/50"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <Text className="font-medium">{item.label}</Text>
                  </div>
                  <Text className="text-sm text-foreground/60">{item.description}</Text>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Array.isArray(item.features)
                      ? item.features.map((feature) => (
                          <button
                            key={feature.id}
                            onClick={() => onNavigate(feature.path)}
                            className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary/90 hover:bg-primary/20 transition-colors flex items-center gap-1.5"
                          >
                            {feature.icon && <feature.icon className="w-3 h-3" />}
                            {feature.label}
                          </button>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function QuickLinksSection({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <div className="space-y-4">
      <Text className="text-lg font-medium">Quick Links</Text>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickLinks.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              custom={index}
              variants={animations.item}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 + index * 0.1 }}
              onClick={() => onNavigate(item.path)}
              className="p-4 rounded-xl border-2 border-border/50 bg-background/95 hover:border-primary/50 transition-all"
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className="h-5 w-5" />
                <Text className="text-sm font-medium text-center">{item.label}</Text>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function FullscreenMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleNavigation = (path: string) => {
    onClose();
    router.push(path);
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
    router.push("/auth/login");
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99] pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={animations.backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[99] bg-gradient-to-br from-background/95 via-background to-background pointer-events-auto backdrop-blur-md"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={menuRef}
        variants={animations.container}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        className={cn(
          "fixed inset-0 z-[100] flex min-h-screen w-screen flex-col bg-gradient-to-br from-background via-background to-background/90",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <motion.div
          variants={animations.content}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          className="border-b border-border/50 px-6 py-4"
        >
          <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-4 sm:px-8">
            <Text className="text-3xl font-bold">Menu</Text>
            <Button
              variant="ghost"
              size="lg"
              onClick={onClose}
              className="text-foreground hover:bg-background/95 p-3"
              aria-label="Close menu"
            >
              <X className="h-9 w-9" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={animations.content}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          className="flex-1 overflow-y-auto overscroll-contain"
        >
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
              <div className="space-y-12">
                <NavigationSection pathname={pathname} onNavigate={handleNavigation} />
                <QuickLinksSection onNavigate={handleNavigation} />
                {!user && <SignInSection onNavigate={handleNavigation} />}
                {user && (
                  <UserProfile
                    user={user}
                    onSignOut={handleSignOut}
                    onNavigate={handleNavigation}
                  />
                )}
              </div>

              <div className="space-y-8">
                <Text className="text-lg font-medium">Settings</Text>
                <div className="space-y-6">
                  <div className="p-4 rounded-xl border-2 border-border/50 bg-background/95 space-y-4">
                    <Text className="font-medium">Theme</Text>
                    <div className="grid grid-cols-3 gap-4">
                      {themeOptions.map(({ label, value, icon: Icon }, index) => (
                        <motion.button
                          key={value}
                          custom={index}
                          variants={animations.item}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.6 + index * 0.1 }}
                          onClick={() => setTheme(value)}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all",
                            theme === value
                              ? "border-primary bg-primary/5"
                              : "border-border/50 bg-background/95 hover:border-primary/50"
                          )}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Icon className="h-5 w-5" />
                            <Text className="text-sm font-medium">{label}</Text>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-border/50 bg-background/95">
                    <div className="flex flex-col gap-2">
                      <Text className="font-medium">Features</Text>
                      <Text className="text-sm text-foreground/60">
                        More features coming soon...
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>,
    document.body
  );
}
