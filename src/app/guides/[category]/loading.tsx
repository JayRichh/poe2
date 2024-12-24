export default function Loading() {
  return (
    <div className="container mx-auto animate-pulse">
      <div className="h-8 w-64 bg-border/30 rounded mb-8" />
      <div className="space-y-4">
        <div className="h-4 w-full bg-border/30 rounded" />
        <div className="h-4 w-3/4 bg-border/30 rounded" />
        <div className="h-4 w-5/6 bg-border/30 rounded" />
      </div>
    </div>
  );
}
