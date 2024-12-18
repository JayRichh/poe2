'use client';

import { useState, useCallback } from 'react';
import { TreeNodeData } from '../components/TreeViewer/data';

interface TreeState {
  allocatedNodes: Set<string>;
  ascendancy: string;
  timestamp: number;
}

interface UseTreeHistoryProps {
  onStateChange: (nodes: Set<string>, ascendancy: string) => void;
}

const MAX_HISTORY = 50;

export function useTreeHistory({ onStateChange }: UseTreeHistoryProps) {
  const [history, setHistory] = useState<TreeState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const pushState = useCallback((nodes: Set<string>, ascendancy: string) => {
    const newState: TreeState = {
      allocatedNodes: new Set(nodes),
      ascendancy,
      timestamp: Date.now()
    };

    setHistory(prev => {
      // Remove any future states if we're not at the end
      const newHistory = prev.slice(0, currentIndex + 1);
      
      // Add new state
      newHistory.push(newState);
      
      // Keep only last MAX_HISTORY states
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }
      
      return newHistory;
    });
    
    setCurrentIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex <= 0) return;
    
    const prevState = history[currentIndex - 1];
    setCurrentIndex(prev => prev - 1);
    onStateChange(prevState.allocatedNodes, prevState.ascendancy);
  }, [currentIndex, history, onStateChange]);

  const redo = useCallback(() => {
    if (currentIndex >= history.length - 1) return;
    
    const nextState = history[currentIndex + 1];
    setCurrentIndex(prev => prev + 1);
    onStateChange(nextState.allocatedNodes, nextState.ascendancy);
  }, [currentIndex, history, onStateChange]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const getHistory = useCallback(() => {
    return history.map(state => ({
      allocatedNodes: Array.from(state.allocatedNodes),
      ascendancy: state.ascendancy,
      timestamp: state.timestamp
    }));
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
  }, []);

  const restoreState = useCallback((index: number) => {
    if (index < 0 || index >= history.length) return;
    
    const state = history[index];
    setCurrentIndex(index);
    onStateChange(state.allocatedNodes, state.ascendancy);
  }, [history, onStateChange]);

  return {
    pushState,
    undo,
    redo,
    canUndo,
    canRedo,
    getHistory,
    clearHistory,
    restoreState
  };
}
