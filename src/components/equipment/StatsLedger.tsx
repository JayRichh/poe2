"use client";

import { cn } from "~/utils/cn";

import { type EquipmentAggregate, flatAddedAverages } from "~/lib/equipment/aggregate";
import type { DamageType } from "~/types/equipment";

interface StatsLedgerProps {
  aggregate: EquipmentAggregate;
}

const DAMAGE_TOKEN: Record<DamageType, string> = {
  physical: "text-damage-physical",
  fire: "text-damage-fire",
  cold: "text-damage-cold",
  lightning: "text-damage-lightning",
  chaos: "text-damage-chaos",
};

function Row({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1">
      <span className="text-sm text-foreground-secondary">{label}</span>
      <span className={cn("font-mono text-sm tabular-nums", valueClass ?? "text-foreground")}>
        {value}
      </span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-0.5">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary/80">
        {title}
      </div>
      {children}
    </div>
  );
}

export function StatsLedger({ aggregate: a }: StatsLedgerProps) {
  const flat = flatAddedAverages(a);
  const flatTypes = (Object.keys(flat) as DamageType[]).filter((t) => flat[t] > 0);
  const pct = (n: number) => `${n > 0 ? "+" : ""}${n}%`;

  const resColor = (v: number) =>
    v < 0 ? "text-error" : v >= 75 ? "text-success" : "text-foreground";

  return (
    <div className="space-y-5 rounded-xl border border-primary/20 bg-background-secondary/60 p-5 shadow-inner">
      <div className="text-sm font-semibold tracking-tight text-foreground">Aggregated Stats</div>

      <Section title="Defence">
        <Row label="Armour" value={a.armour.toLocaleString()} />
        <Row label="Evasion" value={a.evasion.toLocaleString()} />
        <Row label="Energy Shield" value={a.energyShield.toLocaleString()} />
        <Row label="Maximum Life" value={`+${a.life}`} />
      </Section>

      <Section title="Resistances">
        <Row label="Fire" value={pct(a.resistances.fire)} valueClass={resColor(a.resistances.fire)} />
        <Row label="Cold" value={pct(a.resistances.cold)} valueClass={resColor(a.resistances.cold)} />
        <Row
          label="Lightning"
          value={pct(a.resistances.lightning)}
          valueClass={resColor(a.resistances.lightning)}
        />
        <Row label="Chaos" value={pct(a.resistances.chaos)} valueClass={resColor(a.resistances.chaos)} />
      </Section>

      <Section title="Offence">
        {flatTypes.length > 0 &&
          flatTypes.map((t) => (
            <Row
              key={t}
              label={`Added ${t} (avg)`}
              value={flat[t].toFixed(1)}
              valueClass={DAMAGE_TOKEN[t]}
            />
          ))}
        {a.increasedDamage !== 0 && <Row label="Increased Damage" value={pct(a.increasedDamage)} />}
        {a.moreDamage !== 0 && <Row label="More Damage" value={pct(a.moreDamage)} />}
        {a.increasedAttackSpeed !== 0 && (
          <Row label="Attack Speed" value={pct(a.increasedAttackSpeed)} />
        )}
        {a.increasedCritChance !== 0 && (
          <Row label="Crit Chance" value={pct(a.increasedCritChance)} />
        )}
        {a.critDamageBonus !== 0 && <Row label="Crit Damage Bonus" value={pct(a.critDamageBonus)} />}
        {a.accuracy !== 0 && <Row label="Accuracy" value={`+${a.accuracy}`} />}
        {a.penetration !== 0 && <Row label="Penetration" value={pct(a.penetration)} />}
        {a.resShred !== 0 && <Row label="Enemy Res Reduction" value={pct(a.resShred)} />}
      </Section>

      <Section title="Attributes">
        <Row label="Strength" value={`+${a.attributes.strength}`} valueClass="text-gem-ruby" />
        <Row label="Dexterity" value={`+${a.attributes.dexterity}`} valueClass="text-gem-emerald" />
        <Row
          label="Intelligence"
          value={`+${a.attributes.intelligence}`}
          valueClass="text-gem-sapphire"
        />
      </Section>
    </div>
  );
}
