'use client';

import React, { useMemo } from 'react';
import { TreeData } from '../../components/TreeViewer/data';
import { calculateNodeStats, formatStatValue, sortStats } from '../../utils/statsCalculator';

interface StatsPanelProps {
  treeData: TreeData | null;
  allocatedNodes: Set<string>;
  className?: string;
}

export function StatsPanel({
  treeData,
  allocatedNodes,
  className = ''
}: StatsPanelProps) {
  const stats = useMemo(() => {
    if (!treeData) return [];
    return sortStats(calculateNodeStats(allocatedNodes, treeData));
  }, [allocatedNodes, treeData]);

  const statCategories = useMemo(() => {
    const categories: Record<string, [string, number][]> = {
      'Offensive': [],
      'Defensive': [],
      'Other': []
    };

    stats.forEach(stat => {
      const [name, value] = stat;
      if (name.includes('damage') || name.includes('attack') || name.includes('spell') || 
          name.includes('critical') || name.includes('speed')) {
        categories['Offensive'].push(stat);
      } else if (name.includes('life') || name.includes('mana') || name.includes('resistance') || 
                 name.includes('defence') || name.includes('block')) {
        categories['Defensive'].push(stat);
      } else {
        categories['Other'].push(stat);
      }
    });

    return categories;
  }, [stats]);

  if (stats.length === 0) {
    return (
      <div className={`text-gray-400 text-center p-4 ${className}`}>
        No stats to display
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {Object.entries(statCategories).map(([category, categoryStats]) => {
        if (categoryStats.length === 0) return null;

        return (
          <div key={category}>
            <h3 className="text-lg font-bold mb-3">{category}</h3>
            <div className="space-y-2">
              {categoryStats.map(([stat, value]) => (
                <div 
                  key={stat}
                  className="flex justify-between items-center bg-gray-800 rounded-lg p-2"
                >
                  <span className="text-sm capitalize">
                    {stat.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`text-sm font-medium
                    ${value > 0 ? 'text-green-400' : value < 0 ? 'text-red-400' : 'text-gray-400'}`}
                  >
                    {formatStatValue(value, stat)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Total allocated nodes */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Allocated Nodes</span>
          <span className="text-sm text-blue-400">{allocatedNodes.size}</span>
        </div>
      </div>
    </div>
  );
}

interface StatTooltipProps {
  stat: string;
  value: number;
}

export function StatTooltip({ stat, value }: StatTooltipProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="capitalize">{stat.replace(/([A-Z])/g, ' $1').trim()}</span>
      <span className={value > 0 ? 'text-green-400' : value < 0 ? 'text-red-400' : 'text-gray-400'}>
        {formatStatValue(value, stat)}
      </span>
    </div>
  );
}
