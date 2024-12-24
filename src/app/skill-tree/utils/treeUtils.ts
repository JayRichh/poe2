import DOMPurify from "isomorphic-dompurify";

import {
  Keyword,
  KeywordMap,
  NodeType,
  Skill,
  SkillMap,
  TreeData,
  TreeNodeData,
} from "../types/tree";

interface Position {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}

// Cache for various operations
const regexCache = new Map<string, RegExp>();
const highlightRegexCache = new Map<string, RegExp>();
const searchResultsCache = new Map<string, Set<string>>();
const escapeRegex = /[.*+?^${}()|[\]\\]/g;

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
  const keywords = getDataForDescription(keywordData, description.join(" "), nodeId) as Keyword[];
  const keywordKeywords = getDataForDescription(
    keywordData,
    keywords.map((k) => k.stats.join(" ")).join(" "),
    nodeId
  ) as Keyword[];
  return mergeDatas([...keywords, ...keywordKeywords]);
}

export function getSkillsForDescription(
  description: string[],
  nodeId: string,
  skillData: SkillMap
): Skill[] {
  return getDataForDescription(skillData, description.join(" "), nodeId) as Skill[];
}

export function getSkillsAndKeywords(
  description: string[],
  nodeId: string,
  skillData: SkillMap,
  keywordData: KeywordMap
): { keywords: Keyword[]; skills: Skill[] } {
  const skills = getSkillsForDescription(description, nodeId, skillData).map((s) => ({
    ...s,
    description: s.stats.join(" "),
  }));

  const skillDescription = skills.map((s) => s.description).join(" ");
  const keywords = getKeywordsForDescription(
    [skillDescription.concat(description.join(" "))],
    nodeId,
    keywordData
  ).map((k) => ({ ...k, description: k.stats.join(" ") }));

  return { keywords, skills };
}

function getHighlightRegex(data: SkillMap | KeywordMap): RegExp {
  const key = Object.keys(data).join("|");
  if (highlightRegexCache.has(key)) {
    return highlightRegexCache.get(key)!;
  }

  const regex = new RegExp(`\\b(${key})\\b`, "gi");
  highlightRegexCache.set(key, regex);
  return regex;
}

export function highlight(text: string, className: string, data: SkillMap | KeywordMap): string {
  const regex = getHighlightRegex(data);
  return text.replace(regex, (match) => `<span class="${className}">${match}</span>`);
}

export function highlightKeywords(text: string, keywordData: KeywordMap): string {
  return highlight(text, "is-keyword", keywordData);
}

export function highlightSkills(text: string, skillData: SkillMap): string {
  return highlight(text, "is-skill", skillData);
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
    x:
      scaledWidth <= containerDimensions.width
        ? (containerDimensions.width - scaledWidth) / 2
        : Math.min(maxPanX, Math.max(minPanX, newPanOffset.x)),
    y:
      scaledHeight <= containerDimensions.height
        ? (containerDimensions.height - scaledHeight) / 2
        : Math.min(maxPanY, Math.max(minPanY, newPanOffset.y)),
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
    x: mousePosition.x - worldX * newScale,
    y: mousePosition.y - worldY * newScale,
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
    y: (containerDimensions.height - scaledHeight) / 2,
  };
}

function getSearchRegex(searchTerm: string, isRegexSearch: boolean): RegExp {
  const cacheKey = `${searchTerm}:${isRegexSearch}`;
  if (regexCache.has(cacheKey)) {
    return regexCache.get(cacheKey)!;
  }

  const regex = isRegexSearch
    ? new RegExp(searchTerm, "i")
    : new RegExp(searchTerm.replace(escapeRegex, "\\$&"), "i");

  regexCache.set(cacheKey, regex);
  return regex;
}

export function searchNodes(
  nodes: Record<string, TreeNodeData>,
  searchTerm: string,
  isRegexSearch: boolean
): Set<string> {
  if (!searchTerm) return new Set();

  const cacheKey = `${searchTerm}:${isRegexSearch}:${Object.keys(nodes).length}`;
  if (searchResultsCache.has(cacheKey)) {
    return searchResultsCache.get(cacheKey)!;
  }

  try {
    const searchRegex = getSearchRegex(searchTerm, isRegexSearch);
    const results = new Set<string>();

    // Use for...of for better performance with early returns
    for (const node of Object.values(nodes)) {
      // Check name first as it's faster than description array
      if (searchRegex.test(node.name)) {
        results.add(node.id);
        continue;
      }

      // Check descriptions
      for (const desc of node.description) {
        if (searchRegex.test(desc)) {
          results.add(node.id);
          break;
        }
      }
    }

    searchResultsCache.set(cacheKey, results);
    return results;
  } catch (error) {
    console.error("Search error:", error);
    return new Set();
  }
}

// Clear caches when memory pressure is high
if (typeof window !== "undefined") {
  window.addEventListener("blur", () => {
    regexCache.clear();
    highlightRegexCache.clear();
    searchResultsCache.clear();
  });
}
