"use client";

interface LoadingOverlayProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingOverlay({ message = "Loading...", fullScreen = false }: LoadingOverlayProps) {
  const baseClasses = "bg-background/80 backdrop-blur-sm flex items-center justify-center z-50";
  const positionClasses = fullScreen ? "fixed inset-0" : "absolute inset-0";

  return (
    <div className={`${baseClasses} ${positionClasses}`}>
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="text-primary">{message}</div>
      </div>
    </div>
  );
}
