import { getAllArtists } from "@/utils/nukstorage";
import { useEffect, useState } from "react";

export function useArtists() {
  const [artists, setArtists] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      const result = await getAllArtists();
      setArtists(result || []);
      setLoading(false);
    };
    fetchArtists();
  }, []);

  return { artists, loading };
}
