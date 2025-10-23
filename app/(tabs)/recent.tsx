import AlbumReviewCard from "@/components/AlbumReviewCard";
import ThemeBarChart from "@/components/ThemeBarChart";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import { useReviewStats } from "@/hooks/useReviewStats";
import { getRecentReviews } from "@/utils/nukstorage";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function Recent() {
  const [reviews, setReviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();

  const { stats, loading: statsLoading, refresh: refreshStats } = useReviewStats();

  const fetchData = async () => {
    try {
      const recent = await getRecentReviews(20);
      setReviews(Array.isArray(recent) ? recent : []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchData(), refreshStats()]);
    setRefreshing(false);
  };

  if (loading || statsLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.scrollContainer}>
        <TitleText text="Album Rating Overview" size={32} marginBottom={12} />
        {stats ? <ThemeBarChart stats={stats} /> : <Text>No stats yet.</Text>}

        <View style={{ marginTop: 40 }}>
          <TitleText text="Recent Reviews" size={32} marginBottom={8} />
          {reviews.length > 0 ? (
            reviews.map((id, i) => <AlbumReviewCard key={i} id={String(id)} />)
          ) : (
            <View style={styles.center}>
              <Text>No recent reviews found.</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 10, marginTop: 80, paddingHorizontal: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
