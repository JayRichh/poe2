import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Text } from "./Text";
import { cn } from "~/utils/cn";

interface FeatureCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  features: string[];
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
}

export function FeatureCard({
  href,
  icon: Icon,
  title,
  features,
  gradientFrom,
  gradientTo,
  iconColor,
}: FeatureCardProps) {
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative h-[400px] w-full"
      >
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500",
          `bg-gradient-to-br from-${gradientFrom}/30 via-transparent to-${gradientTo}/30`,
          "group-hover:shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]"
        )} />
        <div className="relative h-full flex flex-col p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 group-hover:border-opacity-50">
          {/* Icon Section */}
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300",
            `bg-gradient-to-br from-${gradientFrom}/20 to-${gradientTo}/20`,
            `group-hover:from-${gradientFrom}/40 group-hover:to-${gradientTo}/40`,
            "group-hover:shadow-lg"
          )}>
            <Icon className={cn(
              `w-6 h-6 text-${iconColor}`,
              "transition-transform duration-300 group-hover:scale-110"
            )} />
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col">
            <Text variant="h3" className="mb-4 text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-primary">
              {title}
            </Text>
            
            <ul className="flex-1 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:translate-x-1">
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    `bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`,
                    "group-hover:w-2 group-hover:h-2"
                  )} />
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Arrow Indicator */}
            <div className="mt-6 flex items-center text-sm font-medium">
              <span className={cn(
                `text-${iconColor}`,
                "transition-all duration-300 group-hover:font-semibold"
              )}>Learn More</span>
              <svg
                className={cn(
                  "w-4 h-4 ml-1 transition-all duration-300",
                  `text-${iconColor}`,
                  "group-hover:translate-x-2"
                )}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
