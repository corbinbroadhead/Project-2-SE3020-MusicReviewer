import { getRecentReviews, getTopAlbums, getTopArtists } from "@/utils/nukstorage";
import { useCallback, useEffect, useState } from "react";

export function useProfileData(limit = 5) {
  const [reviews, setReviews] = useState<string[]>([]);
  const [topAlbums, setTopAlbums] = useState<string[]>([]);
  const [topArtists, setTopArtists] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [reviewData, topAlbumData, topArtistData] = await Promise.all([
        getRecentReviews(limit),
        getTopAlbums(limit),
        getTopArtists(limit),
      ]);

      setReviews(Array.isArray(reviewData) ? reviewData : []);
      setTopAlbums(Array.isArray(topAlbumData) ? topAlbumData : []);
      setTopArtists(Array.isArray(topArtistData) ? topArtistData : []);
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setReviews([]);
      setTopAlbums([]);
      setTopArtists([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  return { reviews, topAlbums, topArtists, loading, refreshing, onRefresh };
}
