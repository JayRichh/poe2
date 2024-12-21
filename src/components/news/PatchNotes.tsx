import type { PatchNote, PatchNoteSection, PatchNoteHotfix } from "~/types/news";
import { Text } from "../ui/Text";
import { cn } from "~/utils/cn";

interface PatchNotesProps {
  patchNotes: PatchNote[];
}

function PatchNoteChanges({ changes }: { changes: string[] }) {
  return (
    <ul className="space-y-1.5 list-disc list-inside text-sm text-foreground/80">
      {changes.map((change, i) => (
        <li key={i} className="leading-relaxed">
          {change}
        </li>
      ))}
    </ul>
  );
}

function PatchNoteSection({ section }: { section: PatchNoteSection }) {
  return (
    <div className="space-y-2">
      <Text className="text-sm font-medium text-primary">
        {section.title}
      </Text>
      <PatchNoteChanges changes={section.changes} />
    </div>
  );
}

function PatchNoteHotfix({ hotfix }: { hotfix: PatchNoteHotfix }) {
  return (
    <div className="space-y-2 pl-4 border-l-2 border-primary/20">
      <div className="flex items-center justify-between">
        <Text className="text-sm font-medium text-primary/80">
          Hotfix {hotfix.version}
        </Text>
        <Text className="text-sm text-foreground/60">
          {new Date(hotfix.date).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </Text>
      </div>
      <PatchNoteChanges changes={hotfix.changes} />
    </div>
  );
}

export function PatchNotes({ patchNotes }: PatchNotesProps) {
  return (
    <div className="space-y-8">
      {patchNotes.map((note, index) => (
        <div 
          key={`${note.version}-${note.date}`} 
          className={cn("space-y-6", index !== 0 && "pt-8 border-t border-border/30")}
        >
          <div className="flex items-center justify-between">
            <Text variant="h4" className="font-medium">
              Version {note.version}
            </Text>
            <Text className="text-sm text-foreground/60">
              {new Date(note.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </div>

          {/* Main Sections */}
          <div className="space-y-4">
            {note.sections.map((section, idx) => (
              <PatchNoteSection key={`${section.title}-${idx}`} section={section} />
            ))}
          </div>

          {/* Hotfixes */}
          {note.hotfixes.length > 0 && (
            <div className="space-y-4 mt-4">
              <Text className="text-sm font-medium text-foreground/70">
                Hotfixes
              </Text>
              {note.hotfixes.map((hotfix, idx) => (
                <PatchNoteHotfix key={`${hotfix.version}-${idx}`} hotfix={hotfix} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
