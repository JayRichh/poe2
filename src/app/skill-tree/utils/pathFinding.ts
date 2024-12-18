import { TreeNodeData, TreeData } from '../components/TreeViewer/data';

interface PathNode {
  id: string;
  g: number;  // Cost from start
  h: number;  // Heuristic (estimated cost to end)
  f: number;  // Total cost (g + h)
  parent: string | null;
}

function heuristic(node1: TreeNodeData, node2: TreeNodeData): number {
  // Manhattan distance between nodes
  return Math.abs(node1.position.x - node2.position.x) + 
         Math.abs(node1.position.y - node2.position.y);
}

function reconstructPath(
  cameFrom: Map<string, string>,
  current: string
): string[] {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    path.unshift(current);
  }
  return path;
}

export function findShortestPathToNode(
  targetNode: TreeNodeData,
  treeData: TreeData,
  allocatedNodes: Set<string>
): string[] {
  if (allocatedNodes.size === 0) return [];
  
  let shortestPath: string[] = [];
  let shortestLength = Infinity;

  // Try to find a path from each allocated node
  allocatedNodes.forEach(startId => {
    const startNode = treeData.nodes[startId];
    if (!startNode) return;

    const openSet = new Set<string>([startId]);
    const closedSet = new Set<string>();
    const cameFrom = new Map<string, string>();
    
    const gScore = new Map<string, number>();
    gScore.set(startId, 0);
    
    const fScore = new Map<string, number>();
    fScore.set(startId, heuristic(startNode, targetNode));

    while (openSet.size > 0) {
      // Find node with lowest fScore
      let current = Array.from(openSet).reduce((a, b) => 
        (fScore.get(a) || Infinity) < (fScore.get(b) || Infinity) ? a : b
      );

      if (current === targetNode.id) {
        const path = reconstructPath(cameFrom, current);
        if (path.length < shortestLength) {
          shortestPath = path;
          shortestLength = path.length;
        }
        break;
      }

      openSet.delete(current);
      closedSet.add(current);

      const currentNode = treeData.nodes[current];
      if (!currentNode) continue;

      // Check each connected node
      for (const neighborId of currentNode.connections) {
        if (closedSet.has(neighborId)) continue;

        const neighbor = treeData.nodes[neighborId];
        if (!neighbor) continue;

        // Skip nodes that aren't allocated unless they're the target
        if (!allocatedNodes.has(neighborId) && neighborId !== targetNode.id) continue;

        const tentativeGScore = (gScore.get(current) || 0) + 1;

        if (!openSet.has(neighborId)) {
          openSet.add(neighborId);
        } else if (tentativeGScore >= (gScore.get(neighborId) || Infinity)) {
          continue;
        }

        cameFrom.set(neighborId, current);
        gScore.set(neighborId, tentativeGScore);
        fScore.set(neighborId, tentativeGScore + heuristic(neighbor, targetNode));
      }
    }
  });

  return shortestPath;
}

export function canReachNode(
  targetNode: TreeNodeData,
  treeData: TreeData,
  allocatedNodes: Set<string>
): boolean {
  return findShortestPathToNode(targetNode, treeData, allocatedNodes).length > 0;
}

export function getPathCost(
  path: string[],
  treeData: TreeData
): number {
  return path.reduce((cost, nodeId) => {
    const node = treeData.nodes[nodeId];
    if (!node) return cost;
    
    // Different costs for different node types
    switch (node.type) {
      case 'keystone':
        return cost + 5;
      case 'notable':
        return cost + 3;
      case 'mastery':
        return cost + 4;
      default:
        return cost + 1;
    }
  }, 0);
}
