export type ActivityType = "build" | "profile" | "settings" | "connection";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  metadata?: any;
  created_at: string;
}

export interface ActivityFeedProps {
  items: Activity[];
}
