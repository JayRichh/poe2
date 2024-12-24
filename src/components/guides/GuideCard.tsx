"use client";

import { Text } from "~/components/ui/Text";

interface GuideCardProps {
  title: string;
  description?: string;
  sections: {
    title: string;
    tips: string[];
  }[];
}

export function GuideCard({ title, description, sections }: GuideCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border/50 overflow-hidden hover:border-border/80 transition-colors">
      <div className="p-8">
        <Text variant="h3" className="mb-3 text-2xl">
          {title}
        </Text>
        {description && (
          <Text className="text-foreground/80 mb-8 text-lg leading-relaxed">{description}</Text>
        )}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <Text variant="h4" className="mb-4 text-xl font-semibold">
                {section.title}
              </Text>
              <ul className="list-disc list-outside space-y-3 ml-6">
                {section.tips.map((tip, tipIndex) => (
                  <li
                    key={tipIndex}
                    className="text-foreground/90 leading-relaxed break-words whitespace-normal"
                  >
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
