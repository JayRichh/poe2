import { 
  TreeData,
  TreeNodeData,
  NodeType,
  Skill,
  Keyword,
  NodesJSON,
  NodeDataJSON
} from '../components/TreeViewer/data';

async function fetchJson<T>(path: string): Promise<T> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path} (${response.status})`);
    }

    const data = await response.json();
    if (!data) {
      throw new Error(`No data returned from ${path}`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    throw error;
  }
}

interface RawSkillData {
  [key: string]: {
    name: string;
    description: string;
    icon?: string;
  };
}

interface RawKeywordData {
  [key: string]: {
    name: string;
    description: string;
  };
}

function validateNodeData(data: any): data is NodesJSON {
  return (
    data &&
    typeof data === 'object' &&
    Array.isArray(data.keystones) &&
    Array.isArray(data.notables) &&
    Array.isArray(data.smalls) &&
    Array.isArray(data.ascendancies)
  );
}

interface BaseNode {
  id: string;
  x: number;
  y: number;
  kind: 'keystone' | 'notable' | 'small';
  class?: string;
}

function enrichNode(
  nodeId: string,
  position: { x: number; y: number },
  type: NodeType,
  ascendancy: string | null,
  descriptions: NodeDataJSON,
  skills: RawSkillData,
  keywords: RawKeywordData
): TreeNodeData {
  const nodeDesc = descriptions[nodeId];
  
  if (!nodeDesc) {
    return {
      id: nodeId,
      type,
      position,
      name: nodeId,
      description: [],
      skills: [],
      keywords: [],
      connections: [],
      ascendancy
    };
  }

  return {
    id: nodeId,
    type,
    position,
    name: nodeDesc.name,
    description: nodeDesc.stats || [],
    skills: (nodeDesc.skills || []).map((skillId: string) => ({
      name: skills[skillId]?.name || skillId,
      description: skills[skillId]?.description || '',
      icon: skills[skillId]?.icon
    })),
    keywords: [],
    connections: [],
    ascendancy
  };
}

function mapNodeType(kind: string): NodeType {
  switch (kind) {
    case 'keystone':
      return 'keystone';
    case 'notable':
      return 'notable';
    case 'small':
      return 'normal';
    default:
      return 'normal';
  }
}

export async function loadTreeData(): Promise<TreeData> {
  try {
    // First try to get from window if already loaded
    if (typeof window !== 'undefined' && (window as any).__TREE_DATA__) {
      return (window as any).__TREE_DATA__;
    }

    // Load all required data files
    const [nodesData, descriptions, skills, keywords] = await Promise.all([
      fetchJson<NodesJSON>('/data/nodes.json'),
      fetchJson<NodeDataJSON>('/data/nodes_desc.json'),
      fetchJson<RawSkillData>('/data/skills.json'),
      fetchJson<RawKeywordData>('/data/keywords.json')
    ]);

    // Validate node data
    if (!validateNodeData(nodesData)) {
      throw new Error('Invalid nodes data structure');
    }

    // Create enriched data
    const enrichedData: TreeData = {
      nodes: {}
    };

    // Flatten and process all node types
    const allNodes = [
      ...nodesData.keystones.map((n: BaseNode) => ({ ...n, type: mapNodeType(n.kind) })),
      ...nodesData.notables.map((n: BaseNode) => ({ ...n, type: mapNodeType(n.kind) })),
      ...nodesData.smalls.map((n: BaseNode) => ({ ...n, type: mapNodeType(n.kind) })),
      ...nodesData.ascendancies.map((n: BaseNode) => ({ ...n, type: mapNodeType(n.kind) }))
    ];

    // Process nodes
    allNodes.forEach(node => {
      try {
        enrichedData.nodes[node.id] = enrichNode(
          node.id,
          { x: node.x, y: node.y },
          node.type,
          node.class || null,
          descriptions,
          skills,
          keywords
        );
      } catch (error) {
        console.error(`Error processing node ${node.id}:`, error);
      }
    });

    // Add connections
    if (nodesData.connections) {
      nodesData.connections.forEach(([from, to]: [string, string]) => {
        if (enrichedData.nodes[from]) {
          enrichedData.nodes[from].connections.push(to);
        }
        if (enrichedData.nodes[to]) {
          enrichedData.nodes[to].connections.push(from);
        }
      });
    }

    // Validate enriched data
    if (Object.keys(enrichedData.nodes).length === 0) {
      throw new Error('No valid nodes after processing');
    }

    // Store in window for future use
    if (typeof window !== 'undefined') {
      (window as any).__TREE_DATA__ = enrichedData;
    }

    return enrichedData;
  } catch (error) {
    console.error('Error loading tree data:', error);
    throw error;
  }
}

export function getTreeData(): TreeData | null {
  if (typeof window === 'undefined') return null;
  return (window as any).__TREE_DATA__ || null;
}

export function setTreeData(data: TreeData): void {
  if (typeof window !== 'undefined') {
    (window as any).__TREE_DATA__ = data;
  }
}