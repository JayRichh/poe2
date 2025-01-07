"use client";

import { mechanicsWithMeta } from "~/lib/mechanics/data";
import { guidesWithMeta } from "~/lib/guides/data";
import { NewsService } from "~/services/news-service";
import { ascendanciesWithMeta, type AscendancyWithMeta } from "~/lib/ascendancies/data";
import type { NewsPost } from "~/types/news";

export type SearchSection = 
  | "build-planner" 
  | "guides" 
  | "news" 
  | "mechanics" 
  | "patch-notes"
  | "ascendancies"
  | "dps-calc"
  | "skill-tree";

interface SearchableContent {
  title: string;
  description?: string;
  content?: string[] | string;
  sections?: Array<{
    title: string;
    content?: string[];
  }>;
}

interface SearchMatch {
  text: string;
  context?: string;
  relevance: number;
}

// Preprocess text for searching
function preprocessText(text: string): string {
  return text.toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ');
}

// Calculate relevance score based on match type and context
function calculateRelevance(text: string, query: string, context?: string): number {
  const normalizedText = preprocessText(text);
  const normalizedQuery = preprocessText(query);
  const queryWords = normalizedQuery.split(' ');
  
  let score = 0;
  
  // Exact match
  if (normalizedText === normalizedQuery) score += 100;
  
  // Title/start match
  else if (normalizedText.startsWith(normalizedQuery)) score += 80;
  
  // Contains full query
  else if (normalizedText.includes(normalizedQuery)) score += 60;
  
  // Partial matches
  else {
    // Count matching words
    const matchingWords = queryWords.filter(word => 
      normalizedText.split(' ').some(textWord => {
        // Exact word match
        if (textWord === word) return true;
        // Fuzzy match (allow 1-2 character differences)
        return levenshteinDistance(textWord, word) <= 2;
      })
    );
    
    score += matchingWords.length * 20;
  }
  
  // Boost scores based on context
  if (context) {
    const normalizedContext = context.toLowerCase();
    if (normalizedContext.includes('title')) score += 40;
    if (normalizedContext.includes('patch')) score += 30;
    if (normalizedContext.includes('item')) score += 25;
    if (normalizedContext.includes('skill')) score += 20;
  }
  
  return score;
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1).fill(null).map(() => 
    Array(a.length + 1).fill(null)
  );

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}

function searchInContent(content: SearchableContent, query: string): SearchMatch[] {
  const matches: SearchMatch[] = [];
  
  function addMatch(text: string | undefined, context?: string) {
    if (!text?.trim()) return;
    
    const relevance = calculateRelevance(text, query, context);
    if (relevance > 0) {
      matches.push({ text, context, relevance });
    }
  }
  
  // Search in title and description
  addMatch(content.title, 'title');
  addMatch(content.description, 'description');
  
  // Search in content
  if (Array.isArray(content.content)) {
    content.content.forEach(text => addMatch(text, 'content'));
  } else if (typeof content.content === 'string') {
    addMatch(content.content, 'content');
  }
  
  // Search in sections
  content.sections?.forEach(section => {
    addMatch(section.title, 'section');
    
    if (Array.isArray(section.content)) {
      section.content.forEach(text => addMatch(text, section.title));
    } else if (typeof section.content === 'string') {
      addMatch(section.content, section.title);
    }
  });

  return matches.sort((a, b) => b.relevance - a.relevance);
}

export type SearchResult = {
  id: string;
  title: string;
  description?: string;
  matches: SearchMatch[];
  url: string;
  section: SearchSection;
  relevance: number;
};

export type SearchOptions = {
  section?: SearchSection;
  limit?: number;
};

