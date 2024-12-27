import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Activity, Settings, User, GitBranch } from "lucide-react";
import { Text } from "~/components/ui/Text";
import { useActivities } from "~/hooks/useActivities";
import { ActivityType } from "~/types/activity";
import { formatRelativeTime } from "~/lib/utils/time";

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'build':
      return GitBranch;
    case 'profile':
      return User;
    case 'settings':
      return Settings;
    case 'connection':
      return Activity;
  }
};

export function ActivityFeed() {
  const { activities, loading, error, hasMore, loadMore } = useActivities();
  const observerTarget = useRef(null);

  const intersectionObserver = useCallback((node: HTMLDivElement) => {
    if (loading || !hasMore) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [loading, loadMore, hasMore]);

  if (error) {
    return (
      <div className="text-center py-8 rounded-xl border-2 border-dashed border-border/50">
        <Text className="text-foreground/60">{error}</Text>
      </div>
    );
  }

  if (!loading && activities.length === 0) {
    return (
      <div className="text-center py-8 rounded-xl border-2 border-dashed border-border/50">
        <Text className="text-foreground/60">No recent activity</Text>
        <Text className="text-sm text-foreground/40 mt-1">
          Your recent actions will appear here
        </Text>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((item, index) => {
        const Icon = getActivityIcon(item.type);
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 p-4 rounded-xl border-2 border-border/50 bg-background/95"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <Text className="font-medium">{item.title}</Text>
              <Text className="text-sm text-foreground/60">{item.description}</Text>
              <Text className="text-xs text-foreground/40 mt-1">
                {formatRelativeTime(item.created_at)}
              </Text>
            </div>
          </motion.div>
        );
      })}

      {/* Loading indicator and intersection observer target */}
      {hasMore ? (
        <div ref={intersectionObserver} className="py-4 text-center">
          {loading && (
            <Text className="text-sm text-foreground/40">Loading more activities...</Text>
          )}
        </div>
      ) : activities.length > 0 && (
        <div className="py-4 text-center">
          <Text className="text-sm text-foreground/40">No more activities to load</Text>
        </div>
      )}
    </div>
  );
}
