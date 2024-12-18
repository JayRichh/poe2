'use client';

import React, { useState } from 'react';
import { TreeNodeData } from '../../components/TreeViewer/data';
import { NodeListItem } from './NodeListItem';

interface SearchResultsProps {
  results: TreeNodeData[];
  allocatedNodes: Set<string>;
  onNodeClick: (node: TreeNodeData) => void;
  onNodeHover: (node: TreeNodeData | null) => void;
  searchTerm: string;
  isRegexSearch: boolean;
}

type GroupBy = 'type' | 'ascendancy' | 'none';

export function SearchResults({
  results,
  allocatedNodes,
  onNodeClick,
  onNodeHover,
  searchTerm,
  isRegexSearch
}: SearchResultsProps) {
  const [groupBy, setGroupBy] = useState<GroupBy>('type');

  // Moved useMemo before conditional returns
  const groupedResults = React.useMemo(() => {
    if (groupBy === 'none') {
      return { 'All Results': results };
    }

    return results.reduce((groups, node) => {
      const key = groupBy === 'type' 
        ? node.type.charAt(0).toUpperCase() + node.type.slice(1)
        : node.ascendancy || 'No Ascendancy';
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(node);
      return groups;
    }, {} as Record<string, TreeNodeData[]>);
  }, [results, groupBy]);

  // Main return with conditional rendering inside
  return (
    <div className="space-y-4">
      {!searchTerm ? (
        <div className="text-gray-400 text-center p-4">
          Enter a search term to find nodes
        </div>
      ) : results.length === 0 ? (
        <div className="text-gray-400 text-center p-4">
          No nodes found matching &quot;{searchTerm}&quot;
          {isRegexSearch && <div className="text-sm">(using regex)</div>}
        </div>
      ) : (
        <>
          {/* Search Info */}
          <div className="sticky top-0 bg-gray-900 p-2 border-b border-gray-700 z-10">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">
                Found {results.length} {results.length === 1 ? 'node' : 'nodes'}
              </span>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value as GroupBy)}
                className="bg-gray-800 text-sm rounded border border-gray-700 px-2 py-1"
              >
                <option value="type">Group by Type</option>
                <option value="ascendancy">Group by Ascendancy</option>
                <option value="none">No Grouping</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {Object.entries(groupedResults).map(([group, nodes]) => (
              <div key={group} className="space-y-2">
                <div className="sticky top-12 bg-gray-800/95 backdrop-blur-sm p-2 rounded-t border-b border-gray-700 z-10">
                  <h3 className="font-semibold">
                    {group} ({nodes.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {nodes.map((node) => (
                    <NodeListItem
                      key={node.id}
                      node={node}
                      isAllocated={allocatedNodes.has(node.id)}
                      onClick={onNodeClick}
                      onMouseEnter={() => onNodeHover(node)}
                      onMouseLeave={() => onNodeHover(null)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
