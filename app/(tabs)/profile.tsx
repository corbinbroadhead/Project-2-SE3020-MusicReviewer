import AlbumReviewCard from "@/components/AlbumReviewCard";
import BasicAlbumCard from "@/components/BasicAlbumCard";
import BasicArtistCard from "@/components/BasicArtistCard";
import BodyText from "@/components/BodyText";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import { useProfileData } from "@/hooks/useProfileData";
import React from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

export default function Profile() {
  const { colors } = useTheme();
  const {
    reviews,
    topAlbums,
    topArtists,
    loading,
    refreshing,
    onRefresh,
  } = useProfileData(5);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.scrollContainer}>
        <TitleText text="Profile" size={32} marginBottom={20} />

        <TitleText text="Top Artists" size={20} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {topArtists.length > 0 ? (
            topArtists.map((id, i) => <BasicArtistCard key={i} id={String(id)} />)
          ) : (
            <View>
              <BodyText text="It seems you haven't added any artists." />
              <BodyText text="Go to the 'Create' tab and add one!" />
            </View>
          )}
        </ScrollView>

        <TitleText text="Top Albums" size={20} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {topAlbums.length > 0 ? (
            topAlbums.map((id, i) => <BasicAlbumCard key={i} id={String(id)} />)
          ) : (
            <View>
              <BodyText text="It seems you haven't reviewed any albums." />
              <BodyText text="Go to the 'Create' tab and review one!" />
            </View>
          )}
        </ScrollView>

        <TitleText text="Recent Reviews" size={20} />
        {reviews.length > 0 ? (
          reviews.map((id, i) => <AlbumReviewCard key={i} id={String(id)} />)
        ) : (
          <View>
            <BodyText text="It seems you don't have any recent reviews." />
            <BodyText text="Go to the 'Create' tab and create a new one!" />
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
