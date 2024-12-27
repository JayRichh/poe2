import { useState, useCallback, useRef, useEffect } from 'react';
import { useAuth } from '~/contexts/auth';
import { 
  getBuilds, 
  createBuild, 
  updateBuild, 
  deleteBuild,
  type Build,
  type BuildOptions,
  type CreateBuildData,
  type UpdateBuildData
} from '~/app/actions/server/builds';

export function useBuilds() {
  const { user } = useAuth();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track last fetch time and options
  const lastFetchRef = useRef<{ time: number; options: string }>({ time: 0, options: '' });
  const loadTimeoutRef = useRef<NodeJS.Timeout>();

  const loadBuilds = useCallback(async (options?: BuildOptions) => {
    if (!user) return;

    // Create a cache key from options
    const optionsKey = JSON.stringify(options || {});
    const now = Date.now();

    // Prevent duplicate fetches within 2 seconds with same options
    if (now - lastFetchRef.current.time < 2000 && lastFetchRef.current.options === optionsKey) {
      return;
    }

    // Clear any pending fetch
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }

    // Debounce the fetch
    loadTimeoutRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getBuilds(options);
        setBuilds(data);
        lastFetchRef.current = { time: Date.now(), options: optionsKey };
      } catch (err) {
        console.error('Error loading builds:', err);
        setError('Failed to load builds');
      } finally {
        setLoading(false);
      }
    }, 100);
  }, [user]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, []);

  const create = useCallback(async (buildData: CreateBuildData) => {
    if (!user) return null;

    setLoading(true);
    setError(null);

    try {
      const newBuild = await createBuild(buildData);
      setBuilds(prev => [newBuild, ...prev]);
      return newBuild;
    } catch (err) {
      console.error('Error creating build:', err);
      setError('Failed to create build');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const update = useCallback(async (id: string, buildData: UpdateBuildData) => {
    if (!user) return null;

    setLoading(true);
    setError(null);

    try {
      const updatedBuild = await updateBuild(id, buildData);
      setBuilds(prev => prev.map(build => 
        build.id === id ? updatedBuild : build
      ));
      return updatedBuild;
    } catch (err) {
      console.error('Error updating build:', err);
      setError('Failed to update build');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const remove = useCallback(async (id: string) => {
    if (!user) return false;

    setLoading(true);
    setError(null);

    try {
      await deleteBuild(id);
      setBuilds(prev => prev.filter(build => build.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting build:', err);
      setError('Failed to delete build');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    builds,
    loading,
    error,
    loadBuilds,
    createBuild: create,
    updateBuild: update,
    deleteBuild: remove
  };
}

export type { Build, BuildOptions, CreateBuildData, UpdateBuildData };
