import { getRecentReviews } from "@/utils/nukstorage";
import { useCallback, useEffect, useState } from "react";

export function useRecentReviews(limit = 20) {
  const [reviews, setReviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const data = await getRecentReviews(limit);
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching recent reviews:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchReviews();
    setRefreshing(false);
  }, [fetchReviews]);

  return { reviews, loading, refreshing, onRefresh, refetch: fetchReviews };
}
