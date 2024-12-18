'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import LZString from 'lz-string';

interface UseTreeStateProps {
  onNodesLoad?: (nodes: string[]) => void;
  onAscendancyLoad?: (ascendancy: string) => void;
}

export function useTreeState({ onNodesLoad, onAscendancyLoad }: UseTreeStateProps = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  // Load state from URL on mount
  useEffect(() => {
    const asc = searchParams.get('a');
    const passivesCompressed = searchParams.get('p');

    if (asc && onAscendancyLoad) {
      onAscendancyLoad(asc);
    }

    if (passivesCompressed && onNodesLoad) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(passivesCompressed);
        const nodes = decompressed ? decompressed.split(',') : [];
        onNodesLoad(nodes);
      } catch (error) {
        console.error('Error parsing selected nodes from URL:', error);
      }
    }

    setIsInitialized(true);
  }, [searchParams, onNodesLoad, onAscendancyLoad]);

  // Update URL when state changes
  const updateUrl = useCallback((nodes: string[], ascendancy: string) => {
    if (!isInitialized) return;

    const params = new URLSearchParams(searchParams.toString());
    
    // Update ascendancy
    if (ascendancy !== 'None') {
      params.set('a', ascendancy.toLowerCase());
    } else {
      params.delete('a');
    }

    // Update nodes
    if (nodes.length > 0) {
      const nodesString = nodes.join(',');
      const compressed = LZString.compressToEncodedURIComponent(nodesString);
      params.set('p', compressed);
    } else {
      params.delete('p');
    }

    // Update URL without reload
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    router.replace(newUrl, { scroll: false });
  }, [isInitialized, router, searchParams]);

  // Export build to JSON
  const exportBuild = useCallback((nodes: string[], ascendancy: string) => {
    const data = {
      nodes,
      ascendancy,
      version: '1.0.0',
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poe2-skill-tree-${data.timestamp.split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  // Import build from JSON
  const importBuild = useCallback(async (file: File): Promise<{ nodes: string[], ascendancy: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (!data.nodes || !data.ascendancy) {
            throw new Error('Invalid build file format');
          }
          resolve({
            nodes: data.nodes,
            ascendancy: data.ascendancy
          });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  // Share build link
  const shareBuildLink = useCallback((nodes: string[], ascendancy: string): string => {
    const params = new URLSearchParams();
    
    if (ascendancy !== 'None') {
      params.set('a', ascendancy.toLowerCase());
    }
    
    if (nodes.length > 0) {
      const nodesString = nodes.join(',');
      const compressed = LZString.compressToEncodedURIComponent(nodesString);
      params.set('p', compressed);
    }

    return `${window.location.origin}${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
  }, []);

  return {
    updateUrl,
    exportBuild,
    importBuild,
    shareBuildLink
  };
}
