import { Keyword, KeywordMap, NodeType, Skill, SkillMap, TreeData, TreeNodeData } from '../types/tree';
import DOMPurify from 'isomorphic-dompurify';

interface Position {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}

// Existing utility functions
export function mergeDatas<T extends { name: string; nodes: string[] }>(arrays: T[]): T[] {
  const merged: { [key: string]: T } = {};

  arrays.forEach((v) => {
    const key = v.name;
    if (!merged[key]) {
      merged[key] = { ...v };
    } else {
      merged[key].nodes = [...new Set([...merged[key].nodes, ...v.nodes])];
    }
  });

  return Object.values(merged);
}

export function getDataForDescription(
  data: KeywordMap | SkillMap,
  description: string,
  nodeId: string
): (Keyword | Skill)[] {
  return Object.keys(data)
    .filter((keyword) => description.toLowerCase().includes(keyword.toLowerCase()))
    .map((k) => ({ ...data[k], nodes: [nodeId] }));
}

export function getKeywordsForDescription(
  description: string[],
  nodeId: string,
  keywordData: KeywordMap
): Keyword[] {
  const keywords = getDataForDescription(keywordData, description.join(' '), nodeId) as Keyword[];
  const keywordKeywords = getDataForDescription(
    keywordData,
    keywords.map((k) => k.stats.join(' ')).join(' '),
    nodeId
  ) as Keyword[];
  return mergeDatas([...keywords, ...keywordKeywords]);
}

export function getSkillsForDescription(
  description: string[],
  nodeId: string,
  skillData: SkillMap
): Skill[] {
  return getDataForDescription(skillData, description.join(' '), nodeId) as Skill[];
}

export function getSkillsAndKeywords(
  description: string[],
  nodeId: string,
  skillData: SkillMap,
  keywordData: KeywordMap
): { keywords: Keyword[]; skills: Skill[] } {
  const skills = getSkillsForDescription(description, nodeId, skillData).map((s) => ({
    ...s,
    description: s.stats.join(' ')
  }));
  
  const skillDescription = skills.map((s) => s.description).join(' ');
  const keywords = getKeywordsForDescription(
    [skillDescription.concat(description.join(' '))],
    nodeId,
    keywordData
  ).map((k) => ({ ...k, description: k.stats.join(' ') }));
  
  return { keywords, skills };
}

export function highlight(text: string, className: string, data: SkillMap | KeywordMap): string {
  const regex = new RegExp(`\\b(${Object.keys(data).join('|')})\\b`, 'gi');
  return text.replace(regex, (match) => `<span class="${className}">${match}</span>`);
}

export function highlightKeywords(text: string, keywordData: KeywordMap): string {
  return highlight(text, 'is-keyword', keywordData);
}

export function highlightSkills(text: string, skillData: SkillMap): string {
  return highlight(text, 'is-skill', skillData);
}

export function sanitizeString(text: string): string {
  return DOMPurify.sanitize(text);
}

export function clampPanOffsets(
  newPanOffset: Position,
  containerDimensions: Dimensions,
  imageDimensions: Dimensions,
  scale: number
): Position {
  const scaledWidth = imageDimensions.width * scale;
  const scaledHeight = imageDimensions.height * scale;

  // Allow panning beyond bounds to ensure nodes stay centered
  const padding = Math.max(containerDimensions.width, containerDimensions.height) * 0.1;
  const minPanX = containerDimensions.width - scaledWidth - padding;
  const minPanY = containerDimensions.height - scaledHeight - padding;
  const maxPanX = padding;
  const maxPanY = padding;

  return {
    x: scaledWidth <= containerDimensions.width
      ? (containerDimensions.width - scaledWidth) / 2
      : Math.min(maxPanX, Math.max(minPanX, newPanOffset.x)),
    y: scaledHeight <= containerDimensions.height
      ? (containerDimensions.height - scaledHeight) / 2
      : Math.min(maxPanY, Math.max(minPanY, newPanOffset.y))
  };
}

export function calculateZoomPanOffset(
  mousePosition: Position,
  currentPanOffset: Position,
  oldScale: number,
  newScale: number
): Position {
  const worldX = (mousePosition.x - currentPanOffset.x) / oldScale;
  const worldY = (mousePosition.y - currentPanOffset.y) / oldScale;

  return {
    x: mousePosition.x - (worldX * newScale),
    y: mousePosition.y - (worldY * newScale)
  };
}

export function calculateInitialPanOffset(
  containerDimensions: Dimensions,
  imageDimensions: Dimensions,
  scale: number
): Position {
  const scaledWidth = imageDimensions.width * scale;
  const scaledHeight = imageDimensions.height * scale;
  
  return {
    x: (containerDimensions.width - scaledWidth) / 2,
    y: (containerDimensions.height - scaledHeight) / 2
  };
}

export function getNodeSize(type: NodeType): number {
  switch (type) {
    case 'keystone':
      return 40;
    case 'notable':
      return 32;
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
    default:
      return '#718096'; // gray-500
  }
}

export function searchNodes(
  nodes: Record<string, TreeNodeData>,
  searchTerm: string,
  isRegexSearch: boolean
): Set<string> {
  if (!searchTerm) return new Set();

  try {
    const searchRegex = isRegexSearch 
      ? new RegExp(searchTerm, 'i')
      : new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    const results = new Set<string>();
    Object.values(nodes).forEach(node => {
      if (
        searchRegex.test(node.name) ||
        node.description.some(desc => searchRegex.test(desc))
      ) {
        results.add(node.id);
      }
    });

    return results;
  } catch (error) {
    console.error('Search error:', error);
    return new Set();
  }
}
