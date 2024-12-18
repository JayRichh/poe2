'use client';

import React from 'react';
import { TreeNodeData } from '../TreeViewer/data';
import { highlightKeywords, highlightSkills } from '../../utils/textHighlighting';

interface NodeDetailsProps {
  node: TreeNodeData | null;
  onClose: () => void;
  showKeywordDetails: boolean;
  showSkillDetails: boolean;
}

export function NodeDetails({ 
  node, 
  onClose,
  showKeywordDetails,
  showSkillDetails
}: NodeDetailsProps) {
  if (!node) {
    return (
      <div className="text-gray-400 text-center p-4">
        Select a node to view details
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{node.name}</h2>
          <div className="text-sm text-gray-400 capitalize">{node.type}</div>
          {node.ascendancy && (
            <div className="text-sm text-blue-400">{node.ascendancy}</div>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1"
          aria-label="Close details"
        >
          ×
        </button>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Description</h3>
        {node.description.map((desc, i) => (
          <p 
            key={i} 
            className="text-gray-300"
            dangerouslySetInnerHTML={{ 
              __html: highlightKeywords(highlightSkills(desc))
            }}
          />
        ))}
      </div>

      {/* Skills */}
      {showSkillDetails && node.skills.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Skills</h3>
          <div className="space-y-4">
            {node.skills.map((skill, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  {skill.icon && (
                    <img
                      src={`/skills/${skill.icon}`}
                      alt={skill.name}
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-cyan-200">{skill.name}</h4>
                    <p 
                      className="text-sm text-gray-300 mt-1"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightKeywords(skill.description)
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keywords */}
      {showKeywordDetails && node.keywords.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {node.keywords.map((keyword, i) => (
              <div 
                key={i}
                className="group relative"
              >
                <span className="bg-gray-700 px-2 py-1 rounded text-sm cursor-help">
                  {keyword.name}
                </span>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="text-sm text-gray-300">{keyword.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connections */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Connections</h3>
        <div className="text-sm text-gray-300">
          {node.connections.length} connected {node.connections.length === 1 ? 'node' : 'nodes'}
        </div>
      </div>
    </div>
  );
}
