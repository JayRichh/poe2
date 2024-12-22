import { NewsLayout } from "~/components/news/NewsLayout";

export default function NewsItemLoading() {
  return (
    <NewsLayout
      title="Loading..."
      description="Loading news content"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="animate-pulse">
          {/* Header metadata */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-5 bg-muted rounded w-24" />
            <div className="h-5 bg-muted rounded w-32" />
            <div className="h-5 bg-muted rounded w-20" />
          </div>

          {/* Title and description */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="h-12 bg-muted rounded w-3/4" />
              <div className="h-8 bg-muted rounded w-1/2" />
            </div>

            {/* Content sections */}
            <div className="space-y-4 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-11/12" />
                  <div className="h-4 bg-muted rounded w-4/5" />
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </NewsLayout>
  );
}
