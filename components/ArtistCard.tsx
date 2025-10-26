import { useTheme } from "@/contexts/ThemeContext";
import { getData } from "@/utils/nukstorage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import TitleText from "./TitleText";

type ArtistCardProps = {
  id: string;
};

type ReviewData = {
  id?: string
  image?: string;
  rating?: number | string;
};

export default function ArtistCard({ id }: ArtistCardProps) {
  const [data, setData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await getData(id);
        setData(item);
      } catch (err) {
        console.error("Error loading artist data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#888" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.card}>
        <Text style={{ color: "#888" }}>No data found for ID: {id}</Text>
      </View>
    );
  }

  return (
    <Pressable style={[styles.card, {backgroundColor: colors.accent}]} onPress={() => router.push({pathname: "/artist", params: {id}})}>
      {/* Album Cover */}
      <Image
        source={{ uri: data.image }}
        style={styles.image}
        resizeMode="cover"
      /> 

      {/* Title & Artist */}
      <View style={styles.infoContainer}>
        <TitleText text={data.id || "Untitled"} size={16}></TitleText>
      </View>

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <TitleText text={data.rating?.toString() ?? "-"} size={28}></TitleText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 65,
    backgroundColor: "#888"
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  artist: {
    fontSize: 14,
  },
  ratingContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: 40,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
