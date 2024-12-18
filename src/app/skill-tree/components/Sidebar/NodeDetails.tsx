'use client';

import React from 'react';
import { TreeNodeData } from '../TreeViewer/data';
import { highlightKeywords, highlightSkills } from '../../utils/textHighlighting';
import { X } from 'lucide-react';

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
      <div className="text-muted-foreground text-center p-4">
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
          <div className="text-sm text-muted-foreground capitalize">{node.type}</div>
          {node.ascendancy && (
            <div className="text-sm text-primary">{node.ascendancy}</div>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-accent transition-colors"
          aria-label="Close details"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Description</h3>
        {node.description.map((desc, i) => (
          <p 
            key={i} 
            className="text-muted-foreground"
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
              <div key={i} className="bg-accent rounded-lg p-4">
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
                      className="text-sm text-muted-foreground mt-1"
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
                <span className="bg-accent px-2 py-1 rounded-lg text-sm cursor-help">
                  {keyword.name}
                </span>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-popover rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <p className="text-sm text-popover-foreground">{keyword.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connections */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Connections</h3>
        <div className="text-sm text-muted-foreground">
          {node.connections.length} connected {node.connections.length === 1 ? 'node' : 'nodes'}
        </div>
      </div>
    </div>
  );
}
