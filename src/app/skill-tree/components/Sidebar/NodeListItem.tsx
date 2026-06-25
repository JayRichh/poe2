"use client";

import React from "react";

import { highlightText } from "../../utils/textHighlighting";
import { TreeNodeData } from "../TreeViewer/data";

interface NodeListItemProps {
  node: TreeNodeData;
  isAllocated?: boolean;
  isHighlighted?: boolean;
  onClick?: (node: TreeNodeData) => void;
  onMouseEnter?: (node: TreeNodeData) => void;
  onMouseLeave?: () => void;
}

export function NodeListItem({
  node,
  isAllocated = false,
  isHighlighted = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: NodeListItemProps) {
  return (
    <div
      className={`
        group relative p-3 rounded-lg transition-all duration-200 cursor-pointer
        ${isAllocated ? "bg-primary/15" : "bg-accent/50"}
        ${isHighlighted ? "ring-2 ring-primary/50" : ""}
        hover:bg-accent
      `}
      onClick={() => onClick?.(node)}
      onMouseEnter={() => onMouseEnter?.(node)}
      onMouseLeave={onMouseLeave}
    >
      {/* Node Type Badge */}
      <div className="absolute top-2 right-2">
        <span
          className={`
          px-2 py-0.5 rounded text-xs font-medium
          ${
            node.type === "keystone"
              ? "bg-primary/20 text-primary"
              : node.type === "notable"
                ? "bg-gem-ruby/20 text-gem-ruby"
                : node.type === "mastery"
                  ? "bg-gem-emerald/20 text-gem-emerald"
                  : "bg-accent text-foreground-secondary"
          }
        `}
        >
          {node.type}
        </span>
      </div>

      {/* Node Name */}
      <h3 className="text-sm font-semibold mb-1 pr-20 text-foreground">{node.name}</h3>

      {/* Node Description */}
      {node.description[0] && (
        <div
          className="text-xs text-foreground-secondary mb-2"
          dangerouslySetInnerHTML={{
            __html: highlightText(node.description[0]),
          }}
        />
      )}

      {/* Skills */}
      {node.skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {node.skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs bg-gem-sapphire/20 text-gem-sapphire px-1.5 py-0.5 rounded"
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}

      {/* Keywords */}
      {node.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {node.keywords.map((keyword, index) => (
            <span
              key={index}
              className="text-xs bg-gem-ruby/20 text-gem-ruby px-1.5 py-0.5 rounded"
            >
              {keyword.name}
            </span>
          ))}
        </div>
      )}

      {/* Ascendancy */}
      {node.ascendancy && <div className="mt-2 text-xs text-primary">{node.ascendancy}</div>}

      {/* Hover Preview */}
      <div
        className={`
        absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all duration-200 pointer-events-none
        bg-surface text-surface-foreground border border-border rounded-lg shadow-xl p-4 min-w-[200px] max-w-[300px]
      `}
      >
        <h4 className="font-semibold mb-2">{node.name}</h4>
        {node.description.map((desc, index) => (
          <p
            key={index}
            className="text-sm text-foreground-secondary mb-2"
            dangerouslySetInnerHTML={{
              __html: highlightText(desc),
            }}
          />
        ))}
      </div>
    </div>
  );
}
