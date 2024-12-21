import { PatchNote } from "@/types/news";

import { Text } from "~/components/ui/Text";

interface PatchNotesProps {
  patchNotes: PatchNote[];
}

export function PatchNotes({ patchNotes }: PatchNotesProps) {
  return (
    <div className="space-y-8">
      {patchNotes.map((patch) => (
        <div key={patch.version} className="space-y-4">
          <div className="border-b border-border pb-2">
            <Text variant="h3" className="flex items-center gap-2">
              Version {patch.version}
              <span className="text-sm font-normal text-muted-foreground">
                {new Date(patch.date).toLocaleDateString()}
              </span>
            </Text>
          </div>

          <div className="space-y-6">
            {patch.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <Text variant="h4" className="text-lg font-semibold">
                  {section.title}
                </Text>
                <ul className="list-disc pl-6 space-y-1.5">
                  {section.changes.map((change, changeIdx) => (
                    <li key={changeIdx} className="text-sm text-muted-foreground">
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {patch.hotfixes && patch.hotfixes.length > 0 && (
            <div className="mt-6 space-y-4">
              <Text variant="h4" className="text-lg font-semibold">
                Hotfixes
              </Text>
              {patch.hotfixes.map((hotfix, idx) => (
                <div key={idx} className="space-y-2">
                  <Text variant="body" weight="medium" className="text-sm">
                    Hotfix {hotfix.version} - {new Date(hotfix.date).toLocaleDateString()}
                  </Text>
                  <ul className="list-disc pl-6 space-y-1.5">
                    {hotfix.changes.map((change, changeIdx) => (
                      <li key={changeIdx} className="text-sm text-muted-foreground">
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
