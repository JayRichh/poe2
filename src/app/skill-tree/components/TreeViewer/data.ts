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

export type NodeType = "normal" | "notable" | "keystone" | "mastery";

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
    kind: "keystone" | "notable" | "small";
    class?: string;
  }>;
  notables: Array<{
    id: string;
    x: number;
    y: number;
    kind: "keystone" | "notable" | "small";
    class?: string;
  }>;
  smalls: Array<{
    id: string;
    x: number;
    y: number;
    kind: "keystone" | "notable" | "small";
    class?: string;
  }>;
  ascendancies: Array<{
    id: string;
    x: number;
    y: number;
    kind: "keystone" | "notable" | "small";
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

// Node styling constants
export const NODE_STYLES = {
  keystone: {
    size: 24,
    colors: {
      base: "#9f7aea", // purple-500
      border: "#b794f4", // purple-400
      rgb: "159,122,234", // pre-computed RGB for performance
    },
  },
  notable: {
    size: 20,
    colors: {
      base: "#ed8936", // orange-500
      border: "#f6ad55", // orange-400
      rgb: "237,137,54",
    },
  },
  normal: {
    size: 10,
    colors: {
      base: "#4a5568", // gray-600
      border: "#718096", // gray-500
      rgb: "74,85,104",
    },
  },
  small: {
    size: 10,
    colors: {
      base: "#4a5568",
      border: "#718096",
      rgb: "74,85,104",
    },
  },
  mastery: {
    size: 10,
    colors: {
      base: "#48bb78", // green-500
      border: "#68d391", // green-400
      rgb: "72,187,120",
    },
  },
} as const;

// Pre-computed colors for better performance
export const EFFECT_COLORS = {
  allocated: {
    base: "#4299e1", // blue-500
    border: "#63b3ed", // blue-400
    shadow: "#2b6cb0", // blue-700
    rgb: "66,153,225",
  },
  highlighted: {
    base: "#f6e05e", // yellow-400
    border: "#f6e05e",
    rgb: "246,224,94",
  },
} as const;

// Helper functions with better type safety
export function getNodeStyle(type: NodeType) {
  return NODE_STYLES[type] || NODE_STYLES.normal;
}
