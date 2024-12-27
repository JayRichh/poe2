import { useState, useCallback } from 'react';
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

  const loadBuilds = useCallback(async (options?: BuildOptions) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getBuilds(options);
      setBuilds(data);
    } catch (err) {
      console.error('Error loading builds:', err);
      setError('Failed to load builds');
    } finally {
      setLoading(false);
    }
  }, [user]);

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
