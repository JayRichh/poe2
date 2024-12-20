import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { DPSCalc } from "@/lib/calculations";

interface ResultsProps {
  results: ReturnType<DPSCalc["getResults"]>;
}

export function Results({ results }: ResultsProps) {
  return (
    <Card className="p-6">
      <Text className="text-xl font-semibold mb-4">Results</Text>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Text className="font-medium mb-2">DPS Increase</Text>
          <Text className="text-2xl font-bold text-primary">
            {(results.dpsIncrease * 100).toFixed(1)}%
          </Text>
        </div>
        <div>
          <Text className="font-medium mb-2">Total DPS</Text>
          <div className="flex flex-col gap-1">
            <Text>Weapon 1: {Math.round(results.totalDpsWeapon1).toLocaleString()}</Text>
            <Text>Weapon 2: {Math.round(results.totalDpsWeapon2).toLocaleString()}</Text>
          </div>
        </div>
        <div className="md:col-span-2">
          <Text className="font-medium mb-2">Damage Breakdown</Text>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text className="font-medium">Weapon 1</Text>
              <div className="space-y-1">
                <Text>Physical: {Math.round(results.finalPhysicalDamage).toLocaleString()}</Text>
                <Text>Lightning: {Math.round(results.finalLightningDamage).toLocaleString()}</Text>
                <Text>Fire: {Math.round(results.finalFireDamage).toLocaleString()}</Text>
                <Text>Cold: {Math.round(results.finalColdDamage).toLocaleString()}</Text>
                <Text>Chaos: {Math.round(results.finalChaosDamage).toLocaleString()}</Text>
              </div>
            </div>
            <div>
              <Text className="font-medium">Weapon 2</Text>
              <div className="space-y-1">
                <Text>Physical: {Math.round(results.finalPhysicalDamage2).toLocaleString()}</Text>
                <Text>Lightning: {Math.round(results.finalLightningDamage2).toLocaleString()}</Text>
                <Text>Fire: {Math.round(results.finalFireDamage2).toLocaleString()}</Text>
                <Text>Cold: {Math.round(results.finalColdDamage2).toLocaleString()}</Text>
                <Text>Chaos: {Math.round(results.finalChaosDamage2).toLocaleString()}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
