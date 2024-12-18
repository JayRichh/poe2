'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TreeNode } from './TreeNode';
import { TreeNodeTooltip } from './TreeNodeTooltip';
import { TreeData, TreeNodeData } from './data';
import { calculateInitialPanOffset, calculateZoomPanOffset, clampPanOffsets } from '../../utils/treeUtils';

interface TreeViewerProps {
  selectedAscendancy: string;
  selectedNode: TreeNodeData | null;
  onNodeSelect: (node: TreeNodeData | null) => void;
  allocatedNodes: Set<string>;
  onNodeAllocate: (node: TreeNodeData) => void;
  searchTerm: string;
  isRegexSearch: boolean;
  treeData: TreeData | null;
  showKeywordDetails?: boolean;
  showSkillDetails?: boolean;
}

export function TreeViewer({
  selectedAscendancy,
  selectedNode,
  onNodeSelect,
  allocatedNodes,
  onNodeAllocate,
  searchTerm,
  isRegexSearch,
  treeData,
  showKeywordDetails = false,
  showSkillDetails = true
}: TreeViewerProps) {
  const [hoveredNode, setHoveredNode] = useState<TreeNodeData | null>(null);
  const [searchResults, setSearchResults] = useState<Set<string>>(new Set());
  const [hasLoaded, setHasLoaded] = useState(false);
  const [scale, setScale] = useState(0.75);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Center image on load
  const handleImageLoad = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return;
    
    const container = containerRef.current;
    const image = imageRef.current;
    
    setPanOffset(calculateInitialPanOffset(
      { width: container.clientWidth, height: container.clientHeight },
      { width: image.naturalWidth, height: image.naturalHeight },
      scale
    ));
    setHasLoaded(true);
  }, [scale]);

  // Handle mouse events for panning
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    setStartPan({
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    });
  }, [panOffset]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isPanning || !containerRef.current || !imageRef.current) return;

    const newPanOffset = {
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y
    };

    setPanOffset(clampPanOffsets(
      newPanOffset,
      { width: containerRef.current.clientWidth, height: containerRef.current.clientHeight },
      { width: imageRef.current.naturalWidth, height: imageRef.current.naturalHeight },
      scale
    ));
  }, [isPanning, startPan, scale]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Handle wheel events for zooming
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const mousePosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    const oldScale = scale;
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    const newScale = Math.max(0.5, Math.min(3, scale + delta * scale));

    const newPanOffset = calculateZoomPanOffset(mousePosition, panOffset, oldScale, newScale);

    setScale(newScale);
    setPanOffset(clampPanOffsets(
      newPanOffset,
      { width: container.clientWidth, height: container.clientHeight },
      { width: imageRef.current.naturalWidth, height: imageRef.current.naturalHeight },
      newScale
    ));
  }, [scale, panOffset]);

  // Add event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    containerRef.current?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      containerRef.current?.removeEventListener('wheel', handleWheel);
    };
  }, [handleMouseMove, handleMouseUp, handleWheel]);

  // Update search results
  useEffect(() => {
    if (!treeData || !searchTerm) {
      setSearchResults(new Set());
      return;
    }

    try {
      const searchRegex = isRegexSearch 
        ? new RegExp(searchTerm, 'i')
        : new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

      const results = new Set<string>();
      Object.values(treeData.nodes).forEach(node => {
        if (
          searchRegex.test(node.name) ||
          node.description.some(desc => searchRegex.test(desc))
        ) {
          results.add(node.id);
        }
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults(new Set());
    }
  }, [searchTerm, isRegexSearch, treeData]);

  if (!treeData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#070b0f] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
          <div>Loading skill tree...</div>
        </div>
      </div>
    );
  }

  const filteredNodes = Object.values(treeData.nodes).filter(node => 
    !node.ascendancy || node.ascendancy === selectedAscendancy
  );

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative bg-[#070b0f] overflow-hidden"
      style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
    >
      <div 
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          position: 'absolute',
          width: imageRef.current?.naturalWidth || '100%',
          height: imageRef.current?.naturalHeight || '100%',
          userSelect: 'none'
        }}
      >
        {/* Base tree image */}
        <img
          ref={imageRef}
          src="/skill-tree.png"
          alt="Skill Tree"
          className="w-full h-full pointer-events-none"
          onLoad={handleImageLoad}
          draggable={false}
        />

        {/* Ascendancy overlay */}
        {selectedAscendancy !== 'None' && (
          <picture>
            <source srcSet={`/ascendancies/${selectedAscendancy.toLowerCase()}.webp`} type="image/webp" />
            <img
              src={`/ascendancies/${selectedAscendancy.toLowerCase()}.png`}
              alt={selectedAscendancy}
              className="absolute pointer-events-none"
              style={{
                width: '320px',
                top: '50%',
                left: '50%',
                marginTop: `-${320 * 0.46}px`,
                marginLeft: `-${320 * 0.487}px`,
                height: '320px'
              }}
              draggable={false}
            />
          </picture>
        )}

        {/* Render nodes */}
        {hasLoaded && filteredNodes.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            isSelected={selectedNode?.id === node.id}
            isHighlighted={hoveredNode?.id === node.id || searchResults.has(node.id)}
            isAllocated={allocatedNodes.has(node.id)}
            isPath={false}
            onClick={() => {
              onNodeSelect(node);
              onNodeAllocate(node);
            }}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          />
        ))}
      </div>

      {/* Tooltip */}
      {hoveredNode && (
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none"
          style={{
            left: `${hoveredNode.position.x * imageRef.current!.naturalWidth * scale + panOffset.x + 20}px`,
            top: `${hoveredNode.position.y * imageRef.current!.naturalHeight * scale + panOffset.y - 20}px`,
            zIndex: 1000
          }}
        >
          <TreeNodeTooltip
            node={hoveredNode}
            showKeywordDetails={showKeywordDetails}
            showSkillDetails={showSkillDetails}
          />
        </div>
      )}
    </div>
  );
}
