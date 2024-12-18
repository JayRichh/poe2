'use client';

import { useEffect } from 'react';
import { useSkillTree } from './hooks/useSkillTree';
import { TreeViewer } from './components/TreeViewer/TreeViewer';
import { NodeDetails } from './components/Sidebar/NodeDetails';
import { Filters } from './components/Sidebar/Filters';
import { StatsPanel } from './components/Sidebar/StatsPanel';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Info, Undo, Redo, RotateCcw, Download, Upload, Share2 } from 'lucide-react';

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
      <div className="flex items-center justify-center w-full h-screen bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-foreground border-t-transparent" />
          <div>Loading skill tree...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-background text-foreground">
        <div className="text-red-500">Error loading skill tree: {error.message}</div>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full h-[calc(100vh-4rem)] bg-background text-foreground overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - Filters */}
        <div className={`border-r border-border overflow-y-auto transition-all duration-300 ease-in-out
          ${leftSidebarVisible ? 'w-80' : 'w-12'}`}
        >
          <div className="sticky top-0 p-2 bg-background border-b border-border z-10">
            <button
              onClick={toggleLeftSidebar}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
              title={leftSidebarVisible ? 'Collapse Filters' : 'Expand Filters'}
            >
              {leftSidebarVisible ? (
                <>
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </span>
                  <ChevronLeft className="w-4 h-4" />
                </>
              ) : (
                <SlidersHorizontal className="w-4 h-4 mx-auto" />
              )}
            </button>
          </div>
          {leftSidebarVisible && (
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
          )}
        </div>

        {/* Tree Viewer Container */}
        <div className="flex-1 min-w-0 relative">
          {/* Tree Viewer */}
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

          {/* Bottom Bar - Actions */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-4 py-2">
              <div className="flex items-center justify-between gap-4">
                {/* Tree Info */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/50">
                    <span className="text-muted-foreground">Allocated:</span>
                    <span className="font-medium">{allocatedNodes.size}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/50">
                    <span className="text-muted-foreground">Ascendancy:</span>
                    <span className="font-medium">{selectedAscendancy}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* History Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={undo}
                      disabled={!canUndo}
                      className={`p-2 rounded-lg transition-colors ${
                        canUndo ? 'hover:bg-accent text-foreground' : 'text-muted-foreground cursor-not-allowed'
                      }`}
                      title="Undo"
                    >
                      <Undo className="w-4 h-4" />
                    </button>
                    <button
                      onClick={redo}
                      disabled={!canRedo}
                      className={`p-2 rounded-lg transition-colors ${
                        canRedo ? 'hover:bg-accent text-foreground' : 'text-muted-foreground cursor-not-allowed'
                      }`}
                      title="Redo"
                    >
                      <Redo className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="w-px h-6 bg-border mx-2" />

                  {/* Tree Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={resetTree}
                      className="p-2 rounded-lg hover:bg-accent transition-colors text-destructive hover:text-destructive"
                      title="Reset Tree"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleExport}
                      className="p-2 rounded-lg hover:bg-accent transition-colors"
                      title="Export Tree"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <label className="p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                      title="Import Tree"
                    >
                      <Upload className="w-4 h-4" />
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
                      className="p-2 rounded-lg hover:bg-accent transition-colors"
                      title="Share Tree"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Node Details & Stats */}
        <div className={`border-l border-border overflow-y-auto transition-all duration-300 ease-in-out
          ${rightSidebarVisible ? 'w-96' : 'w-12'}`}
        >
          <div className="sticky top-0 p-2 bg-background border-b border-border z-10">
            <button
              onClick={toggleRightSidebar}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
              title={rightSidebarVisible ? 'Collapse Details' : 'Expand Details'}
            >
              {rightSidebarVisible ? (
                <>
                  <span className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Details
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <Info className="w-4 h-4 mx-auto" />
              )}
            </button>
          </div>
          {rightSidebarVisible && (
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
                <div className="border-t border-border pt-6">
                  <h2 className="text-xl font-bold mb-4">Stats Summary</h2>
                  <StatsPanel
                    treeData={treeData}
                    allocatedNodes={allocatedNodes}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
