"use client";

import { motion } from "framer-motion";
import { Activity, GitBranch, Settings, User } from "lucide-react";
import { Text } from "~/components/ui/Text";

type ActivityType = 'build' | 'profile' | 'settings' | 'connection';

interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

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

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (items.length === 0) {
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
      {items.map((item, index) => {
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
              <Text className="text-xs text-foreground/40 mt-1">{item.timestamp}</Text>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
