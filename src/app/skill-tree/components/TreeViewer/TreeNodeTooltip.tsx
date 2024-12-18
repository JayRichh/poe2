'use client';

import React from 'react';
import { TreeNodeData } from './data';
import { sanitizeString } from '../../utils/treeUtils';

interface TreeNodeTooltipProps {
  node: TreeNodeData;
  showKeywordDetails: boolean;
  showSkillDetails: boolean;
  style?: React.CSSProperties;
}

export function TreeNodeTooltip({
  node,
  showKeywordDetails,
  showSkillDetails,
  style
}: TreeNodeTooltipProps) {
  return (
    <div className="pointer-events-none" style={style}>
      <div
        className="grid bg-black z-[1000] opacity-90 shadow-2xl w-[400px] h-min"
        style={{ gridTemplateRows: '52px min-content', maxWidth: '100svw' }}
      >
        <header className="relative text-2xl aspect-[999/131] rounded-xl grid items-center">
          <img
            className="absolute z-10 object-fill h-[52px] w-full"
            src="/tooltip-header.png"
            alt="header"
          />
          <h1 className="whitespace-nowrap relative z-20 text-center px-12">
            {node.name}
          </h1>
        </header>
        <div className="p-4 pb-2 space-y-2">
          <div className="grid">
            {node.description.map((description, index) => (
              <p 
                key={index} 
                className="m-0 font-light text-[#9090ff]"
                dangerouslySetInnerHTML={{ __html: sanitizeString(description) }}
              />
            ))}
          </div>
          <footer className="italic">
            <span className="text-[#888] text-xs float-right">{node.id}</span>
          </footer>
        </div>
      </div>

      {showSkillDetails && node.skills && node.skills.map((skill, index) => (
        <div
          key={index}
          className="hidden md:grid bg-[#0f0f0f] w-[400px] border-2 border-[#595343] p-[10px] text-cyan-200 gap-2"
          style={{ fontFamily: 'Fontin, sans-serif' }}
        >
          <header className="relative text-2xl rounded-xl grid items-center">
            <h1 className="whitespace-nowrap relative z-20 text-center px-12">
              {skill.name} <span className="text-cyan-200 text-sm font-medium"></span>
            </h1>
          </header>
          <p 
            className="m-0 font-light text-[#7d7aad]"
            dangerouslySetInnerHTML={{ __html: sanitizeString(skill.description) }}
          />
        </div>
      ))}

      {showKeywordDetails && node.keywords && node.keywords.map((keyword, index) => (
        <div
          key={index}
          className="hidden md:grid bg-[#0f0f0f] w-[400px] border-2 border-[#595343] p-[10px] text-orange-200 gap-2"
          style={{ fontFamily: 'Fontin, sans-serif' }}
        >
          <header className="relative text-2xl rounded-xl grid items-center">
            <h1 className="whitespace-nowrap relative z-20 text-center px-12">
              {keyword.name} <span className="text-orange-200 text-sm font-medium"></span>
            </h1>
          </header>
          <p 
            className="m-0 font-light text-[#7d7aad]"
            dangerouslySetInnerHTML={{ __html: sanitizeString(keyword.description) }}
          />
        </div>
      ))}
    </div>
  );
}
