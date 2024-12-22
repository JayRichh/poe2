import Link from "next/link";
import { NewsLayout } from "~/components/news/NewsLayout";
import { Button } from "~/components/ui/Button";

export default function NewsNotFound() {
  return (
    <NewsLayout
      title="Content Not Found"
      description="The news content you&apos;re looking for doesn&apos;t exist or has been moved."
    >
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight">404</h2>
            <p className="text-lg text-foreground/60">
              The news content you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link href="/news">
              <Button variant="outline">Back to News</Button>
            </Link>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </NewsLayout>
  );
}
