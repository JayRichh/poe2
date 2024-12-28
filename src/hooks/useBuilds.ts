import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

const BUILDS_QUERY_KEY = 'builds';

export function useBuilds(options?: BuildOptions) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Main query for builds
  const { data: builds = [], isLoading, error } = useQuery({
    queryKey: [BUILDS_QUERY_KEY, options],
    queryFn: () => getBuilds(options),
    enabled: !!user,
    staleTime: 2000, // Consider data fresh for 2 seconds
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createBuild,
    onSuccess: (newBuild) => {
      queryClient.setQueryData<Build[]>([BUILDS_QUERY_KEY, options], (old = []) => 
        [newBuild, ...old]
      );
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBuildData }) => 
      updateBuild(id, data),
    onSuccess: (updatedBuild) => {
      queryClient.setQueryData<Build[]>([BUILDS_QUERY_KEY, options], (old = []) =>
        old.map(build => build.id === updatedBuild.id ? updatedBuild : build)
      );
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteBuild,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Build[]>([BUILDS_QUERY_KEY, options], (old = []) =>
        old.filter(build => build.id !== deletedId)
      );
    },
  });

  return {
    builds,
    loading: isLoading,
    error: error as Error | null,
    loadBuilds: () => queryClient.invalidateQueries({ queryKey: [BUILDS_QUERY_KEY, options] }),
    createBuild: createMutation.mutateAsync,
    updateBuild: (id: string, data: UpdateBuildData) => 
      updateMutation.mutateAsync({ id, data }),
    deleteBuild: deleteMutation.mutateAsync,
    // Additional mutation states for UI feedback
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export type { Build, BuildOptions, CreateBuildData, UpdateBuildData };
