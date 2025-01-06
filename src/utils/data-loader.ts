export async function loadJsonChunked<T>(url: string, chunkSize = 50): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Accept-Encoding': 'gzip',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to load data from ${url}`);
  }

  return response.json();
}

export function createDataLoader<T>(url: string) {
  let cachedData: T | null = null;
  let loadingPromise: Promise<T> | null = null;

  return {
    load: async () => {
      if (cachedData) {
        return cachedData;
      }

      if (loadingPromise) {
        return loadingPromise;
      }

      loadingPromise = loadJsonChunked<T>(url);
      try {
        cachedData = await loadingPromise;
        return cachedData;
      } finally {
        loadingPromise = null;
      }
    },
    clearCache: () => {
      cachedData = null;
    }
  };
}

// Create loaders for specific data files
export const nodesLoader = createDataLoader<any>('/data/nodes.json');
export const nodesDescLoader = createDataLoader<any>('/data/nodes_desc.json');
