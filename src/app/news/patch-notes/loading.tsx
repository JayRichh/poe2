import { NewsLayout } from "~/components/news/NewsLayout";

export default function PatchNotesLoading() {
  return (
    <NewsLayout
      title="Loading..."
      description="Loading patch notes"
    >
      <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-card rounded-lg p-6 border border-border">
          {/* Version header skeleton */}
          <div className="space-y-6 animate-pulse">
            <div className="space-y-2">
              <div className="h-8 bg-muted rounded w-1/4" />
              <div className="h-4 bg-muted rounded w-1/6" />
            </div>

            {/* Sections skeleton */}
            {[...Array(3)].map((_, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <div className="h-6 bg-muted rounded w-1/3" />
                <div className="space-y-3">
                  {[...Array(4)].map((_, changeIndex) => (
                    <div key={changeIndex} className="h-4 bg-muted rounded w-full" />
                  ))}
                </div>
              </div>
            ))}

            {/* Hotfixes skeleton */}
            <div className="space-y-4 mt-8">
              <div className="h-6 bg-muted rounded w-1/4" />
              {[...Array(2)].map((_, hotfixIndex) => (
                <div key={hotfixIndex} className="space-y-3">
                  <div className="h-5 bg-muted rounded w-1/5" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </NewsLayout>
  );
}
