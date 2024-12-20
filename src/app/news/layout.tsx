export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <div className="w-64 shrink-0" />
        {children}
      </div>
    </div>
  );
}
