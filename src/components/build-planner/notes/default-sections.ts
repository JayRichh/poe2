import type { Section } from "./NotesSections";

export const DEFAULT_SECTIONS: Section[] = [
  {
    id: "overview",
    name: "Build Overview",
    content: `# Build Overview

## Core Mechanics
- Main skills and how they synergize
- Key passive nodes and their impact
- Essential equipment pieces

## Playstyle
- How to effectively play the build
- Combat rotation and positioning
- Defensive mechanics`,
    isExpanded: true,
  },
  {
    id: "progression",
    name: "Build Progression",
    content: `# Build Progression

## Early Game (1-30)
- Starting skills and gear
- Key passive nodes to target
- Leveling tips

## Mid Game (31-60)
- Skill transitions
- Gear upgrades
- Important milestones

## Late Game (61+)
- Final skill setup
- Best-in-slot gear
- Endgame goals`,
  },
  {
    id: "equipment",
    name: "Equipment Guide",
    content: `# Equipment Guide

## Priority Stats
- List of most important stats
- Stat value ranges to aim for
- Explanation of stat synergies

## Gear Recommendations
- Best-in-slot items
- Budget alternatives
- Crafting tips`,
  },
  {
    id: "skills",
    name: "Skill Setup",
    content: `# Skill Setup

## Main Skills
- Core damage skills
- Support gem links
- Alternative gem options

## Utility Skills
- Movement abilities
- Defensive skills
- Auras and buffs`,
  },
  {
    id: "diagrams",
    name: "Visual Guides",
    content: "Use the canvas below to create visual guides for your build.",
  },
];
