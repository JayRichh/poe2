"use client";

import { AlertCircle, Check, Clipboard, Download, Link2, Trash2, Upload } from "lucide-react";

import { useCallback, useEffect, useState } from "react";

import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Text } from "~/components/ui/Text";

import { validateFile } from "~/utils/validation";

import {
  buildShareUrl,
  decodeTokenToBuild,
  extractTokenFromLocation,
} from "~/lib/build-planner/share";
import {
  deleteBuild,
  getActiveBuild,
  getActiveBuildId,
  importBuild,
  listBuilds,
  setActiveBuildId,
} from "~/lib/build-planner/storage";
import type { PlannerBuild } from "~/lib/build-planner/types";

type Feedback = { type: "success" | "error"; message: string };

export default function ImportExportPage() {
  const [builds, setBuilds] = useState<PlannerBuild[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const refresh = useCallback(() => {
    setBuilds(listBuilds());
    setActiveId(getActiveBuildId());
  }, []);

  useEffect(() => {
    refresh();
    // Auto-import a build shared via the URL hash (#b=...) on first load.
    if (typeof window !== "undefined" && window.location.hash) {
      const token = extractTokenFromLocation(window.location.hash);
      if (token) {
        const shared = decodeTokenToBuild(token);
        if (shared) {
          const created = importBuild(shared.name, shared.data, shared.poeClass);
          setFeedback({ type: "success", message: `Imported shared build "${created.name}"` });
          // Clear the hash so a refresh doesn't re-import.
          history.replaceState(null, "", window.location.pathname);
          refresh();
        }
      }
    }
  }, [refresh]);

  const flash = (f: Feedback) => {
    setFeedback(f);
    setTimeout(() => setFeedback(null), 4000);
  };

  /* ── Export ─────────────────────────────────────────────── */

  const exportJson = () => {
    const build = getActiveBuild() ?? builds[0];
    if (!build) {
      flash({ type: "error", message: "No build to export. Save one first." });
      return;
    }
    const blob = new Blob([JSON.stringify(build, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${build.name.replace(/[^a-z0-9_-]+/gi, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    flash({ type: "success", message: `Exported "${build.name}" as JSON` });
  };

  const generateShareUrl = async () => {
    const build = getActiveBuild() ?? builds[0];
    if (!build) {
      flash({ type: "error", message: "No build to share. Save one first." });
      return;
    }
    const url = buildShareUrl(build);
    setShareUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      flash({ type: "success", message: "Share URL copied to clipboard" });
    } catch {
      flash({ type: "success", message: "Share URL generated" });
    }
  };

  /* ── Import ─────────────────────────────────────────────── */

  const importFromText = (raw: string) => {
    const text = raw.trim();
    if (!text) {
      flash({ type: "error", message: "Nothing to import" });
      return;
    }
    // Try a share token / URL first, then raw JSON.
    const token = extractTokenFromLocation(text) ?? text;
    const shared = decodeTokenToBuild(token);
    if (shared) {
      const created = importBuild(shared.name, shared.data, shared.poeClass);
      flash({ type: "success", message: `Imported "${created.name}"` });
      setImportText("");
      refresh();
      return;
    }
    try {
      const parsed = JSON.parse(text) as Partial<PlannerBuild>;
      if (!parsed || typeof parsed !== "object" || !parsed.data) {
        throw new Error("missing data");
      }
      const created = importBuild(parsed.name || "Imported Build", parsed.data, parsed.poeClass);
      flash({ type: "success", message: `Imported "${created.name}"` });
      setImportText("");
      refresh();
    } catch {
      flash({ type: "error", message: "Could not parse build data (expected JSON or share code)" });
    }
  };

  const handleFile = (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      flash({ type: "error", message: validation.error || "Invalid file" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => importFromText(String(reader.result ?? ""));
    reader.onerror = () => flash({ type: "error", message: "Failed to read file" });
    reader.readAsText(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  /* ── Saved-build CRUD ───────────────────────────────────── */

  const makeActive = (id: string) => {
    setActiveBuildId(id);
    refresh();
    flash({ type: "success", message: "Build set as active" });
  };

  const remove = (id: string, name: string) => {
    deleteBuild(id);
    refresh();
    flash({ type: "success", message: `Deleted "${name}"` });
  };

  return (
    <BuildPlannerLayout
      title="Import / Export"
      description="Save builds locally, share via URL, or back up to JSON"
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-8">
        {feedback && (
          <div
            className={`p-4 rounded-lg flex items-center gap-2 ${
              feedback.type === "success" ? "bg-emerald-500/10" : "bg-red-500/10"
            }`}
          >
            {feedback.type === "success" ? (
              <Check className="h-5 w-5 text-emerald-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <Text className={feedback.type === "success" ? "text-emerald-500" : "text-red-500"}>
              {feedback.message}
            </Text>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Export */}
          <div className="space-y-6 p-6 rounded-xl border border-border/50 bg-background/50">
            <Text className="text-xl font-medium">Export &amp; Share</Text>
            <Text className="text-sm text-foreground/60">
              Export the active build as a JSON file, or generate a compressed share URL that
              encodes the entire build in the link.
            </Text>
            <div className="flex flex-col gap-3">
              <Button variant="primary" onClick={exportJson} className="justify-center gap-2">
                <Download className="h-4 w-4" /> Export JSON
              </Button>
              <Button variant="outline" onClick={generateShareUrl} className="justify-center gap-2">
                <Link2 className="h-4 w-4" /> Copy Share URL
              </Button>
            </div>
            {shareUrl && (
              <div className="p-3 rounded-lg border border-border/50 bg-muted/30 break-all text-xs text-foreground/70">
                {shareUrl}
              </div>
            )}
          </div>

          {/* Import */}
          <div className="space-y-6 p-6 rounded-xl border border-border/50 bg-background/50">
            <Text className="text-xl font-medium">Import</Text>
            <div
              className={`p-8 rounded-lg border-2 border-dashed transition-colors cursor-pointer text-center flex flex-col items-center justify-center min-h-[140px] ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border/50 hover:border-primary/70"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  document.getElementById("file-upload")?.click();
                }
              }}
            >
              <Upload className="h-7 w-7 mb-2 text-foreground/60" />
              <Text className="font-medium">Drop a JSON file here</Text>
              <Text className="text-sm text-foreground/60 mt-1">or click to select a file</Text>
              <input
                id="file-upload"
                type="file"
                accept=".json,.txt,application/json,text/plain"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = "";
                }}
              />
            </div>

            <div className="space-y-2">
              <Text className="text-sm font-medium">Paste JSON or a share code / URL</Text>
              <textarea
                className="w-full h-28 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md border border-border/50 text-sm p-3"
                placeholder="Paste build JSON, a share code, or a share URL..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
              />
              <Button
                variant="primary"
                className="w-full justify-center gap-2"
                onClick={() => importFromText(importText)}
              >
                <Clipboard className="h-4 w-4" /> Import
              </Button>
            </div>
          </div>
        </div>

        {/* Saved builds (localStorage CRUD list) */}
        <div className="space-y-4 p-6 rounded-xl border border-border/50 bg-background/50">
          <div className="flex items-center justify-between">
            <Text className="text-xl font-medium">Saved Builds</Text>
            <Text className="text-sm text-foreground/60">
              {builds.length} saved {builds.length === 1 ? "build" : "builds"}
            </Text>
          </div>

          {builds.length === 0 ? (
            <div className="p-8 rounded-lg border border-dashed border-border/50 text-center">
              <Text className="text-foreground/60">
                No saved builds yet. Use the Save button on the Equipment, Skills, or Stats pages,
                or import one above.
              </Text>
            </div>
          ) : (
            <div className="space-y-2">
              {builds.map((build) => (
                <div
                  key={build.id}
                  className={`flex items-center justify-between gap-4 p-3 rounded-lg border transition-colors ${
                    build.id === activeId
                      ? "border-primary/50 bg-primary/5"
                      : "border-border/50 hover:bg-muted/30"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Text className="font-medium truncate">{build.name}</Text>
                      {build.id === activeId && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          Active
                        </span>
                      )}
                    </div>
                    <Text className="text-xs text-foreground/50">
                      Updated {new Date(build.updatedAt).toLocaleString()}
                    </Text>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {build.id !== activeId && (
                      <Button variant="ghost" size="sm" onClick={() => makeActive(build.id)}>
                        Set Active
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(build.id, build.name)}
                      aria-label={`Delete ${build.name}`}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 rounded-lg bg-muted/30 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-foreground/60 flex-shrink-0" />
          <Text className="text-sm text-foreground/60">
            Builds are stored only in this browser&apos;s local storage. Export to JSON or copy a
            share URL to keep a backup or move a build to another device.
          </Text>
        </div>
      </div>
    </BuildPlannerLayout>
  );
}
