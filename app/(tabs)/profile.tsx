import AlbumReviewCard from "@/components/AlbumReviewCard";
import BasicAlbumCard from "@/components/BasicAlbumCard";
import BasicArtistCard from "@/components/BasicArtistCard";
import BodyText from "@/components/BodyText";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import { getRecentReviews, getTopAlbums, getTopArtists } from "@/utils/nukstorage";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View
} from "react-native";

export default function Profile() {
  const [reviews, setReviews] = useState<string[]>([]);
  const [topAlbums, setTopAlbums] = useState<string[]>([]);
  const [topArtists, setTopArtists] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();

  const fetchData = async () => {
    try {
      const [reviewData, topAlbumData, topArtistData] = await Promise.all([
        getRecentReviews(5),
        getTopAlbums(5),
        getTopArtists(5),
      ]);

      // Safely ensure they’re arrays
      setReviews(Array.isArray(reviewData) ? reviewData : []);
      setTopAlbums(Array.isArray(topAlbumData) ? topAlbumData : []);
      setTopArtists(Array.isArray(topArtistData) ? topArtistData : []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setReviews([]);
      setTopAlbums([]);
      setTopArtists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  if (loading) {
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
        <TitleText text="Profile" size={32} marginBottom={20} />

        <TitleText text="Top Artists" size={20} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {Array.isArray(topArtists) && topArtists.length > 0 ? (
            topArtists.map((id, i) => <BasicArtistCard key={i} id={String(id)} />)
          ) : (
            <View>
                <BodyText text="It seems you haven't added any artists."></BodyText>
                <BodyText text="Go to the 'Create' tab and add one!"></BodyText>
            </View>
          )}
        </ScrollView>

        <TitleText text="Top Albums" size={20} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {Array.isArray(topAlbums) && topAlbums.length > 0 ? (
            topAlbums.map((id, i) => <BasicAlbumCard key={i} id={String(id)} />)
          ) : (
            <View>
                <BodyText text="It seems you haven't reviewed any albums."></BodyText>
                <BodyText text="Go to the 'Create' tab and review one!"></BodyText>
            </View>
          )}
        </ScrollView>

        <TitleText text="Recent Reviews" size={20} />
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((id, i) => <AlbumReviewCard key={i} id={String(id)} />)
        ) : (
          <View>
                <BodyText text="It seems you don't have any recent reviews."></BodyText>
                <BodyText text="Go to the 'Create' tab and create a new one!"></BodyText>
            </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 10, marginTop: 80, paddingHorizontal: 20 },
  horizontalScroll: { marginBottom: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
