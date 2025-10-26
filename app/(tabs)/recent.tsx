import AlbumReviewCard from "@/components/AlbumReviewCard";
import ThemeBarChart from "@/components/ThemeBarChart";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import { useRecentReviews } from "@/hooks/useRecentReviews";
import { useReviewStats } from "@/hooks/useReviewStats";
import React from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Recent() {
  const { colors } = useTheme();
  const { stats, loading: statsLoading, refresh: refreshStats } = useReviewStats();
  const { reviews, loading, refreshing, onRefresh, refetch } = useRecentReviews(20);
  const handleRefresh = async () => {
    await Promise.all([onRefresh(), refreshStats()]);
  };

  if (loading || statsLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
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
