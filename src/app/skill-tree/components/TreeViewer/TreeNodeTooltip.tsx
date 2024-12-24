"use client";

import React, { memo, useMemo } from "react";

import { ProgressiveImage } from "~/components/ui/ProgressiveImage";

import { cn } from "~/utils/cn";

import { sanitizeString } from "../../utils/treeUtils";
import { TreeNodeData } from "./data";

interface TreeNodeTooltipProps {
  node: TreeNodeData;
  showKeywordDetails: boolean;
  showSkillDetails: boolean;
  style?: React.CSSProperties;
}

export const TreeNodeTooltip = memo(function TreeNodeTooltip({
  node,
  showKeywordDetails,
  showSkillDetails,
  style,
}: TreeNodeTooltipProps) {
  return (
    <div className="pointer-events-none" style={style}>
      <div
        className="grid bg-black z-[1000] opacity-90 shadow-2xl w-[400px] h-min"
        style={{ gridTemplateRows: "52px min-content", maxWidth: "100svw" }}
      >
        <header className="relative text-2xl aspect-[999/131] rounded-xl grid items-center">
          <ProgressiveImage
            className="absolute z-10 object-fill h-[52px] w-full"
            src="/tooltip-header.png"
            alt=""
            width={400}
            height={52}
            priority
          />
          <h1
            className="whitespace-nowrap relative z-20 text-center px-12 font-medium"
            aria-label={`Node: ${node.name}`}
          >
            {node.name}
          </h1>
        </header>
        <div className="p-4 pb-2 space-y-2">
          <div className="grid" role="list">
            {useMemo(
              () =>
                node.description.map((description, index) => (
                  <p
                    key={index}
                    className="m-0 font-light text-[#9090ff]"
                    dangerouslySetInnerHTML={{ __html: sanitizeString(description) }}
                    role="listitem"
                  />
                )),
              [node.description]
            )}
          </div>
          <footer className="italic">
            <span className="text-[#888] text-xs float-right">{node.id}</span>
          </footer>
        </div>
      </div>

      {showSkillDetails && node.skills && <SkillList skills={node.skills} />}
      {showKeywordDetails && node.keywords && <KeywordList keywords={node.keywords} />}
    </div>
  );
});

const SkillList = memo(function SkillList({ skills }: { skills: TreeNodeData["skills"] }) {
  return (
    <>
      {skills.map((skill, index) => (
        <div
          key={index}
          className={cn(
            "hidden md:grid bg-[#0f0f0f] w-[400px] border-2 border-[#595343]",
            "p-[10px] text-cyan-200 gap-2 font-fontin"
          )}
          role="complementary"
          aria-label={`Skill: ${skill.name}`}
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
    </>
  );
});

const KeywordList = memo(function KeywordList({
  keywords,
}: {
  keywords: TreeNodeData["keywords"];
}) {
  return (
    <>
      {keywords.map((keyword, index) => (
        <div
          key={index}
          className={cn(
            "hidden md:grid bg-[#0f0f0f] w-[400px] border-2 border-[#595343]",
            "p-[10px] text-orange-200 gap-2 font-fontin"
          )}
          role="complementary"
          aria-label={`Keyword: ${keyword.name}`}
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
    </>
  );
});

TreeNodeTooltip.displayName = "TreeNodeTooltip";
SkillList.displayName = "SkillList";
KeywordList.displayName = "KeywordList";
