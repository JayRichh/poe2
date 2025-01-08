"use client";

import { Clock } from "lucide-react";

import { useEffect, useState } from "react";

interface TimeAgoProps {
  date: string;
}

export function TimeAgo({ date }: TimeAgoProps) {
  // Format date in a stable way for initial SSR render
  const formatStableDate = (date: string) => {
    const d = new Date(date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const [timeAgoText, setTimeAgoText] = useState(formatStableDate(date));

  const calculateTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  useEffect(() => {
    // Switch to relative time after hydration
    const updateTime = () => setTimeAgoText(calculateTimeAgo(date));
    updateTime();

    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="flex items-center gap-1.5 text-sm text-foreground/60">
      <Clock className="w-3.5 h-3.5" />
      {timeAgoText}
    </div>
  );
}
