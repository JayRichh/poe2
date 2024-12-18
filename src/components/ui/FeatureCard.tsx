'use client';

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Text } from "./Text";

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
        className="group relative h-full"
      >
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${gradientFrom}/20 via-transparent to-${gradientTo}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="relative space-y-6 p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-colors duration-300">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${gradientFrom}/20 to-${gradientTo}/20 flex items-center justify-center group-hover:from-${gradientFrom}/30 group-hover:to-${gradientTo}/30 transition-colors duration-300`}>
            <Icon className={`w-6 h-6 text-${iconColor}`} />
          </div>
          <div className="space-y-4">
            <Text variant="h3">{title}</Text>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors"
                >
                  <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center text-sm font-medium">
            <span className={`text-${iconColor} transition-colors duration-300 group-hover:font-semibold`}>
              Learn More
            </span>
            <svg
              className={`w-4 h-4 ml-1 text-${iconColor} transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
