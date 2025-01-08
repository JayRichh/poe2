export function formatDate(date: string | Date, format: "short" | "long" = "short"): string {
  const d = typeof date === "string" ? new Date(date) : date;

  // Use UTC methods to ensure consistent rendering between server and client
  const options: Intl.DateTimeFormatOptions =
    format === "long"
      ? {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        }
      : {
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        };

  return new Intl.DateTimeFormat("en-US", options).format(d);
}

export function timeAgo(date: string): string {
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
}
