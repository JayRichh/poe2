"use client";

import React, { useMemo } from "react";

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

const NODE_SIZE = {
  notable: 20,
  small: 10,
  keystone: 24,
  normal: 10,
  mastery: 10,
} as const;

interface NodeColors {
  base: string;
  border: string;
}

const NODE_COLORS: Record<keyof typeof NODE_SIZE, NodeColors> = {
  keystone: {
    base: "#9f7aea",
    border: "#b794f4",
  },
  notable: {
    base: "#ed8936",
    border: "#f6ad55",
  },
  normal: {
    base: "#4a5568",
    border: "#718096",
  },
  small: {
    base: "#4a5568",
    border: "#718096",
  },
  mastery: {
    base: "#48bb78",
    border: "#68d391",
  },
};

// Pre-computed RGB values for better performance
const RGB_COLORS = {
  blue500: "66,153,225",
  blue400: "99,179,237",
  blue700: "43,108,176",
  yellow400: "246,224,94",
};

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
  const baseSize = NODE_SIZE[node.type] || NODE_SIZE.normal;
  const scale = isSelected ? 1.2 : isHighlighted ? 1.1 : isPath ? 1.05 : 1;
  const size = baseSize * scale;

  // Memoize node style calculations
  const nodeStyle = useMemo(() => {
    const nodeColors = NODE_COLORS[node.type] || NODE_COLORS.normal;
    let backgroundColor = nodeColors.base;
    let borderColor = nodeColors.border;
    let shadowColor = backgroundColor;
    let glowIntensity = isSelected ? 15 : isHighlighted ? 10 : isPath ? 8 : 5;
    let glowOpacity = isSelected ? 0.8 : isHighlighted ? 0.6 : isPath ? 0.5 : 0.3;
    let backgroundOpacity = isAllocated ? 0.9 : 0.4;

    if (isAllocated) {
      backgroundColor = "#4299e1";
      borderColor = "#63b3ed";
      shadowColor = "#2b6cb0";
      glowOpacity = 0.8;
      backgroundOpacity = 0.9;
    }

    if (isPath && !isAllocated) {
      borderColor = "#f6e05e";
      shadowColor = "#f6e05e";
      glowOpacity = 0.6;
    } else if (isHighlighted) {
      borderColor = "#f6e05e";
      shadowColor = "#f6e05e";
    }

    // Simplified shadow style for better performance
    const glowStyle =
      isSelected || isHighlighted || isPath
        ? `0 0 ${glowIntensity}px rgba(${RGB_COLORS.yellow400},${glowOpacity})`
        : "none";

    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: `${backgroundColor}${Math.round(backgroundOpacity * 255)
        .toString(16)
        .padStart(2, "0")}`,
      borderColor: `${borderColor}${Math.round(glowOpacity * 255)
        .toString(16)
        .padStart(2, "0")}`,
      boxShadow: glowStyle,
      transform: `translate3d(0,0,0) scale(${scale})`,
      willChange: "transform",
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
      <div className="rounded-full border-2" style={nodeStyle}>
        {node.type === "keystone" && (
          <div className="absolute inset-0 rounded-full border-2 border-white/20" />
        )}
      </div>
    </div>
  );
});

export { TreeNode };
