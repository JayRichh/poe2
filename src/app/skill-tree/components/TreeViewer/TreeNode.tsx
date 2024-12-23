"use client";

import React, { useMemo } from "react";
import type { CSSProperties } from "react";
import { TreeNodeData } from "./data";

interface TreeNodeProps {
  node: TreeNodeData;
  isSelected: boolean;
  isHighlighted: boolean;
  isAllocated: boolean;
  isPath: boolean;
  imageSize: { width: number; height: number };
  onClick: (node: TreeNodeData) => void;
  onMouseEnter: (node: TreeNodeData) => void;
  onMouseLeave: (node: TreeNodeData) => void;
}

import { NODE_STYLES, EFFECT_COLORS, getNodeStyle } from "./data";

const TreeNode = React.memo(function TreeNode({
  node,
  isSelected,
  isHighlighted,
  isAllocated,
  isPath,
  imageSize,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: TreeNodeProps) {
  const nodeStyles = getNodeStyle(node.type);
  const scale = isSelected ? 1.2 : isHighlighted ? 1.1 : isPath ? 1.05 : 1;
  const size = nodeStyles.size * scale;

  // Memoize node style calculations
  const nodeStyle = useMemo(() => {
    const glowIntensity = isSelected ? 15 : isHighlighted ? 10 : isPath ? 8 : 5;
    const glowOpacity = isSelected ? 0.8 : isHighlighted ? 0.6 : isPath ? 0.5 : 0.3;
    const backgroundOpacity = isAllocated ? 0.9 : 0.4;

    const colors = isAllocated ? EFFECT_COLORS.allocated :
                  isHighlighted || (isPath && !isAllocated) ? EFFECT_COLORS.highlighted :
                  nodeStyles.colors;

    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: `${colors.base}${Math.round(backgroundOpacity * 255)
        .toString(16)
        .padStart(2, "0")}`,
      borderColor: `${colors.border}${Math.round(glowOpacity * 255)
        .toString(16)
        .padStart(2, "0")}`,
      transform: `translate3d(0,0,0) scale(${scale})`,
      willChange: "transform, opacity",
      backfaceVisibility: "hidden" as CSSProperties["backfaceVisibility"],
      perspective: 1000,
      WebkitFontSmoothing: "antialiased" as CSSProperties["WebkitFontSmoothing"],
      // Use CSS custom properties for glow effect
      ["--glow-color" as string]: `rgba(${colors.rgb},${glowOpacity})`,
      ["--glow-size" as string]: `${glowIntensity}px`,
    };
  }, [node.type, isSelected, isHighlighted, isAllocated, isPath, size, scale]);

  // Calculate absolute position in pixels
  const positionStyle = useMemo(
    () => ({
      left: `${node.position.x * imageSize.width}px`,
      top: `${node.position.y * imageSize.height}px`,
      transform: "translate3d(-50%, -50%, 0)",
      willChange: "transform",
    }),
    [node.position.x, node.position.y, imageSize.width, imageSize.height]
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(node);
  };

  return (
    <div
      className={`absolute cursor-pointer
        ${isSelected ? "z-50" : isHighlighted ? "z-40" : isPath ? "z-35" : "z-30"}`}
      style={positionStyle}
      onClick={handleClick}
      onMouseEnter={() => onMouseEnter(node)}
      onMouseLeave={() => onMouseLeave(node)}
    >
      <div 
        className={`
          rounded-full border-2 relative
          before:absolute before:inset-[-8px] before:rounded-full before:opacity-0
          before:transition-opacity before:duration-200
          ${(isSelected || isHighlighted || isPath) ? 
            'before:opacity-100 before:bg-[radial-gradient(circle,var(--glow-color)_0%,transparent_70%)]' : 
            ''
          }
        `} 
        style={nodeStyle}
      >
        {node.type === "keystone" && (
          <div className="absolute inset-0 rounded-full border-2 border-white/20" />
        )}
      </div>
    </div>
  );
});

export { TreeNode };
