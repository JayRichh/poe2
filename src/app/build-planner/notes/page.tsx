"use client";

import { Alert } from "@/components/ui/Alert";
import { AlertCircle, Check, Save } from "lucide-react";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import dynamic from 'next/dynamic';
import { NotesSections, Section } from "~/components/build-planner/notes/NotesSections";
import { DEFAULT_SECTIONS } from "~/components/build-planner/notes/default-sections";

const DrawingCanvas = dynamic(
  () => import("~/components/build-planner/notes/DrawingCanvas").then(mod => mod.DrawingCanvas),
  {
    loading: () => <div className="h-96 bg-muted/10 animate-pulse rounded-lg" />,
    ssr: false
  }
);

const NotesEditor = dynamic(
  () => import("~/components/build-planner/notes/NotesEditor").then(mod => mod.NotesEditor),
  {
    loading: () => <div className="h-64 bg-muted/10 animate-pulse rounded-lg" />,
    ssr: false
  }
);
import { Text } from "~/components/ui/Text";


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
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

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
    const newSections = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            content: newContent,
            lastSaved: new Date().toISOString(),
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
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section
      )
    );
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
            <div
              className={`flex items-center gap-2 ${
                feedback.type === "success" ? "text-emerald-500" : "text-red-500"
              }`}
            >
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
