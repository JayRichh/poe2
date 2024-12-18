export interface NodePosition {
  x: number;
  y: number;
}

export interface Skill {
  name: string;
  type: string;
  description: string;
  stats: string[];
  nodes: string[];
  icon?: string;
  blinking?: boolean;
}

export interface Keyword {
  name: string;
  description: string;
  stats: string[];
  nodes: string[];
  blinking?: boolean;
}

export interface TreeNodeData {
  id: string;
  type: NodeType;
  position: NodePosition;
  name: string;
  description: string[];
  skills: Skill[];
  keywords: Keyword[];
  connections: string[];
  ascendancy: string | null;
}

export type NodeType = 'keystone' | 'notable' | 'normal';

export interface TreeData {
  nodes: Record<string, TreeNodeData>;
}

export interface KeywordMap {
  [keywordName: string]: {
    name: string;
    description: string;
    stats: string[];
  };
}

export interface SkillMap {
  [skillName: string]: {
    name: string;
    type: string;
    description: string;
    stats: string[];
    icon?: string;
  };
}

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
