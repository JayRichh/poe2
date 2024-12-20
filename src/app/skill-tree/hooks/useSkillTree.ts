"use client";

import LZString from "lz-string";

import { useCallback, useEffect, useRef, useState } from "react";

import { TreeData, TreeNodeData } from "../components/TreeViewer/data";
import { getTreeData, loadTreeData } from "../utils/loadTreeData";
import { useTreeHistory } from "./useTreeHistory";
import { useUrlState } from "./useUrlState";

type NodeId = string;

interface BuildState {
  nodes: NodeId[];
  ascendancy: string;
  version: string;
  timestamp: string;
}

export function useSkillTree() {
  const [treeData, setTreeData] = useState<TreeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Core state
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [selectedAscendancy, setSelectedAscendancy] = useState("None");
  const [allocatedNodes, setAllocatedNodes] = useState<Set<NodeId>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegexSearch, setIsRegexSearch] = useState(false);

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
      setSelectedAscendancy(ascendancy);
      if (!isInitialLoad.current) {
        pushState(allocatedNodes, ascendancy);
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

  // Load tree data
  useEffect(() => {
    async function initializeData() {
      try {
        setIsLoading(true);
        const data = await loadTreeData();
        setTreeData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load tree data"));
        console.error("Error loading tree data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (!getTreeData()) {
      initializeData();
    } else {
      setTreeData(getTreeData());
      setIsLoading(false);
    }
  }, []);

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
      if (!treeData) return;

      setAllocatedNodes((prev) => {
        const newAllocated = new Set(prev);

        if (newAllocated.has(node.id)) {
          // Check if removing this node would disconnect the tree
          const wouldDisconnect = Array.from(newAllocated)
            .filter((id) => id !== node.id)
            .some((id) => {
              const otherNode = treeData.nodes[id];
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
    [treeData, selectedAscendancy, pushState]
  );

  // Check if a node can be allocated
  const canAllocateNode = useCallback(
    (node: TreeNodeData, currentAllocated: Set<NodeId>): boolean => {
      if (!treeData) return false;

      // If no nodes are allocated, only allow starting nodes
      if (currentAllocated.size === 0) {
        return node.type === "notable" || node.type === "keystone";
      }

      // Check if the node is connected to any allocated node
      return node.connections.some((connectedId) => currentAllocated.has(connectedId));
    },
    [treeData]
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

  const handleImport = useCallback(
    async (file: File): Promise<void> => {
      try {
        const text = await file.text();
        const data = JSON.parse(text) as BuildState;
        if (!data.nodes || !data.ascendancy) {
          throw new Error("Invalid build file format");
        }
        const newNodes = new Set(data.nodes);
        setAllocatedNodes(newNodes);
        setSelectedAscendancy(data.ascendancy);
        // Push imported state to history
        pushState(newNodes, data.ascendancy);
      } catch (error) {
        console.error("Failed to import build:", error);
      }
    },
    [pushState]
  );

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
    treeData,
    isLoading,
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
