"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { LoadingOverlay } from "~/components/ui/LoadingOverlay";
import { BuildForm } from "~/components/build-planner/BuildForm";
import { handleBuildSubmit } from "~/app/actions/server/build-form";
import type { BuildFormData } from "~/app/actions/server/build-form";
import { useBuild } from "~/contexts/build";

interface EditBuildFormProps {
  id: string;
}

export function EditBuildForm({ id }: EditBuildFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const build = useBuild();

  const handleSubmit = useCallback(async (formData: Partial<BuildFormData>) => {
    if (isSubmitting) {
      return { success: false, buildId: id, error: "Submission in progress" };
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await handleBuildSubmit(id, formData);

      if (result.success) {
        const newPath = `/build-planner/${result.buildId}`;
        
        // Show loading overlay during transition
        const loadingRoot = document.createElement('div');
        loadingRoot.id = 'loading-overlay-root';
        document.body.appendChild(loadingRoot);

        const root = createRoot(loadingRoot);
        root.render(<LoadingOverlay message="Saving changes..." fullScreen />);

        // Cleanup function to remove overlay
        const cleanup = () => {
          try {
            root.unmount();
            loadingRoot.remove();
          } catch (e) {
            console.error('Error cleaning up loading overlay:', e);
          }
        };

        // Set timeout to cleanup if navigation fails
        const timeoutId = setTimeout(cleanup, 5000);

        // Wait for server-side revalidation to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Navigate after revalidation
        router.replace(newPath);
        
        return result;
      }

      setError(result.error || "Failed to save build");
      return { 
        success: false, 
        buildId: id, 
        error: result.error || "Failed to save build" 
      };
    } catch (error) {
      console.error("Error submitting build:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save build";
      setError(errorMessage);
      return { 
        success: false, 
        buildId: id, 
        error: errorMessage
      };
    } finally {
      // Only reset submitting state if there was an error
      // Keep it during successful navigation
      if (error) {
        setIsSubmitting(false);
      }
    }
  }, [id, isSubmitting, router]);

  return (
    <div className="relative">
      {isSubmitting && <LoadingOverlay message="Saving changes..." />}
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {error}
        </div>
      )}
      <BuildForm 
        initialBuild={build}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
