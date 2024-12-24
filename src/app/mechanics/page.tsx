import { Activity, ArrowUp, Book, Box, Coins, Crosshair, Map, Shield, Sword, User, Zap } from "lucide-react";
import { mechanicsWithMeta } from "~/lib/mechanics/data";
import type { ContentIcon } from "~/lib/shared/types";

const IconMap: Record<ContentIcon, React.ComponentType<{ className?: string }>> = {
  Zap,
  Activity,
  User,
  Coins,
  Book,
  Sword,
  Shield,
  Box,
  Crosshair,
  ArrowUp,
  Map,
};

export default function MechanicsPage() {
  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mechanicsWithMeta.map((mechanic) => {
          const Icon = IconMap[mechanic.icon] || Book;
          return (
            <a
              key={mechanic.id}
              href={`/mechanics/${mechanic.id}`}
              className="group block p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {mechanic.title}
                  </h3>
                </div>
                <p className="text-sm text-foreground/70">{mechanic.description}</p>
                {mechanic.sections.length > 0 && (
                  <p className="text-xs text-primary mt-1">
                    {mechanic.sections.length} section{mechanic.sections.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </a>
          );
        })}
    </div>
  );
}
