export interface LadderEntry {
  rank: number;
  account: string;
  character: string;
  class: string;
  level: number;
  experience: number;
}

export interface ClassDistribution {
  className: string;
  count: number;
  percentage: number;
}

export interface LadderStats {
  timestamp: string;
  ladders: {
    [key: string]: {
      total: number;
      distribution: ClassDistribution[];
    };
  };
  overall: {
    total: number;
    distribution: ClassDistribution[];
  };
}
