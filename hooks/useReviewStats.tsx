import { getReviewStats } from "@/utils/nukstorage";
import { useEffect, useState } from "react";

export function useReviewStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const result = await getReviewStats();
      setStats(result);
    } catch (err) {
      console.error("Failed to fetch review stats:", err);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  return { stats, loading, refresh: fetchStats };
}
