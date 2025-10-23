import { getAllArtistsSorted, getAllReviewsSorted } from "@/utils/nukstorage";
import { useEffect, useState } from "react";

type RankingType = "ALBUMS" | "ARTISTS";
type SortOrder = "BEST" | "WORST";

export function useRankings(type: RankingType, sort: SortOrder) {
  const [ids, setIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      try {
        const order = sort === "BEST" ? "desc" : "asc";
        let data;

        if (type === "ALBUMS") {
          data = await getAllReviewsSorted(order);
        } else if (type === "ARTISTS") {
          data = await getAllArtistsSorted(order);
        } else {
          data = [];
        }

        setIds(data.map((item: any) => item));
      } catch (err) {
        console.error("Error fetching rankings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [type, sort]);
  return { ids, loading };
}
