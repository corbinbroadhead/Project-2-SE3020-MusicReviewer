import AlbumReviewCard from "@/components/AlbumReviewCard";
import ArtistCard from "@/components/ArtistCard";
import ThemeDropdown from "@/components/ThemeDropdown";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import { useRankings } from "@/hooks/useRankings";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

export default function Rankings() {
  const { colors } = useTheme();
  const [type, setType] = useState<"ALBUMS" | "ARTISTS">("ALBUMS");
  const [sort, setSort] = useState<"BEST" | "WORST">("BEST");
  const { ids, loading } = useRankings(type, sort);
  const typeOptions = [
    { value: "ALBUMS", label: "Albums" },
    { value: "ARTISTS", label: "Artists" },
  ];
  const sortOptions = [
    { value: "BEST", label: "Best" },
    { value: "WORST", label: "Worst" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TitleText text=" Rankings" size={32} marginTop={20} marginBottom={0} />

      <View style={{ flexDirection: "row", justifyContent: "center", width: "50%", marginLeft: 80, marginTop: 20 }}>
        <ThemeDropdown data={typeOptions} initialValue={type} onChange={(val) => setType(val as "ALBUMS" | "ARTISTS")}/>
        <ThemeDropdown data={sortOptions} initialValue={sort} onChange={(val) => setSort(val as "BEST" | "WORST")}/>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.text} style={{ marginTop: 24 }} />
      ) : (
        <FlatList data={ids} keyExtractor={(id) => id}
          renderItem={({ item }) =>
            type === "ALBUMS" ? <AlbumReviewCard id={item} /> : <ArtistCard id={item} />
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 16}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
});
