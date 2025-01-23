import { TabControl } from "~/components/ui/TabControl";

interface LadderSelectorProps {
  selectedLadder: string;
  onSelect: (ladder: string) => void;
  ladders: readonly string[];
}

export function LadderSelector({ selectedLadder, onSelect, ladders }: LadderSelectorProps) {
  const tabs = [
    { id: "overall", label: "Overall" },
    ...ladders.map(ladder => ({ id: ladder, label: ladder }))
  ];

  return (
    <div className="w-full max-w-3xl mb-8">
      <TabControl
        tabs={tabs}
        activeTab={selectedLadder}
        onChange={onSelect}
      />
    </div>
  );
}
