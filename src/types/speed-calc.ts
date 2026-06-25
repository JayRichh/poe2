import type { SpeedModifier } from "~/lib/speed";

/** A modifier row in the UI: a label the user can edit plus a percent value. */
export interface ModifierRow extends SpeedModifier {
  /** Stable id for list rendering / updates. */
  id: string;
}

export interface SpeedCalculatorState {
  /** Movement-speed inputs. */
  baseRunSpeed: number;
  movementModifiers: ModifierRow[];

  /** Attack/cast-speed inputs. */
  baseAps: number;
  actionLabel: "attack" | "cast";
  attackIncreasedModifiers: ModifierRow[];
}
