import { TreeData, TreeNodeData } from '../components/TreeViewer/data';

interface StatMap {
  [key: string]: number;
}

// Extract numeric values from stat strings
function extractStatValue(stat: string): { name: string; value: number } {
  const match = stat.match(/([+-]?\d+(?:\.\d+)?%?)|\{(\d+)\}/);
  if (!match) return { name: stat, value: 0 };

  const value = parseFloat(match[1] || match[2]);
  const name = stat.replace(match[0], '').trim();

  return { name, value };
}

// Normalize stat names for consistent grouping
function normalizeStatName(name: string): string {
  return name
    .toLowerCase()
    .replace(/increased/g, 'inc')
    .replace(/decreased/g, 'dec')
    .replace(/maximum/g, 'max')
    .replace(/minimum/g, 'min')
    .replace(/additional/g, 'add')
    .replace(/chance to/g, 'chance')
    .replace(/multiplier/g, 'multi')
    .replace(/\s+/g, '_');
}

// Calculate total stats from allocated nodes
export function calculateNodeStats(
  allocatedNodes: Set<string>,
  treeData: TreeData
): [string, number][] {
  const stats: StatMap = {};

  // Process each allocated node
  allocatedNodes.forEach(nodeId => {
    const node = treeData.nodes[nodeId];
    if (!node) return;

    // Process node descriptions
    node.description.forEach(desc => {
      const { name, value } = extractStatValue(desc);
      if (!name) return;

      const normalizedName = normalizeStatName(name);
      stats[normalizedName] = (stats[normalizedName] || 0) + value;
    });
  });

  return Object.entries(stats);
}

// Sort stats by category and value
export function sortStats(stats: [string, number][]): [string, number][] {
  return stats.sort((a, b) => {
    // First sort by category
    const catA = getStatCategory(a[0]);
    const catB = getStatCategory(b[0]);
    if (catA !== catB) return catA.localeCompare(catB);

    // Then sort by absolute value (descending)
    return Math.abs(b[1]) - Math.abs(a[1]);
  });
}

// Get stat category for sorting
function getStatCategory(stat: string): string {
  if (stat.includes('damage') || stat.includes('attack') || 
      stat.includes('spell') || stat.includes('critical')) {
    return 'offensive';
  }
  if (stat.includes('life') || stat.includes('mana') || 
      stat.includes('resistance') || stat.includes('defence')) {
    return 'defensive';
  }
  return 'other';
}

// Format stat value for display
export function formatStatValue(value: number, stat: string): string {
  // Handle percentage stats
  if (stat.includes('percent') || 
      stat.includes('chance') || 
      stat.includes('multiplier')) {
    return `${value > 0 ? '+' : ''}${value}%`;
  }

  // Handle flat values
  return value > 0 ? `+${value}` : value.toString();
}

// Get stat color based on value
export function getStatColor(value: number): string {
  if (value > 0) return 'text-green-400';
  if (value < 0) return 'text-red-400';
  return 'text-gray-400';
}

// Calculate total value for a specific stat across nodes
export function calculateTotalStatValue(
  statName: string,
  nodes: TreeNodeData[]
): number {
  return nodes.reduce((total, node) => {
    const statValue = node.description
      .filter(desc => desc.includes(statName))
      .reduce((sum, desc) => {
        const { value } = extractStatValue(desc);
        return sum + value;
      }, 0);
    return total + statValue;
  }, 0);
}

// Get all unique stats from nodes
export function getAllUniqueStats(nodes: TreeNodeData[]): Set<string> {
  const stats = new Set<string>();
  nodes.forEach(node => {
    node.description.forEach(desc => {
      const { name } = extractStatValue(desc);
      if (name) stats.add(normalizeStatName(name));
    });
  });
  return stats;
}

// Group stats by category
export function groupStatsByCategory(stats: [string, number][]): Record<string, [string, number][]> {
  return stats.reduce((groups, stat) => {
    const category = getStatCategory(stat[0]);
    if (!groups[category]) groups[category] = [];
    groups[category].push(stat);
    return groups;
  }, {} as Record<string, [string, number][]>);
}
