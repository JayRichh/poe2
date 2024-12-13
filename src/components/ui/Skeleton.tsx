import { cn } from "~/utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  animation?: "pulse" | "wave" | "none";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "text",
  animation = "pulse",
  width,
  height,
}: SkeletonProps) {
  const baseStyles = cn(
    "bg-foreground/10",
    animation === "pulse" && "animate-pulse",
    animation === "wave" && "animate-shimmer",
    variant === "text" && "h-4 rounded-md",
    variant === "circular" && "rounded-full",
    variant === "rectangular" && "rounded-lg",
    className
  );

  const style = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
    height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
  };

  return <div className={baseStyles} style={style} />;
}

// Example usage:
export function SkeletonDemo() {
  return (
    <div className="space-y-8">
      {/* Text Skeletons */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-foreground/70">Text Skeletons</div>
        <div className="space-y-3">
          <Skeleton className="w-3/4" />
          <Skeleton className="w-1/2" />
          <Skeleton className="w-2/3" />
        </div>
      </div>

      {/* Card Loading */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-foreground/70">Card Loading</div>
        <div className="p-6 space-y-4 bg-background/40 backdrop-blur-sm rounded-xl border-2 border-border/50">
          <Skeleton variant="rectangular" height={200} />
          <Skeleton className="w-3/4" />
          <Skeleton className="w-1/2" />
          <div className="flex gap-2">
            <Skeleton variant="circular" width={32} height={32} />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-1/3" />
              <Skeleton className="w-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* List Loading */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-foreground/70">List Loading</div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-1/4" />
                <Skeleton className="w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Variants */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-foreground/70">Animation Variants</div>
        <div className="space-y-4">
          <Skeleton animation="pulse" className="w-full" />
          <Skeleton animation="wave" className="w-full" />
          <Skeleton animation="none" className="w-full" />
        </div>
      </div>
    </div>
  );
}

// Code preview
export const skeletonCode = `// Skeleton Component Usage
// Basic text skeleton
<Skeleton className="w-3/4" />

// Circular skeleton (avatar)
<Skeleton 
  variant="circular"
  width={40}
  height={40}
/>

// Rectangular skeleton (image)
<Skeleton 
  variant="rectangular"
  height={200}
/>

// Card loading state
<div className="space-y-4">
  <Skeleton variant="rectangular" height={200} />
  <Skeleton className="w-3/4" />
  <Skeleton className="w-1/2" />
</div>

// Different animations
<Skeleton animation="pulse" />
<Skeleton animation="wave" />
<Skeleton animation="none" />`;
