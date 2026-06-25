"use client";

import { ModifierList } from "~/components/speed-calc/ModifierList";
import { ActionResults, MovementResults } from "~/components/speed-calc/SpeedResults";
import { Button } from "~/components/ui/Button";
import { Card } from "~/components/ui/Card";
import { Input } from "~/components/ui/Input";
import { Text } from "~/components/ui/Text";

import { useSpeedCalculator } from "~/hooks/useSpeedCalculator";

export function SpeedCalculator() {
  const {
    state,
    movement,
    action,
    setBaseRunSpeed,
    setBaseAps,
    setActionLabel,
    addModifier,
    updateModifier,
    removeModifier,
  } = useSpeedCalculator();

  return (
    <div className="space-y-8">
      {/* Movement speed */}
      <Card className="p-6 space-y-6">
        <div>
          <Text variant="h3">Movement speed</Text>
          <Text variant="body-sm" color="secondary" className="mt-1">
            Effective speed = base × (1 + sum of increased/reduced %). All movement-speed modifiers
            stack additively into one bucket; chill and temporal slows are reductions (negative).
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Text variant="body" weight="medium">
                Base run speed
              </Text>
              <Input
                type="number"
                step={1}
                value={state.baseRunSpeed}
                aria-label="Base run speed"
                onChange={(e) => setBaseRunSpeed(Number(e.target.value))}
              />
              <Text variant="caption" color="secondary">
                Use 100 to read the result as a percentage of base. PoE2 0.5.x does not publish a
                single numeric base run speed — enter your own units if you have them.
              </Text>
            </div>

            <ModifierList
              title="Movement modifiers"
              hint="Boots %, skill/passive bonuses; enter chill / temporal / slow effects as negatives."
              modifiers={state.movementModifiers}
              onAdd={() => addModifier("movementModifiers")}
              onUpdate={(id, patch) => updateModifier("movementModifiers", id, patch)}
              onRemove={(id) => removeModifier("movementModifiers", id)}
            />
          </div>

          <MovementResults movement={movement} />
        </div>
      </Card>

      {/* Attack / cast speed */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Text variant="h3">Attack / cast speed</Text>
            <Text variant="body-sm" color="secondary" className="mt-1">
              Effective APS = base × (1 + sum increased %). &quot;Increased&quot; stacks additively;
              &quot;more&quot; would multiply. Time per action is the reciprocal of effective APS.
            </Text>
          </div>
          <div className="flex rounded-md border border-border/50 p-0.5">
            {(["attack", "cast"] as const).map((opt) => (
              <Button
                key={opt}
                variant={state.actionLabel === opt ? "primary" : "ghost"}
                size="sm"
                onClick={() => setActionLabel(opt)}
                className="capitalize"
              >
                {opt}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Text variant="body" weight="medium">
                Base {state.actionLabel} speed (APS)
              </Text>
              <Input
                type="number"
                step={0.05}
                min={0}
                value={state.baseAps}
                aria-label="Base attacks or casts per second"
                onChange={(e) => setBaseAps(Math.max(0, Number(e.target.value)))}
              />
              <Text variant="caption" color="secondary">
                Read this off your weapon&apos;s &quot;Attacks per Second&quot; or your skill&apos;s
                base cast rate — values vary per weapon/skill and are not baked in here.
              </Text>
            </div>

            <ModifierList
              title="Increased speed modifiers"
              hint="Gear, passives, buffs as positives; less-speed / slows as negatives."
              modifiers={state.attackIncreasedModifiers}
              onAdd={() => addModifier("attackIncreasedModifiers")}
              onUpdate={(id, patch) => updateModifier("attackIncreasedModifiers", id, patch)}
              onRemove={(id) => removeModifier("attackIncreasedModifiers", id)}
            />
          </div>

          <ActionResults action={action} actionLabel={state.actionLabel} />
        </div>
      </Card>
    </div>
  );
}
