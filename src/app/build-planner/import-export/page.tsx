"use client";

import { useState, useCallback } from "react";
import { FileUp, Clipboard, Code, Link2, AlertCircle, Check } from "lucide-react";
import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Input } from "~/components/ui/Input";
import { Text } from "~/components/ui/Text";

const EXPORT_OPTIONS = [
  { id: "all", name: "Everything", description: "Export all build data" },
  { id: "tree", name: "Passive Tree", description: "Export passive tree configuration" },
  { id: "equipment", name: "Equipment", description: "Export equipment and inventory" },
  { id: "skills", name: "Skills", description: "Export skill gems and links" },
  { id: "notes", name: "Notes", description: "Export build notes and guides" },
] as const;

const IMPORT_SOURCES = [
  { id: "file", name: "From File", description: "Import from a JSON or POB file", icon: FileUp },
  { id: "clipboard", name: "From Clipboard", description: "Import from clipboard data", icon: Clipboard },
  { id: "code", name: "From Code", description: "Import using a build code", icon: Code },
  { id: "url", name: "From URL", description: "Import from a build URL", icon: Link2 },
] as const;

export default function ImportExportPage() {
  const [selectedExport, setSelectedExport] = useState<string>("all");
  const [selectedImport, setSelectedImport] = useState<string>("file");
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [importData, setImportData] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setFeedback(null);
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeedback({ type: "success", message: "Build exported successfully" });
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to export build" });
    }
    setIsExporting(false);
  };

  const handleImport = async () => {
    setIsImporting(true);
    setFeedback(null);
    try {
      // Simulate import
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeedback({ type: "success", message: "Build imported successfully" });
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to import build" });
    }
    setIsImporting(false);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file
      handleImport();
    }
  }, []);

  return (
    <BuildPlannerLayout
      title="Import/Export"
      description="Share or backup your build configuration"
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 bg-background/50 rounded-xl border border-border/50 shadow-sm">
        {/* Export */}
        <div className="space-y-6 p-4 rounded-lg bg-background">
          <Text className="text-xl font-medium">Export Build</Text>

          <div className="space-y-3">
            {EXPORT_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`block p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/70 focus-within:ring-2 focus-within:ring-primary/50 ${
                  selectedExport === option.id
                    ? "bg-primary/5 border-primary shadow-sm"
                    : "border-border/50"
                }`}
              >
                <input
                  type="radio"
                  name="export"
                  value={option.id}
                  checked={selectedExport === option.id}
                  onChange={(e) => setSelectedExport(e.target.value)}
                  className="hidden"
                />
                <div className="flex flex-col">
                  <Text className="font-medium">{option.name}</Text>
                  <Text className="text-sm text-foreground/60">
                    {option.description}
                  </Text>
                </div>
              </label>
            ))}
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border/50 space-y-4">
              <Text className="font-medium">Export Format</Text>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 flex flex-col items-center gap-1"
                >
                  <span>JSON</span>
                  <span className="text-xs opacity-80">Export as JSON file</span>
                </button>
                <button 
                  className="px-4 py-2 rounded-lg border border-border/50 text-sm hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 flex flex-col items-center gap-1"
                >
                  <span>Path of Building</span>
                  <span className="text-xs opacity-80">Export as POB code</span>
                </button>
              </div>
            </div>

            <Button 
              variant="primary" 
              className="w-full"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : "Export Build"}
            </Button>
          </div>
        </div>

        {/* Import */}
        <div className="space-y-6 p-4 rounded-lg bg-background">
          <Text className="text-xl font-medium">Import Build</Text>

          <div className="space-y-3">
            {IMPORT_SOURCES.map((source) => (
              <label
                key={source.id}
                className={`block p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/70 focus-within:ring-2 focus-within:ring-primary/50 ${
                  selectedImport === source.id
                    ? "bg-primary/5 border-primary shadow-sm"
                    : "border-border/50"
                }`}
              >
                <input
                  type="radio"
                  name="import"
                  value={source.id}
                  checked={selectedImport === source.id}
                  onChange={(e) => setSelectedImport(e.target.value)}
                  className="hidden"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <source.icon className="h-5 w-5 text-foreground/60" />
                    <Text className="font-medium">{source.name}</Text>
                  </div>
                  <Text className="text-sm text-foreground/60 pl-7">
                    {source.description}
                  </Text>
                </div>
              </label>
            ))}
          </div>

          <div className="space-y-4">
            {selectedImport === "file" && (
              <div
                className={`p-8 rounded-lg border-2 border-dashed transition-colors cursor-pointer hover:border-primary/70 ${
                  dragActive ? "border-primary bg-primary/5 shadow-sm" : "border-border/50"
                } text-center flex flex-col items-center justify-center min-h-[200px]`}
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
                <FileUp className="h-8 w-8 mx-auto mb-2 text-foreground/60" />
                <Text className="font-medium">Drop File Here</Text>
                <Text className="text-sm text-foreground/60 mt-1">
                  or click to select file
                </Text>
                <input 
                  id="file-upload"
                  type="file" 
                  className="hidden" 
                  onChange={() => handleImport()}
                />
              </div>
            )}

            {(selectedImport === "clipboard" || selectedImport === "code" || selectedImport === "url") && (
              <div className="p-4 rounded-lg border border-border/50 transition-all hover:border-primary/50">
                {selectedImport === "clipboard" ? (
                  <textarea
                    className="w-full h-[200px] bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md text-sm p-2"
                    placeholder="Paste build data here..."
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                  />
                ) : (
                  <Input
                    type={selectedImport === "url" ? "url" : "text"}
                    placeholder={selectedImport === "url" ? "Enter build URL..." : "Enter build code..."}
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    className="w-full"
                  />
                )}
              </div>
            )}

            <Button 
              variant="primary" 
              className="w-full"
              onClick={handleImport}
              disabled={isImporting}
            >
              {isImporting ? "Importing..." : "Import Build"}
            </Button>
          </div>

          {feedback && (
            <div className={`p-4 rounded-lg flex items-center gap-2 ${
              feedback.type === "success" ? "bg-emerald-500/10" : "bg-red-500/10"
            }`}>
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

          <div className="p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-foreground/60" />
              <Text className="text-sm text-foreground/60">
                Note: Importing a build will overwrite your current build configuration.
                Make sure to backup your current build if needed.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </BuildPlannerLayout>
  );
}
