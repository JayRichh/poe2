"use client";

import LZString from "lz-string";

import { useCallback, useEffect, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";

import { TreeData, TreeNodeData } from "../components/TreeViewer/data";
import {
  type ImportedTreeBuild,
  normalizeAscendancy,
  parseTreeBuildJson,
} from "../utils/buildImport";
import { useTreeData } from "./useTreeData";
import { useTreeHistory } from "./useTreeHistory";
import { useUrlState } from "./useUrlState";

type NodeId = string;

interface BuildState {
  nodes: NodeId[];
  ascendancy: string;
  version: string;
  timestamp: string;
}

export interface ImportStatus {
  type: "success" | "error";
  message: string;
}

export function useSkillTree() {
  // Use React Query for tree data
  const { data: treeData, error } = useTreeData();
  const treeDataRef = treeData || null; // Convert undefined to null for compatibility
  const searchParams = useSearchParams();

  // Core state
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [selectedAscendancy, setSelectedAscendancy] = useState("None");
  const [allocatedNodes, setAllocatedNodes] = useState<Set<NodeId>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegexSearch, setIsRegexSearch] = useState(false);
  const [importStatus, setImportStatus] = useState<ImportStatus | null>(null);

  // Filter states
  const [highlightKeystones, setHighlightKeystones] = useState(false);
  const [highlightNotables, setHighlightNotables] = useState(false);
  const [highlightNormal, setHighlightNormal] = useState(false);
  const [hideUnidentified, setHideUnidentified] = useState(false);
  const [hideUnselected, setHideUnselected] = useState(false);
  const [hideNormal, setHideNormal] = useState(false);
  const [showKeywordDetails, setShowKeywordDetails] = useState(false);
  const [showSkillDetails, setShowSkillDetails] = useState(true);

  // Sidebar visibility
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);

  // Prevent initial state updates from triggering URL changes
  const isInitialLoad = useRef(true);

  // History management
  const handleHistoryChange = useCallback((nodes: Set<string>, ascendancy: string) => {
    setAllocatedNodes(nodes);
    setSelectedAscendancy(ascendancy);
  }, []);

  const { pushState, undo, redo, canUndo, canRedo, getHistory, clearHistory, restoreState } =
    useTreeHistory({
      onStateChange: handleHistoryChange,
    });

  // URL state handling
  const handleNodesLoad = useCallback(
    (nodes: NodeId[]) => {
      const nodeSet = new Set(nodes);
      setAllocatedNodes(nodeSet);
      if (!isInitialLoad.current) {
        pushState(nodeSet, selectedAscendancy);
      }
    },
    [selectedAscendancy, pushState]
  );

  const handleAscendancyLoad = useCallback(
    (ascendancy: string) => {
      const normalized = normalizeAscendancy(ascendancy);
      setSelectedAscendancy(normalized);
      if (!isInitialLoad.current) {
        pushState(allocatedNodes, normalized);
      }
    },
    [allocatedNodes, pushState]
  );

  const { updateUrl } = useUrlState({
    onNodesLoad: handleNodesLoad,
    onAscendancyLoad: handleAscendancyLoad,
  });

  // Update URL when state changes
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    updateUrl(Array.from(allocatedNodes), selectedAscendancy);
  }, [allocatedNodes, selectedAscendancy, updateUrl]);

  // Node filtering functions
  const filterNormalNodes = useCallback(
    (node: TreeNodeData): boolean => {
      return !hideNormal || node.type !== "normal";
    },
    [hideNormal]
  );

  const filterUnselectedNodes = useCallback(
    (node: TreeNodeData): boolean => {
      return !hideUnselected || allocatedNodes.has(node.id);
    },
    [hideUnselected, allocatedNodes]
  );

  const filterUnidentifiedNodes = useCallback(
    (node: TreeNodeData): boolean => {
      return !hideUnidentified || node.description.length > 0;
    },
    [hideUnidentified]
  );

  const filterSelectedAscendancyNodes = useCallback(
    (node: TreeNodeData): boolean => {
      return !node.ascendancy || node.ascendancy === selectedAscendancy;
    },
    [selectedAscendancy]
  );

  const filterNode = useCallback(
    (node: TreeNodeData): boolean => {
      return (
        filterNormalNodes(node) &&
        filterUnselectedNodes(node) &&
        filterUnidentifiedNodes(node) &&
        filterSelectedAscendancyNodes(node)
      );
    },
    [
      filterNormalNodes,
      filterUnselectedNodes,
      filterUnidentifiedNodes,
      filterSelectedAscendancyNodes,
    ]
  );

  // Handle node allocation with validation
  const handleNodeAllocate = useCallback(
    (node: TreeNodeData): void => {
      if (!treeDataRef) return;

      setAllocatedNodes((prev) => {
        const newAllocated = new Set(prev);

        if (newAllocated.has(node.id)) {
          // Check if removing this node would disconnect the tree
          const wouldDisconnect = Array.from(newAllocated)
            .filter((id) => id !== node.id)
            .some((id) => {
              const otherNode = treeDataRef.nodes[id];
              return otherNode && otherNode.connections.includes(node.id);
            });

          if (!wouldDisconnect) {
            newAllocated.delete(node.id);
          }
        } else if (canAllocateNode(node, newAllocated)) {
          newAllocated.add(node.id);
        }

        // Only push state if there was a change
        if (
          newAllocated.size !== prev.size ||
          Array.from(newAllocated).some((id) => !prev.has(id))
        ) {
          pushState(newAllocated, selectedAscendancy);
        }
        return newAllocated;
      });
    },
    [treeDataRef, selectedAscendancy, pushState]
  );

  // Check if a node can be allocated
  const canAllocateNode = useCallback(
    (node: TreeNodeData, currentAllocated: Set<NodeId>): boolean => {
      if (!treeDataRef) return false;

      // If no nodes are allocated, only allow starting nodes
      if (currentAllocated.size === 0) {
        return node.type === "notable" || node.type === "keystone";
      }

      // Check if the node is connected to any allocated node
      return node.connections.some((connectedId) => currentAllocated.has(connectedId));
    },
    [treeDataRef]
  );

  const handleAscendancyChange = useCallback(
    (ascendancy: string): void => {
      if (ascendancy === selectedAscendancy) return;

      setSelectedAscendancy(ascendancy);
      // Reset allocated nodes when changing ascendancy
      const newNodes = new Set<NodeId>();
      setAllocatedNodes(newNodes);
      // Push new state to history
      pushState(newNodes, ascendancy);
    },
    [selectedAscendancy, pushState]
  );

  const resetTree = useCallback((): void => {
    setAllocatedNodes(new Set());
    setSelectedNode(null);
    clearHistory();
  }, [clearHistory]);

  const toggleLeftSidebar = useCallback((): void => {
    setLeftSidebarVisible((prev) => !prev);
  }, []);

  const toggleRightSidebar = useCallback((): void => {
    setRightSidebarVisible((prev) => !prev);
  }, []);

  // Import/Export functionality
  const handleExport = useCallback((): void => {
    const data: BuildState = {
      nodes: Array.from(allocatedNodes),
      ascendancy: selectedAscendancy,
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `poe2-skill-tree-${data.timestamp.split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [allocatedNodes, selectedAscendancy]);

  const applyImportedBuild = useCallback(
    (build: ImportedTreeBuild, sourceName: string): void => {
      if (!treeDataRef) throw new Error("Passive tree data is still loading");

      const validNodes = build.nodes.filter((id) => Boolean(treeDataRef.nodes[id]));
      const ignoredCount = build.nodes.length - validNodes.length;
      if (validNodes.length === 0) {
        throw new Error("None of the passive IDs exist in the current tree dataset");
      }

      const nodeSet = new Set(validNodes);
      const ascendancy = normalizeAscendancy(build.ascendancy);
      setAllocatedNodes(nodeSet);
      setSelectedAscendancy(ascendancy);
      pushState(nodeSet, ascendancy);
      setImportStatus({
        type: "success",
        message: `Loaded ${validNodes.length} passives from ${build.name || sourceName}${
          ignoredCount ? ` (${ignoredCount} unknown IDs ignored)` : ""
        }`,
      });
    },
    [pushState, treeDataRef]
  );

  const handleImport = useCallback(
    async (file: File): Promise<void> => {
      try {
        const text = await file.text();
        applyImportedBuild(parseTreeBuildJson(text), file.name);
      } catch (error) {
        console.error("Failed to import build:", error);
        setImportStatus({
          type: "error",
          message: error instanceof Error ? error.message : "Failed to import build",
        });
      }
    },
    [applyImportedBuild]
  );

  const autoBuildLoaded = useRef(false);
  useEffect(() => {
    const buildUrl = searchParams.get("build");
    if (!treeDataRef || !buildUrl || autoBuildLoaded.current) return;
    autoBuildLoaded.current = true;

    void fetch(buildUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load ${buildUrl} (${response.status})`);
        return response.text();
      })
      .then((text) =>
        applyImportedBuild(parseTreeBuildJson(text), buildUrl.split("/").pop() ?? buildUrl)
      )
      .catch((error: unknown) => {
        console.error("Failed to auto-load build:", error);
        setImportStatus({
          type: "error",
          message: error instanceof Error ? error.message : "Failed to auto-load build",
        });
      });
  }, [applyImportedBuild, searchParams, treeDataRef]);

  const getShareLink = useCallback((): string => {
    const params = new URLSearchParams();

    if (selectedAscendancy !== "None") {
      params.set("a", selectedAscendancy.toLowerCase());
    }

    if (allocatedNodes.size > 0) {
      const nodesString = Array.from(allocatedNodes).join(",");
      const compressed = LZString.compressToEncodedURIComponent(nodesString);
      params.set("p", compressed);
    }

    return `${window.location.origin}${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`;
  }, [allocatedNodes, selectedAscendancy]);

  return {
    // Core state
    treeData: treeDataRef,
    error,
    selectedNode,
    setSelectedNode,
    selectedAscendancy,
    handleAscendancyChange,
    allocatedNodes,
    handleNodeAllocate,
    searchTerm,
    setSearchTerm,
    isRegexSearch,
    setIsRegexSearch,
    importStatus,

    // Filter state
    highlightKeystones,
    setHighlightKeystones,
    highlightNotables,
    setHighlightNotables,
    highlightNormal,
    setHighlightNormal,
    hideUnidentified,
    setHideUnidentified,
    hideUnselected,
    setHideUnselected,
    hideNormal,
    setHideNormal,
    showKeywordDetails,
    setShowKeywordDetails,
    showSkillDetails,
    setShowSkillDetails,

    // Sidebar state
    leftSidebarVisible,
    rightSidebarVisible,
    toggleLeftSidebar,
    toggleRightSidebar,

    // Filter functions
    filterNode,
    canAllocateNode,

    // History functions
    undo,
    redo,
    canUndo,
    canRedo,
    getHistory,
    restoreState,

    // Actions
    resetTree,
    handleExport,
    handleImport,
    getShareLink,
  };
}
