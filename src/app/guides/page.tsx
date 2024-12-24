import { guides } from "~/lib/guides/data";

export default function GuidesPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Guides</h1>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(guides).map(([id, guide]) => (
          <a
            key={id}
            href={`/guides/${id}`}
            className="block p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">{guide.title}</h3>
              <p className="text-sm text-foreground/70">{guide.description}</p>
              {guide.sections.length > 0 && (
                <p className="text-xs text-primary mt-2">
                  {guide.sections.length} section{guide.sections.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
