'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import LZString from 'lz-string';

interface UseUrlStateProps {
  onNodesLoad?: (nodes: string[]) => void;
  onAscendancyLoad?: (ascendancy: string) => void;
}

export function useUrlState({ onNodesLoad, onAscendancyLoad }: UseUrlStateProps = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isInitialLoad = useRef(true);

  // Load state from URL on mount
  useEffect(() => {
    // Only process URL params on initial load or when URL changes externally
    if (!isInitialLoad.current) return;
    isInitialLoad.current = false;

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
  }, [searchParams, onNodesLoad, onAscendancyLoad]);

  // Update URL when state changes
  const updateUrl = useCallback((nodes: string[], ascendancy: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let hasChanges = false;
    
    // Update ascendancy
    const currentAsc = params.get('a');
    const newAsc = ascendancy !== 'None' ? ascendancy.toLowerCase() : null;
    
    if (currentAsc !== newAsc) {
      if (newAsc) {
        params.set('a', newAsc);
      } else {
        params.delete('a');
      }
      hasChanges = true;
    }

    // Update nodes
    const currentNodes = params.get('p');
    const newNodesCompressed = nodes.length > 0 
      ? LZString.compressToEncodedURIComponent(nodes.join(','))
      : null;
    
    if (currentNodes !== newNodesCompressed) {
      if (newNodesCompressed) {
        params.set('p', newNodesCompressed);
      } else {
        params.delete('p');
      }
      hasChanges = true;
    }

    // Only update URL if there are actual changes
    if (hasChanges) {
      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, router]);

  return {
    updateUrl
  };
}
