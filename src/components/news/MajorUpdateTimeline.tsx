import Link from "next/link";

import { Text } from "~/components/ui/Text";

import { NewsService, type MajorVersionGroup } from "~/services/news-service";

interface MajorUpdateTimelineProps {
  groups: MajorVersionGroup[];
}

function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Major-update timeline: groups patch notes by `0.x` version so the big
 * releases (Dawn of the Hunt -> Return of the Ancients) read clearly.
 */
export function MajorUpdateTimeline({ groups }: MajorUpdateTimelineProps) {
  if (groups.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <Text variant="h4" className="mb-2">
          No updates to show yet
        </Text>
        <Text className="text-sm text-foreground/60">
          Patch-note data is currently unavailable. Check back once the archive has been refreshed.
        </Text>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <Text variant="h3">Major Updates</Text>
        <Text className="text-sm text-foreground/60">
          {groups.length} version{groups.length === 1 ? "" : "s"}
        </Text>
      </div>

      <ol className="relative space-y-8 border-l border-border/60 pl-6">
        {groups.map((group) => {
          const headline = group.posts[0];
          return (
            <li key={group.version} className="relative">
              <span
                className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <Text variant="h4" className="font-semibold">
                  {group.version === "0.1" ? "0.1.x" : group.version}
                </Text>
                {group.codename && <span className="text-sm text-primary">{group.codename}</span>}
                <span className="text-sm text-foreground/50">{formatDate(group.latestDate)}</span>
              </div>

              {headline && (
                <Link
                  href={NewsService.getNewsUrl(headline)}
                  className="mt-1 inline-block text-foreground/80 hover:text-primary transition-colors"
                >
                  {headline.title}
                </Link>
              )}

              {group.posts.length > 1 && (
                <Text className="mt-1 text-xs text-foreground/50">
                  + {group.posts.length - 1} more update{group.posts.length - 1 === 1 ? "" : "s"} in
                  this series
                </Text>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
