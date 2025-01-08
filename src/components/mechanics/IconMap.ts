import {
  Activity,
  ArrowUp,
  Book,
  Box,
  Coins,
  Crosshair,
  Map,
  Shield,
  Sword,
  User,
  Zap,
} from "lucide-react";

import type { ContentIcon } from "~/lib/shared/types";

export const IconMap: Record<ContentIcon, React.ComponentType<{ className?: string }>> = {
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