export async function searchContent(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  const { section, limit = 10 } = options;
  if (!query.trim()) return [];

  let results: SearchResult[] = [];

  // Search patch notes first for better item/skill search results
  if (!section || section === "patch-notes") {
    try {
      const patchNotes = await NewsService.getPatchNotes({ itemsPerPage: Number.MAX_SAFE_INTEGER });
      const patchNoteResults = patchNotes.items
        .map((note: NewsPost) => {
          // Extract text content from HTML for searching
          const plainContent = note.content.replace(/<[^>]*>/g, ' ');
          const matches = searchInContent({
            title: note.title,
            content: plainContent
          }, query);
          if (matches.length === 0) return null;

          const relevance = matches.reduce((sum, match) => sum + match.relevance, 0);
          return {
            id: `patch-notes-${note.id}`,
            title: note.title,
            description: plainContent.split('\n')[0], // First paragraph as description
            matches,
            url: NewsService.getNewsUrl(note),
            section: "patch-notes" as const,
            relevance: relevance * 1.5 // Boost patch notes relevance
          };
        })
        .filter((result): result is NonNullable<typeof result> => result !== null);
      results.push(...patchNoteResults);
    } catch (error) {
      console.error("Error loading patch notes:", error);
    }
  }

  // Search mechanics
  if (!section || section === "mechanics") {
    const mechanicsResults = mechanicsWithMeta
      .map(mechanic => {
        const matches = searchInContent({
          title: mechanic.title,
          description: mechanic.description,
          sections: mechanic.sections
        }, query);
        if (matches.length === 0) return null;
        
        const relevance = matches.reduce((sum, match) => sum + match.relevance, 0);
        return {
          id: `mechanics-${mechanic.id}`,
          title: mechanic.title,
          description: mechanic.description,
          matches,
          url: `/mechanics/${mechanic.id}`,
          section: "mechanics" as const,
          relevance
        };
      })
      .filter((result): result is NonNullable<typeof result> => result !== null);
    results.push(...mechanicsResults);
  }

  // Search guides
  if (!section || section === "guides") {
    const guideResults = guidesWithMeta
      .map(guide => {
        const matches = searchInContent({
          title: guide.title,
          description: guide.description,
          sections: guide.sections
        }, query);
        if (matches.length === 0) return null;
        
        const relevance = matches.reduce((sum, match) => sum + match.relevance, 0);
          return {
            id: `guides-${guide.id}`,
            title: guide.title,
            description: guide.description,
            matches,
            url: `/guides/${guide.id}`,
          section: "guides" as const,
          relevance
        };
      })
      .filter((result): result is NonNullable<typeof result> => result !== null);
    results.push(...guideResults);
  }

  // Search news
  if (!section || section === "news") {
    try {
      const allNews = await NewsService.getLatestNews({ itemsPerPage: Number.MAX_SAFE_INTEGER });
      const newsResults = allNews.items
        .map((news: NewsPost) => {
          // Extract text content from HTML for searching
          const plainContent = news.content.replace(/<[^>]*>/g, ' ');
          const matches = searchInContent({
            title: news.title,
            content: plainContent
          }, query);
          if (matches.length === 0) return null;
          
          const relevance = matches.reduce((sum, match) => sum + match.relevance, 0);
          return {
            id: `news-${news.id}`,
            title: news.title,
            description: plainContent.split('\n')[0], // First paragraph as description
            matches,
            url: NewsService.getNewsUrl(news),
            section: "news" as const,
            relevance
          };
        })
        .filter((result): result is NonNullable<typeof result> => result !== null);
      results.push(...newsResults);
    } catch (error) {
      console.error("Error loading news for search:", error);
    }
  }

  // Search ascendancies
  if (!section || section === "ascendancies") {
    const ascendancyResults = ascendanciesWithMeta
      .map((ascendancy: AscendancyWithMeta) => {
        const matches = searchInContent({
          title: ascendancy.title,
          description: ascendancy.description,
          content: [
            ascendancy.playstyle,
            ...ascendancy.keyFeatures,
            ...ascendancy.mechanics,
            ...ascendancy.buildTypes
          ]
        }, query);
        if (matches.length === 0) return null;
        
        const relevance = matches.reduce((sum, match) => sum + match.relevance, 0);
        return {
          id: `ascendancies-${ascendancy.id}`,
          title: ascendancy.title,
          description: ascendancy.description,
          matches,
          url: `/ascendancies/${ascendancy.id}`,
          section: "ascendancies" as const,
          relevance
        };
      })
      .filter((result): result is NonNullable<typeof result> => result !== null);
    results.push(...ascendancyResults);
  }

  // Search build planner
  if (!section || section === "build-planner") {
    const buildPlannerContent = {
      title: "POE2 Build Planner",
      description: "Plan and optimize your POE2 character builds with our comprehensive build planning tool",
      content: [
        "Character build planning",
        "Skill gem configurations",
        "Equipment loadouts",
        "Build optimization",
        "Save and share builds",
        "Build comparison",
        "Character progression planning"
      ]
    };

    const matches = searchInContent(buildPlannerContent, query);
    if (matches.length > 0) {
      const relevance = matches.reduce((sum, match) => sum + match.relevance, 0);
      results.push({
        id: "build-planner",
        title: buildPlannerContent.title,
        description: buildPlannerContent.description,
        matches,
        url: "/build-planner",
        section: "build-planner" as const,
        relevance
      });
    }
  }

  // Search skill tree
  if (!section || section === "skill-tree") {
    const skillTreeContent = {
      title: "POE2 Skill Tree",
      description: "Explore and plan your character's skill tree progression",
      content: [
        "Interactive skill tree",
        "Node exploration",
        "Path planning",
        "Skill point allocation",
        "Build optimization",
        "Character progression",
        "Passive skills"
      ]
    };

    const matches = searchInContent(skillTreeContent, query);
    if (matches.length > 0) {
      const relevance = matches.reduce((sum, match) => sum + match.relevance, 0);
      results.push({
        id: "skill-tree",
        title: skillTreeContent.title,
        description: skillTreeContent.description,
        matches,
        url: "/skill-tree",
        section: "skill-tree" as const,
        relevance
      });
    }
  }

  // Search DPS calculator
  if (!section || section === "dps-calc") {
    const dpsCalcContent = {
      title: "POE2 DPS Calculator",
      description: "Compare weapons and calculate DPS increases with detailed breakdowns of all damage types",
      content: [
        "Calculate weapon DPS",
        "Compare multiple weapons",
        "Detailed damage type breakdowns",
        "Physical damage calculations",
        "Elemental damage calculations",
        "Chaos damage calculations",
        "Manual weapon stat input",
        "Global damage modifiers",
        "DPS comparison history"
      ]
    };

    const matches = searchInContent(dpsCalcContent, query);
    if (matches.length > 0) {
      const relevance = matches.reduce((sum, match) => sum + match.relevance, 0);
      results.push({
        id: "dps-calc",
        title: dpsCalcContent.title,
        description: dpsCalcContent.description,
        matches,
        url: "/dps-calc",
        section: "dps-calc" as const,
        relevance
      });
    }
  }

  // Sort by relevance and apply limit
  results.sort((a, b) => b.relevance - a.relevance);
  if (limit) {
    results = results.slice(0, limit);
  }

  return results;
}
