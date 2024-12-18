'use client';

import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { TreeNode } from './TreeNode';
import { TreeNodeTooltip } from './TreeNodeTooltip';
import { TreeData, TreeNodeData } from './data';
import { calculateInitialPanOffset, calculateZoomPanOffset, clampPanOffsets } from '../../utils/treeUtils';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

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

const VIEWPORT_PADDING = 100;
const MIN_NODE_SIZE = 10;
const THROTTLE_MS = 16;
const MIN_SCALE = 0.15;
const MAX_SCALE = 3;
const ZOOM_STEP = 0.15;

function isNodeInViewport(
  node: TreeNodeData,
  container: DOMRect,
  imageSize: { width: number; height: number },
  scale: number,
  panOffset: { x: number; y: number }
): boolean {
  const nodeX = node.position.x * imageSize.width * scale + panOffset.x;
  const nodeY = node.position.y * imageSize.height * scale + panOffset.y;

  return (
    nodeX >= -VIEWPORT_PADDING &&
    nodeX <= container.width + VIEWPORT_PADDING &&
    nodeY >= -VIEWPORT_PADDING &&
    nodeY <= container.height + VIEWPORT_PADDING
  );
}

function calculateFitToViewScale(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number
): number {
  const scaleX = (containerWidth - VIEWPORT_PADDING * 2) / imageWidth;
  const scaleY = (containerHeight - VIEWPORT_PADDING * 2) / imageHeight;
  return Math.min(scaleX, scaleY);
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
  const rafRef = useRef<number>();

  const handleZoom = useCallback((newScale: number, center?: { x: number; y: number }) => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const mousePosition = center || {
      x: container.clientWidth / 2,
      y: container.clientHeight / 2
    };

    const oldScale = scale;
    const clampedScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    const newPanOffset = calculateZoomPanOffset(mousePosition, panOffset, oldScale, clampedScale);

    rafRef.current = requestAnimationFrame(() => {
      setScale(clampedScale);
      setPanOffset(clampPanOffsets(
        newPanOffset,
        { width: container.clientWidth, height: container.clientHeight },
        { width: imageRef.current!.naturalWidth, height: imageRef.current!.naturalHeight },
        clampedScale
      ));
    });
  }, [scale, panOffset]);

  const zoomIn = useCallback(() => handleZoom(scale * (1 + ZOOM_STEP)), [scale, handleZoom]);
  const zoomOut = useCallback(() => handleZoom(scale * (1 - ZOOM_STEP)), [scale, handleZoom]);
  const fitToView = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return;
    const container = containerRef.current;
    const image = imageRef.current;
    const newScale = calculateFitToViewScale(
      container.clientWidth,
      container.clientHeight,
      image.naturalWidth,
      image.naturalHeight
    );
    handleZoom(newScale);
  }, [handleZoom]);

  const handleWheel = useMemo(() =>
    throttle((e: WheelEvent) => {
      e.preventDefault();
      if (!containerRef.current || !imageRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const mousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      handleZoom(scale * (1 + delta), mousePosition);
    }, THROTTLE_MS),
    [scale, handleZoom]
  );

  const handleMouseMove = useMemo(() => 
    throttle((e: MouseEvent) => {
      if (!isPanning || !containerRef.current || !imageRef.current) return;
      const newPanOffset = {
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y
      };
      rafRef.current = requestAnimationFrame(() => {
        setPanOffset(prev => clampPanOffsets(
          newPanOffset,
          { width: containerRef.current!.clientWidth, height: containerRef.current!.clientHeight },
          { width: imageRef.current!.naturalWidth, height: imageRef.current!.naturalHeight },
          scale
        ));
      });
    }, THROTTLE_MS),
    [isPanning, startPan, scale]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    setStartPan({
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    });
  }, [panOffset]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const updateSearchResults = useMemo(() =>
    debounce((term: string, regex: boolean, data: TreeData | null) => {
      if (!data || !term) {
        setSearchResults(new Set());
        return;
      }
      try {
        const searchRegex = regex 
          ? new RegExp(term, 'i')
          : new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        const results = new Set<string>();
        Object.values(data.nodes).forEach(node => {
          if (searchRegex.test(node.name) || node.description.some(desc => searchRegex.test(desc))) {
            results.add(node.id);
          }
        });
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults(new Set());
      }
    }, 150),
    []
  );

  useEffect(() => {
    updateSearchResults(searchTerm, isRegexSearch, treeData);
  }, [searchTerm, isRegexSearch, treeData, updateSearchResults]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    containerRef.current?.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      containerRef.current?.removeEventListener('wheel', handleWheel);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      handleMouseMove.cancel();
      handleWheel.cancel();
      updateSearchResults.cancel();
    };
  }, [handleMouseMove, handleMouseUp, handleWheel]);

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

  const filteredNodes = useMemo(() => {
    if (!treeData) return [];
    return Object.values(treeData.nodes).filter(node =>
      !node.ascendancy || node.ascendancy === selectedAscendancy
    );
  }, [treeData, selectedAscendancy]);

  const visibleNodes = useMemo(() => {
    if (!containerRef.current || !imageRef.current || !hasLoaded) return filteredNodes;
    const containerRect = containerRef.current.getBoundingClientRect();
    const imageSize = {
      width: imageRef.current.naturalWidth,
      height: imageRef.current.naturalHeight
    };
    return filteredNodes.filter(node =>
      isNodeInViewport(node, containerRect, imageSize, scale, panOffset)
    );
  }, [filteredNodes, scale, panOffset, hasLoaded]);

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

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative bg-[#070b0f] overflow-hidden"
      style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
        <button onClick={zoomIn} className="bg-gray-800/90 hover:bg-gray-700/90 text-white rounded-lg p-2 backdrop-blur-sm transition-colors" title="Zoom in">
          <ZoomIn className="w-5 h-5" />
        </button>
        <button onClick={zoomOut} className="bg-gray-800/90 hover:bg-gray-700/90 text-white rounded-lg p-2 backdrop-blur-sm transition-colors" title="Zoom out">
          <ZoomOut className="w-5 h-5" />
        </button>
        <button onClick={fitToView} className="bg-gray-800/90 hover:bg-gray-700/90 text-white rounded-lg p-2 backdrop-blur-sm transition-colors" title="Fit to view">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      <div style={{
        transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${scale})`,
        transformOrigin: '0 0',
        position: 'absolute',
        width: imageRef.current?.naturalWidth || '100%',
        height: imageRef.current?.naturalHeight || '100%',
        willChange: 'transform',
        userSelect: 'none'
      }}>
        <img
          ref={imageRef}
          src="/skill-tree.png"
          alt="Skill Tree"
          className="w-full h-full pointer-events-none"
          onLoad={handleImageLoad}
          draggable={false}
          loading="eager"
          decoding="async"
        />

        {selectedAscendancy !== 'None' && (
          <img
            src={`/ascendancies/${selectedAscendancy.toLowerCase()}.webp`}
            alt={selectedAscendancy}
            className="absolute pointer-events-none"
            style={{
              width: '320px',
              top: '50%',
              left: '50%',
              transform: 'translate3d(-50%, -50%, 0)',
              height: '320px',
              willChange: 'transform'
            }}
            draggable={false}
            loading="eager"
            decoding="async"
          />
        )}

        {hasLoaded && visibleNodes.map((node) => (
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

      {hoveredNode && (
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none"
          style={{
            transform: `translate3d(
              ${hoveredNode.position.x * imageRef.current!.naturalWidth * scale + panOffset.x + 20}px,
              ${hoveredNode.position.y * imageRef.current!.naturalHeight * scale + panOffset.y - 20}px,
              0
            )`,
            willChange: 'transform',
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
