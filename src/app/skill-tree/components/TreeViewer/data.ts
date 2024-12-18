export interface NodePosition {
  x: number;
  y: number;
}

export interface Skill {
  name: string;
  description: string;
  icon?: string;
}

export interface Keyword {
  name: string;
  description: string;
}

export type NodeType = 'normal' | 'notable' | 'keystone' | 'mastery';

// Raw JSON data structures from the API
export interface NodeDataJSON {
  [nodeID: string]: {
    name: string;
    stats: string[];
    skills?: string[];
  };
}

export interface NodesJSON {
  keystones: Array<{
    id: string;
    x: number;
    y: number;
    kind: 'keystone' | 'notable' | 'small';
    class?: string;
  }>;
  notables: Array<{
    id: string;
    x: number;
    y: number;
    kind: 'keystone' | 'notable' | 'small';
    class?: string;
  }>;
  smalls: Array<{
    id: string;
    x: number;
    y: number;
    kind: 'keystone' | 'notable' | 'small';
    class?: string;
  }>;
  ascendancies: Array<{
    id: string;
    x: number;
    y: number;
    kind: 'keystone' | 'notable' | 'small';
    class?: string;
  }>;
  connections: Array<[string, string]>;
}

// Raw data structure (before enrichment)
export interface RawTreeNodeData {
  id: string;
  name: string;
  type: NodeType;
  position: NodePosition;
  description: string[];
  skills: string[];
  keywords: string[];
  connections: string[];
  ascendancy: string | null;
}

// Enriched data structure (after loading)
export interface TreeNodeData {
  id: string;
  name: string;
  type: NodeType;
  position: NodePosition;
  description: string[];
  skills: Skill[];
  keywords: Keyword[];
  connections: string[];
  ascendancy: string | null;
}

export interface TreeData {
  nodes: Record<string, TreeNodeData>;
}

export interface RawTreeData {
  nodes: Record<string, RawTreeNodeData>;
}

// Node styling utilities
export function getNodeSize(type: NodeType): number {
  switch (type) {
    case 'keystone':
      return 40;
    case 'notable':
      return 32;
    case 'mastery':
      return 36;
    default:
      return 24;
  }
}

export function getNodeColor(type: NodeType): string {
  switch (type) {
    case 'keystone':
      return '#9f7aea'; // purple-500
    case 'notable':
      return '#ed8936'; // orange-500
    case 'mastery':
      return '#48bb78'; // green-500
    default:
      return '#4a5568'; // gray-600
  }
}

export function getNodeBorderColor(type: NodeType): string {
  switch (type) {
    case 'keystone':
      return '#b794f4'; // purple-400
    case 'notable':
      return '#f6ad55'; // orange-400
    case 'mastery':
      return '#68d391'; // green-400
    default:
      return '#718096'; // gray-500
  }
}
