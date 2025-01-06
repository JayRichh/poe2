"use client";

import { useMemo } from "react";

interface CurrencyIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function CurrencyIcon({ name, size = 40, className = "" }: CurrencyIconProps) {
  // Generate unique visual properties based on the currency name
  const visualProps = useMemo(() => {
    // Hash the name to get consistent values
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    // Generate color based on currency type and hash
    const baseColors = {
      orb: [199, 179, 119], // Gold base for orbs
      shard: [122, 146, 163], // Silver base for shards
      scroll: [179, 165, 151], // Parchment base for scrolls
      catalyst: [124, 84, 163], // Purple base for catalysts
      essence: [84, 163, 124], // Green base for essences
      artifact: [163, 84, 84], // Red base for artifacts
      key: [163, 152, 84], // Bronze base for keys
      omen: [84, 99, 163], // Blue base for omens
      distilled: [163, 84, 163], // Pink base for distilled emotions
    };

    const type = Object.keys(baseColors).find(t => name.toLowerCase().includes(t)) || "orb";
    const baseColor = baseColors[type as keyof typeof baseColors];

    // Modify the base color using the hash
    const color = `rgb(${baseColor[0] + (hash % 30)}, ${baseColor[1] + ((hash >> 8) % 30)}, ${baseColor[2] + ((hash >> 16) % 30)})`;

    // Generate deterministic patterns based on name hash
    const getStableNumber = (shift: number, mod: number) => {
      const shiftedHash = (hash >> shift) & 0xFFFFFFFF; // Ensure 32-bit integer
      return Math.abs(shiftedHash % mod);
    };

    const numPatterns = getStableNumber(0, 3) + 1; // 1 to 4 patterns
    const patterns = Array.from({ length: numPatterns }, (_, i) => {
      const angle = getStableNumber(i * 4, 360);
      const radius = 8 + getStableNumber(i * 3, 8);
      // Ensure the path coordinates are fixed by rounding to 3 decimal places
      const x = Math.round(radius * Math.cos(angle * Math.PI / 180) * 1000) / 1000;
      const y = Math.round(radius * Math.sin(angle * Math.PI / 180) * 1000) / 1000;
      return { x, y };
    });

    return { color, patterns };
  }, [name]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={`inline-block ${className}`}
      style={{ minWidth: size }}
    >
      {/* Background */}
      <circle cx="20" cy="20" r="18" fill="#1a1a1a" />
      
      {/* Base shape with gradient */}
      <defs>
        <radialGradient id={`grad-${name}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={visualProps.color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={visualProps.color} stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="16" fill={`url(#grad-${name})`} />
      
      {/* Deterministic patterns */}
      {visualProps.patterns.map((pattern, i) => (
        <path
          key={i}
          d={`M20,20 l${pattern.x},${pattern.y}`}
          stroke={visualProps.color}
          strokeWidth="1"
          opacity="0.6"
        />
      ))}
      
      {/* Highlight effect */}
      <circle cx="15" cy="15" r="5" fill="white" opacity="0.15" />
      
      {/* Border with glow */}
      <circle cx="20" cy="20" r="18" fill="none" stroke={visualProps.color} strokeWidth="1.5" />
    </svg>
  );
}
