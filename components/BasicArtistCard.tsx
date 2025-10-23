import { useTheme } from "@/contexts/ThemeContext";
import { getData } from "@/utils/nukstorage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import TitleText from "./TitleText";

type Props = {
  id: string;
};

type ArtistData = {
  id: string;
  image: string | null;
  rating?: number;
  comments?: string;
  albums?: number[];
  type?: string;
};

export default function BasicArtistCard({ id }: Props) {
  const [data, setData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    const fetchArtist = async () => {
      const result = await getData(id);
      setData(result);
      setLoading(false);
    };
    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.card, {backgroundColor: colors.accent}]}>
        <ActivityIndicator size="small" color="#888" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[styles.card, {backgroundColor: colors.accent}]}>
        <Text style={styles.errorText}>Artist not found.</Text>
      </View>
    );
  }

  return (
    <Pressable onPress={() => router.push({ pathname: "/artist", params: { id } })}>
      <View style={[styles.card, {backgroundColor: colors.accent}]}>
        <View style={styles.imageShadow}>
          {data.image ? (
            <Image source={{ uri: data.image }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.placeholder]}>
              <Text style={{ color: "#888" }}>No Image</Text>
            </View>
          )}
          <View style={{alignItems: "center", width: 130}}>
            <TitleText text={data.id} size={15} textAlign="center"></TitleText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    margin: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 8,
    backgroundColor: "#ddd",
  },
  imageShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 65,
    alignItems: "center"
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  errorText: {
    color: "#a00",
    fontSize: 12,
  },
});
