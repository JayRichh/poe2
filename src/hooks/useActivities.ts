import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '~/contexts/auth';
import { Activity } from '~/types/activity';
import { getRecentActivities } from '~/app/actions/server/activities';

const CACHE_KEY = 'recent_activities';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const INITIAL_FETCH_LIMIT = 5;

interface CachedActivities {
  data: Activity[];
  timestamp: number;
}

export function useActivities() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Load activities from cache or fetch from server
  const loadActivities = useCallback(async () => {
    if (!user) return;

    try {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp }: CachedActivities = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        if (age < CACHE_DURATION) {
          setActivities(data);
          setHasMore(data.length >= INITIAL_FETCH_LIMIT);
          setLoading(false);
          return;
        }
      }

      // Fetch from server if cache miss or expired
      const data = await getRecentActivities(INITIAL_FETCH_LIMIT);
      setActivities(data);
      setHasMore(data.length >= INITIAL_FETCH_LIMIT);

      // Update cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));

    } catch (err) {
      console.error('Error loading activities:', err);
      setError('Failed to load activities');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load more activities
  const loadMore = useCallback(async () => {
    if (!user || loading || !hasMore) return;

    try {
      setLoading(true);
      const currentCount = activities.length;
      const newData = await getRecentActivities(INITIAL_FETCH_LIMIT, currentCount);
      
      if (newData.length < INITIAL_FETCH_LIMIT) {
        setHasMore(false);
      }

      setActivities(prev => [...prev, ...newData]);

    } catch (err) {
      console.error('Error loading more activities:', err);
      setError('Failed to load more activities');
    } finally {
      setLoading(false);
    }
  }, [user, activities.length, loading, hasMore]);

  // Initial load
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return {
    activities,
    loading,
    error,
    hasMore,
    loadMore,
    refresh: loadActivities
  };
}
