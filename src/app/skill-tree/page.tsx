'use client';

import { useEffect } from 'react';
import { useSkillTree } from './hooks/useSkillTree';
import { TreeViewer } from './components/TreeViewer/TreeViewer';
import { NodeDetails } from './components/Sidebar/NodeDetails';
import { Filters } from './components/Sidebar/Filters';
import { StatsPanel } from './components/Sidebar/StatsPanel';

// Pre-load data files
const preloadData = () => {
  const files = [
    '/data/nodes.json',
    '/data/nodes_desc.json',
    '/data/skills.json',
    '/data/keywords.json'
  ];

  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch';
    link.href = file;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

export default function SkillTreePage() {
  const {
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

    // History functions
    undo,
    redo,
    canUndo,
    canRedo,

    // Actions
    resetTree,
    handleExport,
    handleImport,
    getShareLink
  } = useSkillTree();

  // Preload data files
  useEffect(() => {
    preloadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-900 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
          <div>Loading skill tree...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-900 text-white">
        <div className="text-red-500">Error loading skill tree: {error.message}</div>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full h-[calc(100vh-5rem)] bg-gray-900 text-white overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - Filters */}
        <div className={`w-80 border-r border-gray-700 overflow-y-auto transition-all duration-300
          ${leftSidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="sticky top-0 p-4 bg-gray-900 border-b border-gray-700 z-10">
            <button
              onClick={toggleLeftSidebar}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
            >
              <span>Filters</span>
              <span>{leftSidebarVisible ? '←' : '→'}</span>
            </button>
          </div>
          <div className="p-4">
            <Filters
              selectedAscendancy={selectedAscendancy}
              onAscendancyChange={handleAscendancyChange}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              isRegexSearch={isRegexSearch}
              onRegexSearchChange={setIsRegexSearch}
              highlightKeystones={highlightKeystones}
              onHighlightKeystonesChange={setHighlightKeystones}
              highlightNotables={highlightNotables}
              onHighlightNotablesChange={setHighlightNotables}
              highlightNormal={highlightNormal}
              onHighlightNormalChange={setHighlightNormal}
              hideUnidentified={hideUnidentified}
              onHideUnidentifiedChange={setHideUnidentified}
              hideUnselected={hideUnselected}
              onHideUnselectedChange={setHideUnselected}
              hideNormal={hideNormal}
              onHideNormalChange={setHideNormal}
              showKeywordDetails={showKeywordDetails}
              onShowKeywordDetailsChange={setShowKeywordDetails}
              showSkillDetails={showSkillDetails}
              onShowSkillDetailsChange={setShowSkillDetails}
              searchResults={treeData ? Object.values(treeData.nodes) : []}
              allocatedNodes={allocatedNodes}
              onNodeClick={(node) => {
                setSelectedNode(node);
                handleNodeAllocate(node);
              }}
              onNodeHover={setSelectedNode}
            />
          </div>
        </div>

        {/* Tree Viewer */}
        <div className="flex-1 min-w-0 relative">
          <TreeViewer
            treeData={treeData}
            selectedAscendancy={selectedAscendancy}
            selectedNode={selectedNode}
            onNodeSelect={setSelectedNode}
            allocatedNodes={allocatedNodes}
            onNodeAllocate={handleNodeAllocate}
            searchTerm={searchTerm}
            isRegexSearch={isRegexSearch}
          />
        </div>

        {/* Right Sidebar - Node Details & Stats */}
        <div className={`w-96 border-l border-gray-700 overflow-y-auto transition-all duration-300
          ${rightSidebarVisible ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="sticky top-0 p-4 bg-gray-900 border-b border-gray-700 z-10">
            <button
              onClick={toggleRightSidebar}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
            >
              <span>Details</span>
              <span>{rightSidebarVisible ? '→' : '←'}</span>
            </button>
          </div>
          <div className="p-4 space-y-6">
            {/* Node Details */}
            <NodeDetails
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
              showKeywordDetails={showKeywordDetails}
              showSkillDetails={showSkillDetails}
            />

            {/* Stats Summary */}
            {treeData && (
              <div className="border-t border-gray-700 pt-6">
                <h2 className="text-xl font-bold mb-4">Stats Summary</h2>
                <StatsPanel
                  treeData={treeData}
                  allocatedNodes={allocatedNodes}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Actions */}
      <div className="flex-none p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="font-semibold">Allocated: {allocatedNodes.size}</span>
            <span className="font-semibold">Ascendancy: {selectedAscendancy}</span>
          </div>
          <div className="flex gap-2">
            {/* History Controls */}
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`px-4 py-2 rounded transition-colors ${
                canUndo ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              Undo
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`px-4 py-2 rounded transition-colors ${
                canRedo ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              Redo
            </button>

            {/* Tree Actions */}
            <button
              onClick={resetTree}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              Export
            </button>
            <label className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors cursor-pointer">
              Import
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImport(file);
                }}
              />
            </label>
            <button
              onClick={() => {
                const link = getShareLink();
                navigator.clipboard.writeText(link);
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
