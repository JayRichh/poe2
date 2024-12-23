import { shimmer, toBase64 } from "~/utils/image";

export default function SkillTreeLoading() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-4rem)] bg-background text-foreground">
      <div className="flex flex-col items-center gap-6 relative">
        <div 
          className="absolute inset-0 -m-8 bg-gradient-to-br from-background via-background/50 to-background"
          style={{
            backgroundImage: `url('data:image/svg+xml;base64,${toBase64(shimmer(400, 200))}')`
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-foreground border-t-transparent" />
          <div className="text-lg font-medium">Loading skill tree...</div>
        </div>
      </div>
    </div>
  );
}
