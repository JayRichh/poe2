"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, AlertCircle, Check } from "lucide-react";
import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import { NotesEditor } from "~/components/build-planner/notes/NotesEditor";
import { DrawingCanvas } from "~/components/build-planner/notes/DrawingCanvas";
import { NotesSections, Section } from "~/components/build-planner/notes/NotesSections";
import { Text } from "~/components/ui/Text";
import { Alert } from "@/components/ui/Alert";

const DEFAULT_SECTIONS: Section[] = [
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
    isExpanded: true
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
  }
];

export default function NotesPage() {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("build-notes");
      return saved ? JSON.parse(saved) : DEFAULT_SECTIONS;
    }
    return DEFAULT_SECTIONS;
  });
  
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const debouncedSave = useCallback(
    debounce((newSections: Section[]) => {
      setIsSaving(true);
      try {
        localStorage.setItem("build-notes", JSON.stringify(newSections));
        setFeedback({ type: "success", message: "Changes saved" });
        setError(null);
      } catch (error) {
        setError("Failed to save changes. Please try again.");
        setFeedback({ type: "error", message: "Failed to save changes" });
      }
      setTimeout(() => {
        setIsSaving(false);
        setFeedback(null);
      }, 2000);
    }, 1000),
    []
  );

  const handleContentChange = (sectionId: string, newContent: string) => {
    const newSections = sections.map(section => 
      section.id === sectionId 
        ? { 
            ...section, 
            content: newContent,
            lastSaved: new Date().toISOString()
          }
        : section
    );
    setSections(newSections);
    debouncedSave(newSections);
  };

  const handleSectionChange = (newSections: Section[]) => {
    setSections(newSections);
    debouncedSave(newSections);
  };

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? { ...section, isExpanded: !section.isExpanded }
        : section
    ));
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "build-notes" && e.newValue) {
        setSections(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BuildPlannerLayout
      title="Build Notes"
      description="Document your build strategy and mechanics"
      actions={
        <div className="flex items-center gap-2">
          {isSaving && (
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <Save className="h-4 w-4 animate-pulse" />
              Saving...
            </div>
          )}
          {feedback && (
            <div className={`flex items-center gap-2 ${
              feedback.type === "success" ? "text-emerald-500" : "text-red-500"
            }`}>
              {feedback.type === "success" ? (
                <Check className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <span className="text-sm">{feedback.message}</span>
            </div>
          )}
        </div>
      }
      sidebar={
        <div className="py-4">
          <div className="px-2">
            <NotesSections
              sections={sections}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              onActiveChange={setActiveSection}
              onToggleExpand={toggleSection}
            />
          </div>

          <div className="border-t border-border/30 my-4" />

          <div className="px-4">
            <Text className="text-sm font-medium text-foreground/70 px-1 mb-2">Quick Links</Text>
            <div className="space-y-1">
              {[
                { name: "Passive Tree", path: "/build-planner" },
                { name: "Equipment", path: "/build-planner/equipment" },
                { name: "Skills", path: "/build-planner/skills" },
                { name: "Stats", path: "/build-planner/stats" },
              ].map((link) => (
                <button
                  key={link.path}
                  onClick={() => router.push(link.path)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        {sections.map((section) => (
          <div
            key={section.id}
            className={`space-y-4 ${section.id === activeSection || section.isExpanded ? "" : "hidden"}`}
          >
            <Text className="text-xl font-medium">{section.name}</Text>

            {section.id === "diagrams" ? (
              <DrawingCanvas />
            ) : (
              <NotesEditor
                content={section.content}
                onChange={(content) => handleContentChange(section.id, content)}
              />
            )}
          </div>
        ))}
      </div>
    </BuildPlannerLayout>
  );
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
