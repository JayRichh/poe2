"use client";

import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { Maximize2, ZoomIn, ZoomOut } from "lucide-react";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SyntheticEvent } from "react";

import { ProgressiveImage } from "~/components/ui/ProgressiveImage";

import { shimmer, toBase64 } from "~/utils/image";

import {
  calculateInitialPanOffset,
  calculateZoomPanOffset,
  clampPanOffsets,
} from "../../utils/treeUtils";
import { TreeNode } from "./TreeNode";
import { TreeNodeTooltip } from "./TreeNodeTooltip";
import { TreeData, TreeNodeData } from "./data";

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
const BOTTOM_BAR_HEIGHT = 56;

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
    nodeY <= container.height - BOTTOM_BAR_HEIGHT + VIEWPORT_PADDING
  );
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
  showSkillDetails = true,
}: TreeViewerProps) {
  const [hoveredNode, setHoveredNode] = useState<TreeNodeData | null>(null);
  const [searchResults, setSearchResults] = useState<Set<string>>(new Set());
  const [hasLoaded, setHasLoaded] = useState(false);
  const [scale, setScale] = useState(() => {
    try {
      const saved = localStorage.getItem("skill-tree-scale");
      return saved ? parseFloat(saved) : 0.75;
    } catch {
      return 0.75;
    }
  });
  const [panOffset, setPanOffset] = useState(() => {
    try {
      const saved = localStorage.getItem("skill-tree-pan");
      return saved ? JSON.parse(saved) : { x: 0, y: 0 };
    } catch {
      return { x: 0, y: 0 };
    }
  });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState(() => {
    try {
      const saved = localStorage.getItem("skill-tree-image-size");
      return saved ? JSON.parse(saved) : { width: 0, height: 0 };
    } catch {
      return { width: 0, height: 0 };
    }
  });

  // Persist view state
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("skill-tree-scale", scale.toString());
      localStorage.setItem("skill-tree-pan", JSON.stringify(panOffset));
      localStorage.setItem("skill-tree-image-size", JSON.stringify(imageSize));
    }
  }, [scale, panOffset, imageSize, hasLoaded]);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  const handleImageLoad = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return;
    const container = containerRef.current;
    const image = imageRef.current;

    // Set image dimensions
    setImageSize({
      width: image.naturalWidth,
      height: image.naturalHeight,
    });

    // Calculate initial pan offset
    setPanOffset(
      calculateInitialPanOffset(
        { width: container.clientWidth, height: container.clientHeight },
        { width: image.naturalWidth, height: image.naturalHeight },
        scale
      )
    );

    setHasLoaded(true);
  }, [scale]);

  const handleZoom = useCallback(
    (newScale: number, center?: { x: number; y: number }) => {
      if (!containerRef.current || !imageRef.current) return;

      const container = containerRef.current;
      const mousePosition = center || {
        x: container.clientWidth / 2,
        y: container.clientHeight / 2,
      };

      const oldScale = scale;
      const clampedScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
      const newPanOffset = calculateZoomPanOffset(mousePosition, panOffset, oldScale, clampedScale);

      rafRef.current = requestAnimationFrame(() => {
        setScale(clampedScale);
        setPanOffset(
          clampPanOffsets(
            newPanOffset,
            { width: container.clientWidth, height: container.clientHeight },
            { width: imageRef.current!.naturalWidth, height: imageRef.current!.naturalHeight },
            clampedScale
          )
        );
      });
    },
    [scale, panOffset]
  );

  const zoomIn = useCallback(() => handleZoom(scale * (1 + ZOOM_STEP)), [scale, handleZoom]);
  const zoomOut = useCallback(() => handleZoom(scale * (1 - ZOOM_STEP)), [scale, handleZoom]);
  const fitToView = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return;
    const container = containerRef.current;
    const image = imageRef.current;
    const newScale = Math.min(
      (container.clientWidth - VIEWPORT_PADDING * 2) / image.naturalWidth,
      (container.clientHeight - VIEWPORT_PADDING * 2 - BOTTOM_BAR_HEIGHT) / image.naturalHeight
    );
    handleZoom(newScale);
  }, [handleZoom]);

  const handleWheel = useMemo(
    () =>
      throttle((e: WheelEvent) => {
        e.preventDefault();
        if (!containerRef.current || !imageRef.current) return;
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const mousePosition = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
        handleZoom(scale * (1 + delta), mousePosition);
      }, THROTTLE_MS),
    [scale, handleZoom]
  );

  const handleMouseMove = useMemo(
    () =>
      throttle((e: MouseEvent) => {
        if (!isPanning || !containerRef.current || !imageRef.current) return;
        const newPanOffset = {
          x: e.clientX - startPan.x,
          y: e.clientY - startPan.y,
        };
        rafRef.current = requestAnimationFrame(() => {
          setPanOffset((prev: { x: number; y: number }) =>
            clampPanOffsets(
              newPanOffset,
              {
                width: containerRef.current!.clientWidth,
                height: containerRef.current!.clientHeight,
              },
              { width: imageRef.current!.naturalWidth, height: imageRef.current!.naturalHeight },
              scale
            )
          );
        });
      }, THROTTLE_MS),
    [isPanning, startPan, scale]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      setIsPanning(true);
      setStartPan({
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y,
      });
    },
    [panOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    containerRef.current?.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      containerRef.current?.removeEventListener("wheel", handleWheel);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      handleMouseMove.cancel();
      handleWheel.cancel();
    };
  }, [handleMouseMove, handleMouseUp, handleWheel]);

  const filteredNodes = useMemo(() => {
    if (!treeData) return [];
    return Object.values(treeData.nodes).filter(
      (node) => !node.ascendancy || node.ascendancy === selectedAscendancy
    );
  }, [treeData, selectedAscendancy]);

  const visibleNodes = useMemo(() => {
    if (!containerRef.current || !imageRef.current || !hasLoaded) return filteredNodes;
    const containerRect = containerRef.current.getBoundingClientRect();
    return filteredNodes.filter((node) =>
      isNodeInViewport(node, containerRect, imageSize, scale, panOffset)
    );
  }, [filteredNodes, scale, panOffset, hasLoaded, imageSize]);

  if (!treeData) return null;

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative bg-background overflow-hidden"
      style={{ cursor: isPanning ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
    >
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="p-2 rounded-lg bg-accent/80 hover:bg-accent backdrop-blur-sm transition-colors"
          title="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={zoomOut}
          className="p-2 rounded-lg bg-accent/80 hover:bg-accent backdrop-blur-sm transition-colors"
          title="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={fitToView}
          className="p-2 rounded-lg bg-accent/80 hover:bg-accent backdrop-blur-sm transition-colors"
          title="Fit to view"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Tree Content */}
      <div
        style={{
          transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${scale})`,
          transformOrigin: "0 0",
          position: "absolute",
          width: imageSize.width || "100%",
          height: imageSize.height || "100%",
          willChange: "transform",
          userSelect: "none",
          backfaceVisibility: "hidden",
          perspective: 1000,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-background"
            style={{
              backgroundImage: `url('data:image/svg+xml;base64,${toBase64(shimmer(2048, 2048))}')`,
            }}
          />
          <ProgressiveImage
            ref={imageRef}
            src="/skill-tree.png"
            alt="Skill Tree"
            width={2048}
            height={2048}
            className="w-full h-full pointer-events-none"
            onLoad={handleImageLoad}
            onError={(error) => {
              console.error("Failed to load skill tree image:", error);
            }}
            draggable={false}
            priority
            quality={75}
            sizes="100vw"
            crossOrigin="anonymous"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
        </div>

        {selectedAscendancy !== "None" && (
          <ProgressiveImage
            src={`/ascendancies/${selectedAscendancy.toLowerCase()}.webp`}
            alt={selectedAscendancy}
            width={320}
            height={320}
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate3d(-50%, -50%, 0)",
              willChange: "transform",
            }}
            fallback={`/ascendancies/${selectedAscendancy.toLowerCase()}.png`}
            onError={(error) => {
              console.error("Failed to load ascendancy image:", error);
            }}
            draggable={false}
            priority
            quality={75}
            sizes="320px"
            crossOrigin="anonymous"
          />
        )}

        {hasLoaded &&
          visibleNodes.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              isSelected={selectedNode?.id === node.id}
              isHighlighted={hoveredNode?.id === node.id || searchResults.has(node.id)}
              isAllocated={allocatedNodes.has(node.id)}
              isPath={false}
              imageSize={imageSize}
              onClick={() => {
                onNodeSelect(node);
                onNodeAllocate(node);
              }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
            />
          ))}
      </div>

      {/* Node Tooltip */}
      {hoveredNode && (
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none z-[1000]"
          style={{
            transform: `translate3d(
              ${hoveredNode.position.x * imageSize.width * scale + panOffset.x + 20}px,
              ${hoveredNode.position.y * imageSize.height * scale + panOffset.y - 20}px,
              0
            )`,
            willChange: "transform",
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
