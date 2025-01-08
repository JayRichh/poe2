import { Text } from "~/components/ui/Text";

interface MechanicContentProps {
  sections: {
    title: string;
    content: string[];
    subsections?: {
      title: string;
      content: string[];
    }[];
  }[];
}

export function MechanicContent({ sections }: MechanicContentProps) {
  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <section key={index} className="space-y-6">
          <Text variant="h2" className="text-2xl font-bold">
            {section.title}
          </Text>

          <div className="space-y-4 text-foreground/90">
            {section.content.map((text, i) => (
              <p key={i} className="leading-relaxed">
                {text}
              </p>
            ))}
          </div>

          {section.subsections && (
            <div className="space-y-8 mt-8 pl-6">
              {section.subsections.map((subsection, subIndex) => (
                <div key={subIndex} className="space-y-4">
                  <Text variant="h3" className="text-xl font-semibold">
                    {subsection.title}
                  </Text>
                  <div className="space-y-3 text-foreground/90">
                    {subsection.content.map((text, i) => (
                      <p key={i} className="leading-relaxed">
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
