'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TreeNodeData } from '../TreeViewer/data';
import { SearchResults } from './SearchResults';

interface FiltersProps {
  selectedAscendancy: string;
  onAscendancyChange: (ascendancy: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isRegexSearch: boolean;
  onRegexSearchChange: (isRegex: boolean) => void;
  highlightKeystones: boolean;
  onHighlightKeystonesChange: (highlight: boolean) => void;
  highlightNotables: boolean;
  onHighlightNotablesChange: (highlight: boolean) => void;
  highlightNormal: boolean;
  onHighlightNormalChange: (highlight: boolean) => void;
  hideUnidentified: boolean;
  onHideUnidentifiedChange: (hide: boolean) => void;
  hideUnselected: boolean;
  onHideUnselectedChange: (hide: boolean) => void;
  hideNormal: boolean;
  onHideNormalChange: (hide: boolean) => void;
  showKeywordDetails: boolean;
  onShowKeywordDetailsChange: (show: boolean) => void;
  showSkillDetails: boolean;
  onShowSkillDetailsChange: (show: boolean) => void;
  searchResults: TreeNodeData[];
  allocatedNodes: Set<string>;
  onNodeClick: (node: TreeNodeData) => void;
  onNodeHover: (node: TreeNodeData | null) => void;
}

const ASCENDANCIES = [
  'None',
  'Acolyte',
  'Bloodmage',
  'Chronomancer',
  'Deadeye',
  'Gemling',
  'Infernalist',
  'Invoker',
  'Pathfinder',
  'Stormweaver',
  'Titan',
  'Warbringer',
  'Witchhunter'
] as const;

export function Filters({
  selectedAscendancy,
  onAscendancyChange,
  searchTerm,
  onSearchChange,
  isRegexSearch,
  onRegexSearchChange,
  highlightKeystones,
  onHighlightKeystonesChange,
  highlightNotables,
  onHighlightNotablesChange,
  highlightNormal,
  onHighlightNormalChange,
  hideUnidentified,
  onHideUnidentifiedChange,
  hideUnselected,
  onHideUnselectedChange,
  hideNormal,
  onHideNormalChange,
  showKeywordDetails,
  onShowKeywordDetailsChange,
  showSkillDetails,
  onShowSkillDetailsChange,
  searchResults,
  allocatedNodes,
  onNodeClick,
  onNodeHover
}: FiltersProps) {
  const [activeTab, setActiveTab] = useState<'filters' | 'search'>('filters');

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-4">
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors
            ${activeTab === 'filters' 
              ? 'text-white border-b-2 border-blue-500' 
              : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('filters')}
        >
          Filters
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors
            ${activeTab === 'search' 
              ? 'text-white border-b-2 border-blue-500' 
              : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('search')}
        >
          Search
        </button>
      </div>

      {activeTab === 'filters' ? (
        <div className="space-y-6 overflow-y-auto scrollbar-custom">
          {/* Ascendancy Selection */}
          <div>
            <h3 className="text-lg font-bold mb-3">Ascendancy</h3>
            <div className="grid grid-cols-2 gap-2">
              {ASCENDANCIES.map((ascendancy) => (
                <button
                  key={ascendancy}
                  onClick={() => onAscendancyChange(ascendancy)}
                  className={`flex flex-col items-center p-2 rounded transition-colors
                    ${selectedAscendancy === ascendancy 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {ascendancy !== 'None' && (
                    <div className="relative w-12 h-12 mb-1">
                      <Image
                        src={`/ascendancies/${ascendancy.toLowerCase()}.webp`}
                        alt={ascendancy}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-sm">{ascendancy}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Highlight Options */}
          <div>
            <h3 className="text-lg font-bold mb-3">Highlight</h3>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={highlightKeystones}
                  onChange={(e) => onHighlightKeystonesChange(e.target.checked)}
                  className="form-checkbox bg-gray-700 border-gray-600 rounded"
                />
                <span>Keystones</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={highlightNotables}
                  onChange={(e) => onHighlightNotablesChange(e.target.checked)}
                  className="form-checkbox bg-gray-700 border-gray-600 rounded"
                />
                <span>Notables</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={highlightNormal}
                  onChange={(e) => onHighlightNormalChange(e.target.checked)}
                  className="form-checkbox bg-gray-700 border-gray-600 rounded"
                />
                <span>Normal Nodes</span>
              </label>
            </div>
          </div>

          {/* Hide Options */}
          <div>
            <h3 className="text-lg font-bold mb-3">Hide</h3>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hideUnidentified}
                  onChange={(e) => onHideUnidentifiedChange(e.target.checked)}
                  className="form-checkbox bg-gray-700 border-gray-600 rounded"
                />
                <span>Unidentified</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hideUnselected}
                  onChange={(e) => onHideUnselectedChange(e.target.checked)}
                  className="form-checkbox bg-gray-700 border-gray-600 rounded"
                />
                <span>Unselected</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hideNormal}
                  onChange={(e) => onHideNormalChange(e.target.checked)}
                  className="form-checkbox bg-gray-700 border-gray-600 rounded"
                />
                <span>Normal Nodes</span>
              </label>
            </div>
          </div>

          {/* Tooltip Options */}
          <div>
            <h3 className="text-lg font-bold mb-3">Tooltip Details</h3>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showKeywordDetails}
                  onChange={(e) => onShowKeywordDetailsChange(e.target.checked)}
                  className="form-checkbox bg-gray-700 border-gray-600 rounded"
                />
                <span>Keywords</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showSkillDetails}
                  onChange={(e) => onShowSkillDetailsChange(e.target.checked)}
                  className="form-checkbox bg-gray-700 border-gray-600 rounded"
                />
                <span>Skills</span>
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Search Controls */}
          <div className="space-y-4 mb-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">Search</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isRegexSearch}
                    onChange={(e) => onRegexSearchChange(e.target.checked)}
                    className="form-checkbox bg-gray-700 border-gray-600 rounded"
                  />
                  <span>Regex Mode</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search nodes..."
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-custom">
            <SearchResults
              results={searchResults}
              allocatedNodes={allocatedNodes}
              onNodeClick={onNodeClick}
              onNodeHover={onNodeHover}
              searchTerm={searchTerm}
              isRegexSearch={isRegexSearch}
            />
          </div>
        </div>
      )}
    </div>
  );
}
