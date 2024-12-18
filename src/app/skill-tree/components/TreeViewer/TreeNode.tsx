'use client';

import React from 'react';
import { TreeNodeData } from './data';

interface TreeNodeProps {
  node: TreeNodeData;
  isSelected: boolean;
  isHighlighted: boolean;
  isAllocated: boolean;
  isPath: boolean;
  onClick: (node: TreeNodeData) => void;
  onMouseEnter: (node: TreeNodeData) => void;
  onMouseLeave: (node: TreeNodeData) => void;
}

const NODE_SIZE = {
  notable: 20,
  small: 10,
  keystone: 24,
  normal: 10,
  mastery: 10
} as const;

interface NodeColors {
  base: string;
  border: string;
}

const NODE_COLORS: Record<keyof typeof NODE_SIZE, NodeColors> = {
  keystone: {
    base: '#9f7aea', // purple-500
    border: '#b794f4' // purple-400
  },
  notable: {
    base: '#ed8936', // orange-500
    border: '#f6ad55' // orange-400
  },
  normal: {
    base: '#4a5568', // gray-600
    border: '#718096' // gray-500
  },
  small: {
    base: '#4a5568', // gray-600
    border: '#718096' // gray-500
  },
  mastery: {
    base: '#48bb78', // green-500
    border: '#68d391' // green-400
  }
};

export function TreeNode({
  node,
  isSelected,
  isHighlighted,
  isAllocated,
  isPath,
  onClick,
  onMouseEnter,
  onMouseLeave
}: TreeNodeProps) {
  const baseSize = NODE_SIZE[node.type] || NODE_SIZE.normal;
  const scale = isSelected ? 1.2 : isHighlighted ? 1.1 : isPath ? 1.05 : 1;
  const size = baseSize * scale;

  const getNodeStyle = () => {
    const nodeColors = NODE_COLORS[node.type] || NODE_COLORS.normal;
    let backgroundColor = nodeColors.base;
    let borderColor = nodeColors.border;
    let shadowColor = backgroundColor;
    let glowIntensity = isSelected ? '15px' : isHighlighted ? '10px' : isPath ? '8px' : '5px';
    let glowOpacity = isSelected ? 0.8 : isHighlighted ? 0.6 : isPath ? 0.5 : 0.3;
    let backgroundOpacity = isAllocated ? 0.9 : 0.4;

    if (isAllocated) {
      backgroundColor = '#4299e1'; // blue-500
      borderColor = '#63b3ed'; // blue-400
      shadowColor = '#2b6cb0'; // blue-700
      glowOpacity = 0.8;
      backgroundOpacity = 0.9;
    }

    if (isPath && !isAllocated) {
      borderColor = '#f6e05e'; // yellow-400
      shadowColor = '#f6e05e'; // yellow-400
      glowOpacity = 0.6;
    } else if (isHighlighted) {
      borderColor = '#f6e05e'; // yellow-400
      shadowColor = '#f6e05e'; // yellow-400
    }

    const glowStyle = `0 0 ${glowIntensity} rgba(${hexToRgb(shadowColor)},${glowOpacity})`;
    const innerGlow = `inset 0 0 ${parseInt(glowIntensity) / 2}px rgba(${hexToRgb(shadowColor)},${glowOpacity * 0.7})`;

    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: `${backgroundColor}${Math.round(backgroundOpacity * 255).toString(16).padStart(2, '0')}`,
      borderColor: `${borderColor}${Math.round(glowOpacity * 255).toString(16).padStart(2, '0')}`,
      boxShadow: `${glowStyle}, ${innerGlow}`,
      transform: `scale(${scale})`,
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 cursor-pointer
        ${isSelected ? 'z-50' : isHighlighted ? 'z-40' : isPath ? 'z-35' : 'z-30'}`}
      style={{
        left: `${node.position.x * 100}%`,
        top: `${node.position.y * 100}%`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(node);
      }}
      onMouseEnter={() => onMouseEnter(node)}
      onMouseLeave={() => onMouseLeave(node)}
    >
      <div
        className="rounded-full border-2 transition-all duration-200"
        style={getNodeStyle()}
      >
        {node.type === 'keystone' && (
          <div className="absolute inset-0 rounded-full border-2 border-white/20" />
        )}
      </div>
    </div>
  );
}

// Helper function to convert hex color to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '255,255,255';
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}
